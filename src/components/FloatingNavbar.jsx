import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const FloatingNavbar = ({ currentPage, onNavigate }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleBrandClick = () => {
    if (currentPage === 'collection') {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      // On homepage, clicking brand goes to collection
      onNavigate('collection');
    }
  };

  const handleNavigate = (destination) => {
    setIsDropdownOpen(false);
    if (destination === 'home') {
      onNavigate('home');
    } else if (destination === 'collection') {
      onNavigate('collection');
    } else {
      // Navigate to section on homepage
      onNavigate('home', destination);
    }
  };

  const dropdownItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About Us', icon: '✨' },
    { id: 'gallery', label: 'Gallery', icon: '🎨' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  return (
    <>
      {/* Main Brand Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed top-6 left-6 z-40"
      >
        <motion.button
          onClick={handleBrandClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative"
        >
          <div className="backdrop-blur-md bg-white/90 border border-gray-200/50 rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3">
              <span className="font-serif text-lg font-bold text-gray-900">
                Peesaenth
              </span>

              {/* Collection indicator on homepage */}
              {currentPage === 'home' && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="w-2 h-2 bg-gray-900 rounded-full"
                />
              )}

              {/* Dropdown arrow on collection page */}
              {currentPage === 'collection' && (
                <motion.svg
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              )}
            </div>
          </div>

          {/* Tooltip for homepage */}
          {currentPage === 'home' && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                View Collection
              </div>
            </div>
          )}
        </motion.button>
      </motion.div>

      {/* Dropdown Menu (Collection Page Only) */}
      <AnimatePresence>
        {currentPage === 'collection' && isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-6 z-30"
          >
            <div className="backdrop-blur-md bg-white/95 border border-gray-200/50 rounded-2xl shadow-xl overflow-hidden min-w-[200px]">
              {dropdownItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavigate(item.id)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50/80 transition-colors duration-200 group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </span>
                  <span className="font-medium text-gray-700 group-hover:text-gray-900">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for dropdown */}
      <AnimatePresence>
        {currentPage === 'collection' && isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDropdownOpen(false)}
            className="fixed inset-0 z-20"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingNavbar;