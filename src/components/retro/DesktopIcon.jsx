import React, { useState } from 'react';
import { 
  Home, Folder, FileText, Search, User, 
  Monitor, Settings, Mail, Globe, Terminal, Calculator
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  home: Home,
  folder: Folder,
  'file-text': FileText,
  search: Search,
  user: User,
  monitor: Monitor,
  settings: Settings,
  mail: Mail,
  globe: Globe,
  terminal: Terminal,
  calculator: Calculator
};

const ICON_STROKE = {
  default: 1.5,
  bold: 2.5,
  thin: 1
};

export default function DesktopIcon({ 
  id, 
  label, 
  icon, 
  isSelected, 
  onSelect, 
  onDoubleClick,
  iconStyle = 'default'
}) {
  const [clickTimeout, setClickTimeout] = useState(null);
  const IconComponent = iconMap[icon] || Folder;

  const handleClick = (e) => {
    e.stopPropagation();
    if (onSelect) {
      onSelect(id);
    }
  };
  
  const handleNativeDoubleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    if (onDoubleClick) {
      console.log('Opening window for:', id);
      onDoubleClick(id);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      onDoubleClick={handleNativeDoubleClick}
      className="flex flex-col items-center gap-1 p-2 cursor-pointer select-none group focus:outline-none relative"
      style={{ width: '80px' }}
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {isSelected && (
        <div className="absolute inset-0 border border-dotted border-white/80" style={{ background: 'rgba(0,0,128,0.3)' }} />
      )}

      <div className="relative z-10 mb-1">
        <IconComponent 
          className="w-10 h-10"
          strokeWidth={ICON_STROKE[iconStyle] || 1.5}
          style={{
            color: '#ffffff',
            filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.7))'
          }}
        />
      </div>

      <span 
        className="relative z-10 text-xs text-center leading-tight"
        style={{
          color: '#ffffff',
          textShadow: '1px 1px 2px #000, -1px -1px 2px #000, 1px -1px 2px #000, -1px 1px 2px #000',
          background: isSelected ? '#000080' : 'transparent',
          padding: isSelected ? '2px 4px' : '0'
        }}
      >
        {label}
      </span>
    </motion.button>
  );
}