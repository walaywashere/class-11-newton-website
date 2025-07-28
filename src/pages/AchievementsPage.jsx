import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, Award, Zap, Target, Medal, Crown, Users, Calendar, MapPin, ExternalLink, Filter, Grid, List, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTopInstant } from '../utils/scrollToTop';
import PerfectDropdown from '../components/PerfectDropdown';

const AchievementsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const categories = ['all', 'Academic', 'Science', 'Cultural', 'Social', 'Sports'];
  const categoryOptions = categories.map(cat => ({
    value: cat,
    label: cat === 'all' ? 'All Categories' : cat
  }));

  // Sample achievements data - replace with actual data
  const achievements = [
    {
      id: 1,
      title: "Academic Excellence Award",
      category: "Academic",
      description: "Recognized for outstanding academic performance across all subjects with consistent high grades and innovative project work.",
      date: "June 2024",
      level: "School Level",
      participants: ["Class 11-Newton"],
      image: "/api/placeholder/400/300",
      color: "blue",
      icon: Trophy
    },
    {
      id: 2,
      title: "Science Fair Champions",
      category: "Science",
      description: "First place in the inter-school science fair with an innovative renewable energy project that impressed all judges.",
      date: "March 2024",
      level: "Inter-School",
      participants: ["Team Alpha", "Team Beta"],
      image: "/api/placeholder/400/300",
      color: "emerald",
      icon: Award
    },
    {
      id: 3,
      title: "Mathematics Olympiad Gold",
      category: "Academic",
      description: "Multiple students from our class secured gold medals in the regional mathematics olympiad competition.",
      date: "April 2024",
      level: "Regional",
      participants: ["5 Students"],
      image: "/api/placeholder/400/300",
      color: "amber",
      icon: Medal
    },
    {
      id: 4,
      title: "Cultural Fest Winners",
      category: "Cultural",
      description: "Swept multiple categories in the annual cultural festival including dance, music, and drama competitions.",
      date: "February 2024",
      level: "School Level",
      participants: ["Multiple Teams"],
      image: "/api/placeholder/400/300",
      color: "purple",
      icon: Star
    },
    {
      id: 5,
      title: "Community Service Recognition",
      category: "Social",
      description: "Acknowledged for exceptional community service work and social impact initiatives throughout the academic year.",
      date: "May 2024",
      level: "District",
      participants: ["Entire Class"],
      image: "/api/placeholder/400/300",
      color: "rose",
      icon: Crown
    },
    {
      id: 6,
      title: "Sports Championship",
      category: "Sports",
      description: "Dominated the inter-class sports meet with victories in multiple events including athletics, basketball, and volleyball.",
      date: "January 2024",
      level: "School Level",
      participants: ["Sports Teams"],
      image: "/api/placeholder/400/300",
      color: "orange",
      icon: Zap
    }
  ];

  const filteredAchievements = achievements.filter(achievement => 
    filterCategory === 'all' || achievement.category === filterCategory
  );

  const AchievementModal = ({ achievement, onClose }) => (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={achievement.image}
                alt={achievement.title}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-[9999999] shadow-lg"
                style={{ fontSize: '20px', fontWeight: 'bold' }}
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4">
                <span className={`px-4 py-2 bg-${achievement.color}-100 text-${achievement.color}-700 rounded-full text-sm font-semibold border border-${achievement.color}-200`}>
                  {achievement.category}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 bg-${achievement.color}-100 rounded-2xl`}>
                  <achievement.icon className={`w-8 h-8 text-${achievement.color}-600`} />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{achievement.title}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{achievement.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{achievement.level}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Achievement Details</h3>
                <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Participants</h3>
                <div className="flex flex-wrap gap-2">
                  {achievement.participants.map((participant, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Excellence</p>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Teamwork</p>
                </div>
                <div className="text-center">
                  <Target className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Achievement</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      
      {/* Mobile First Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32">
        {/* Dynamic Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 30% 20%, rgba(245, 158, 11, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(239, 68, 68, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.10) 0%, transparent 50%),
              linear-gradient(135deg, #fffbeb 0%, #fef3c7 25%, #fed7aa 50%, #fecaca 75%, #fffbeb 100%)
            `
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400/50 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -50, 0],
                opacity: [0.5, 1, 0.5],
                scale: [1, 2, 1]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-start mb-8"
          >
            <Link
              to="/"
              onClick={scrollToTopInstant}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-amber-200/50 text-amber-700 hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Home</span>
            </Link>
          </motion.div>

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-100/80 backdrop-blur-sm rounded-full border border-amber-200 mb-6">
              <Trophy className="w-5 h-5 text-amber-600" />
              <span className="text-amber-800 font-semibold">Hall of Fame</span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight">
              Our
              <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Achievements
              </span>
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Celebrate the remarkable milestones, victories, and collective successes that define Class 11-Newton's excellence.
            </p>
          </motion.div>

          {/* Quick Stats - Adaptive Sizing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto mb-16"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-amber-100 flex-1 min-w-[140px] max-w-[200px] text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-2">{achievements.length}+</div>
              <div className="text-xs sm:text-sm text-gray-600">Major Awards</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-orange-100 flex-1 min-w-[140px] max-w-[200px] text-center">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-2">25+</div>
              <div className="text-xs sm:text-sm text-gray-600">Excellence Records</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-red-100 flex-1 min-w-[140px] max-w-[200px] text-center">
              <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-2">15+</div>
              <div className="text-xs sm:text-sm text-gray-600">Goals Achieved</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-100 flex-1 min-w-[140px] max-w-[200px] text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-xs sm:text-sm text-gray-600">Outstanding Results</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-12 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg"
          >
            {/* Category Filter - Perfect System */}
            <PerfectDropdown
              trigger={<Filter className="w-4 h-4" />}
              options={categoryOptions}
              value={filterCategory}
              onChange={setFilterCategory}
              placeholder="All Categories"
              align="left"
              className="flex-shrink-0"
            />

            {/* View Mode Toggle - Perfect Center Alignment */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-amber-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-amber-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold text-amber-600">{filteredAchievements.length}</span> achievement{filteredAchievements.length !== 1 ? 's' : ''}
              {filterCategory !== 'all' && (
                <span> in <span className="font-semibold">{filterCategory}</span> category</span>
              )}
            </p>
          </motion.div>

          {/* Achievements Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${filterCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : 'space-y-6'
              }
            >
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
                      : 'bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300'
                  }`}
                  onClick={() => setSelectedAchievement(achievement)}
                >
                  {viewMode === 'grid' ? (
                    // Grid Card View
                    <>
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={achievement.image}
                          alt={achievement.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 bg-${achievement.color}-100 text-${achievement.color}-700 rounded-full text-xs font-semibold border border-${achievement.color}-200`}>
                            {achievement.category}
                          </span>
                        </div>
                        <div className="absolute bottom-4 left-4">
                          <div className={`p-2 bg-${achievement.color}-100 rounded-xl`}>
                            <achievement.icon className={`w-5 h-5 text-${achievement.color}-600`} />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{achievement.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{achievement.description}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{achievement.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{achievement.level}</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0">
                        <div className={`p-3 bg-${achievement.color}-100 rounded-2xl`}>
                          <achievement.icon className={`w-8 h-8 text-${achievement.color}-600`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 truncate">{achievement.title}</h3>
                          <span className={`px-3 py-1 bg-${achievement.color}-100 text-${achievement.color}-700 rounded-full text-xs font-semibold flex-shrink-0`}>
                            {achievement.category}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-1 mb-2">{achievement.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{achievement.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{achievement.level}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredAchievements.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No achievements found</h3>
              <p className="text-gray-600 mb-6">Try selecting a different category.</p>
              <button
                onClick={() => setFilterCategory('all')}
                className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-colors"
              >
                Show All Achievements
              </button>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-20 p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-100"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Inspired by Our Success?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Meet the amazing students and leaders behind these incredible achievements and discover what makes Class 11-Newton special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/students"
                onClick={scrollToTopInstant}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-2xl hover:from-amber-700 hover:to-orange-700 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <Users className="w-6 h-6" />
                <span className="font-semibold">Meet Our Students</span>
              </Link>
              <Link
                to="/leadership"
                onClick={scrollToTopInstant}
                className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-amber-200 text-amber-700 rounded-2xl hover:bg-amber-50 hover:scale-105 transition-all duration-300"
              >
                <Crown className="w-6 h-6" />
                <span className="font-semibold">Our Leadership</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Achievement Detail Modal */}
      <AchievementModal 
        achievement={selectedAchievement} 
        onClose={() => setSelectedAchievement(null)} 
      />
    </div>
  );
};

export default AchievementsPage;