import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, SkipForward, ChevronLeft, ChevronRight, Star, Plus, Clock, Bookmark } from 'lucide-react'
import MainFeature from '../components/MainFeature'

// Mock data for featured anime
const featuredAnime = {
  id: "1",
  title: "Demon Slayer: Kimetsu no Yaiba",
  description: "Tanjiro Kamado's peaceful life is shattered when his family is slaughtered by a demon. His sister Nezuko is the sole survivor, but she has been transformed into a demon herself. Together, they embark on a journey to find a cure and avenge their family.",
  coverImage: "https://source.unsplash.com/random/1200x600/?anime,samurai",
  rating: 4.8,
  genres: ["Action", "Fantasy", "Historical"],
  releaseYear: 2019,
  episodes: 26
}

// Mock data for trending anime
const trendingAnime = [
  {
    id: "2",
    title: "Attack on Titan",
    thumbnail: "https://source.unsplash.com/random/300x450/?anime,titan",
    episodeCount: 87,
    rating: 4.9
  },
  {
    id: "3",
    title: "My Hero Academia",
    thumbnail: "https://source.unsplash.com/random/300x450/?anime,hero",
    episodeCount: 113,
    rating: 4.7
  },
  {
    id: "4",
    title: "Jujutsu Kaisen",
    thumbnail: "https://source.unsplash.com/random/300x450/?anime,dark",
    episodeCount: 24,
    rating: 4.8
  },
  {
    id: "5",
    title: "One Piece",
    thumbnail: "https://source.unsplash.com/random/300x450/?anime,pirate",
    episodeCount: 1000,
    rating: 4.9
  },
  {
    id: "6",
    title: "Chainsaw Man",
    thumbnail: "https://source.unsplash.com/random/300x450/?anime,horror",
    episodeCount: 12,
    rating: 4.6
  },
  {
    id: "7",
    title: "Spy x Family",
    thumbnail: "https://source.unsplash.com/random/300x450/?anime,family",
    episodeCount: 25,
    rating: 4.7
  }
]

// Mock data for episodes
const episodes = [
  { id: "e1", number: 1, title: "Cruelty", thumbnail: "https://source.unsplash.com/random/400x225/?anime,forest", duration: "24:15" },
  { id: "e2", number: 2, title: "Trainer Sakonji Urokodaki", thumbnail: "https://source.unsplash.com/random/400x225/?anime,training", duration: "23:40" },
  { id: "e3", number: 3, title: "Sabito and Makomo", thumbnail: "https://source.unsplash.com/random/400x225/?anime,mask", duration: "24:10" },
  { id: "e4", number: 4, title: "Final Selection", thumbnail: "https://source.unsplash.com/random/400x225/?anime,night", duration: "23:55" },
  { id: "e5", number: 5, title: "My Own Steel", thumbnail: "https://source.unsplash.com/random/400x225/?anime,sword", duration: "24:05" }
]

