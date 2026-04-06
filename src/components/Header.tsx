import { useState } from 'react'
import { Search, ShoppingCart, ChevronLeft, MoreHorizontal } from 'lucide-react'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [cartCount] = useState(2)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('搜索:', searchQuery)
  }

  return (
    <header className="sticky top-0 z-50">
      {/* 顶部状态栏区域 - 渐变背景 */}
      <div className="bg-gradient-to-r from-primary-main1 to-primary-main2 px-4 pt-2 pb-3">
        {/* 顶部导航栏 */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <ChevronLeft className="w-5 h-5 text-white" />
            <span className="text-white text-secondary">中国联通</span>
            <span className="text-white text-secondary">15:06</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white text-nav-title font-medium">健康商城</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-functional-error text-white text-small-label rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </div>
            <MoreHorizontal className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* 搜索框 */}
        <form onSubmit={handleSearch} className="relative">
          <div className="flex items-center bg-white rounded-default px-3 py-2">
            <Search className="w-5 h-5 text-text-tertiary mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="搜索药品、器械、保健品"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-body text-text-primary placeholder:text-text-tertiary outline-none"
            />
            <button 
              type="submit"
              className="bg-primary-main1 text-white text-secondary px-4 py-1 rounded-default ml-2 flex-shrink-0"
            >
              搜索
            </button>
          </div>
        </form>
      </div>
    </header>
  )
}

export default Header
