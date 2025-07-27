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
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden navbar-offset safe-x pb-16 sm:pb-20">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-accent-300" />
            <span className="text-white/90 font-medium text-sm">Class of 2025</span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Welcome to{' '}
            <span className="gradient-text">Class 11-Newton</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Discover the brilliant minds, inspiring leaders, and remarkable achievements that define our journey together.
          </motion.p>

          {/* Stats - Mobile responsive grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-2xl mx-auto"
          >
            <div className="glass rounded-2xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <Users className="w-8 h-8 text-accent-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white mb-1">40+</div>
              <div className="text-white/70 text-sm">Students</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <Trophy className="w-8 h-8 text-accent-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white mb-1">15+</div>
              <div className="text-white/70 text-sm">Achievements</div>
            </div>
            <div className="glass rounded-2xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <BookOpen className="w-8 h-8 text-accent-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl font-bold text-white mb-1">100%</div>
              <div className="text-white/70 text-sm">Excellence</div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link
              to="/students"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl font-semibold text-lg hover:from-primary-700 hover:to-accent-700 hover:scale-105 transition-all duration-300 shadow-glow"
            >
              <Users className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Meet Our Students
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/leadership"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300 border border-white/20"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Our Leadership
            </Link>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator - Moved to bottom and properly positioned */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-1 sm:gap-2 text-white/70 hover:text-white/90 transition-colors duration-300"
          >
            <span className="text-xs sm:text-sm font-medium bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
              Explore More
            </span>
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.div>
        </motion.div>
      </section>

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