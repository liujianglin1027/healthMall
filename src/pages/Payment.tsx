import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Payment = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(900) // 15分钟倒计时
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending')
  const [selectedPayment, setSelectedPayment] = useState('wechat')

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setPaymentStatus('failed')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handlePaymentSuccess = () => {
    setPaymentStatus('success')
    setTimeout(() => {
      navigate('/payment/success')
    }, 1500)
  }

  const handlePaymentFailed = () => {
    setPaymentStatus('failed')
  }

  return (
    <div className="pt-40">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">支付收银台</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* 支付信息 */}
            <div className="md:w-1/2">
              <h2 className="text-lg font-medium mb-4">订单信息</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span>订单编号：</span>
                  <span>HM20240305001</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>支付金额：</span>
                  <span className="text-primary font-bold">¥408.00</span>
                </div>
                <div className="flex justify-between">
                  <span>支付方式：</span>
                  <span>{selectedPayment === 'wechat' ? '微信支付' : '支付宝'}</span>
                </div>
              </div>

              <h2 className="text-lg font-medium mb-4">支付倒计时</h2>
              <div className="bg-gray-50 p-4 rounded-lg mb-6 flex items-center justify-between">
                <span>请在以下时间内完成支付：</span>
                <span className="font-bold text-danger">{formatTime(countdown)}</span>
              </div>

              <h2 className="text-lg font-medium mb-4">选择支付方式</h2>
              <div className="space-y-3 mb-6">
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

              {paymentStatus === 'pending' && (
                <button 
                  onClick={handlePaymentSuccess}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium"
                >
                  确认支付
                </button>
              )}

              {paymentStatus === 'success' && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-success font-medium">支付成功，正在跳转...</p>
                </div>
              )}

              {paymentStatus === 'failed' && (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-danger/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-danger" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-danger font-medium mb-4">支付失败或超时</p>
                  <button 
                    onClick={() => navigate('/cart')}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    重新支付
                  </button>
                </div>
              )}
            </div>

            {/* 支付二维码 */}
            <div className="md:w-1/2">
              <h2 className="text-lg font-medium mb-4">扫码支付</h2>
              <div className="bg-gray-50 p-8 rounded-lg flex flex-col items-center">
                <div className="w-64 h-64 bg-white p-4 rounded-lg shadow mb-4 flex items-center justify-center">
                  <img 
                    src={selectedPayment === 'wechat' 
                      ? "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=WeChat%20pay%20QR%20code%2C%20black%20and%20white%2C%20clean%20background&image_size=square_hd" 
                      : "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Alipay%20QR%20code%2C%20black%20and%20white%2C%20clean%20background&image_size=square_hd"
                    } 
                    alt={`${selectedPayment === 'wechat' ? '微信' : '支付宝'}支付二维码`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center">请使用{selectedPayment === 'wechat' ? '微信' : '支付宝'}扫描二维码支付</p>
                <p className="text-gray-600 text-sm text-center mt-2">支付金额：¥408.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment