# GrAuth 端点详解

GrAuth 插件注册在 `/auth` 路由前缀下，提供 OAuth2.0 标准的 Token 和 UserInfo 端点。

## Token 端点

```
POST /auth/token
Content-Type: application/x-www-form-urlencoded
```

### authorization_code 授权码交换

将授权码交换为访问令牌和刷新令牌。

**请求参数：**

| 参数 | 必填 | 说明 |
|------|------|------|
| `grant_type` | 是 | 必须为 `authorization_code` |
| `code` | 是 | 从 GrLogin 获取的授权码 |
| `client_id` | 是 | 第三方应用 ID |
| `client_secret` | 是 | 第三方应用密钥 |
| `redirect_uri` | 否 | 重定向 URI（用于验证匹配） |

**响应示例：**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "openid profile email"
}
```

**验证流程：**

1. 验证 `client_id` + `client_secret` 是否匹配
2. 检查授权码是否已被使用
3. 解密授权码，验证是否过期（10 分钟）
4. 验证 `redirect_uri` 和 `client_id` 是否与授权码中的一致
5. 标记授权码为已使用
6. 签发 `access_token` 和 `refresh_token`

### refresh_token 刷新令牌

使用刷新令牌获取新的访问令牌。

**请求参数：**

| 参数 | 必填 | 说明 |
|------|------|------|
| `grant_type` | 是 | 必须为 `refresh_token` |
| `refresh_token` | 是 | 刷新令牌 |
| `client_id` | 是 | 第三方应用 ID |
| `client_secret` | 是 | 第三方应用密钥 |

**响应示例：**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "scope": "openid profile email"
}
```

> 注意：刷新操作不返回新的 `refresh_token`，原令牌可继续使用直到过期。

**验证流程：**

1. 验证 `client_id` + `client_secret` 是否匹配
2. 解密刷新令牌，验证类型为 `refresh_token`
3. 检查刷新令牌是否过期（30 天）
4. 签发新的 `access_token`

### 错误响应

所有错误遵循 RFC 6749 格式：

```json
{
  "error": "invalid_grant",
  "error_description": "Authorization code has expired"
}
```

| error | HTTP 状态码 | 说明 |
|-------|------------|------|
| `invalid_request` | 400 | 缺少必要参数 |
| `invalid_client` | 401 | 客户端认证失败（client_id/secret 不匹配） |
| `invalid_grant` | 400 | 授权码/刷新令牌无效、过期、已使用或不匹配 |
| `unsupported_grant_type` | 400 | grant_type 不是 `authorization_code` 或 `refresh_token` |

---

## UserInfo 端点

```
POST /auth/userinfo
Authorization: Bearer <access_token>
```

使用 Bearer Token 获取用户信息。

**请求头：**

| 头部 | 必填 | 说明 |
|------|------|------|
| `Authorization` | 是 | 格式：`Bearer <access_token>` |

**响应示例：**

```json
{
  "sub": "550e8400-e29b-41d4-a716-446655440000",
  "username": "example_user",
  "email": "user@example.com"
}
```

**返回字段根据 scope 决定：**

| scope | 返回字段 |
|-------|----------|
| `openid` | `sub` |
| `profile` | `sub`, `username` |
| `email` | `sub`, `email` |
| `openid profile email` | `sub`, `username`, `email` |

**验证流程：**

1. 解析 `Authorization` 头部，提取 Bearer Token
2. 解密 Token，验证类型为 `access_token`
3. 检查 Token 是否过期（1 小时）
4. 根据 UUID 查找用户
5. 根据 scope 过滤返回字段

### 错误响应

```json
{
  "error": "invalid_token",
  "error_description": "Access token has expired"
}
```

| error | HTTP 状态码 | 说明 |
|-------|------------|------|
| `invalid_request` | 401 | 缺少 Authorization 头部 |
| `invalid_token` | 401 | Token 格式错误、类型错误或已过期 |

---

## 废弃端点

以下端点保留用于向后兼容，不建议新应用使用：

| 端点 | 说明 |
|------|------|
| `POST /auth/code` | 旧版授权码交换，使用 JSON 请求体，返回 `access_token` + `refresh_token` |
| `POST /auth/user/info` | 旧版用户信息查询，使用 JSON 请求体，返回完整用户信息 |

---

## Token 结构

所有 Token 使用 JWT (HS256) 签名，签名密钥存储在 MongoDB 的 `web_set` 集合中。

### access_token 载荷

```json
{
  "uuid": "用户 UUID",
  "type": "access_token",
  "scope": "openid profile email",
  "iat": 1700000000,
  "exp": 1700003600
}
```

### refresh_token 载荷

```json
{
  "uuid": "用户 UUID",
  "type": "refresh_token",
  "scope": "openid profile email",
  "iat": 1700000000,
  "exp": 1702592000
}
```

### authorization_code 载荷

```json
{
  "uuid": "用户 UUID",
  "time": 1700000000,
  "client_id": "应用 ID",
  "redirect_uri": "https://app.example.com/callback",
  "scope": "openid profile email"
}
```

---

## GrAuth 数据库

GrAuth 的 `database.py` 操作以下 MongoDB 集合：

| 集合 | 说明 |
|------|------|
| `application_secret_key` | 第三方应用凭据（application_id + SHA256(secret)） |
| `users` | 用户信息 |
| `code_temp` | 已使用的授权码（TTL 索引，5 分钟自动清理） |
| `web_set` | 系统配置（JWT 签名密钥） |

### 客户端认证

```python
def application_verify(application_id, secret):
    secret_hash = hashlib.sha256(secret.encode()).hexdigest()
    return bool(self.secret.count_documents({
        "application_id": application_id,
        "secret": secret_hash
    }))
```

客户端密钥以 SHA-256 哈希形式存储。
