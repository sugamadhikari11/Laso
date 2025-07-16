import { useShop } from "../../../context/ShopContext";
import { ArrowLeft, ShoppingCart, Heart, Star, Search, TrendingUp, Clock, Tag, CreditCard, Package, MapPin, User, Plus, Minus, X } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { addToCart, toggleFavorite, favorites } = useShop();

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">NEW</span>
          )}
          {product.isTrending && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded">TRENDING</span>
          )}
          {product.isDiscounted && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">SALE</span>
          )}
        </div>

        <button
          onClick={() => toggleFavorite(product.id)}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            favorites.includes(product.id) 
              ? 'bg-red-600 text-white' 
              : 'bg-white text-gray-600 hover:text-red-600'
          }`}
        >
          <Heart size={16} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{product.description}</p>
        
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={12} 
                className={`${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-black">${product.price}</span>
            {product.isDiscounted && (
              <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
          <span className="text-sm text-gray-500">{product.stock} left</span>
        </div>

        <button
          onClick={() => addToCart(product.id)}
          disabled={product.stock === 0}
          className={`w-full py-2 rounded-lg font-medium transition-colors ${
            product.stock === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-black text-white hover:bg-red-600'
          }`}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};