# 企业版首页图片自动识别填充功能实施计划 (方案A)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 实现企业版首页图片自动识别填充功能，基于文件名智能映射图片到页面位置，并与原图对比确保视觉一致性。

**Architecture:** 采用智能图片映射系统，包含图片扫描器、命名识别器、位置映射器，实现自动识别和精确填充。

**Tech Stack:** React + TypeScript + Tailwind CSS + Vite

---

## 文件结构规划

```
src/
├── types/
│   └── image-mapping.ts           # 类型定义（新建）
├── config/
│   └── qyb-home-images.config.ts  # 映射配置（新建）
├── utils/
│   ├── image-scanner.ts           # 图片扫描（新建）
│   ├── image-recognizer.ts        # 命名识别（新建）
│   └── image-mapper.ts            # 位置映射（新建）
├── components/
│   ├── SmartImage.tsx             # 智能图片（新建）
│   ├── ImageSlider.tsx            # 轮播组件（新建）
│   ├── IconGrid.tsx               # 图标网格（新建）
│   └── ActivityCard.tsx           # 活动卡片（新建）
├── hooks/
│   └── useImageMapping.ts         # 核心Hook（新建）
└── pages/
    └── QybHome.tsx                # 修改集成
```

---

## Task 1: 创建类型定义文件

**Files:**
- Create: `src/types/image-mapping.ts`

- [ ] **Step 1: 编写类型定义**

```typescript
// src/types/image-mapping.ts

/**
 * 图片元数据
 */
export interface ImageMetadata {
  id: string;
  filename: string;
  src: string;
  extension: string;
}

/**
 * 识别结果
 */
export interface RecognitionResult {
  image: ImageMetadata;
  type: 'banner' | 'activity' | 'icon_quick' | 'icon_nav' | 'card' | 'header' | 'nav' | 'unknown';
  targetPosition: string;
  priority: number;
}

/**
 * 位置配置
 */
export interface PositionConfig {
  id: string;
  name: string;
  type: 'banner' | 'activity' | 'icon_quick' | 'icon_nav' | 'card' | 'header' | 'nav';
  maxItems: number;
  displayConfig: {
    width?: string;
    height?: string;
    fit?: 'cover' | 'contain' | 'fill';
    borderRadius?: string;
  };
}

/**
 * 映射后的图片
 */
export interface MappedImage {
  id: string;
  src: string;
  alt: string;
  position: string;
  order: number;
  displayConfig: {
    width?: string;
    height?: string;
    fit?: 'cover' | 'contain' | 'fill';
    borderRadius?: string;
  };
}

/**
 * 映射结果
 */
export interface ImageMappingResult {
  [positionId: string]: MappedImage[];
}

/**
 * 文件名识别规则
 */
export interface RecognitionRule {
  pattern: RegExp;
  type: RecognitionResult['type'];
  position: string;
  priority: number;
}

/**
 * Hook返回类型
 */
export interface UseImageMappingReturn {
  mappings: ImageMappingResult;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/types/image-mapping.ts
git commit -m "feat: add image mapping type definitions"
```

---

## Task 2: 创建配置文件

**Files:**
- Create: `src/config/qyb-home-images.config.ts`

- [ ] **Step 1: 编写配置**

