# 间距系统

GrMine UI 基于 4px 基础网格构建间距系统，确保视觉节奏的一致性。

## 间距变量

```html
<div style="display: flex; flex-direction: column; gap: 4px;">
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: var(--gm-space-1); height: 24px; background: var(--gm-accent-400); border-radius: 4px;"></div>
    <span class="gm-text-sm gm-text-muted">4px — space-1</span>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: var(--gm-space-2); height: 24px; background: var(--gm-accent-400); border-radius: 4px;"></div>
    <span class="gm-text-sm gm-text-muted">8px — space-2</span>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: var(--gm-space-3); height: 24px; background: var(--gm-accent-400); border-radius: 4px;"></div>
    <span class="gm-text-sm gm-text-muted">12px — space-3</span>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: var(--gm-space-4); height: 24px; background: var(--gm-accent-400); border-radius: 4px;"></div>
    <span class="gm-text-sm gm-text-muted">16px — space-4</span>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: var(--gm-space-6); height: 24px; background: var(--gm-accent-400); border-radius: 4px;"></div>
    <span class="gm-text-sm gm-text-muted">24px — space-6</span>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: var(--gm-space-8); height: 24px; background: var(--gm-accent-400); border-radius: 4px;"></div>
    <span class="gm-text-sm gm-text-muted">32px — space-8</span>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: var(--gm-space-12); height: 24px; background: var(--gm-accent-400); border-radius: 4px;"></div>
    <span class="gm-text-sm gm-text-muted">48px — space-12</span>
  </div>
  <div style="display: flex; align-items: center; gap: 8px;">
    <div style="width: var(--gm-space-16); height: 24px; background: var(--gm-accent-400); border-radius: 4px;"></div>
    <span class="gm-text-sm gm-text-muted">64px — space-16</span>
  </div>
</div>
```

| 变量 | 值 | 用途 |
|------|-----|------|
| `--gm-space-1` | 0.25rem (4px) | 图标与文字间距 |
| `--gm-space-2` | 0.5rem (8px) | 紧凑内边距 |
| `--gm-space-3` | 0.75rem (12px) | 组件内边距 |
| `--gm-space-4` | 1rem (16px) | 标准内边距 |
| `--gm-space-5` | 1.25rem (20px) | 区块间距 |
| `--gm-space-6` | 1.5rem (24px) | 大区块间距 |
| `--gm-space-8` | 2rem (32px) | 分区间距 |
| `--gm-space-10` | 2.5rem (40px) | 页面级间距 |
| `--gm-space-12` | 3rem (48px) | 大分区间距 |
| `--gm-space-16` | 4rem (64px) | 页面留白 |

## 使用原则

- **组件内部**：使用 `--gm-space-2` 至 `--gm-space-4`
- **组件之间**：使用 `--gm-space-4` 至 `--gm-space-6`
- **区块之间**：使用 `--gm-space-8` 至 `--gm-space-12`
- **页面级留白**：使用 `--gm-space-12` 至 `--gm-space-16`

## 间距工具类

```html
<div style="display: flex; flex-direction: column; gap: 4px;">
  <div class="gm-p-4" style="background: var(--gm-bg-muted); border-radius: 6px;">内边距 16px (gm-p-4)</div>
  <div class="gm-mt-4" style="background: var(--gm-bg-muted); border-radius: 6px;">上外边距 16px (gm-mt-4)</div>
</div>
```

## 使用示例

```css
.card {
  padding: var(--gm-space-4);
  margin-bottom: var(--gm-space-6);
  gap: var(--gm-space-3);
}
```

遵循间距系统，让界面保持一致的呼吸感——这正是間（Ma）的体现。
