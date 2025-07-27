import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Crown, Sparkles, Users, Trophy, Search, Filter, Grid, List, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTopInstant } from '../utils/scrollToTop';
import { adviser, students } from '../data/classData';

const LeadershipPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Combine and filter data
  const allLeaders = [
    { ...adviser, type: 'adviser', category: 'Faculty' },
    ...students.filter(student => student.position && student.position !== 'Student').map(student => ({
      ...student,
      type: 'officer',
      category: 'Student Officer'
    }))
  ];

  const filteredLeaders = allLeaders.filter(leader => {
    const matchesFilter = filterType === 'all' || leader.type === filterType;
    const matchesSearch = leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (leader.position && leader.position.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      
      {/* Modern Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden navbar-offset">
        {/* Dynamic Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, #f8fafc 0%, #e0e7ff 25%, #ddd6fe 50%, #e0e7ff 75%, #f8fafc 100%)
            `
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-300/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
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
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-purple-200/50 text-purple-700 hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
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
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-100/80 backdrop-blur-sm rounded-full border border-purple-200 mb-6">
              <Crown className="w-5 h-5 text-purple-600" />
              <span className="text-purple-800 font-semibold">Leadership Excellence</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Meet Our
              <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Leaders
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the visionaries and innovators who guide Class 11-Newton towards excellence and success.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">1</div>
              <div className="text-sm text-gray-600">Class Adviser</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">{students.filter(s => s.position && s.position !== 'Student').length}+</div>
              <div className="text-sm text-gray-600">Student Officers</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100">
              <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Dedication</div>
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
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search leaders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter and View Controls */}
            <div className="flex items-center gap-4">
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filter</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-[150px]"
                    >
                      {['all', 'adviser', 'officer'].map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setFilterType(type);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                            filterType === type ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                          } ${type === 'all' ? 'rounded-t-xl' : type === 'officer' ? 'rounded-b-xl' : ''}`}
                        >
                          {type === 'all' ? 'All Leaders' : type === 'adviser' ? 'Class Adviser' : 'Student Officers'}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold text-purple-600">{filteredLeaders.length}</span> leader{filteredLeaders.length !== 1 ? 's' : ''}
              {searchTerm && (
                <span> matching "<span className="font-semibold">{searchTerm}</span>"</span>
              )}
            </p>
          </motion.div>

          {/* Leaders Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${filterType}-${searchTerm}`}
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
              {filteredLeaders.map((leader, index) => (
                <motion.div
                  key={leader.id || leader.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group ${
                    viewMode === 'grid'
                      ? 'bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
                      : 'bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300'
                  }`}
                >
                  {viewMode === 'grid' ? (
                    // Grid Card View
                    <>
                      <div className="relative h-64 overflow-hidden">
                        {leader.image ? (
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                            <Users className="w-16 h-16 text-purple-300" />
                          </div>
                        )}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            leader.type === 'adviser' 
                              ? 'bg-purple-100 text-purple-700 border border-purple-200'
                              : 'bg-blue-100 text-blue-700 border border-blue-200'
                          }`}>
                            {leader.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                        <p className="text-purple-600 font-semibold mb-3">{leader.position}</p>
                        {leader.bio && (
                          <p className="text-gray-600 text-sm line-clamp-3 mb-4">{leader.bio}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {leader.type === 'adviser' ? (
                              <Crown className="w-4 h-4 text-purple-500" />
                            ) : (
                              <Sparkles className="w-4 h-4 text-blue-500" />
                            )}
                            <span className="text-sm text-gray-500">{leader.type === 'adviser' ? 'Faculty' : 'Officer'}</span>
                          </div>
                          <Trophy className="w-4 h-4 text-amber-500" />
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex items-center gap-6">
                      <div className="flex-shrink-0">
                        {leader.image ? (
                          <img
                            src={leader.image}
                            alt={leader.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                            <Users className="w-8 h-8 text-purple-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{leader.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            leader.type === 'adviser' 
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {leader.category}
                          </span>
                        </div>
                        <p className="text-purple-600 font-semibold mb-2">{leader.position}</p>
                        {leader.bio && (
                          <p className="text-gray-600 text-sm line-clamp-2">{leader.bio}</p>
                        )}
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-2">
                        {leader.type === 'adviser' ? (
                          <Crown className="w-5 h-5 text-purple-500" />
                        ) : (
                          <Sparkles className="w-5 h-5 text-blue-500" />
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredLeaders.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No leaders found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                }}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-20 p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl border border-purple-100"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Meet Everyone?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore our complete student directory and discover the amazing individuals that make up Class 11-Newton.
            </p>
            <Link
              to="/students"
              onClick={scrollToTopInstant}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl hover:from-purple-700 hover:to-blue-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Users className="w-6 h-6" />
              <span className="font-semibold">Meet All Students</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;