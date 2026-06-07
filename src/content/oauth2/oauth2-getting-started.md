# 快速开始

GrMine OAuth2.0 提供标准的 OAuth2.0 Authorization Code Flow，让你的应用快速接入 GrMine 账号登录。

## 接入概览

```
你的应用                    GrMine                     用户
  |                          |                          |
  |  1. 跳转到授权页面        |                          |
  | ----------------------> | --> 展示登录页面          |
  |                          |                          |
  |                          | <-- 用户登录并授权        |
  |                          |                          |
  |  2. 回调携带授权码       |                          |
  | <----------------------- |                          |
  |                          |                          |
  |  3. 用授权码换取 Token    |                          |
  | ----------------------> |                          |
  |                          |                          |
  |  4. 返回 access_token    |                          |
  | <----------------------- |                          |
  |                          |                          |
  |  5. 用 Token 获取用户信息 |                          |
  | ----------------------> |                          |
  |                          |                          |
  |  6. 返回用户资料         |                          |
  | <----------------------- |                          |
```

## 前置条件

- 已在 GrMine 注册你的应用，获取 `client_id` 和 `client_secret`
- 你的应用有一个可访问的后端服务（用于安全地交换 Token）

## 三步接入

### 第一步：引导用户授权

将用户重定向到 GrMine 授权页面：

```
https://account.grmine.cn/authorize?response_type=code&client_id=你的CLIENT_ID&redirect_uri=你的回调地址&scope=openid profile email&state=随机字符串
```

### 第二步：用授权码换取 Token

用户授权后，GrMine 会回调到你的 `redirect_uri` 并携带 `code` 参数。在你的后端用这个 `code` 换取 Token：

```
POST https://api.grmine.cn/auth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=授权码&client_id=你的CLIENT_ID&client_secret=你的CLIENT_SECRET
```

### 第三步：获取用户信息

用 `access_token` 调用用户信息接口：

```
POST https://api.grmine.cn/auth/userinfo
Authorization: Bearer <access_token>
```

返回：

```json
{
  "sub": "用户唯一ID",
  "username": "用户名",
  "email": "用户邮箱"
}
```

## 下一步

- 阅读 [授权流程详解](oauth2-flow) 了解每个步骤的完整参数和错误处理
- 阅读 [API 参考](oauth2-api) 查看所有接口的详细文档
- 阅读 [接入示例](oauth2-examples) 查看各语言/框架的示例代码
