import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, Mail, Download, ExternalLink,
  Github, Linkedin, Twitter
} from 'lucide-react';

const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter
};

export default function MeWindow({ profile }) {
  return (
    <div className="h-full overflow-auto bg-white">
      <div className="max-w-3xl mx-auto p-6">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center gap-6 mb-8"
        >
          {/* Avatar */}
          <div 
            className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0"
            style={{
              border: '4px solid',
              borderColor: '#ffffff #808080 #808080 #ffffff',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.2)'
            }}
          >
            <img 
              src={profile.avatar} 
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-[#000080] mb-1">
              {profile.name}
            </h1>
            <p className="text-gray-600 mb-3">{profile.title}</p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {profile.email}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 p-4 rounded"
          style={{
            background: '#ffffff',
            border: '2px solid',
            borderColor: '#808080 #ffffff #ffffff #808080'
          }}
        >
          <h2 className="text-lg font-bold text-[#000080] mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#000080] rounded-full"></span>
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-4 rounded"
          style={{
            background: '#ffffff',
            border: '2px solid',
            borderColor: '#808080 #ffffff #ffffff #808080'
          }}
        >
          <h2 className="text-lg font-bold text-[#000080] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#000080] rounded-full"></span>
            Skills
          </h2>
          
          <div className="space-y-3">
            {profile.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-xs text-gray-500">{skill.level}%</span>
                </div>
                <div 
                  className="h-4 rounded-sm overflow-hidden"
                  style={{
                    background: '#e0e0e0',
                    border: '2px solid',
                    borderColor: '#808080 #ffffff #ffffff #808080'
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="h-full"
                    style={{
                      background: 'linear-gradient(180deg, #1084d0 0%, #000080 100%)'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Connect Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded"
          style={{
            background: '#ffffff',
            border: '2px solid',
            borderColor: '#808080 #ffffff #ffffff #808080'
          }}
        >
          <h2 className="text-lg font-bold text-[#000080] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-[#000080] rounded-full"></span>
            Connect
          </h2>

          <div className="flex flex-wrap gap-3 mb-4">
            {profile.socialLinks.map((link) => {
              const IconComponent = socialIconMap[link.icon] || ExternalLink;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm transition-all hover:brightness-110"
                  style={{
                    background: '#c0c0c0',
                    border: '2px solid',
                    borderColor: '#ffffff #808080 #808080 #ffffff'
                  }}
                >
                  <IconComponent className="w-4 h-4" />
                  {link.platform}
                </a>
              );
            })}
          </div>

          {/* Resume Button */}
          {profile.resumeUrl && profile.resumeUrl !== "#" && (
            <a
              href={profile.resumeUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-white text-sm font-medium transition-all hover:brightness-110"
              style={{
                background: 'linear-gradient(180deg, #000080, #1084d0)',
                border: '2px solid',
                borderColor: '#1084d0 #000050 #000050 #1084d0'
              }}
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          )}
        </motion.div>
      </div>
    </div>
  );
}