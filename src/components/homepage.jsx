import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, Users, Trophy, BookOpen } from 'lucide-react';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Error boundary for this component
  if (typeof window === 'undefined') {
    return null; // SSR safety
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating geometric shapes - Mobile responsive */}
      <motion.div 
        style={{ y: y1 }} 
        className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-white/10 rounded-2xl rotate-45 animate-float"
      />
      <motion.div 
        style={{ y: y2 }} 
        className="absolute top-20 sm:top-40 right-4 sm:right-20 w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 bg-accent-400/20 rounded-full animate-float"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        style={{ y: y1 }} 
        className="absolute bottom-20 sm:bottom-32 left-1/4 w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-white/15 rounded-lg rotate-12 animate-float"
      />
      <motion.div 
        style={{ y: y2 }} 
        className="absolute bottom-10 sm:bottom-20 right-1/4 sm:right-1/3 w-6 sm:w-8 h-6 sm:h-8 bg-accent-300/25 rounded-full animate-float"
      />

      {/* Main content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 glass rounded-full text-white/90 text-sm font-medium"
        >
          <Sparkles className="w-4 h-4 text-accent-300" />
          Class of 2025 • Grade 11 Newton
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          Where
          <span className="block gradient-text bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
            Brilliance
          </span>
          Meets Innovation
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
        >
          Discover the extraordinary minds of Class 11-Newton. A community of innovators, dreamers, and future leaders shaping tomorrow's world.
        </motion.p>

        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-12 max-w-2xl mx-auto"
        >
          <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center group hover:bg-white/20 transition-all duration-300">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent-300 mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">40+</div>
            <div className="text-white/70 text-xs sm:text-sm">Students</div>
          </div>
          <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center group hover:bg-white/20 transition-all duration-300">
            <Trophy className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent-300 mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">15+</div>
            <div className="text-white/70 text-xs sm:text-sm">Achievements</div>
          </div>
          <div className="glass rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 text-center group hover:bg-white/20 transition-all duration-300">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-accent-300 mx-auto mb-1 sm:mb-2 group-hover:scale-110 transition-transform" />
            <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">100%</div>
            <div className="text-white/70 text-xs sm:text-sm">Excellence</div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#leadership"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-2xl font-semibold text-lg hover:bg-accent-50 hover:scale-105 transition-all duration-300 shadow-large"
          >
            Meet Our Class
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#classmates"
            className="group inline-flex items-center gap-2 px-8 py-4 glass text-white rounded-2xl font-semibold text-lg hover:bg-white/20 transition-all duration-300"
          >
            Explore Profiles
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HomePage;