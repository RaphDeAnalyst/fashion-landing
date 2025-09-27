import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { getFeaturedProducts, getProductsByCategory, categories, getAllProducts } from '../data/products';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

const FeaturedCollection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const filteredCollections = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="featured-collection" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Collection
          </h2>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium pieces, 
            each designed to elevate your personal style.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => window.location.hash = '#collection'}
            className="bg-gray-900 text-white font-semibold px-8 py-4 rounded-full hover:bg-gray-800 transition-colors duration-300 text-lg inline-block"
          >
            View All Collection
          </button>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default FeaturedCollection;