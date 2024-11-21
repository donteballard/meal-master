import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg z-40 pt-safe">
      <div className="h-16 flex items-center justify-center px-4">
        <Link to="/">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center"
          >
            {/* Logo Icon */}
            <svg 
              className="w-8 h-8 text-primary" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
              />
            </svg>
            
            {/* Brand Name */}
            <motion.h1 
              className="ml-2 text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              MealMaster
            </motion.h1>
          </motion.div>
        </Link>
      </div>
    </header>
  );
}

export default Header; 