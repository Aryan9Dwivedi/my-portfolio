import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../config/siteData';
import { Code, BookOpen, User, Settings } from 'lucide-react';

export default function HomeWindow() {
  return (
    <div className="h-full bg-white overflow-auto">
      <div className="flex items-center justify-center min-h-full p-8">
        <div className="max-w-3xl w-full space-y-8">
          {/* ASCII Art Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <pre className="text-xs md:text-sm font-mono text-[#000080] leading-tight mb-4 overflow-x-auto">
{`
██████╗ ███████╗████████╗██████╗  ██████╗      ██████╗ ███████╗
██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██╔═══██╗    ██╔═══██╗██╔════╝
██████╔╝█████╗     ██║   ██████╔╝██║   ██║    ██║   ██║███████╗
██╔══██╗██╔══╝     ██║   ██╔══██╗██║   ██║    ██║   ██║╚════██║
██║  ██║███████╗   ██║   ██║  ██║╚██████╔╝    ╚██████╔╝███████║
╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝      ╚═════╝ ╚══════╝
`}
            </pre>
            <h1 className="text-2xl md:text-3xl font-bold text-[#000080] mb-2">
              {siteConfig.profile.name} - Portfolio System
            </h1>
            <p className="text-sm text-gray-600 font-mono">
              &gt; {siteConfig.profile.title}
            </p>
          </motion.div>

          {/* User Manual Style Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6"
            style={{
              background: '#ffffcc',
              border: '3px solid #000000',
              boxShadow: '6px 6px 0px rgba(0,0,0,0.3)'
            }}
          >
            <h2 className="text-lg font-bold text-[#000080] mb-4 flex items-center gap-2">
              📖 USER MANUAL - QUICK START GUIDE
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3">
                <span className="font-mono font-bold min-w-[60px]">[STEP 1]</span>
                <span>Double-click 🖱️ any desktop icon to launch application</span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono font-bold min-w-[60px]">[STEP 2]</span>
                <span>Use taskbar Start menu for quick access to all windows</span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono font-bold min-w-[60px]">[STEP 3]</span>
                <span>Hover over window for 5 seconds to auto-maximize</span>
              </div>
              <div className="flex gap-3">
                <span className="font-mono font-bold min-w-[60px]">[STEP 4]</span>
                <span>Customize themes and wallpapers in ⚙️ Settings</span>
              </div>
            </div>
          </motion.div>

          {/* Application Menu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: <Code className="w-6 h-6" />, title: 'Projects', desc: 'ML systems & research work', emoji: '💻' },
              { icon: <BookOpen className="w-6 h-6" />, title: 'Blog', desc: 'Technical writings & insights', emoji: '📝' },
              { icon: <User className="w-6 h-6" />, title: 'About Me', desc: 'Skills, experience & contact', emoji: '👤' },
              { icon: <Settings className="w-6 h-6" />, title: 'Settings', desc: 'Customize your experience', emoji: '⚙️' }
            ].map((item, i) => (
              <div
                key={i}
                className="p-5 transition-all cursor-pointer hover:brightness-95"
                style={{
                  background: '#c0c0c0',
                  border: '3px solid',
                  borderColor: '#ffffff #000000 #000000 #ffffff',
                  boxShadow: '3px 3px 6px rgba(0,0,0,0.3)'
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="font-bold text-[#000080]">{item.title}</div>
                </div>
                <div className="text-xs text-gray-700">{item.desc}</div>
              </div>
            ))}
          </motion.div>

          {/* System Information Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4"
            style={{
              background: '#000000',
              color: '#00ff00',
              fontFamily: 'Courier New, monospace',
              border: '2px solid #00ff00',
              boxShadow: '0 0 10px rgba(0,255,0,0.3)'
            }}
          >
            <div className="text-xs space-y-1">
              <div>&gt; SYSTEM BOOT SEQUENCE COMPLETE</div>
              <div>&gt; RetroOS Version: {siteConfig.meta.version}</div>
              <div>&gt; User Profile: {siteConfig.profile.name}</div>
              <div>&gt; Current Location: {siteConfig.profile.location}</div>
              <div>&gt; System Status: [ ✓ ONLINE ]</div>
              <div className="mt-2 animate-pulse">&gt; Ready for input_</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}