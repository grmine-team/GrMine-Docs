# 接入示例

以下示例展示如何在不同语言和框架中接入 GrMine OAuth2.0 登录。

## 通用流程

无论使用什么技术栈，接入流程都是一样的：

1. 引导用户到 GrMine 授权页面
2. 接收回调中的授权码
3. 用授权码换取 Token
4. 用 Token 获取用户信息

## Python (Flask)

```python
import secrets
import requests
from flask import Flask, redirect, request, session, jsonify

app = Flask(__name__)
app.secret_key = 'your-secret-key'

CLIENT_ID = '你的CLIENT_ID'
CLIENT_SECRET = '你的CLIENT_SECRET'
REDIRECT_URI = 'http://localhost:5000/callback'
AUTH_URL = 'https://account.grmine.cn'
API_URL = 'https://api.grmine.cn/auth'


@app.route('/login')
def login():
    # 生成 state 防止 CSRF
    state = secrets.token_urlsafe(32)
    session['oauth_state'] = state

    # 引导用户到 GrMine 授权页面
    auth_url = (
        f'{AUTH_URL}/authorize?response_type=code'
        f'&client_id={CLIENT_ID}'
        f'&redirect_uri={REDIRECT_URI}'
        f'&scope=openid profile email'
        f'&state={state}'
    )
    return redirect(auth_url)


@app.route('/callback')
def callback():
    # 验证 state
    state = request.args.get('state')
    if state != session.get('oauth_state'):
        return 'Invalid state', 400

    code = request.args.get('code')
    if not code:
        return 'Missing code', 400

    # 用授权码换取 Token
    token_resp = requests.post(f'{API_URL}/token', data={
        'grant_type': 'authorization_code',
        'code': code,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'redirect_uri': REDIRECT_URI,
    })

    if token_resp.status_code != 200:
        return 'Token exchange failed', 400

    tokens = token_resp.json()
    access_token = tokens['access_token']

    # 获取用户信息
    user_resp = requests.post(f'{API_URL}/userinfo', headers={
        'Authorization': f'Bearer {access_token}'
    })

    user = user_resp.json()
    # user = {"sub": "...", "username": "...", "email": "..."}

    # 在你的系统中登录该用户
    # ...
    return jsonify(user)


if __name__ == '__main__':
    app.run(port=5000)
```

## Python (FastAPI)

```python
import secrets
import httpx
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import RedirectResponse
from starlette.middleware.sessions import SessionMiddleware

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key='your-secret-key')

CLIENT_ID = '你的CLIENT_ID'
CLIENT_SECRET = '你的CLIENT_SECRET'
REDIRECT_URI = 'http://localhost:8000/callback'
AUTH_URL = 'https://account.grmine.cn'
API_URL = 'https://api.grmine.cn/auth'


@app.get('/login')
async def login(request: Request):
    state = secrets.token_urlsafe(32)
    request.session['oauth_state'] = state

    auth_url = (
        f'{AUTH_URL}/authorize?response_type=code'
        f'&client_id={CLIENT_ID}'
        f'&redirect_uri={REDIRECT_URI}'
        f'&scope=openid profile email'
        f'&state={state}'
    )
    return RedirectResponse(auth_url)


@app.get('/callback')
async def callback(request: Request):
    state = request.query_params.get('state')
    if state != request.session.get('oauth_state'):
        raise HTTPException(400, 'Invalid state')

    code = request.query_params.get('code')
    if not code:
        raise HTTPException(400, 'Missing code')

    async with httpx.AsyncClient() as client:
        # 换取 Token
        token_resp = await client.post(f'{API_URL}/token', data={
            'grant_type': 'authorization_code',
            'code': code,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'redirect_uri': REDIRECT_URI,
        })

        if token_resp.status_code != 200:
            raise HTTPException(400, 'Token exchange failed')

        tokens = token_resp.json()

        # 获取用户信息
        user_resp = await client.post(f'{API_URL}/userinfo', headers={
            'Authorization': f"Bearer {tokens['access_token']}"
        })

    return user_resp.json()
```

## Node.js (Express)

```javascript
const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const axios = require('axios');

const app = express();
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: true }));

const CLIENT_ID = '你的CLIENT_ID';
const CLIENT_SECRET = '你的CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTH_URL = 'https://account.grmine.cn';
const API_URL = 'https://api.grmine.cn/auth';

app.get('/login', (req, res) => {
  const state = crypto.randomBytes(32).toString('base64url');
  req.session.oauthState = state;

  const authUrl = new URL('/authorize', AUTH_URL);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('scope', 'openid profile email');
  authUrl.searchParams.set('state', state);

  res.redirect(authUrl.toString());
});

app.get('/callback', async (req, res) => {
  if (req.query.state !== req.session.oauthState) {
    return res.status(400).send('Invalid state');
  }

  const code = req.query.code;
  if (!code) return res.status(400).send('Missing code');

  try {
    // 换取 Token
    const tokenResp = await axios.post(`${API_URL}/token`, new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
    }));

    const { access_token } = tokenResp.data;

    // 获取用户信息
    const userResp = await axios.post(`${API_URL}/userinfo`, null, {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    res.json(userResp.data);
  } catch (err) {
    res.status(400).send('Authentication failed');
  }
});

app.listen(3000);
```

## 前端纯跳转（任何框架）

如果你只需要在前端跳转到 GrMine 登录页面：

```javascript
function loginWithGrMine() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: '你的CLIENT_ID',
    redirect_uri: '你的回调地址',
    scope: 'openid profile email',
    state: crypto.randomUUID(),  // 建议保存到 sessionStorage 用于验证
  });

  window.location.href = `https://account.grmine.cn/authorize?${params}`;
}
```

> **注意**：授权码交换和用户信息获取必须在后端完成，不要在前端暴露 `client_secret`。
