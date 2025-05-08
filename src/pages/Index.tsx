
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { categories, getFeaturedProducts, getNewArrivals, getDiscountedProducts } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();
  const discountedProducts = getDiscountedProducts();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-accent py-16">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Discover Quality Products for Every Need
            </h1>
            <p className="text-white/90 text-lg mb-8">
              Shop the latest trends, discover amazing deals, and experience exceptional service.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/products" 
                className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Shop Now
              </Link>
              <Link 
                to="/categories" 
                className="bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-md font-medium transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Shop by Category</h2>
            <p className="text-gray-600">Find your perfect product in our carefully curated categories</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                to={`/categories/${category.id}`}
                key={category.id}
                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  <p className="text-white/80 text-sm mt-1 mb-2">{category.description}</p>
                  <span className="inline-flex items-center text-white/90 text-sm">
                    Shop Now <ArrowRight className="ml-1 w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <ProductGrid 
        products={featuredProducts} 
        heading="Featured Products" 
        subheading="Handpicked favorites for an exceptional shopping experience"
      />
      
      {/* Sale Banner */}
      <section className="bg-secondary/10 py-12">
        <div className="container-custom">
          <div className="bg-secondary rounded-lg shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-white text-3xl font-bold mb-3">Summer Sale</h3>
                <p className="text-white/85 text-lg mb-4">Get up to 50% off on selected items</p>
                <Link 
                  to="/products" 
                  className="inline-flex items-center bg-white text-secondary px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  Shop the Sale <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
              <div className="text-white text-5xl md:text-7xl font-bold">50% OFF</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* New Arrivals Section */}
      <ProductGrid 
        products={newArrivals} 
        heading="New Arrivals" 
        subheading="Be the first to shop our latest products"
      />
      
      {/* Special Offers Section */}
      <ProductGrid 
        products={discountedProducts} 
        heading="Special Offers" 
        subheading="Limited-time deals you don't want to miss"
      />
      
      {/* Newsletter Section */}
      <section className="bg-gray-50 py-14">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Join Our Newsletter</h3>
            <p className="text-gray-600 mb-6">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
              <button 
                type="submit" 
                className="btn-primary whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
