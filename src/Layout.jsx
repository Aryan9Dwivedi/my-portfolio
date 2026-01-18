import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <style>{`
        /* Custom scrollbar for retro look */
        ::-webkit-scrollbar {
          width: 16px;
          height: 16px;
        }
        
        ::-webkit-scrollbar-track {
          background: #c0c0c0;
          border: 1px solid #808080;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #a0a0a0 100%);
          border: 2px solid;
          border-color: #ffffff #808080 #808080 #ffffff;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #e8e8e8 0%, #d0d0d0 50%, #b0b0b0 100%);
        }
        
        ::-webkit-scrollbar-button {
          background: #c0c0c0;
          border: 2px solid;
          border-color: #ffffff #808080 #808080 #ffffff;
          height: 16px;
          width: 16px;
        }
        
        ::-webkit-scrollbar-button:hover {
          background: #d0d0d0;
        }
        
        ::-webkit-scrollbar-corner {
          background: #c0c0c0;
        }

        /* Global font settings */
        body {
          font-family: 'MS Sans Serif', 'Microsoft Sans Serif', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          -webkit-font-smoothing: antialiased;
          image-rendering: pixelated;
          image-rendering: -moz-crisp-edges;
          image-rendering: crisp-edges;
        }
        
        /* Retro pixelated feel */
        canvas {
          image-rendering: pixelated;
        }
        
        img {
          image-rendering: auto;
        }

        /* Selection colors */
        ::selection {
          background: #000080;
          color: white;
        }

        /* Remove default focus outlines, add retro style */
        *:focus {
          outline: none;
        }
        
        *:focus-visible {
          outline: 1px dotted #000080;
          outline-offset: 2px;
        }

        /* Prevent text selection on UI elements */
        .no-select {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
      {children}
    </div>
  );
}