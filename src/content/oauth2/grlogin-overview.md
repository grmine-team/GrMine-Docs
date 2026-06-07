# GrLogin 概览

GrLogin 是 GrMine OAuth2.0 的前端交互服务，基于 Flask 构建，负责用户登录、注册、授权确认等所有用户可见的交互流程。

## 项目结构

```
GrLogin/
├── main.py                  # 应用入口
├── config.json              # 全局配置（数据库、邮件、Web）
├── requirements.txt         # Python 依赖
├── gunicorn_conf.py         # Gunicorn 配置
├── arial.ttf                # 验证码字体
├── app/
│   ├── __init__.py          # 应用工厂 (create_app)
│   ├── blueprints/
│   │   ├── __init__.py      # 蓝图注册
│   │   └── auth.py          # 认证路由（核心）
│   ├── config/
│   │   └── __init__.py      # 配置管理 (Config 类)
│   ├── models/
│   │   ├── __init__.py
│   │   └── database.py      # 数据库操作层
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py  # 认证业务逻辑
│   │   ├── captcha_service.py # 验证码生成
│   │   └── email_service.py # 邮件发送服务
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── crypto.py        # 加密/解密工具 (JWT + SHA256)
│   │   ├── password.py      # 密码/密钥生成
│   │   └── url.py           # URL 拼接工具
│   ├── static/              # 静态资源 (CSS/JS)
│   └── templates/           # Jinja2 模板
│       ├── error/           # 错误页面
│       ├── login/           # 登录 & 确认页面
│       ├── register/        # 注册页面
│       ├── forgot_password/ # 忘记密码
│       ├── reset_password/  # 重置密码
│       ├── message/         # 消息提示页面
│       └── user/            # 用户中心
└── flask_session/           # 服务端会话存储
```

## 应用工厂

GrLogin 使用 Flask 应用工厂模式：

```python
from app import create_app

app = create_app()
```

工厂函数 `create_app()` 完成以下初始化：

1. **配置加载** — 从 `config.json` 读取数据库、邮件、Web 配置
2. **会话配置** — 使用 `flask-session` 的文件系统会话，有效期 7 天
3. **密钥生成** — 每次启动随机生成 `secret_key`
4. **邮件初始化** — 配置 Flask-Mail
5. **数据库初始化** — 连接 MongoDB，自动生成 JWT 签名密钥
6. **蓝图注册** — 注册 `auth_bp` 认证蓝图

## 配置说明

`config.json` 结构：

```json
{
  "database": {
    "url": "mongodb://user:pass@host:27017/dbname",
    "name": "dbname"
  },
  "web": {
    "url": "https://account.example.com/"
  },
  "mail": {
    "server_host": "smtp.qq.com",
    "server_port": 465,
    "use_ssl": true,
    "use_tls": false,
    "mail_username": "your@email.com",
    "mail_password": "smtp-auth-password"
  }
}
```

| 字段 | 说明 |
|------|------|
| `database.url` | MongoDB 连接字符串 |
| `database.name` | 数据库名称 |
| `web.url` | 站点基础 URL，用于生成邮件中的链接 |
| `mail.*` | SMTP 邮件服务配置 |

## 数据库

GrLogin 使用 MongoDB，通过 `app/models/database.py` 的 `Database` 类操作。启动时自动初始化以下集合：

| 集合 | 说明 |
|------|------|
| `users` | 用户信息（uuid, email, username, password, time） |
| `application` | 第三方应用注册信息（application_id, secret, redirect_url） |
| `web_set` | 系统配置（存储 JWT 签名密钥） |
| `code_temp` | 已使用的授权码记录（TTL 索引，5 分钟自动过期） |

### 用户数据结构

```json
{
  "uuid": "用户唯一标识 (UUID5)",
  "email": "用户邮箱",
  "username": "用户名",
  "password": "SHA256 哈希密码",
  "time": "注册时间"
}
```

## 下一步

- 阅读 [认证路由详解](grlogin-routes) 了解各端点实现
- 阅读 [服务层详解](grlogin-services) 了解业务逻辑
