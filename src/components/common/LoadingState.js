import React from 'react';
import { motion } from 'framer-motion';

function LoadingState({ message = 'Loading...', fullScreen = false }) {
  const content = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <div className="relative">
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
      {message && (
        <p className="text-text-muted animate-pulse">{message}</p>
      )}
    </motion.div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background bg-opacity-50 flex items-center justify-center z-50">
        {content}
      </div>
    );
  }

  return content;
}

export default LoadingState; 