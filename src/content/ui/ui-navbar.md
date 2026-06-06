# Navbar 导航栏

导航栏用于顶部全局导航，包含品牌标识与功能入口。

## 基础用法

<div class="gm-example" style="padding:0">
  <nav class="gm-navbar">
    <div class="gm-navbar-brand">GrMine</div>
    <div class="gm-navbar-nav">
      <a class="gm-navbar-item gm-navbar-item-active">首页</a>
      <a class="gm-navbar-item">文档</a>
      <a class="gm-navbar-item">关于</a>
    </div>
    <div class="gm-navbar-actions">
      <button class="gm-btn gm-btn-sm gm-btn-primary">登录</button>
    </div>
  </nav>
</div>

```html
<nav class="gm-navbar">
  <div class="gm-navbar-brand">GrMine</div>
  <div class="gm-navbar-nav">
    <a class="gm-navbar-item gm-navbar-item-active">首页</a>
    <a class="gm-navbar-item">文档</a>
    <a class="gm-navbar-item">关于</a>
  </div>
  <div class="gm-navbar-actions">
    <button class="gm-btn gm-btn-sm gm-btn-primary">登录</button>
  </div>
</nav>
```

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-navbar` | 导航栏容器（默认 sticky 定位 + 毛玻璃背景） |
| `gm-navbar-brand` | 品牌区域 |
| `gm-navbar-nav` | 导航链接容器 |
| `gm-navbar-item` | 单个导航链接 |
| `gm-navbar-item-active` | 当前激活链接 |
| `gm-navbar-actions` | 操作按钮区域 |

## 暗色模式

暗色模式下导航栏背景切换为深色，链接文字使用浅色，激活链接使用强调色高亮。
