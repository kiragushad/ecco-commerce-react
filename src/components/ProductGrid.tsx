
import React from 'react';
import { Product } from '@/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  heading?: string;
  subheading?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, heading, subheading }) => {
  return (
    <section className="container-custom py-10">
      {(heading || subheading) && (
        <div className="mb-8 text-center">
          {heading && <h2 className="text-3xl font-bold mb-2">{heading}</h2>}
          {subheading && <p className="text-gray-600 max-w-2xl mx-auto">{subheading}</p>}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
