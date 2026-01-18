import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorTrail() {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e) => {
      const id = trailId++;
      const newTrail = {
        id,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prev) => [...prev.slice(-8), newTrail]);

      setTimeout(() => {
        setTrails((prev) => prev.filter((t) => t.id !== id));
      }, 600);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {trails.map((trail, index) => (
          <motion.div
            key={trail.id}
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute"
            style={{
              left: trail.x,
              top: trail.y,
              width: '8px',
              height: '8px',
              background: `rgba(255, 255, 255, ${0.5 - index * 0.05})`,
              boxShadow: '0 0 4px rgba(255,255,255,0.5)',
              transform: 'translate(-50%, -50%)',
              imageRendering: 'pixelated',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}