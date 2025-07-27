import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
<<<<<<< HEAD
import Preloader from './components/preloader.js';
import Navbar from './components/navbar.js';
import HomePage from './components/homepage.js';
import StudentShowcase from './components/studentshowcase.js';
import Leadership from './components/leadership.js';
import Achievements from './components/achievements.js';
=======
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage'; 
import StudentShowcase from './components/StudentShowcase';
import Leadership from './components/Leadership';
import Achievements from './components/Achievements';
>>>>>>> 577d1e427a70ae23fd3bad064dc7af3c9a9d1bd0
import { adviser, students, achievements } from './data/classData.jsx';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-slate-100 text-slate-800 font-poppins">
            <Navbar />
            <main>
              <HomePage />
              <Leadership adviser={adviser} students={students} />
              <StudentShowcase students={students} />
              <Achievements achievements={achievements} />
            </main>
            <footer className="text-center p-4 bg-slate-900 text-slate-300">
              <p>&copy; 2025 Class 11-Newton. All Rights Reserved.</p>
            </footer>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default App;
