# 平安企业宝 (CorpGuard) Design Tokens

> 移动端设计系统规范 · Version 3.0  
> 最后更新：2024-12-01

---

## 📦 文件说明

| 文件 | 用途 | 使用场景 |
|------|------|----------|
| `tokens.json` | 完整 Design Token (JSON 格式) | 导入代码项目、设计工具插件 |
| `variables.css` | CSS Variables | Web 项目直接引用 |
| `tailwind.config.js` | Tailwind CSS 配置 | Tailwind 项目主题扩展 |
| `README.md` | 本文档 | 团队查阅、使用说明 |

---

## 🚀 快速开始

### 方式 1：CSS Variables（推荐 Web 项目）

1. 在项目中引入 `variables.css`：

```html
<link rel="stylesheet" href="./variables.css">
```

或在 JS 中导入：

```js
import './variables.css';
```

2. 使用变量：

```css
.button {
  background-color: var(--color-primary-main1);
  color: var(--color-text-primary);
  border-radius: var(--radius-default);
  padding: var(--spacing-3) var(--spacing-6);
}
```

---

### 方式 2：Tailwind CSS 配置

1. 将 `tailwind.config.js` 的内容合并到你的 `tailwind.config.js`：

```js
const corpguardConfig = require('./corpguard-design-tokens/tailwind.config.js');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...corpguardConfig.theme.extend,
    },
  },
  plugins: [],
};
```

2. 使用自定义类名：

```tsx
// 按钮示例
<button className="bg-primary-main1 text-white rounded-default px-6 py-3">
  主要按钮
</button>

// 卡片示例
<div className="bg-white shadow-medium rounded-large p-6">
  <h2 className="text-standard-title font-medium">卡片标题</h2>
  <p className="text-body text-secondary mt-2">卡片内容</p>
</div>
```

---

### 方式 3：JSON 导入（设计工具/脚本）

```js
import tokens from './tokens.json';

console.log(tokens.colors.primary.main1); // #FF5818
console.log(tokens.typography.sizes.body); // 14
```

---

## 📋 设计规范速查

### 颜色

| 类型 | 色值 | 用途 |
|------|------|------|
| **品牌主色** | `#FF5818` | 主要按钮、重要操作 |
| **品牌次色** | `#FF6E27` | 次要强调、渐变 |
| **成功** | `#15B899` | 成功状态、完成标识 |
| **错误** | `#FF352D` | 错误提示、删除操作 |
| **文字 - 主** | `#111111` | 主标题、正文 |
| **文字 - 次** | `#5F5677` | 副标题、次要信息 |
| **文字 - 提示** | `#878B99` | 辅助说明、占位符 |
| **背景 - 主** | `#F6F7F8` | 页面背景 |

---

### 字体

| 层级 | 字号 | 行高 | 用途 |
|------|------|------|------|
| Big Title | 20px | 30px | 大标题、封面标题 |
| Standard Title | 18px | 27px | 标准标题、页面标题 |
| Nav Title | 16px | 24px | 导航栏、模块标题 |
| Body | 14px | 21px | 正文、列表内容 |
| Secondary | 12px | 18px | 辅助说明、表单提示 |
| Small Label | 10px | 15px | 标签、角标 |

**字体家族：**
- 中文：PingFang SC
- 数字/符号：D-DIN-PRO

---

### 间距

基于 **4px** 基准，共 10 个阶梯：

`0 → 4 → 8 → 12 → 16 → 20 → 24 → 32 → 40 → 48` (单位：px)

**使用建议：**
- 组件内边距：`16px` (spacing-4) 或 `20px` (spacing-5)
- 组件间距：`12px` (spacing-3) 或 `16px` (spacing-4)
- 模块间距：`24px` (spacing-6) 或 `32px` (spacing-8)
- 页面边距：`16px` (spacing-4) 或 `20px` (spacing-5)

---

### 圆角

| 名称 | 值 | 用途 |
|------|-----|------|
| default | 8px | 按钮、徽章、标签 |
| medium | 16px | 输入框、小卡片 |
| large | 20px | 卡片、弹窗、Banner |
| xlarge | 40px | 面板、选择器 |
| round | 9999px | 胶囊型按钮、圆形头像 |

---

### 阴影

| 层级 | 值 | 用途 |
|------|-----|------|
| light | `0 2px 8px rgba(0,0,0,0.08)` | 卡片、悬浮元素 |
| medium | `0 4px 16px rgba(0,0,0,0.12)` | 弹窗、下拉菜单 |
| heavy | `0 8px 32px rgba(0,0,0,0.16)` | 模态框、重要浮层 |

---

## 💡 最佳实践

### ✅ 推荐做法

```tsx
// 1. 使用语义化的颜色变量
<button className="bg-primary-main1 hover:bg-primary-main2">
  提交
</button>

// 2. 使用间距阶梯保持统一
<div className="p-4 space-y-3">
  <h3 className="text-standard-title">标题</h3>
  <p className="text-body text-secondary">内容</p>
</div>

// 3. 组合使用设计令牌
<Card className="rounded-large shadow-medium p-6">
  <Text size="body" color="secondary">
    这是一段正文内容
  </Text>
</Card>
```

### ❌ 避免做法

```tsx
// ❌ 不要用硬编码的值
<button style={{ backgroundColor: '#FF5818', padding: '15px' }}>
  提交
</button>

// ❌ 不要用 Tailwind 默认色（不符合品牌规范）
<div className="bg-orange-500 text-gray-700">
  内容
</div>

// ❌ 不要混用不同的间距系统
<div className="p-[15px] gap-[13px]">
  内容
</div>
```

---

## 🎨 设计工具集成

### Figma

如需在 Figma 中使用，可创建 Styles：

1. **Color Styles**：导入 colors 中的所有颜色
2. **Text Styles**：创建 6 个文本样式（bigTitle → smallLabel）
3. **Effect Styles**：创建 3 个阴影样式（light/medium/heavy）

### Sketch

1. 创建 Document Colors
2. 创建 Text Styles
3. 使用 Symbols 管理组件

---

## 📝 更新日志

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 3.0 | 2024-12-01 | 初始版本，基于现有 Sketch 规范提取 |

---

## 🤝 协作与维护

- **设计负责人**：[填写姓名]
- **开发负责人**：[填写姓名]
- **更新频率**：随设计规范迭代同步更新
- **反馈渠道**：[填写飞书群/文档链接]

---

## 📞 技术支持

如有问题或需要新增 Token，请联系开发团队或通过飞书群组反馈。

---

**平安企业宝 · CorpGuard Design System**  
*专业 · 简洁 · 高效 · 可信赖*
