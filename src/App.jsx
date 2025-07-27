import { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Preloader from './components/preloader';
import Navbar from './components/navbar';
import HomePage from './components/homepage';
import { adviser, students, achievements } from './data/classData';

// Lazy load heavy components
const StudentShowcase = lazy(() => import('./components/studentshowcase'));
const Leadership = lazy(() => import('./components/leadership'));
const Achievements = lazy(() => import('./components/achievements'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
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
            {/* Skip to main content link for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50"
            >
              Skip to main content
            </a>
            <Navbar />
            <main id="main-content">
              <HomePage />
              <Suspense fallback={<LoadingSpinner text="Loading content..." />}>
                <Leadership adviser={adviser} students={students} />
                <StudentShowcase students={students} />
                <Achievements achievements={achievements} />
              </Suspense>
            </main>
            <footer className="text-center p-4 bg-slate-900 text-slate-300">
              <p>&copy; 2025 Class 11-Newton. All Rights Reserved.</p>
            </footer>
          </div>
        </motion.div>
      )}
    </ErrorBoundary>
  );
}

export default App;
