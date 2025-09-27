// Peesaenth Fashion Gallery Data
// Centralized gallery management for the fashion landing page

export const defaultGalleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Summer Collection Lookbook",
    title: "Summer Elegance",
    description: "Showcase of our premium summer collection featuring lightweight fabrics and vibrant colors",
    featured: true,
    uploadDate: new Date().toISOString(),
    order: 1
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Evening Wear Collection",
    title: "Evening Glamour",
    description: "Elegant evening wear perfect for special occasions and formal events",
    featured: true,
    uploadDate: new Date().toISOString(),
    order: 2
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Business Casual Line",
    title: "Professional Edge",
    description: "Contemporary business wear that combines comfort with professional style",
    featured: false,
    uploadDate: new Date().toISOString(),
    order: 3
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1551803091-e20673f8b7b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Streetwear Collection",
    title: "Urban Sophistication",
    description: "Modern streetwear with a sophisticated twist for the urban lifestyle",
    featured: false,
    uploadDate: new Date().toISOString(),
    order: 4
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Bridal Collection",
    title: "Timeless Romance",
    description: "Exquisite bridal wear featuring traditional and contemporary designs",
    featured: true,
    uploadDate: new Date().toISOString(),
    order: 5
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1544957992-20514f595d6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Accessories Showcase",
    title: "Refined Details",
    description: "Premium accessories that complement our clothing collections",
    featured: false,
    uploadDate: new Date().toISOString(),
    order: 6
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Casual Luxury",
    title: "Effortless Style",
    description: "Luxurious casual wear for everyday elegance and comfort",
    featured: false,
    uploadDate: new Date().toISOString(),
    order: 7
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Vintage Inspired",
    title: "Classic Revival",
    description: "Vintage-inspired pieces that bring classic elegance to modern fashion",
    featured: false,
    uploadDate: new Date().toISOString(),
    order: 8
  }
];

// Get gallery images from localStorage or fallback to default data
export const getAllGalleryImages = () => {
  const savedImages = localStorage.getItem('peesaenth_gallery');
  if (savedImages) {
    try {
      return JSON.parse(savedImages);
    } catch (error) {
      console.error('Error parsing saved gallery images:', error);
      return defaultGalleryImages;
    }
  }
  return defaultGalleryImages;
};

// Save gallery images to localStorage
export const saveGalleryImages = (images) => {
  try {
    localStorage.setItem('peesaenth_gallery', JSON.stringify(images));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('galleryUpdated'));
    return true;
  } catch (error) {
    console.error('Error saving gallery images:', error);
    return false;
  }
};

// Add new gallery image
export const addGalleryImage = (imageData) => {
  const currentImages = getAllGalleryImages();
  const newId = Math.max(...currentImages.map(img => img.id), 0) + 1;
  const newImage = {
    id: newId,
    uploadDate: new Date().toISOString(),
    order: currentImages.length + 1,
    featured: false,
    ...imageData
  };

  const updatedImages = [...currentImages, newImage];
  return saveGalleryImages(updatedImages) ? newImage : null;
};

// Update gallery image
export const updateGalleryImage = (id, updateData) => {
  const currentImages = getAllGalleryImages();
  const updatedImages = currentImages.map(img =>
    img.id === id ? { ...img, ...updateData } : img
  );
  return saveGalleryImages(updatedImages);
};

// Delete gallery image
export const deleteGalleryImage = (id) => {
  const currentImages = getAllGalleryImages();
  const filteredImages = currentImages.filter(img => img.id !== id);
  return saveGalleryImages(filteredImages);
};

// Get featured gallery images
export const getFeaturedGalleryImages = () => {
  const allImages = getAllGalleryImages();
  return allImages.filter(image => image.featured);
};

// Get gallery image by ID
export const getGalleryImageById = (id) => {
  const allImages = getAllGalleryImages();
  return allImages.find(image => image.id === parseInt(id));
};

// Reorder gallery images
export const reorderGalleryImages = (imageIds) => {
  const currentImages = getAllGalleryImages();
  const reorderedImages = imageIds.map((id, index) => {
    const image = currentImages.find(img => img.id === id);
    return { ...image, order: index + 1 };
  });
  return saveGalleryImages(reorderedImages);
};

// Get gallery statistics
export const getGalleryStats = () => {
  const images = getAllGalleryImages();
  const storageData = localStorage.getItem('peesaenth_gallery') || '[]';
  const storageUsed = new Blob([storageData]).size;

  return {
    totalImages: images.length,
    featuredImages: images.filter(img => img.featured).length,
    storageUsed,
    averageImageSize: images.length > 0 ? storageUsed / images.length : 0
  };
};