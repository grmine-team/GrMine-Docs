# Card 卡片

卡片用于承载一组相关内容，提供视觉上的分组与层次感。

## 基础用法

```html
<div class="gm-card">
  <div class="gm-card__header">
    <h3 class="gm-card__title">卡片标题</h3>
  </div>
  <div class="gm-card__body">
    卡片正文内容。
  </div>
</div>
```

## 带操作区

```html
<div class="gm-card">
  <div class="gm-card__header">
    <h3 class="gm-card__title">卡片标题</h3>
    <span class="gm-card__subtitle">辅助信息</span>
  </div>
  <div class="gm-card__body">
    内容区域
  </div>
  <div class="gm-card__footer">
    <button class="gm-btn gm-btn--sm gm-btn--primary">确认</button>
    <button class="gm-btn gm-btn--sm gm-btn--ghost">取消</button>
  </div>
</div>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-card` | 默认卡片，白色背景 + 微阴影 |
| `gm-card--bordered` | 边框卡片，无阴影 |
| `gm-card--flat` | 扁平卡片，无边框无阴影 |

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-card__header` | 头部区域 |
| `gm-card__title` | 标题文字 |
| `gm-card__subtitle` | 副标题 |
| `gm-card__body` | 内容区域 |
| `gm-card__footer` | 底部操作区 |
| `gm-card__media` | 媒体区域（图片等） |

## 暗色模式

暗色模式下卡片背景切换为深灰色（`--gm-neutral-800`），边框与阴影自动适配。
