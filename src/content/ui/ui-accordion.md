# Accordion 手风琴

手风琴用于折叠/展开内容区域，节省页面空间，适合 FAQ、设置项等场景。

## 基础用法

```html
<div class="gm-accordion">
  <details class="gm-accordion__item">
    <summary class="gm-accordion__header">什么是 GrMine UI？</summary>
    <div class="gm-accordion__body">
      GrMine UI 是一款追求精致极简的 CSS 组件库。
    </div>
  </details>
  <details class="gm-accordion__item" open>
    <summary class="gm-accordion__header">如何安装？</summary>
    <div class="gm-accordion__body">
      通过 npm install grmine-ui 或 CDN 引入即可。
    </div>
  </details>
</div>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-accordion` | 默认手风琴 |
| `gm-accordion--bordered` | 带边框的手风琴 |
| `gm-accordion--separated` | 分离样式，每项独立卡片 |

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-accordion__item` | 单个折叠项 |
| `gm-accordion__header` | 折叠项头部（可点击） |
| `gm-accordion__body` | 折叠项内容 |

## 分离样式

```html
<div class="gm-accordion gm-accordion--separated">
  <details class="gm-accordion__item">
    <summary class="gm-accordion__header">问题一</summary>
    <div class="gm-accordion__body">答案一</div>
  </details>
  <details class="gm-accordion__item">
    <summary class="gm-accordion__header">问题二</summary>
    <div class="gm-accordion__body">答案二</div>
  </details>
</div>
```

## 注意事项

使用原生 `<details>` / `<summary>` 元素，无需 JavaScript 即可工作。展开状态通过 `open` 属性控制。

## 暗色模式

暗色模式下折叠项背景使用深色，头部悬停态使用更深的灰色，展开指示箭头颜色自动适配。
