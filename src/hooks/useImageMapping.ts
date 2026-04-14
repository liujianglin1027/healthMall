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
