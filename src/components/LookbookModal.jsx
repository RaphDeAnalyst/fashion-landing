import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getAllProducts, categories } from '../data/products';

const LookbookModal = ({ isOpen, onClose, onProductSelect }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [products, setProducts] = useState([]);

  // Load products on mount and when localStorage changes
  useEffect(() => {
    const loadProducts = () => {
      const allProducts = getAllProducts();
      setProducts(allProducts);
    };

    loadProducts();

    // Listen for localStorage changes (when admin updates products)
    const handleStorageChange = (e) => {
      if (e.key === 'peesaenth_products') {
        loadProducts();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    const handleProductUpdate = () => {
      loadProducts();
    };
    
    window.addEventListener('productsUpdated', handleProductUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('productsUpdated', handleProductUpdate);
    };
  }, []);

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  const handleProductClick = (product) => {
    onProductSelect(product);
    onClose(); // Close lookbook modal when product is selected
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
                  Complete Lookbook
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                      activeFilter === category.id
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid - Scrollable */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
                    onClick={() => handleProductClick(product)}
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden aspect-[4/5]">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Overlay on Hover */}
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {!product.inStock && (
                          <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Out of Stock
                          </span>
                        )}
                        {product.originalPrice && product.originalPrice !== product.price && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Sale
                          </span>
                        )}
                        {product.featured && (
                          <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Color Options Preview */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="absolute bottom-3 left-3 flex space-x-1">
                          {product.colors.slice(0, 3).map((color, idx) => (
                            <div
                              key={idx}
                              className="w-3 h-3 rounded-full border border-white shadow-sm"
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            ></div>
                          ))}
                          {product.colors.length > 3 && (
                            <div className="w-3 h-3 rounded-full border border-white shadow-sm bg-gray-400 flex items-center justify-center">
                              <span className="text-xs text-white font-bold" style={{ fontSize: '6px' }}>+</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-serif text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-gray-700 transition-colors">
                        {product.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-semibold text-lg text-gray-900">
                            {product.price}
                          </span>
                          {product.originalPrice && product.originalPrice !== product.price && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.originalPrice}
                            </span>
                          )}
                        </div>
                        
                        {/* Category Badge */}
                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium capitalize">
                          {product.category}
                        </span>
                      </div>

                      {/* Sizes Preview */}
                      {product.sizes && product.sizes.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-500 mb-1">Sizes:</p>
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.slice(0, 4).map((size, idx) => (
                              <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-1 py-0.5 rounded">
                                {size}
                              </span>
                            ))}
                            {product.sizes.length > 4 && (
                              <span className="text-xs bg-gray-50 text-gray-600 px-1 py-0.5 rounded">
                                +{product.sizes.length - 4}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* No Products Message */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500">Try selecting a different category.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Showing {filteredProducts.length} of {products.length} products
                </span>
                <span className="font-medium">
                  Peesaenth Fashion Collection
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LookbookModal;