import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import FeaturedCollection from './components/FeaturedCollection'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Gallery from './components/Gallery'
import TrustQuality from './components/TrustQuality'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import AdminDashboard from './components/AdminDashboard'
import Collection from './components/Collection'
import FloatingNavbar from './components/FloatingNavbar'

function App() {
  const [showAdmin, setShowAdmin] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

  // Check if admin mode should be activated (via URL hash or key combination)
  useEffect(() => {
    const checkAdminAccess = () => {
      if (window.location.hash === '#admin') {
        setShowAdmin(true)
      } else if (window.location.hash === '#collection') {
        setCurrentPage('collection')
      } else {
        setCurrentPage('home')
      }
    }
    
    // Check on load
    checkAdminAccess()
    
    // Listen for hash changes
    window.addEventListener('hashchange', checkAdminAccess)
    
    // Listen for admin key combination (Ctrl/Cmd + Shift + A)
    const handleKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault()
        setShowAdmin(true)
      }
    }
    
    document.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('hashchange', checkAdminAccess)
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  const handleBackToHome = () => {
    setCurrentPage('home')
    window.location.hash = ''
  }

  const handleNavigate = (destination, section = null) => {
    if (destination === 'collection') {
      setCurrentPage('collection')
      window.location.hash = '#collection'
    } else if (destination === 'home') {
      setCurrentPage('home')
      window.location.hash = ''

      // If a section is specified, scroll to it after a brief delay
      if (section) {
        setTimeout(() => {
          const element = document.getElementById(section)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      }
    }
  }

  if (showAdmin) {
    return <AdminDashboard onClose={() => {
      setShowAdmin(false)
      window.location.hash = ''
    }} />
  }

  if (currentPage === 'collection') {
    return (
      <>
        <FloatingNavbar currentPage="collection" onNavigate={handleNavigate} />
        <Collection onBackToHome={handleBackToHome} />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <FloatingNavbar currentPage="home" onNavigate={handleNavigate} />
      <Hero />
      <FeaturedCollection />
      <About />
      <Testimonials />
      <Gallery />
      <TrustQuality />
      <Newsletter />
      <Footer />
    </div>
  )
}

export default App
