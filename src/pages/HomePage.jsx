import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, Users, Trophy, BookOpen, ArrowRight, Crown, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen">
      {/* Hero Section - Completely Redesigned */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden navbar-offset safe-x">
        {/* Dynamic Gradient Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(245, 158, 11, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)
            `
          }}
        />
        
        {/* Animated Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            animation: 'gridSlide 30s linear infinite'
          }}
        />

        {/* Floating Elements - Redesigned */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large Orbs */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 rounded-full opacity-20"
            style={{ 
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
              filter: 'blur(20px)'
            }}
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div 
            className="absolute top-1/3 right-1/4 w-24 h-24 sm:w-36 sm:h-36 rounded-full opacity-15"
            style={{ 
              background: 'radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)',
              filter: 'blur(15px)'
            }}
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Geometric Shapes */}
          <motion.div 
            className="absolute top-20 left-10 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400/30 rounded-full"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 0 }}
          />
          <motion.div 
            className="absolute top-40 right-20 w-3 h-3 sm:w-4 sm:h-4 bg-purple-400/40 rotate-45"
            animate={{ 
              y: [0, -15, 0],
              rotate: [45, 225, 45],
              opacity: [0.4, 0.9, 0.4]
            }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
          <motion.div 
            className="absolute bottom-32 left-1/3 w-2 h-2 sm:w-3 sm:h-3 bg-amber-400/50 rounded-full"
            animate={{ 
              y: [0, -25, 0],
              x: [0, 10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
          />
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            
            {/* Top Badge with Animation */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8"
            >
              <div 
                className="px-6 py-3 rounded-full border backdrop-blur-md"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5 text-blue-300" />
                  </motion.div>
                  <span className="text-white font-semibold text-sm sm:text-base tracking-wide">
                    Class of 2025-2026
                  </span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Main Title - Redesigned */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-8"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight">
                <motion.span 
                  className="block text-white mb-2"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Welcome to
                </motion.span>
                <motion.span 
                  className="block bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 4s ease-in-out infinite'
                  }}
                >
                  Class 11-Newton
                </motion.span>
              </h1>
            </motion.div>

            {/* Subtitle with Typewriter Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mb-12"
            >
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light max-w-4xl mx-auto leading-relaxed">
                Where{' '}
                <motion.span 
                  className="text-blue-300 font-medium"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Innovation
                </motion.span>
                {' '}meets{' '}
                <motion.span 
                  className="text-purple-300 font-medium"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  Excellence
                </motion.span>
                {' '}and{' '}
                <motion.span 
                  className="text-amber-300 font-medium"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  Dreams
                </motion.span>
                {' '}become reality
              </p>
            </motion.div>

            {/* Interactive Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-12 max-w-4xl mx-auto"
            >
              {[
                { icon: Users, label: 'Brilliant Minds', value: '40+', color: 'blue' },
                { icon: Trophy, label: 'Achievements', value: '15+', color: 'purple' },
                { icon: BookOpen, label: 'Projects', value: '25+', color: 'amber' },
                { icon: Heart, label: 'Excellence', value: '100%', color: 'rose' }
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
                    className="p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 group-hover:shadow-2xl"
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className="mb-4"
                    >
                      <stat.icon className={`w-8 h-8 mx-auto text-${stat.color}-400 group-hover:scale-110 transition-transform`} />
                    </motion.div>
                    <div className={`text-3xl font-bold text-${stat.color}-300 mb-2 group-hover:text-${stat.color}-200 transition-colors`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons - Redesigned */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16"
            >
              <Link
                to="/students"
                className="group relative overflow-hidden px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-3 text-white">
                  <Users className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Meet Our Students
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              
              <Link
                to="/leadership"
                className="group px-8 py-4 rounded-2xl font-bold text-lg border-2 border-white/20 text-white backdrop-blur-md hover:bg-white/10 hover:scale-105 transition-all duration-300"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)'
                }}
              >
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  Our Leadership
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 cursor-pointer group"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <div 
              className="px-4 py-2 rounded-full backdrop-blur-md border text-white/80 text-sm font-medium group-hover:text-white group-hover:scale-105 transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
            >
              Discover More
            </div>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      
      <style jsx>{`
        @keyframes gridSlide {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Explore Our Class - Completely Redesigned */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-accent-50/50"></div>
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 sm:mb-20"
          >
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #f59e0b 100%)',
                color: 'white',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '24px',
                boxShadow: '0 4px 12px rgba(14, 165, 233, 0.3)'
              }}
            >
              <Sparkles style={{ width: '16px', height: '16px' }} />
              Discover Class 11-Newton
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              Your Journey
              <span className="block bg-gradient-to-r from-primary-600 via-accent-600 to-primary-700 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Dive into the heart of our community and explore the stories, achievements, and dreams that define us.
            </p>
          </motion.div>

          {/* Interactive Cards Grid - Properly Fixed Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Leadership Card - Full Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:row-span-2"
            >
              <div
                style={{
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #d97706 100%)',
                  height: '100%',
                  borderRadius: '24px',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.1)',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.5s ease',
                  cursor: 'pointer'
                }}
                className="group hover:scale-[1.02]"
                onClick={() => window.location.href = '/leadership'}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 0 30px rgba(14, 165, 233, 0.4), 0 20px 40px rgba(14, 165, 233, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Pattern Overlay */}
                <div 
                  style={{
                    position: 'absolute',
                    inset: '0',
                    opacity: '0.1',
                    pointerEvents: 'none'
                  }}
                >
                  <div 
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      width: '80px',
                      height: '80px',
                      border: '2px solid white',
                      borderRadius: '50%'
                    }}
                  ></div>
                  <div 
                    style={{
                      position: 'absolute',
                      top: '64px',
                      right: '32px',
                      width: '48px',
                      height: '48px',
                      border: '1px solid white',
                      borderRadius: '8px',
                      transform: 'rotate(45deg)'
                    }}
                  ></div>
                  <div 
                    style={{
                      position: 'absolute',
                      bottom: '32px',
                      left: '48px',
                      width: '32px',
                      height: '32px',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderRadius: '50%'
                    }}
                  ></div>
                </div>
                
                {/* Content */}
                <div 
                  style={{
                    position: 'relative',
                    zIndex: '10',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '32px',
                    color: 'white'
                  }}
                >
                  <div>
                    <div 
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(8px)',
                        borderRadius: '20px',
                        fontSize: '14px',
                        fontWeight: '500',
                        marginBottom: '24px'
                      }}
                    >
                      <Crown style={{ width: '16px', height: '16px' }} />
                      Leadership Team
                    </div>
                    
                    <h3 
                      style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        marginBottom: '16px',
                        lineHeight: '1.1',
                        color: 'white'
                      }}
                      className="sm:text-4xl lg:text-5xl"
                    >
                      Meet Our
                      <span style={{ display: 'block' }}>Amazing Leaders</span>
                    </h3>
                    
                    <p 
                      style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontSize: '18px',
                        lineHeight: '1.6',
                        marginBottom: '24px'
                      }}
                    >
                      Discover the inspiring individuals who guide our class towards excellence and innovation.
                    </p>
                  </div>
                  
                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '16px'
                    }}
                    className="group-hover:gap-4 transition-all duration-300"
                  >
                    <span>Explore Leadership</span>
                    <ArrowRight 
                      style={{ width: '20px', height: '20px' }} 
                      className="group-hover:translate-x-1 transition-transform" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side Container */}
            <div className="flex flex-col gap-6 lg:gap-8">
              {/* Students Card - Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1"
              >
                <div
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '24px 32px',
                    boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 4px 12px -4px rgba(0, 0, 0, 0.05)',
                    border: '2px solid #f5f5f5',
                    height: '100%',
                    transition: 'all 0.5s ease',
                    cursor: 'pointer'
                  }}
                  className="group hover:shadow-large hover:border-primary-200 hover:-translate-y-2"
                  onClick={() => window.location.href = '/students'}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">Student Showcase</h3>
                      <p className="text-neutral-600 leading-relaxed">
                        Meet the brilliant minds behind Class 11-Newton and their unique stories.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>40+ Students</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>View Profiles</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Achievements Card - Bottom Right */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex-1"
              >
                <div
                  style={{
                    background: 'linear-gradient(135deg, #fffbeb 0%, #fed7aa 100%)',
                    borderRadius: '16px',
                    padding: '24px 32px',
                    boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1), 0 4px 12px -4px rgba(0, 0, 0, 0.05)',
                    border: '2px solid #fef3c7',
                    height: '100%',
                    transition: 'all 0.5s ease',
                    cursor: 'pointer'
                  }}
                  className="group hover:shadow-large hover:border-amber-200 hover:-translate-y-2"
                  onClick={() => window.location.href = '/achievements'}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Trophy className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">Our Achievements</h3>
                      <p className="text-neutral-600 leading-relaxed">
                        Celebrate the milestones and successes that define our journey.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span>15+ Milestones</span>
                    </div>
                    <div className="flex items-center gap-2 text-amber-600 font-semibold group-hover:gap-3 transition-all duration-300">
                      <span>View Timeline</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16 sm:mt-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 rounded-full text-sm text-neutral-600 font-medium">
              <Heart className="w-4 h-4 text-red-500" />
              Made with love by Class 11-Newton
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;