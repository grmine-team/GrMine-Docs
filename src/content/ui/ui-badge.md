# Badge 徽标

徽标用于标注状态、分类或计数，提供简洁的视觉标记。

## 基础用法

```html
<span class="gm-badge gm-badge-default">默认</span>
<span class="gm-badge gm-badge-primary">主要</span>
<span class="gm-badge gm-badge-success">成功</span>
<span class="gm-badge gm-badge-warning">警告</span>
<span class="gm-badge gm-badge-danger">错误</span>
<span class="gm-badge gm-badge-info">信息</span>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-badge` | 徽标基础类 |
| `gm-badge-default` | 默认徽标，中性灰色 |
| `gm-badge-primary` | 强调色徽标 |
| `gm-badge-success` | 成功状态，绿色 |
| `gm-badge-warning` | 警告状态，黄色 |
| `gm-badge-danger` | 错误状态，红色 |
| `gm-badge-info` | 信息状态，蓝色 |

## 圆点徽标

```html
<span class="gm-badge gm-badge-success"><span class="gm-badge-dot"></span>在线</span>
<span class="gm-badge gm-badge-danger"><span class="gm-badge-dot"></span>离线</span>
<span class="gm-badge gm-badge-warning"><span class="gm-badge-dot"></span>忙碌</span>
```

## 标签（可移除）

```html
<span class="gm-tag">标签一</span>
<span class="gm-tag">标签二 <span class="gm-tag-remove">×</span></span>
<span class="gm-tag">标签三 <span class="gm-tag-remove">×</span></span>
```

## 暗色模式

暗色模式下徽标颜色自动调整，实心变体降低饱和度以减少视觉刺激。
