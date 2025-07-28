import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Heart, Star, BookOpen, Trophy, Search, Filter, Grid, List, ChevronDown, MapPin, Calendar, Award, Instagram, Target, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTopInstant } from '../utils/scrollToTop';
import { students } from '../data/classData';
import GlobalDropdown from '../components/GlobalDropdown';

const StudentsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 12; // 12 students per page for better UX

  const sortOptions = [
    { value: 'name', label: 'By Name' },
    { value: 'role', label: 'By Position' },
    { value: 'dreamJob', label: 'By Dream Job' }
  ];

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let filtered = students.filter(student => 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (student.dreamJob && student.dreamJob.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.funFact && student.funFact.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (student.role && student.role.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort students
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'role':
          if (a.role && !b.role) return -1;
          if (!a.role && b.role) return 1;
          if (a.role && b.role) return a.role.localeCompare(b.role);
          return a.name.localeCompare(b.name);
        case 'dreamJob':
          if (a.dreamJob && !b.dreamJob) return -1;
          if (!a.dreamJob && b.dreamJob) return 1;
          if (a.dreamJob && b.dreamJob) return a.dreamJob.localeCompare(b.dreamJob);
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [students, searchTerm, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = filteredAndSortedStudents.slice(startIndex, endIndex);

  // Reset to first page when search/sort changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  const StudentModal = ({ student, onClose }) => (
    <AnimatePresence>
      {student && (
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
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {student.photo ? (
                <div className="w-full h-64 overflow-hidden rounded-t-3xl">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-full h-full object-cover"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded-t-3xl">
                  <Users className="w-24 h-24 text-blue-300" />
                </div>
              )}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-[9999999] shadow-lg"
                style={{ fontSize: '20px', fontWeight: 'bold' }}
              >
                ×
              </button>
              {student.role && (
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold border border-blue-200">
                    {student.role}
                  </span>
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h2>
                  <div className="flex items-center gap-4">
                    {student.dreamJob && (
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700 font-medium">{student.dreamJob}</span>
                      </div>
                    )}
                    {student.socials?.instagram && (
                      <a 
                        href={`https://instagram.com/${student.socials.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                        <span className="font-medium">@{student.socials.instagram}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {student.quote && (
                <div className="mb-6 p-4 bg-blue-50 rounded-2xl border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    Motto
                  </h3>
                  <p className="text-gray-700 italic">"{student.quote}"</p>
                </div>
              )}
              
              {student.funFact && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-600" />
                    Fun Fact
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{student.funFact}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Unique Individual</p>
                </div>
                <div className="text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
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
      
      {/* Mobile First Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32">
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
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight">
              Our Amazing
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Students
              </span>
            </h1>
            
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Meet the brilliant minds, unique personalities, and future leaders that make Class 11-Newton extraordinary.
            </p>
          </motion.div>

          {/* Quick Stats - Adaptive Sizing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 max-w-5xl mx-auto mb-12 sm:mb-16"
          >
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-blue-100 flex-1 min-w-[140px] max-w-[200px] text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">{students.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Total Students</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-purple-100 flex-1 min-w-[140px] max-w-[200px] text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">{students.filter(s => s.role).length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Class Officers</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-emerald-100 flex-1 min-w-[140px] max-w-[200px] text-center">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-2">100%</div>
              <div className="text-xs sm:text-sm text-gray-600">Unique Stories</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-amber-100 flex-1 min-w-[140px] max-w-[200px] text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-2">∞</div>
              <div className="text-xs sm:text-sm text-gray-600">Dreams</div>
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
            className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-12 p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200 shadow-lg"
          >
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, role, dream job, or fun fact..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Sort Dropdown - Global System (Direct Child like Achievements) */}
            <GlobalDropdown
              trigger={<Filter className="w-4 h-4" />}
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort"
              align="left"
              className="flex-shrink-0"
            />

            {/* View Mode Toggle - Perfect Mobile Alignment */}
            <div className="flex bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-colors flex items-center justify-center min-w-[44px] min-h-[44px] ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Results Count and Pagination Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <p className="text-gray-600">
              Showing <span className="font-semibold text-blue-600">{currentStudents.length}</span> of <span className="font-semibold text-blue-600">{filteredAndSortedStudents.length}</span> student{filteredAndSortedStudents.length !== 1 ? 's' : ''}
              {searchTerm && (
                <span> matching "<span className="font-semibold">{searchTerm}</span>"</span>
              )}
            </p>
            {totalPages > 1 && (
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </motion.div>

          {/* Students Grid/List */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewMode}-${sortBy}-${searchTerm}-${currentPage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6'
                  : 'space-y-3 sm:space-y-4'
              }
            >
              {currentStudents.map((student, index) => (
                <motion.div
                  key={student.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                                      className={`group cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1'
                        : 'bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 hover:shadow-lg transition-all duration-300'
                    }`}
                  onClick={() => setSelectedStudent(student)}
                >
                  {viewMode === 'grid' ? (
                    // Grid Card View - Fixed sizing
                    <>
                                              <div className="relative overflow-hidden h-40 sm:h-48 lg:h-52">
                        {student.photo ? (
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-full h-full object-cover"
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <Users className="w-12 h-12 text-blue-300" />
                          </div>
                        )}
                        {student.role && (
                          <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold border border-blue-200">
                              {student.role}
                            </span>
                          </div>
                        )}
                        {student.socials?.instagram && (
                          <div className="absolute bottom-3 right-3">
                            <div className="p-2 bg-pink-100 rounded-full border border-pink-200">
                              <Instagram className="w-3 h-3 text-pink-600" />
                            </div>
                          </div>
                        )}
                      </div>
                                              <div className="p-3 sm:p-4">
                          <div className="mb-2 sm:mb-3">
                            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-1 line-clamp-1">{student.name}</h3>
                            {student.dreamJob && (
                              <p className="text-emerald-600 font-medium text-xs sm:text-sm line-clamp-1">{student.dreamJob}</p>
                            )}
                          </div>
                          {student.funFact && (
                            <p className="text-gray-600 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3">{student.funFact}</p>
                          )}
                          {student.quote && (
                            <p className="text-blue-600 text-xs sm:text-sm italic line-clamp-2 mb-2 sm:mb-3">"{student.quote}"</p>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                              <span className="text-xs text-gray-500">Unique</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                            </div>
                          </div>
                        </div>
                    </>
                  ) : (
                    // List View - Fixed sizing and better mobile layout
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 relative">
                        {student.photo ? (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                            <img
                              src={student.photo}
                              alt={student.name}
                              className="w-full h-full object-cover"
                              style={{ objectFit: 'cover', objectPosition: 'center' }}
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <Users className="w-8 h-8 text-blue-300" />
                          </div>
                        )}
                        {student.socials?.instagram && (
                          <div className="absolute -bottom-1 -right-1 p-1 bg-pink-100 rounded-full border-2 border-white">
                            <Instagram className="w-3 h-3 text-pink-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">{student.name}</h3>
                          {student.role && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex-shrink-0 w-fit">
                              {student.role}
                            </span>
                          )}
                        </div>
                        {student.dreamJob && (
                          <p className="text-emerald-600 font-medium text-sm mb-1 truncate">{student.dreamJob}</p>
                        )}
                        {student.funFact && (
                          <p className="text-gray-600 text-sm line-clamp-1">{student.funFact}</p>
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

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center items-center gap-2 mt-12"
            >
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>
              
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = pageNumber === currentPage;
                  
                  // Show first page, last page, current page, and pages around current
                  const showPage = pageNumber === 1 || 
                                  pageNumber === totalPages || 
                                  Math.abs(pageNumber - currentPage) <= 1;
                  
                  if (!showPage) {
                    // Show ellipsis
                    if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                      return <span key={pageNumber} className="px-2 text-gray-400">...</span>;
                    }
                    return null;
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                        isCurrentPage
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

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