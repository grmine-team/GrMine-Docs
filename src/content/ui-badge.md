# Badge 徽标

徽标用于标注状态、分类或计数，提供简洁的视觉标记。

## 基础用法

```html
<span class="gm-badge">默认</span>
<span class="gm-badge gm-badge--primary">主要</span>
<span class="gm-badge gm-badge--success">成功</span>
<span class="gm-badge gm-badge--warning">警告</span>
<span class="gm-badge gm-badge--error">错误</span>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-badge` | 默认徽标，中性灰色 |
| `gm-badge--primary` | 强调色徽标 |
| `gm-badge--success` | 成功状态，绿色 |
| `gm-badge--warning` | 警告状态，黄色 |
| `gm-badge--error` | 错误状态，红色 |
| `gm-badge--neutral` | 中性浅色徽标 |

## 尺寸

```html
<span class="gm-badge gm-badge--sm">小</span>
<span class="gm-badge">默认</span>
```

| 修饰符 | 说明 |
|--------|------|
| `gm-badge--sm` | 小尺寸，适合行内标注 |

## 实心与描边

```html
<span class="gm-badge gm-badge--primary">实心</span>
<span class="gm-badge gm-badge--primary gm-badge--outline">描边</span>
```

| 修饰符 | 说明 |
|--------|------|
| `gm-badge--outline` | 描边样式，透明背景 |

## 圆点徽标

```html
<span class="gm-badge gm-badge--dot gm-badge--success">在线</span>
```

## 暗色模式

暗色模式下徽标颜色自动调整，实心变体降低饱和度以减少视觉刺激，描边变体边框亮度提升。
