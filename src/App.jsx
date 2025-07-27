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
              <footer className="relative bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white py-12 sm:py-16 border-t border-neutral-200 footer-shadow mt-8">
                {/* Background pattern for better visual separation */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary-900/10 via-accent-900/10 to-primary-900/10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.1),transparent_50%)]"></div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-glow">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">Class 11-Newton</h3>
                        <p className="text-white/60 text-sm">Class of 2025</p>
                      </div>
                    </div>
                    <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">Shaping tomorrow, one brilliant mind at a time.</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-500 mx-auto mb-8 rounded-full"></div>
                    <div className="space-y-4">
                      <p className="text-white/70 text-base">
                        &copy; 2025 Class 11-Newton. All Rights Reserved.
                      </p>
                      <p className="text-white/60 text-sm">
                        Built with ❤️ by our amazing class
                      </p>
                    </div>
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
