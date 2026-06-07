# 认证路由详解

GrLogin 的所有认证路由定义在 `app/blueprints/auth.py` 中，注册为 `auth_bp` 蓝图。

## 路由总览

| 路由 | 方法 | 说明 |
|------|------|------|
| `/` | GET | 根路由，重定向到 `/authorize` |
| `/authorize` | GET/POST | OAuth2.0 授权端点（核心） |
| `/confirm` | GET/POST | 授权确认页面 |
| `/login` | GET/POST | 兼容旧版登录（重定向到 `/authorize`） |
| `/register` | GET/POST | 用户注册 |
| `/activation` | GET/POST | 邮箱激活 |
| `/captcha` | GET | 验证码图片 |
| `/forgot-password` | GET/POST | 忘记密码 |
| `/reset-password` | GET/POST | 重置密码 |
| `/change-email` | GET | 修改邮箱验证 |
| `/login/quick` | POST | 一键登录 |
| `/user/profile` | GET/POST | 用户信息管理 |

## `/authorize` — 授权端点

这是 OAuth2.0 的核心端点，实现了 Authorization Code Flow 的第一步。

### 请求参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `response_type` | 是 | 必须为 `code` |
| `client_id` | 是 | 第三方应用 ID |
| `redirect_uri` | 否 | 重定向 URI（需与注册的 URI 匹配） |
| `scope` | 否 | 权限范围，默认 `openid profile email` |
| `state` | 否 | CSRF 防护参数（推荐使用） |

### 处理流程

1. **GET 请求** — 验证参数后渲染登录页面
2. **POST 请求** — 处理登录表单：
   - 验证验证码
   - 验证邮箱和密码
   - 生成授权确认链接，重定向到 `/confirm`

### 参数验证

- `response_type` 必须为 `code`，否则返回 400 错误
- `client_id` 必须在数据库中存在
- `redirect_uri`（如提供）必须与注册的 URI 精确匹配
- `scope` 中的每一项必须在支持列表 `["openid", "profile", "email"]` 中

### 登录历史

GrLogin 通过 Cookie 维护用户登录历史，支持多账号快速切换：

- Cookie 名称：`login_history`
- 使用 `itsdangerous.URLSafeTimedSerializer` 加密
- 最多保存 5 个账号记录
- 有效期 30 天

## `/confirm` — 授权确认

用户登录成功后跳转到此页面，展示请求授权的应用和权限范围。

### 处理流程

1. 解密 `code` 参数中的确认数据
2. 验证确认码是否过期（10 分钟）或已使用
3. **GET** — 渲染确认页面，展示应用名称和请求的 scope
4. **POST** — 用户同意授权，重定向到第三方应用的 `redirect_uri`，携带 `code` 和 `state` 参数

### 重定向格式

```
{redirect_uri}?code={authorization_code}&state={state}
```

## `/register` — 用户注册

### 处理流程

1. **GET** — 渲染注册页面
2. **POST** — 验证验证码后，检查邮箱是否已注册
3. 发送激活邮件到用户邮箱
4. 渲染提示页面，告知用户查收邮件

激活链接有效期 24 小时。

## `/activation` — 邮箱激活

用户点击邮件中的激活链接后访问此端点。

### 处理流程

1. 解密 `key` 参数中的激活数据
2. 检查邮箱是否已注册
3. **GET** — 渲染设置用户名和密码的表单
4. **POST** — 验证验证码后，注册用户到数据库
5. 注册成功后重定向到登录页面

## `/forgot-password` — 忘记密码

### 处理流程

1. **GET** — 渲染忘记密码页面
2. **POST** — 验证验证码后，检查邮箱是否存在
3. 发送重置密码邮件
4. 渲染提示页面

重置链接有效期 1 小时。

## `/reset-password` — 重置密码

### 处理流程

1. 解密 `key` 参数中的重置数据
2. 验证令牌是否过期（1 小时）
3. **GET** — 渲染重置密码表单
4. **POST** — 验证验证码后，检查两次密码是否一致
5. 更新用户密码

## `/change-email` — 修改邮箱

用户在个人中心修改邮箱时，系统向新邮箱发送验证链接。

### 处理流程

1. 解密 `key` 参数中的修改数据
2. 验证令牌是否过期（1 小时）
3. 更新用户邮箱
4. 清除登录历史 Cookie

## `/login/quick` — 一键登录

支持通过登录历史中的 Token 快速登录，无需重新输入密码。

### 请求参数

| 参数 | 必填 | 说明 |
|------|------|------|
| `token` | 是 | 登录历史中的 Token |
| `client_id` | 是 | 第三方应用 ID |
| `redirect_uri` | 否 | 重定向 URI |
| `scope` | 否 | 权限范围 |
| `state` | 否 | CSRF 防护参数 |

### 处理流程

1. 验证 `client_id` 和 `redirect_uri`
2. 解密登录 Token，获取 `user_id`
3. 查找用户，设置会话
4. 生成确认链接并重定向

## `/user/profile` — 用户信息管理

需要用户已登录（会话中有 `user_id`）。

### 功能

- **更新用户名** — 直接修改
- **修改邮箱** — 发送验证邮件到新邮箱
- **修改密码** — 验证当前密码后更新
