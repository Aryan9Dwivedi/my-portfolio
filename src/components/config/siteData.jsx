// ============================================
// CENTRAL CONFIGURATION FILE
// ============================================
// 
// 📝 HOW TO UPDATE YOUR PORTFOLIO:
//
// 1. PERSONAL INFO: Update profile section below (lines 20-50)
// 2. ADD PROJECT: Copy a project object in the projects array and modify
// 3. REMOVE PROJECT: Delete the project object from the projects array
// 4. ADD BLOG POST: Copy a blog post object in blogPosts array and modify
// 5. REMOVE BLOG POST: Delete the blog post from the blogPosts array
// 6. ADD DESKTOP ICON: Add to desktopIcons array with position
//
// ⚠️ IMPORTANT: Keep the structure intact, only change values!
// ============================================

export const siteConfig = {
  // Site metadata
  meta: {
    title: "Aryan's Portfolio",
    author: "Aryan Dwivedi",
    version: "1.0.0",
    startMenuName: "Retro OS"
  },

  // Desktop icons configuration
  // Add/remove icons here to change navigation
  desktopIcons: [
    {
      id: "home",
      label: "Welcome",
      icon: "home",
      position: { row: 0, col: 0 }
    },
    {
      id: "dev",
      label: "Projects",
      icon: "folder",
      position: { row: 1, col: 0 }
    },
    {
      id: "blog",
      label: "Blog",
      icon: "file-text",
      position: { row: 2, col: 0 }
    },
    {
      id: "all",
      label: "Explorer",
      icon: "search",
      position: { row: 0, col: 1 }
    },
    {
      id: "me",
      label: "About Me",
      icon: "user",
      position: { row: 1, col: 1 }
    },
    {
      id: "settings",
      label: "Settings",
      icon: "settings",
      position: { row: 2, col: 1 }
    },
    {
      id: "notepad",
      label: "Notepad",
      icon: "file-text",
      position: { row: 3, col: 0 }
    },
    {
      id: "calculator",
      label: "Calculator",
      icon: "calculator",
      position: { row: 3, col: 1 }
    },
    {
      id: "fileexplorer",
      label: "File Browser",
      icon: "folder",
      position: { row: 4, col: 0 }
    },
    {
      id: "shutdown",
      label: "Shut Down",
      icon: "monitor",
      position: { row: 4, col: 1 }
    }
  ],

  // Window titles for each section
  windowTitles: {
    home: "Welcome to RetroOS",
    dev: "Projects & Work",
    blog: "Blog Posts",
    all: "File Explorer - All Content",
    me: "About Me - Profile",
    settings: "Settings - Customize Your Experience",
    notepad: "Notepad - Text Editor",
    calculator: "Calculator",
    fileexplorer: "File Browser - Portfolio Contents",
    shutdown: "Shut Down Windows"
  },

  // ============================================
  // 👤 YOUR PROFILE INFORMATION
  // Update this section with your details
  // ============================================
  profile: {
    name: "Aryan Dwivedi",
    title: "MS in AI @ Northwestern | ML Engineer & Researcher",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/400px-Tux.svg.png",
    bio: "I'm a graduate student at Northwestern University specializing in Artificial Intelligence, with a passion for building production-ready ML systems backed by solid research foundations. I thrive at the intersection of applied engineering and research prototyping — designing rigorous experiments, building reliable data pipelines, and shipping clean, maintainable code. My work focuses on solving real-world problems where technical depth meets execution quality. Currently seeking AI/ML internships and research opportunities where I can contribute meaningfully, iterate quickly, and deliver impactful results.",
    location: "Evanston, IL",
    email: "aryandwivedi352@gmail.com",
    skills: [
      { name: "Python", level: 95 },
      { name: "PyTorch", level: 90 },
      { name: "Machine Learning", level: 92 },
      { name: "Deep Learning", level: 88 },
      { name: "Data Science", level: 90 },
      { name: "FastAPI/Django", level: 85 },
      { name: "React/TypeScript", level: 82 },
      { name: "MLOps", level: 80 }
    ],
    socialLinks: [
      { platform: "GitHub", url: "https://github.com/Aryan9Dwivedi", icon: "github" },
      { platform: "LinkedIn", url: "https://www.linkedin.com/in/aryan-dwivedi-20aa56202/", icon: "linkedin" }
    ],
    resumeUrl: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/696c5fe6f803ce02fefa116a/437ed9adc_Curriculum_vitae.pdf"
  },

  // ============================================
  // 💼 YOUR PROJECTS
  // To add a new project: Copy one of these objects and modify the values
  // To remove: Delete the entire project object
  // ============================================
  projects: [
    {
      id: "proj-1",
      title: "ML Playground",
      description: "An interactive machine learning playground for experimenting with various ML algorithms and visualizations in real-time.",
      longDescription: "ML Playground provides an intuitive interface for experimenting with machine learning algorithms. Features interactive visualizations, real-time parameter tuning, and educational resources for learning ML concepts.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop",
      tags: ["Python", "Machine Learning", "TensorFlow", "Scikit-learn", "Data Viz"],
      category: "tool",
      featured: true,
      links: {
        github: "https://github.com/Aryan9Dwivedi/Ml-Playground",
        live: "#"
      },
      date: "2024-01"
    },
    {
      id: "proj-2",
      title: "Black Hole Simulation",
      description: "A stunning physics-based simulation of black hole dynamics with realistic gravitational lensing and event horizon visualization.",
      longDescription: "This project simulates black hole physics using advanced algorithms to render gravitational effects, light bending, and spacetime distortion. Perfect for understanding complex astrophysics concepts through interactive visualization.",
      image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop",
      tags: ["Physics", "WebGL", "Three.js", "Simulation", "Astrophysics"],
      category: "game",
      featured: true,
      links: {
        github: "https://github.com/Aryan9Dwivedi/BlackHole-Simulation-",
        live: "#"
      },
      date: "2023-11"
    },
    {
      id: "proj-3",
      title: "Player Recommendation & Evaluation System (PRES)",
      description: "Advanced analytics system for player recommendation and performance evaluation using machine learning and statistical analysis.",
      longDescription: "PRES uses sophisticated ML algorithms to analyze player performance data, generate insights, and provide data-driven recommendations. Includes comprehensive evaluation metrics, performance tracking, and predictive analytics for sports management.",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&h=400&fit=crop",
      tags: ["Python", "Machine Learning", "Data Science", "Analytics", "Sports Tech"],
      category: "backend",
      featured: true,
      links: {
        github: "https://github.com/Aryan9Dwivedi/Player-Recommendation-Evaluation-System-PRES-",
        live: "#"
      },
      date: "2023-09"
    },
    {
      id: "proj-2",
      title: "RetroType",
      description: "A nostalgic typing game with pixel art graphics and chiptune music. Test your typing speed in style!",
      longDescription: "Created a fun typing game that combines modern web technologies with retro aesthetics. Features multiple difficulty levels, global leaderboards, and custom themes.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
      tags: ["TypeScript", "Canvas API", "Web Audio", "Firebase"],
      category: "game",
      featured: true,
      links: {
        github: "https://github.com/yourusername/retrotype",
        live: "https://retrotype.io"
      },
      date: "2023-11"
    },
    {
      id: "proj-3",
      title: "TaskFlow API",
      description: "A robust REST API for task management with real-time sync, team workspaces, and integrations.",
      longDescription: "Designed and built a scalable task management API that powers multiple client applications. Includes OAuth2 authentication, webhook support, and comprehensive documentation.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      tags: ["Python", "FastAPI", "Redis", "Docker", "AWS"],
      category: "backend",
      featured: false,
      links: {
        github: "https://github.com/yourusername/taskflow-api",
        live: "https://api.taskflow.dev/docs"
      },
      date: "2023-09"
    },
    {
      id: "proj-4",
      title: "PixelPaint Studio",
      description: "A browser-based pixel art editor with layers, animation support, and export to multiple formats.",
      longDescription: "Full-featured pixel art creation tool that runs entirely in the browser. Supports multiple layers, onion skinning for animations, and exports to PNG, GIF, and sprite sheets.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
      tags: ["React", "Canvas API", "IndexedDB", "Web Workers"],
      category: "tool",
      featured: true,
      links: {
        github: "https://github.com/yourusername/pixelpaint",
        live: "https://pixelpaint.studio"
      },
      date: "2023-06"
    },
    {
      id: "proj-5",
      title: "EcoTracker Mobile",
      description: "Cross-platform mobile app for tracking personal carbon footprint with gamification elements.",
      longDescription: "Mobile application that helps users understand and reduce their environmental impact. Features daily challenges, achievement badges, and community leaderboards.",
      image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=600&h=400&fit=crop",
      tags: ["React Native", "Expo", "GraphQL", "MongoDB"],
      category: "mobile",
      featured: false,
      links: {
        github: "https://github.com/yourusername/ecotracker",
        live: "#"
      },
      date: "2023-03"
    }
  ],

  // ============================================
  // 📝 YOUR BLOG POSTS
  // To add a new post: Copy one of these objects and modify the values
  // To remove: Delete the entire blog post object
  // ============================================
  blogPosts: [
    {
      id: "blog-1",
      title: "Building an Interactive Machine Learning Playground",
      slug: "ml-playground-guide",
      excerpt: "Learn how I created an interactive ML playground for experimenting with algorithms, visualizations, and real-time parameter tuning.",
      content: `# Building an Interactive Machine Learning Playground

Creating educational tools for ML can make complex concepts accessible. Here's how I built an interactive ML playground...

## The Vision

Machine learning can feel intimidating for beginners. I wanted to create a space where anyone could experiment with algorithms, see real-time visualizations, and understand how different parameters affect model performance.

## Technical Stack

Built with Python, TensorFlow, and interactive visualizations:

\`\`\`python
import tensorflow as tf
from sklearn.datasets import make_classification

# Interactive parameter tuning
model = tf.keras.Sequential([
    tf.keras.layers.Dense(units=128, activation='relu'),
    tf.keras.layers.Dense(units=1, activation='sigmoid')
])
\`\`\`

## Key Features

1. Real-time algorithm visualization
2. Interactive parameter adjustment
3. Multiple dataset options
4. Performance metrics dashboard

The result? A tool that makes ML learning fun and intuitive.`,
      coverImage: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
      tags: ["Machine Learning", "Python", "Education", "Tutorial"],
      category: "tech",
      publishedAt: "2024-01-15",
      readTime: "6 min read"
    },
    {
      id: "blog-2",
      title: "Understanding Neural Networks: From Basics to Deep Learning",
      slug: "neural-networks-guide",
      excerpt: "A comprehensive guide to neural networks, covering everything from perceptrons to deep learning architectures.",
      content: `# Understanding Neural Networks

Neural networks are the backbone of modern AI. Let's break down how they work from first principles...

## The Basics: Perceptron

The simplest neural network is a single perceptron - a mathematical function that takes inputs and produces an output.

\`\`\`python
def perceptron(inputs, weights, bias):
    return activation(sum(x * w for x, w in zip(inputs, weights)) + bias)
\`\`\`

## Deep Learning

Deep neural networks stack multiple layers, allowing them to learn complex patterns and representations.

## Key Concepts

- Backpropagation for training
- Activation functions (ReLU, Sigmoid, Tanh)
- Loss functions and optimization
- Regularization techniques

## Practical Applications

From computer vision to NLP, neural networks power modern AI applications.`,
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop",
      tags: ["Deep Learning", "Neural Networks", "AI", "Tutorial"],
      category: "tech",
      publishedAt: "2024-01-08",
      readTime: "8 min read"
    },
    {
      id: "blog-3",
      title: "Sports Analytics with Machine Learning: PRES System",
      slug: "sports-ml-analytics",
      excerpt: "How I built a player recommendation and evaluation system using machine learning and advanced statistical analysis.",
      content: `# Sports Analytics with Machine Learning

Combining sports and ML creates powerful insights. Here's how I built PRES...

## The Challenge

Traditional sports analytics rely on basic statistics. Machine learning can uncover hidden patterns and predict future performance.

## Data Pipeline

\`\`\`python
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Feature engineering
features = extract_player_stats(raw_data)
X_train, X_test, y_train, y_test = train_test_split(features, labels)

# Model training
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)
\`\`\`

## Key Features

- Player performance prediction
- Team composition optimization  
- Injury risk assessment
- Contract value estimation

## Results

The system provides data-driven recommendations that help teams make smarter decisions.`,
      coverImage: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
      tags: ["Machine Learning", "Sports Analytics", "Python", "Data Science"],
      category: "tech",
      publishedAt: "2023-12-20",
      readTime: "7 min read"
    },
    {
      id: "blog-4",
      title: "Simulating Black Holes with Physics and WebGL",
      slug: "black-hole-simulation",
      excerpt: "Creating a realistic black hole simulation with gravitational lensing, event horizons, and spacetime distortion.",
      content: `# Simulating Black Holes with Physics

Physics simulations bring abstract concepts to life. Here's how I built a black hole simulator...

## The Physics

Black holes warp spacetime according to Einstein's general relativity. The key is simulating gravitational lensing:

\`\`\`javascript
function calculateLensing(position, blackHolePos, mass) {
  const distance = position.distanceTo(blackHolePos);
  const bendAngle = (2 * G * mass) / (distance * c * c);
  return applyBending(position, bendAngle);
}
\`\`\`

## Visualization

Using Three.js and WebGL for real-time 3D rendering:
- Accretion disk simulation
- Event horizon rendering
- Light ray tracing
- Gravitational time dilation effects

## Educational Value

The simulation helps visualize complex astrophysics concepts that are otherwise hard to grasp.`,
      coverImage: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=400&fit=crop",
      tags: ["Physics", "WebGL", "Simulation", "Astrophysics"],
      category: "tech",
      publishedAt: "2023-12-05",
      readTime: "6 min read"
    }
  ],

  // Project categories for filtering
  projectCategories: [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Apps" },
    { id: "mobile", label: "Mobile" },
    { id: "backend", label: "Backend" },
    { id: "game", label: "Games" },
    { id: "tool", label: "Tools" }
  ],

  // Blog categories for filtering
  blogCategories: [
    { id: "all", label: "All Posts" },
    { id: "tech", label: "Technical" },
    { id: "design", label: "Design" },
    { id: "career", label: "Career" }
  ]
};

// Helper functions
export const getProjectById = (id) => siteConfig.projects.find(p => p.id === id);
export const getBlogPostById = (id) => siteConfig.blogPosts.find(p => p.id === id);
export const getBlogPostBySlug = (slug) => siteConfig.blogPosts.find(p => p.slug === slug);
export const getFeaturedProjects = () => siteConfig.projects.filter(p => p.featured);
export const getIconConfig = (id) => siteConfig.desktopIcons.find(i => i.id === id);