/**
 * 平安企业宝 (CorpGuard) Tailwind CSS 配置
 * 
 * 使用方式：
 * 1. 将此配置合并到你的 tailwind.config.js
 * 2. 或直接在项目中引用此文件
 * 
 * 示例用法：
 * - bg-primary-main1  → 背景色用品牌橙
 * - text-body         → 文字大小用正文层级
 * - spacing-4         → 间距用 16px
 * - radius-default    → 圆角用 8px
 */

module.exports = {
  theme: {
    extend: {
      // 颜色扩展
      colors: {
        primary: {
          main1: '#FF5818',
          main2: '#FF6E27',
        },
        secondary: {
          blue: '#3E4A57',
        },
        functional: {
          success: '#15B899',
          error: '#FF352D',
          warning: '#FF9500',
          info: '#0066FF',
        },
        text: {
          primary: '#111111',
          secondary: '#5F5677',
          tertiary: '#878B99',
          disabled: '#C8CDD4',
        },
        background: {
          base1: '#F6F7F8',
          base2: '#FAFAFB',
          option: '#F0F1F5',
          border: '#ECEDF3',
        },
      },

      // 字体家族
      fontFamily: {
        chinese: ['PingFang SC', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        numeric: ['D-DIN-PRO', 'DIN', 'Helvetica Neue', 'sans-serif'],
      },

      // 字重
      fontWeight: {
        regular: '400',
        medium: '500',
      },

      // 字号 (基于设计稿 ÷2)
      fontSize: {
        'big-title': ['20px', { lineHeight: '30px' }],
        'standard-title': ['18px', { lineHeight: '27px' }],
        'nav-title': ['16px', { lineHeight: '24px' }],
        'body': ['14px', { lineHeight: '21px' }],
        'secondary': ['12px', { lineHeight: '18px' }],
        'small-label': ['10px', { lineHeight: '15px' }],
      },

      // 行高
      lineHeight: {
        tight: '1.2',
        normal: '1.5',
        loose: '1.7',
      },

      // 间距 (4px 基准)
      spacing: {
        '0': '0px',
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
      },

      // 圆角
      borderRadius: {
        'default': '8px',
        'medium': '16px',
        'large': '20px',
        'xlarge': '40px',
        'round': '9999px',
      },

      // 阴影
      boxShadow: {
        'light': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'heavy': '0 8px 32px rgba(0, 0, 0, 0.16)',
      },

      // 过渡动画
      transitionDuration: {
        'fast': '150ms',
        'normal': '250ms',
        'slow': '350ms',
      },

      // 层级
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
      },
    },
  },

  // 自定义工具类（可选）
  plugins: [
    // 如需添加自定义工具类，可在此处扩展
  ],
};
