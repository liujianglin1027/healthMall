import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Cart = () => {
  const navigate = useNavigate()
  
  // 模拟购物车数据
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '维生素C片',
      price: 99.00,
      quantity: 2,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vitamin%20C%20tablets%20in%20a%20bottle%2C%20health%20supplement%2C%20clean%20white%20background&image_size=square_hd',
      shop: '健康源官方旗舰店'
    },
    {
      id: 2,
      name: '蛋白粉',
      price: 299.00,
      quantity: 1,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=protein%20powder%20container%2C%20fitness%20supplement%2C%20blue%20and%20white%20packaging&image_size=square_hd',
      shop: '健康源官方旗舰店'
    }
  ])

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const handleCheckout = () => {
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-40">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-xl font-medium mb-2">购物车为空</h3>
          <p className="text-gray-600 mb-6">去选购一些健康产品吧</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium"
          >
            去购物
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-40">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">购物车</h1>
          
          {/* 店铺分组 */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-4">
                <input type="checkbox" className="mr-2" />
                <span className="font-medium">{cartItems[0].shop}</span>
              </div>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col md:flex-row gap-4 pb-6 border-b">
                    <div className="md:w-1/4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-40 object-cover rounded"
                      />
                    </div>
                    <div className="md:w-3/4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-medium mb-2">{item.name}</h3>
                        <p className="text-primary font-bold mb-4">¥{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border rounded">
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="px-3 py-1"
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="px-3 py-1"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-danger hover:underline"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 p-6 fixed bottom-0 left-0 right-0">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>全选</span>
            </div>
            <div className="flex items-center">
              <span className="mr-4">合计：</span>
              <span className="text-2xl font-bold text-primary">¥{getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
          >
            去结算({cartItems.length})
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart