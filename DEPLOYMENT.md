# Deployment Guide

This guide will help you deploy your portfolio website to various hosting platforms.

## Quick Deployment Options

### 1. GitHub Pages (Free)
1. Create a new repository on GitHub
2. Upload your website files
3. Go to Settings → Pages
4. Select source branch (usually `main`)
5. Your site will be available at `https://yourusername.github.io/repository-name`

### 2. Netlify (Free)
1. Drag and drop your website folder to [netlify.com/drop](https://netlify.com/drop)
2. Or connect your GitHub repository
3. Automatic deployments on every push
4. Custom domain support

### 3. Vercel (Free)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project folder
3. Follow the prompts
4. Automatic deployments from Git

### 4. Firebase Hosting (Free)
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Run `firebase init hosting`
3. Configure your project
4. Run `firebase deploy`

## Pre-Deployment Checklist

### Content Updates
- [ ] Replace placeholder text with your information
- [ ] Add your actual profile and project images
- [ ] Update social media links
- [ ] Add your real contact information
- [ ] Upload your resume PDF

### Technical Optimization
- [ ] Optimize images (compress, resize)
- [ ] Test on different devices and browsers
- [ ] Validate HTML and CSS
- [ ] Check for broken links
- [ ] Test contact form functionality
- [ ] Ensure all assets load correctly

### SEO Optimization
- [ ] Update meta description
- [ ] Add relevant keywords
- [ ] Optimize image alt texts
- [ ] Add structured data (optional)
- [ ] Submit to Google Search Console

## Custom Domain Setup

### Buying a Domain
- Namecheap, GoDaddy, or Google Domains
- Consider `.dev`, `.io`, or `.com` for developers
- Use your name or brand (e.g., `shivamgoswami.dev`)

### DNS Configuration
1. Point your domain to your hosting provider
2. Add CNAME or A records as required
3. Enable SSL certificate (usually automatic)

## Performance Optimization

### Images
```bash
# Install ImageOptim or use online tools
# Target sizes:
# - Profile image: 300x300px
# - Project images: 600x400px
# - About image: 400x500px
```

### Code Minification
```bash
# Install build tools (optional)
npm install -g html-minifier uglifycss terser

# Minify CSS
uglifycss css/style.css > css/style.min.css

# Minify JavaScript
terser js/script.js -o js/script.min.js

# Update HTML to use minified files
```

### Enable Gzip Compression
Add to `.htaccess` (for Apache):
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## Analytics Setup (Optional)

### Google Analytics 4
1. Create GA4 property
2. Add tracking code before `</head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## Security Headers

Add to your hosting provider or `.htaccess`:
```apache
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
```

## Monitoring

### Uptime Monitoring
- UptimeRobot (free)
- Pingdom
- StatusCake

### Performance Monitoring
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

## Backup Strategy

1. Keep source code in Git repository
2. Regular backups of hosting account
3. Document deployment process
4. Keep local development environment synced

## Post-Deployment Tasks

1. Test all functionality on live site
2. Submit to search engines
3. Share on social media
4. Add to your resume and profiles
5. Monitor analytics and performance
6. Plan regular content updates

## Troubleshooting Common Issues

### Images Not Loading
- Check file paths are correct
- Ensure images are uploaded
- Verify file permissions

### Contact Form Not Working
- Set up backend service (Netlify Forms, Formspree)
- Add proper form action
- Test with real email addresses

### Mobile Issues
- Test on actual devices
- Check viewport meta tag
- Validate responsive design

### Performance Issues
- Optimize images
- Minify code
- Enable compression
- Use CDN for assets

Remember to keep your portfolio updated with new projects and skills!