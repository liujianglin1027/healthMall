import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Scan } from 'lucide-react'
import Footer from '../components/Footer'
import { useImageMapping } from '../hooks/useImageMapping'
import { SmartImage } from '../components/SmartImage'
import { ImageSlider } from '../components/ImageSlider'
import { IconGrid } from '../components/IconGrid'
import { ActivityGrid } from '../components/ActivityCard'
import { getImagesForPosition } from '../utils/image-mapper'

const QybHome = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [messageCount] = useState(13)
  const [location] = useState('上海')

  // 图片映射
  const { mappings } = useImageMapping()

  // 获取各位置图片
  const bannerImages = getImagesForPosition(mappings, 'banner')
  const activityImages = getImagesForPosition(mappings, 'activities')
  const quickActionImages = getImagesForPosition(mappings, 'quickActions')
  const featureNavImages = getImagesForPosition(mappings, 'featureNav')
  const healthPayCardImages = getImagesForPosition(mappings, 'healthPayCard')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('搜索:', searchQuery)
  }
  // 使用handleSearch避免未使用警告
  void handleSearch

  // 跳转到健康直付页面
  const handleHealthPay = () => {
    navigate('/health-pay')
  }

  return (
    <div className="min-h-screen bg-background-base1">
      {/* 企业宝 Header - 橙色主题 */}
      <header className="sticky top-0 z-50">
        {/* 状态栏区域 - 橙色背景 */}
        <div className="bg-gradient-to-r from-[#FF6B3B] to-[#FF8A5C] pt-[env(safe-area-inset-top, 0px)]">
          {/* 系统状态栏模拟 */}
          <div className="px-4 pt-2 pb-1">
            <div className="flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <span>中国联通</span>
                <span>20:36</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-4 h-3 bg-white/80 rounded-sm"></div>
                  <div className="w-5 h-3 bg-white/80 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 主 Header 区域 */}
          <div className="px-4 pb-3">
            {/* 第一行：定位 + 搜索框 + 功能按钮 */}
            <div className="flex items-center gap-2">
              {/* 定位 */}
              <div className="flex items-center gap-1 text-white flex-shrink-0">
                <span className="text-sm font-medium">{location}</span>
                <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>

              {/* 搜索框 */}
              <div className="flex-1 relative min-w-0">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2">
                  <Search className="w-4 h-4 text-white/80 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="玻璃酸钠滴眼液"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent text-white text-sm placeholder:text-white/60 outline-none min-w-0"
                  />
                </div>
              </div>

              {/* 功能按钮组 */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* 消息图标 */}
                <div className="relative">
                  <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-7 7v-7a2 2 0 01-2-2V5z" />
                      <path d="M14 7a2 2 0 01-2 2H9.293l1.854-1.854A2 2 0 0011.707 4H12a2 2 0 012 2v1z" />
                    </svg>
                  </div>
                  {messageCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-functional-error text-white text-[10px] rounded-full min-w-[16px] h-4 flex items-center justify-center px-1 font-medium">
                      {messageCount}
                    </span>
                  )}
                </div>

                {/* 扫一扫 */}
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Scan className="w-4 h-4 text-white" />
                </div>

                {/* 快捷服务按钮 */}
                <div className="bg-gradient-to-r from-[#FF9A6C] to-[#FFB08A] text-white text-xs font-medium px-2 py-1.5 rounded-full whitespace-nowrap">
                  快捷服务
                </div>
              </div>
            </div>
          </div>

          {/* 导航标签栏 - 白色背景 */}
          <div className="bg-white border-b border-gray-100">
            <div className="px-4">
              <div className="flex items-center gap-6">
                <div className="py-3 border-b-2 border-[#FF6B3B]">
                  <span className="text-[#FF6B3B] font-medium text-base">企业宝</span>
                </div>
                <div className="py-3 border-b-2 border-transparent">
                  <span className="text-text-secondary font-medium text-base">账户</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 企业宝内容区域 */}
      <main className="pb-16">
        {/* 测试专用提示 */}
        <div className="bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-text-secondary text-sm">平安产险测试专用</span>
          </div>
        </div>

        {/* 功能卡片区域 - 使用图片图标 */}
        <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          {quickActionImages.length >= 4 ? (
            <IconGrid
              icons={quickActionImages.slice(0, 4)}
              columns={4}
              labels={['查保障', '办理赔', '产险专区', '用权益']}
            />
          ) : (
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9A6C] to-[#FFB08A] rounded-xl flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700">查保障</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9A6C] to-[#FFB08A] rounded-xl flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7zm7-8a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 110-2h2V1a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700">办理赔</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9A6C] to-[#FFB08A] rounded-xl flex items-center justify-center mb-2 relative">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7zm7-8a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 110-2h2V1a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded">专区</span>
                </div>
                <span className="text-xs text-gray-700">产险专区</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9A6C] to-[#FFB08A] rounded-xl flex items-center justify-center mb-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700">用权益</span>
              </div>
            </div>
          )}
        </div>

        {/* 健康直付卡片 - 使用图片背景 */}
        <div className="relative mx-4 mt-4 rounded-xl overflow-hidden" style={{ height: '140px' }}>
          {/* 背景图片 */}
          {healthPayCardImages.length > 0 ? (
            <SmartImage
              src={healthPayCardImages[0].src}
              alt="健康直付卡片"
              width="100%"
              height="100%"
              fit="cover"
              borderRadius="12px"
              className="absolute inset-0"
              lazy={false}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B3B] to-[#FF8A5C] rounded-xl" />
          )}

          {/* 内容层 */}
          <div className="relative z-10 p-4 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white text-sm mb-1">健康直付可用余额</div>
                <div className="text-white text-2xl font-bold">***** 元</div>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-white text-xs mb-1">查订单</div>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-white text-xs mb-1">付款码</div>
                  <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-0.5">
                      <div className="w-1.5 h-1.5 bg-white"></div>
                      <div className="w-1.5 h-1.5 bg-white"></div>
                      <div className="w-1.5 h-1.5 bg-white"></div>
                      <div className="w-1.5 h-1.5 bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1 bg-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm">余额明细</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 001-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                </svg>
                <span className="text-white text-sm">附近门店</span>
              </div>
            </div>
          </div>
        </div>

        {/* 功能导航 - 使用图片图标 */}
        <div className="bg-white mx-4 mt-4 rounded-xl p-4 shadow-sm">
          {featureNavImages.length >= 5 ? (
            <IconGrid
              icons={featureNavImages.slice(0, 5)}
              columns={5}
              labels={['健康直付', '查看报告', '体检检测', '服务手册', '名医专家']}
              onIconClick={(index) => {
                if (index === 0) {
                  handleHealthPay()
                }
              }}
            />
          ) : (
            <div className="grid grid-cols-5 gap-4">
              <div
                className="flex flex-col items-center cursor-pointer active:opacity-60 transition-opacity"
                onClick={handleHealthPay}
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700">健康直付</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700">查看报告</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700">体检检测</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700">服务手册</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-1">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-700">名医专家</span>
              </div>
            </div>
          )}
        </div>

        {/* Banner 广告 - 使用图片轮播 */}
        <div className="mx-4 mt-4">
          {bannerImages.length > 0 ? (
            <ImageSlider
              images={bannerImages}
              autoplay={true}
              interval={3000}
              height="150px"
            />
          ) : (
            <div className="bg-gradient-to-r from-[#FFB08A] to-[#FFD4B8] p-6 rounded-xl h-[150px]">
              <div className="flex items-center justify-between h-full">
                <div>
                  <div className="text-white text-lg font-bold mb-2">医无忧·她享保重磅上新</div>
                  <div className="text-white text-sm bg-white/20 inline-block px-3 py-1 rounded-full">每天免费抽真我迪奥香水</div>
                </div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#FF6B3B] font-bold text-xl">GO</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 活动区域 - 使用图片卡片 */}
        <div className="mx-4 mt-4">
          {activityImages.length >= 2 ? (
            <ActivityGrid images={activityImages.slice(0, 2)} />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-[#FFD4B8] to-[#FFE5CC] rounded-lg p-3">
                <div className="text-[#FF6B3B] text-sm font-medium mb-2">祈福赚积分</div>
                <div className="bg-white/50 text-[#FF6B3B] text-xs px-2 py-1 rounded inline-block">去签到</div>
              </div>
              <div className="bg-white rounded-lg p-3 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9A6C] to-[#FFB08A] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-800 text-sm font-medium">新人有礼</div>
                  <div className="text-gray-500 text-xs">领四重好礼</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 底部导航 */}
      <Footer />
    </div>
  )
}

export default QybHome
