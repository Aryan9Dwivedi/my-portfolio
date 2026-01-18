import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Folder, FileText, Search, User,
  Volume2, Wifi, Battery
} from 'lucide-react';

const iconMap = {
  home: Home,
  folder: Folder,
  'file-text': FileText,
  search: Search,
  user: User
};

export default function Taskbar({ 
  openWindows, 
  minimizedWindows,
  activeWindow,
  onWindowClick,
  onStartClick,
  windowTitles,
  desktopIcons
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showStartMenu, setShowStartMenu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 h-11 flex items-center px-1 gap-1 shadow-2xl"
      style={{
        background: 'linear-gradient(180deg, #245edb 0%, #3a6ea5 3%, #1e4aa8 97%, #1a3f91 100%)',
        borderTop: '2px solid #6699ff',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        zIndex: 1000
      }}
    >
      {/* Start Button */}
      <motion.button
        onClick={() => setShowStartMenu(!showStartMenu)}
        className="flex items-center gap-1.5 px-2 py-1 text-sm font-bold"
        style={{
          background: showStartMenu 
            ? '#c0c0c0'
            : 'linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #a0a0a0 100%)',
          border: '2px solid',
          borderColor: showStartMenu 
            ? '#808080 #ffffff #ffffff #808080'
            : '#ffffff #000000 #000000 #ffffff',
          boxShadow: showStartMenu 
            ? 'inset 1px 1px 2px rgba(0,0,0,0.5)' 
            : '1px 1px 0 rgba(255,255,255,0.8)',
          color: '#000000'
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="hidden sm:inline font-bold">Start</span>
      </motion.button>

      {/* Quick Launch Separator */}
      <div className="w-px h-6 bg-[#1a3f91] mx-1" />

      {/* Open Windows */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        <AnimatePresence>
          {openWindows.map((windowId) => {
            const iconConfig = desktopIcons.find(i => i.id === windowId);
            const IconComponent = iconMap[iconConfig?.icon] || Folder;
            const isActive = activeWindow === windowId;
            const isMinimized = minimizedWindows.includes(windowId);

            return (
              <motion.button
                key={windowId}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                onClick={() => onWindowClick(windowId)}
                className={`
                  flex items-center gap-2 px-3 py-1 min-w-[120px] max-w-[200px]
                  text-sm text-left truncate rounded-sm transition-all
                  ${isActive && !isMinimized ? 'text-white' : 'text-white/80'}
                `}
                style={{
                  background: isActive && !isMinimized
                    ? 'linear-gradient(180deg, #3c6fb3 0%, #2a5a9c 50%, #1e4a8c 100%)'
                    : 'linear-gradient(180deg, #3a6ea5 0%, #28507d 50%, #1a3f6e 100%)',
                  border: '1px solid',
                  borderColor: isActive && !isMinimized 
                    ? '#6699cc #1a3f6e #1a3f6e #6699cc'
                    : '#5588bb #1a3f6e #1a3f6e #5588bb',
                  boxShadow: isActive && !isMinimized 
                    ? 'inset 0 0 4px rgba(255,255,255,0.2)'
                    : 'none'
                }}
              >
                <IconComponent className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{windowTitles[windowId]}</span>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* System Tray Separator */}
      <div className="w-px h-6 bg-[#1a3f91] mx-1" />

      {/* System Tray */}
      <div 
        className="flex items-center gap-2 px-2 py-1 rounded-sm"
        style={{
          background: 'linear-gradient(180deg, #1a4a8c 0%, #0f3366 100%)',
          border: '1px solid',
          borderColor: '#0f3366 #3366aa #3366aa #0f3366'
        }}
      >
        <Volume2 className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
        <Wifi className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />
        <Battery className="w-4 h-4 text-white/70 hover:text-white cursor-pointer" />

        {/* Clock */}
        <div className="flex flex-col items-end text-white text-xs leading-tight ml-1">
          <span className="font-medium">{formatTime(currentTime)}</span>
          <span className="text-white/70 text-[10px] hidden sm:block">{formatDate(currentTime)}</span>
        </div>
      </div>

      {/* Start Menu Popup */}
      <AnimatePresence>
        {showStartMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setShowStartMenu(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-11 left-0 w-56"
              style={{
                background: '#c0c0c0',
                border: '3px solid',
                borderColor: '#ffffff #000000 #000000 #ffffff',
                boxShadow: '4px 4px 10px rgba(0,0,0,0.5)',
                zIndex: 9999
              }}
            >
              {/* Menu items */}
              <div className="py-1">
                  {desktopIcons.map((item) => {
                    const IconComponent = iconMap[item.icon] || Folder;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onStartClick(item.id);
                          setShowStartMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-1.5 hover:bg-[#000080] hover:text-white transition-colors text-left text-sm"
                        style={{ fontFamily: 'MS Sans Serif, sans-serif' }}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}

                  <div 
                    className="mx-2 my-1"
                    style={{
                      height: '1px',
                      background: 'linear-gradient(90deg, transparent, #808080, transparent)'
                    }}
                  />

                  <button 
                    onClick={() => {
                      onStartClick('shutdown');
                      setShowStartMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-1.5 hover:bg-[#000080] hover:text-white transition-colors text-left text-sm"
                    style={{ fontFamily: 'MS Sans Serif, sans-serif' }}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#c00000] border border-[#600000]" />
                    <span>Shut Down...</span>
                  </button>
                  </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}