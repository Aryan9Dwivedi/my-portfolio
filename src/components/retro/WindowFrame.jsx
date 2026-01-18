import React from 'react';
import { X, Minus, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WindowFrame({ 
  title, 
  children, 
  onClose, 
  onMinimize,
  onMaximize,
  isOpen,
  isMinimized,
  isFullscreen,
  windowId,
  zIndex = 10,
  colorScheme = 'blue'
}) {
  const colorSchemes = {
    blue: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)',
    purple: 'linear-gradient(90deg, #800080 0%, #b030b0 100%)',
    green: 'linear-gradient(90deg, #008000 0%, #10a010 100%)',
    red: 'linear-gradient(90deg, #800000 0%, #c00000 100%)',
    teal: 'linear-gradient(90deg, #008080 0%, #10a0a0 100%)',
    orange: 'linear-gradient(90deg, #ff6600 0%, #ff8833 100%)'
  };
  const [hoverTime, setHoverTime] = React.useState(0);
  const hoverTimerRef = React.useRef(null);

  if (!isOpen) return null;

  const handleMouseEnter = () => {
    hoverTimerRef.current = setInterval(() => {
      setHoverTime(prev => prev + 100);
    }, 100);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearInterval(hoverTimerRef.current);
      setHoverTime(0);
    }
  };

  React.useEffect(() => {
    if (hoverTime >= 5000 && !isFullscreen && onMaximize) {
      onMaximize();
      setHoverTime(0);
    }
  }, [hoverTime, isFullscreen, onMaximize]);

  React.useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearInterval(hoverTimerRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={isFullscreen ? "fixed inset-0 flex flex-col" : "fixed inset-4 md:inset-8 lg:inset-16 flex flex-col"}
          style={{ zIndex: zIndex + 100 }}
        >
          {/* Window container with retro border */}
          <div 
            className="flex flex-col h-full rounded overflow-hidden shadow-2xl"
            style={{
              background: '#c0c0c0',
              border: '3px solid',
              borderColor: '#ffffff #404040 #404040 #ffffff',
              boxShadow: '8px 8px 16px rgba(0,0,0,0.6), inset 1px 1px 0 rgba(255,255,255,0.8)'
            }}
          >
            {/* Title Bar */}
            <div 
              className="flex items-center justify-between px-2 py-1.5 select-none"
              style={{
                background: colorSchemes[colorScheme] || colorSchemes.blue,
                minHeight: '30px',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            >
              {/* Title */}
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white/30 rounded-sm flex items-center justify-center shadow-sm">
                  <div className="w-2 h-2 bg-white rounded-[1px]" />
                </div>
                <span className="text-white text-sm font-bold tracking-wide truncate drop-shadow-sm">
                  {title}
                </span>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                {/* Minimize Button */}
                <button
                  onClick={onMinimize}
                  className="w-5 h-5 flex items-center justify-center transition-all hover:brightness-110"
                  style={{
                    background: '#c0c0c0',
                    border: '1.5px solid',
                    borderColor: '#ffffff #000000 #000000 #ffffff'
                  }}
                >
                  <Minus className="w-3 h-3 text-black" strokeWidth={3} />
                </button>

                {/* Maximize Button */}
                <button
                  onClick={onMaximize}
                  className="w-5 h-5 flex items-center justify-center transition-all hover:brightness-110"
                  style={{
                    background: '#c0c0c0',
                    border: '1.5px solid',
                    borderColor: '#ffffff #000000 #000000 #ffffff'
                  }}
                >
                  <Square className="w-3 h-3 text-black" strokeWidth={3} />
                </button>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="w-5 h-5 flex items-center justify-center transition-all hover:bg-red-600 group"
                  style={{
                    background: '#c0c0c0',
                    border: '1.5px solid',
                    borderColor: '#ffffff #000000 #000000 #ffffff'
                  }}
                >
                  <X className="w-3 h-3 text-black group-hover:text-white" strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* Menu Bar */}
            <div 
              className="flex items-center gap-4 px-3 py-1 text-xs"
              style={{
                background: '#c0c0c0',
                borderBottom: '1px solid #808080'
              }}
            >
              <span className="px-2 py-1 text-gray-600 cursor-default">File</span>
              <span className="px-2 py-1 text-gray-600 cursor-default">Edit</span>
              <span className="px-2 py-1 text-gray-600 cursor-default">View</span>
              <span className="px-2 py-1 text-gray-600 cursor-default">Help</span>
            </div>

            {/* Content Area */}
            <div 
              className="flex-1 overflow-auto"
              style={{
                background: '#ffffff',
                border: '2px solid',
                borderColor: '#808080 #dfdfdf #dfdfdf #808080',
                margin: '2px 2px 2px 2px'
              }}
            >
              {children}
            </div>

            {/* Status Bar */}
            <div 
              className="flex items-center px-2 py-1.5 text-xs"
              style={{
                background: '#c0c0c0',
                borderTop: '1px solid #ffffff'
              }}
            >
              <div 
                className="flex-1 px-2 py-1"
                style={{
                  border: '1px solid',
                  borderColor: '#808080 #ffffff #ffffff #808080',
                  background: '#ffffff'
                }}
              >
                Ready
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}