
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { FilterOptions, Product } from '@/types/product';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get all unique brands
  const allBrands = Array.from(new Set(products.map(product => product.brand)));

  // Effect to initialize filters from URL
  useEffect(() => {
    const category = searchParams.get('category');
    const sort = searchParams.get('sort');
    const brands = searchParams.getAll('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const newFilterOptions: FilterOptions = {};

    if (category) {
      newFilterOptions.category = category;
      setSelectedCategory(category);
    }

    if (sort) {
      newFilterOptions.sortBy = sort as FilterOptions['sortBy'];
      setSortBy(sort);
    }

    if (brands.length > 0) {
      setSelectedBrands(brands);
    }

    if (minPrice || maxPrice) {
      const min = minPrice ? parseInt(minPrice) : 0;
      const max = maxPrice ? parseInt(maxPrice) : 2000;
      setPriceRange([min, max]);
      newFilterOptions.priceRange = [min, max];
    }

    setFilterOptions(newFilterOptions);
  }, [searchParams]);

  // Effect to apply filters and update products
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (filterOptions.category) {
      filtered = filtered.filter(p => p.category === filterOptions.category);
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    // Apply price filter
    if (filterOptions.priceRange) {
      const [min, max] = filterOptions.priceRange;
      filtered = filtered.filter(p => {
        const finalPrice = p.discount 
          ? p.price * (1 - p.discount / 100) 
          : p.price;
        return finalPrice >= min && finalPrice <= max;
      });
    }

    // Apply sorting
    if (filterOptions.sortBy) {
      switch (filterOptions.sortBy) {
        case 'price-low-high':
          filtered.sort((a, b) => {
            const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
            const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
            return priceA - priceB;
          });
          break;
        case 'price-high-low':
          filtered.sort((a, b) => {
            const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
            const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
            return priceB - priceA;
          });
          break;
        case 'newest':
          filtered.sort((a, b) => a.isNew ? -1 : b.isNew ? 1 : 0);
          break;
        case 'popular':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    setDisplayProducts(filtered);
  }, [filterOptions, selectedBrands]);

  // Apply filters
  const applyFilters = () => {
    const newFilters: FilterOptions = {};
    
    if (selectedCategory) {
      newFilters.category = selectedCategory;
    }
    
    if (priceRange[0] > 0 || priceRange[1] < 2000) {
      newFilters.priceRange = priceRange;
    }
    
    if (sortBy) {
      newFilters.sortBy = sortBy as FilterOptions['sortBy'];
    }

    // Update URL params
    const params = new URLSearchParams();
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    if (sortBy) {
      params.set('sort', sortBy);
    }
    
    selectedBrands.forEach(brand => {
      params.append('brand', brand);
    });
    
    if (priceRange[0] > 0) {
      params.set('minPrice', priceRange[0].toString());
    }
    
    if (priceRange[1] < 2000) {
      params.set('maxPrice', priceRange[1].toString());
    }
    
    setSearchParams(params);
    setFilterOptions(newFilters);
    setIsFilterOpen(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedBrands([]);
    setPriceRange([0, 2000]);
    setSortBy("newest");
    setSearchParams({});
    setFilterOptions({});
  };

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Page Header */}
      <div className="bg-gray-100 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold">Products</h1>
          <div className="flex items-center text-sm mt-2 text-gray-600">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-primary">Products</span>
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Toggle */}
      <div className="md:hidden sticky top-16 z-40 bg-white shadow-sm">
        <div className="container-custom py-3">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md bg-white"
          >
            <span className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filters & Sort
            </span>
            {isFilterOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      <div className="flex-grow bg-white">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div 
              className={`md:w-64 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden'} md:block bg-white md:bg-transparent md:shadow-none shadow-lg md:static fixed inset-0 z-40 overflow-auto`}
            >
              <div className="md:hidden sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold">Filters</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-4 md:p-0">
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    <div 
                      className={`cursor-pointer p-2 rounded-md ${selectedCategory === "" ? "bg-gray-100" : "hover:bg-gray-50"}`}
                      onClick={() => setSelectedCategory("")}
                    >
                      All Products
                    </div>
                    {categories.map((category) => (
                      <div 
                        key={category.id}
                        className={`cursor-pointer p-2 rounded-md ${selectedCategory === category.id ? "bg-gray-100" : "hover:bg-gray-50"}`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Price Range</h3>
                  <div className="px-2">
                    <div className="flex justify-between mb-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Brands</h3>
                  <div className="space-y-2">
                    {allBrands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`brand-${brand}`}
                          className="mr-2"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                        />
                        <label htmlFor={`brand-${brand}`} className="cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Sort By</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="popular">Popularity</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-2 md:hidden">
                  <button
                    onClick={applyFilters}
                    className="btn-primary"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={resetFilters}
                    className="btn-secondary"
                  >
                    Reset Filters
                  </button>
                </div>
                
                <div className="mt-8 hidden md:block">
                  <button
                    onClick={applyFilters}
                    className="btn-primary mb-2 w-full"
                  >
                    Apply Filters
                  </button>
                  <button
                    onClick={resetFilters}
                    className="btn-secondary w-full"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="flex-grow">
              {/* Results info & sort (desktop) */}
              <div className="hidden md:flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Showing <span className="font-medium">{displayProducts.length}</span> products
                </p>
                <div className="flex items-center">
                  <span className="mr-2">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                      applyFilters();
                    }}
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="popular">Popularity</option>
                  </select>
                </div>
              </div>
              
              {/* Applied Filters */}
              {(selectedCategory || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < 2000) && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {selectedCategory && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      Category: {categories.find(c => c.id === selectedCategory)?.name}
                      <button
                        onClick={() => {
                          setSelectedCategory("");
                          applyFilters();
                        }}
                        className="ml-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  {selectedBrands.map(brand => (
                    <div key={brand} className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      {brand}
                      <button
                        onClick={() => {
                          toggleBrand(brand);
                          applyFilters();
                        }}
                        className="ml-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  
                  {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center">
                      ${priceRange[0]} - ${priceRange[1]}
                      <button
                        onClick={() => {
                          setPriceRange([0, 2000]);
                          applyFilters();
                        }}
                        className="ml-2"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  
                  <button
                    onClick={resetFilters}
                    className="text-secondary text-sm hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              )}
              
              {/* Products */}
              {displayProducts.length === 0 ? (
                <div className="py-20 text-center">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
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

export default Products;
