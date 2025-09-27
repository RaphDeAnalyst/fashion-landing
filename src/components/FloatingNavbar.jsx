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
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'about',
      label: 'About Us',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 'gallery',
      label: 'Gallery',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  return (
    <div className={currentPage === 'collection' ? "relative" : ""}>
      {/* Main Brand Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={currentPage === 'collection'
          ? "flex-shrink-0"
          : "fixed top-4 left-4 sm:top-6 sm:left-6 z-40"
        }
      >
        <motion.button
          onClick={handleBrandClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative"
        >
          <div className="backdrop-blur-md bg-white/90 border border-gray-200/50 rounded-full px-4 py-2 sm:px-6 sm:py-3 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center space-x-3">
              <span className="font-serif text-base sm:text-lg font-bold text-gray-900">
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
            className="absolute top-full right-0 mt-2 z-30"
          >
            <div className="backdrop-blur-md bg-white/95 border border-gray-200/50 rounded-2xl shadow-xl overflow-hidden min-w-[180px] sm:min-w-[200px]">
              {dropdownItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavigate(item.id)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50/80 transition-colors duration-200 group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
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
    </div>
  );
};

export default FloatingNavbar;