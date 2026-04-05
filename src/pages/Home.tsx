import { Link } from 'react-router-dom'

const Home = () => {
  // 模拟商品数据
  const products = [
    {
      id: 1,
      name: '维生素C片',
      price: 99.00,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vitamin%20C%20tablets%20in%20a%20bottle%2C%20health%20supplement%2C%20clean%20white%20background&image_size=square_hd'
    },
    {
      id: 2,
      name: '蛋白粉',
      price: 299.00,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=protein%20powder%20container%2C%20fitness%20supplement%2C%20blue%20and%20white%20packaging&image_size=square_hd'
    },
    {
      id: 3,
      name: '鱼油软胶囊',
      price: 199.00,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fish%20oil%20softgels%20in%20a%20bottle%2C%20omega-3%20supplement%2C%20yellow%20packaging&image_size=square_hd'
    },
    {
      id: 4,
      name: '钙片',
      price: 129.00,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=calcium%20tablets%20in%20a%20bottle%2C%20bone%20health%20supplement%2C%20white%20and%20green%20packaging&image_size=square_hd'
    },
    {
      id: 5,
      name: '复合维生素片',
      price: 159.00,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=multivitamin%20tablets%20in%20a%20bottle%2C%20daily%20supplement%2C%20colorful%20packaging&image_size=square_hd'
    },
    {
      id: 6,
      name: '益生菌粉',
      price: 179.00,
      image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=probiotic%20powder%20in%20a%20container%2C%20gut%20health%20supplement%2C%20white%20and%20blue%20packaging&image_size=square_hd'
    }
  ]

  return (
    <div className="pt-40">
      {/* 顶部banner */}
      <div className="relative h-64 md:h-80 mb-8 overflow-hidden rounded-lg">
        <img 
          src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=health%20products%20banner%2C%20vitamins%20and%20supplements%2C%20bright%20and%20clean%20design&image_size=landscape_16_9" 
          alt="健康商城" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">健康生活，从这里开始</h2>
            <p className="text-lg mb-6">精选高品质健康产品，为您的健康保驾护航</p>
            <Link to="/" className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium">
              立即选购
            </Link>
          </div>
        </div>
      </div>

      {/* 服务金刚位 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link to="/" className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p>维生素</p>
        </Link>
        <Link to="/" className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 mx-auto mb-3 bg-secondary/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p>蛋白粉</p>
        </Link>
        <Link to="/" className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <p>鱼油</p>
        </Link>
        <Link to="/" className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition-shadow">
          <div className="w-16 h-16 mx-auto mb-3 bg-success/10 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p>钙片</p>
        </Link>
      </div>

      {/* 商品瀑布流 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">热门商品</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-2">{product.name}</h3>
                <p className="text-primary font-bold">¥{product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 健康资讯 */}
      <div>
        <h2 className="text-2xl font-bold mb-6">健康资讯</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
            <div className="h-40 overflow-hidden">
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=healthy%20lifestyle%20article%2C%20nutrition%20tips%2C%20fresh%20fruits%20and%20vegetables&image_size=landscape_4_3" 
                alt="健康饮食" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">健康饮食的重要性</h3>
              <p className="text-gray-600 text-sm">合理的饮食结构对身体健康至关重要，本文为您介绍如何构建均衡的饮食计划。</p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
            <div className="h-40 overflow-hidden">
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=exercise%20and%20fitness%20article%2C%20workout%20routine%2C%20gym%20equipment&image_size=landscape_4_3" 
                alt="运动健身" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">科学运动的好处</h3>
              <p className="text-gray-600 text-sm">定期运动不仅可以增强体质，还能改善心情，提高生活质量。</p>
            </div>
          </div>
          <div className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
            <div className="h-40 overflow-hidden">
              <img 
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=supplements%20guide%20article%2C%20vitamins%20and%20minerals%2C%20health%20supplements&image_size=landscape_4_3" 
                alt="营养补充" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">如何选择适合自己的营养补充剂</h3>
              <p className="text-gray-600 text-sm">不同人群对营养的需求不同，本文为您提供选择营养补充剂的实用建议。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home