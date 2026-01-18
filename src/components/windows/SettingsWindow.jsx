import React, { useState, useEffect } from 'react';
import { Palette, Image, Grid3x3, Save, Volume2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const THEMES = {
  teal: {
    name: 'Windows 95 Teal',
    desktop: '#008080',
    window: '#c0c0c0',
    titleBar: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)'
  },
  gray: {
    name: 'Windows 95 Gray',
    desktop: '#808080',
    window: '#c0c0c0',
    titleBar: 'linear-gradient(90deg, #000080 0%, #1084d0 100%)'
  },
  bliss: {
    name: 'Windows XP Bliss',
    desktop: 'linear-gradient(180deg, #5ba8db 0%, #8cc5e8 40%, #a8d8a8 65%, #7cb87c 100%)',
    window: '#ece9d8',
    titleBar: 'linear-gradient(180deg, #0997ff 0%, #0053ee 3%, #0050ee 6%, #004ee4 10%, #0041d5 88%, #003dd0 91%, #003acb 94%, #0037c7 97%, #0033bf 100%)'
  },
  beige: {
    name: 'Classic Mac OS',
    desktop: '#dddddd',
    window: '#ddd',
    titleBar: 'linear-gradient(180deg, #e0e0e0 0%, #b0b0b0 100%)'
  }
};

const WALLPAPERS = [
  { id: 'solid', name: 'Solid Color', url: null },
  { id: 'clouds', name: 'Clouds', url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&h=1080&fit=crop' },
  { id: 'mountains', name: 'Mountains', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop' },
  { id: 'space', name: 'Space', url: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1920&h=1080&fit=crop' }
];

const ICON_STYLES = [
  { id: 'default', name: 'Modern', strokeWidth: 1.5 },
  { id: 'bold', name: 'Bold', strokeWidth: 2.5 },
  { id: 'thin', name: 'Minimal', strokeWidth: 1 }
];

export default function SettingsWindow() {
  const [theme, setTheme] = useState('teal');
  const [wallpaper, setWallpaper] = useState('solid');
  const [iconStyle, setIconStyle] = useState('default');
  const [colorScheme, setColorScheme] = useState('blue');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [cursorTrailEnabled, setCursorTrailEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('retroTheme');
    if (saved) {
      const parsed = JSON.parse(saved);
      setTheme(parsed.theme || 'teal');
      setWallpaper(parsed.wallpaper || 'solid');
      setIconStyle(parsed.iconStyle || 'default');
      setColorScheme(parsed.colorScheme || 'blue');
      setSoundEnabled(parsed.soundEnabled !== false);
      setCursorTrailEnabled(parsed.cursorTrailEnabled !== false);
    }
  }, []);

  const handleSave = () => {
    const settings = {
      theme,
      wallpaper,
      iconStyle,
      colorScheme,
      soundEnabled,
      cursorTrailEnabled
    };
    localStorage.setItem('retroTheme', JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('themeChange', { detail: settings }));
  };

  return (
    <div className="h-full bg-white overflow-auto">
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="border-b-2 pb-4" style={{ borderColor: '#000080' }}>
          <h2 className="text-2xl font-bold text-[#000080] flex items-center gap-2">
            <Palette className="w-6 h-6" />
            Customize Your Retro Experience
          </h2>
          <p className="text-sm text-gray-600 mt-1">Personalize your desktop theme, icons, and effects</p>
        </div>

        {/* Color Theme Section */}
        <div 
          className="space-y-4 p-4 rounded-lg"
          style={{
            background: '#f0f0f0',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff'
          }}
        >
          <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
            <Palette className="w-6 h-6 text-[#000080]" />
            Color Theme
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(THEMES).map(([key, t]) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className="p-4 transition-all group"
                style={{
                  border: '3px solid',
                  borderColor: theme === key 
                    ? '#000080 #c0c0c0 #c0c0c0 #000080'
                    : '#ffffff #000000 #000000 #ffffff',
                  background: theme === key ? '#c0c0c0' : '#dfdfdf',
                  boxShadow: theme === key ? 'inset 2px 2px 4px rgba(0,0,0,0.2)' : '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded"
                    style={{ 
                      background: t.desktop,
                      border: '2px solid #000000',
                      boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                    }}
                  />
                  <div className="text-left flex-1">
                    <div className="font-bold text-base mb-1">{t.name}</div>
                    <div className="text-xs text-gray-600">Classic retro theme</div>
                    {theme === key && <div className="text-xs text-[#000080] font-bold mt-1">✓ Active</div>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Window Color Scheme */}
        <div 
          className="space-y-4 p-4 rounded-lg"
          style={{
            background: '#f0f0f0',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff'
          }}
        >
          <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
            🎨 Window Color Scheme
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: 'blue', name: 'Classic Blue', color: '#000080' },
              { id: 'purple', name: 'Purple', color: '#800080' },
              { id: 'green', name: 'Green', color: '#008000' },
              { id: 'red', name: 'Red', color: '#800000' },
              { id: 'teal', name: 'Teal', color: '#008080' },
              { id: 'orange', name: 'Orange', color: '#ff6600' }
            ].map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => setColorScheme(scheme.id)}
                className="p-3 text-left transition-all"
                style={{
                  background: colorScheme === scheme.id ? '#c0c0c0' : '#dfdfdf',
                  border: '3px solid',
                  borderColor: colorScheme === scheme.id 
                    ? '#000080 #c0c0c0 #c0c0c0 #000080'
                    : '#ffffff #000000 #000000 #ffffff',
                  boxShadow: colorScheme === scheme.id ? 'inset 2px 2px 4px rgba(0,0,0,0.2)' : '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded"
                    style={{ background: scheme.color }}
                  />
                  <div>
                    <div className="text-sm font-bold">{scheme.name}</div>
                    {colorScheme === scheme.id && <div className="text-xs text-[#000080]">✓ Active</div>}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Wallpaper Section */}
        <div 
          className="space-y-4 p-4 rounded-lg"
          style={{
            background: '#f0f0f0',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff'
          }}
        >
          <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
            <Image className="w-6 h-6 text-[#000080]" />
            Desktop Wallpaper
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {WALLPAPERS.map((w) => (
              <button
                key={w.id}
                onClick={() => setWallpaper(w.id)}
                className="p-2 transition-all"
                style={{
                  border: '3px solid',
                  borderColor: wallpaper === w.id 
                    ? '#000080 #c0c0c0 #c0c0c0 #000080'
                    : '#ffffff #000000 #000000 #ffffff',
                  background: '#dfdfdf',
                  boxShadow: wallpaper === w.id ? 'inset 2px 2px 4px rgba(0,0,0,0.2)' : '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                <div 
                  className="w-full h-20 mb-2 bg-cover bg-center"
                  style={{ 
                    background: w.url ? `url(${w.url}) center/cover` : THEMES[theme].desktop,
                    border: '2px solid #000000'
                  }}
                />
                <div className="text-xs font-bold">{w.name}</div>
                {wallpaper === w.id && <div className="text-xs text-[#000080] mt-1">✓</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Icon Style Section */}
        <div 
          className="space-y-4 p-4 rounded-lg"
          style={{
            background: '#f0f0f0',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff'
          }}
        >
          <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
            <Grid3x3 className="w-6 h-6 text-[#000080]" />
            Icon Style
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {ICON_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => setIconStyle(style.id)}
                className="p-4 transition-all"
                style={{
                  border: '3px solid',
                  borderColor: iconStyle === style.id 
                    ? '#000080 #c0c0c0 #c0c0c0 #000080'
                    : '#ffffff #000000 #000000 #ffffff',
                  background: iconStyle === style.id ? '#c0c0c0' : '#dfdfdf',
                  boxShadow: iconStyle === style.id ? 'inset 2px 2px 4px rgba(0,0,0,0.2)' : '2px 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                <div className="text-sm font-bold mb-3">{style.name}</div>
                <div className="flex justify-center">
                  <Grid3x3 
                    className="w-10 h-10 text-gray-800"
                    strokeWidth={style.strokeWidth}
                  />
                </div>
                {iconStyle === style.id && <div className="text-xs text-[#000080] font-bold mt-2">✓ Selected</div>}
              </button>
            ))}
          </div>
        </div>

        {/* Effects & Sounds */}
        <div 
          className="space-y-4 p-4 rounded-lg"
          style={{
            background: '#f0f0f0',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff'
          }}
        >
          <h3 className="font-bold text-gray-800 flex items-center gap-2 text-lg">
            <Sparkles className="w-6 h-6 text-[#000080]" />
            Effects & Sounds
          </h3>
          <div className="space-y-3">
            <label 
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/50 rounded transition-all"
              style={{
                border: '2px solid',
                borderColor: '#ffffff #808080 #808080 #ffffff'
              }}
            >
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-5 h-5"
              />
              <Volume2 className="w-5 h-5 text-[#000080]" />
              <div>
                <div className="text-sm font-bold">Sound Effects</div>
                <div className="text-xs text-gray-600">Enable retro beeps for window actions</div>
              </div>
            </label>
            <label 
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-white/50 rounded transition-all"
              style={{
                border: '2px solid',
                borderColor: '#ffffff #808080 #808080 #ffffff'
              }}
            >
              <input
                type="checkbox"
                checked={cursorTrailEnabled}
                onChange={(e) => setCursorTrailEnabled(e.target.checked)}
                className="w-5 h-5"
              />
              <Sparkles className="w-5 h-5 text-[#000080]" />
              <div>
                <div className="text-sm font-bold">Cursor Trail</div>
                <div className="text-xs text-gray-600">Show pixelated trail as you move the cursor</div>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <Button
            onClick={handleSave}
            className="w-full py-8 text-lg font-bold hover:brightness-105 active:brightness-95"
            style={{
              background: 'linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #a0a0a0 100%)',
              border: '3px solid',
              borderColor: '#ffffff #000000 #000000 #ffffff',
              color: '#000000',
              boxShadow: '3px 3px 6px rgba(0,0,0,0.4)'
            }}
          >
            <Save className="w-6 h-6 mr-2" />
            💾 Apply Settings
          </Button>
          <p className="text-sm text-gray-600 text-center mt-3 font-medium">
            ✨ Changes apply instantly!
          </p>
        </div>
      </div>
    </div>
  );
}