import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Crown, Users, Star, Award, Heart, MapPin, Calendar, Mail, Github, Instagram, Twitter, Filter, Grid, List, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTopInstant } from '../utils/scrollToTop';
import { adviser, students } from '../data/classData';
import PerfectDropdown from '../components/PerfectDropdown';

// PERFECT LEADERSHIP PAGE - REVOLUTIONARY ARCHITECTURE
// ================================================================

const PerfectLeadershipPage = () => {
  // PERFECT STATE MANAGEMENT
  const [viewMode, setViewMode] = useState('grid');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLeader, setSelectedLeader] = useState(null);

  // PERFECT LEADERSHIP DATA
  const leadershipData = useMemo(() => {
    const classOfficers = students.filter(student => student.position && student.position !== 'Student');
    return {
      adviser: adviser,
      officers: classOfficers
    };
  }, []);

  // PERFECT FILTER OPTIONS
  const filterOptions = [
    { value: 'all', label: 'All Leaders' },
    { value: 'adviser', label: 'Class Adviser' },
    { value: 'officers', label: 'Class Officers' }
  ];

  // PERFECT FILTERED DATA
  const filteredLeaders = useMemo(() => {
    let leaders = [];
    
    if (filterType === 'all' || filterType === 'adviser') {
      leaders.push({ ...leadershipData.adviser, type: 'adviser' });
    }
    
    if (filterType === 'all' || filterType === 'officers') {
      leaders.push(...leadershipData.officers.map(officer => ({ ...officer, type: 'officer' })));
    }

    // Apply search filter
    if (searchTerm) {
      leaders = leaders.filter(leader =>
        leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leader.position?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return leaders;
  }, [leadershipData, filterType, searchTerm]);

  // PERFECT HERO STATS
  const heroStats = [
    { icon: Crown, label: 'Class Adviser', value: '1', color: 'text-purple-600' },
    { icon: Users, label: 'Student Officers', value: leadershipData.officers.length + '+', color: 'text-blue-600' },
    { icon: Star, label: 'Leadership Excellence', value: '100%', color: 'text-green-600' }
  ];

  // PERFECT SCROLL TO TOP
  useEffect(() => {
    scrollToTopInstant();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      
      {/* PERFECT HERO SECTION */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* PERFECT BACKGROUND ELEMENTS */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
              className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 transition-colors group"
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
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Leadership</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Meet the dedicated leaders who guide and inspire Class 11-Newton towards excellence
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
          
          {/* PERFECT SEARCH BAR - ISOLATED CONTAINER */}
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-md mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search leaders by name or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-sm"
                />
              </div>
            </motion.div>
          </div>

          {/* PERFECT CONTROLS BAR - ISOLATED CONTAINER */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg p-6"
            >
              {/* PERFECT CONTROLS LAYOUT */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                
                {/* PERFECT DROPDOWN CONTAINER */}
                <div className="flex-shrink-0">
                  <PerfectDropdown
                    trigger={<Filter className="w-4 h-4" />}
                    options={filterOptions}
                    value={filterType}
                    onChange={setFilterType}
                    placeholder="Filter"
                    align="left"
                  />
                </div>

                {/* PERFECT VIEW TOGGLE CONTAINER */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] ${
                      viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] ${
                      viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* PERFECT LEADERSHIP GRID */}
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
            {filteredLeaders.map((leader, index) => (
              <motion.div
                key={`${leader.type}-${leader.id || leader.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex gap-6 p-6' : 'flex flex-col'
                } ${leader.type === 'adviser' ? 'ring-2 ring-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50' : ''}`}
              >
                {/* PERFECT LEADER IMAGE */}
                <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full h-64'} relative overflow-hidden`}>
                  <img 
                    src={leader.photo} 
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                  {leader.type === 'adviser' && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-medium flex items-center gap-1">
                        <Crown className="w-3 h-3" />
                        Class Adviser
                      </span>
                    </div>
                  )}
                  {leader.position && leader.type === 'officer' && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 border border-gray-200">
                        {leader.position}
                      </span>
                    </div>
                  )}
                </div>

                {/* PERFECT LEADER CONTENT */}
                <div className={`${viewMode === 'list' ? 'flex-1' : 'p-6'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                      <p className="text-purple-600 font-medium">{leader.position || 'Class Adviser'}</p>
                    </div>
                    {leader.type === 'adviser' && (
                      <Crown className="w-6 h-6 text-purple-600 flex-shrink-0" />
                    )}
                  </div>

                  {leader.motto && (
                    <p className="text-gray-600 mb-4 italic">"{leader.motto}"</p>
                  )}

                  <div className="space-y-2 mb-4">
                    {leader.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="w-4 h-4" />
                        <span>{leader.email}</span>
                      </div>
                    )}
                    {leader.subjects && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Award className="w-4 h-4" />
                        <span>{leader.subjects.join(', ')}</span>
                      </div>
                    )}
                    {leader.dreamJob && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Star className="w-4 h-4" />
                        <span>{leader.dreamJob}</span>
                      </div>
                    )}
                  </div>

                  {/* PERFECT SOCIAL LINKS */}
                  {(leader.instagram || leader.github || leader.twitter) && (
                    <div className="flex gap-3 mb-4">
                      {leader.instagram && (
                        <a
                          href={leader.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:scale-110 transition-transform"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {leader.github && (
                        <a
                          href={leader.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-800 text-white rounded-lg hover:scale-110 transition-transform"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {leader.twitter && (
                        <a
                          href={leader.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-500 text-white rounded-lg hover:scale-110 transition-transform"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedLeader(leader)}
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                  >
                    <span>View Profile</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* PERFECT EMPTY STATE */}
          {filteredLeaders.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Crown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Leaders Found</h3>
              <p className="text-gray-600">Try adjusting your search or filter to see more leaders.</p>
            </motion.div>
          )}

          {/* PERFECT CTA SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center mt-16"
          >
            <Link
              to="/students"
              onClick={scrollToTopInstant}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 hover:scale-105 hover:shadow-2xl transition-all duration-300 shadow-xl"
            >
              <Users className="w-6 h-6" />
              Meet All Classmates
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PERFECT LEADER MODAL */}
      <AnimatePresence>
        {selectedLeader && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedLeader(null)}
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
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedLeader.photo}
                      alt={selectedLeader.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedLeader.name}</h2>
                      <p className="text-purple-600 font-medium">{selectedLeader.position || 'Class Adviser'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLeader(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {selectedLeader.motto && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Personal Motto</h4>
                      <p className="text-gray-700 italic">"{selectedLeader.motto}"</p>
                    </div>
                  )}

                  {selectedLeader.funFact && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Fun Fact</h4>
                      <p className="text-gray-700">{selectedLeader.funFact}</p>
                    </div>
                  )}

                  {selectedLeader.dreamJob && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Dream Job</h4>
                      <p className="text-gray-700">{selectedLeader.dreamJob}</p>
                    </div>
                  )}

                  {selectedLeader.subjects && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Subjects</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLeader.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedLeader.email && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${selectedLeader.email}`} className="hover:text-purple-600 transition-colors">
                          {selectedLeader.email}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PerfectLeadershipPage;