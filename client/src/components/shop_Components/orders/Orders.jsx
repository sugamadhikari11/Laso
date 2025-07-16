import { useShop } from "../../../context/ShopContext";
import { ArrowLeft, ShoppingCart, Heart, Star, Search, TrendingUp, Clock, Tag, CreditCard, Package, MapPin, User, Plus, Minus, X } from 'lucide-react';
import { PRODUCTS } from "../../../data/ProductsData";
// Orders Component
export const Orders = () => {
  const { orders } = useShop();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No orders yet</h3>
          <p className="text-gray-500">Your order history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Order History</h2>
      
      <div className="space-y-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <p className="text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${order.total.toFixed(2)}</p>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              {order.items.map(item => {
                const product = PRODUCTS.find(p => p.id === item.id);
                return product ? (
                  <div key={item.id} className="flex items-center space-x-4 py-2">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity} × ${product.price}</p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};