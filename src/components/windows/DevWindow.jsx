import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Star, ChevronRight, Search } from 'lucide-react';

export default function DevWindow({ projects, categories }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(project => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.toLowerCase().includes(query))
    );
  });

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
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm outline-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Project List */}
        <div 
          className="w-full md:w-1/2 lg:w-2/5 overflow-auto border-r"
          style={{ borderColor: '#808080' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.button
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className={`
                  w-full p-3 text-left border-b transition-colors
                  ${selectedProject?.id === project.id 
                    ? 'bg-[#000080] text-white' 
                    : 'hover:bg-[#000080]/10'
                  }
                `}
                style={{ borderColor: '#e0e0e0' }}
              >
                <div className="flex items-start gap-3">
                  {/* Project Image Thumbnail */}
                  <div 
                    className="w-12 h-12 rounded flex-shrink-0 overflow-hidden"
                    style={{
                      border: '2px solid',
                      borderColor: '#808080 #ffffff #ffffff #808080'
                    }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm truncate">{project.title}</h3>
                      {project.featured && (
                        <Star className={`w-3 h-3 flex-shrink-0 ${
                          selectedProject?.id === project.id ? 'text-yellow-300' : 'text-yellow-500'
                        }`} fill="currentColor" />
                      )}
                    </div>
                    <p className={`text-xs truncate ${
                      selectedProject?.id === project.id ? 'text-white/70' : 'text-gray-500'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {project.tags.slice(0, 3).map(tag => (
                        <span 
                          key={tag}
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            selectedProject?.id === project.id 
                              ? 'bg-white/20 text-white' 
                              : 'bg-[#000080]/10 text-[#000080]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 flex-shrink-0 ${
                    selectedProject?.id === project.id ? 'text-white' : 'text-gray-400'
                  }`} />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Project Detail */}
        <div className="hidden md:flex flex-1 flex-col overflow-auto bg-[#f8f8f8]">
          {selectedProject ? (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4"
            >
              {/* Project Image */}
              <div 
                className="w-full aspect-video rounded overflow-hidden mb-4"
                style={{
                  border: '3px solid',
                  borderColor: '#808080 #ffffff #ffffff #808080'
                }}
              >
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Info */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h2 className="text-xl font-bold text-[#000080]">
                    {selectedProject.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(selectedProject.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </p>
                </div>
                
                {selectedProject.featured && (
                  <div 
                    className="flex items-center gap-1 px-2 py-1 text-xs font-medium"
                    style={{
                      background: '#ffffcc',
                      border: '1px solid #cccc00'
                    }}
                  >
                    <Star className="w-3 h-3 text-yellow-600" fill="currentColor" />
                    Featured
                  </div>
                )}
              </div>

              <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map(tag => (
                  <span 
                    key={tag}
                    className="text-xs px-2 py-1 font-medium"
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

              {/* Links */}
              <div className="flex gap-2">
                {selectedProject.links.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all hover:brightness-110"
                    style={{
                      background: '#c0c0c0',
                      border: '2px solid',
                      borderColor: '#ffffff #808080 #808080 #ffffff'
                    }}
                  >
                    <Github className="w-4 h-4" />
                    View Source
                  </a>
                )}
                {selectedProject.links.live && selectedProject.links.live !== '#' && (
                  <a
                    href={selectedProject.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white transition-all hover:brightness-110"
                    style={{
                      background: 'linear-gradient(180deg, #000080, #1084d0)',
                      border: '2px solid',
                      borderColor: '#1084d0 #000050 #000050 #1084d0'
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded bg-gray-200 flex items-center justify-center">
                  <ChevronRight className="w-8 h-8" />
                </div>
                <p>Select a project to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}