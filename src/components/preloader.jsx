import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -180 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1,
      ease: 'easeOut',
    },
  },
};

const Preloader = () => {
  // Error boundary for animations
  if (typeof window === 'undefined') {
    return null; // SSR safety
  }

  return (
    <motion.div
      className="fixed inset-0 gradient-bg flex flex-col justify-center items-center z-[101] text-center px-4"
      initial="hidden"
      animate="visible"
      exit={{ 
        opacity: 0, 
        scale: 1.1,
        transition: { duration: 0.8, ease: 'easeInOut' } 
      }}
      variants={containerVariants}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Logo */}
        <motion.div
          variants={logoVariants}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-accent-500 rounded-2xl flex items-center justify-center shadow-glow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>

        {/* Welcome text */}
        <motion.p
          className="text-lg sm:text-xl text-white/80 font-light mb-2"
          variants={itemVariants}
        >
          Welcome to the future
        </motion.p>

        {/* Main title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
          variants={itemVariants}
        >
          Class
          <span className="block gradient-text bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
            11-Newton
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl text-primary-200 font-semibold mb-12"
          variants={itemVariants}
        >
          Where Brilliance Meets Innovation
        </motion.p>

        {/* Loading animation */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center gap-3"
        >
          {/* Simple loading dots */}
          <div className="flex justify-center items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-accent-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
          
          {/* Loading text */}
          <div className="text-center">
            <span className="text-white/90 text-base font-medium">Loading...</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Preloader;