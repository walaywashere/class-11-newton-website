import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Trophy, Star, Award, Clock, MapPin, Users, Sparkles } from 'lucide-react';

// Enhanced skeleton component with modern styling
const TimelineSkeleton = ({ isOdd, delay = 0 }) => (
  <motion.div 
    className={`flex w-full mb-12 ${isOdd ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    <div className="w-full lg:w-5/12">
      <div className="bg-white rounded-2xl shadow-soft p-6 border border-neutral-100">
        <div className="skeleton h-4 w-1/3 rounded-lg mb-4" />
        <div className="skeleton h-6 w-3/4 rounded-lg mb-4" />
        <div className="skeleton h-4 w-full rounded-lg mb-2" />
        <div className="skeleton h-4 w-5/6 rounded-lg mb-4" />
        <div className="skeleton h-32 w-full rounded-xl" />
      </div>
    </div>
    
    {/* Timeline connector */}
    <div className="relative w-2 lg:w-24 flex-shrink-0 mx-auto lg:mx-0">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-4 h-4 bg-neutral-300 rounded-full animate-pulse" />
      </div>
    </div>
    
    <div className="w-full lg:w-5/12" />
  </motion.div>
);

// Enhanced timeline item component with modern design
const TimelineItem = ({ item, isOdd, index }) => {
  const [isHovering, setIsHovering] = useState(false);

  // Memoize animation variants
  const itemVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: Math.min(index * 0.1, 1.0),
        ease: "easeOut"
      }
    }
  }), [index]);

  const cardVariants = useMemo(() => ({
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }), []);

  if (!item) return null;

  return (
    <motion.div 
      className={`flex w-full mb-12 sm:mb-16 ${isOdd ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch group`}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {/* Content Card */}
      <motion.div 
        className="w-full lg:w-5/12 flex"
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
      >
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden border border-neutral-100 group-hover:border-primary-200 w-full flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-3 sm:p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium opacity-90">
                  {item.date ? new Date(item.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) : 'Date not available'}
                </span>
              </div>
              {item.icon && (
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <item.icon className="w-4 h-4" />
                </div>
              )}
            </div>
            <h3 className="text-lg sm:text-xl font-bold leading-tight">
              {item.title || 'Achievement Title'}
            </h3>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col">
            <p className="text-neutral-700 leading-relaxed mb-6 flex-1">
              {item.description || 'Achievement description goes here.'}
            </p>

            {/* Image */}
            {item.image && (
              <motion.div 
                className="mb-6 rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              >
                <img 
                  src={item.image} 
                  alt={item.title || 'Achievement image'}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </motion.div>
            )}

            {/* Tags */}
            {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium border border-primary-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Timeline Connector */}
      <div className="relative w-2 lg:w-24 flex-shrink-0 mx-auto lg:mx-0">
        {/* Vertical line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-primary-200 to-accent-200 transform -translate-x-1/2" />
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div 
            className="relative"
            animate={isHovering ? { scale: 1.2 } : { scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full shadow-glow flex items-center justify-center">
              {item.icon ? (
                <item.icon className="w-3 h-3 text-white" />
              ) : (
                <div className="w-2 h-2 bg-white rounded-full" />
              )}
            </div>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-0"
              animate={isHovering ? { opacity: 0.3, scale: 1.5 } : { opacity: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
      
      {/* Spacer for alternating layout */}
      <div className="w-full lg:w-5/12" />
    </motion.div>
  );
};

// Enhanced main component with modern design
const Achievements = ({ achievements = [], title = "Our Journey", subtitle = "Milestones and achievements that define our path to excellence." }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  // Memoize filtered achievements with better error handling
  const validAchievements = useMemo(() => {
    if (!Array.isArray(achievements)) {
      console.warn('Achievements data is not an array:', achievements);
      return [];
    }
    return achievements.filter(item => {
      if (!item) return false;
      if (!item.title && !item.description) return false;
      return true;
    });
  }, [achievements]);

  // Animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }), []);

  const headerVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.5
      }
    }
  }), []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-50/30 via-white to-accent-50/30 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full text-primary-700 text-sm font-medium">
            <Trophy className="w-4 h-4" />
            Our Achievements
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            {title.split(' ').map((word, index) => (
              <span key={index}>
                {index === 1 ? (
                  <span className="gradient-text bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    {word}
                  </span>
                ) : (
                  word
                )}
                {index < title.split(' ').length - 1 && ' '}
              </span>
            ))}
          </h2>
          
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/20 to-transparent rounded-3xl" />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative"
          >
            {isLoading ? (
              // Loading skeletons
              <div className="space-y-8">
                {[...Array(3)].map((_, index) => (
                  <TimelineSkeleton key={index} isOdd={index % 2 === 1} delay={index * 0.2} />
                ))}
              </div>
            ) : validAchievements.length > 0 ? (
              // Achievement items
              <div className="space-y-8">
                {validAchievements.map((achievement, index) => (
                  <TimelineItem
                    key={`${achievement.title || 'achievement'}-${index}`}
                    item={achievement}
                    isOdd={index % 2 === 1}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              // Empty state
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="bg-white rounded-2xl p-8 shadow-soft max-w-md mx-auto">
                  <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="w-8 h-8 text-neutral-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">No achievements yet</h3>
                  <p className="text-neutral-600 text-sm">
                    Our journey is just beginning. Great achievements are on the way!
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl p-8 text-white">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">Ready to Create More Memories?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join us as we continue to achieve greatness and make our mark in the world.
            </p>
            <a
              href="#classmates"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-2xl font-semibold text-lg hover:bg-neutral-50 hover:scale-105 transition-all duration-300 shadow-large"
            >
              <Users className="w-5 h-5" />
              Meet the Team
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;