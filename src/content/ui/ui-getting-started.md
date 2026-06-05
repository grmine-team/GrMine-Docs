# 快速开始

欢迎使用 GrMine UI —— 一款追求精致极简的 CSS 组件库。

## 引入样式

在项目入口文件中引入 GrMine UI 样式：

```html
<link rel="stylesheet" href="grmine-ui.css" />
```

或通过 npm 安装后引入：

```js
import 'grmine-ui/dist/grmine-ui.css';
```

## 基础用法

所有组件均使用 `gm-` 前缀的 CSS 类名，无需 JavaScript 依赖：

```html
<button class="gm-btn gm-btn--primary">开始使用</button>
```

## 启用暗色模式

在根元素添加 `data-theme="dark"` 属性即可切换为暗色模式：

```html
<html data-theme="dark">
  <!-- 页面内容 -->
</html>
```

也可通过 JavaScript 动态切换：

```js
document.documentElement.setAttribute('data-theme', 'dark');
```

## 下一步

- 阅读 [安装指南](/installation) 了解详细安装方式
- 阅读 [设计原则](/design-principles) 理解设计理念
- 浏览组件文档，开始构建界面
