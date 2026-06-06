# Card 卡片

卡片用于承载一组相关内容，提供视觉上的分组与层次感。

## 基础用法

<div class="gm-example">
  <div class="gm-card" style="max-width:320px">
    <div class="gm-card-header">
      <h3 class="gm-card-title">卡片标题</h3>
      <p class="gm-card-desc">辅助说明文字</p>
    </div>
    <div class="gm-card-body">
      卡片正文内容区域，可以放置任意内容。
    </div>
  </div>
</div>

```html
<div class="gm-card">
  <div class="gm-card-header">
    <h3 class="gm-card-title">卡片标题</h3>
    <p class="gm-card-desc">辅助说明文字</p>
  </div>
  <div class="gm-card-body">
    卡片正文内容区域。
  </div>
</div>
```

## 带操作区

<div class="gm-example">
  <div class="gm-card" style="max-width:320px">
    <div class="gm-card-header">
      <h3 class="gm-card-title">确认提交</h3>
    </div>
    <div class="gm-card-body">
      确定要提交当前表单数据吗？
    </div>
    <hr class="gm-card-separator" />
    <div class="gm-card-footer">
      <button class="gm-btn gm-btn-ghost">取消</button>
      <button class="gm-btn gm-btn-primary">确认</button>
    </div>
  </div>
</div>

```html
<div class="gm-card">
  <div class="gm-card-header">
    <h3 class="gm-card-title">确认提交</h3>
  </div>
  <div class="gm-card-body">
    确定要提交当前表单数据吗？
  </div>
  <hr class="gm-card-separator" />
  <div class="gm-card-footer">
    <button class="gm-btn gm-btn-ghost">取消</button>
    <button class="gm-btn gm-btn-primary">确认</button>
  </div>
</div>
```

## 可交互卡片

<div class="gm-example">
  <div class="gm-card gm-card-interactive" style="max-width:280px">
    <div class="gm-card-body">
      <h3 class="gm-card-title">可点击卡片</h3>
      <p class="gm-card-desc">悬停时显示阴影与位移效果</p>
    </div>
  </div>
</div>

```html
<div class="gm-card gm-card-interactive">
  <div class="gm-card-body">
    <h3 class="gm-card-title">可点击卡片</h3>
    <p class="gm-card-desc">悬停时显示阴影与位移效果</p>
  </div>
</div>
```

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-card` | 卡片容器 |
| `gm-card-header` | 头部区域 |
| `gm-card-title` | 标题文字 |
| `gm-card-desc` | 描述文字 |
| `gm-card-body` | 内容区域 |
| `gm-card-footer` | 底部操作区 |
| `gm-card-separator` | 分割线 |
| `gm-card-interactive` | 可交互卡片（悬停效果） |

## 暗色模式

暗色模式下卡片背景切换为深灰色，边框与阴影自动适配。
