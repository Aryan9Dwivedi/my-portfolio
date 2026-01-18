# Portfolio Content Management Guide

## 📝 How to Update Your Portfolio

All content is managed through a single file: `components/config/siteData.js`

### Adding a New Project

1. Open `components/config/siteData.js`
2. Find the `projects` array
3. Copy an existing project object
4. Paste it and update these fields:
   - `id`: Unique identifier (e.g., "proj-4")
   - `title`: Project name
   - `description`: Short description
   - `longDescription`: Detailed description
   - `image`: Image URL
   - `tags`: Array of tech tags
   - `category`: "web", "mobile", "backend", "game", or "tool"
   - `featured`: true/false
   - `links.github`: GitHub URL
   - `links.live`: Live demo URL
   - `date`: "YYYY-MM" format

### Adding a New Blog Post

1. Open `components/config/siteData.js`
2. Find the `blogPosts` array
3. Copy an existing blog post object
4. Update these fields:
   - `id`: Unique identifier
   - `title`: Post title
   - `slug`: URL-friendly slug
   - `excerpt`: Short preview
   - `content`: Full content (supports Markdown)
   - `coverImage`: Image URL
   - `tags`: Array of tags
   - `category`: "tech", "design", or "career"
   - `publishedAt`: "YYYY-MM-DD" format
   - `readTime`: e.g., "5 min read"

### Updating Personal Info

In `siteData.js`, edit the `profile` section:
- `name`: Your name
- `title`: Your professional title
- `avatar`: Profile image URL
- `bio`: About you paragraph
- `email`: Contact email
- `skills`: Array of {name, level} objects
- `socialLinks`: GitHub, LinkedIn URLs
- `resumeUrl`: Direct link to your CV/resume PDF

### Removing Content

Simply delete the entire object (project or blog post) from the array.

## 🚀 GitHub Pages Deployment

### Quick Deploy (5 minutes)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git remote add origin https://github.com/Aryan9Dwivedi/your-repo-name.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Select branch: `main`
   - Click **Save**
   - Wait 2-3 minutes

3. **Your site is live at:**
   `https://Aryan9Dwivedi.github.io/your-repo-name/`

### ✅ Pre-Deployment Checklist
- ✓ All content is static (no backend/database)
- ✓ Images use absolute URLs (Unsplash, Wikipedia)
- ✓ CV link points to hosted file
- ✓ All social links verified
- ✓ No localhost URLs in code

### 🔄 Updating After Deployment
1. Edit `components/config/siteData.js`
2. Commit and push changes
3. GitHub Pages auto-rebuilds in ~2 minutes

### 🐛 Troubleshooting
- **Site not loading?** Check GitHub Actions tab for errors
- **Assets missing?** Verify all URLs are absolute
- **Build failing?** Check for syntax errors in siteData.js

## 🎨 Customization

### Themes
Use the Settings window in the app to change:
- Desktop color themes
- Window color schemes
- Wallpapers
- Icon styles
- Sound effects
- Cursor trails

### Adding Desktop Icons
Edit the `desktopIcons` array in `siteData.js`:
```javascript
{
  id: "myapp",
  label: "My App",
  icon: "folder", // lucide-react icon name
  position: { row: 0, col: 0 }
}
```

## 💡 Tips

- Keep images under 1MB for fast loading
- Use Unsplash for free professional images
- Test locally before deploying
- Update the `meta.version` when making changes
- All settings (themes, wallpapers) save to browser localStorage