```typescript
// src/config/qyb-home-images.config.ts

import { RecognitionRule, PositionConfig } from '../types/image-mapping';

// 文件名识别规则
export const recognitionRules: RecognitionRule[] = [
  // Banner 广告
  { pattern: /^banner_/i, type: 'banner', position: 'banner', priority: 100 },
  
  // 活动卡片
  { pattern: /^activity_/i, type: 'activity', position: 'activities', priority: 90 },
  
  // 快捷功能区图标 (4个)
  { pattern: /^icon_09/i, type: 'icon_quick', position: 'quickActions', priority: 80 },
  { pattern: /^icon_10/i, type: 'icon_quick', position: 'quickActions', priority: 80 },
  { pattern: /^icon_11/i, type: 'icon_quick', position: 'quickActions', priority: 80 },
  { pattern: /^icon_12/i, type: 'icon_quick', position: 'quickActions', priority: 80 },
  
  // 功能导航图标 (5个)
  { pattern: /^icon_15/i, type: 'icon_nav', position: 'featureNav', priority: 70 },
  { pattern: /^icon_16/i, type: 'icon_nav', position: 'featureNav', priority: 70 },
  { pattern: /^icon_17/i, type: 'icon_nav', position: 'featureNav', priority: 70 },
  { pattern: /^icon_27/i, type: 'icon_nav', position: 'featureNav', priority: 70 },
  { pattern: /^icon_29/i, type: 'icon_nav', position: 'featureNav', priority: 70 },
  
  // 其他图标
  { pattern: /^icon_/i, type: 'icon_nav', position: 'featureNav', priority: 60 },
  
  // 卡片背景
  { pattern: /card/i, type: 'card', position: 'healthPayCard', priority: 95 },
  
  // Header
  { pattern: /^header_/i, type: 'header', position: 'header', priority: 85 },
  
  // 底部导航
  { pattern: /^nav_/i, type: 'nav', position: 'nav', priority: 85 },
];

// 位置配置
export const positionConfigs: Record<string, PositionConfig> = {
  banner: {
    id: 'banner',
    name: 'Banner轮播',
    type: 'banner',
    maxItems: 5,
    displayConfig: {
      width: '100%',
      height: '150px',
      fit: 'cover',
      borderRadius: '12px',
    },
  },
  activities: {
    id: 'activities',
    name: '活动卡片',
    type: 'activity',
    maxItems: 4,
    displayConfig: {
      width: '100%',
      height: '100px',
      fit: 'cover',
      borderRadius: '8px',
    },
  },
  quickActions: {
    id: 'quickActions',
    name: '快捷功能区',
    type: 'icon_quick',
    maxItems: 4,
    displayConfig: {
      width: '48px',
      height: '48px',
      fit: 'contain',
    },
  },
  featureNav: {
    id: 'featureNav',
    name: '功能导航',
    type: 'icon_nav',
    maxItems: 5,
    displayConfig: {
      width: '40px',
      height: '40px',
      fit: 'contain',
    },
  },
  healthPayCard: {
    id: 'healthPayCard',
    name: '健康直付卡片',
    type: 'card',
    maxItems: 1,
    displayConfig: {
      width: '100%',
      height: '100%',
      fit: 'cover',
      borderRadius: '12px',
    },
  },
  header: {
    id: 'header',
    name: 'Header区域',
    type: 'header',
    maxItems: 1,
    displayConfig: {
      width: '100%',
      height: 'auto',
      fit: 'contain',
    },
  },
  nav: {
    id: 'nav',
    name: '底部导航',
    type: 'nav',
    maxItems: 4,
    displayConfig: {
      width: '24px',
      height: '24px',
      fit: 'contain',
    },
  },
};

// 文件夹路径
export const IMAGE_FOLDER_PATH = '/QYB_home';

// 支持的文件扩展名
export const SUPPORTED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg'];
```

- [ ] **Step 2: Commit**

```bash
git add src/config/qyb-home-images.config.ts
git commit -m "feat: add image mapping configuration with rules"
```

---

## Task 3: 创建图片扫描工具

**Files:**
- Create: `src/utils/image-scanner.ts`

- [ ] **Step 1: 实现扫描器**

