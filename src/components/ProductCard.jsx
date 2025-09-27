import { motion } from 'framer-motion';

const ProductCard = ({ product, index, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={product.mainImage}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Stock Status Badge */}
        {!product.inStock && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Out of Stock
          </div>
        )}
        
        {/* Sale Badge */}
        {product.originalPrice && product.originalPrice !== product.price && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Sale
          </div>
        )}
        
        {/* Color Options Preview */}
        {product.colors && product.colors.length > 0 && (
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {product.colors.slice(0, 3).map((color, idx) => (
              <div
                key={idx}
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              ></div>
            ))}
            {product.colors.length > 3 && (
              <div className="w-4 h-4 rounded-full border-2 border-white shadow-sm bg-gray-400 flex items-center justify-center">
                <span className="text-xs text-white font-bold">+</span>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-serif text-xl font-semibold text-gray-900 flex-1 mr-2">
            {product.name}
          </h3>
          {product.featured && (
            <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0">
              Featured
            </span>
          )}
        </div>
        
        <p className="font-sans text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        {/* Size Options Preview */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">Available Sizes:</p>
            <div className="flex flex-wrap gap-1">
              {product.sizes.slice(0, 4).map((size, idx) => (
                <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {size}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  +{product.sizes.length - 4}
                </span>
              )}
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
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
          <button 
            onClick={() => onViewDetails && onViewDetails(product)}
            className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300 text-sm font-medium"
          >
            View Details
          </button>
        </div>
        
        {/* Product Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;