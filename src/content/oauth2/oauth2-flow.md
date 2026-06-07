# OAuth2.0 授权流程

GrMine OAuth2.0 实现了标准的 **Authorization Code Flow**（授权码模式），适用于有后端服务的第三方应用。

## 流程概览

```
┌──────────┐                                  ┌──────────┐
│          │  1. GET /authorize               │          │
│          │  ?response_type=code              │          │
│          │  &client_id=xxx                   │          │
│   用户    │  &redirect_uri=xxx               │  GrLogin │
│  浏览器   │  &scope=openid profile email     │  (Flask) │
│          │  &state=xxx                       │          │
│          │ ────────────────────────────────→ │          │
│          │                                  │          │
│          │  2. 返回登录页面                   │          │
│          │ ←──────────────────────────────── │          │
│          │                                  │          │
│          │  3. POST /authorize               │          │
│          │  (email + password + captcha)     │          │
│          │ ────────────────────────────────→ │          │
│          │                                  │          │
│          │  4. 重定向到确认页面 /confirm       │          │
│          │ ←──────────────────────────────── │          │
│          │                                  │          │
│          │  5. POST /confirm (用户同意授权)    │          │
│          │ ────────────────────────────────→ │          │
│          │                                  │          │
│          │  6. 302 重定向到 redirect_uri      │          │
│          │  ?code=AUTHORIZATION_CODE         │          │
│          │  &state=xxx                       │          │
│          │ ←──────────────────────────────── │          │
└──────────┘                                  └──────────┘

┌──────────┐                                  ┌──────────┐
│          │  7. POST /auth/token              │          │
│  第三方    │  grant_type=authorization_code   │  GrAuth  │
│  应用后端  │  &code=AUTHORIZATION_CODE        │ (FastAPI)│
│          │  &client_id=xxx                   │          │
│          │  &client_secret=xxx               │          │
│          │ ────────────────────────────────→ │          │
│          │                                  │          │
│          │  8. 返回 Token                    │          │
│          │  { access_token, refresh_token,   │          │
│          │    token_type, expires_in, scope }│          │
│          │ ←──────────────────────────────── │          │
│          │                                  │          │
│          │  9. POST /auth/userinfo           │          │
│          │  Authorization: Bearer <token>    │          │
│          │ ────────────────────────────────→ │          │
│          │                                  │          │
│          │  10. 返回用户信息                  │          │
│          │  { sub, username, email }         │          │
│          │ ←──────────────────────────────── │          │
└──────────┘                                  └──────────┘
```

## 支持的 Scope

| Scope | 说明 | 返回字段 |
|-------|------|----------|
| `openid` | 基础身份标识（默认） | `sub` (用户 UUID) |
| `profile` | 用户资料 | `sub`, `username` |
| `email` | 邮箱信息 | `sub`, `email` |

默认 scope 为 `openid profile email`，三个字段全部返回。

## Token 有效期

| Token 类型 | 有效期 | 说明 |
|-----------|--------|------|
| `authorization_code` | 10 分钟 | 授权码，一次性使用 |
| `access_token` | 1 小时 | 访问令牌，用于调用 API |
| `refresh_token` | 30 天 | 刷新令牌，用于获取新的 access_token |

## API 端点

### GrLogin 端点（前端交互）

| 端点 | 方法 | 说明 |
|------|------|------|
| `/authorize` | GET/POST | OAuth2.0 授权端点 |
| `/confirm` | GET/POST | 授权确认页面 |
| `/login` | GET/POST | 登录页面（兼容旧版，重定向到 /authorize） |
| `/register` | GET/POST | 用户注册 |
| `/activation` | GET/POST | 邮箱激活 |
| `/captcha` | GET | 获取验证码图片 |
| `/forgot-password` | GET/POST | 忘记密码 |
| `/reset-password` | GET/POST | 重置密码 |
| `/change-email` | GET | 修改邮箱验证 |
| `/login/quick` | POST | 一键登录 |
| `/user/profile` | GET/POST | 用户信息管理 |

### GrAuth 端点（Token 服务）

| 端点 | 方法 | 说明 |
|------|------|------|
| `/auth/token` | POST | Token 端点（授权码交换 / 刷新令牌） |
| `/auth/userinfo` | POST | 用户信息端点 |

## 错误码

GrAuth 端点遵循 [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749) 错误响应格式：

| 错误码 | HTTP 状态码 | 说明 |
|--------|------------|------|
| `invalid_request` | 400 | 缺少必要参数 |
| `invalid_client` | 401 | 客户端认证失败 |
| `invalid_grant` | 400 | 授权码无效、过期或不匹配 |
| `invalid_token` | 401 | Token 无效或过期 |
| `unsupported_grant_type` | 400 | 不支持的 grant_type |

## 刷新令牌

当 `access_token` 过期后，第三方应用可使用 `refresh_token` 获取新的 `access_token`：

```
POST /auth/token
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token=<refresh_token>
&client_id=xxx
&client_secret=xxx
```

响应：

```json
{
  "access_token": "<new_access_token>",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "openid profile email"
}
```

> 注意：刷新令牌操作不会返回新的 `refresh_token`，原 `refresh_token` 在有效期内可重复使用。

## CSRF 防护

建议第三方应用在授权请求中携带 `state` 参数。GrLogin 会在重定向时原样返回该参数，应用应验证 `state` 是否一致以防止 CSRF 攻击。
