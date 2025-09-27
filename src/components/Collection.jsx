import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getAllProducts, categories } from '../data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Footer from './Footer';

const Collection = ({ onBackToHome }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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
    : activeFilter === 'featured'
    ? products.filter(product => product.featured)
    : products.filter(product => product.category === activeFilter);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-4xl font-bold text-gray-900"
            >
              Complete Collection
            </motion.h1>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              onClick={onBackToHome}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300"
            >
              ← Back to Home
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-8"
          >
            <p className="font-sans text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our complete collection of premium fashion pieces, meticulously crafted
              to elevate your personal style. Each item represents our commitment to quality,
              sustainability, and timeless elegance.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {categories.map((filter, index) => (
              <div key={filter.id} className="contents">
                <button
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                    activeFilter === filter.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {filter.label}
                </button>
                {filter.id === 'all' && (
                  <button
                    onClick={() => setActiveFilter('featured')}
                    className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                      activeFilter === 'featured'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-200 border border-gray-300'
                    }`}
                  >
                    Featured
                  </button>
                )}
              </div>
            ))}
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-8"
          >
            <p className="text-gray-600">
              Showing {currentProducts.length} of {filteredProducts.length} items
              {activeFilter !== 'all' && activeFilter !== 'featured' && ` in ${categories.find(c => c.id === activeFilter)?.label}`}
              {activeFilter === 'featured' && ' in Featured'}
            </p>
          </motion.div>

          {/* Products Grid */}
          {currentProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {currentProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">
                {activeFilter === 'all'
                  ? 'No products have been added yet. Use the admin panel to add some products.'
                  : activeFilter === 'featured'
                  ? 'No featured products found. Mark some products as featured in the admin panel.'
                  : `No products found in the ${categories.find(c => c.id === activeFilter)?.label} category.`
                }
              </p>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex justify-center items-center mt-12 space-x-2"
            >
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                    currentPage === page
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                Next
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Collection;