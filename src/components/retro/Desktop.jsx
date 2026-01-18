import React from 'react';
import DesktopIcon from './DesktopIcon';

const THEMES = {
  teal: { desktop: '#008080' },
  gray: { desktop: '#808080' },
  bliss: { desktop: 'linear-gradient(180deg, #5ba8db 0%, #8cc5e8 40%, #a8d8a8 65%, #7cb87c 100%)' },
  beige: { desktop: '#dddddd' }
};

const WALLPAPERS = {
  clouds: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&h=1080&fit=crop',
  mountains: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
  space: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=1080&fit=crop'
};

export default function Desktop({ 
  icons, 
  selectedIcon, 
  onIconSelect, 
  onIconDoubleClick,
  onDesktopClick,
  themeSettings = { theme: 'teal', wallpaper: 'solid', iconStyle: 'default' }
}) {
  const bgStyle = themeSettings.wallpaper === 'solid' 
    ? { background: THEMES[themeSettings.theme]?.desktop || '#008080' }
    : { 
        backgroundImage: `url(${WALLPAPERS[themeSettings.wallpaper]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
  return (
    <div 
      className="absolute inset-0 overflow-hidden"
      onClick={onDesktopClick}
      style={{
        ...bgStyle,
        zIndex: 1
      }}
    >

      {/* Desktop grid for icons */}
      <div className="absolute inset-0 p-4 pb-14 pointer-events-none" style={{ zIndex: 2 }}>
        <div 
          className="grid gap-3 pointer-events-auto h-full"
          style={{
            gridTemplateColumns: 'repeat(auto-fill, 96px)',
            gridTemplateRows: 'repeat(auto-fill, 110px)',
            gridAutoFlow: 'column'
          }}
        >
          {icons.map((icon) => (
            <DesktopIcon
              key={icon.id}
              id={icon.id}
              label={icon.label}
              icon={icon.icon}
              isSelected={selectedIcon === icon.id}
              onSelect={onIconSelect}
              onDoubleClick={onIconDoubleClick}
              iconStyle={themeSettings.iconStyle}
            />
          ))}
        </div>
      </div>

      <style>{`
        /* Retro styling */
      `}</style>
    </div>
  );
}