```typescript
// src/utils/image-scanner.ts

import { ImageMetadata } from '../types/image-mapping';
import { SUPPORTED_EXTENSIONS } from '../config/qyb-home-images.config';

/**
 * 扫描指定文件夹中的图片
 * 使用Vite的import.meta.glob动态导入
 */
export async function scanImages(folderPath: string): Promise<ImageMetadata[]> {
  const images: ImageMetadata[] = [];

  try {
    // 动态导入public文件夹下的图片
    const imageModules = import.meta.glob('/public/QYB_home/*.{png,jpg,jpeg,webp,svg}', {
      eager: true,
      as: 'url',
    });

    Object.entries(imageModules).forEach(([path, url], index) => {
      const filename = path.split('/').pop() || '';
      const extension = filename.split('.').pop()?.toLowerCase() || '';

      if (SUPPORTED_EXTENSIONS.includes(`.${extension}`)) {
        images.push({
          id: `img_${index}_${Date.now()}`,
          filename,
          src: url as string,
          extension: `.${extension}`,
        });
      }
    });

    console.log(`[ImageScanner] 扫描到 ${images.length} 张图片:`, images.map(i => i.filename));
    return images;
  } catch (error) {
    console.error('[ImageScanner] 扫描失败:', error);
    return [];
  }
}

/**
 * 模拟扫描（用于开发测试）
 */
export function mockScanImages(): ImageMetadata[] {
  const mockImages: ImageMetadata[] = [
    { id: '1', filename: 'banner_医无忧.png', src: '/QYB_home/banner_医无忧.png', extension: '.png' },
    { id: '2', filename: 'activity_健康日历.png', src: '/QYB_home/activity_健康日历.png', extension: '.png' },
    { id: '3', filename: 'activity_春日健康计划.png', src: '/QYB_home/activity_春日健康计划.png', extension: '.png' },
    { id: '4', filename: 'balance_card.png', src: '/QYB_home/balance_card.png', extension: '.png' },
    { id: '5', filename: 'header_search_bar.png', src: '/QYB_home/header_search_bar.png', extension: '.png' },
    { id: '6', filename: 'icon_09.png', src: '/QYB_home/icon_09.png', extension: '.png' },
    { id: '7', filename: 'icon_10.png', src: '/QYB_home/icon_10.png', extension: '.png' },
    { id: '8', filename: 'icon_11.png', src: '/QYB_home/icon_11.png', extension: '.png' },
    { id: '9', filename: 'icon_12.png', src: '/QYB_home/icon_12.png', extension: '.png' },
    { id: '10', filename: 'icon_15.png', src: '/QYB_home/icon_15.png', extension: '.png' },
    { id: '11', filename: 'icon_16.png', src: '/QYB_home/icon_16.png', extension: '.png' },
    { id: '12', filename: 'icon_17.png', src: '/QYB_home/icon_17.png', extension: '.png' },
    { id: '13', filename: 'icon_27.png', src: '/QYB_home/icon_27.png', extension: '.png' },
    { id: '14', filename: 'icon_29.png', src: '/QYB_home/icon_29.png', extension: '.png' },
    { id: '15', filename: 'icon_31.png', src: '/QYB_home/icon_31.png', extension: '.png' },
    { id: '16', filename: 'nav_home.png', src: '/QYB_home/nav_home.png', extension: '.png' },
  ];

  console.log('[ImageScanner] 使用模拟数据:', mockImages.map(i => i.filename));
  return mockImages;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/image-scanner.ts
git commit -m "feat: add image scanner utility"
```

---

## Task 4: 创建命名识别工具

**Files:**
- Create: `src/utils/image-recognizer.ts`

- [ ] **Step 1: 实现识别器**

```typescript
// src/utils/image-recognizer.ts

import { ImageMetadata, RecognitionResult } from '../types/image-mapping';
import { recognitionRules } from '../config/qyb-home-images.config';

/**
 * 根据文件名识别图片类型和目标位置
 */
export function recognizeImage(image: ImageMetadata): RecognitionResult {
  const filename = image.filename.toLowerCase();

  // 按优先级排序规则
  const sortedRules = [...recognitionRules].sort((a, b) => b.priority - a.priority);

  for (const rule of sortedRules) {
    if (rule.pattern.test(filename)) {
      return {
        image,
        type: rule.type,
        targetPosition: rule.position,
        priority: rule.priority,
      };
    }
  }

  // 默认返回未知
  return {
    image,
    type: 'unknown',
    targetPosition: 'unknown',
    priority: 0,
  };
}

/**
 * 批量识别图片
 */
export function recognizeImages(images: ImageMetadata[]): RecognitionResult[] {
  return images.map(recognizeImage);
}

/**
 * 按位置分组识别结果
 */
export function groupByPosition(results: RecognitionResult[]): Map<string, RecognitionResult[]> {
  const groups = new Map<string, RecognitionResult[]>();

  results.forEach((result) => {
    if (result.targetPosition === 'unknown') return;

    const existing = groups.get(result.targetPosition) || [];
    existing.push(result);
    groups.set(result.targetPosition, existing);
  });

  // 每个位置内按优先级排序
  groups.forEach((results) => {
    results.sort((a, b) => b.priority - a.priority);
  });

  return groups;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/image-recognizer.ts
git commit -m "feat: add image recognizer utility"
```

