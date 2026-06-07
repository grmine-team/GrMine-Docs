# GrAPI 插件开发

GrAPI 是基于 FastAPI 的插件化框架，GrAuth 即作为其插件运行。本文介绍如何开发 GrAPI 插件。

## 插件包结构

一个标准的 GrAPI 插件目录结构如下：

```
my-plugin/
├── info.json        # 插件元数据（必需）
├── main.py          # 插件入口（必需）
├── database.py      # 数据库模块（可选）
├── config.yml       # 默认配置模板（可选）
└── libs/            # 打包的第三方依赖（可选，由构建工具自动生成）
    ├── some_lib/
    │   └── __init__.py
    └── win-amd64/   # 平台特定的二进制文件
        └── some_ext.pyd
```

## info.json 元数据

```json
{
  "package_name": "com.example.myplugin",
  "plugin_name": "MyPlugin",
  "plugin_info": "插件描述",
  "entrance": "main",
  "author": "作者名",
  "version": "1.0.0",
  "author_info": "联系方式",
  "grapi_version": "2.0",
  "dependent_plugin": [],
  "modules": [
    {
      "import_name": "requests",
      "module_name": "requests",
      "version": "2.31.0",
      "bundled": false
    }
  ],
  "python_version": ">=3.8"
}
```

| 字段 | 必填 | 说明 |
|------|------|------|
| `package_name` | 是 | 包名，用于路由前缀 (`/{package_name}`) 和依赖引用 |
| `plugin_name` | 是 | 显示名称 |
| `entrance` | 是 | 入口模块文件名（不含 `.py`） |
| `version` | 是 | 版本号 |
| `dependent_plugin` | 否 | 依赖的其他插件 `package_name` 列表 |
| `modules` | 否 | 第三方 Python 依赖列表 |
| `modules[].bundled` | 否 | `true` 表示随插件分发，`false` 表示运行时 pip 安装 |
| `python_version` | 否 | Python 版本要求 |

## 插件入口 (main.py)

```python
from module.GrAPI import GrAPI

# GrAPI(__doc__) 接收框架注入的 PluginAPI 对象
API = GrAPI(__doc__)


@API.get("/hello")
def hello():
    return {"message": "Hello from MyPlugin!"}


@API.post("/data")
def create_data(data: dict):
    return {"received": data}


def main():
    """插件加载时调用"""
    API.console.info(f"Plugin {API.get_plugin_name()} loaded!")


def loaded():
    """所有插件加载完成后调用"""
    API.console.success("All plugins loaded!")
```

> **重要**：插件不能直接运行，必须通过 GrAPI 框架加载。`GrAPI(__doc__)` 会验证调用来源。

## GrAPI SDK

`module/GrAPI.py` 提供的插件开发 SDK。

### 路由注册

所有路由自动添加 `/{package_name}` 前缀。例如 `package_name` 为 `auth` 时，`@API.get("/hello")` 注册的路由为 `/auth/hello`。

```python
# 装饰器方式
@API.route("/path", methods=["GET", "POST"])
def handler():
    pass

@API.get("/path")
def handler():
    pass

@API.post("/path")
def handler():
    pass

@API.put("/path")
def handler():
    pass

@API.delete("/path")
def handler():
    pass

# 使用 APIRouter
from fastapi import APIRouter
router = APIRouter()
@router.get("/sub")
def sub_handler():
    pass
API.include_router(router)
```

### 配置读写

配置文件存储在 `plugins/{plugin_name}/` 目录下，与 `.grpl` 包分离。

```python
# 检查配置是否存在
if not API.exist_config("config.yml"):
    # 写入默认配置
    API.write_config("config.yml", "key: value", "yaml")

# 读取配置
config = API.read_config("config.yml", "yaml")

# 写入 JSON 配置
API.write_config("config.json", {"key": "value"}, "json")
```

| 方法 | 说明 |
|------|------|
| `exist_config(filename)` | 检查配置文件是否存在 |
| `read_config(filename, type)` | 读取配置（支持 json/yaml/纯文本） |
| `write_config(filename, data, type)` | 写入配置 |

### 插件间通信

```python
# 在 info.json 中声明依赖
# "dependent_plugin": ["other_plugin"]

# 获取依赖插件的模块
other = API.get_plugin("other_plugin")
```

### 加载插件内部模块

```python
# 加载插件包内的模块（如 database.py）
db_module = API.load_plugin_module("database")
db = db_module.Database(url, name)
```

