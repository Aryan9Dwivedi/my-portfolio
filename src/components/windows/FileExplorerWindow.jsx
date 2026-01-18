import React, { useState } from 'react';
import { Folder, FileText, ChevronRight, ChevronDown, Home, ArrowLeft } from 'lucide-react';
import { siteConfig } from '../config/siteData';

export default function FileExplorerWindow() {
  const [expandedFolders, setExpandedFolders] = useState(['root']);
  const [selectedPath, setSelectedPath] = useState('root');

  // Build file structure
  const fileStructure = {
    name: 'Portfolio',
    path: 'root',
    type: 'folder',
    children: [
      {
        name: 'Projects',
        path: 'root/projects',
        type: 'folder',
        children: siteConfig.projects.map(p => ({
          name: p.title,
          path: `root/projects/${p.id}`,
          type: 'file',
          data: p
        }))
      },
      {
        name: 'Blog Posts',
        path: 'root/blog',
        type: 'folder',
        children: siteConfig.blogPosts.map(p => ({
          name: p.title,
          path: `root/blog/${p.id}`,
          type: 'file',
          data: p
        }))
      },
      {
        name: 'About',
        path: 'root/about',
        type: 'folder',
        children: [
          {
            name: 'Profile.txt',
            path: 'root/about/profile',
            type: 'file',
            data: siteConfig.profile
          },
          {
            name: 'Skills.txt',
            path: 'root/about/skills',
            type: 'file',
            data: siteConfig.profile.skills
          }
        ]
      },
      {
        name: 'System',
        path: 'root/system',
        type: 'folder',
        children: [
          {
            name: 'README.txt',
            path: 'root/system/readme',
            type: 'file',
            data: { content: `RetroOS Portfolio System v${siteConfig.meta.version}\n\nWelcome to ${siteConfig.profile.name}'s portfolio!\n\nThis is a retro-themed portfolio website built with modern web technologies.` }
          }
        ]
      }
    ]
  };

  const toggleFolder = (path) => {
    setExpandedFolders(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const renderTreeItem = (item, level = 0) => {
    const isExpanded = expandedFolders.includes(item.path);
    const isSelected = selectedPath === item.path;

    return (
      <div key={item.path}>
        <div
          onClick={() => {
            setSelectedPath(item.path);
            if (item.type === 'folder') toggleFolder(item.path);
          }}
          className={`flex items-center gap-2 px-2 py-1 cursor-pointer transition-colors ${
            isSelected ? 'bg-[#000080] text-white' : 'hover:bg-[#000080]/10'
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
        >
          {item.type === 'folder' && (
            isExpanded 
              ? <ChevronDown className="w-3 h-3 flex-shrink-0" />
              : <ChevronRight className="w-3 h-3 flex-shrink-0" />
          )}
          {item.type === 'folder' ? (
            <Folder className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-yellow-300' : 'text-yellow-600'}`} />
          ) : (
            <FileText className={`w-4 h-4 flex-shrink-0 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
          )}
          <span className="text-sm truncate">{item.name}</span>
        </div>
        {item.type === 'folder' && isExpanded && item.children && (
          <div>
            {item.children.map(child => renderTreeItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const getSelectedItem = (structure, path) => {
    if (structure.path === path) return structure;
    if (structure.children) {
      for (const child of structure.children) {
        const found = getSelectedItem(child, path);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedItem = getSelectedItem(fileStructure, selectedPath);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Address Bar */}
      <div 
        className="p-2 border-b flex items-center gap-2"
        style={{
          background: '#f0f0f0',
          borderColor: '#808080'
        }}
      >
        <button
          className="p-1 transition-all hover:brightness-95"
          style={{
            background: '#c0c0c0',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff'
          }}
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => setSelectedPath('root')}
          className="p-1 transition-all hover:brightness-95"
          style={{
            background: '#c0c0c0',
            border: '2px solid',
            borderColor: '#ffffff #808080 #808080 #ffffff'
          }}
        >
          <Home className="w-4 h-4" />
        </button>
        <div 
          className="flex-1 px-2 py-1 text-sm"
          style={{
            border: '2px solid',
            borderColor: '#808080 #ffffff #ffffff #808080',
            background: '#ffffff'
          }}
        >
          {selectedPath.replace(/\//g, ' \\ ')}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Tree View */}
        <div 
          className="w-1/2 overflow-auto border-r"
          style={{
            background: '#ffffff',
            borderColor: '#808080'
          }}
        >
          {renderTreeItem(fileStructure)}
        </div>

        {/* Details View */}
        <div className="flex-1 overflow-auto p-4 bg-[#f8f8f8]">
          {selectedItem && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                {selectedItem.type === 'folder' ? (
                  <Folder className="w-12 h-12 text-yellow-600" />
                ) : (
                  <FileText className="w-12 h-12 text-gray-600" />
                )}
                <div>
                  <h2 className="text-lg font-bold text-[#000080]">{selectedItem.name}</h2>
                  <p className="text-xs text-gray-500">
                    {selectedItem.type === 'folder' 
                      ? `${selectedItem.children?.length || 0} items` 
                      : 'File'}
                  </p>
                </div>
              </div>

              {selectedItem.type === 'file' && selectedItem.data && (
                <div 
                  className="p-3 rounded text-sm"
                  style={{
                    background: '#ffffff',
                    border: '2px solid',
                    borderColor: '#808080 #ffffff #ffffff #808080'
                  }}
                >
                  {selectedItem.data.content ? (
                    <pre className="whitespace-pre-wrap font-mono text-xs">
                      {selectedItem.data.content}
                    </pre>
                  ) : selectedItem.data.title ? (
                    <div>
                      <p className="font-bold mb-2">{selectedItem.data.title}</p>
                      <p className="text-xs text-gray-600">
                        {selectedItem.data.description || selectedItem.data.excerpt}
                      </p>
                      {selectedItem.data.tags && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {selectedItem.data.tags.map(tag => (
                            <span 
                              key={tag}
                              className="text-xs px-2 py-0.5 bg-[#000080]/10 text-[#000080] rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : selectedItem.data.name ? (
                    <div>
                      <p className="font-bold">{selectedItem.data.name}</p>
                      <p className="text-xs text-gray-600 mt-1">{selectedItem.data.title}</p>
                    </div>
                  ) : (
                    <pre className="text-xs">
                      {JSON.stringify(selectedItem.data, null, 2)}
                    </pre>
                  )}
                </div>
              )}

              {selectedItem.type === 'folder' && selectedItem.children && (
                <div className="grid grid-cols-2 gap-2">
                  {selectedItem.children.map(child => (
                    <button
                      key={child.path}
                      onClick={() => setSelectedPath(child.path)}
                      className="flex items-center gap-2 p-2 text-left rounded transition-all hover:bg-[#000080]/10"
                      style={{
                        background: '#ffffff',
                        border: '1px solid #d0d0d0'
                      }}
                    >
                      {child.type === 'folder' ? (
                        <Folder className="w-6 h-6 text-yellow-600" />
                      ) : (
                        <FileText className="w-6 h-6 text-gray-600" />
                      )}
                      <span className="text-sm truncate">{child.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

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
          {selectedItem?.type === 'folder' 
            ? `${selectedItem.children?.length || 0} objects` 
            : 'File selected'}
        </div>
      </div>
    </div>
  );
}