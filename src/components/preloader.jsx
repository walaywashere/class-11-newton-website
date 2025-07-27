import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Preloader = () => {
  return (
    <motion.div
      className="fixed inset-0 bg-slate-900 flex justify-center items-center z-[101] text-center"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
      variants={containerVariants}
    >
      <div>
        <motion.p
          className="text-2xl text-slate-400 font-light"
          variants={itemVariants}
        >
          Hi, welcome to the
        </motion.p>
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-white my-2"
          variants={itemVariants}
        >
          11-Newton
        </motion.h1>
        <motion.p
          className="text-2xl text-indigo-400 font-semibold"
          variants={itemVariants}
        >
          Class Showcase
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;