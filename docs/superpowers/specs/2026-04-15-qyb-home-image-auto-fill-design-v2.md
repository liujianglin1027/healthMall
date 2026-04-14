# 企业版首页图片自动识别填充功能设计文档 (方案A)

**日期**: 2026-04-15  
**版本**: v2.0  
**方案**: 方案A - 智能图片映射系统  
**状态**: 待审核

---

## 1. 概述

### 1.1 目标
为企业版首页（QybHome）实现图片自动识别填充功能，从 `D:\personal\aiAst\healthMall\public\QYB_home` 自动读取图片资源，通过智能命名规则将图片精确映射到页面相应位置，确保与原图设计100%一致。

### 1.2 核心需求
- **自动识别**: 基于文件名前缀智能识别图片类型和目标位置
- **精确映射**: 每张图片都有明确的位置映射规则
- **原图对比**: 实现后与原图进行像素级对比验证
- **视觉一致**: 尺寸、位置、样式与原图完全一致
- **性能优化**: 懒加载、缓存、快速渲染

---

## 2. 原图设计详细规范

### 2.1 页面结构层次

```
QybHome
├── StatusBar (系统状态栏)
├── Header (橙色渐变 #FF6B3B → #FF8A5C)
│   ├── 定位 + 搜索框 + 消息 + 扫一扫 + 快捷服务
│   └── 企业宝/账户 标签切换
├── QuickActions (快捷功能区 - 4列)
├── HealthPayCard (健康直付卡片 - 橙色大卡片)
├── FeatureNav (功能导航 - 5列)
├── Banner (轮播广告)
├── ActivityRow (活动横向滚动区)
├── ActivityCards (活动卡片 - 2列)
└── Footer (底部导航)
```

### 2.2 颜色规范

| 元素 | 颜色值 | 用途 |
|------|--------|------|
| 主色调 | `#FF6B3B` | Header背景、按钮、选中状态 |
| 次色调 | `#FF8A5C` | 渐变结束色 |
| 浅色 | `#FFB08A` | Banner背景 |
| 更浅 | `#FFD4B8` | 活动卡片背景 |
| 背景色 | `#F5F5F5` | 页面背景 |
| 卡片背景 | `#FFFFFF` | 白色卡片 |
| 文字主色 | `#333333` | 主要文字 |
| 文字次色 | `#666666` | 次要文字 |
| 白色文字 | `#FFFFFF` | Header上文字 |

### 2.3 尺寸规范

| 区域 | 宽度 | 高度 | 备注 |
|------|------|------|------|
| Header | 100% | 自适应 | 含状态栏约120px |
| 搜索框 | flex-1 | 36px | 圆角18px |
| 快捷功能区 | 100% | ~100px | 4等分 |
| 健康直付卡片 | calc(100% - 32px) | ~140px | 圆角12px |
| 功能导航 | 100% | ~90px | 5等分 |
| Banner | calc(100% - 32px) | ~150px | 圆角12px |
| 活动卡片 | calc(50% - 20px) | ~100px | 2列布局 |
| 底部导航 | 100% | 60px | 固定底部 |

---

## 3. 图片资源映射规则

### 3.1 文件名命名规范

| 文件名格式 | 目标位置 | 用途 | 尺寸建议 |
|-----------|---------|------|---------|
| `banner_*.png` | Banner轮播 | 广告图 | 750×300px |
| `activity_*.png` | 活动卡片区 | 活动卡片 | 350×200px |
| `icon_quick_*.png` | 快捷功能区 | 4个功能图标 | 48×48px |
| `icon_nav_*.png` | 功能导航区 | 5个导航图标 | 40×40px |
| `card_health_pay.png` | 健康直付卡片 | 卡片背景 | 710×280px |
| `header_bg.png` | Header背景 | 可选背景图 | 750×200px |

### 3.2 当前资源映射表

基于 `QYB_home` 文件夹现有图片：

| 文件名 | 识别规则 | 目标位置 | 显示尺寸 | 优先级 |
|--------|---------|---------|---------|--------|
| `banner_医无忧.png` | `banner_*` | Banner轮播 | 100% × 150px | 100 |
| `activity_健康日历.png` | `activity_*` | 活动卡片-右 | 50% × 100px | 90 |
| `activity_春日健康计划.png` | `activity_*` | 活动卡片-左 | 50% × 100px | 90 |
| `balance_card.png` | `*card*` | 健康直付卡片背景 | 100% × 140px | 100 |
| `header_search_bar.png` | `header_*` | Header搜索栏装饰 | 自适应 | 80 |
| `icon_09.png` | `icon_*` | 快捷功能区-查保障 | 48×48px | 70 |
| `icon_10.png` | `icon_*` | 快捷功能区-办理赔 | 48×48px | 70 |
| `icon_11.png` | `icon_*` | 快捷功能区-产险专区 | 48×48px | 70 |
| `icon_12.png` | `icon_*` | 快捷功能区-用权益 | 48×48px | 70 |
| `icon_15.png` | `icon_*` | 功能导航-健康直付 | 40×40px | 60 |
| `icon_16.png` | `icon_*` | 功能导航-查看报告 | 40×40px | 60 |
| `icon_17.png` | `icon_*` | 功能导航-体检检测 | 40×40px | 60 |
| `icon_27.png` | `icon_*` | 功能导航-服务手册 | 40×40px | 60 |
| `icon_29.png` | `icon_*` | 功能导航-名医专家 | 40×40px | 60 |
| `nav_home.png` | `nav_*` | 底部导航-首页 | 24×24px | 85 |

---

## 4. 系统架构

### 4.1 架构图