### 数据文件访问

```python
# 读取插件包内的文件
data = API.get_data_file("templates/index.html")
text = API.get_data_text("config/default.json")

# 检查文件是否存在
if API.has_data_file("assets/logo.png"):
    logo = API.get_data_file("assets/logo.png")
```

### 打包库支持

对于 `bundled: true` 的依赖，插件包内的 `libs/` 目录包含预打包的库：

```python
# 导入打包的库
module = API.get_bundled_module("some_lib")

# 列出所有打包的模块
modules = API.list_bundled_modules()
```

### 插件元信息

```python
API.get_plugin_info()     # 完整元数据字典
API.get_plugin_name()     # 插件名称
API.get_plugin_version()  # 版本号
API.get_plugin_author()   # 作者
```

### 控制台输出

```python
API.console.debug("调试信息")
API.console.info("普通信息")
API.console.warning("警告信息")
API.console.error("错误信息")
API.console.success("成功信息")
```

## 构建插件

使用 `tools/build_plugin.py` 构建插件包：

```bash
# 构建插件
python tools/build_plugin.py build ./src

# 指定输出目录
python tools/build_plugin.py build ./src -o ./plugins

# 不打包依赖
python tools/build_plugin.py build ./src --no-libs

# 为所有平台构建
python tools/build_plugin.py build ./src --platforms all

# 为特定平台构建
python tools/build_plugin.py build ./src --platforms win-amd64,linux-x86_64

# 创建插件模板
python tools/build_plugin.py init ./my-plugin
```

### 支持的平台

| 平台标识 | 说明 |
|----------|------|
| `win-amd64` | Windows 64 位 |
| `win-x86` | Windows 32 位 |
| `linux-x86_64` | Linux 64 位 |
| `linux-aarch64` | Linux ARM64 |
| `macos-x86_64` | macOS Intel |
| `macos-arm64` | macOS Apple Silicon |

### 构建流程

1. 验证源码目录和 `info.json`
2. 复制源码到临时目录
3. 下载 `bundled: true` 的依赖到 `libs/` 目录
   - 先下载纯 Python wheel
   - 再为各平台下载平台特定的 wheel
4. 验证打包的依赖是否完整
5. 打包为 `.grpl` 文件（ZIP 格式）

## 插件加载流程

```
1. 扫描 plugins/ 目录下的 .grpl 文件
2. 读取 info.json 元数据
3. 拓扑排序处理依赖关系
4. 依次加载每个插件：
   a. 递归加载依赖插件
   b. 注册打包库导入器
   c. 安装/导入第三方依赖
   d. 创建 PluginAPI 并注入
   e. 加载入口模块
   f. 挂载路由到 FastAPI
5. 调用所有插件的 loaded() 钩子
```

## 插件生命周期

| 钩子 | 调用时机 | 说明 |
|------|----------|------|
| `main()` | 插件加载时 | 初始化逻辑 |
| `loaded()` | 所有插件加载完成后 | 依赖其他插件的初始化逻辑 |
| `unload()` | 插件卸载时 | 清理资源 |

## 框架核心模块

### zipimport — ZIP 导入器

`module/zipimport.py` 实现了基于 `zipfile` 的模块导入器，替代 CPython 内部的 `zipimport` 模块。

核心功能：
- `zipimporter(path)` — 打开 ZIP 归档
- `get_data(path)` — 读取归档内文件
- `load_module(fullname, globals_dict, module_name)` — 加载模块并注入命名空间

### plugin_importer — 打包库导入器

`module/plugin_importer.py` 实现了 `importlib.abc.MetaPathFinder` 和 `importlib.abc.Loader` 接口，使插件可以导入 `libs/` 目录下打包的库。

核心功能：
- 自动扫描 `libs/` 下的 Python 模块和扩展模块
- 支持平台特定的二进制文件（`.pyd`/`.so`）
- 预解压平台二进制文件到临时目录，支持 `ctypes` 和 C++ 扩展
- Windows 下自动添加 DLL 搜索路径

### tools — 控制台工具

`module/tools.py` 提供带颜色的控制台输出：

```python
console = Console("MyModule")
console.debug("调试")
console.info("信息")
console.warning("警告")
console.error("错误")
console.success("成功")
```

支持：
- 彩色输出（需要 colorama）
- 日志级别过滤
- 文件日志输出
