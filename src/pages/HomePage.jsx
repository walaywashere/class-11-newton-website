import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, Users, Trophy, BookOpen, ArrowRight } from 'lucide-react';
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

      {/* Quick Links Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Explore Our Class
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto">
              Navigate through different sections to discover what makes Class 11-Newton special.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Leadership Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="sm:col-span-1"
            >
              <Link
                to="/leadership"
                className="group block bg-white rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-large transition-all duration-300 border border-neutral-200 hover:border-primary-300 hover:-translate-y-2 h-full"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Leadership</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed flex-grow">Meet our class adviser and student officers who guide our journey.</p>
                <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                  Learn More <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </motion.div>

            {/* Students Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sm:col-span-1"
            >
              <Link
                to="/students"
                className="group block bg-white rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-large transition-all duration-300 border border-neutral-200 hover:border-primary-300 hover:-translate-y-2 h-full"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Student Showcase</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed flex-grow">Discover the unique stories and dreams of our classmates.</p>
                <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                  Explore Profiles <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </motion.div>

            {/* Achievements Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="sm:col-span-2 lg:col-span-1 sm:mx-auto lg:mx-0 max-w-md sm:max-w-none"
            >
              <Link
                to="/achievements"
                className="group block bg-white rounded-2xl p-6 lg:p-8 shadow-soft hover:shadow-large transition-all duration-300 border border-neutral-200 hover:border-primary-300 hover:-translate-y-2 h-full"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Achievements</h3>
                <p className="text-neutral-600 mb-6 leading-relaxed flex-grow">Celebrate our collective successes and milestones.</p>
                <div className="flex items-center text-primary-600 font-medium group-hover:translate-x-1 transition-transform">
                  View Timeline <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;