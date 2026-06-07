# 服务层详解

GrLogin 的业务逻辑分为三个服务模块，位于 `app/services/` 目录下。

## auth_service — 认证服务

`app/services/auth_service.py` 是核心认证服务，负责密码哈希、Token 生成/验证、登录历史管理等。

### 密码处理

```python
def hash_password(password):
    return data2sha256(password)
```

密码使用 SHA-256 哈希存储，不使用盐值。

### 授权码生成

```python
def generate_confirm_url(user, application, database, redirect_uri, scope, state)
```

生成 OAuth2.0 授权确认链接的流程：

1. 构建授权码数据：`{uuid, time, client_id, redirect_uri, scope}`
2. 使用 JWT (HS256) 加密授权码
3. 构建重定向数据：`{code, url, time, client_id, scope, state}`
4. 加密重定向数据，拼接到 `/confirm` URL

### 授权码验证

```python
def verify_confirm_code(code, database)
```

解密确认码，返回其中的数据。

### 重定向 URL 生成

```python
def get_redirect_url(code_data)
```

生成符合 OAuth2.0 标准的重定向 URL，格式为：

```
{redirect_uri}?code={authorization_code}&state={state}
```

### redirect_uri 验证

```python
def validate_redirect_uri(request_uri, registered_uri)
```

当前实现为精确匹配，请求的 `redirect_uri` 必须与注册的 URI 完全一致。

### 重置密码

```python
def generate_reset_password_token(email, database)  # 生成令牌
def verify_reset_password_token(token, database)     # 验证令牌（1小时有效）
def reset_password(email, new_password, database)    # 执行重置
```

### 修改邮箱

```python
def verify_change_email_token(token, database)  # 验证令牌（1小时有效）
def change_email(user_id, new_email, database)  # 执行修改
```

### 登录 Token

使用 `itsdangerous.URLSafeTimedSerializer` 生成和验证登录令牌：

```python
def generate_login_token(user_id)     # 生成登录令牌
def verify_login_token(token, max_age=2592000)  # 验证令牌（默认30天有效）
```

### 登录历史

```python
def encrypt_login_history(history)     # 加密登录历史
def decrypt_login_history(encrypted)   # 解密登录历史
def update_login_history(user, request, response)  # 更新登录历史
```

登录历史存储在 Cookie 中，最多保存 5 个账号，有效期 30 天。

---

## captcha_service — 验证码服务

`app/services/captcha_service.py` 负责生成图形验证码。

### 生成验证码

```python
def generate_captcha()
```

- 生成 100x50 像素的 PNG 图片
- 5 位大写字母 + 数字组合
- 添加干扰线条（3-5 条）和噪点（100 个）
- 验证码文本存储在 Flask Session 中
- 返回 `Content-Type: image/png` 的响应

### 验证逻辑

验证码在路由中验证，比较用户输入的前 5 位（忽略大小写）：

```python
if request.values.get('captcha').upper()[:5] == captcha.upper():
    session.pop('captcha')  # 验证后立即清除
```

---

## email_service — 邮件服务

`app/services/email_service.py` 基于 Flask-Mail，负责发送各类通知邮件。

### 初始化

```python
def init_mail(app)
```

在应用工厂中调用，初始化 Flask-Mail 扩展。

### 发送激活邮件

```python
def send_activation_email(email, client_id, database)
```

- 生成包含邮箱和时间的 JWT 激活令牌
- 构建激活链接：`{web.url}/activation?key={token}`
- 发送 HTML 格式邮件，链接 24 小时有效

### 发送重置密码邮件

```python
def send_reset_password_email(email, database, client_id)
```

- 调用 `auth_service.generate_reset_password_token` 生成令牌
- 构建重置链接：`{web.url}/reset-password?key={token}`
- 链接 1 小时有效

### 发送修改邮箱验证邮件

```python
def send_change_email_email(old_email, new_email, user_id, database)
```

- 生成包含 `user_id`、`new_email`、`time` 的 JWT 令牌
- 构建验证链接：`{web.url}/change-email?key={token}`
- 邮件发送到新邮箱，链接 1 小时有效

---

## 工具模块

### crypto — 加密工具

`app/utils/crypto.py` 提供 JWT 和哈希功能：

| 函数 | 说明 |
|------|------|
| `data2sha256(data)` | SHA-256 哈希 |
| `json_encryption(data, key)` | JWT HS256 加密 |
| `json_decryption(token, key)` | JWT HS256 解密 |

### password — 密码生成

`app/utils/password.py`：

| 函数 | 说明 |
|------|------|
| `generate_password(length=32)` | 生成随机字母数字密码/密钥 |

> GrLogin 启动时使用此函数生成 128 位 JWT 签名密钥。

### url — URL 工具

`app/utils/url.py`：

| 函数 | 说明 |
|------|------|
| `url_join_args(api, query, **kwargs)` | 拼接 URL 和查询参数 |

```python
url_join_args("/authorize", {"client_id": "xxx", "scope": "openid"})
# => "/authorize?client_id=xxx&scope=openid"
```
