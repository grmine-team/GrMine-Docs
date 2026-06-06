# Accordion 手风琴

手风琴用于折叠/展开内容区域，节省页面空间，适合 FAQ、设置项等场景。

## 基础用法

```html
<div class="gm-accordion">
  <div class="gm-accordion-item">
    <button class="gm-accordion-trigger">
      什么是 GrMine UI？
      <span class="gm-accordion-icon">▼</span>
    </button>
    <div class="gm-accordion-content">
      GrMine UI 是一款追求精致极简的 CSS 组件库，无需 JavaScript 依赖。
    </div>
  </div>
  <div class="gm-accordion-item gm-accordion-item-open">
    <button class="gm-accordion-trigger">
      如何安装？
      <span class="gm-accordion-icon">▼</span>
    </button>
    <div class="gm-accordion-content">
      通过 npm install grmine-ui 或 CDN 引入即可。
    </div>
  </div>
  <div class="gm-accordion-item">
    <button class="gm-accordion-trigger">
      支持暗色模式吗？
      <span class="gm-accordion-icon">▼</span>
    </button>
    <div class="gm-accordion-content">
      支持，在根元素添加 data-theme="dark" 即可切换。
    </div>
  </div>
</div>
```

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-accordion` | 手风琴容器 |
| `gm-accordion-item` | 单个折叠项 |
| `gm-accordion-item-open` | 展开状态 |
| `gm-accordion-trigger` | 折叠项头部（可点击） |
| `gm-accordion-icon` | 展开指示图标 |
| `gm-accordion-content` | 折叠项内容 |

## 注意事项

展开状态通过 `gm-accordion-item-open` 类名控制，图标会自动旋转 180 度。

## 暗色模式

暗色模式下折叠项背景使用深色，头部悬停态使用更深的灰色，展开指示箭头颜色自动适配。
