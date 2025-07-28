import { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import Preloader from './components/preloader';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PerfectLeadershipPage from './pages/PerfectLeadershipPage';
import PerfectStudentsPage from './pages/PerfectStudentsPage';
import PerfectAchievementsPage from './pages/PerfectAchievementsPage';

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if preloader has already been shown in this session
    const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
    return !hasSeenPreloader; // Show preloader only if not seen before
  });

  useEffect(() => {
    // Only run the timer if we're actually showing the preloader
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Mark that the preloader has been shown in this session
        sessionStorage.setItem('hasSeenPreloader', 'true');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

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
                    <Route path="/leadership" element={<PerfectLeadershipPage />} />
                    <Route path="/students" element={<PerfectStudentsPage />} />
                    <Route path="/achievements" element={<PerfectAchievementsPage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </motion.div>
        )}
      </Router>
    </ErrorBoundary>
  );
}

export default App;
