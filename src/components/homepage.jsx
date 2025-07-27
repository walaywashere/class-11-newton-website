import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Blobs now have the 'animate-blob' class */}
      <motion.div 
        style={{ y: y1 }} 
        className="absolute top-0 -left-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
      ></motion.div>
      <motion.div 
        style={{ y: y2 }} 
        className="absolute top-0 -right-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob [animation-delay:2s]"
      ></motion.div>
      <motion.div 
        style={{ y: y3 }} 
        className="absolute bottom-0 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob [animation-delay:4s]"
      ></motion.div>

      <div className="text-center p-8 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-900"
        >
          Welcome to <span className="text-indigo-600">11-Newton</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-4 text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto"
        >
          A vibrant community of learners, dreamers, and future leaders. Explore our page to meet the brilliant minds of our class.
        </motion.p>
      </div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10"
      >
        <ArrowDown className="h-8 w-8 text-gray-400" />
      </motion.div>
    </section>
  );
};

export default HomePage;