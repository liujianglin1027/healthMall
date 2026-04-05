import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)

  // 模拟商品数据
  const product = {
    id: Number(id),
    name: '维生素C片',
    price: 99.00,
    description: '本品含有高纯度维生素C，有助于增强免疫力，促进铁吸收，抗氧化，美容养颜。适合免疫力低下、容易感冒、皮肤暗黄的人群。',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vitamin%20C%20tablets%20in%20a%20bottle%2C%20health%20supplement%2C%20clean%20white%20background&image_size=square_hd',
    details: [
      '品牌：健康源',
      '规格：100片/瓶',
      '成分：维生素C、辅料',
      '用法用量：每日1-2片，温水送服',
      '保质期：24个月'
    ],
    shop: {
      name: '健康源官方旗舰店',
      rating: 4.8,
      sales: 12580,
      logo: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=health%20store%20logo%2C%20clean%20modern%20design&image_size=square_hd'
    },
    coupons: [
      { id: 1, value: 10, minSpend: 99, expire: '2026-12-31' },
      { id: 2, value: 20, minSpend: 199, expire: '2026-12-31' }
    ]
  }

  const handleAddToCart = () => {
    // 模拟加入购物车
    alert('商品已加入购物车')
  }

  const handleBuyNow = () => {
    // 跳转到确认订单页
    navigate('/checkout')
  }

  return (
    <div className="pt-40">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* 商品图片 */}
          <div className="flex justify-center">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full max-w-md h-auto"
            />
          </div>

          {/* 商品信息 */}
          <div>
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-6">¥{product.price.toFixed(2)}</p>
            
            {/* 优惠券信息 */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">优惠券</h3>
              <div className="flex space-x-2">
                {product.coupons.map((coupon) => (
                  <div key={coupon.id} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    ¥{coupon.value} 满{coupon.minSpend}可用
                  </div>
                ))}
              </div>
            </div>
            
            {/* 店铺信息 */}
            <div className="mb-6 flex items-center">
              <img 
                src={product.shop.logo} 
                alt={product.shop.name} 
                className="w-12 h-12 rounded-full mr-3"
              />
              <div>
                <h3 className="font-medium">{product.shop.name}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-3">评分：{product.shop.rating}</span>
                  <span>销量：{product.shop.sales}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">商品描述</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div className="mb-6">
              <h3 className="font-medium mb-2">商品详情</h3>
              <ul className="text-gray-600 space-y-1">
                {product.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="flex items-center mb-8">
              <span className="mr-4">数量：</span>
              <div className="flex items-center border rounded">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
              >
                加入购物车
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-1 bg-accent hover:bg-accent/90 text-white py-3 rounded-lg font-medium"
              >
                立即购买
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 相关推荐 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">相关推荐</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={`https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=health%20supplement%20product%20${item}%2C%20vitamin%20bottle%2C%20clean%20white%20background&image_size=square_hd`} 
                  alt={`推荐商品${item}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">推荐商品{item}</h3>
                <p className="text-primary font-bold">¥{Math.floor(Math.random() * 300) + 50}.00</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail