
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
  // Calculate subtotal, shipping, and total
  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? (subtotal > 100 ? 0 : 10) : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gray-100 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <div className="flex items-center text-sm mt-2 text-gray-600">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-primary">Cart</span>
          </div>
        </div>
      </div>
      
      <div className="flex-grow bg-white">
        <div className="container-custom py-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/products" className="btn-primary inline-flex items-center">
                Browse Products <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="hidden md:flex bg-gray-50 px-6 py-3">
                    <div className="w-1/2">
                      <h3 className="font-semibold">Product</h3>
                    </div>
                    <div className="w-1/6 text-center">
                      <h3 className="font-semibold">Price</h3>
                    </div>
                    <div className="w-1/6 text-center">
                      <h3 className="font-semibold">Quantity</h3>
                    </div>
                    <div className="w-1/6 text-right">
                      <h3 className="font-semibold">Total</h3>
                    </div>
                  </div>
                  
                  {cartItems.map((item) => {
                    const productPrice = item.product.discount 
                      ? item.product.price * (1 - item.product.discount / 100) 
                      : item.product.price;
                    
                    return (
                      <div key={item.product.id} className="border-b last:border-b-0 px-4 py-4 md:px-6 md:py-6">
                        <div className="flex flex-col md:flex-row md:items-center">
                          {/* Product Info (Mobile Layout) */}
                          <div className="md:hidden flex flex-col mb-4">
                            <div className="flex">
                              <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-grow">
                                <Link 
                                  to={`/products/${item.product.id}`} 
                                  className="text-lg font-medium text-gray-900 hover:text-secondary"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="text-gray-500 text-sm">{item.product.brand}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center">
                                <span className="font-semibold mr-2">Price:</span>
                                <span>${productPrice.toFixed(2)}</span>
                              </div>
                              <div>
                                <button 
                                  onClick={() => removeFromCart(item.product.id)}
                                  className="text-red-500 hover:text-red-700"
                                  aria-label="Remove item"
                                >
                                  <Trash2 className="w-5 h-5" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="px-2 py-1 text-gray-500 hover:text-primary disabled:opacity-50"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-10 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.product.countInStock}
                                  className="px-2 py-1 text-gray-500 hover:text-primary disabled:opacity-50"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                              <div>
                                <span className="font-semibold">${(productPrice * item.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Product Info (Desktop Layout) */}
                          <div className="hidden md:flex md:w-1/2 items-center">
                            <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <Link 
                                to={`/products/${item.product.id}`} 
                                className="text-lg font-medium text-gray-900 hover:text-secondary"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-gray-500 text-sm">{item.product.brand}</p>
                              <button 
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-red-500 hover:text-red-700 text-sm flex items-center mt-1"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                          
                          {/* Price (Desktop) */}
                          <div className="hidden md:block w-1/6 text-center">
                            <span>${productPrice.toFixed(2)}</span>
                          </div>
                          
                          {/* Quantity (Desktop) */}
                          <div className="hidden md:flex w-1/6 justify-center">
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="px-2 py-1 text-gray-500 hover:text-primary disabled:opacity-50"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.countInStock}
                                className="px-2 py-1 text-gray-500 hover:text-primary disabled:opacity-50"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Total (Desktop) */}
                          <div className="hidden md:block w-1/6 text-right font-semibold">
                            ${(productPrice * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6">
                  <Link to="/products" className="text-secondary hover:underline flex items-center">
                    <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      {shipping === 0 ? (
                        <span className="font-medium text-green-600">Free</span>
                      ) : (
                        <span className="font-medium">${shipping.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-xl">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {shipping > 0 && (
                    <Alert className="bg-blue-50 border-blue-100 mb-4">
                      <AlertDescription className="text-blue-800 text-sm">
                        Spend ${(100 - subtotal).toFixed(2)} more to qualify for free shipping!
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <Link 
                    to="/checkout"
                    className="w-full btn-primary block text-center font-medium"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
