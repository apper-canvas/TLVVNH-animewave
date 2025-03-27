import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Filter, Clock, Calendar, Star, TrendingUp, Zap, Heart } from 'lucide-react'

// Mock data for search results
const animeDatabase = [
  { id: 1, title: "Attack on Titan", genres: ["Action", "Drama", "Fantasy"], rating: 4.9, year: 2013, image: "https://source.unsplash.com/random/300x450/?anime,titan" },
  { id: 2, title: "My Hero Academia", genres: ["Action", "Comedy", "Super Power"], rating: 4.7, year: 2016, image: "https://source.unsplash.com/random/300x450/?anime,hero" },
  { id: 3, title: "Demon Slayer", genres: ["Action", "Historical", "Supernatural"], rating: 4.8, year: 2019, image: "https://source.unsplash.com/random/300x450/?anime,demon" },
  { id: 4, title: "One Piece", genres: ["Action", "Adventure", "Comedy"], rating: 4.9, year: 1999, image: "https://source.unsplash.com/random/300x450/?anime,pirate" },
  { id: 5, title: "Jujutsu Kaisen", genres: ["Action", "Horror", "Supernatural"], rating: 4.8, year: 2020, image: "https://source.unsplash.com/random/300x450/?anime,dark" },
  { id: 6, title: "Naruto", genres: ["Action", "Adventure", "Martial Arts"], rating: 4.7, year: 2002, image: "https://source.unsplash.com/random/300x450/?anime,ninja" },
  { id: 7, title: "Fullmetal Alchemist: Brotherhood", genres: ["Action", "Adventure", "Drama"], rating: 4.9, year: 2009, image: "https://source.unsplash.com/random/300x450/?anime,alchemy" },
  { id: 8, title: "Death Note", genres: ["Mystery", "Psychological", "Thriller"], rating: 4.8, year: 2006, image: "https://source.unsplash.com/random/300x450/?anime,dark" },
  { id: 9, title: "Hunter x Hunter", genres: ["Action", "Adventure", "Fantasy"], rating: 4.9, year: 2011, image: "https://source.unsplash.com/random/300x450/?anime,adventure" },
  { id: 10, title: "Spy x Family", genres: ["Action", "Comedy", "Slice of Life"], rating: 4.7, year: 2022, image: "https://source.unsplash.com/random/300x450/?anime,family" },
  { id: 11, title: "Chainsaw Man", genres: ["Action", "Horror", "Supernatural"], rating: 4.6, year: 2022, image: "https://source.unsplash.com/random/300x450/?anime,horror" },
  { id: 12, title: "Tokyo Ghoul", genres: ["Action", "Horror", "Supernatural"], rating: 4.5, year: 2014, image: "https://source.unsplash.com/random/300x450/?anime,dark" }
]

// All available genres from the database
const allGenres = [...new Set(animeDatabase.flatMap(anime => anime.genres))].sort()

