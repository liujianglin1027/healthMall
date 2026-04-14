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
