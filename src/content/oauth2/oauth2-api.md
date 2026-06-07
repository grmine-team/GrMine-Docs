# API 参考

GrMine OAuth2.0 提供以下 API 端点。

## 基础地址

| 服务 | 地址 |
|------|------|
| 授权页面 | `https://account.grmine.cn` |
| Token / UserInfo API | `https://api.grmine.cn/auth` |

---

## 授权端点

引导用户到此页面进行登录和授权。

```
GET https://account.grmine.cn/authorize
```

### 参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `response_type` | string | 是 | 固定值 `code` |
| `client_id` | string | 是 | 应用 ID |
| `redirect_uri` | string | 否 | 回调地址 |
| `scope` | string | 否 | 权限范围，默认 `openid profile email` |
| `state` | string | 否 | CSRF 防护参数 |

### 错误

参数验证失败时，GrMine 会展示错误页面。常见错误：

| 错误 | 原因 |
|------|------|
| Unsupported response_type | `response_type` 不是 `code` |
| Client not found | `client_id` 无效 |
| Invalid redirect_uri | `redirect_uri` 与注册的不匹配 |
| Invalid scope | 包含不支持的 scope 值 |

---

## Token 端点

用授权码换取 Token，或用刷新令牌获取新的访问令牌。

```
POST https://api.grmine.cn/auth/token
Content-Type: application/x-www-form-urlencoded
```

### 授权码交换

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `grant_type` | string | 是 | `authorization_code` |
| `code` | string | 是 | 授权码 |
| `client_id` | string | 是 | 应用 ID |
| `client_secret` | string | 是 | 应用密钥 |
| `redirect_uri` | string | 否 | 回调地址（用于验证） |

#### 成功响应 `200`

```json
{
  "access_token": "eyJ...",
  "refresh_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "openid profile email"
}
```

### 刷新令牌

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `grant_type` | string | 是 | `refresh_token` |
| `refresh_token` | string | 是 | 刷新令牌 |
| `client_id` | string | 是 | 应用 ID |
| `client_secret` | string | 是 | 应用密钥 |

#### 成功响应 `200`

```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "openid profile email"
}
```

### 错误响应

| HTTP 状态码 | error | 说明 |
|------------|-------|------|
| 400 | `invalid_request` | 缺少必要参数 |
| 400 | `invalid_grant` | 授权码/刷新令牌无效或过期 |
| 400 | `unsupported_grant_type` | grant_type 不支持 |
| 401 | `invalid_client` | 客户端认证失败 |

---

## UserInfo 端点

使用 access_token 获取用户信息。

```
POST https://api.grmine.cn/auth/userinfo
Authorization: Bearer <access_token>
```

### 成功响应 `200`

```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "username": "example_user",
  "email": "user@example.com"
}
```

返回字段取决于授权时的 scope：

| scope | 返回字段 |
|-------|----------|
| `openid` | `sub` |
| `openid profile` | `sub`, `username` |
| `openid email` | `sub`, `email` |
| `openid profile email` | `sub`, `username`, `email` |

### 错误响应

| HTTP 状态码 | error | 说明 |
|------------|-------|------|
| 401 | `invalid_request` | 缺少 Authorization 头 |
| 401 | `invalid_token` | Token 无效或已过期 |
