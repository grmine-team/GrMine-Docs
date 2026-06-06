# Table 表格

表格用于展示结构化数据，支持排序、选择等交互。

## 基础用法

```html
<div class="gm-table-wrapper">
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
        <td><span class="gm-badge gm-badge-success">活跃</span></td>
      </tr>
      <tr>
        <td>李四</td>
        <td>编辑</td>
        <td><span class="gm-badge gm-badge-default">离线</span></td>
      </tr>
      <tr>
        <td>王五</td>
        <td>访客</td>
        <td><span class="gm-badge gm-badge-warning">待审核</span></td>
      </tr>
    </tbody>
  </table>
</div>
```

## 斑马纹表格

```html
<div class="gm-table-wrapper">
  <table class="gm-table gm-table-striped">
    <thead>
      <tr>
        <th>项目</th>
        <th>进度</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>前端重构</td>
        <td>80%</td>
        <td>张三</td>
      </tr>
      <tr>
        <td>API 优化</td>
        <td>45%</td>
        <td>李四</td>
      </tr>
      <tr>
        <td>文档编写</td>
        <td>20%</td>
        <td>王五</td>
      </tr>
    </tbody>
  </table>
</div>
```

## 变体

| 类名 | 说明 |
|------|------|
| `gm-table` | 默认表格，带水平分割线 |
| `gm-table-striped` | 斑马纹表格，交替行背景 |
| `gm-table-wrapper` | 表格外层容器，提供横向滚动 |

## 暗色模式

暗色模式下表格背景为深色，分割线使用 `--gm-neutral-700`，斑马纹行使用更深的灰色以保持区分度。
