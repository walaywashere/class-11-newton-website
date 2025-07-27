import { motion } from 'framer-motion';
import { ArrowLeft, Crown, Sparkles, Users, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import Leadership from '../components/leadership';
import { adviser, students } from '../data/classData';
import { scrollToTopInstant } from '../utils/scrollToTop';

const LeadershipPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Modern Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden navbar-offset">
        {/* Dynamic Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 40%, rgba(139, 92, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #1e40af 50%, #1e3a8a 75%, #1e1b4b 100%)
            `
          }}
        />
        
        {/* Animated Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            animation: 'gridSlide 25s linear infinite'
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/4 left-1/5 w-20 h-20 sm:w-28 sm:h-28 rounded-full opacity-20"
            style={{ 
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, transparent 70%)',
              filter: 'blur(15px)'
            }}
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 30, 0],
              y: [0, -20, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute top-1/3 right-1/4 w-16 h-16 sm:w-24 sm:h-24 rounded-full opacity-15"
            style={{ 
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
              filter: 'blur(12px)'
            }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -25, 0],
              y: [0, 25, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Crown Icons */}
          <motion.div 
            className="absolute top-20 left-20 text-purple-400/30"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 0 }}
          >
            <Crown className="w-6 h-6 sm:w-8 sm:h-8" />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-32 right-16 text-blue-400/25"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, -15, 0],
              opacity: [0.25, 0.5, 0.25]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1.5 }}
          >
            <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <Link
              to="/"
              onClick={scrollToTopInstant}
              className="inline-flex items-center gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full backdrop-blur-md border text-white/80 hover:text-white hover:scale-105 transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </motion.div>

          <div className="text-center">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 sm:mb-8"
            >
              <div 
                className="px-4 py-2 sm:px-6 sm:py-3 rounded-full border backdrop-blur-md"
                style={{
                  background: 'rgba(139, 92, 246, 0.2)',
                  borderColor: 'rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2)'
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200" />
                  </motion.div>
                  <span className="text-white font-semibold text-sm sm:text-base tracking-wide">
                    Leadership Team
                  </span>
                  <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-6 sm:mb-8"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <motion.span 
                  className="block text-white mb-2"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Meet Our
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-purple-400 via-blue-400 to-amber-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 4s ease-in-out infinite'
                  }}
                >
                  Leadership
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-8 sm:mb-12"
            >
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                Discover the{' '}
                <motion.span 
                  className="text-purple-300 font-medium"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  visionaries
                </motion.span>
                {' '}and{' '}
                <motion.span 
                  className="text-blue-300 font-medium"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  innovators
                </motion.span>
                {' '}who guide Class 11-Newton towards excellence
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto"
            >
              {[
                { icon: Crown, label: 'Class Adviser', value: '1', color: 'purple' },
                { icon: Users, label: 'Student Officers', value: '8+', color: 'blue' },
                { icon: Trophy, label: 'Leadership Excellence', value: '100%', color: 'amber' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  className="group cursor-pointer"
                >
                  <div 
                    className="p-4 sm:p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 group-hover:shadow-2xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      className="mb-3"
                    >
                      <stat.icon className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto text-${stat.color}-400 group-hover:scale-110 transition-transform`} />
                    </motion.div>
                    <div className={`text-2xl sm:text-3xl font-bold text-${stat.color}-300 mb-1 sm:mb-2 group-hover:text-${stat.color}-200 transition-colors`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm font-medium group-hover:text-gray-300 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gridSlide {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Leadership Component */}
      <Leadership adviser={adviser} students={students} />
    </div>
  );
};

export default LeadershipPage;