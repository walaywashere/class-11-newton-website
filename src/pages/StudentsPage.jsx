import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Heart, Star, BookOpen, Trophy, Search, Filter, Grid, List, ChevronDown, MapPin, Calendar, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTopInstant } from '../utils/scrollToTop';
import { students } from '../data/classData';

const StudentsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.bio && student.bio.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.hobbies && student.hobbies.some(hobby => hobby.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    // Sort students
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'position':
          if (a.position && !b.position) return -1;
          if (!a.position && b.position) return 1;
          if (a.position && b.position) return a.position.localeCompare(b.position);
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [students, searchTerm, sortBy]);

  const StudentModal = ({ student, onClose }) => (
    <AnimatePresence>
      {student && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {student.image ? (
                <img
                  src={student.image}
                  alt={student.name}
                  className="w-full h-64 object-cover rounded-t-3xl"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded-t-3xl">
                  <Users className="w-24 h-24 text-blue-300" />
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h2>
                  {student.position && (
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {student.position}
                    </span>
                  )}
                </div>
              </div>
              
              {student.bio && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-600 leading-relaxed">{student.bio}</p>
                </div>
              )}
              
              {student.hobbies && student.hobbies.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests & Hobbies</h3>
                  <div className="flex flex-wrap gap-2">
                    {student.hobbies.map((hobby, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Unique Individual</p>
                </div>
                <div className="text-center">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Future Leader</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* Modern Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden navbar-offset">
        {/* Dynamic Background */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.10) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
              linear-gradient(135deg, #f1f5f9 0%, #e0e7ff 25%, #ede9fe 50%, #e0e7ff 75%, #f1f5f9 100%)
            `
          }}
        />

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-400/40 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.8, 1]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
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
              className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border border-blue-200/50 text-blue-700 hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg"
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
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-blue-100/80 backdrop-blur-sm rounded-full border border-blue-200 mb-6">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-semibold">Student Directory</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Our Amazing
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Students
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the brilliant minds, unique personalities, and future leaders that make Class 11-Newton extraordinary.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-16"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-100">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{students.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Students</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-100">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">{students.filter(s => s.position && s.position !== 'Student').length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Student Leaders</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-emerald-100">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-2">100%</div>
              <div className="text-xs sm:text-sm text-gray-600">Unique Stories</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-amber-100">
              <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-2">∞</div>
              <div className="text-xs sm:text-sm text-gray-600">Potential</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Enhanced Controls Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-12 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search students by name, bio, or interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Sort</span>
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
                      {[
                        { value: 'name', label: 'By Name' },
                        { value: 'position', label: 'By Position' }
                      ].map((sort) => (
                        <button
                          key={sort.value}
                          onClick={() => {
                            setSortBy(sort.value);
                            setShowFilters(false);
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                            sortBy === sort.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                          } ${sort.value === 'name' ? 'rounded-t-xl' : 'rounded-b-xl'}`}
                        >
                          {sort.label}
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
                    viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
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
              Showing <span className="font-semibold text-blue-600">{filteredAndSortedStudents.length}</span> student{filteredAndSortedStudents.length !== 1 ? 's' : ''}
              {searchTerm && (
                <span> matching "<span className="font-semibold">{searchTerm}</span>"</span>
              )}
            </p>
          </motion.div>

          {/* Students Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${sortBy}-${searchTerm}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredAndSortedStudents.map((student, index) => (
                <motion.div
                  key={student.id || student.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`group cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2'
                      : 'bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-lg transition-all duration-300'
                  }`}
                  onClick={() => setSelectedStudent(student)}
                >
                  {viewMode === 'grid' ? (
                    // Grid Card View
                    <>
                      <div className="relative h-48 overflow-hidden">
                        {student.image ? (
                          <img
                            src={student.image}
                            alt={student.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <Users className="w-12 h-12 text-blue-300" />
                          </div>
                        )}
                        {student.position && student.position !== 'Student' && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                              {student.position}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{student.name}</h3>
                        {student.bio && (
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{student.bio}</p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4 text-red-400" />
                            <span className="text-xs text-gray-500">Unique</span>
                          </div>
                          <Star className="w-4 h-4 text-yellow-400" />
                        </div>
                      </div>
                    </>
                  ) : (
                    // List View
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {student.image ? (
                          <img
                            src={student.image}
                            alt={student.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-300" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900 truncate">{student.name}</h3>
                          {student.position && student.position !== 'Student' && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex-shrink-0">
                              {student.position}
                            </span>
                          )}
                        </div>
                        {student.bio && (
                          <p className="text-gray-600 text-sm line-clamp-1">{student.bio}</p>
                        )}
                      </div>
                      <div className="flex-shrink-0 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-400" />
                        <Star className="w-4 h-4 text-yellow-400" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredAndSortedStudents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Clear Search
              </button>
            </motion.div>
          )}

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-20 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border border-blue-100"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Want to Learn More?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover our leadership team and see how these amazing students contribute to our class excellence.
            </p>
            <Link
              to="/leadership"
              onClick={scrollToTopInstant}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              <Trophy className="w-6 h-6" />
              <span className="font-semibold">Meet Our Leaders</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Student Detail Modal */}
      <StudentModal 
        student={selectedStudent} 
        onClose={() => setSelectedStudent(null)} 
      />
    </div>
  );
};

export default StudentsPage;