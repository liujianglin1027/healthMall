import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">健康商城</h3>
            <p className="text-gray-400">专注于提供高品质健康产品，为您的健康保驾护航。</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">首页</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">分类</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">关于我们</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">联系我们</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">客户服务</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white">常见问题</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">退换货政策</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">配送信息</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-white">隐私政策</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">联系我们</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">电话: 400-123-4567</li>
              <li className="text-gray-400">邮箱: info@healthmall.com</li>
              <li className="text-gray-400">地址: 北京市朝阳区健康路123号</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2024 健康商城. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer