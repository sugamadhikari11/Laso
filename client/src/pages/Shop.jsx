import {useShop} from '../context/ShopContext'; // Adjust path as needed
import {Header} from '../components/shop_Components/layout/Header'
import { Navigation } from '../components/shop_Components/layout/Navgiation';
import {ProductGrid} from '../components/shop_Components/product/ProdcutGrid'
import { PRODUCTS } from '../data/ProductsData'; // Adjust path based on your folder structure
import {Cart} from '../components/shop_Components/cart/Cart';
import {Checkout} from '../components/shop_Components/checkout/Checkout'
import {OrderSuccess} from '../components/shop_Components/orders/OrderSuccess'
import {Orders} from '../components/shop_Components/orders/Orders'
// Main Shop Component
const Shop = () => {
  const { currentView } = useShop();

  const getFilteredProducts = () => {
    switch (currentView) {
      case 'new-arrivals':
        return PRODUCTS.filter(p => p.isNew);
      case 'trending':
        return PRODUCTS.filter(p => p.isTrending);
      case 'discounted':
        return PRODUCTS.filter(p => p.isDiscounted);
      default:
        return PRODUCTS;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case 'new-arrivals':
        return 'New Arrivals';
      case 'trending':
        return 'Trending Now';
      case 'discounted':
        return 'Special Offers';
      case 'shop':
        return 'LASO';
      default:
        return '';
    }
  };

  const getViewSubtitle = () => {
    switch (currentView) {
      case 'new-arrivals':
        return 'Discover our latest additions to the collection';
      case 'trending':
        return 'The most popular items right now';
      case 'discounted':
        return 'Limited time offers you don\'t want to miss';
      case 'shop':
        return 'Discover our premium collection of carefully curated products designed for the modern lifestyle.';
      default:
        return '';
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'cart':
        return <Cart />;
      case 'checkout':
        return <Checkout />;
      case 'orders':
        return <Orders />;
      case 'order-success':
        return <OrderSuccess />;
      case 'shop':
      case 'new-arrivals':
      case 'trending':
      case 'discounted':
        return (
          <>
            <Navigation />
            <ProductGrid 
              products={getFilteredProducts()} 
              title={getViewTitle()}
              subtitle={getViewSubtitle()}
            />
          </>
        );
      default:
        return (
          <>
            <Navigation />
            <ProductGrid 
              products={PRODUCTS} 
              title="LASO"
              subtitle="Discover our premium collection of carefully curated products designed for the modern lifestyle."
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {renderContent()}
      
      {/* Brand Footer */}
      {!['cart', 'checkout', 'orders', 'order-success'].includes(currentView) && (
        <div className="container mx-auto px-4">
          <div className="text-center mt-16 py-8 border-t border-gray-200">
            <h3 className="text-6xl font-bold text-black opacity-10 mb-4">LASO</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Premium quality meets modern design. Every piece in our collection is crafted with attention to detail.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;