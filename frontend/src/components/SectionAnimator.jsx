import React from 'react';
import { motion } from 'framer-motion';

const SectionAnimator = ({ children }) => {
  // This configuration defines the animation:
  // It starts invisible and 50px to the left, then animates to be fully visible at its original position.
  const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      // Apply the animation variants defined above
      variants={sectionVariants}
      
      // The component will start in the 'hidden' state
      initial="hidden"
      
      // When the component enters the viewport, it will animate to the 'visible' state
      whileInView="visible"
      
      // Configuration for the trigger
      viewport={{ 
        once: true,    // Ensures the animation only runs one time per element
        amount: 0.2    // Triggers the animation when 20% of the element is visible
      }}
      
      // Defines the properties of the animation transition
      transition={{ 
        duration: 0.8, // The animation will last 0.8 seconds
        ease: "easeOut" // A smooth easing function for the animation
      }}
    >
      {children}
    </motion.div>
  );
};

export default SectionAnimator;