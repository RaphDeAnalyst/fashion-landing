import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ProductModal = ({ product, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return null;

  // Initialize selected color and size
  if (selectedColor === null && product.colors && product.colors.length > 0) {
    setSelectedColor(product.colors.find(c => c.available) || product.colors[0]);
  }

  const handleInquiry = () => {
    const message = `Hi! I'm interested in the ${product.name} (${product.sku}). Could you provide more information about pricing and availability?`;
    const whatsappUrl = `https://wa.me/2348080717441?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailInquiry = () => {
    const subject = `Inquiry about ${product.name}`;
    const body = `Hi,\n\nI'm interested in the ${product.name} (SKU: ${product.sku}).\n\nCould you please provide more information about:\n- Availability\n- Sizing\n- Customization options\n- Delivery details\n\nThank you!`;
    const mailtoUrl = `mailto:matthewraphael@matthewraphael.xyz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="relative h-96 md:h-full min-h-[400px]">
                  <img
                    src={product.images?.[selectedImageIndex] || product.mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {!product.inStock && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </div>
                  )}
                  
                  {product.originalPrice && product.originalPrice !== product.price && (
                    <div className="absolute top-4 left-20 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Sale
                    </div>
                  )}
                </div>

                {/* Image Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="flex space-x-2 p-4 bg-gray-50">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImageIndex === index ? 'border-gray-900' : 'border-gray-200'
                        }`}
                      >
                        <img src={image} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details Section */}
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900">
                      {product.name}
                    </h2>
                    {product.featured && (
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="font-semibold text-2xl text-gray-900">
                      {product.price}
                    </span>
                    {product.originalPrice && product.originalPrice !== product.price && (
                      <span className="text-lg text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-base leading-relaxed mb-4">
                    {product.detailedDescription || product.description}
                  </p>
                  
                  <div className="text-sm text-gray-500 mb-6">
                    <span>SKU: {product.sku}</span>
                  </div>
                </div>

                {/* Color Selection */}
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">
                      Color: {selectedColor?.name}
                    </h4>
                    <div className="flex space-x-3">
                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedColor(color)}
                          disabled={!color.available}
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedColor?.hex === color.hex ? 'border-gray-900' : 'border-gray-300'
                          } ${!color.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-3">Size</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                            selectedSize === size
                              ? 'border-gray-900 bg-gray-900 text-white'
                              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Materials */}
                {product.materials && product.materials.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Materials</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {product.materials.map((material, index) => (
                        <li key={index}>• {material}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Care Instructions */}
                {product.careInstructions && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Care Instructions</h4>
                    <p className="text-sm text-gray-600">{product.careInstructions}</p>
                  </div>
                )}

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleInquiry}
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors font-medium"
                  >
                    Inquire via WhatsApp
                  </button>
                  <button
                    onClick={handleEmailInquiry}
                    className="w-full border-2 border-gray-900 text-gray-900 py-3 px-6 rounded-full hover:bg-gray-900 hover:text-white transition-colors font-medium"
                  >
                    Email Inquiry
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Category:</span>
                      <span className="ml-1 capitalize">{product.category}</span>
                    </div>
                    <div>
                      <span className="font-medium">Availability:</span>
                      <span className={`ml-1 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;