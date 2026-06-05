# Sidebar 侧边栏

侧边栏用于页面侧面的辅助导航，常与主内容区配合使用。

## 基础用法

```html
<aside class="gm-sidebar">
  <div class="gm-sidebar__header">
    <span class="gm-sidebar__title">导航</span>
  </div>
  <nav class="gm-sidebar__nav">
    <a class="gm-sidebar__item gm-sidebar__item--active">概览</a>
    <a class="gm-sidebar__item">组件</a>
    <a class="gm-sidebar__item">主题</a>
  </nav>
</aside>
```

## 带分组的侧边栏

```html
<aside class="gm-sidebar">
  <div class="gm-sidebar__group">
    <div class="gm-sidebar__group-label">基础</div>
    <a class="gm-sidebar__item">色彩</a>
    <a class="gm-sidebar__item">排版</a>
  </div>
  <div class="gm-sidebar__group">
    <div class="gm-sidebar__group-label">组件</div>
    <a class="gm-sidebar__item gm-sidebar__item--active">按钮</a>
    <a class="gm-sidebar__item">卡片</a>
  </div>
</aside>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-sidebar` | 默认侧边栏 |
| `gm-sidebar--collapsed` | 折叠模式，仅显示图标 |

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-sidebar__header` | 头部区域 |
| `gm-sidebar__title` | 标题 |
| `gm-sidebar__nav` | 导航容器 |
| `gm-sidebar__group` | 分组容器 |
| `gm-sidebar__group-label` | 分组标签 |
| `gm-sidebar__item` | 导航项 |
| `gm-sidebar__item--active` | 激活状态 |

## 布局配合

```html
<div class="gm-layout">
  <aside class="gm-sidebar">...</aside>
  <main class="gm-layout__content">...</main>
</div>
```

## 暗色模式

暗色模式下侧边栏使用 `--gm-neutral-900` 背景，导航项悬停与激活态使用深色高亮。
