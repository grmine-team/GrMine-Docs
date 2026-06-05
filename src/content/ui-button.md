# Button 按钮

按钮用于触发操作或提交表单，是界面中最基础的交互元素。

## 基础用法

```html
<button class="gm-btn">默认按钮</button>
<button class="gm-btn gm-btn--primary">主要按钮</button>
<button class="gm-btn gm-btn--secondary">次要按钮</button>
<button class="gm-btn gm-btn--ghost">幽灵按钮</button>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-btn` | 默认按钮，带边框 |
| `gm-btn--primary` | 主要按钮，实心强调色背景 |
| `gm-btn--secondary` | 次要按钮，浅色背景 |
| `gm-btn--ghost` | 幽灵按钮，无边框透明背景 |
| `gm-btn--danger` | 危险按钮，红色调 |

## 尺寸

```html
<button class="gm-btn gm-btn--sm">小按钮</button>
<button class="gm-btn">默认尺寸</button>
<button class="gm-btn gm-btn--lg">大按钮</button>
```

| 修饰符 | 说明 |
|--------|------|
| `gm-btn--sm` | 小尺寸，适合紧凑布局 |
| `gm-btn--lg` | 大尺寸，适合突出操作 |

## 状态

```html
<button class="gm-btn" disabled>禁用状态</button>
<button class="gm-btn gm-btn--loading">加载中</button>
```

## 图标按钮

```html
<button class="gm-btn gm-btn--icon">
  <span class="gm-icon gm-icon--plus"></span>
</button>
```

## 暗色模式

按钮在暗色模式下自动调整背景与文字对比度，无需额外配置。`gm-btn--ghost` 在暗色模式下边框变亮以保持可见性。
