
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MinusCircle, PlusCircle, ShoppingCart, Heart, Share2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProductById, getProductsByCategory } from '@/data/products';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import ProductGrid from '@/components/ProductGrid';
import { toast } from '@/components/ui/sonner';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isWishListed, setIsWishListed] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        // Reset quantity when product changes
        setQuantity(1);
        
        // Get related products (same category, excluding current product)
        const related = getProductsByCategory(foundProduct.category)
          .filter(p => p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
  }, [id]);

  const incrementQuantity = () => {
    if (product && quantity < product.countInStock) {
      setQuantity(quantity + 1);
    } else {
      toast.error("Maximum available stock reached");
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const toggleWishList = () => {
    setIsWishListed(!isWishListed);
    if (!isWishListed) {
      toast.success("Added to wishlist");
    } else {
      toast.info("Removed from wishlist");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      })
      .catch((err) => console.error("Couldn't share:", err));
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container-custom">
          <nav className="text-sm flex items-center space-x-2">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="text-gray-500">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
            <span className="text-gray-500">/</span>
            <span className="text-primary">{product.name}</span>
          </nav>
        </div>
      </div>
      
      {/* Product Details */}
      <section className="py-10">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-${i < Math.floor(product.rating) ? 'yellow-400' : 'gray-300'}`}>★</span>
                  ))}
                  <span className="ml-1 text-gray-500">{product.rating} ({product.numReviews} reviews)</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">Brand: {product.brand}</span>
              </div>
              
              <div className="mb-6">
                {discountedPrice ? (
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-primary">${discountedPrice.toFixed(2)}</span>
                    <span className="text-xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                      {product.discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="mb-6">
                <p className="mb-2">
                  <span className="font-semibold">Availability:</span>
                  <span className={`ml-2 ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.countInStock > 0 ? `In Stock (${product.countInStock} items)` : 'Out of Stock'}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Category:</span>
                  <span className="ml-2 text-gray-700">{product.category}</span>
                </p>
              </div>
              
              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Quantity</label>
                <div className="flex items-center">
                  <button 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="text-gray-500 hover:text-primary disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    <MinusCircle className="w-5 h-5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.countInStock}
                    value={quantity}
                    readOnly
                    className="w-16 mx-2 text-center border border-gray-300 rounded-md p-2"
                  />
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.countInStock}
                    className="text-gray-500 hover:text-primary disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    <PlusCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={product.countInStock <= 0}
                  className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={toggleWishList}
                    className={`p-3 border ${isWishListed ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-300 text-gray-500 hover:bg-gray-50'} rounded-md transition-colors`}
                    aria-label="Add to wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishListed ? 'fill-red-500' : ''}`} />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-3 border border-gray-300 text-gray-500 hover:bg-gray-50 rounded-md transition-colors"
                    aria-label="Share product"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Product Details Tabs - simplified for now */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <div className="border-b border-gray-200 mb-6">
              <button className="text-primary border-b-2 border-primary py-2 px-4 font-semibold">
                Description
              </button>
            </div>
            
            <div className="prose max-w-none">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur, nisi vel malesuada euismod, 
                nulla sapien lobortis mauris, at consectetur libero mauris vel nulla. Cras varius felis non massa 
                condimentum efficitur. Phasellus ac velit vitae sem aliquet elementum. Duis mattis sapien nec enim 
                ullamcorper, eu finibus tortor fermentum.
              </p>
              <h3>Features:</h3>
              <ul>
                <li>High-quality materials</li>
                <li>Durable construction</li>
                <li>Easy to use</li>
                <li>Modern design</li>
                <li>Satisfaction guaranteed</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <ProductGrid 
          products={relatedProducts} 
          heading="You May Also Like" 
          subheading="Discover similar products that match your taste"
        />
      )}
      
      <Footer />
    </div>
  );
};

export default ProductDetails;