function MainFeature() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedGenres, setSelectedGenres] = useState([])
  const [yearRange, setYearRange] = useState([1990, 2023])
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState('relevance')
  const [favorites, setFavorites] = useState([])
  
  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.length > 0) {
      setShowResults(true)
      performSearch(query)
    } else {
      setShowResults(false)
      setSearchResults([])
    }
  }
  
  // Perform search with filters
  const performSearch = (query) => {
    // Filter by search query
    let results = animeDatabase.filter(anime => 
      anime.title.toLowerCase().includes(query.toLowerCase())
    )
    
    // Apply genre filter if any genres are selected
    if (selectedGenres.length > 0) {
      results = results.filter(anime => 
        selectedGenres.some(genre => anime.genres.includes(genre))
      )
    }
    
    // Apply year range filter
    results = results.filter(anime => 
      anime.year >= yearRange[0] && anime.year <= yearRange[1]
    )
    
    // Apply rating filter
    results = results.filter(anime => anime.rating >= minRating)
    
    // Apply sorting
    switch (sortBy) {
      case 'year-desc':
        results.sort((a, b) => b.year - a.year)
        break
      case 'year-asc':
        results.sort((a, b) => a.year - b.year)
        break
      case 'rating':
        results.sort((a, b) => b.rating - a.rating)
        break
      case 'title':
        results.sort((a, b) => a.title.localeCompare(b.title))
        break
      // Default is relevance (no additional sorting)
    }
    
    setSearchResults(results)
  }
  
  // Toggle genre selection
  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre))
    } else {
      setSelectedGenres([...selectedGenres, genre])
    }
  }
  
  // Apply filters
  const applyFilters = () => {
    performSearch(searchQuery)
  }
  
  // Reset filters
  const resetFilters = () => {
    setSelectedGenres([])
    setYearRange([1990, 2023])
    setMinRating(0)
    setSortBy('relevance')
  }
  
  // Toggle favorite
  const toggleFavorite = (animeId) => {
    if (favorites.includes(animeId)) {
      setFavorites(favorites.filter(id => id !== animeId))
    } else {
      setFavorites([...favorites, animeId])
    }
  }
  
  // Update search results when filters change
  useEffect(() => {
    if (searchQuery) {
      performSearch(searchQuery)
    }
  }, [selectedGenres, yearRange, minRating, sortBy])
  
  return (
    <section className="bg-surface-800/50 rounded-2xl p-6 border border-surface-700">
      <h2 className="text-2xl font-bold mb-6">Discover Your Next Anime</h2>
      
      <div className="relative">
        {/* Search input */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-surface-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for anime titles..."
              className="w-full bg-surface-900 border border-surface-700 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-surface-500"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('')
                  setShowResults(false)
                  setSearchResults([])
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X size={18} className="text-surface-400 hover:text-white" />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl transition-colors ${
              showFilters 
                ? 'bg-primary text-white' 
                : 'bg-surface-900 border border-surface-700 text-surface-300 hover:text-white'
            }`}
          >
            <Filter size={18} />
          </button>
        </div>
        
        {/* Filters panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 bg-surface-900 rounded-xl border border-surface-700 p-4 overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Genre filter */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Filter size={16} /> Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {allGenres.map(genre => (
                      <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          selectedGenres.includes(genre)
                            ? 'bg-primary text-white'
                            : 'bg-surface-800 text-surface-300 hover:bg-surface-700'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Year range filter */}
                <div>
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <Calendar size={16} /> Year Range
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-surface-400">
                      <span>{yearRange[0]}</span>
                      <span>{yearRange[1]}</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="1990"
                        max="2023"
                        value={yearRange[0]}
                        onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                        className="w-full accent-primary"
                      />
                      <input
                        type="range"
                        min="1990"
                        max="2023"
                        value={yearRange[1]}
                        onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                        className="w-full accent-primary"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Rating and sort filters */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Star size={16} /> Minimum Rating
                    </h3>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.1"
                        value={minRating}
                        onChange={(e) => setMinRating(parseFloat(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <span className="text-sm font-medium bg-surface-800 px-2 py-1 rounded w-12 text-center">
                        {minRating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <TrendingUp size={16} /> Sort By
                    </h3>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="rating">Highest Rating</option>
                      <option value="year-desc">Newest First</option>
                      <option value="year-asc">Oldest First</option>
                      <option value="title">Title (A-Z)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-surface-800 hover:bg-surface-700 transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-primary hover:bg-primary-dark transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Search results */}
        <AnimatePresence>
          {showResults && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-4 bg-surface-900 rounded-xl border border-surface-700 p-4 max-h-[70vh] overflow-y-auto scrollbar-hide"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">
                  Found {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'}
                </h3>
                <button
                  onClick={() => setShowResults(false)}
                  className="p-1.5 rounded-full hover:bg-surface-800 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {searchResults.map((anime) => (
                  <motion.div
                    key={anime.id}
                    whileHover={{ y: -5 }}
                    className="bg-surface-800 rounded-xl overflow-hidden anime-card-shadow group"
                  >
                    <div className="relative">
                      <img 
                        src={anime.image} 
                        alt={anime.title}
                        className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2">
                        <button 
                          onClick={() => toggleFavorite(anime.id)}
                          className={`p-2 rounded-full transition-colors ${
                            favorites.includes(anime.id)
                              ? 'bg-primary/80 text-white'
                              : 'bg-surface-900/80 text-surface-400 hover:text-white'
                          }`}
                        >
                          <Heart 
                            size={16} 
                            className={favorites.includes(anime.id) ? 'fill-white' : ''}
                          />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-surface-900 to-transparent">
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
                            <Star size={12} className="fill-primary text-primary" /> {anime.rating}
                          </span>
                          <span className="bg-surface-800/80 px-2 py-0.5 rounded-full text-xs">{anime.year}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="font-medium truncate">{anime.title}</h4>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {anime.genres.slice(0, 3).map(genre => (
                          <span key={genre} className="text-xs bg-surface-700 px-2 py-0.5 rounded-full text-surface-300">
                            {genre}
                          </span>
                        ))}
                      </div>
                      <button className="w-full mt-3 bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-1">
                        <Zap size={14} /> Watch Now
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {showResults && searchQuery && searchResults.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mt-4 bg-surface-900 rounded-xl border border-surface-700 p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-surface-800 flex items-center justify-center">
                <Search size={24} className="text-surface-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No results found</h3>
              <p className="text-surface-400 mb-4">
                We couldn't find any anime matching "{searchQuery}"
                {selectedGenres.length > 0 && " with the selected filters"}
              </p>
              {selectedGenres.length > 0 && (
                <button
                  onClick={resetFilters}
                  className="text-primary hover:text-primary-light transition-colors text-sm"
                >
                  Clear filters and try again
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Quick suggestions */}
      {!showResults && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-surface-300 mb-3">Popular searches</h3>
          <div className="flex flex-wrap gap-2">
            {["Attack on Titan", "Demon Slayer", "One Piece", "Jujutsu Kaisen", "My Hero Academia", "Chainsaw Man"].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setSearchQuery(suggestion)
                  setShowResults(true)
                  performSearch(suggestion)
                }}
                className="px-3 py-1.5 rounded-full text-sm bg-surface-900 border border-surface-700 hover:border-primary transition-colors flex items-center gap-1"
              >
                <Clock size={14} className="text-surface-400" /> {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

export default MainFeature