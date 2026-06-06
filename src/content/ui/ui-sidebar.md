# Sidebar 侧边栏

侧边栏用于页面侧面的辅助导航，常与主内容区配合使用。

## 基础用法

```html
<aside class="gm-sidebar" style="height: 200px;">
  <a class="gm-sidebar-item gm-sidebar-item-active">概览</a>
  <a class="gm-sidebar-item">组件</a>
  <a class="gm-sidebar-item">主题</a>
  <a class="gm-sidebar-item">设置</a>
</aside>
```

## 带分组

```html
<aside class="gm-sidebar" style="height: 280px;">
  <div class="gm-sidebar-section">
    <div class="gm-sidebar-heading">入门</div>
    <a class="gm-sidebar-item gm-sidebar-item-active">快速开始</a>
    <a class="gm-sidebar-item">安装指南</a>
  </div>
  <div class="gm-sidebar-section">
    <div class="gm-sidebar-heading">组件</div>
    <a class="gm-sidebar-item">Button 按钮</a>
    <a class="gm-sidebar-item">Card 卡片</a>
    <a class="gm-sidebar-item">Form 表单</a>
  </div>
</aside>
```

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-sidebar` | 侧边栏容器 |
| `gm-sidebar-section` | 分组容器 |
| `gm-sidebar-heading` | 分组标题 |
| `gm-sidebar-item` | 导航项 |
| `gm-sidebar-item-active` | 激活状态 |

## 暗色模式

暗色模式下侧边栏使用深色背景，导航项悬停与激活态使用深色高亮。
