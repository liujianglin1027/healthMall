import { useState, useEffect } from 'react'

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const banners = [
    {
      id: 1,
      title: '新人福利',
      subtitle: '惊爆加码',
      date: '2026年1月1日-2026年3月31日',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
      bgColor: 'from-pink-400 to-pink-300',
    },
    {
      id: 2,
      title: '健康好物',
      subtitle: '限时特惠',
      date: '每日10点准时开抢',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
      bgColor: 'from-orange-400 to-orange-300',
    },
    {
      id: 3,
      title: '品质保障',
      subtitle: '正品直供',
      date: '全场满99包邮',
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=400&h=300&fit=crop',
      bgColor: 'from-blue-400 to-blue-300',
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [banners.length])

  return (
    <div className="relative overflow-hidden">
      {/* Banner轮播 */}
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <div 
            key={banner.id} 
            className={`w-full flex-shrink-0 bg-gradient-to-r ${banner.bgColor} px-4 py-4`}
          >
            <div className="flex items-center justify-between">
              {/* 左侧文字 */}
              <div className="flex-1">
                <div className="mb-1">
                  <span className="text-white text-big-title font-bold drop-shadow-md">{banner.title}</span>
                </div>
                <div className="mb-2">
                  <span className="text-white text-standard-title font-bold drop-shadow-md">{banner.subtitle}</span>
                </div>
                <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 inline-block">
                  <span className="text-white text-small-label">{banner.date}</span>
                </div>
              </div>
              {/* 右侧图片 */}
              <div className="w-32 h-24 flex-shrink-0">
                <img 
                  src={banner.image} 
                  alt={banner.title}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 指示器 */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-3' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default Banner
