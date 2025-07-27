import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Crown, Sparkles, Users, Trophy, Search, Filter, Grid, List, ChevronDown, Instagram, Target, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTopInstant } from '../utils/scrollToTop';
import { adviser, students } from '../data/classData';

const LeadershipPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get class officers from students
  const classOfficers = students.filter(student => student.role);

  // Filter officers based on search and filter
  const filteredOfficers = classOfficers.filter(officer => {
    const matchesFilter = filterType === 'all' || filterType === 'officers';
    const matchesSearch = officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (officer.role && officer.role.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (officer.dreamJob && officer.dreamJob.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Check if adviser matches search
  const adviserMatches = filterType !== 'officers' && (
    adviser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (adviser.role && adviser.role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const showAdviser = (filterType === 'all' || filterType === 'adviser') && adviserMatches;

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
              <div className="text-3xl font-bold text-blue-600 mb-2">{classOfficers.length}</div>
              <div className="text-sm text-gray-600">Class Officers</div>
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
                placeholder="Search leaders by name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter and View Controls */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              {/* Filter Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors min-w-[120px] justify-center"
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
                      className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-xl shadow-xl z-50 min-w-[180px]"
                    >
                      {['all', 'adviser', 'officers'].map((type) => (
                        <button
                          key={type}
                          onClick={() => {
                            setFilterType(type);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                            filterType === type ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                          } ${type === 'all' ? 'rounded-t-xl' : type === 'officers' ? 'rounded-b-xl' : ''}`}
                        >
                          {type === 'all' ? 'All Leaders' : type === 'adviser' ? 'Class Adviser' : 'Class Officers'}
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

          {/* Class Adviser Section - Highlighted */}
          {showAdviser && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Class Adviser</h2>
                <p className="text-gray-600">The guiding force behind Class 11-Newton's success</p>
              </div>
              
              <div className="max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 border-2 border-purple-200 shadow-xl"
                >
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      {adviser.photo ? (
                        <img
                          src={adviser.photo}
                          alt={adviser.name}
                          className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mx-auto border-4 border-white shadow-lg">
                          <Crown className="w-16 h-16 text-purple-400" />
                        </div>
                      )}
                      <div className="absolute -top-2 -right-2 p-2 bg-purple-600 rounded-full">
                        <Crown className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{adviser.name}</h3>
                    <p className="text-purple-600 font-semibold mb-4">{adviser.role}</p>
                    
                    {adviser.fact && (
                      <div className="bg-white/70 rounded-2xl p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-5 h-5 text-purple-600" />
                          <span className="text-sm font-semibold text-gray-900">Fun Fact</span>
                        </div>
                        <p className="text-gray-700">{adviser.fact}</p>
                      </div>
                    )}
                    
                    <div className="flex justify-center gap-4">
                      <div className="text-center">
                        <Trophy className="w-8 h-8 text-amber-500 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Excellence</p>
                      </div>
                      <div className="text-center">
                        <Heart className="w-8 h-8 text-red-500 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Dedication</p>
                      </div>
                      <div className="text-center">
                        <Users className="w-8 h-8 text-blue-500 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Leadership</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Class Officers Section */}
          {(filterType === 'all' || filterType === 'officers') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: showAdviser ? 0.3 : 0 }}
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Class Officers</h2>
                <p className="text-gray-600">
                  Showing <span className="font-semibold text-purple-600">{filteredOfficers.length}</span> officer{filteredOfficers.length !== 1 ? 's' : ''}
                  {searchTerm && (
                    <span> matching "<span className="font-semibold">{searchTerm}</span>"</span>
                  )}
                </p>
              </div>

              {/* Officers Grid/List */}
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
                  {filteredOfficers.map((officer, index) => (
                    <motion.div
                      key={officer.name}
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
                        // Grid Card View - Fixed sizing
                        <>
                          <div className="relative overflow-hidden" style={{ height: '240px' }}>
                            {officer.photo ? (
                              <img
                                src={officer.photo}
                                alt={officer.name}
                                className="w-full h-full object-cover"
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                <Users className="w-16 h-16 text-blue-300" />
                              </div>
                            )}
                            <div className="absolute top-4 right-4">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                                {officer.role}
                              </span>
                            </div>
                            {officer.socials?.instagram && (
                              <div className="absolute bottom-4 right-4">
                                <div className="p-2 bg-pink-100 rounded-full border border-pink-200">
                                  <Instagram className="w-4 h-4 text-pink-600" />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="p-6">
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{officer.name}</h3>
                              {officer.dreamJob && (
                                <p className="text-emerald-600 font-medium text-sm">{officer.dreamJob}</p>
                              )}
                            </div>
                            
                            {officer.quote && (
                              <div className="bg-blue-50 rounded-lg p-3 mb-4">
                                <p className="text-blue-700 text-sm italic">"{officer.quote}"</p>
                              </div>
                            )}
                            
                            {officer.funFact && (
                              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{officer.funFact}</p>
                            )}
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-blue-500" />
                                <span className="text-sm text-gray-500">Officer</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {officer.dreamJob && <Target className="w-4 h-4 text-emerald-400" />}
                                <Trophy className="w-4 h-4 text-amber-500" />
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        // List View - Fixed sizing
                        <div className="flex items-center gap-4 sm:gap-6">
                          <div className="flex-shrink-0 relative">
                            {officer.photo ? (
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                                <img
                                  src={officer.photo}
                                  alt={officer.name}
                                  className="w-full h-full object-cover"
                                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                <Users className="w-8 h-8 text-blue-300" />
                              </div>
                            )}
                            {officer.socials?.instagram && (
                              <div className="absolute -bottom-1 -right-1 p-1 bg-pink-100 rounded-full border-2 border-white">
                                <Instagram className="w-3 h-3 text-pink-600" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">{officer.name}</h3>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                {officer.role}
                              </span>
                            </div>
                            {officer.dreamJob && (
                              <p className="text-emerald-600 font-medium text-sm mb-1">{officer.dreamJob}</p>
                            )}
                            {officer.funFact && (
                              <p className="text-gray-600 text-sm line-clamp-1">{officer.funFact}</p>
                            )}
                          </div>
                          <div className="flex-shrink-0 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-blue-500" />
                            <Trophy className="w-5 h-5 text-amber-500" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* No Officers Results */}
              {filteredOfficers.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No officers found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your search criteria.</p>
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
            </motion.div>
          )}

          {/* No Results at all */}
          {!showAdviser && filteredOfficers.length === 0 && (
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