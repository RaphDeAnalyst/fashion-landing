import { useState } from 'react';
import { motion } from 'framer-motion';

const ProductUploadForm = ({ onProductAdd, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'women',
    price: '',
    originalPrice: '',
    description: '',
    detailedDescription: '',
    materials: [''],
    careInstructions: '',
    inStock: true,
    featured: false,
    tags: [''],
    sku: '',
    colors: [{ name: '', hex: '#000000', available: true }],
    sizes: []
  });

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'women', label: "Women's Fashion" },
    { id: 'men', label: "Men's Fashion" },
    { id: 'accessories', label: 'Accessories' }
  ];

  const sizeOptions = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  // Common color names to hex mapping
  const colorNameToHex = {
    'red': '#FF0000',
    'blue': '#0000FF',
    'green': '#008000',
    'yellow': '#FFFF00',
    'orange': '#FFA500',
    'purple': '#800080',
    'pink': '#FFC0CB',
    'brown': '#A52A2A',
    'black': '#000000',
    'white': '#FFFFFF',
    'gray': '#808080',
    'grey': '#808080',
    'navy': '#000080',
    'maroon': '#800000',
    'lime': '#00FF00',
    'olive': '#808000',
    'aqua': '#00FFFF',
    'teal': '#008080',
    'silver': '#C0C0C0',
    'gold': '#FFD700',
    'beige': '#F5F5DC',
    'coral': '#FF7F50',
    'cyan': '#00FFFF',
    'indigo': '#4B0082',
    'violet': '#EE82EE',
    'magenta': '#FF00FF',
    'turquoise': '#40E0D0',
    'crimson': '#DC143C',
    'emerald': '#50C878',
    'royal blue': '#4169E1',
    'forest green': '#228B22',
    'hot pink': '#FF69B4',
    'dark blue': '#00008B',
    'light blue': '#ADD8E6',
    'dark green': '#006400',
    'light green': '#90EE90'
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInputChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayField = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field, index) => {
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleColorChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.map((color, i) => {
        if (i === index) {
          const updatedColor = { ...color, [field]: value };
          
          // If updating the name field, try to auto-update hex
          if (field === 'name') {
            const trimmedValue = value.trim();
            const lowerCaseName = trimmedValue.toLowerCase();
            
            // Check if it's a hex value (starts with # and is 4 or 7 characters)
            if (trimmedValue.startsWith('#') && (trimmedValue.length === 4 || trimmedValue.length === 7)) {
              updatedColor.hex = trimmedValue;
            }
            // Check for common color names
            else if (colorNameToHex[lowerCaseName]) {
              updatedColor.hex = colorNameToHex[lowerCaseName];
            }
          }
          
          return updatedColor;
        }
        return color;
      })
    }));
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, { name: '', hex: '#000000', available: true }]
    }));
  };

  const removeColor = (index) => {
    if (formData.colors.length > 1) {
      setFormData(prev => ({
        ...prev,
        colors: prev.colors.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSizeToggle = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => {
      // Revoke the URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e) => {
    console.log('handleSubmit function called!');
    e.preventDefault();
    console.log('preventDefault called');
    
    // Manual validation
    if (!formData.name.trim()) {
      alert('Product Name is required');
      return;
    }
    if (!formData.price.trim()) {
      alert('Price is required');
      return;
    }
    if (!formData.description.trim()) {
      alert('Short Description is required');
      return;
    }
    
    setIsSubmitting(true);
    console.log('isSubmitting set to true');

    try {
      console.log('Form submission started');
      console.log('Form data:', formData);
      console.log('Images:', images);

      // Compress and convert images to base64 for local storage
      const imageUrls = await Promise.all(
        images.map(file => {
          return new Promise((resolve) => {
            // Create a canvas to compress the image
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
              // Set max dimensions to compress large images
              const maxWidth = 800;
              const maxHeight = 600;
              let { width, height } = img;
              
              // Calculate new dimensions while maintaining aspect ratio
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
              
              // Draw and compress the image
              ctx.drawImage(img, 0, 0, width, height);
              
              // Convert to base64 with compression (0.7 quality for JPEG)
              const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
              resolve(compressedDataUrl);
            };
            
            img.onerror = () => {
              // Fallback to original file if compression fails
              const reader = new FileReader();
              reader.onload = (e) => resolve(e.target.result);
              reader.readAsDataURL(file);
            };
            
            // Create object URL for the image
            img.src = URL.createObjectURL(file);
          });
        })
      );

      // Use placeholder image if no images uploaded
      const defaultImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
      const finalImages = imageUrls.length > 0 ? imageUrls : [defaultImage];

      const newProduct = {
        ...formData,
        images: finalImages,
        mainImage: finalImages[0],
        materials: formData.materials.filter(m => m.trim()),
        tags: formData.tags.filter(t => t.trim()),
        price: formData.price.startsWith('₦') ? formData.price : `₦${formData.price}`,
        originalPrice: formData.originalPrice ? 
          (formData.originalPrice.startsWith('₦') ? formData.originalPrice : `₦${formData.originalPrice}`) : ''
      };

      console.log('New product being added:', newProduct);
      onProductAdd(newProduct);
      
      // Reset form
      setFormData({
        name: '',
        category: 'women',
        price: '',
        originalPrice: '',
        description: '',
        detailedDescription: '',
        materials: [''],
        careInstructions: '',
        inStock: true,
        featured: false,
        tags: [''],
        sku: '',
        colors: [{ name: '', hex: '#000000', available: true }],
        sizes: []
      });
      setImages([]);
      setImagePreviews([]);
      
      onSuccess();
      
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
          <p className="text-sm text-gray-500">Fill in the details to add a new product to your catalog</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6" noValidate>
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Ankara Elegance Dress"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₦) *
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="85,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Original Price (₦)
              </label>
              <input
                type="text"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="95,000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SKU
              </label>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="PF-AD-001"
              />
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description for product cards"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description
            </label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed description for product modal"
            />
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
            {formData.colors.map((color, index) => (
              <div key={index} className="flex items-center gap-4 mb-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={color.name}
                    onChange={(e) => handleColorChange(index, 'name', e.target.value)}
                    placeholder="Color name (e.g., red, blue, #FF0000)"
                    className="w-full px-3 py-2 pr-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div 
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                    title={`Color preview: ${color.hex}`}
                  ></div>
                </div>
                <input
                  type="color"
                  value={color.hex}
                  onChange={(e) => handleColorChange(index, 'hex', e.target.value)}
                  className="w-16 h-10 border border-gray-300 rounded-md cursor-pointer"
                  title="Click to choose color"
                />
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={color.available}
                    onChange={(e) => handleColorChange(index, 'available', e.target.checked)}
                    className="mr-2"
                  />
                  Available
                </label>
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addColor}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              + Add Color
            </button>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Sizes</label>
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map(size => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleSizeToggle(size)}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    formData.sizes.includes(size)
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Materials */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Materials</label>
            {formData.materials.map((material, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={material}
                  onChange={(e) => handleArrayInputChange('materials', index, e.target.value)}
                  placeholder="e.g., 100% Cotton"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('materials', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('materials')}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              + Add Material
            </button>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            {formData.tags.map((tag, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => handleArrayInputChange('tags', index, e.target.value)}
                  placeholder="e.g., elegant, traditional"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeArrayField('tags', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayField('tags')}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              + Add Tag
            </button>
          </div>

          {/* Care Instructions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Care Instructions
            </label>
            <textarea
              name="careInstructions"
              value={formData.careInstructions}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Hand wash cold, air dry"
            />
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleInputChange}
                className="mr-2"
              />
              In Stock
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="mr-2"
              />
              Featured Product
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={() => console.log('Button clicked!')}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ProductUploadForm;