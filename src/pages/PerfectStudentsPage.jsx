import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Star, Heart, MapPin, Calendar, Mail, Github, Instagram, Twitter, Filter, Grid, List, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { scrollToTopInstant } from '../utils/scrollToTop';
import { students } from '../data/classData';
import PerfectDropdown from '../components/PerfectDropdown';

// PERFECT STUDENTS PAGE - REVOLUTIONARY ARCHITECTURE
// ================================================================

const PerfectStudentsPage = () => {
  // PERFECT STATE MANAGEMENT
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 12;

  // PERFECT SORT OPTIONS
  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'position', label: 'Position' },
    { value: 'dreamJob', label: 'Dream Job' }
  ];

  // PERFECT FILTERED AND SORTED DATA
  const processedStudents = useMemo(() => {
    let filtered = students.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.position?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.dreamJob?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.funFact?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort students
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'position':
          return (a.position || 'Student').localeCompare(b.position || 'Student');
        case 'dreamJob':
          return (a.dreamJob || '').localeCompare(b.dreamJob || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, sortBy]);

  // PERFECT PAGINATION
  const totalPages = Math.ceil(processedStudents.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const endIndex = startIndex + studentsPerPage;
  const currentStudents = processedStudents.slice(startIndex, endIndex);

  // Reset page when search/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  // PERFECT HERO STATS
  const heroStats = [
    { icon: Users, label: 'Total Students', value: students.length, color: 'text-blue-600' },
    { icon: Star, label: 'Class Officers', value: students.filter(s => s.position && s.position !== 'Student').length + '+', color: 'text-purple-600' },
    { icon: Heart, label: 'Unity & Excellence', value: '100%', color: 'text-green-600' }
  ];

  // PERFECT SCROLL TO TOP
  useEffect(() => {
    scrollToTopInstant();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* PERFECT HERO SECTION */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* PERFECT BACKGROUND ELEMENTS */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
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
              className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 transition-colors group"
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
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Students</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the amazing individuals who make up Class 11-Newton - their dreams, talents, and unique stories
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
                  placeholder="Search by name, role, dream job, or fun fact..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
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
                    options={sortOptions}
                    value={sortBy}
                    onChange={setSortBy}
                    placeholder="Sort"
                    align="left"
                  />
                </div>

                {/* PERFECT VIEW TOGGLE CONTAINER */}
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
              </div>
            </motion.div>
          </div>

          {/* PERFECT STUDENTS GRID */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            {currentStudents.map((student, index) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  viewMode === 'list' ? 'flex gap-6 p-6' : 'flex flex-col'
                }`}
              >
                {/* PERFECT STUDENT IMAGE */}
                <div className={`${viewMode === 'list' ? 'w-32 flex-shrink-0' : 'w-full h-48'} relative overflow-hidden`}>
                  <img 
                    src={student.photo} 
                    alt={student.name}
                    className="w-full h-full object-cover"
                  />
                  {student.position && student.position !== 'Student' && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                        {student.position}
                      </span>
                    </div>
                  )}
                </div>

                {/* PERFECT STUDENT CONTENT */}
                <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{student.name}</h3>
                    <p className="text-blue-600 font-medium text-sm">{student.position || 'Student'}</p>
                  </div>

                  {student.motto && (
                    <p className="text-gray-600 text-sm mb-3 italic line-clamp-2">"{student.motto}"</p>
                  )}

                  <div className="space-y-1 mb-3 text-xs text-gray-500">
                    {student.dreamJob && (
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        <span className="line-clamp-1">{student.dreamJob}</span>
                      </div>
                    )}
                    {student.funFact && (
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        <span className="line-clamp-1">{student.funFact}</span>
                      </div>
                    )}
                  </div>

                  {/* PERFECT SOCIAL LINKS */}
                  <div className="flex gap-2 mb-3">
                    {student.instagram && (
                      <a
                        href={student.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md hover:scale-110 transition-transform"
                      >
                        <Instagram className="w-3 h-3" />
                      </a>
                    )}
                    {student.github && (
                      <a
                        href={student.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-gray-800 text-white rounded-md hover:scale-110 transition-transform"
                      >
                        <Github className="w-3 h-3" />
                      </a>
                    )}
                    {student.twitter && (
                      <a
                        href={student.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-blue-500 text-white rounded-md hover:scale-110 transition-transform"
                      >
                        <Twitter className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    View Profile →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* PERFECT PAGINATION */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center items-center gap-2 mt-12"
            >
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* PERFECT EMPTY STATE */}
          {processedStudents.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Students Found</h3>
              <p className="text-gray-600">Try adjusting your search to see more students.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* PERFECT STUDENT MODAL */}
      <AnimatePresence>
        {selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStudent(null)}
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
                      src={selectedStudent.photo}
                      alt={selectedStudent.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h2>
                      <p className="text-blue-600 font-medium">{selectedStudent.position || 'Student'}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  {selectedStudent.motto && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Personal Motto</h4>
                      <p className="text-gray-700 italic">"{selectedStudent.motto}"</p>
                    </div>
                  )}

                  {selectedStudent.funFact && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Fun Fact</h4>
                      <p className="text-gray-700">{selectedStudent.funFact}</p>
                    </div>
                  )}

                  {selectedStudent.dreamJob && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Dream Job</h4>
                      <p className="text-gray-700">{selectedStudent.dreamJob}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Social Links</h4>
                      <div className="flex gap-3">
                        {selectedStudent.instagram && (
                          <a
                            href={selectedStudent.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:scale-110 transition-transform"
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}
                        {selectedStudent.github && (
                          <a
                            href={selectedStudent.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-gray-800 text-white rounded-lg hover:scale-110 transition-transform"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {selectedStudent.twitter && (
                          <a
                            href={selectedStudent.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-blue-500 text-white rounded-lg hover:scale-110 transition-transform"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
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

export default PerfectStudentsPage;