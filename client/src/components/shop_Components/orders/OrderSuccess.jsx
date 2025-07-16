import { useShop } from "../../../context/ShopContext";
import { ArrowLeft, ShoppingCart, Heart, Star, Search, TrendingUp, Clock, Tag, CreditCard, Package, MapPin, User, Plus, Minus, X } from 'lucide-react';
// Order Success Component
export const OrderSuccess = () => {
  const { setCurrentView } = useShop();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto text-center">
        <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Package size={32} className="text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">Order Placed Successfully!</h2>
        <p className="text-gray-600 mb-8">
          Thank you for your order. You will receive an email confirmation shortly.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => setCurrentView('orders')}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            View Orders
          </button>
          <button
            onClick={() => setCurrentView('shop')}
            className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
