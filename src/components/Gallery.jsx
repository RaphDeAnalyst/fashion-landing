import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import LookbookModal from './LookbookModal';
import ProductModal from './ProductModal';
import { getAllGalleryImages } from '../data/gallery';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  // Load gallery images on component mount
  useEffect(() => {
    const loadGalleryImages = () => {
      const images = getAllGalleryImages();
      setGalleryImages(images.sort((a, b) => a.order - b.order));
    };

    loadGalleryImages();

    // Listen for gallery updates
    const handleGalleryUpdate = () => {
      loadGalleryImages();
    };

    window.addEventListener('galleryUpdated', handleGalleryUpdate);

    return () => {
      window.removeEventListener('galleryUpdated', handleGalleryUpdate);
    };
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Gallery & Lookbook
          </h2>
          <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our complete collections through carefully curated lifestyle photography 
            that captures the essence of modern elegance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`relative group cursor-pointer overflow-hidden rounded-lg ${
                index % 7 === 0 || index % 7 === 3 ? 'lg:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
                  index % 7 === 0 || index % 7 === 3 ? 'h-96 lg:h-full' : 'h-48 lg:h-64'
                }`}
              />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="font-serif text-lg font-semibold mb-2">{image.title}</h3>
                  <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                
                <div className="text-center mt-4 text-white">
                  <h3 className="font-serif text-xl font-semibold">{selectedImage.title}</h3>
                  <p className="font-sans text-gray-300 mt-2">{selectedImage.alt}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => setIsLookbookOpen(true)}
            className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300"
          >
            View Full Lookbook
          </button>
        </motion.div>
      </div>

      {/* Lookbook Modal */}
      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        onProductSelect={handleProductSelect}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
      />
    </section>
  );
};

export default Gallery;