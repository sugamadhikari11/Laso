import { useShop } from "../../../context/ShopContext";
import { ArrowLeft, ShoppingCart, Heart, Star, Search, TrendingUp, Clock, Tag, CreditCard, Package, MapPin, User, Plus, Minus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Header Component
export const Header = () => {
  const { getCartItemsCount, currentView, setCurrentView } = useShop();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentView('shop')}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
           <Link to="/">
            <h1 className="text-3xl font-bold text-black cursor-pointer">LASO</h1>
            </Link>
            <span className="text-gray-500 capitalize">{currentView}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView('cart')}
              className="relative p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <ShoppingCart size={24} />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </button>
            <button
              onClick={() => setCurrentView('orders')}
              className="p-2 text-gray-600 hover:text-red-600 transition-colors"
            >
              <Package size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
