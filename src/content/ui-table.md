# Table 表格

表格用于展示结构化数据，支持排序、选择等交互。

## 基础用法

```html
<table class="gm-table">
  <thead>
    <tr>
      <th>姓名</th>
      <th>角色</th>
      <th>状态</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>张三</td>
      <td>管理员</td>
      <td><span class="gm-badge gm-badge--success">活跃</span></td>
    </tr>
    <tr>
      <td>李四</td>
      <td>编辑</td>
      <td><span class="gm-badge gm-badge--neutral">离线</span></td>
    </tr>
  </tbody>
</table>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-table` | 默认表格，带水平分割线 |
| `gm-table--bordered` | 带完整边框的表格 |
| `gm-table--striped` | 斑马纹表格，交替行背景 |
| `gm-table--compact` | 紧凑表格，减小行高 |

## 条纹表格

```html
<table class="gm-table gm-table--striped">
  <!-- ... -->
</table>
```

## 表格尺寸

| 修饰符 | 说明 |
|--------|------|
| `gm-table--compact` | 紧凑模式，行高减小 |

## 可排序表头

```html
<th class="gm-table__sort">姓名</th>
<th class="gm-table__sort gm-table__sort--asc">角色</th>
<th class="gm-table__sort gm-table__sort--desc">状态</th>
```

## 子元素

| 类名 | 说明 |
|------|------|
| `gm-table__sort` | 可排序表头 |
| `gm-table__sort--asc` | 升序排列 |
| `gm-table__sort--desc` | 降序排列 |

## 暗色模式

暗色模式下表格背景为深色，分割线使用 `--gm-neutral-700`，斑马纹行使用更深的灰色以保持区分度。
