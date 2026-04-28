import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  variant?: 'fade' | 'slide' | 'zoom';
}

const variants = {
  fade: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  slide: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  }
};

const PageTransition = ({ children, variant = 'fade' }: PageTransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[variant]}
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for super smooth "out-expo" feel
      }}
      style={{ 
        width: '100%',
        minHeight: '100%',
        willChange: 'transform, opacity' 
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
