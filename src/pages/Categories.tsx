
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const Categories = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gray-100 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold">Categories</h1>
          <div className="flex items-center text-sm mt-2 text-gray-600">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-primary">Categories</span>
          </div>
        </div>
      </div>
      
      <div className="flex-grow bg-white py-12">
        <div className="container-custom">
          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={`/categories/${category.id}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                    <p className="text-white/90 mb-4">{category.description}</p>
                    <div className="inline-flex items-center text-white group-hover:text-secondary-light transition-colors">
                      Browse Products <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Featured Categories Section */}
          <div className="mt-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-2">Shop by Collection</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our specially curated collections that bring together the best products across multiple categories.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Summer Collection */}
              <div className="relative rounded-lg overflow-hidden h-80">
                <img 
                  src="https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&w=800&h=600&q=80" 
                  alt="Summer Collection" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Summer Collection</h3>
                  <p className="text-white/90 mb-4">Stay cool and stylish with our summer essentials</p>
                  <Link 
                    to="/collections/summer" 
                    className="inline-flex items-center text-white hover:text-secondary-light transition-colors"
                  >
                    Shop Collection <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
              
              {/* Tech Essentials */}
              <div className="relative rounded-lg overflow-hidden h-80">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&h=600&q=80" 
                  alt="Tech Essentials" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Tech Essentials</h3>
                  <p className="text-white/90 mb-4">Modern devices for your everyday needs</p>
                  <Link 
                    to="/collections/tech" 
                    className="inline-flex items-center text-white hover:text-secondary-light transition-colors"
                  >
                    Shop Collection <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Categories;
