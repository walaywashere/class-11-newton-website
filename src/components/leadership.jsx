import { motion } from 'framer-motion';
import { useState } from 'react';

const AdviserSection = ({ person }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center bg-white p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl shadow-lg">
      <motion.div 
        className="w-full aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden relative"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-pulse rounded-lg sm:rounded-xl" />
        )}
        <img 
          src={person?.photo} 
          alt={`${person?.name || 'Adviser'} - Class Adviser`} 
          className="w-full h-full object-cover rounded-lg sm:rounded-xl transition-transform duration-300"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="400" viewBox="0 0 320 400"%3E%3Crect width="320" height="400" fill="%23f1f5f9"/%3E%3Ctext x="160" y="200" text-anchor="middle" dy="0.35em" font-family="system-ui" font-size="16" fill="%2364748b"%3EClass Adviser%3C/text%3E%3C/svg%3E';
            setImageLoaded(true);
          }}
        />
      </motion.div>
      
      <motion.div
        className="text-center md:text-left"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      >
        <motion.p 
          className="text-indigo-600 font-semibold mb-2 text-sm sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Class Adviser
        </motion.p>
        
        <motion.h3 
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {person?.name || 'Not Available'}
        </motion.h3>
        
        {person?.fact && (
          <motion.blockquote 
            className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            "{person.fact}"
          </motion.blockquote>
        )}
      </motion.div>
    </div>
  );
};

const OfficerCard = ({ person, index }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.div 
      className="text-center group cursor-pointer"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: 'spring',
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      whileTap={{ 
        scale: 0.95,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
    >
      <motion.div 
        className="aspect-[3/4] mb-3 sm:mb-4 rounded-lg sm:rounded-xl ring-1 ring-slate-900/5 group-hover:ring-indigo-500 transition-all duration-300 overflow-hidden relative shadow-md group-hover:shadow-xl"
        whileHover={{ 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
      >
        {/* Loading skeleton */}
        {!imageLoaded && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 rounded-lg sm:rounded-xl"
            animate={{
              x: [-100, 100],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            }}
          />
        )}
        
        <motion.img 
          src={person?.photo} 
          alt={`${person?.name || 'Officer'} - ${person?.role || 'Class Officer'}`} 
          className="w-full h-full rounded-lg sm:rounded-xl mx-auto object-cover transition-all duration-500 group-hover:scale-110"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="240" height="320" viewBox="0 0 240 320"%3E%3Crect width="240" height="320" fill="%23f1f5f9"/%3E%3Ctext x="120" y="160" text-anchor="middle" dy="0.35em" font-family="system-ui" font-size="14" fill="%2364748b"%3ENo Image%3C/text%3E%3C/svg%3E';
            setImageLoaded(true);
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: imageLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Hover overlay with subtle animation */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
        
        {/* Mobile tap feedback */}
        {isPressed && (
          <motion.div 
            className="absolute inset-0 bg-indigo-500/20 rounded-lg sm:rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
      >
        <motion.h3 
          className="text-base sm:text-lg lg:text-xl font-bold text-slate-800 mb-1"
          whileHover={{ color: '#4f46e5' }}
          transition={{ duration: 0.2 }}
        >
          {person?.name || 'Unknown'}
        </motion.h3>
        
        <motion.p 
          className="text-slate-600 font-semibold text-sm sm:text-base"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1, color: '#6366f1' }}
          transition={{ duration: 0.2 }}
        >
          {person?.role || 'Officer'}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const Leadership = ({ adviser, students = [] }) => {
  const officers = Array.isArray(students) ? students.filter(student => student?.role) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="leadership" className="py-12 sm:py-16 md:py-24 bg-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Adviser Section */}
        <motion.div 
          className="mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <AdviserSection person={adviser} />
        </motion.div>
        
        {/* Officers Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            initial={{ opacity: 0, y: 50, skewY: 3 }}
            whileInView={{ opacity: 1, y: 0, skewY: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 mb-2"
          >
            Class Officers
          </motion.h2>
          
          <motion.p 
            className="text-center mt-2 mb-8 sm:mb-12 text-slate-600 text-sm sm:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The dedicated leaders of 11-Newton.
          </motion.p>
          
          {officers.length > 0 ? (
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {officers.map((officer, index) => (
                <OfficerCard 
                  key={`${officer?.name || 'officer'}-${index}`} 
                  person={officer} 
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
                <div className="text-slate-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-slate-600 text-lg font-medium">No officers available</p>
                <p className="text-slate-500 text-sm mt-2">Officer information will be displayed here when available.</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Leadership;