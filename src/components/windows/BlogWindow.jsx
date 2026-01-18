import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, ChevronRight, Search } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function BlogWindow({ posts, categories }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = posts.filter(post => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

  if (selectedPost) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Post Header */}
        <div 
          className="p-3 border-b flex items-center gap-3"
          style={{
            background: '#f0f0f0',
            borderColor: '#808080'
          }}
        >
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-1 px-2 py-1 text-sm hover:bg-[#000080] hover:text-white transition-colors"
            style={{
              border: '2px solid',
              borderColor: '#ffffff #808080 #808080 #ffffff'
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <span className="text-sm text-gray-500 truncate">{selectedPost.title}</span>
        </div>

        {/* Post Content */}
        <div className="flex-1 overflow-auto">
          <article className="max-w-3xl mx-auto p-6">
            {/* Cover Image */}
            <div 
              className="w-full aspect-[2/1] rounded overflow-hidden mb-6"
              style={{
                border: '3px solid',
                borderColor: '#808080 #ffffff #ffffff #808080'
              }}
            >
              <img 
                src={selectedPost.coverImage} 
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title & Meta */}
            <h1 className="text-2xl md:text-3xl font-bold text-[#000080] mb-3">
              {selectedPost.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(selectedPost.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedPost.readTime}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedPost.tags.map(tag => (
                <span 
                  key={tag}
                  className="text-xs px-2 py-1"
                  style={{
                    background: '#e0e0e0',
                    border: '1px solid',
                    borderColor: '#808080 #ffffff #ffffff #808080'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div 
              className="prose prose-sm max-w-none"
              style={{
                '--tw-prose-headings': '#000080',
                '--tw-prose-links': '#1084d0'
              }}
            >
              <ReactMarkdown
                components={{
                  h1: ({children}) => <h1 className="text-2xl font-bold text-[#000080] mt-8 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-xl font-bold text-[#000080] mt-6 mb-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-lg font-bold text-[#000080] mt-4 mb-2">{children}</h3>,
                  p: ({children}) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
                  ul: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
                  ol: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
                  code: ({inline, children}) => inline 
                    ? <code className="px-1 py-0.5 bg-gray-100 text-[#000080] text-sm rounded">{children}</code>
                    : <code className="block p-3 bg-[#000080] text-green-400 text-sm rounded overflow-x-auto my-4">{children}</code>,
                  pre: ({children}) => <pre className="bg-[#000080] text-green-400 p-4 rounded overflow-x-auto my-4 text-sm">{children}</pre>,
                  blockquote: ({children}) => (
                    <blockquote 
                      className="pl-4 my-4 text-gray-600 italic"
                      style={{ borderLeft: '4px solid #000080' }}
                    >
                      {children}
                    </blockquote>
                  )
                }}
              >
                {selectedPost.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Search Bar */}
      <div 
        className="p-2 border-b"
        style={{
          background: '#f0f0f0',
          borderColor: '#808080'
        }}
      >
        <div className="flex items-center gap-2 px-2 py-1 bg-white" style={{
          border: '2px solid',
          borderColor: '#808080 #ffffff #ffffff #808080'
        }}>
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm outline-none"
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.button
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedPost(post)}
                className="text-left rounded overflow-hidden transition-all hover:shadow-lg group"
                style={{
                  background: '#ffffff',
                  border: '2px solid',
                  borderColor: '#808080 #ffffff #ffffff #808080'
                }}
              >
                {/* Cover Image */}
                <div className="aspect-[2/1] overflow-hidden">
                  <img 
                    src={post.coverImage} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>

                  <h3 className="font-bold text-[#000080] mb-2 group-hover:underline">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      {post.tags.slice(0, 2).map(tag => (
                        <span 
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 bg-[#000080]/10 text-[#000080] rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#000080] transition-colors" />
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}