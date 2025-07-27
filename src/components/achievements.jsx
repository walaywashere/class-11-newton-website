import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trophy, Star, Award } from 'lucide-react';

// Enhanced skeleton component with better animations
const TimelineSkeleton = ({ isOdd, delay = 0 }) => (
  <motion.div 
    className={`flex w-full mb-8 sm:mb-10 ${isOdd ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="w-full md:w-1/2 px-2 sm:px-0">
      <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl bg-white shadow-lg">
        <motion.div 
          className="h-3 sm:h-4 w-1/3 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded mb-3"
          animate={{ x: [-20, 20, -20] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
        <motion.div 
          className="h-5 sm:h-6 w-3/4 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded mb-4"
          animate={{ x: [-20, 20, -20] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.2 }}
        />
        <motion.div 
          className="h-3 sm:h-4 w-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded mb-2"
          animate={{ x: [-20, 20, -20] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.div 
          className="h-3 sm:h-4 w-5/6 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded"
          animate={{ x: [-20, 20, -20] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", delay: 0.6 }}
        />
      </div>
    </div>
    
    {/* Mobile icon */}
    <div className="flex md:hidden w-8 h-8 rounded-full bg-slate-300 ml-4 flex-shrink-0 animate-pulse" />
    
    {/* Desktop icon */}
    <div className="relative w-12 flex-shrink-0 mx-4 hidden md:block">
      <motion.div 
        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-300"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
    </div>
  </motion.div>
);

// Enhanced timeline item component
const TimelineItem = ({ item, isOdd, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHoverig, setIsHovering] = useState(false);

  // Memoize animation variants
  const itemVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      x: isOdd ? 60 : -60,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 15,
        delay: index * 0.1
      }
    },
  }), [isOdd, index]);

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: 'spring', 
        stiffness: 200, 
        damping: 15,
        delay: index * 0.1 + 0.3
      }
    }
  };

  // Default icon if none provided
  const getDefaultIcon = useCallback(() => {
    const icons = [Trophy, Star, Award, Calendar];
    const IconComponent = icons[index % icons.length];
    return <IconComponent size={20} />;
  }, [index]);

  if (!item) return null;

  return (
    <motion.div
      className={`flex w-full mb-8 sm:mb-10 items-center ${isOdd ? 'md:flex-row-reverse' : 'md:flex-row'}`}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Card Content */}
      <div className="w-full md:w-1/2 px-2 sm:px-0">
        <motion.div 
          className="bg-white rounded-lg sm:rounded-xl shadow-lg hover:shadow-2xl p-4 sm:p-6 relative overflow-hidden group cursor-pointer"
          whileHover={{ 
            scale: 1.02,
            y: -4,
            transition: { type: 'spring', stiffness: 400, damping: 25 }
          }}
          whileTap={{ 
            scale: 0.98,
            transition: { type: 'spring', stiffness: 400, damping: 25 }
          }}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          {/* Hover gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHoverig ? 1 : 0 }}
          />
          
          <div className="relative z-10">
            <motion.div 
              className="flex items-center gap-2 mb-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            >
              <Calendar size={16} className="text-indigo-600 flex-shrink-0" />
              <p className="text-xs sm:text-sm font-semibold text-indigo-600">
                {item.date || 'Date Unknown'}
              </p>
            </motion.div>
            
            <motion.h3 
              className="mb-3 font-bold text-slate-900 text-base sm:text-lg md:text-xl leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              {item.title || 'Event Title'}
            </motion.h3>
            
            <motion.p 
              className="text-xs sm:text-sm leading-relaxed tracking-wide text-slate-600"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            >
              {item.description || 'No description available.'}
            </motion.p>

            {/* Optional image */}
            {item.image && (
              <motion.div 
                className="mt-4 rounded-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              >
                <img 
                  src={item.image} 
                  alt={item.title || 'Achievement image'}
                  className="w-full h-32 sm:h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </motion.div>
            )}

            {/* Tags if provided */}
            {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
              <motion.div 
                className="flex flex-wrap gap-2 mt-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
              >
                {item.tags.map((tag, tagIndex) => (
                  <span 
                    key={tagIndex}
                    className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
      
      {/* Mobile Icon */}
      <motion.div 
        className="flex md:hidden w-8 h-8 rounded-full bg-indigo-600 text-white ml-4 flex-shrink-0 items-center justify-center shadow-lg"
        variants={iconVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="text-xs">
          {item.icon || getDefaultIcon()}
        </div>
      </motion.div>
      
      {/* Desktop Icon */}
      <div className="relative w-12 flex-shrink-0 mx-4 hidden md:block">
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center bg-indigo-600 text-white shadow-xl w-12 h-12 rounded-full cursor-pointer"
          variants={iconVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.15, 
            rotate: 5,
            boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)"
          }}
          whileTap={{ scale: 0.9 }}
        >
          {item.icon || getDefaultIcon()}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Enhanced main component
const Achievements = ({ achievements = [], title = "Our Journey", subtitle = "A timeline of our key moments and achievements." }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate data fetching with error handling
    const timer = setTimeout(() => {
      try {
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load achievements');
        setIsLoading(false);
      }
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Memoize filtered achievements
  const validAchievements = useMemo(() => {
    return Array.isArray(achievements) 
      ? achievements.filter(item => item && (item.title || item.description))
      : [];
  }, [achievements]);

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      },
    }
  };

  const lineVariants = {
    hidden: { scaleY: 0, originY: 0 },
    visible: { 
      scaleY: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  if (error) {
    return (
      <section id="achievements" className="py-12 sm:py-16 md:py-24 bg-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-red-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-red-800 font-semibold mb-2">Error Loading Timeline</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="achievements" className="py-12 sm:py-16 md:py-24 bg-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2"
            initial={{ opacity: 0, y: 30, skewY: 3 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-slate-600 text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </motion.div>
        
        <div className="relative">
          {/* Animated vertical line */}
          <motion.div 
            className="absolute top-0 h-full w-0.5 bg-gradient-to-b from-indigo-400 via-indigo-500 to-indigo-600 left-6 md:left-1/2 md:-translate-x-1/2 shadow-sm"
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          />

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {[...Array(3)].map((_, index) => (
                  <TimelineSkeleton 
                    key={index} 
                    isOdd={index % 2 !== 0} 
                    delay={index * 0.2}
                  />
                ))}
              </motion.div>
            ) : validAchievements.length > 0 ? (
              <motion.div
                key="content"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {validAchievements.map((item, index) => (
                  <TimelineItem 
                    key={`${item.title || 'item'}-${index}`} 
                    item={item} 
                    isOdd={index % 2 !== 0}
                    index={index}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                className="text-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
                  <div className="text-slate-400 mb-4">
                    <Trophy className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-slate-700 text-lg font-semibold mb-2">No achievements yet</h3>
                  <p className="text-slate-500 text-sm">Check back later for updates on our journey!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Achievements;