import Header from '../components/Header'
import Banner from '../components/Banner'
import CategoryNav from '../components/CategoryNav'
import HotSales from '../components/HotSales'
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="min-h-screen bg-background-base1">
      {/* 顶部Header */}
      <Header />
      
      {/* 主内容区 */}
      <main className="pb-16">
        {/* Banner轮播 */}
        <Banner />
        
        {/* 分类导航 */}
        <CategoryNav />
        
        {/* 平台热卖 & 品质精选 */}
        <HotSales />
        
        {/* 商品列表 */}
        <ProductList />
      </main>
      
      {/* 底部导航 */}
      <Footer />
    </div>
  )
}

export default Home
