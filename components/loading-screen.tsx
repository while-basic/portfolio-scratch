'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Set dimensions after component mounts
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Hide loading screen after 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  // Split name into first and last name for better mobile layout
  const firstName = "Christopher".split("");
  const lastName = "Celaya".split("");

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          style={{ height: dimensions.height }} // Ensure full height on mobile
        >
          <div className="relative px-4">
            <div className="flex flex-col sm:flex-row items-center justify-center overflow-hidden">
              {/* First Name */}
              <div className="flex mb-2 sm:mb-0">
                {firstName.map((letter, i) => (
                  <motion.span
                    key={`first-${i}`}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-3xl sm:text-4xl md:text-6xl font-bold"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
              
              {/* Space between names */}
              <motion.span 
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                custom={firstName.length}
                className="mx-2 hidden sm:inline"
              >
                {" "}
              </motion.span>

              {/* Last Name */}
              <div className="flex">
                {lastName.map((letter, i) => (
                  <motion.span
                    key={`last-${i}`}
                    custom={i + firstName.length + 1}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-3xl sm:text-4xl md:text-6xl font-bold"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Underline */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.5, duration: 0.5, ease: "easeInOut" }}
              className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
