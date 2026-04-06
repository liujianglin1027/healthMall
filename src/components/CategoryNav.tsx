import { 
  Rabbit, 
  ShoppingBag, 
  Pill, 
  Stethoscope, 
  HeartPulse,
  Baby,
  Sparkles,
  User,
  Activity,
  Grid3X3
} from 'lucide-react'

const CategoryNav = () => {
  const categories = [
    { id: 1, name: '美团买药', icon: Rabbit, color: 'bg-yellow-100 text-yellow-500', tag: '极速达' },
    { id: 2, name: '中医药品', icon: ShoppingBag, color: 'bg-orange-100 text-orange-500' },
    { id: 3, name: '营养保健', icon: Pill, color: 'bg-blue-100 text-blue-500' },
    { id: 4, name: '医疗器械', icon: Stethoscope, color: 'bg-red-100 text-red-500' },
    { id: 5, name: '体检服务', icon: HeartPulse, color: 'bg-purple-100 text-purple-500' },
    { id: 6, name: '儿童专区', icon: Baby, color: 'bg-orange-100 text-orange-400' },
    { id: 7, name: '皮肤护理', icon: Sparkles, color: 'bg-green-100 text-green-500' },
    { id: 8, name: '男性健康', icon: User, color: 'bg-blue-100 text-blue-400' },
    { id: 9, name: '慢性专区', icon: Activity, color: 'bg-pink-100 text-pink-500' },
    { id: 10, name: '更多', icon: Grid3X3, color: 'bg-gray-100 text-gray-400' },
  ]

  return (
    <div className="bg-white px-4 py-4">
      <div className="grid grid-cols-5 gap-y-4">
        {categories.map((category) => {
          const IconComponent = category.icon
          return (
            <div key={category.id} className="flex flex-col items-center">
              <div className="relative">
                {/* 标签 */}
                {category.tag && (
                  <span className="absolute -top-1 -right-2 bg-primary-main1 text-white text-small-label px-1 rounded z-10">
                    {category.tag}
                  </span>
                )}
                {/* 图标容器 */}
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mb-2`}>
                  <IconComponent className="w-6 h-6" />
                </div>
              </div>
              <span className="text-secondary text-text-secondary text-center">{category.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryNav
