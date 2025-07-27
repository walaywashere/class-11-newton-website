import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Briefcase, Sparkles, Instagram, Search, ChevronLeft, ChevronRight, Users, Heart, Target, Smile } from 'lucide-react';

const StudentCard = ({ student, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const flipCard = useCallback(() => setIsFlipped(prev => !prev), []);
  const handleLinkClick = useCallback((e) => e.stopPropagation(), []);

  if (!student || !student.name) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.5) }}
      className="group"
    >
      <div 
        className="w-full aspect-[3/4] cursor-pointer" 
        style={{ perspective: '1000px' }}
        onClick={flipCard}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            flipCard();
          }
        }}
        aria-label={`View details for ${student.name}`}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Front of the Card */}
          <div 
            className="absolute w-full h-full rounded-2xl overflow-hidden shadow-large border border-neutral-200 group-hover:shadow-glow transition-all duration-300"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="relative w-full h-full">
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton" />
              )}
              
              <img 
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                src={student.photo} 
                alt={`Photo of ${student.name}`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f1f5f9"/%3E%3Ctext x="100" y="100" text-anchor="middle" dy="0.35em" font-family="system-ui" font-size="14" fill="%2364748b"%3ENo Image%3C/text%3E%3C/svg%3E';
                  setImageLoaded(true);
                }}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Role badge */}
              {student.role && student.role !== 'Student' && (
                <div className="absolute top-4 left-4 px-3 py-1 glass text-white text-xs font-semibold rounded-full">
                  {student.role}
                </div>
              )}
              
              {/* Flip indicator */}
              <div className="absolute top-4 right-4 w-8 h-8 glass rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  animate={{ rotate: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </div>
              
              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-1">{student.name}</h3>
                {student.dreamJob && (
                  <p className="text-sm text-white/80 flex items-center gap-2">
                    <Target className="w-3 h-3" />
                    {student.dreamJob}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Back of the Card */}
          <div 
            className="absolute w-full h-full rounded-2xl bg-white shadow-large border border-neutral-200 overflow-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-4 text-white">
                <h3 className="text-lg font-bold mb-1">{student.name}</h3>
                {student.role && (
                  <p className="text-xs text-white/80">{student.role}</p>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 p-4 space-y-4">
                {/* Dream Job */}
                {student.dreamJob && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Dream Career</p>
                      <p className="text-sm font-medium text-neutral-900">{student.dreamJob}</p>
                    </div>
                  </div>
                )}
                
                {/* Fun Fact */}
                {student.funFact && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Smile className="w-4 h-4 text-accent-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide">Fun Fact</p>
                      <p className="text-sm text-neutral-700 leading-relaxed">{student.funFact}</p>
                    </div>
                  </div>
                )}
                
                {/* Quote */}
                {student.quote && (
                  <div className="bg-neutral-50 rounded-xl p-3 border-l-4 border-primary-400">
                    <p className="text-sm italic text-neutral-700 leading-relaxed">"{student.quote}"</p>
                  </div>
                )}
              </div>
              
              {/* Footer */}
              <div className="p-4 bg-neutral-50 border-t border-neutral-100">
                {student.socials?.instagram ? (
                  <a
                    href={`https://instagram.com/${student.socials.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleLinkClick}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg text-xs font-semibold hover:scale-105 transition-transform"
                  >
                    <Instagram className="w-3 h-3" />
                    @{student.socials.instagram}
                  </a>
                ) : (
                  <div className="text-center text-xs text-neutral-400">
                    Tap to flip back
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StudentShowcase = ({ students = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const studentsPerPage = 12;

  // Filter students based on search with error handling
  const filteredStudents = useMemo(() => {
    if (!Array.isArray(students)) return [];
    return students.filter(student => 
      student && student.name && (
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.dreamJob && student.dreamJob.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (student.role && student.role.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    );
  }, [students, searchTerm]);

  // Pagination logic
  const paginationData = useMemo(() => {
    const totalStudents = filteredStudents.length;
    const totalPages = Math.ceil(totalStudents / studentsPerPage);
    const startIndex = (currentPage - 1) * studentsPerPage;
    const endIndex = startIndex + studentsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, endIndex);

    return {
      totalStudents,
      totalPages,
      currentStudents,
      startIndex,
      endIndex: Math.min(endIndex, totalStudents)
    };
  }, [filteredStudents, currentPage, studentsPerPage]);

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Generate page numbers for pagination
  const pageNumbers = useMemo(() => {
    const { totalPages } = paginationData;
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    const pages = [];
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    
    return pages;
  }, [currentPage, paginationData]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-primary-50/30 to-accent-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full text-primary-700 text-sm font-medium">
            <Users className="w-4 h-4" />
            Our Amazing Class
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Meet Our
            <span className="block gradient-text bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Brilliant Minds
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover the unique stories, dreams, and personalities that make Class 11-Newton extraordinary.
          </p>

          {/* Search Bar - Mobile responsive */}
          <div className="max-w-md mx-auto relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
            </div>
            <input
              type="text"
              placeholder="Search students, careers, roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white border border-neutral-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base text-neutral-900 placeholder-neutral-500 shadow-soft"
            />
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <div className="px-4 py-2 bg-white rounded-xl shadow-soft border border-neutral-100">
            <span className="text-sm text-neutral-600">
              Showing <span className="font-semibold text-primary-600">{paginationData.currentStudents.length}</span> of{' '}
              <span className="font-semibold text-primary-600">{paginationData.totalStudents}</span> students
            </span>
          </div>
          {searchTerm && (
            <div className="px-4 py-2 bg-accent-50 rounded-xl border border-accent-200">
              <span className="text-sm text-accent-700">
                Searching for: <span className="font-semibold">"{searchTerm}"</span>
              </span>
            </div>
          )}
        </motion.div>

        {/* Students Grid */}
        <AnimatePresence mode="wait">
          {paginationData.currentStudents.length > 0 ? (
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 xl:gap-8 mb-8 sm:mb-12"
            >
              {paginationData.currentStudents.map((student, index) => (
                <StudentCard key={student.name} student={student} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-2xl p-8 shadow-soft max-w-md mx-auto">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">No students found</h3>
                <p className="text-neutral-600 text-sm mb-4">
                  Try adjusting your search terms or clear the search to see all students.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {paginationData.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center gap-1 sm:gap-2 flex-wrap px-4 sm:px-0"
          >
            {/* Previous button */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white border border-neutral-200 text-neutral-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-soft"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Page numbers */}
            {pageNumbers.map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && setCurrentPage(page)}
                disabled={typeof page !== 'number'}
                className={`min-w-[32px] sm:min-w-[40px] h-8 sm:h-10 rounded-lg sm:rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex items-center justify-center ${
                  page === currentPage
                    ? 'bg-primary-600 text-white shadow-lg border border-primary-600 font-bold scale-110'
                    : typeof page === 'number'
                    ? 'bg-white border border-neutral-200 text-neutral-700 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 shadow-soft hover:scale-105'
                    : 'bg-transparent text-neutral-400 cursor-default border-0'
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, paginationData.totalPages))}
              disabled={currentPage === paginationData.totalPages}
              className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white border border-neutral-200 text-neutral-600 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-soft"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default StudentShowcase;