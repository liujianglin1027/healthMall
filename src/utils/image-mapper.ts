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
