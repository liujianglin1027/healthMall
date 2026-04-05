import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
  const navigate = useNavigate()

  return (
    <div className="pt-40">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">支付成功</h1>
          <p className="text-gray-600 mb-8">您的订单已支付成功，我们将尽快为您发货</p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8 inline-block">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">订单编号：</span>
              <span>HM20240305001</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">支付金额：</span>
              <span className="text-primary font-bold">¥408.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">支付时间：</span>
              <span>2024-03-05 10:30:45</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium"
            >
              返回首页
            </button>
            <button 
              onClick={() => navigate('/')}
              className="border border-primary text-primary hover:bg-primary/5 px-8 py-3 rounded-lg font-medium"
            >
              查看订单
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess