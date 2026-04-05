import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Checkout = () => {
  const navigate = useNavigate()
  const [selectedAddress, setSelectedAddress] = useState(1)
  const [selectedPayment, setSelectedPayment] = useState('wechat')

  // 模拟地址数据
  const addresses = [
    {
      id: 1,
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区健康路123号健康大厦1001室'
    },
    {
      id: 2,
      name: '李四',
      phone: '13900139000',
      address: '上海市浦东新区张江高科技园区博云路2号'
    }
  ]

  // 模拟订单商品数据
  const orderItems = [
    {
      id: 1,
      name: '维生素C片',
      price: 99.00,
      quantity: 2,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vitamin%20C%20tablets%20in%20a%20bottle%2C%20health%20supplement%2C%20clean%20white%20background&image_size=square_hd'
    },
    {
      id: 2,
      name: '蛋白粉',
      price: 299.00,
      quantity: 1,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=protein%20powder%20container%2C%20fitness%20supplement%2C%20blue%20and%20white%20packaging&image_size=square_hd'
    }
  ]

  const getSubtotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotal = () => {
    return getSubtotal() + 10 // 10元运费
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/payment')
  }

  return (
    <div className="pt-40">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">确认订单</h1>
          
          {/* 收货地址 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">收货地址</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div 
                  key={address.id}
                  className={`border rounded-lg p-4 cursor-pointer ${selectedAddress === address.id ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                  onClick={() => setSelectedAddress(address.id)}
                >
                  <div className="flex items-center mb-2">
                    <span className="font-medium mr-4">{address.name}</span>
                    <span>{address.phone}</span>
                  </div>
                  <p className="text-gray-600">{address.address}</p>
                </div>
              ))}
              <div className="border rounded-lg p-4 border-dashed flex items-center justify-center cursor-pointer hover:border-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>添加新地址</span>
              </div>
            </div>
          </div>

          {/* 商品清单 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">商品清单</h2>
            <div className="space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-bold">¥{item.price.toFixed(2)}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 配送方式 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">配送方式</h2>
            <div className="border rounded-lg p-4">
              <div className="flex items-center">
                <input type="radio" name="delivery" id="delivery1" checked readOnly className="mr-2" />
                <label htmlFor="delivery1">标准配送 - ¥10.00</label>
              </div>
            </div>
          </div>

          {/* 支付方式 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">支付方式</h2>
            <div className="space-y-3">
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${selectedPayment === 'wechat' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                onClick={() => setSelectedPayment('wechat')}
              >
                <div className="flex items-center">
                  <input type="radio" name="payment" id="wechat" checked={selectedPayment === 'wechat'} readOnly className="mr-2" />
                  <label htmlFor="wechat">微信支付</label>
                </div>
              </div>
              <div 
                className={`border rounded-lg p-4 cursor-pointer ${selectedPayment === 'alipay' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                onClick={() => setSelectedPayment('alipay')}
              >
                <div className="flex items-center">
                  <input type="radio" name="payment" id="alipay" checked={selectedPayment === 'alipay'} readOnly className="mr-2" />
                  <label htmlFor="alipay">支付宝</label>
                </div>
              </div>
            </div>
          </div>

          {/* 订单金额 */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="flex justify-between mb-2">
              <span>商品小计：</span>
              <span>¥{getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>运费：</span>
              <span>¥10.00</span>
            </div>
            <div className="flex justify-between font-medium mt-4">
              <span>订单合计：</span>
              <span className="text-primary font-bold text-lg">¥{getTotal().toFixed(2)}</span>
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
          >
            提交订单
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout