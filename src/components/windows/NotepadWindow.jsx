import React, { useState } from 'react';
import { Save, FileText } from 'lucide-react';

export default function NotepadWindow() {
  const [content, setContent] = useState('');
  const [filename, setFilename] = useState('Untitled');
  const [isSaved, setIsSaved] = useState(true);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    // Create a download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div 
        className="flex items-center gap-2 px-2 py-1 border-b"
        style={{
          background: '#c0c0c0',
          borderColor: '#808080'
        }}
      >
        <button
          onClick={handleSave}
          className="flex items-center gap-1 px-2 py-1 text-xs transition-all hover:brightness-95"
          style={{
            background: '#c0c0c0',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff'
          }}
        >
          <Save className="w-3 h-3" />
          Save
        </button>
        
        <div className="flex items-center gap-2 ml-4">
          <FileText className="w-3 h-3 text-gray-600" />
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="px-1 py-0.5 text-xs w-32 outline-none"
            style={{
              border: '1px solid',
              borderColor: '#808080 #ffffff #ffffff #808080',
              background: '#ffffff'
            }}
          />
          <span className="text-xs text-gray-600">.txt</span>
        </div>

        {!isSaved && (
          <span className="text-xs text-gray-500 ml-auto">*Modified</span>
        )}
      </div>

      {/* Text Area */}
      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Start typing..."
        className="flex-1 p-3 text-sm font-mono outline-none resize-none"
        style={{
          background: '#ffffff',
          color: '#000000',
          fontFamily: 'Courier New, monospace',
          lineHeight: '1.5'
        }}
      />

      {/* Status Bar */}
      <div 
        className="flex items-center justify-between px-2 py-1 text-xs border-t"
        style={{
          background: '#c0c0c0',
          borderColor: '#808080'
        }}
      >
        <div 
          className="px-2 py-0.5"
          style={{
            border: '1px solid',
            borderColor: '#808080 #ffffff #ffffff #808080',
            background: '#ffffff'
          }}
        >
          Lines: {content.split('\n').length}
        </div>
        <div 
          className="px-2 py-0.5"
          style={{
            border: '1px solid',
            borderColor: '#808080 #ffffff #ffffff #808080',
            background: '#ffffff'
          }}
        >
          Characters: {content.length}
        </div>
      </div>
    </div>
  );
}