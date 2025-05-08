
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/sonner';

enum CheckoutStep {
  SHIPPING = 'shipping',
  PAYMENT = 'payment',
  REVIEW = 'review',
  CONFIRMATION = 'confirmation'
}

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.SHIPPING);
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems, getCartTotal, clearCart } = useCart();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    email: '',
    phone: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  // Calculate order summary
  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate shipping info
    const requiredFields = ['firstName', 'lastName', 'address', 'city', 'postalCode', 'country', 'email'];
    const missingFields = requiredFields.filter(field => !shippingInfo[field as keyof typeof shippingInfo]);
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setCurrentStep(CheckoutStep.PAYMENT);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'credit-card') {
      const requiredFields = ['cardNumber', 'cardName', 'expiry', 'cvv'];
      const missingFields = requiredFields.filter(field => !cardInfo[field as keyof typeof cardInfo]);
      
      if (missingFields.length > 0) {
        toast.error('Please fill in all card information');
        return;
      }
    }
    
    setCurrentStep(CheckoutStep.REVIEW);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setCurrentStep(CheckoutStep.CONFIRMATION);
      toast.success('Your order has been placed successfully!');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gray-100 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div className="flex items-center text-sm mt-2 text-gray-600">
            <span>Home</span>
            <span className="mx-2">/</span>
            <Link to="/cart" className="text-gray-600 hover:text-primary">Cart</Link>
            <span className="mx-2">/</span>
            <span className="text-primary">Checkout</span>
          </div>
        </div>
      </div>
      
      <div className="flex-grow bg-white">
        <div className="container-custom py-8">
          {/* Steps Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {/* Step 1: Shipping */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep === CheckoutStep.SHIPPING ? 'bg-secondary text-white' : 
                    currentStep === CheckoutStep.PAYMENT || currentStep === CheckoutStep.REVIEW || currentStep === CheckoutStep.CONFIRMATION ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  1
                </div>
                <span className="text-sm">Shipping</span>
              </div>
              
              {/* Line */}
              <div className="flex-grow mx-2 h-0.5 bg-gray-200"></div>
              
              {/* Step 2: Payment */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep === CheckoutStep.PAYMENT ? 'bg-secondary text-white' : 
                    currentStep === CheckoutStep.REVIEW || currentStep === CheckoutStep.CONFIRMATION ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  2
                </div>
                <span className="text-sm">Payment</span>
              </div>
              
              {/* Line */}
              <div className="flex-grow mx-2 h-0.5 bg-gray-200"></div>
              
              {/* Step 3: Review */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep === CheckoutStep.REVIEW ? 'bg-secondary text-white' : 
                    currentStep === CheckoutStep.CONFIRMATION ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  3
                </div>
                <span className="text-sm">Review</span>
              </div>
              
              {/* Line */}
              <div className="flex-grow mx-2 h-0.5 bg-gray-200"></div>
              
              {/* Step 4: Confirmation */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep === CheckoutStep.CONFIRMATION ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  4
                </div>
                <span className="text-sm">Confirmation</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Shipping Form */}
              {currentStep === CheckoutStep.SHIPPING && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                  
                  <form onSubmit={handleShippingSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="firstName" className="block text-gray-700 mb-1">First Name *</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-gray-700 mb-1">Last Name *</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label htmlFor="address" className="block text-gray-700 mb-1">Address *</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-gray-700 mb-1">City *</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-gray-700 mb-1">State/Province</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={shippingInfo.state}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-gray-700 mb-1">Postal Code *</label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={shippingInfo.postalCode}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-gray-700 mb-1">Country *</label>
                        <select
                          id="country"
                          name="country"
                          value={shippingInfo.country}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                          required
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingInfoChange}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Link
                        to="/cart"
                        className="btn-secondary"
                      >
                        Back to Cart
                      </Link>
                      <button
                        type="submit"
                        className="btn-primary"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Payment Form */}
              {currentStep === CheckoutStep.PAYMENT && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                  
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-6">
                      <div className="flex items-center mb-4">
                        <input
                          type="radio"
                          id="credit-card"
                          name="paymentMethod"
                          value="credit-card"
                          checked={paymentMethod === 'credit-card'}
                          onChange={() => setPaymentMethod('credit-card')}
                          className="mr-2"
                        />
                        <label htmlFor="credit-card">Credit Card</label>
                      </div>
                      
                      {paymentMethod === 'credit-card' && (
                        <div className="pl-6 space-y-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-gray-700 mb-1">Card Number *</label>
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={cardInfo.cardNumber}
                              onChange={handleCardInfoChange}
                              placeholder="1234 5678 9012 3456"
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="cardName" className="block text-gray-700 mb-1">Name on Card *</label>
                            <input
                              type="text"
                              id="cardName"
                              name="cardName"
                              value={cardInfo.cardName}
                              onChange={handleCardInfoChange}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiry" className="block text-gray-700 mb-1">Expiry Date *</label>
                              <input
                                type="text"
                                id="expiry"
                                name="expiry"
                                value={cardInfo.expiry}
                                onChange={handleCardInfoChange}
                                placeholder="MM/YY"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="cvv" className="block text-gray-700 mb-1">CVV *</label>
                              <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={cardInfo.cvv}
                                onChange={handleCardInfoChange}
                                placeholder="123"
                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center mt-4">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                          className="mr-2"
                        />
                        <label htmlFor="paypal">PayPal</label>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(CheckoutStep.SHIPPING)}
                        className="btn-secondary"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                      >
                        Continue to Review
                      </button>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Order Review */}
              {currentStep === CheckoutStep.REVIEW && (
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
                  
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-3">Shipping Information</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                      <p>{shippingInfo.address}</p>
                      <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}</p>
                      <p>{shippingInfo.country}</p>
                      <p className="mt-2">Email: {shippingInfo.email}</p>
                      {shippingInfo.phone && <p>Phone: {shippingInfo.phone}</p>}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-3">Payment Method</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      {paymentMethod === 'credit-card' ? (
                        <p>Credit Card ending in {cardInfo.cardNumber.slice(-4)}</p>
                      ) : (
                        <p>PayPal</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="font-semibold text-lg mb-3">Order Items</h3>
                    <div className="border rounded-md overflow-hidden">
                      {cartItems.map((item) => {
                        const productPrice = item.product.discount 
                          ? item.product.price * (1 - item.product.discount / 100) 
                          : item.product.price;
                        
                        return (
                          <div key={item.product.id} className="flex items-center p-4 border-b last:border-b-0">
                            <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4 flex-grow">
                              <h4 className="font-medium">{item.product.name}</h4>
                              <p className="text-gray-500 text-sm">{item.product.brand}</p>
                              <div className="flex justify-between mt-1">
                                <span className="text-sm">Qty: {item.quantity}</span>
                                <span className="font-medium">${(productPrice * item.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep(CheckoutStep.PAYMENT)}
                      className="btn-secondary"
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="btn-primary"
                    >
                      {isProcessing ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}
              
              {/* Confirmation */}
              {currentStep === CheckoutStep.CONFIRMATION && (
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2">Thank You for Your Order!</h2>
                  <p className="text-gray-600 mb-6">
                    Your order has been placed and will be processed soon.
                    We've sent an order confirmation to {shippingInfo.email}.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-md mb-6 text-left">
                    <p className="font-medium mb-2">Order Number: <span className="font-bold">ECO-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</span></p>
                    <p className="text-gray-600">Estimated delivery: 3-5 business days</p>
                  </div>
                  
                  <div className="flex justify-center">
                    <Link to="/" className="btn-primary">
                      Continue Shopping
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              {currentStep !== CheckoutStep.CONFIRMATION && (
                <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
                  <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                  
                  <div className="max-h-64 overflow-y-auto mb-6">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="flex items-start py-3 border-b last:border-b-0">
                        <div className="w-12 h-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3 flex-grow">
                          <h4 className="text-sm font-medium">{item.product.name}</h4>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                            <span className="text-sm font-medium">
                              ${(item.product.discount 
                                ? item.product.price * (1 - item.product.discount / 100) 
                                : item.product.price) * item.quantity
                                  .toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span>${shipping.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-xl">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout;
