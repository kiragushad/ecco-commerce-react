
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import { getProductsByCategory, categories } from '@/data/products';
import { Category, Product } from '@/types/product';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      const foundCategory = categories.find(c => c.id === id);
      if (foundCategory) {
        setCategory(foundCategory);
        const categoryProducts = getProductsByCategory(id);
        setProducts(categoryProducts);
      }
    }
  }, [id]);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Category not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Category Hero */}
      <div 
        className="relative h-64 bg-cover bg-center"
        style={{
          backgroundImage: `url(${category.image})`
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold text-white mb-2">{category.name}</h1>
            <p className="text-white/90 max-w-xl mx-auto">{category.description}</p>
          </div>
        </div>
      </div>
      
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container-custom">
          <nav className="text-sm flex items-center space-x-2">
            <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
            <span className="text-gray-500">/</span>
            <Link to="/categories" className="text-gray-500 hover:text-primary">Categories</Link>
            <span className="text-gray-500">/</span>
            <span className="text-primary">{category.name}</span>
          </nav>
        </div>
      </div>
      
      {products.length > 0 ? (
        <ProductGrid 
          products={products}
          heading={`${category.name} Products`}
          subheading={`Browse our collection of ${category.name.toLowerCase()} products`}
        />
      ) : (
        <div className="container-custom py-16 text-center">
          <h2 className="text-2xl font-medium mb-2">No products found</h2>
          <p className="text-gray-600 mb-8">
            We're currently updating our {category.name.toLowerCase()} collection.
            Please check back soon for new products!
          </p>
          <Link to="/products" className="btn-primary inline-block">
            Browse All Products
          </Link>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
