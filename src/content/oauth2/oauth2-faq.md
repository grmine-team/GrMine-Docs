# 常见问题

## 接入相关

### 如何注册我的应用？

联系 GrMine 管理员注册你的应用，注册后你会获得 `client_id` 和 `client_secret`。注册时需要提供：

- 应用名称
- 回调地址（`redirect_uri`）

### redirect_uri 有什么要求？

`redirect_uri` 必须与注册时填写的地址**完全一致**（包括协议、域名、端口、路径）。例如：

- 注册了 `https://app.example.com/auth/callback`
- 请求时必须传 `redirect_uri=https://app.example.com/auth/callback`
- 传 `http://app.example.com/auth/callback`（协议不同）会报错

### 可以不传 redirect_uri 吗？

可以。如果不传，GrMine 会使用注册时的默认回调地址。

### state 参数是必须的吗？

不是必须的，但**强烈推荐**使用。`state` 用于防止 CSRF 攻击，是 OAuth2.0 的安全最佳实践。

### scope 可以只请求部分权限吗？

可以。例如你只需要用户 ID 和用户名：

```
scope=openid profile
```

最小权限原则：只申请你需要的 scope。

## Token 相关

### access_token 过期了怎么办？

两种方式：

1. **使用 refresh_token**（推荐）— 无需用户重新登录，静默刷新
2. **重新走授权流程** — 用户需要重新登录和授权

### refresh_token 也会过期吗？

会，有效期 30 天。过期后用户需要重新走授权流程。

### 授权码 (code) 可以用几次？

只能用**一次**。使用后立即失效，重复使用会返回 `invalid_grant` 错误。

### Token 应该存储在哪里？

- `access_token` — 可存储在前端（如内存、sessionStorage），但不要存入 localStorage
- `refresh_token` — **必须存储在后端**，不要暴露给前端
- `client_secret` — **必须存储在后端**，永远不要发送到前端

## 安全相关

### 为什么授权码交换必须在前端还是后端？

必须在**后端**。因为交换 Token 需要 `client_secret`，这个值不能暴露给前端（浏览器）。如果泄露，攻击者可以冒充你的应用。

### 如何防止 CSRF 攻击？

使用 `state` 参数：

1. 在跳转授权页面前，生成随机字符串并存入用户会话
2. 将 `state` 传给 GrMine
3. 在回调中验证返回的 `state` 是否与会话中的一致

### HTTPS 重要吗？

非常重要。所有 OAuth2.0 通信都应通过 HTTPS 进行，防止 Token 被窃听。

## 错误排查

### 收到 `invalid_client` 错误

检查 `client_id` 和 `client_secret` 是否正确。

### 收到 `invalid_grant` 错误

可能原因：
- 授权码已过期（10 分钟有效期）
- 授权码已被使用过
- `redirect_uri` 与授权时不一致
- `client_id` 与授权码中的不匹配

### 收到 `invalid_token` 错误

- `access_token` 已过期，使用 `refresh_token` 刷新
- Token 格式错误，检查是否完整复制

### 用户授权后没有回调

- 检查 `redirect_uri` 是否正确
- 检查网络是否能访问你的回调地址
- 检查是否有防火墙拦截
