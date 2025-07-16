// Cart Component
import { useShop } from "../../../context/ShopContext";
import { ArrowLeft, ShoppingCart, Heart, Star, Search, TrendingUp, Clock, Tag, CreditCard, Package, MapPin, User, Plus, Minus, X } from 'lucide-react';
import { PRODUCTS } from "../../../data/ProductsData";
export const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, getCartTotal, setCurrentView } = useShop();

  const cartItems = cart.map(item => ({
    ...item,
    product: PRODUCTS.find(p => p.id === item.id)
  })).filter(item => item.product);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
          <p className="text-gray-500 mb-4">Add some products to get started</p>
          <button
            onClick={() => setCurrentView('shop')}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
        
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
              <img 
                src={item.product.image} 
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.product.name}</h3>
                <p className="text-gray-600">${item.product.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3 py-1 bg-gray-100 rounded">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="text-right">
                <p className="font-semibold">${(item.product.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Total: ${getCartTotal().toFixed(2)}</span>
            <button
              onClick={() => setCurrentView('checkout')}
              className="bg-black text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <CreditCard size={20} />
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};