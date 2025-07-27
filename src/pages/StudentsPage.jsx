import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import StudentShowcase from '../components/studentshowcase';
import { students } from '../data/classData';

const StudentsPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-primary-500 via-accent-500 to-primary-600 text-white py-12 sm:py-16 overflow-hidden navbar-offset">
        {/* Background decoration */}
        <div className="absolute inset-0 gradient-bg opacity-80"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-12 left-12 w-14 h-14 bg-white/10 rounded-2xl rotate-45 animate-float"></div>
        <div className="absolute top-16 right-16 w-10 h-10 bg-accent-400/20 rounded-full animate-float"></div>
        <div className="absolute bottom-16 right-1/4 w-8 h-8 bg-white/15 rounded-lg rotate-12 animate-float"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 hover:text-white hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Student <span className="gradient-text">Showcase</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover the unique stories, dreams, and personalities that make Class 11-Newton extraordinary.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Student Showcase Component */}
      <StudentShowcase students={students} />
    </div>
  );
};

export default StudentsPage;