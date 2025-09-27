import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductUploadForm from './ProductUploadForm';
import ProductListManager from './ProductListManager';
import GalleryUploadForm from './GalleryUploadForm';
import GalleryListManager from './GalleryListManager';

const AdminDashboard = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    outOfStock: 0,
    featured: 0,
    storageUsed: 0,
    storageMax: 5 * 1024 * 1024 // 5MB typical localStorage limit
  });

  // Load products from localStorage or use default data
  useEffect(() => {
    const savedProducts = localStorage.getItem('peesaenth_products');
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      setProducts(parsedProducts);
      updateStats(parsedProducts);
    } else {
      // Import initial products from data file
      import('../data/products').then(({ products: initialProducts }) => {
        setProducts(initialProducts);
        updateStats(initialProducts);
        localStorage.setItem('peesaenth_products', JSON.stringify(initialProducts));
      });
    }
  }, []);

  const updateStats = (productList) => {
    // Calculate storage usage
    const storageData = localStorage.getItem('peesaenth_products') || '[]';
    const storageUsed = new Blob([storageData]).size;
    const storageMax = 5 * 1024 * 1024; // 5MB
    
    setStats({
      totalProducts: productList.length,
      inStock: productList.filter(p => p.inStock).length,
      outOfStock: productList.filter(p => !p.inStock).length,
      featured: productList.filter(p => p.featured).length,
      storageUsed,
      storageMax
    });
  };

  const handleProductAdd = (newProduct) => {
    console.log('AdminDashboard: handleProductAdd called with:', newProduct);
    console.log('Current products before adding:', products);
    
    const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
    console.log('Updated products after adding:', updatedProducts);
    
    try {
      // Try to save to localStorage
      localStorage.setItem('peesaenth_products', JSON.stringify(updatedProducts));
      console.log('Product saved to localStorage');
      
      // Only update state if localStorage save was successful
      setProducts(updatedProducts);
      updateStats(updatedProducts);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('productsUpdated'));
      console.log('productsUpdated event dispatched');
      
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      
      if (error.name === 'QuotaExceededError') {
        // Try to free up space by removing images from older products
        const productsWithoutImages = updatedProducts.map(product => ({
          ...product,
          images: product.images && product.images.length > 0 ? [product.mainImage] : [],
          mainImage: product.mainImage || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }));
        
        try {
          localStorage.setItem('peesaenth_products', JSON.stringify(productsWithoutImages));
          setProducts(productsWithoutImages);
          updateStats(productsWithoutImages);
          window.dispatchEvent(new CustomEvent('productsUpdated'));
          
          alert('Storage space was limited. Product added with reduced image data. Consider using external image hosting for better performance.');
        } catch (secondError) {
          console.error('Failed to save even with reduced data:', secondError);
          alert('Storage quota exceeded. Please clear some products or use external image hosting.');
          throw secondError;
        }
      } else {
        alert('Failed to save product: ' + error.message);
        throw error;
      }
    }
  };

  const handleProductUpdate = (updatedProduct) => {
    const updatedProducts = products.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    updateStats(updatedProducts);
    localStorage.setItem('peesaenth_products', JSON.stringify(updatedProducts));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('productsUpdated'));
  };

  const handleProductDelete = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    setProducts(updatedProducts);
    updateStats(updatedProducts);
    localStorage.setItem('peesaenth_products', JSON.stringify(updatedProducts));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('productsUpdated'));
  };

  const tabs = [
    {
      id: 'products',
      label: 'Manage Products',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      id: 'add',
      label: 'Add Product',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      )
    },
    {
      id: 'gallery',
      label: 'Gallery Images',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-gray-100 z-50 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Peesaenth Fashion Admin</h1>
                <p className="text-sm text-gray-500">Product Management Dashboard</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Sidebar */}
          <div className="w-full lg:w-64 bg-white shadow-sm border-b lg:border-b-0 lg:border-r border-gray-200">
            {/* Quick Stats */}
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 lg:space-y-3 lg:gap-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Products</span>
                  <span className="text-sm font-semibold text-gray-900">{stats.totalProducts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">In Stock</span>
                  <span className="text-sm font-semibold text-green-600">{stats.inStock}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Out of Stock</span>
                  <span className="text-sm font-semibold text-red-600">{stats.outOfStock}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Featured</span>
                  <span className="text-sm font-semibold text-blue-600">{stats.featured}</span>
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Storage</span>
                    <span className="text-xs text-gray-500">
                      {(stats.storageUsed / 1024).toFixed(1)}KB / {(stats.storageMax / 1024 / 1024).toFixed(1)}MB
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        (stats.storageUsed / stats.storageMax) > 0.8 ? 'bg-red-500' :
                        (stats.storageUsed / stats.storageMax) > 0.6 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((stats.storageUsed / stats.storageMax) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4">
              <div className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-auto lg:overflow-x-visible">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full lg:w-auto flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-4 lg:p-6">
              {activeTab === 'products' && (
                <ProductListManager
                  products={products}
                  onProductUpdate={handleProductUpdate}
                  onProductDelete={handleProductDelete}
                />
              )}

              {activeTab === 'add' && (
                <ProductUploadForm
                  onProductAdd={handleProductAdd}
                  onSuccess={() => setActiveTab('products')}
                />
              )}

              {activeTab === 'gallery' && (
                <div className="space-y-8">
                  {/* Upload Section */}
                  <GalleryUploadForm
                    onImageAdd={(newImage) => {
                      // Refresh gallery display if needed
                      console.log('New image added:', newImage);
                    }}
                    onSuccess={() => {
                      // Could switch to manage tab or show success message
                      console.log('Image uploaded successfully');
                    }}
                  />

                  {/* Divider */}
                  <div className="border-t border-gray-200"></div>

                  {/* Management Section */}
                  <GalleryListManager
                    onImageUpdate={() => {
                      // Handle image updates
                      console.log('Image updated');
                    }}
                    onImageDelete={() => {
                      // Handle image deletion
                      console.log('Image deleted');
                    }}
                  />
                </div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-semibold text-gray-900">Analytics Overview</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-100">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">Total Products</p>
                          <p className="text-2xl font-semibold text-gray-900">{stats.totalProducts}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-100">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">In Stock</p>
                          <p className="text-2xl font-semibold text-green-600">{stats.inStock}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-red-100">
                          <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">Out of Stock</p>
                          <p className="text-2xl font-semibold text-red-600">{stats.outOfStock}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                      <div className="flex items-center">
                        <div className="p-3 rounded-full bg-yellow-100">
                          <span className="text-2xl">⭐</span>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">Featured</p>
                          <p className="text-2xl font-semibold text-yellow-600">{stats.featured}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Category Breakdown</h3>
                    <div className="space-y-4">
                      {['women', 'men', 'accessories'].map(category => {
                        const categoryProducts = products.filter(p => p.category === category);
                        const percentage = products.length > 0 ? (categoryProducts.length / products.length) * 100 : 0;
                        
                        return (
                          <div key={category} className="flex items-center">
                            <div className="w-24 text-sm text-gray-600 capitalize">{category}</div>
                            <div className="flex-1 mx-4">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-12 text-sm text-gray-600 text-right">
                              {categoryProducts.length}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;