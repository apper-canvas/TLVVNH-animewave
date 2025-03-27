import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Menu, X, Search, Bell, User } from 'lucide-react'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-800 to-surface-900 text-white">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-surface-900/80 border-b border-surface-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-surface-800 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AnimeWave
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="font-medium hover:text-primary transition-colors">Home</a>
            <a href="#" className="font-medium hover:text-primary transition-colors">Browse</a>
            <a href="#" className="font-medium hover:text-primary transition-colors">New Releases</a>
            <a href="#" className="font-medium hover:text-primary transition-colors">My List</a>
            <a href="#" className="font-medium hover:text-primary transition-colors">Favourites</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-surface-800 transition-colors">
              <Search size={20} />
            </button>
            <button className="p-2 rounded-full hover:bg-surface-800 transition-colors">
              <Bell size={20} />
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-surface-800 transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <User size={16} />
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 bg-surface-900 p-4"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AnimeWave
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full hover:bg-surface-800 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col space-y-6 text-lg">
              <a href="/" className="font-medium hover:text-primary transition-colors py-2 border-b border-surface-700">Home</a>
              <a href="#" className="font-medium hover:text-primary transition-colors py-2 border-b border-surface-700">Browse</a>
              <a href="#" className="font-medium hover:text-primary transition-colors py-2 border-b border-surface-700">New Releases</a>
              <a href="#" className="font-medium hover:text-primary transition-colors py-2 border-b border-surface-700">My List</a>
              <a href="#" className="font-medium hover:text-primary transition-colors py-2 border-b border-surface-700">Favourites</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-surface-800 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AnimeWave
              </span>
              <p className="text-surface-400 mt-2">Your premium anime streaming destination</p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <h3 className="font-semibold mb-3">Company</h3>
                <ul className="space-y-2 text-surface-400">
                  <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Support</h3>
                <ul className="space-y-2 text-surface-400">
                  <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Legal</h3>
                <ul className="space-y-2 text-surface-400">
                  <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-surface-700 text-center text-surface-500">
            <p>© {new Date().getFullYear()} AnimeWave. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App