---

## Task 5: 创建位置映射工具

**Files:**
- Create: `src/utils/image-mapper.ts`

- [ ] **Step 1: 实现映射器**

```typescript
// src/utils/image-mapper.ts

import { RecognitionResult, ImageMappingResult, MappedImage } from '../types/image-mapping';
import { positionConfigs } from '../config/qyb-home-images.config';
import { groupByPosition } from './image-recognizer';

/**
 * 将识别结果转换为映射结果
 */
export function mapImagesToPositions(results: RecognitionResult[]): ImageMappingResult {
  const grouped = groupByPosition(results);
  const mappings: ImageMappingResult = {};

  grouped.forEach((results, positionId) => {
    const config = positionConfigs[positionId];
    if (!config) return;

    // 限制数量并转换为MappedImage
    mappings[positionId] = results
      .slice(0, config.maxItems)
      .map((result, index) => ({
        id: result.image.id,
        src: result.image.src,
        alt: result.image.filename.replace(/\.[^/.]+$/, ''), // 移除扩展名
        position: positionId,
        order: index,
        displayConfig: config.displayConfig,
      }));
  });

  console.log('[ImageMapper] 映射结果:', mappings);
  return mappings;
}

/**
 * 获取指定位置的图片
 */
export function getImagesForPosition(
  mappings: ImageMappingResult,
  positionId: string
): MappedImage[] {
  return mappings[positionId] || [];
}

/**
 * 检查位置是否有图片
 */
export function hasImagesForPosition(
  mappings: ImageMappingResult,
  positionId: string
): boolean {
  const images = mappings[positionId];
  return images && images.length > 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/utils/image-mapper.ts
git commit -m "feat: add image mapper utility"
```

---

## Task 6: 创建 SmartImage 组件

**Files:**
- Create: `src/components/SmartImage.tsx`

- [ ] **Step 1: 实现组件**

```typescript
// src/components/SmartImage.tsx

import { useState, useRef, useEffect } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  fit?: 'cover' | 'contain' | 'fill';
  borderRadius?: string;
  lazy?: boolean;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function SmartImage({
  src,
  alt,
  width = '100%',
  height = '100%',
  fit = 'cover',
  borderRadius,
  lazy = true,
  className = '',
  onLoad,
  onError,
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(!lazy);
  const containerRef = useRef<HTMLDivElement>(null);

  // 懒加载
  useEffect(() => {
    if (!lazy || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  // 加载图片
  useEffect(() => {
    if (!shouldLoad || !src) return;

    const img = new Image();
    img.onload = () => {
      setLoaded(true);
      onLoad?.();
    };
    img.onerror = () => {
      setError(true);
      onError?.();
    };
    img.src = src;
  }, [shouldLoad, src, onLoad, onError]);

  const fitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  };

  if (error) {
    return (
      <div
        ref={containerRef}
        className={`flex items-center justify-center bg-gray-100 ${className}`}
        style={{ width, height, borderRadius }}
      >
        <span className="text-gray-400 text-xs">加载失败</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, borderRadius }}
    >
      {/* 占位符 */}
      {!loaded && (
        <div
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ borderRadius }}
        />
      )}
      
      {/* 图片 */}
      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${fitClasses[fit]}`}
          style={{ borderRadius }}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SmartImage.tsx
git commit -m "feat: add SmartImage component"
```

---

## Task 7: 创建 ImageSlider 组件

**Files:**
- Create: `src/components/ImageSlider.tsx`

- [ ] **Step 1: 实现轮播组件**

```typescript
// src/components/ImageSlider.tsx

