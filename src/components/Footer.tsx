import { Link, useLocation } from 'react-router-dom'
import { Home, Shield, Heart, User } from 'lucide-react'

const Footer = () => {
  const location = useLocation()
  const currentPath = location.pathname

  const navItems = [
    { id: 1, name: '首页', icon: Home, path: '/home' },
    { id: 2, name: '保险', icon: Shield, path: '/insurance' },
    { id: 3, name: '健康商城', icon: Heart, path: '/' },
    { id: 4, name: '我的', icon: User, path: '/profile' },
  ]

  // 判断当前是否在首页（健康商城）
  const isActive = (path: string) => {
    if (path === '/' && currentPath === '/') return true
    if (path !== '/' && currentPath.startsWith(path)) return true
    return false
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-background-border z-50">
      <div className="flex items-center justify-around py-2 pb-safe">
        {navItems.map((item) => {
          const IconComponent = item.icon
          const active = isActive(item.path)
          return (
            <Link 
              key={item.id} 
              to={item.path}
              className="flex flex-col items-center py-1 px-4"
            >
              <IconComponent 
                className={`w-6 h-6 ${active ? 'text-primary-main1' : 'text-text-tertiary'}`} 
                fill={active ? 'currentColor' : 'none'}
              />
              <span 
                className={`text-small-label mt-1 ${active ? 'text-primary-main1' : 'text-text-tertiary'}`}
              >
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </footer>
  )
}

export default Footer
