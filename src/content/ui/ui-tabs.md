# Tabs 标签页

标签页用于在同一区域切换不同内容视图，减少页面跳转。

## 基础用法

```html
<div class="gm-tabs">
  <div class="gm-tabs__list">
    <button class="gm-tabs__tab gm-tabs__tab--active">概览</button>
    <button class="gm-tabs__tab">详情</button>
    <button class="gm-tabs__tab">设置</button>
  </div>
  <div class="gm-tabs__panel">
    当前标签页的内容
  </div>
</div>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-tabs` | 默认标签页，底部下划线指示 |
| `gm-tabs--pills` | 胶囊标签页，激活项带背景色 |
| `gm-tabs--bordered` | 边框标签页，带顶部边框 |

## 胶囊样式

```html
<div class="gm-tabs gm-tabs--pills">
  <div class="gm-tabs__list">
    <button class="gm-tabs__tab gm-tabs__tab--active">日</button>
    <button class="gm-tabs__tab">周</button>
    <button class="gm-tabs__tab">月</button>
  </div>
</div>
```

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-tabs__list` | 标签列表容器 |
| `gm-tabs__tab` | 单个标签 |
| `gm-tabs__tab--active` | 激活标签 |
| `gm-tabs__tab--disabled` | 禁用标签 |
| `gm-tabs__panel` | 内容面板 |

## 禁用标签

```html
<button class="gm-tabs__tab gm-tabs__tab--disabled" disabled>不可用</button>
```

## 暗色模式

暗色模式下标签文字使用浅色，激活下划线保持强调色，胶囊样式的激活背景使用深色强调色。
