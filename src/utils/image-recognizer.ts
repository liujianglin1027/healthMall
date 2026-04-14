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
