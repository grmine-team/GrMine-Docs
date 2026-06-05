# Navbar 导航栏

导航栏用于顶部全局导航，包含品牌标识与功能入口。

## 基础用法

```html
<nav class="gm-navbar">
  <div class="gm-navbar__brand">
    <span class="gm-navbar__logo">GrMine</span>
  </div>
  <div class="gm-navbar__links">
    <a class="gm-navbar__link gm-navbar__link--active">首页</a>
    <a class="gm-navbar__link">文档</a>
    <a class="gm-navbar__link">关于</a>
  </div>
  <div class="gm-navbar__actions">
    <button class="gm-btn gm-btn--sm gm-btn--primary">登录</button>
  </div>
</nav>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-navbar` | 默认导航栏，白色背景 |
| `gm-navbar--bordered` | 底部带分割线 |
| `gm-navbar--fixed` | 固定在页面顶部 |

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-navbar__brand` | 品牌区域 |
| `gm-navbar__logo` | Logo 文字或图片 |
| `gm-navbar__links` | 导航链接容器 |
| `gm-navbar__link` | 单个导航链接 |
| `gm-navbar__link--active` | 当前激活链接 |
| `gm-navbar__actions` | 操作按钮区域 |

## 固定导航栏

```html
<nav class="gm-navbar gm-navbar--fixed gm-navbar--bordered">
  <!-- 内容 -->
</nav>
```

使用固定导航栏时，页面主体需添加对应的顶部间距：

```css
body { padding-top: var(--gm-space-16); }
```

## 暗色模式

暗色模式下导航栏背景切换为 `--gm-neutral-900`，链接文字使用浅色，激活链接使用强调色高亮。
