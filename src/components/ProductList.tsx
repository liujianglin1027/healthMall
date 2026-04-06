import { Link } from 'react-router-dom'

const ProductList = () => {
  const products = [
    {
      id: 1,
      name: '医用棉签无菌消毒棉棒',
      subtitle: '一次性使用 100支/包',
      price: 9.9,
      originalPrice: 15.9,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop',
      tags: ['热销', '包邮'],
    },
    {
      id: 2,
      name: '开塞露含甘油',
      subtitle: '润肠通便 20ml*10支',
      price: 12.8,
      originalPrice: 18.0,
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=300&h=300&fit=crop',
      tags: ['正品'],
    },
    {
      id: 3,
      name: '维生素C泡腾片',
      subtitle: '增强免疫力 20片/瓶',
      price: 29.9,
      originalPrice: 45.0,
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=300&fit=crop',
      tags: ['特惠'],
    },
    {
      id: 4,
      name: '医用外科口罩',
      subtitle: '三层防护 50只/盒',
      price: 19.9,
      originalPrice: 35.0,
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=300&fit=crop',
      tags: ['热销', '包邮'],
    },
    {
      id: 5,
      name: '云南白药创可贴',
      subtitle: '止血镇痛 100片/盒',
      price: 25.8,
      originalPrice: 38.0,
      image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=300&h=300&fit=crop',
      tags: ['品牌'],
    },
    {
      id: 6,
      name: '鱼油软胶囊',
      subtitle: '辅助降血脂 100粒/瓶',
      price: 89.0,
      originalPrice: 128.0,
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=300&h=300&fit=crop',
      tags: ['进口'],
    },
  ]

  return (
    <div className="px-4 pb-24">
      <h2 className="text-nav-title font-medium text-text-primary mb-3">精选推荐</h2>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <Link 
            to={`/product/${product.id}`} 
            key={product.id} 
            className="bg-white rounded-default overflow-hidden shadow-light"
          >
            {/* 商品图片 */}
            <div className="relative aspect-square bg-background-base2">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* 标签 */}
              {product.tags.length > 0 && (
                <div className="absolute top-2 left-2 flex gap-1">
                  {product.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-primary-main1 text-white text-small-label px-1.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {/* 商品信息 */}
            <div className="p-3">
              <h3 className="text-body text-text-primary font-medium text-ellipsis">{product.name}</h3>
              <p className="text-secondary text-text-tertiary mt-1 text-ellipsis">{product.subtitle}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-nav-title text-functional-error font-bold">
                  ¥{product.price}
                </span>
                <span className="text-small-label text-text-disabled line-through">
                  ¥{product.originalPrice}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ProductList
