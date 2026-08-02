---
alwaysApply: false
description: 创建提交信息时使用
scene: git_message
---
# Git 提交信息规则

## 格式

统一使用 Conventional Commits 规范，格式为：

```
<type>(<scope>): <subject>
```

- `type` 使用英文小写，`subject` 使用中文。
- `scope` 可选，仅在改动范围明确时使用，如 `docs`、`theme`、`config`。

## type 类型

| type     | 用途                       |
| -------- | -------------------------- |
| feat     | 新功能                     |
| fix      | 修复 Bug                   |
| docs     | 文档变更                   |
| style    | 格式、样式调整             |
| refactor | 重构（非新功能、非修 Bug） |
| perf     | 性能优化                   |
| test     | 增加或修改测试             |
| build    | 构建系统或依赖变更         |
| chore    | 其他杂项                   |

## 写法要求

1. subject 简洁明了，概括改动目的，不做多余解释；避免使用标点结尾。
2. 一次提交只描述一个核心改动；涉及多个模块时按主次合并或拆分提交。
3. 不写正文，除非改动需要额外说明。
4. 不要使用 `!` 或 `BREAKING CHANGE`，除非确实存在破坏性变更。