import { useState, useEffect, useCallback } from 'react';
import { SmartImage } from './SmartImage';
import { MappedImage } from '../types/image-mapping';

interface ImageSliderProps {
  images: MappedImage[];
  autoplay?: boolean;
  interval?: number;
  height?: string;
  className?: string;
}

export function ImageSlider({
  images,
  autoplay = true,
  interval = 3000,
  height = '150px',
  className = '',
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // 自动播放
  useEffect(() => {
    if (!autoplay || images.length <= 1) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoplay, interval, nextSlide, images.length]);

  if (!images || images.length === 0) {
    return (
      <div
        className={`bg-gray-200 rounded-xl ${className}`}
        style={{ height }}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`} style={{ height }}>
      {/* 图片容器 */}
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image) => (
          <div key={image.id} className="w-full h-full flex-shrink-0">
            <SmartImage
              src={image.src}
              alt={image.alt}
              width="100%"
              height="100%"
              fit={image.displayConfig.fit}
              borderRadius={image.displayConfig.borderRadius}
              lazy={false}
            />
          </div>
        ))}
      </div>

      {/* 指示器 */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ImageSlider.tsx
git commit -m "feat: add ImageSlider component"
```

---

## Task 8: 创建 IconGrid 组件

**Files:**
- Create: `src/components/IconGrid.tsx`

- [ ] **Step 1: 实现图标网格**

```typescript
// src/components/IconGrid.tsx

import { SmartImage } from './SmartImage';
import { MappedImage } from '../types/image-mapping';

interface IconGridProps {
  icons: MappedImage[];
  columns: 4 | 5;
  labels?: string[];
  className?: string;
}

export function IconGrid({
  icons,
  columns,
  labels = [],
  className = '',
}: IconGridProps) {
  const gridCols = columns === 4 ? 'grid-cols-4' : 'grid-cols-5';

  return (
    <div className={`grid ${gridCols} gap-4 ${className}`}>
      {icons.map((icon, index) => (
        <div key={icon.id} className="flex flex-col items-center">
          <SmartImage
            src={icon.src}
            alt={icon.alt}
            width={icon.displayConfig.width}
            height={icon.displayConfig.height}
            fit={icon.displayConfig.fit}
            lazy={index >= columns}
          />
          {labels[index] && (
            <span className="text-xs text-gray-700 mt-2 text-center">
              {labels[index]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/IconGrid.tsx
git commit -m "feat: add IconGrid component"
```

---

## Task 9: 创建 ActivityCard 组件

**Files:**
- Create: `src/components/ActivityCard.tsx`

- [ ] **Step 1: 实现活动卡片**

```typescript
// src/components/ActivityCard.tsx

import { SmartImage } from './SmartImage';
import { MappedImage } from '../types/image-mapping';

interface ActivityCardProps {
  image: MappedImage;
  className?: string;
}

export function ActivityCard({ image, className = '' }: ActivityCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <SmartImage
        src={image.src}
        alt={image.alt}
        width="100%"
        height="100px"
        fit={image.displayConfig.fit}
        borderRadius={image.displayConfig.borderRadius}
      />
    </div>
  );
}

interface ActivityGridProps {
  images: MappedImage[];
  className?: string;
}

export function ActivityGrid({ images, className = '' }: ActivityGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {images.map((image) => (
        <ActivityCard key={image.id} image={image} />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ActivityCard.tsx
git commit -m "feat: add ActivityCard component"
```

---

## Task 10: 创建 useImageMapping Hook

**Files:**
- Create: `src/hooks/useImageMapping.ts`

- [ ] **Step 1: 实现Hook**

```typescript
// src/hooks/useImageMapping.ts

import { useState, useEffect, useCallback } from 'react';
import { ImageMappingResult, UseImageMappingReturn } from '../types/image-mapping';
import { mockScanImages } from '../utils/image-scanner';
import { recognizeImages } from '../utils/image-recognizer';
import { mapImagesToPositions } from '../utils/image-mapper';

export function useImageMapping(): UseImageMappingReturn {
  const [mappings, setMappings] = useState<ImageMappingResult>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(() => {
    try {
      setLoading(true);
      setError(null);

      // 1. 扫描图片
      const images = mockScanImages();

      if (images.length === 0) {
        console.warn('[useImageMapping] 未找到图片');
        setMappings({});
        setLoading(false);
        return;
      }

      // 2. 识别图片
      const recognized = recognizeImages(images);
      console.log('[useImageMapping] 识别结果:', recognized.map(r => ({
        filename: r.image.filename,
        type: r.type,
        position: r.targetPosition,
      })));

      // 3. 映射到位置
      const mapped = mapImagesToPositions(recognized);
      console.log('[useImageMapping] 映射结果:', Object.keys(mapped).map(key => ({
        position: key,
        count: mapped[key].length,
        images: mapped[key].map(i => i.alt),
      })));

      setMappings(mapped);
    } catch (err) {
      console.error('[useImageMapping] 错误:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, []);

  // 初始化
  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    mappings,
    loading,
    error,
    refresh,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useImageMapping.ts
git commit -m "feat: add useImageMapping hook"
```

---

## Task 11: 修改 QybHome 页面

**Files:**
- Modify: `src/pages/QybHome.tsx`

- [ ] **Step 1: 添加导入**

在文件顶部添加：

```typescript
import { useImageMapping } from '../hooks/useImageMapping';
import { SmartImage } from '../components/SmartImage';
import { ImageSlider } from '../components/ImageSlider';
import { IconGrid } from '../components/IconGrid';
import { ActivityGrid } from '../components/ActivityCard';
import { getImagesForPosition, hasImagesForPosition } from '../utils/image-mapper';
```

- [ ] **Step 2: 添加Hook调用**

在组件内部添加：

```typescript
const QybHome = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [messageCount] = useState(13);
  const [location] = useState('上海');

  // 图片映射
  const { mappings, loading } = useImageMapping();

  // 获取各位置图片
  const bannerImages = getImagesForPosition(mappings, 'banner');
  const activityImages = getImagesForPosition(mappings, 'activities');
  const quickActionImages = getImagesForPosition(mappings, 'quickActions');
  const featureNavImages = getImagesForPosition(mappings, 'featureNav');
  const healthPayCardImages = getImagesForPosition(mappings, 'healthPayCard');
```

- [ ] **Step 3: 修改快捷功能区**

找到快捷功能区代码（约第131-169行），替换为：

```typescript
{/* 功能卡片区域 */}
<div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
  {quickActionImages.length > 0 ? (
    <IconGrid
      icons={quickActionImages}
      columns={4}
      labels={['查保障', '办理赔', '产险专区', '用权益']}
    />
  ) : (
    // 原有SVG图标作为fallback
    <div className="grid grid-cols-4 gap-4">
      {/* 原有4个图标代码 */}
    </div>
  )}
</div>
```

- [ ] **Step 4: 修改健康直付卡片**

找到健康直付卡片区域（约第171-214行），修改为：

```typescript
{/* 橙色卡片区域 */}
<div className="relative mx-4 mt-4 rounded-xl overflow-hidden" style={{ height: '140px' }}>
  {/* 背景图片 */}
  {healthPayCardImages.length > 0 && (
    <SmartImage
      src={healthPayCardImages[0].src}
      alt="健康直付卡片"
      width="100%"
      height="100%"
      fit="cover"
      borderRadius="12px"
      className="absolute inset-0"
    />
  )}
  
  {/* 内容层 */}
  <div className="relative z-10 p-4 h-full flex flex-col justify-between">
    {/* 原有内容 */}
  </div>
</div>
```

- [ ] **Step 5: 修改功能导航**

找到功能导航代码（约第216-265行），替换为：

```typescript
{/* 功能导航 */}
<div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
  {featureNavImages.length > 0 ? (
    <IconGrid
      icons={featureNavImages}
      columns={5}
      labels={['健康直付', '查看报告', '体检检测', '服务手册', '名医专家']}
    />
  ) : (
    // 原有SVG图标作为fallback
    <div className="grid grid-cols-5 gap-4">
      {/* 原有5个图标代码 */}
    </div>
  )}
</div>
```

- [ ] **Step 6: 修改Banner区域**

找到Banner区域代码（约第267-280行），替换为：

```typescript
{/* Banner 广告 */}
<div className="mx-4 mt-4">
  {bannerImages.length > 0 ? (
    <ImageSlider
      images={bannerImages}
      autoplay={true}
      interval={3000}
      height="150px"
    />
  ) : (
    // 原有渐变背景作为fallback
    <div className="bg-gradient-to-r from-[#FFB08A] to-[#FFD4B8] p-6 rounded-xl h-[150px]">
      {/* 原有内容 */}
    </div>
  )}
</div>
```

- [ ] **Step 7: 修改活动区域**

找到活动区域代码（约第282-299行），替换为：

```typescript
{/* 活动区域 */}
<div className="mx-4 mt-4">
  {activityImages.length >= 2 ? (
    <ActivityGrid images={activityImages.slice(0, 2)} />
  ) : (
    // 原有渐变背景作为fallback
    <div className="grid grid-cols-2 gap-3">
      {/* 原有内容 */}
    </div>
  )}
</div>
```

- [ ] **Step 8: Commit**

```bash
git add src/pages/QybHome.tsx
git commit -m "feat: integrate image mapping into QybHome page"
```

---

## Task 12: 运行开发服务器并验证

**Files:**
- Run commands

- [ ] **Step 1: 启动开发服务器**

```bash
cd d:\personal\aiAst\healthMall
npm run dev
```

- [ ] **Step 2: 访问页面**

浏览器访问: `http://localhost:5173/home`

- [ ] **Step 3: 验证功能**

检查以下功能是否正常：
- [ ] Banner轮播显示 `banner_医无忧.png`
- [ ] 活动卡片显示 `activity_健康日历.png` 和 `activity_春日健康计划.png`
- [ ] 健康直付卡片显示 `balance_card.png` 背景
- [ ] 快捷功能区显示4个icon图片
- [ ] 功能导航显示5个icon图片
- [ ] 图片懒加载正常工作

---

## Task 13: 与原图对比验证

**Files:**
- Create comparison report

- [ ] **Step 1: 截取当前实现截图**

使用浏览器开发者工具或截图工具截取 `http://localhost:5173/home` 页面。

- [ ] **Step 2: 对比检查清单**

| 检查项 | 原图 | 当前实现 | 状态 |
|--------|------|---------|------|
| Header橙色渐变背景 | #FF6B3B → #FF8A5C | 待检查 | ⬜ |
| 搜索框样式 | 半透明圆角 | 待检查 | ⬜ |
| 快捷功能区4列布局 | 等宽4列 | 待检查 | ⬜ |
| 健康直付卡片高度 | ~140px | 待检查 | ⬜ |
| 功能导航5列布局 | 等宽5列 | 待检查 | ⬜ |
| Banner高度 | ~150px | 待检查 | ⬜ |
| 活动卡片2列布局 | 等宽2列 | 待检查 | ⬜ |
| 图片显示比例 | 保持原比例 | 待检查 | ⬜ |

- [ ] **Step 3: 调整直至匹配**

根据对比结果，调整样式直至与原图一致。

---

## Task 14: 最终提交

- [ ] **Step 1: 最终检查**

```bash
git status
```

- [ ] **Step 2: 提交所有更改**

```bash
git add .
git commit -m "feat: implement image auto-fill feature for QybHome (Plan A)

- Add image mapping type definitions
- Add recognition rules and position configs
- Implement image scanner, recognizer, and mapper
- Create SmartImage, ImageSlider, IconGrid, ActivityCard components
- Add useImageMapping hook
- Integrate into QybHome page with fallback support
- Verify visual consistency with original design"
```

---

**计划完成时间**: 约16小时  
**最后更新**: 2026-04-15
