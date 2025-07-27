import { motion } from 'framer-motion';
import { useState } from 'react';
import { Crown, Users, Star, Quote, Award, Heart } from 'lucide-react';

const AdviserSection = ({ person }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl transform rotate-1"></div>
      
      <div className="relative bg-white rounded-3xl shadow-large p-6 sm:p-8 lg:p-12 border border-white/20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Section */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 skeleton rounded-2xl" />
              )}
              
              <img 
                src={person?.photo} 
                alt={`${person?.name || 'Adviser'} - Class Adviser`} 
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="400" viewBox="0 0 320 400"%3E%3Crect width="320" height="400" fill="%23f1f5f9"/%3E%3Ctext x="160" y="200" text-anchor="middle" dy="0.35em" font-family="system-ui" font-size="16" fill="%2364748b"%3EClass Adviser%3C/text%3E%3C/svg%3E';
                  setImageLoaded(true);
                }}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white p-3 rounded-2xl shadow-glow">
              <Crown className="w-6 h-6" />
            </div>
          </motion.div>
          
          {/* Content Section */}
          <motion.div
            className="text-center lg:text-left space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700 rounded-full text-sm font-semibold">
              <Award className="w-4 h-4" />
              Class Adviser
            </div>
            
            {/* Name */}
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 leading-tight">
              {person?.name || 'Class Adviser'}
            </h3>
            
            {/* Quote */}
            <div className="relative">
              <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary-200" />
              <blockquote className="text-lg sm:text-xl text-neutral-600 italic leading-relaxed pl-8">
                "{person?.fact || 'Dedicated to nurturing young minds and fostering excellence in education.'}"
              </blockquote>
            </div>
            
            {/* Stats or highlights */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl">
                <Heart className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">Mentor</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-accent-50 rounded-xl">
                <Star className="w-4 h-4 text-accent-600" />
                <span className="text-sm font-medium text-accent-700">Inspiring</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const OfficerCard = ({ person, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden card-hover border border-neutral-100">
        {/* Image Section */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          
          <img 
            src={person.photo} 
            alt={`${person.name} - ${person.role}`}
            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400"%3E%3Crect width="300" height="400" fill="%23f1f5f9"/%3E%3Ctext x="150" y="200" text-anchor="middle" dy="0.35em" font-family="system-ui" font-size="14" fill="%2364748b"%3EStudent Officer%3C/text%3E%3C/svg%3E';
              setImageLoaded(true);
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          
          {/* Role badge */}
          <div className="absolute top-4 left-4 px-3 py-1 glass text-white text-xs font-semibold rounded-full">
            {person.role}
          </div>
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h4 className="text-xl font-bold mb-2">{person.name}</h4>
            <p className="text-sm text-white/80 mb-3">{person.dreamJob}</p>
            
            {person.quote && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-xs italic text-white/90 border-l-2 border-accent-400 pl-3">
                  "{person.quote}"
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="p-4 bg-gradient-to-r from-primary-50 to-accent-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
              <span className="text-sm font-medium text-neutral-700">{person.role}</span>
            </div>
            <div className="text-xs text-neutral-500">Class Officer</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Leadership = ({ adviser, students }) => {
  // Filter class officers
  const officers = students.filter(student => 
    student.role && !['Student', 'Member'].includes(student.role)
  ).slice(0, 8); // Limit to 8 officers for better layout

  return (
    <section id="leadership" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 glass rounded-full text-primary-700 text-sm font-medium">
            <Users className="w-4 h-4" />
            Our Leadership Team
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Meet Our
            <span className="block gradient-text bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Leaders
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            The dedicated individuals who guide, inspire, and lead Class 11-Newton towards excellence and innovation.
          </p>
        </motion.div>

        {/* Adviser Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <AdviserSection person={adviser} />
        </motion.div>

        {/* Officers Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">
              Class Officers
            </h3>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              Our elected student leaders who represent the voice of Class 11-Newton and drive our collective success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {officers.map((officer, index) => (
              <OfficerCard key={officer.name} person={officer} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <a
            href="#classmates"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-2xl font-semibold text-lg hover:from-primary-700 hover:to-accent-700 hover:scale-105 transition-all duration-300 shadow-large"
          >
            <Users className="w-5 h-5" />
            Meet All Classmates
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Leadership;