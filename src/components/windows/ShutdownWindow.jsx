import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ShutdownWindow() {
  const [stage, setStage] = useState('waiting');

  useEffect(() => {
    const timer1 = setTimeout(() => setStage('shutting-down'), 1000);
    const timer2 = setTimeout(() => setStage('dog'), 2000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="h-full flex items-center justify-center bg-[#000080] overflow-hidden">
      {stage === 'waiting' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white"
        >
          <div className="text-2xl font-bold mb-4">Windows is shutting down...</div>
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        </motion.div>
      )}

      {stage === 'shutting-down' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white"
        >
          <div className="text-xl mb-2">Please wait...</div>
        </motion.div>
      )}

      {stage === 'dog' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 0.6,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
            className="text-9xl mb-4"
          >
            🐕
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white"
          >
            <div className="text-3xl font-bold mb-2">Just kidding! 😄</div>
            <div className="text-xl">You can't escape the retro life!</div>
            <div className="text-sm mt-4 opacity-70">Click anywhere to continue...</div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}