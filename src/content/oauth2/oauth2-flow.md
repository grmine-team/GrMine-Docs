# 授权流程详解

本文详细说明 GrMine OAuth2.0 的 Authorization Code Flow 每个步骤。

## 第一步：引导用户授权

将用户浏览器重定向到 GrMine 授权页面：

```
GET https://account.grmine.cn/authorize
```

### 参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `response_type` | 是 | 固定值 `code` |
| `client_id` | 是 | 你的应用 ID |
| `redirect_uri` | 否 | 授权回调地址（需与注册时一致） |
| `scope` | 否 | 请求的权限范围，默认 `openid profile email` |
| `state` | 否 | 随机字符串，用于防止 CSRF 攻击（**强烈推荐**） |

### scope 说明

| Scope | 说明 | 获取的用户信息字段 |
|-------|------|-------------------|
| `openid` | 基础身份标识 | `sub`（用户唯一 ID） |
| `profile` | 用户资料 | `username` |
| `email` | 邮箱信息 | `email` |

默认 `openid profile email` 会返回全部字段。你只需申请需要的最小权限。

### state 参数

`state` 是一个由你的应用生成的随机字符串。GrMine 在回调时会原样返回这个值，你的应用应验证它是否与发起时一致，以防止 CSRF 攻击。

### 用户看到的页面

1. 如果用户未登录，会看到 GrMine 登录页面
2. 登录后，会看到授权确认页面，展示你的应用名称和请求的权限
3. 用户点击同意后，GrMine 会重定向回你的应用

## 第二步：接收授权码

用户同意授权后，GrMine 会将用户重定向到你注册的 `redirect_uri`，并附加以下参数：

```
https://your-app.com/callback?code=AUTHORIZATION_CODE&state=你传入的state
```

| 参数 | 说明 |
|------|------|
| `code` | 授权码，10 分钟有效，**一次性使用** |
| `state` | 你在第一步传入的 state 值（如有） |

> **重要**：授权码只能使用一次。用过后即失效，重复使用会返回错误。

### 验证 state

```python
if request.args.get('state') != session['oauth_state']:
    # state 不匹配，可能是 CSRF 攻击
    return 'Invalid state', 400
```

## 第三步：用授权码换取 Token

在你的**后端服务**中（不要在前端暴露 client_secret），用授权码换取 Token：

```
POST https://api.grmine.cn/auth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=上一步获取的授权码
&client_id=你的CLIENT_ID
&client_secret=你的CLIENT_SECRET
&redirect_uri=你的回调地址
```

### 成功响应

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "openid profile email"
}
```

| 字段 | 说明 |
|------|------|
| `access_token` | 访问令牌，1 小时有效 |
| `refresh_token` | 刷新令牌，30 天有效 |
| `token_type` | 固定值 `Bearer` |
| `expires_in` | access_token 有效期（秒） |
| `scope` | 授权的权限范围 |

### 错误响应

```json
{
  "error": "invalid_grant",
  "error_description": "Authorization code has expired"
}
```

| error | 说明 |
|-------|------|
| `invalid_request` | 缺少必要参数 |
| `invalid_client` | client_id 或 client_secret 错误 |
| `invalid_grant` | 授权码无效、过期、已使用或 redirect_uri 不匹配 |
| `unsupported_grant_type` | grant_type 值不正确 |

## 第四步：获取用户信息

使用 `access_token` 调用用户信息接口：

```
POST https://api.grmine.cn/auth/userinfo
Authorization: Bearer <access_token>
```

### 成功响应

```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "username": "example_user",
  "email": "user@example.com"
}
```

| 字段 | 条件 | 说明 |
|------|------|------|
| `sub` | 始终返回 | 用户唯一标识（UUID） |
| `username` | scope 包含 `profile` | 用户名 |
| `email` | scope 包含 `email` | 邮箱地址 |

### 错误响应

```json
{
  "error": "invalid_token",
  "error_description": "Access token has expired"
}
```

| error | 说明 |
|-------|------|
| `invalid_request` | 缺少 Authorization 头 |
| `invalid_token` | Token 无效或已过期 |

## 刷新 Token

`access_token` 过期后，使用 `refresh_token` 获取新的 `access_token`，无需用户重新登录：

```
POST https://api.grmine.cn/auth/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token=<refresh_token>
&client_id=你的CLIENT_ID
&client_secret=你的CLIENT_SECRET
```

### 响应

```json
{
  "access_token": "<新的access_token>",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "openid profile email"
}
```

> 注意：刷新操作不会返回新的 `refresh_token`，原 `refresh_token` 在 30 天有效期内可重复使用。

## Token 有效期总结

| Token | 有效期 | 说明 |
|-------|--------|------|
| 授权码 (code) | 10 分钟 | 一次性使用 |
| access_token | 1 小时 | 用于调用 API |
| refresh_token | 30 天 | 用于刷新 access_token |
