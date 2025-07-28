import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Trophy, Star, Award, Zap, Target, Medal, Crown, Users, Calendar, MapPin, ExternalLink, Filter, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTopInstant } from '../utils/scrollToTop';
import PerfectDropdown from '../components/PerfectDropdown';

// PERFECT ACHIEVEMENTS PAGE - REVOLUTIONARY ARCHITECTURE
// ================================================================

const PerfectAchievementsPage = () => {
  // PERFECT STATE MANAGEMENT
  const [viewMode, setViewMode] = useState('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // PERFECT ACHIEVEMENTS DATA
  const achievementsData = [
    {
      id: 1,
      title: "Academic Excellence Award",
      category: "academic",
      description: "Outstanding performance in Mathematics and Science competitions",
      date: "2024-03-15",
      location: "Regional Science Fair",
      participants: ["John Doe", "Jane Smith", "Mike Johnson"],
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      type: "Competition",
      level: "Regional"
    },
    {
      id: 2,
      title: "Leadership Summit Champion",
      category: "leadership",
      description: "First place in inter-school leadership challenge",
      date: "2024-02-20",
      location: "City Convention Center",
      participants: ["Sarah Wilson", "David Brown"],
      images: ["/api/placeholder/400/300"],
      type: "Leadership",
      level: "City-wide"
    },
    {
      id: 3,
      title: "Community Service Recognition",
      category: "service",
      description: "100+ hours of community service and volunteer work",
      date: "2024-01-10",
      location: "Local Community Center",
      participants: ["Emma Davis", "Alex Thompson", "Lisa Garcia"],
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300", "/api/placeholder/400/300"],
      type: "Service",
      level: "Community"
    },
    {
      id: 4,
      title: "Innovation Fair Winner",
      category: "innovation",
      description: "Revolutionary project in sustainable technology",
      date: "2024-04-05",
      location: "Tech Innovation Hub",
      participants: ["Chris Lee", "Maya Patel"],
      images: ["/api/placeholder/400/300"],
      type: "Innovation",
      level: "National"
    },
    {
      id: 5,
      title: "Sports Championship",
      category: "sports",
      description: "Basketball team victory in regional championships",
      date: "2024-03-25",
      location: "Sports Complex Arena",
      participants: ["Team Basketball", "Coach Martinez"],
      images: ["/api/placeholder/400/300", "/api/placeholder/400/300"],
      type: "Sports",
      level: "Regional"
    }
  ];

  // PERFECT FILTER OPTIONS
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'academic', label: 'Academic Excellence' },
    { value: 'leadership', label: 'Leadership' },
    { value: 'service', label: 'Community Service' },
    { value: 'innovation', label: 'Innovation' },
    { value: 'sports', label: 'Sports & Athletics' }
  ];

  // PERFECT FILTERED DATA
  const filteredAchievements = useMemo(() => {
    if (filterCategory === 'all') return achievementsData;
    return achievementsData.filter(achievement => achievement.category === filterCategory);
  }, [filterCategory]);

  // PERFECT HERO STATS
  const heroStats = [
    { icon: Trophy, label: 'Total Achievements', value: achievementsData.length, color: 'text-amber-600' },
    { icon: Star, label: 'Excellence Awards', value: '12+', color: 'text-blue-600' },
    { icon: Users, label: 'Students Involved', value: '25+', color: 'text-green-600' }
  ];

  // PERFECT SCROLL TO TOP
  useEffect(() => {
    scrollToTopInstant();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      
      {/* PERFECT HERO SECTION */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* PERFECT BACKGROUND ELEMENTS */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* PERFECT NAVIGATION */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link 
              to="/" 
              onClick={scrollToTopInstant}
              className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Link>
          </motion.div>

          {/* PERFECT HERO CONTENT */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Achievements</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Celebrating excellence, innovation, and outstanding accomplishments of Class 11-Newton
              </p>
            </motion.div>

            {/* PERFECT HERO STATS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {heroStats.map((stat, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* PERFECT MAIN CONTENT */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* PERFECT CONTROLS BAR - ISOLATED CONTAINER */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg p-6"
            >
              {/* PERFECT CONTROLS LAYOUT */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                
                {/* PERFECT DROPDOWN CONTAINER */}
                <div className="flex-shrink-0">
                  <PerfectDropdown
                    trigger={<Filter className="w-4 h-4" />}
                    options={categoryOptions}
                    value={filterCategory}
                    onChange={setFilterCategory}
                    placeholder="All Categories"
                    align="left"
                  />
                </div>

                {/* PERFECT VIEW TOGGLE CONTAINER */}
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
              </div>
            </motion.div>
          </div>

          {/* PERFECT ACHIEVEMENTS GRID */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex gap-6 p-6' : 'flex flex-col'
                }`}
              >
                {/* PERFECT ACHIEVEMENT IMAGE */}
                <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full h-48'} bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden`}>
                  <img 
                    src={achievement.images[0]} 
                    alt={achievement.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-amber-700 border border-amber-200">
                      {achievement.type}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-amber-600 text-white rounded-full text-xs font-medium">
                      {achievement.level}
                    </span>
                  </div>
                </div>

                {/* PERFECT ACHIEVEMENT CONTENT */}
                <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{achievement.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(achievement.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin className="w-4 h-4" />
                      <span>{achievement.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-4 h-4" />
                      <span>{achievement.participants.length} participants</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedAchievement(achievement)}
                    className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
                  >
                    <span>View Details</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* PERFECT EMPTY STATE */}
          {filteredAchievements.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Achievements Found</h3>
              <p className="text-gray-600">Try adjusting your filter to see more achievements.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* PERFECT ACHIEVEMENT MODAL */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedAchievement.title}</h2>
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {selectedAchievement.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${selectedAchievement.title} ${index + 1}`}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <p className="text-gray-700">{selectedAchievement.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Event Details</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>Date: {new Date(selectedAchievement.date).toLocaleDateString()}</div>
                        <div>Location: {selectedAchievement.location}</div>
                        <div>Level: {selectedAchievement.level}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Participants</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        {selectedAchievement.participants.map((participant, index) => (
                          <div key={index}>{participant}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PerfectAchievementsPage;