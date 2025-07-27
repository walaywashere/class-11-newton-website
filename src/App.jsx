import { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import TestComponent from './components/TestComponent';
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
    }, 1000); // Shorter loading time for testing

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
          <div className="bg-neutral-50 text-neutral-800 font-sans">
            {/* Skip to main content link for accessibility */}
            <a 
              href="#main-content" 
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50"
            >
              Skip to main content
            </a>
            
            {/* Test Component Only */}
            <TestComponent />
            
            {/* Commented out other components for testing */}
            {/*
            <Navbar />
            <main id="main-content">
              <HomePage />
              <Suspense fallback={<LoadingSpinner text="Loading content..." />}>
                <Leadership adviser={adviser} students={students} />
                <StudentShowcase students={students} />
                <Achievements achievements={achievements} />
              </Suspense>
            </main>
            <footer className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-500 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Class 11-Newton</h3>
                  </div>
                  <p className="text-white/80 mb-6">Shaping tomorrow, one brilliant mind at a time.</p>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 mx-auto mb-6"></div>
                  <p className="text-white/60 text-sm">
                    &copy; 2025 Class 11-Newton. All Rights Reserved. | Built with ❤️ by our amazing class.
                  </p>
                </div>
              </div>
            </footer>
            */}
          </div>
        </motion.div>
      )}
    </ErrorBoundary>
  );
}

export default App;
