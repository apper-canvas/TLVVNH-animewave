import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        <div className="mb-8">
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-surface-800 rounded-full border-4 border-primary">
              <span className="text-7xl font-bold text-primary">404</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
          <p className="text-surface-300 mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-full w-full sm:w-auto transition-colors"
            >
              <Home size={18} /> Go Home
            </motion.button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-surface-800 hover:bg-surface-700 text-white font-medium px-6 py-3 rounded-full w-full sm:w-auto transition-colors"
          >
            <ArrowLeft size={18} /> Go Back
          </button>
        </div>
        
        <div className="mt-12 p-6 bg-surface-800/50 rounded-xl border border-surface-700">
          <h2 className="text-lg font-medium mb-3">Looking for something to watch?</h2>
          <p className="text-surface-300 mb-4">
            Check out our featured anime or browse our extensive collection.
          </p>
          <Link to="/">
            <button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium py-3 rounded-lg transition-opacity">
              Discover Anime
            </button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound