// src/utils/image-scanner.ts

import { ImageMetadata } from '../types/image-mapping';
import { SUPPORTED_EXTENSIONS } from '../config/qyb-home-images.config';

/**
 * 扫描指定文件夹中的图片
 * 使用Vite的import.meta.glob动态导入
 */
export async function scanImages(_folderPath: string): Promise<ImageMetadata[]> {
  const images: ImageMetadata[] = [];

  try {
    // 动态导入public文件夹下的图片
    // @ts-ignore - Vite specific API
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
