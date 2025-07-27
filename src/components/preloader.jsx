import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIcon } from '../utils/iconMapper';

const Preloader = () => {
  const [loadingText, setLoadingText] = useState('Initializing');
  const [progress, setProgress] = useState(0);

  // Dynamic loading text animation
  useEffect(() => {
    const texts = ['Initializing', 'Loading Assets', 'Preparing Experience', 'Almost Ready'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[currentIndex]);
    }, 600);

    // Progress simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  // Spinner variants
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Pulse ring variants
  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.8, 0.3, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Dots animation variants
  const dotsContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1.2
      }
    }
  };

  const dotVariants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  // Background particles
  const particleVariants = {
    animate: {
      y: [0, -100, 0],
      x: [0, Math.random() * 50 - 25, 0],
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: Math.random() * 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
          backgroundSize: '400% 400%'
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        exit={{ 
          opacity: 0,
          scale: 1.1,
          transition: { duration: 0.8, ease: 'easeInOut' }
        }}
        transition={{
          backgroundPosition: {
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      >
        {/* Animated Background Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridMove 20s linear infinite'
          }}
        />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 20}%`,
              }}
              variants={particleVariants}
              animate="animate"
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6">
          
          {/* Logo Section */}
          <motion.div
            className="relative mb-8 sm:mb-12"
            initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            {/* Pulse Rings */}
            <motion.div
              className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-blue-400/30"
              variants={pulseVariants}
              animate="animate"
            />
            <motion.div
              className="absolute inset-2 w-20 h-20 sm:w-28 sm:h-28 rounded-full border border-purple-400/20"
              variants={pulseVariants}
              animate="animate"
              style={{ animationDelay: '0.5s' }}
            />
            
            {/* Main Logo */}
            <div 
              className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #f59e0b 100%)',
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4), 0 0 80px rgba(139, 92, 246, 0.3)'
              }}
            >
              {React.createElement(getIcon('Sparkles'), { 
                className: "w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-lg" 
              })}
              
              {/* Rotating Border */}
              <motion.div
                className="absolute inset-0 rounded-2xl border-2 border-transparent"
                style={{
                  background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #f59e0b, #3b82f6) border-box',
                  mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude'
                }}
                variants={spinnerVariants}
                animate="animate"
              />
            </div>
          </motion.div>

          {/* Title Section */}
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.p
              className="text-blue-300 text-sm sm:text-base font-medium mb-2 sm:mb-4 tracking-wider uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Welcome to the Future
            </motion.p>
            
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Class
              <motion.span 
                className="block bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 bg-clip-text text-transparent"
                initial={{ backgroundPosition: '0% 50%' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                11-Newton
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-lg sm:text-xl text-gray-300 font-light max-w-md mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Where Innovation Meets Excellence
            </motion.p>
          </motion.div>

          {/* Loading Section */}
          <motion.div
            className="flex flex-col items-center gap-6 sm:gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {/* Modern Spinner */}
            <div className="relative">
              {/* Outer Ring */}
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-blue-500/20 rounded-full"
                variants={spinnerVariants}
                animate="animate"
              />
              
              {/* Inner Spinning Ring */}
              <motion.div
                className="absolute inset-2 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full"
                variants={spinnerVariants}
                animate="animate"
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center Dot */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>

            {/* Progress Bar */}
            <div className="w-64 sm:w-80 bg-gray-700/50 rounded-full h-1 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Loading Text with Dots */}
            <div className="flex items-center gap-3">
              <motion.span
                className="text-white font-medium text-base sm:text-lg"
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {loadingText}
              </motion.span>
              
              {/* Animated Dots */}
              <motion.div
                className="flex gap-1"
                variants={dotsContainerVariants}
                animate="animate"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                    variants={dotVariants}
                  />
                ))}
              </motion.div>
            </div>

            {/* Progress Percentage */}
            <motion.div
              className="text-gray-400 text-sm font-mono"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
      
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default Preloader;