```
┌─────────────────────────────────────────────────────────────┐
│                    智能图片映射系统                           │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  图片扫描器   │→ │  命名识别器   │→ │  位置映射器   │      │
│  │  (Scanner)   │  │ (Recognizer) │  │  (Mapper)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         ↓                  ↓                  ↓             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              图片资源管理器 (ResourceManager)          │   │
│  └─────────────────────────────────────────────────────┘   │
│                           ↓                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              React 组件层 (Components)                │   │
│  │  SmartImage | ImageSlider | IconGrid | ActivityCard  │   │
│  └─────────────────────────────────────────────────────┘   │
│                           ↓                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              原图对比验证 (VisualDiff)                │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 核心模块

| 模块 | 职责 | 输入 | 输出 |
|------|------|------|------|
| 图片扫描器 | 扫描文件夹获取图片列表 | 文件夹路径 | 图片元数据数组 |
| 命名识别器 | 根据文件名前缀识别类型 | 图片元数据 | 识别结果 |
| 位置映射器 | 将图片映射到页面位置 | 识别结果 | 位置-图片映射表 |
| 资源管理器 | 管理图片加载和缓存 | 映射表 | 可渲染资源 |
| 组件层 | 渲染图片到指定位置 | 资源 | UI |
| 对比验证 | 与原图对比检查差异 | 截图 | 差异报告 |

---

## 5. 组件设计

### 5.1 组件清单

| 组件名 | 用途 | 接收Props |
|--------|------|-----------|
| SmartImage | 智能图片加载 | src, alt, fit, lazy |
| ImageSlider | Banner轮播 | images, autoplay, interval |
| IconGrid | 图标网格布局 | icons, columns, gap |
| ActivityCard | 活动卡片 | image, title, subtitle, onClick |
| HealthPayCard | 健康直付卡片 | backgroundImage, balance |
| VisualDiffTool | 视觉对比工具 | originalImage, currentImage |

### 5.2 SmartImage 组件

```typescript
interface SmartImageProps {
  src: string;
  alt: string;
  fit?: 'cover' | 'contain' | 'fill';
  position?: 'center' | 'top' | 'bottom';
  lazy?: boolean;
  placeholder?: 'blur' | 'color';
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}
```

### 5.3 ImageSlider 组件

```typescript
interface ImageSliderProps {
  images: Array<{
    src: string;
    alt: string;
    link?: string;
  }>;
  autoplay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  height?: number;
  className?: string;
}
```

---

## 6. 原图对比验证方案

### 6.1 验证流程

```
1. 实现页面渲染
2. 截取当前实现截图
3. 加载原图参考
4. 像素级对比
5. 生成差异报告
6. 调整直至匹配
```

### 6.2 对比维度

| 维度 | 检查内容 | 容差 |
|------|---------|------|
| 布局 | 元素位置、尺寸 | ±2px |
| 颜色 | 背景色、文字色 | ±5% |
| 字体 | 大小、粗细、颜色 | 完全一致 |
| 间距 | margin、padding | ±2px |
| 图片 | 位置、大小、比例 | ±1px |

### 6.3 自动化对比工具

```typescript
// 视觉对比工具
interface VisualDiffResult {
  matchRate: number;      // 匹配率 0-100%
  diffPixels: number;     // 差异像素数
  diffAreas: Array<{      // 差异区域
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  report: string;         // 详细报告
}

async function compareWithOriginal(
  originalPath: string,
  currentElement: HTMLElement
): Promise<VisualDiffResult>;
```

---

## 7. 性能优化

### 7.1 加载策略

| 优先级 | 区域 | 加载时机 |
|--------|------|---------|
| P0 | Header、快捷功能 | 立即加载 |
| P1 | Banner、健康直付卡片 | 首屏可见时加载 |
| P2 | 功能导航、活动区 | 滚动到视口时加载 |
| P3 | 底部活动卡片 | 懒加载 |

### 7.2 缓存策略

- **内存缓存**: 已加载图片保留在内存
- **LocalStorage**: 映射关系缓存1小时
- **浏览器缓存**: 利用HTTP缓存头

---

## 8. 验收标准

### 8.1 功能验收

- [ ] 自动扫描并识别所有图片
- [ ] 每张图片映射到正确位置
- [ ] Banner轮播正常工作
- [ ] 所有图标正确显示
- [ ] 活动卡片正确显示
- [ ] 懒加载正常工作

### 8.2 视觉验收（与原图对比）

- [ ] 整体布局匹配度 ≥ 95%
- [ ] 颜色差异 < 5%
- [ ] 元素位置偏差 < 2px
- [ ] 字体样式一致
- [ ] 图片显示比例正确

### 8.3 性能验收

- [ ] 首屏加载 < 2s
- [ ] 图片懒加载正常
- [ ] 无卡顿、闪烁

---

## 9. 文件结构

```
src/
├── types/
│   └── image-mapping.ts           # 类型定义
├── config/
│   └── qyb-home-images.config.ts  # 映射配置
├── utils/
│   ├── image-scanner.ts           # 图片扫描
│   ├── image-recognizer.ts        # 命名识别
│   ├── image-mapper.ts            # 位置映射
│   └── visual-diff.ts             # 视觉对比
├── components/
│   ├── SmartImage.tsx             # 智能图片
│   ├── ImageSlider.tsx            # 轮播组件
│   ├── IconGrid.tsx               # 图标网格
│   ├── ActivityCard.tsx           # 活动卡片
│   └── VisualDiffTool.tsx         # 对比工具
├── hooks/
│   └── useImageMapping.ts         # 核心Hook
└── pages/
    └── QybHome.tsx                # 企业版首页
```

---

**文档作者**: AI Assistant  
**审核状态**: 待审核  
**最后更新**: 2026-04-15
