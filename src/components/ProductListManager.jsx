import { useState } from 'react';
import { motion } from 'framer-motion';

const ProductListManager = ({ products, onProductUpdate, onProductDelete }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStock = filterStock === 'all' || 
                        (filterStock === 'inStock' && product.inStock) ||
                        (filterStock === 'outOfStock' && !product.inStock);
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleQuickEdit = (product, field, value) => {
    const updatedProduct = { ...product, [field]: value };
    onProductUpdate(updatedProduct);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onProductDelete(productId);
    }
  };

  const ProductRow = ({ product }) => (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-b border-gray-200 hover:bg-gray-50"
    >
      <td className="py-4 px-4">
        <div className="flex items-center space-x-3">
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <div className="font-medium text-gray-900">{product.name}</div>
            <div className="text-sm text-gray-500">{product.sku}</div>
          </div>
        </div>
      </td>
      
      <td className="py-4 px-4">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
          {product.category}
        </span>
      </td>
      
      <td className="py-4 px-4">
        <div className="text-sm font-medium text-gray-900">{product.price}</div>
        {product.originalPrice && product.originalPrice !== product.price && (
          <div className="text-sm text-gray-500 line-through">{product.originalPrice}</div>
        )}
      </td>
      
      <td className="py-4 px-4">
        <button
          onClick={() => handleQuickEdit(product, 'inStock', !product.inStock)}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.inStock
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
        </button>
      </td>
      
      <td className="py-4 px-4">
        <button
          onClick={() => handleQuickEdit(product, 'featured', !product.featured)}
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            product.featured
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {product.featured ? '⭐ Featured' : 'Regular'}
        </button>
      </td>
      
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setEditingProduct(product)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => handleDeleteProduct(product.id)}
            className="text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </td>
    </motion.tr>
  );

  const EditModal = ({ product, onClose, onSave }) => {
    const [editForm, setEditForm] = useState(product);
    const [newImages, setNewImages] = useState([]);
    const [newImagePreviews, setNewImagePreviews] = useState([]);

    const handleSave = async () => {
      try {
        // Process new images if any were added
        if (newImages.length > 0) {
          const compressedImages = await Promise.all(
            newImages.map(file => {
              return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();
                
                img.onload = () => {
                  const maxWidth = 800;
                  const maxHeight = 600;
                  let { width, height } = img;
                  
                  if (width > height) {
                    if (width > maxWidth) {
                      height = (height * maxWidth) / width;
                      width = maxWidth;
                    }
                  } else {
                    if (height > maxHeight) {
                      width = (width * maxHeight) / height;
                      height = maxHeight;
                    }
                  }
                  
                  canvas.width = width;
                  canvas.height = height;
                  ctx.drawImage(img, 0, 0, width, height);
                  
                  const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                  resolve(compressedDataUrl);
                };
                
                img.onerror = () => {
                  const reader = new FileReader();
                  reader.onload = (e) => resolve(e.target.result);
                  reader.readAsDataURL(file);
                };
                
                img.src = URL.createObjectURL(file);
              });
            })
          );
          
          // Add new images to existing ones
          const updatedImages = [...(editForm.images || []), ...compressedImages];
          const updatedForm = {
            ...editForm,
            images: updatedImages,
            mainImage: editForm.mainImage || updatedImages[0]
          };
          
          onSave(updatedForm);
        } else {
          onSave(editForm);
        }
        onClose();
      } catch (error) {
        console.error('Error processing images:', error);
        alert('Error processing images. Product saved without new images.');
        onSave(editForm);
        onClose();
      }
    };

    const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      setNewImages(prev => [...prev, ...files]);

      const previews = files.map(file => URL.createObjectURL(file));
      setNewImagePreviews(prev => [...prev, ...previews]);
    };

    const removeExistingImage = (index) => {
      const updatedImages = editForm.images.filter((_, i) => i !== index);
      setEditForm(prev => ({
        ...prev,
        images: updatedImages,
        mainImage: updatedImages.length > 0 ? updatedImages[0] : ''
      }));
    };

    const removeNewImage = (index) => {
      URL.revokeObjectURL(newImagePreviews[index]);
      setNewImages(prev => prev.filter((_, i) => i !== index));
      setNewImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const setAsMainImage = (imageUrl) => {
      setEditForm(prev => ({ ...prev, mainImage: imageUrl }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Edit Product</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="text"
                  value={editForm.price}
                  onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                <input
                  type="text"
                  value={editForm.originalPrice || ''}
                  onChange={(e) => setEditForm(prev => ({ ...prev, originalPrice: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={editForm.category}
                onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="women">Women's Fashion</option>
                <option value="men">Men's Fashion</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
              <input
                type="text"
                value={editForm.sku}
                onChange={(e) => setEditForm(prev => ({ ...prev, sku: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image Management */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
              
              {/* Existing Images */}
              {editForm.images && editForm.images.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Current Images:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {editForm.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Product image ${index + 1}`}
                          className="w-full h-24 object-cover rounded border"
                        />
                        
                        {/* Main image indicator */}
                        {editForm.mainImage === image && (
                          <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-1 py-0.5 rounded">
                            Main
                          </div>
                        )}
                        
                        {/* Action buttons */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center space-x-1">
                          <button
                            type="button"
                            onClick={() => setAsMainImage(image)}
                            className="opacity-0 group-hover:opacity-100 bg-blue-500 text-white p-1 rounded text-xs hover:bg-blue-600 transition-opacity"
                            title="Set as main image"
                          >
                            Main
                          </button>
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="opacity-0 group-hover:opacity-100 bg-red-500 text-white p-1 rounded text-xs hover:bg-red-600 transition-opacity"
                            title="Remove image"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* New Images Preview */}
              {newImagePreviews.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">New Images to Add:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {newImagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`New image ${index + 1}`}
                          className="w-full h-24 object-cover rounded border border-green-300"
                        />
                        <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                          New
                        </div>
                        <button
                          type="button"
                          onClick={() => removeNewImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs hover:bg-red-600"
                          title="Remove new image"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add Images */}
              <div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Select multiple images to add to this product
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editForm.inStock}
                  onChange={(e) => setEditForm(prev => ({ ...prev, inStock: e.target.checked }))}
                  className="mr-2"
                />
                In Stock
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editForm.featured}
                  onChange={(e) => setEditForm(prev => ({ ...prev, featured: e.target.checked }))}
                  className="mr-2"
                />
                Featured Product
              </label>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
        <p className="text-sm text-gray-500">Manage your product catalog</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="women">Women's Fashion</option>
              <option value="men">Men's Fashion</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
          
          <div>
            <select
              value={filterStock}
              onChange={(e) => setFilterStock(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Stock Status</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>

          <div className="text-sm text-gray-500 flex items-center">
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <EditModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={onProductUpdate}
        />
      )}
    </motion.div>
  );
};

export default ProductListManager;