import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Achievements from '../components/achievements';
import { achievements } from '../data/classData';

const AchievementsPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              Our Achievements
            </h1>
            <p className="text-xl text-white/80 max-w-3xl">
              Celebrate the remarkable milestones and collective successes that define our journey as Class 11-Newton.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Achievements Component */}
      <Achievements achievements={achievements} />
    </div>
  );
};

export default AchievementsPage;