function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All')
  const videoRef = useRef(null)
  const carouselRef = useRef(null)
  
  // Categories for filter
  const categories = ['All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Slice of Life']
  
  useEffect(() => {
    // Simulate video progress
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.5
        })
      }, 100)
    }
    
    return () => clearInterval(interval)
  }, [isPlaying])
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }
  
  const handleMute = () => {
    setIsMuted(!isMuted)
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
    }
  }
  
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-10">
      {/* Hero Section with Featured Anime */}
      <section className="relative rounded-2xl overflow-hidden">
        <div className="relative aspect-video max-h-[70vh] w-full video-container group">
          <img 
            src={featuredAnime.coverImage} 
            alt={featuredAnime.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/70 to-transparent"></div>
          
          {/* Content */}
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 space-y-4">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-glow"
            >
              {featuredAnime.title}
            </motion.h1>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-2 items-center"
            >
              <span className="flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                <Star size={14} className="fill-primary text-primary" /> {featuredAnime.rating}
              </span>
              <span className="bg-surface-800/80 px-3 py-1 rounded-full text-sm">{featuredAnime.releaseYear}</span>
              <span className="bg-surface-800/80 px-3 py-1 rounded-full text-sm">{featuredAnime.episodes} Episodes</span>
              {featuredAnime.genres.map(genre => (
                <span key={genre} className="bg-surface-800/80 px-3 py-1 rounded-full text-sm">{genre}</span>
              ))}
            </motion.div>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-surface-200 max-w-2xl"
            >
              {featuredAnime.description}
            </motion.p>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button 
                onClick={handlePlayPause}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-full transition-colors"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />} {isPlaying ? 'Pause' : 'Watch Now'}
              </button>
              <button className="flex items-center gap-2 bg-surface-800/80 hover:bg-surface-700 text-white font-medium px-6 py-3 rounded-full transition-colors">
                <Plus size={18} /> Add to List
              </button>
            </motion.div>
          </div>
          
          {/* Video player controls */}
          <div className="absolute bottom-0 left-0 w-full video-player-controls p-4">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePlayPause}
                  className="p-2 rounded-full bg-surface-800/80 hover:bg-surface-700/80 transition-colors"
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button 
                  onClick={handleMute}
                  className="p-2 rounded-full bg-surface-800/80 hover:bg-surface-700/80 transition-colors"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <span className="text-xs text-surface-300">{Math.floor(progress / 100 * 24)}:00 / 24:00</span>
              </div>
              <button className="p-2 rounded-full bg-surface-800/80 hover:bg-surface-700/80 transition-colors">
                <SkipForward size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Feature Component */}
      <MainFeature />
      
      {/* Trending Anime Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Trending Now</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => scrollCarousel('left')}
              className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scrollCarousel('right')}
              className="p-2 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2"
        >
          {trendingAnime.map((anime, index) => (
            <motion.div
              key={anime.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex-shrink-0 w-[220px] group"
            >
              <div className="relative rounded-xl overflow-hidden anime-card-shadow group-hover:ring-2 group-hover:ring-primary transition-all duration-300">
                <img 
                  src={anime.thumbnail} 
                  alt={anime.title}
                  className="w-full h-[330px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-surface-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="flex items-center gap-1 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-xs">
                      <Star size={12} className="fill-primary text-primary" /> {anime.rating}
                    </span>
                    <span className="bg-surface-800/80 px-2 py-0.5 rounded-full text-xs">{anime.episodeCount} Eps</span>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 bg-primary hover:bg-primary-dark text-white text-sm font-medium py-2 rounded-lg transition-colors">
                      Watch
                    </button>
                    <button className="p-2 bg-surface-800/80 hover:bg-surface-700 rounded-lg transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <h3 className="mt-2 font-medium truncate">{anime.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Category Filter */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Explore Anime</h2>
          <select className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Sort by: Popularity</option>
            <option>Sort by: Newest</option>
            <option>Sort by: Rating</option>
          </select>
        </div>
        
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-surface-800 hover:bg-surface-700 text-surface-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>
      
      {/* Episodes Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Continue Watching</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {episodes.map((episode) => (
            <motion.div
              key={episode.id}
              whileHover={{ y: -5 }}
              className="bg-card-gradient rounded-xl overflow-hidden anime-card-shadow episode-card"
            >
              <div className="relative">
                <img 
                  src={episode.thumbnail} 
                  alt={`Episode ${episode.number}`}
                  className="w-full h-[180px] object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="p-3 rounded-full bg-primary/80 hover:bg-primary transition-colors">
                    <Play size={24} className="fill-white text-white" />
                  </button>
                </div>
                <div className="absolute bottom-2 right-2 bg-surface-900/80 px-2 py-1 rounded text-xs">
                  {episode.duration}
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">Episode {episode.number}</h3>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors">
                      <Bookmark size={14} />
                    </button>
                    <button className="p-1.5 rounded-full bg-surface-800 hover:bg-surface-700 transition-colors">
                      <Clock size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-surface-300 truncate">{episode.title}</p>
                <div className="mt-3 progress-bar h-1.5">
                  <div className="progress-fill" style={{ width: `${Math.random() * 100}%` }}></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home