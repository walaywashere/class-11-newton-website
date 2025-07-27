import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Preloader from './components/preloader';
import Navbar from './components/navbar';
import HomePage from './pages/HomePage';
import LeadershipPage from './pages/LeadershipPage';
import StudentsPage from './pages/StudentsPage';
import AchievementsPage from './pages/AchievementsPage';

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
      <Router>
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
              <Navbar />
              <main id="main-content">
                <Suspense fallback={<LoadingSpinner text="Loading page..." />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/leadership" element={<LeadershipPage />} />
                    <Route path="/students" element={<StudentsPage />} />
                    <Route path="/achievements" element={<AchievementsPage />} />
                  </Routes>
                </Suspense>
              </main>
              <footer className="relative bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-400 to-accent-500 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold">Class 11-Newton</h3>
                    </div>
                    <p className="text-white/80 mb-4 sm:mb-6 text-sm sm:text-base">Shaping tomorrow, one brilliant mind at a time.</p>
                    <div className="w-16 sm:w-24 h-0.5 bg-gradient-to-r from-primary-400 to-accent-500 mx-auto mb-4 sm:mb-6"></div>
                    <p className="text-white/60 text-xs sm:text-sm px-4">
                      &copy; 2025 Class 11-Newton. All Rights Reserved. | Built with ❤️ by our amazing class.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </motion.div>
        )}
      </Router>
    </ErrorBoundary>
  );
}

export default App;
