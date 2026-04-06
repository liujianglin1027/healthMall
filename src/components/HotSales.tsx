import { ChevronRight } from 'lucide-react'

const HotSales = () => {
  const hotProducts = [
    {
      id: 1,
      rank: 1,
      name: '医用棉签无菌',
      sales: '热销5106',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop',
    },
    {
      id: 2,
      rank: 2,
      name: '开塞露(含甘...',
      sales: '热销3836',
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=200&h=200&fit=crop',
    },
  ]

  const qualityProducts = [
    {
      id: 3,
      rank: 1,
      name: '敷尔佳医用...',
      price: '¥99.00',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop',
    },
    {
      id: 4,
      rank: 2,
      name: '买2件送试...',
      price: '¥168.00',
      image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop',
    },
  ]

  return (
    <div className="px-4 py-4">
      <div className="flex gap-3">
        {/* 平台热卖 */}
        <div className="flex-1 bg-white rounded-large p-3 shadow-light">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white text-small-label px-2 py-0.5 rounded">
                平台热卖
              </div>
              <span className="text-small-label text-text-tertiary">实惠好物</span>
            </div>
            <ChevronRight className="w-4 h-4 text-text-tertiary" />
          </div>
          <div className="flex gap-2">
            {hotProducts.map((product) => (
              <div key={product.id} className="flex-1">
                <div className="relative">
                  {/* TOP标签 */}
                  <div className="absolute top-0 left-0 bg-primary-main1 text-white text-small-label w-5 h-5 flex items-center justify-center rounded-br">
                    TOP{product.rank}
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-default bg-background-base2"
                  />
                </div>
                <div className="mt-1">
                  <div className="bg-primary-main1/10 text-primary-main1 text-small-label px-1 rounded inline-block">
                    {product.sales}
                  </div>
                  <p className="text-secondary text-text-secondary mt-1 text-ellipsis">{product.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 品质精选 */}
        <div className="flex-1 bg-white rounded-large p-3 shadow-light">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <div className="bg-gradient-to-r from-pink-400 to-red-400 text-white text-small-label px-2 py-0.5 rounded">
                品质精选
              </div>
              <span className="text-small-label text-text-tertiary">正品保障</span>
            </div>
            <ChevronRight className="w-4 h-4 text-text-tertiary" />
          </div>
          <div className="flex gap-2">
            {qualityProducts.map((product) => (
              <div key={product.id} className="flex-1">
                <div className="relative">
                  {/* TOP标签 */}
                  <div className="absolute top-0 left-0 bg-primary-main1 text-white text-small-label w-5 h-5 flex items-center justify-center rounded-br">
                    TOP{product.rank}
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full aspect-square object-cover rounded-default bg-background-base2"
                  />
                </div>
                <div className="mt-1">
                  <p className="text-body text-functional-error font-medium">{product.price}</p>
                  <p className="text-secondary text-text-secondary text-ellipsis">{product.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotSales
