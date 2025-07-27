import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, RefreshCw, Briefcase, Sparkles, Instagram, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const StudentCard = ({ student }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const flipCard = useCallback(() => setIsFlipped(prev => !prev), []);
  const handleLinkClick = useCallback((e) => e.stopPropagation(), []);

  // Add error boundary for missing student data
  if (!student || !student.name) {
    return null;
  }

  return (
    <motion.div 
      variants={cardVariants}
      whileTap={{ scale: 0.95, transition: { type: 'spring', stiffness: 400 } }}
    >
      <div 
        className="w-full aspect-[3/4] [perspective:1000px] cursor-pointer group" 
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
          className="relative w-full h-full [transform-style:preserve-3d]"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {/* Front of the Card */}
          <div className="absolute w-full h-full [backface-visibility:hidden] rounded-lg ring-1 ring-slate-900/5 group-hover:ring-indigo-500 transition-shadow">
            <img 
              className="w-full h-full object-cover rounded-lg shadow-md" 
              src={student.photo} 
              alt={`Photo of ${student.name}`}
              loading="lazy"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f1f5f9"/%3E%3Ctext x="100" y="100" text-anchor="middle" dy="0.35em" font-family="system-ui" font-size="14" fill="%2364748b"%3ENo Image%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="absolute inset-0 bg-black/30 rounded-lg"></div>
            <div className="absolute top-2 right-2 p-1 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <RefreshCw size={16} className="text-white" />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4">
              <h3 className="font-bold text-lg text-white drop-shadow-md">{student.name}</h3>
              {student.role && (
                <p className="text-sm text-indigo-300 font-semibold flex items-center drop-shadow-md">
                  <Star size={14} className="mr-1" />
                  {student.role}
                </p>
              )}
            </div>
          </div>

          {/* Back of the Card */}
          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-lg shadow-xl p-3 sm:p-5 flex flex-col justify-between ring-1 ring-slate-900/5 group-hover:ring-indigo-500 transition-shadow">
            <div className="text-left overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
              {student.dreamJob && (
                <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-[10px] sm:text-xs font-semibold uppercase">Dream Job</p>
                    <p className="font-bold text-base sm:text-lg">{student.dreamJob}</p>
                  </div>
                </div>
              )}
              {student.dreamJob && student.funFact && (
                <div className="w-full h-px bg-slate-700 my-2 sm:my-3"></div>
              )}
              {student.funFact && (
                <div className="flex items-start gap-2 sm:gap-3">
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-indigo-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-400 text-[10px] sm:text-xs font-semibold uppercase">Fun Fact</p>
                    <p className="text-sm sm:text-base">{student.funFact}</p>
                  </div>
                </div>
              )}
            </div>
            {student.socials?.instagram && (
              <div className="mt-3 pt-2 sm:mt-4 sm:pt-3 border-t border-slate-700 flex-shrink-0">
                <a
                  href={`https://instagram.com/${student.socials.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded-sm"
                  onClick={handleLinkClick}
                  aria-label={`Visit ${student.name}'s Instagram profile`}
                >
                  <Instagram size={18} />
                  <span className="text-xs sm:text-sm font-medium">@{student.socials.instagram}</span>
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StudentShowcase = ({ students = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  // Reset to first page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Memoize filtered students to avoid unnecessary recalculations
  const filteredStudents = useMemo(() => {
    if (!Array.isArray(students)) return [];
    return students.filter(student =>
      student?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [students, searchQuery]);

  // Memoize pagination calculations
  const paginationData = useMemo(() => {
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
    
    return {
      currentStudents,
      totalPages,
      indexOfFirstStudent,
      indexOfLastStudent
    };
  }, [filteredStudents, currentPage, studentsPerPage]);

  const paginate = useCallback((pageNumber) => {
    if (pageNumber < 1 || pageNumber > paginationData.totalPages) return;
    setCurrentPage(pageNumber);
  }, [paginationData.totalPages]);

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

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
    <section id="classmates" className="py-16 md:py-24 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 border-4 border-slate-200">
          <motion.h2 
            initial={{ opacity: 0, y: 50, skewY: 3 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl font-bold text-center text-slate-900"
          >
            Meet the Class
          </motion.h2>
          <p className="text-center mt-2 text-slate-600">The amazing individuals who make 11-Newton special.</p>
          
          {/* Search Bar */}
          <div className="mt-8 mb-12 max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                aria-label="Search students by name"
              />
            </div>
          </div>

          {/* Results info */}
          <div className="text-center mb-6 text-slate-600">
            {searchQuery && (
              <p>
                Found {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} 
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            )}
          </div>

          {/* Student Grid */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${currentPage}-${searchQuery}`}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 min-h-[400px]"
              variants={gridContainerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {paginationData.currentStudents.length > 0 ? (
                paginationData.currentStudents.map((student, index) => (
                  <StudentCard key={`${student.name}-${index}`} student={student} />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-500">
                  <Search size={48} className="mb-4 opacity-50" />
                  <p className="text-lg">No students found</p>
                  {searchQuery && (
                    <p className="text-sm mt-2">Try adjusting your search term</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Pagination */}
          {paginationData.totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center space-x-1 sm:space-x-2">
              <motion.button 
                whileTap={{ scale: 0.95 }} 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </motion.button>
              
              {pageNumbers.map((pageNum, index) => (
                pageNum === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 py-2 text-slate-400">
                    ...
                  </span>
                ) : (
                  <motion.button
                    key={pageNum}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => paginate(pageNum)}
                    className={`relative px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      currentPage === pageNum
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-700 hover:bg-slate-200'
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {currentPage === pageNum && (
                      <motion.div
                        layoutId="highlight"
                        className="absolute inset-0 bg-indigo-600 rounded-md"
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span className={`relative z-10 ${currentPage === pageNum ? 'text-white' : ''}`}>
                      {pageNum}
                    </span>
                  </motion.button>
                )
              ))}
              
              <motion.button 
                whileTap={{ scale: 0.95 }} 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === paginationData.totalPages} 
                className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default StudentShowcase;