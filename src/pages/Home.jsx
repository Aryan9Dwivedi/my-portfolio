import React, { useState, useCallback } from 'react';
import { siteConfig } from '../components/config/siteData';
import Desktop from '../components/retro/Desktop';
import Taskbar from '../components/retro/Taskbar';
import WindowFrame from '../components/retro/WindowFrame';
import HomeWindow from '../components/windows/HomeWindow';
import DevWindow from '../components/windows/DevWindow';
import BlogWindow from '../components/windows/BlogWindow';
import AllWindow from '../components/windows/AllWindow';
import MeWindow from '../components/windows/MeWindow';
import SettingsWindow from '../components/windows/SettingsWindow';
import NotepadWindow from '../components/windows/NotepadWindow';
import CalculatorWindow from '../components/windows/CalculatorWindow';
import FileExplorerWindow from '../components/windows/FileExplorerWindow';
import ShutdownWindow from '../components/windows/ShutdownWindow';
import CursorTrail from '../components/retro/CursorTrail';
import { soundManager } from '@/components/utils/sounds';

export default function Home() {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [fullscreenWindow, setFullscreenWindow] = useState(null);
  const [themeSettings, setThemeSettings] = useState({ 
    theme: 'teal', 
    wallpaper: 'solid', 
    iconStyle: 'default',
    colorScheme: 'blue',
    soundEnabled: true,
    cursorTrailEnabled: true
  });

  const handleIconSelect = useCallback((iconId) => {
    setSelectedIcon(iconId);
  }, []);

  const handleIconDoubleClick = useCallback((iconId) => {
    console.log('Double clicked icon:', iconId);
    if (themeSettings.soundEnabled) soundManager.windowOpen();
    
    if (iconId === 'shutdown') {
      setOpenWindows([iconId]);
      setMinimizedWindows([]);
      setActiveWindow(iconId);
      setFullscreenWindow(iconId);
      setSelectedIcon(null);
      setTimeout(() => {
        const handleClick = () => {
          handleWindowClose('shutdown');
          document.removeEventListener('click', handleClick);
        };
        document.addEventListener('click', handleClick);
      }, 2500);
      return;
    }
    if (!openWindows.includes(iconId)) {
      setOpenWindows(prev => [...prev, iconId]);
    }
    setMinimizedWindows(prev => prev.filter(id => id !== iconId));
    setActiveWindow(iconId);
    setSelectedIcon(null);
  }, [openWindows, themeSettings.soundEnabled]);

  const handleWindowClose = useCallback((windowId) => {
    if (themeSettings.soundEnabled) soundManager.windowClose();
    setOpenWindows(prev => prev.filter(id => id !== windowId));
    setMinimizedWindows(prev => prev.filter(id => id !== windowId));
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter(id => id !== windowId);
      setActiveWindow(remainingWindows[remainingWindows.length - 1] || null);
    }
  }, [openWindows, activeWindow, themeSettings.soundEnabled]);

  const handleWindowMinimize = useCallback((windowId) => {
    if (themeSettings.soundEnabled) soundManager.windowMinimize();
    if (!minimizedWindows.includes(windowId)) {
      setMinimizedWindows(prev => [...prev, windowId]);
    }
    setFullscreenWindow(null);
    if (activeWindow === windowId) {
      const visibleWindows = openWindows.filter(
        id => id !== windowId && !minimizedWindows.includes(id)
      );
      setActiveWindow(visibleWindows[visibleWindows.length - 1] || null);
    }
  }, [openWindows, minimizedWindows, activeWindow, themeSettings.soundEnabled]);

  const handleWindowMaximize = useCallback((windowId) => {
    setFullscreenWindow(fullscreenWindow === windowId ? null : windowId);
  }, [fullscreenWindow]);

  const handleTaskbarWindowClick = useCallback((windowId) => {
    if (minimizedWindows.includes(windowId)) {
      setMinimizedWindows(prev => prev.filter(id => id !== windowId));
      setActiveWindow(windowId);
    } else if (activeWindow === windowId) {
      setMinimizedWindows(prev => [...prev, windowId]);
      const visibleWindows = openWindows.filter(
        id => id !== windowId && !minimizedWindows.includes(id)
      );
      setActiveWindow(visibleWindows[visibleWindows.length - 1] || null);
    } else {
      setActiveWindow(windowId);
    }
  }, [openWindows, minimizedWindows, activeWindow]);

  const handleDesktopClick = useCallback(() => {
    setSelectedIcon(null);
  }, []);

  React.useEffect(() => {
    const saved = localStorage.getItem('retroTheme');
    if (saved) {
      const parsed = JSON.parse(saved);
      setThemeSettings(parsed);
      soundManager.enabled = parsed.soundEnabled !== false;
    }

    const handleThemeChange = (e) => {
      setThemeSettings(e.detail);
      soundManager.enabled = e.detail.soundEnabled !== false;
    };

    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);

  const renderWindowContent = (windowId) => {
    switch (windowId) {
      case 'home':
        return <HomeWindow profile={siteConfig.profile} />;
      case 'dev':
        return (
          <DevWindow 
            projects={siteConfig.projects} 
            categories={siteConfig.projectCategories} 
          />
        );
      case 'blog':
        return (
          <BlogWindow 
            posts={siteConfig.blogPosts} 
            categories={siteConfig.blogCategories} 
          />
        );
      case 'all':
        return (
          <AllWindow 
            projects={siteConfig.projects} 
            posts={siteConfig.blogPosts}
            onOpenWindow={handleIconDoubleClick}
          />
        );
      case 'me':
        return <MeWindow profile={siteConfig.profile} />;
      case 'settings':
        return <SettingsWindow />;
      case 'notepad':
        return <NotepadWindow />;
      case 'calculator':
        return <CalculatorWindow />;
      case 'fileexplorer':
        return <FileExplorerWindow />;
      case 'shutdown':
        return <ShutdownWindow />;
      default:
        return <div className="p-4">Unknown window</div>;
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden select-none relative" style={{ background: '#008080' }}>
      {/* Cursor Trail */}
      {themeSettings.cursorTrailEnabled && <CursorTrail />}
      
      {/* Desktop Background with Icons */}
      <Desktop
        icons={siteConfig.desktopIcons}
        selectedIcon={selectedIcon}
        onIconSelect={handleIconSelect}
        onIconDoubleClick={handleIconDoubleClick}
        onDesktopClick={handleDesktopClick}
        themeSettings={themeSettings}
      />

      {/* Open Windows */}
      {openWindows.map((windowId, index) => (
        <WindowFrame
          key={windowId}
          windowId={windowId}
          title={siteConfig.windowTitles[windowId]}
          isOpen={true}
          isMinimized={minimizedWindows.includes(windowId)}
          isFullscreen={fullscreenWindow === windowId}
          onClose={() => handleWindowClose(windowId)}
          onMinimize={() => handleWindowMinimize(windowId)}
          onMaximize={() => handleWindowMaximize(windowId)}
          zIndex={activeWindow === windowId ? 30 : 10 + index}
          colorScheme={themeSettings.colorScheme}
        >
          {renderWindowContent(windowId)}
        </WindowFrame>
      ))}

      {/* Taskbar */}
      <Taskbar
        openWindows={openWindows}
        minimizedWindows={minimizedWindows}
        activeWindow={activeWindow}
        onWindowClick={handleTaskbarWindowClick}
        onStartClick={handleIconDoubleClick}
        windowTitles={siteConfig.windowTitles}
        desktopIcons={siteConfig.desktopIcons}
      />
    </div>
  );
}