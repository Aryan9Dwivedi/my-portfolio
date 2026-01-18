import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Folder, FileText, Star, Calendar, 
  ArrowUpDown, Grid, List, ChevronRight 
} from 'lucide-react';

export default function AllWindow({ projects, posts, onOpenWindow }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState('list');
  const [typeFilter, setTypeFilter] = useState('all');

  // Combine and format all items
  const allItems = useMemo(() => {
    const projectItems = projects.map(p => ({
      ...p,
      type: 'project',
      date: p.date,
      icon: 'folder'
    }));
    
    const postItems = posts.map(p => ({
      ...p,
      type: 'blog',
      date: p.publishedAt,
      icon: 'file'
    }));

    return [...projectItems, ...postItems];
  }, [projects, posts]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let items = allItems;

    // Type filter
    if (typeFilter !== 'all') {
      items = items.filter(i => i.type === typeFilter);
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(i => 
        i.title.toLowerCase().includes(query) ||
        (i.description || i.excerpt || '').toLowerCase().includes(query) ||
        i.tags?.some(t => t.toLowerCase().includes(query))
      );
    }

    // Sort
    items = [...items].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'type') {
        return a.type.localeCompare(b.type);
      }
      return 0;
    });

    return items;
  }, [allItems, searchQuery, sortBy, typeFilter]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div 
        className="p-2 border-b space-y-2"
        style={{
          background: '#f0f0f0',
          borderColor: '#808080'
        }}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <div 
            className="flex-1 flex items-center gap-2 px-2 py-1"
            style={{
              background: '#ffffff',
              border: '2px solid',
              borderColor: '#808080 #ffffff #ffffff #808080'
            }}
          >
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* Filters & View */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-2 py-1 text-sm"
              style={{
                background: '#c0c0c0',
                border: '2px solid',
                borderColor: '#ffffff #808080 #808080 #ffffff'
              }}
            >
              <option value="all">All Types</option>
              <option value="project">Projects</option>
              <option value="blog">Blog Posts</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2 py-1 text-sm"
              style={{
                background: '#c0c0c0',
                border: '2px solid',
                borderColor: '#ffffff #808080 #808080 #ffffff'
              }}
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="type">Sort by Type</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex">
            <button
              onClick={() => setViewMode('list')}
              className="p-1.5"
              style={{
                background: viewMode === 'list' ? '#000080' : '#c0c0c0',
                color: viewMode === 'list' ? 'white' : 'black',
                border: '2px solid',
                borderColor: viewMode === 'list' 
                  ? '#1084d0 #000050 #000050 #1084d0'
                  : '#ffffff #808080 #808080 #ffffff'
              }}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className="p-1.5"
              style={{
                background: viewMode === 'grid' ? '#000080' : '#c0c0c0',
                color: viewMode === 'grid' ? 'white' : 'black',
                border: '2px solid',
                borderColor: viewMode === 'grid' 
                  ? '#1084d0 #000050 #000050 #1084d0'
                  : '#ffffff #808080 #808080 #ffffff'
              }}
            >
              <Grid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Address Bar */}
      <div 
        className="flex items-center gap-2 px-2 py-1 border-b text-sm"
        style={{
          background: '#f8f8f8',
          borderColor: '#808080'
        }}
      >
        <span className="text-gray-500">Location:</span>
        <div 
          className="flex-1 px-2 py-0.5"
          style={{
            background: '#ffffff',
            border: '1px solid',
            borderColor: '#808080 #ffffff #ffffff #808080'
          }}
        >
          C:\Portfolio\{typeFilter === 'all' ? 'All Files' : typeFilter === 'project' ? 'Projects' : 'Blog'}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-2">
        {/* Results count */}
        <div className="text-xs text-gray-500 mb-2">
          {filteredItems.length} item(s) found
        </div>

        {viewMode === 'list' ? (
          /* List View */
          <div className="space-y-1">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex items-center gap-3 p-2 hover:bg-[#000080] hover:text-white cursor-pointer group transition-colors"
                  onClick={() => onOpenWindow(item.type === 'project' ? 'dev' : 'blog')}
                >
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {item.type === 'project' ? (
                      <Folder className="w-5 h-5 text-yellow-500 group-hover:text-yellow-300" />
                    ) : (
                      <FileText className="w-5 h-5 text-blue-500 group-hover:text-blue-300" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm truncate">{item.title}</span>
                      {item.featured && (
                        <Star className="w-3 h-3 text-yellow-500 group-hover:text-yellow-300 flex-shrink-0" fill="currentColor" />
                      )}
                    </div>
                  </div>

                  {/* Type Badge */}
                  <span className={`text-xs px-2 py-0.5 rounded flex-shrink-0 ${
                    item.type === 'project' 
                      ? 'bg-yellow-100 text-yellow-700 group-hover:bg-yellow-200' 
                      : 'bg-blue-100 text-blue-700 group-hover:bg-blue-200'
                  }`}>
                    {item.type}
                  </span>

                  {/* Date */}
                  <span className="text-xs text-gray-500 group-hover:text-white/70 flex-shrink-0 hidden sm:block">
                    {new Date(item.date).toLocaleDateString()}
                  </span>

                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-white flex-shrink-0" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.02 }}
                  className="flex flex-col items-center p-3 rounded hover:bg-[#000080]/10 cursor-pointer group text-center"
                  onClick={() => onOpenWindow(item.type === 'project' ? 'dev' : 'blog')}
                >
                  {/* Icon */}
                  <div className="relative mb-2">
                    {item.type === 'project' ? (
                      <Folder className="w-12 h-12 text-yellow-500" />
                    ) : (
                      <FileText className="w-12 h-12 text-blue-500" />
                    )}
                    {item.featured && (
                      <Star 
                        className="w-4 h-4 text-yellow-500 absolute -top-1 -right-1" 
                        fill="currentColor" 
                      />
                    )}
                  </div>

                  {/* Title */}
                  <span className="text-xs font-medium text-gray-800 group-hover:text-[#000080] line-clamp-2">
                    {item.title}
                  </span>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        )}

        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <Search className="w-10 h-10 mb-2" />
            <p>No items found</p>
          </div>
        )}
      </div>
    </div>
  );
}