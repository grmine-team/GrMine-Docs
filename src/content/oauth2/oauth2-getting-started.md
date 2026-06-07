# 快速开始

欢迎使用 GrMine OAuth2.0 —— 基于 OAuth2.0 Authorization Code Flow 的统一认证授权系统。

## 系统架构

GrMine OAuth2.0 由两个核心服务组成：

| 服务 | 技术栈 | 职责 |
|------|--------|------|
| **GrLogin** | Flask + MongoDB | 用户登录、注册、授权确认等前端交互 |
| **GrAuth** | FastAPI (GrAPI 插件) + MongoDB | Token 签发、验证、用户信息接口 |

```
┌─────────────┐    授权码     ┌─────────────┐    Token     ┌─────────────┐
│   用户浏览器  │ ──────────→ │   GrLogin    │ ──────────→ │   第三方应用  │
│             │ ←────────── │  (Flask)     │             │   (Client)   │
└─────────────┘   登录/确认   └─────────────┘             └──────┬──────┘
                                                       Token交换│
                                                       用户信息 │
                                                              ▼
                                                       ┌─────────────┐
                                                       │   GrAuth     │
                                                       │  (FastAPI)   │
                                                       └─────────────┘
```

## 前置要求

- Python >= 3.8
- MongoDB 实例
- SMTP 邮件服务（用于注册验证、密码重置等）

## 快速部署

### 1. 部署 GrLogin

```bash
cd GrLogin
pip install -r requirements.txt
```

编辑 `config.json`，配置数据库和邮件信息：

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

启动服务：

```bash
python main.py
# 或使用 Gunicorn
gunicorn -c gunicorn_conf.py main:app
```

### 2. 部署 GrAuth

```bash
cd GrAuth
pip install -r requirements.txt
```

编辑 `config.json`：

```json
{
  "host": "0.0.0.0",
  "port": 8000,
  "pip_path": "pip",
  "title": "GrAPI Server"
}
```

编辑 `plugins/GrAuth/config.yml`，配置数据库连接：

```yaml
database:
  url: "mongodb://user:pass@host:27017/dbname"
  database_name: "dbname"
```

启动服务：

```bash
python main.py
```

### 3. 构建并安装 GrAuth 插件

```bash
cd GrAuth
python tools/build_plugin.py build ./src -o ./plugins
```

## 下一步

- 阅读 [OAuth2.0 授权流程](oauth2-flow) 了解完整授权流程
- 阅读 [GrLogin 开发文档](grlogin-overview) 了解登录服务细节
- 阅读 [GrAuth 开发文档](grauth-overview) 了解认证服务细节
