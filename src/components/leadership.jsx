import { motion } from 'framer-motion';
import { useState } from 'react';
import { Crown, Users, Star, Quote, Award, Heart, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

// Enhanced Adviser Card Component
const AdviserCard = ({ person }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="relative max-w-4xl mx-auto mb-16"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/50 to-accent-100/50 rounded-3xl transform rotate-1 scale-105"></div>
      
      <div className="relative bg-white rounded-2xl shadow-large border border-neutral-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative lg:w-2/5 aspect-[4/3] lg:aspect-auto">
            {!imageLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            
            <img 
              src={person?.photo} 
              alt={`${person?.name || 'Class Adviser'}`}
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23f1f5f9"/%3E%3Ctext x="200" y="150" text-anchor="middle" dy="0.35em" font-family="system-ui" font-size="16" fill="%2364748b"%3EClass Adviser%3C/text%3E%3C/svg%3E';
                setImageLoaded(true);
              }}
            />
            
            {/* Crown badge */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <Crown className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Content Section */}
          <div className="flex-1 p-6 sm:p-8 lg:p-10">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full text-sm font-semibold">
                <Award className="w-4 h-4" />
                Class Adviser
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              {person?.name || 'Class Adviser'}
            </h2>
            
            {person?.fact && (
              <div className="relative mb-6">
                <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary-300" />
                <blockquote className="text-base sm:text-lg text-neutral-600 italic leading-relaxed pl-8">
                  "{person.fact}"
                </blockquote>
              </div>
            )}
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl border border-primary-100">
                <Heart className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">Mentor</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-xl border border-accent-100">
                <Star className="w-4 h-4 text-accent-600" />
                <span className="text-sm font-medium text-accent-700">Leader</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Completely New Officer Card Component
const OfficerCard = ({ person, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl shadow-soft hover:shadow-large transition-all duration-500 border border-neutral-200 hover:border-primary-300 h-full overflow-hidden group-hover:-translate-y-2">
        
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          
          <img 
            src={person.photo} 
            alt={person.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"%3E%3Crect width="300" height="400" fill="%23f8fafc"/%3E%3Ctext x="150" y="200" text-anchor="middle" dy="0.35em" font-family="system-ui" font-size="14" fill="%2364748b"%3EStudent%3C/text%3E%3C/svg%3E';
              setImageLoaded(true);
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Role Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full shadow-sm border border-white/50">
            <span className="text-xs font-bold text-primary-700">{person.role}</span>
          </div>
          
          {/* Hover Content */}
          <div className="absolute inset-x-0 bottom-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <h3 className="font-bold text-lg mb-1 leading-tight">{person.name}</h3>
            {person.dreamJob && (
              <p className="text-sm text-white/90 mb-2">{person.dreamJob}</p>
            )}
            {person.quote && (
              <p className="text-xs italic text-white/80 line-clamp-2">"{person.quote}"</p>
            )}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 space-y-3">
          {/* Name and Title */}
          <div>
            <h3 className="font-bold text-lg text-neutral-900 leading-tight mb-1">{person.name}</h3>
            <p className="text-sm text-neutral-600 font-medium">{person.role}</p>
          </div>
          
          {/* Dream Job */}
          {person.dreamJob && (
            <div className="flex items-start gap-2">
              <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Star className="w-3 h-3 text-primary-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-1">Dream Career</p>
                <p className="text-sm text-neutral-700 leading-relaxed">{person.dreamJob}</p>
              </div>
            </div>
          )}
          
          {/* Quote Section */}
          {person.quote && (
            <div className="bg-neutral-50 rounded-lg p-3 border-l-4 border-primary-400">
              <p className="text-xs italic text-neutral-600 leading-relaxed line-clamp-3">
                "{person.quote}"
              </p>
            </div>
          )}
          
          {/* Footer */}
          <div className="pt-3 border-t border-neutral-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span className="text-xs font-medium text-neutral-500">Class Officer</span>
              </div>
              <span className="text-xs text-neutral-400">11-Newton</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Leadership Component
const Leadership = ({ adviser, students = [] }) => {
  // Filter officers safely
  const officers = Array.isArray(students) 
    ? students.filter(student => 
        student && 
        student.role && 
        !['Student', 'Member'].includes(student.role)
      ).slice(0, 12) // Limit for performance
    : [];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 backdrop-blur-sm rounded-full border border-primary-200 text-primary-700 text-sm font-medium shadow-sm">
            <Users className="w-4 h-4" />
            Leadership Team
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Meet Our
            <span className="block bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Amazing Leaders
            </span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            The dedicated individuals who guide, inspire, and lead Class 11-Newton towards excellence and innovation.
          </p>
        </motion.div>

        {/* Adviser Section */}
        {adviser && <AdviserCard person={adviser} />}

        {/* Officers Section */}
        {officers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
                Student Officers
              </h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Our elected student leaders who represent the voice of Class 11-Newton and drive our collective success.
              </p>
            </div>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {officers.map((officer, index) => (
                <OfficerCard key={`${officer.name}-${index}`} person={officer} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16 sm:mt-20"
        >
          {/* Background container for better visibility */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-primary-200 shadow-large max-w-2xl mx-auto">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">
                Want to meet everyone?
              </h3>
              <p className="text-neutral-600 text-sm sm:text-base">
                Discover all the amazing students in Class 11-Newton
              </p>
            </div>
            
            {/* Primary Button with Inline Styles */}
            <Link
              to="/students"
              style={{
                background: 'linear-gradient(135deg, #0284c7 0%, #d97706 100%)',
                color: 'white',
                border: '2px solid #0284c7',
                boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 32px',
                borderRadius: '16px',
                fontWeight: 'bold',
                fontSize: '18px',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              className="hover:scale-105"
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #0369a1 0%, #b45309 100%)';
                e.target.style.transform = 'scale(1.05)';
                e.target.style.boxShadow = '0 0 30px rgba(14, 165, 233, 0.5), 0 12px 40px rgba(14, 165, 233, 0.25)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #0284c7 0%, #d97706 100%)';
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.1)';
              }}
            >
              <Users style={{ width: '24px', height: '24px' }} />
              Meet All Classmates
              <svg style={{ width: '20px', height: '20px', marginLeft: '4px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            
            {/* Fallback Button - Simple Blue Background */}
            <div className="mt-4">
              <Link
                to="/students"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-300"
              >
                👥 Meet All Classmates →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Leadership;