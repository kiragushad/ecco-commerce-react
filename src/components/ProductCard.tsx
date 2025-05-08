
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types/product';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  // Calculate discounted price if applicable
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/products/${product.id}`} className="block relative">
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-secondary text-white">New</Badge>
            )}
            {product.discount && product.discount > 0 && (
              <Badge className="bg-red-500 text-white">{product.discount}% Off</Badge>
            )}
          </div>

          {/* Quick add to cart overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              className="bg-white text-primary py-2 px-4 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" /> 
              <span>Add to Cart</span>
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-medium mb-1 text-gray-800 line-clamp-1">
            {product.name}
          </h3>
          
          <div className="text-sm text-gray-500 mb-2">
            {product.brand}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              {discountedPrice ? (
                <>
                  <span className="text-lg font-semibold text-primary">${discountedPrice.toFixed(2)}</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                </>
              ) : (
                <span className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Star rating */}
            <div className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
