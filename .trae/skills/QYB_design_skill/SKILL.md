---
name: "QYB_design_skill"
description: "应用平安企业宝(CorpGuard)设计系统规范进行前端页面开发。当用户需要设计/开发aiAst项目的前端页面时调用此技能，确保UI符合品牌规范。"
---

# 平安企业宝 (CorpGuard) 设计系统规范

> 移动端设计系统规范 · Version 3.0  
> 最后更新：2024-12-01

## 📋 设计规范速查

### 颜色系统

| 类型 | 变量名 | 色值 | 用途 |
|------|--------|------|------|
| **品牌主色1** | `--color-primary-main1` | `#FF5818` | 主要按钮、重要操作 |
| **品牌主色2** | `--color-primary-main2` | `#FF6E27` | 次要强调、渐变 |
| **辅助蓝** | `--color-secondary-blue` | `#3E4A57` | 次要操作、强调文字 |
| **成功** | `--color-success` | `#15B899` | 成功状态、完成标识 |
| **错误** | `--color-error` | `#FF352D` | 错误提示、删除操作 |
| **警告** | `--color-warning` | `#FF9500` | 警告提示 |
| **信息** | `--color-info` | `#0066FF` | 信息提示 |
| **文字-主** | `--color-text-primary` | `#111111` | 主标题、正文 |
| **文字-次** | `--color-text-secondary` | `#5F5677` | 副标题、次要信息 |
| **文字-提示** | `--color-text-tertiary` | `#878B99` | 辅助说明、占位符 |
| **文字-禁用** | `--color-text-disabled` | `#C8CDD4` | 禁用状态文字 |
| **背景-主** | `--color-bg-base1` | `#F6F7F8` | 页面主背景 |
| **背景-次** | `--color-bg-base2` | `#FAFAFB` | 次级背景 |
| **背景-选项** | `--color-bg-option` | `#F0F1F5` | 选项背景 |
| **边框** | `--color-bg-border` | `#ECEDF3` | 边框分割线 |

### 字体系统

**字体家族：**
- 中文：`PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif`
- 数字/符号：`D-DIN-PRO, DIN, Helvetica Neue, sans-serif`

**字重：**
- 常规：`400`
- 中等：`500`

**字号层级：**

| 层级 | 变量名 | 字号 | 行高 | 用途 |
|------|--------|------|------|------|
| Big Title | `--text-size-big-title` | 20px | 30px | 大标题、封面标题 |
| Standard Title | `--text-size-standard-title` | 18px | 27px | 标准标题、页面标题 |
| Nav Title | `--text-size-nav-title` | 16px | 24px | 导航栏、模块标题 |
| Body | `--text-size-body` | 14px | 21px | 正文、列表内容 |
| Secondary | `--text-size-secondary` | 12px | 18px | 辅助说明、表单提示 |
| Small Label | `--text-size-small-label` | 10px | 15px | 标签、角标 |

**行高：**
- 紧凑：`1.2`
- 标准：`1.5`
- 宽松：`1.7`

### 间距系统

基于 **4px** 基准，共 10 个阶梯：

| 变量名 | 值 | 用途建议 |
|--------|-----|----------|
| `--spacing-0` | 0px | - |
| `--spacing-1` | 4px | 微小间距 |
| `--spacing-2` | 8px | 紧凑间距 |
| `--spacing-3` | 12px | 组件间距 |
| `--spacing-4` | 16px | 组件内边距、页面边距 |
| `--spacing-5` | 20px | 卡片内边距 |
| `--spacing-6` | 24px | 模块间距 |
| `--spacing-8` | 32px | 大模块间距 |
| `--spacing-10` | 40px | 区块间距 |
| `--spacing-12` | 48px | 大区块间距 |

### 圆角系统

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--radius-default` | 8px | 按钮、徽章、标签 |
| `--radius-medium` | 16px | 输入框、小卡片 |
| `--radius-large` | 20px | 卡片、弹窗、Banner |
| `--radius-xlarge` | 40px | 面板、选择器 |
| `--radius-round` | 9999px | 胶囊型按钮、圆形头像 |

### 阴影系统

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--shadow-light` | `0 2px 8px rgba(0,0,0,0.08)` | 卡片、悬浮元素 |
| `--shadow-medium` | `0 4px 16px rgba(0,0,0,0.12)` | 弹窗、下拉菜单 |
| `--shadow-heavy` | `0 8px 32px rgba(0,0,0,0.16)` | 模态框、重要浮层 |

### 过渡动画

| 变量名 | 值 |
|--------|-----|
| `--transition-fast` | 150ms ease |
| `--transition-normal` | 250ms ease |
| `--transition-slow` | 350ms ease |

### Z-Index 层级

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--z-index-dropdown` | 1000 | 下拉菜单 |
| `--z-index-sticky` | 1020 | 粘性定位 |
| `--z-index-fixed` | 1030 | 固定定位 |
| `--z-index-modal-backdrop` | 1040 | 模态框背景 |
| `--z-index-modal` | 1050 | 模态框 |
| `--z-index-popover` | 1060 | 气泡卡片 |
| `--z-index-tooltip` | 1070 | 文字提示 |

## 🚀 使用方式

### 方式 1：CSS Variables（推荐）

```css
/* 引入设计令牌 */
@import './corpguard-design-tokens/variables.css';

/* 使用变量 */
.button {
  background-color: var(--color-primary-main1);
  color: var(--color-text-primary);
  border-radius: var(--radius-default);
  padding: var(--spacing-3) var(--spacing-6);
  font-size: var(--text-size-body);
  box-shadow: var(--shadow-light);
}
```

### 方式 2：Tailwind CSS

```js
// tailwind.config.js
const corpguardConfig = require('./corpguard-design-tokens/tailwind.config.js');

module.exports = {
  theme: {
    extend: {
      ...corpguardConfig.theme.extend,
    },
  },
};
```

```tsx
// 使用示例
<button className="bg-primary-main1 text-white rounded-default px-6 py-3 text-body font-medium">
  主要按钮
</button>

<div className="bg-white shadow-medium rounded-large p-6">
  <h2 className="text-standard-title font-medium text-text-primary">卡片标题</h2>
  <p className="text-body text-text-secondary mt-2">卡片内容</p>
</div>
```

## 💡 最佳实践

### ✅ 推荐做法

```tsx
// 1. 使用语义化的颜色变量
<button className="bg-primary-main1 hover:bg-primary-main2 transition-colors">
  提交
</button>

// 2. 使用间距阶梯保持统一
<div className="p-4 space-y-3">
  <h3 className="text-standard-title font-medium">标题</h3>
  <p className="text-body text-text-secondary">内容</p>
</div>

// 3. 组合使用设计令牌
<Card className="rounded-large shadow-medium p-6 bg-white">
  <Text className="text-body text-text-secondary">
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

## 📁 规范文件位置

设计令牌文件位于：
```
D:\personal\aiAst\healthMall\src\components\corpguard-design-tokens\corpguard-design-tokens\
├── tokens.json       # JSON格式设计令牌
├── variables.css     # CSS变量
├── tailwind.config.js # Tailwind配置
└── README.md         # 完整文档
```

## 🎨 设计原则

1. **一致性**：始终使用设计系统中的变量，不硬编码数值
2. **层次清晰**：通过颜色、字号、间距建立清晰的视觉层次
3. **品牌识别**：以橙色(#FF5818)为主色调，保持品牌一致性
4. **移动端优先**：基于2x设计稿，所有尺寸已除以2
5. **可维护性**：使用语义化命名，便于后期维护和主题切换
