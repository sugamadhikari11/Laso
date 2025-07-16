import { useShop } from "../../../context/ShopContext";
import { ArrowLeft, ShoppingCart, Heart, Star, Search, TrendingUp, Clock, Tag, CreditCard, Package, MapPin, User, Plus, Minus, X } from 'lucide-react';

// Navigation Component
export const Navigation = () => {
  const { currentView, setCurrentView } = useShop();

  const navItems = [
    { id: 'shop', label: 'All Products', icon: null },
    { id: 'new-arrivals', label: 'New Arrivals', icon: Clock },
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'discounted', label: 'On Sale', icon: Tag }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                  currentView === item.id
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-600 hover:text-red-600'
                }`}
              >
                {Icon && <Icon size={16} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
