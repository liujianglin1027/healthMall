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
