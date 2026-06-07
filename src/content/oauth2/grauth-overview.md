# GrAuth 概览

GrAuth 是 GrMine OAuth2.0 的 Token 服务，以 GrAPI 插件形式运行在 FastAPI 上，负责 Token 签发、验证和用户信息查询。

## 项目结构

```
GrAuth/
├── main.py                  # GrAPI 服务器入口
├── plugin.py                # 插件管理器
├── config.json              # 服务器配置
├── requirements.txt         # Python 依赖
├── src/                     # GrAuth 插件源码
│   ├── main.py              # 插件入口（OAuth2.0 端点）
│   ├── database.py          # 数据库操作层
│   └── info.json            # 插件元数据
├── plugins/
│   ├── GrAuth/              # 插件配置目录
│   │   └── config.yml       # 数据库配置
│   └── GrAuth 1.0.0.grpl   # 编译后的插件包
├── module/                  # GrAPI 框架核心
│   ├── __init__.py
│   ├── GrAPI.py             # 插件 SDK
│   ├── plugin_importer.py   # 插件模块导入器
│   ├── tools.py             # 控制台工具
│   └── zipimport.py         # ZIP 导入器
└── tools/
    └── build_plugin.py      # 插件构建工具
```

## GrAPI 框架

GrAuth 运行在 GrAPI —— 一个基于 FastAPI 的插件化框架之上。

### 服务器启动流程

1. `main.py` 加载 `config.json` 配置
2. 创建 FastAPI 应用，配置 CORS 中间件
3. `Plugin` 管理器扫描 `plugins/` 目录下的 `.grpl` 文件
4. 解析插件元数据，拓扑排序处理依赖
5. 依次加载插件，注册路由
6. 启动 uvicorn 服务

### 插件加载机制

```
plugins/
├── GrAuth/
│   └── config.yml           # 插件外部配置
└── GrAuth 1.0.0.grpl        # 插件包（ZIP 格式）
```

`.grpl` 文件是 ZIP 格式的插件包，包含：

- `info.json` — 插件元数据
- `main.py` — 插件入口
- `database.py` — 数据库模块
- `libs/` — 打包的第三方依赖（可选）

### 插件元数据 (info.json)

```json
{
  "package_name": "auth",
  "plugin_name": "GrAuth",
  "plugin_info": "GrLogin 的验证程序 (OAuth2.0)",
  "entrance": "main",
  "author": "bytfr",
  "version": "2.0.0",
  "grapi_version": "2.0",
  "dependent_plugin": [],
  "modules": [
    {"import_name": "pymongo", "module_name": "pymongo", "version": "4.10.1", "bundled": false},
    {"import_name": "jwt", "module_name": "pyjwt", "version": "2.10.1", "bundled": false}
  ],
  "python_version": ">=3.8"
}
```

| 字段 | 说明 |
|------|------|
| `package_name` | 包名，用于路由前缀和依赖引用 |
| `plugin_name` | 显示名称 |
| `entrance` | 入口模块名（不含 .py） |
| `dependent_plugin` | 依赖的其他插件包名列表 |
| `modules` | 第三方依赖列表 |
| `modules[].bundled` | 是否打包到 libs/ 目录（true 则随插件分发，false 则运行时 pip 安装） |

## 服务器配置 (config.json)

```json
{
  "host": "0.0.0.0",
  "port": 8000,
  "pip_path": "pip",
  "title": "GrAPI Server",
  "reload": false,
  "cors": {
    "allow_origins": ["*"],
    "allow_credentials": true,
    "allow_methods": ["*"],
    "allow_headers": ["*"]
  }
}
```

## 插件配置 (plugins/GrAuth/config.yml)

```yaml
database:
  url: "mongodb://user:pass@host:27017/dbname"
  database_name: "dbname"
```

## 内置管理端点

GrAPI 服务器提供以下内置端点：

| 端点 | 说明 |
|------|------|
| `GET /` | 服务器信息（名称、版本、已加载插件数） |
| `GET /plugins` | 已加载插件列表 |
| `GET /plugins/errors` | 插件加载错误列表 |

## 下一步

- 阅读 [GrAuth 端点详解](grauth-endpoints) 了解 OAuth2.0 API 细节
- 阅读 [GrAPI 插件开发](grapi-plugin-dev) 了解如何开发 GrAPI 插件
