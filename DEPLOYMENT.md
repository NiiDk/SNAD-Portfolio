# Deployment Guide - SNAD Portfolio

Quick deployment instructions for getting your portfolio online.

---

## ⚡ Quick Start (5 minutes)

### GitHub Pages (Recommended - Free)

1. **Create a GitHub Account** (if you don't have one)
   - Go to github.com
   - Sign up

2. **Create a Repository**
   - Click "+" → "New repository"
   - Name: `yourusername.github.io`
   - Make it **Public**
   - Don't initialize with README
   - Click "Create repository"

3. **Upload Files**
   - Click "uploading an existing file"
   - Drag and drop ALL files from SNAD-Portfolio folder
   - Click "Commit changes"

4. **Access Your Site**
   - Wait 2-3 minutes
   - Visit: `https://yourusername.github.io`
   - That's it! 🎉

---

## 📊 Deployment Options

### Option 1: GitHub Pages
- **Cost:** Free ✅
- **Setup Time:** 5 minutes ✅
- **Ease:** Very easy ✅
- **Custom Domain:** Yes (with setup)
- **SSL:** Automatic ✅
- **Best For:** Most users

### Option 2: Netlify
- **Cost:** Free ✅
- **Setup Time:** 3 minutes ✅
- **Ease:** Very easy ✅
- **Custom Domain:** Yes
- **SSL:** Automatic ✅
- **Best For:** Developers, advanced features

### Option 3: Vercel
- **Cost:** Free ✅
- **Setup Time:** 3 minutes ✅
- **Ease:** Very easy ✅
- **Custom Domain:** Yes
- **SSL:** Automatic ✅
- **Best For:** Fast performance

### Option 4: Traditional Hosting
- **Cost:** $3-10/month 💵
- **Setup Time:** 15-30 minutes
- **Ease:** Moderate
- **Custom Domain:** Yes
- **SSL:** Usually free now
- **Best For:** Full control, existing hosting

---

## Detailed Setup Instructions

### GitHub Pages (Step-by-Step)

#### Step 1: Create Repository
```
1. Go to github.com/new
2. Repository name: yourusername.github.io
   (Replace 'yourusername' with your actual username)
3. Description: Samuel Darko Portfolio
4. Make it PUBLIC
5. Click "Create repository"
```

#### Step 2: Upload Files
```
1. Click "uploading an existing file"
2. Select ALL files from SNAD-Portfolio:
   - index.html
   - styles.css
   - script.js
   - README.md
   - DEPLOYMENT.md
   - All image files
3. Click "Commit changes"
```

#### Step 3: Verify Deployment
```
1. Go to Settings → Pages
2. Should see "Your site is live at:"
3. Click the link to view
```

### Netlify (Step-by-Step)

#### Step 1: Connect Repository
```
1. Go to netlify.com
2. Sign up with GitHub
3. Click "New site from Git"
4. Select GitHub
5. Choose your portfolio repository
```

#### Step 2: Deploy Settings
```
Build command: (leave empty)
Publish directory: .
Click "Deploy site"
```

#### Step 3: Set Site Name
```
Site settings → Site name
Change to: snad-portfolio (or your preferred name)
Your URL: snad-portfolio.netlify.app
```

### Vercel (Step-by-Step)

#### Step 1: Import Project
```
1. Go to vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your portfolio repository
```

#### Step 2: Deploy
```
Framework: (Select Other)
Root Directory: ./
Click "Deploy"
```

#### Step 3: View Site
```
Your URL: snad-portfolio.vercel.app
```

---

## Custom Domain Setup

### Using GitHub Pages with Custom Domain

#### Step 1: Buy Domain
- Go to GoDaddy, Namecheap, or Google Domains
- Buy your domain (example: samueldarko.com)

#### Step 2: Update DNS Settings

**For your domain registrar:**

1. Go to DNS settings
2. Add these A records:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

3. Add CNAME record:
   ```
   Name: www
   Value: yourusername.github.io
   ```

#### Step 3: Update GitHub Settings
```
1. Go to your GitHub repository
2. Settings → Pages
3. Under "Custom domain": samueldarko.com
4. Check "Enforce HTTPS"
```

**Wait 24-48 hours for DNS to propagate.**

### Using Netlify with Custom Domain

#### Step 1: Update DNS
1. Go to Netlify → Site settings → Domain management
2. Click "Add a custom domain"
3. Enter your domain
4. Netlify will provide DNS records
5. Add them to your domain registrar

#### Step 2: Verify
```
Netlify automatically sets up HTTPS
Your site: samueldarko.com
```

---

## Post-Deployment Checklist

- [ ] Site loads without errors
- [ ] All images display correctly
- [ ] Navigation links work
- [ ] Gallery filtering works
- [ ] Contact links work (email, phone, WhatsApp)
- [ ] Mobile responsive (test on phone)
- [ ] Looks good on desktop, tablet, mobile
- [ ] No console errors (Ctrl+Shift+I)
- [ ] Social media links updated
- [ ] Meta description visible in preview

---

## SEO After Deployment

### Submit to Search Engines

#### Google Search Console
```
1. Go to search.google.com/search-console
2. Click "URL prefix"
3. Enter: https://yourdomain.com
4. Verify ownership (add DNS record or HTML file)
5. Submit sitemap (if available)
```

#### Bing Webmaster Tools
```
1. Go to bing.com/webmasters
2. Add your site
3. Submit sitemap
```

### Create Sitemap (Optional)
```xml
<!-- Create sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-12-14</lastmod>
  </url>
</urlset>
```

---

## Troubleshooting

### Site Not Live After Upload

**Solutions:**
1. Wait 3-5 minutes for deployment
2. Hard refresh browser (Ctrl+Shift+R)
3. Check repository is PUBLIC
4. Check all files uploaded
5. Check browser console for errors

### Images Not Showing

**Solutions:**
1. Verify image filenames match exactly
2. Check image file extensions (.jpg not .JPG)
3. Ensure images uploaded to repository
4. Hard refresh browser

### Custom Domain Not Working

**Solutions:**
1. Check DNS records are correct
2. Wait up to 48 hours for propagation
3. Verify domain registrar DNS pointing correct
4. Check HTTPS is enabled

### HTTPS Not Working

**Solutions:**
1. GitHub Pages: Automatic after 10 minutes
2. Netlify: Automatic, check in settings
3. Traditional hosting: Install SSL certificate
4. Reload page after HTTPS enabled

---

## Performance Tips

After deploying:

1. **Compress Images**
   ```bash
   # Using ImageMagick
   convert input.jpg -quality 85 -resize 1200x output.jpg
   ```

2. **Enable Caching** (Traditional hosting)
   ```
   Set cache headers for 1 year on images/CSS/JS
   ```

3. **Enable GZIP** (Traditional hosting)
   ```
   Add to .htaccess or server config
   ```

4. **Monitor Performance**
   - Google PageSpeed Insights
   - GTmetrix
   - Lighthouse (Chrome DevTools)

---

## Updating Your Portfolio

### After Deployment

**To make changes:**

1. **GitHub Pages:**
   - Edit files in repository
   - Upload new versions
   - Changes appear in 1-2 minutes

2. **Netlify/Vercel:**
   - Push to GitHub
   - Automatic deployment triggered
   - Changes appear in 1-2 minutes

3. **Traditional Hosting:**
   - Upload updated files via FTP
   - Changes appear immediately

---

## Backup & Maintenance

### Regular Backups
```
1. Keep local copy of all files
2. GitHub automatically versions files
3. Consider external backup (Google Drive, Dropbox)
```

### Monthly Maintenance
- [ ] Check for broken links
- [ ] Verify all images display
- [ ] Test on mobile devices
- [ ] Check analytics (if added)
- [ ] Update content as needed

---

## Getting Help

**Resources:**
- GitHub Docs: docs.github.com
- Netlify Docs: docs.netlify.com
- Stack Overflow: stackoverflow.com
- Contact: darkosammy2@gmail.com

---

## Summary

| Task | Time | Difficulty |
|------|------|-----------|
| GitHub Pages Setup | 5 min | Easy |
| Netlify Setup | 3 min | Very Easy |
| Custom Domain | 15 min | Moderate |
| DNS Setup | 10 min | Moderate |
| Total (basic) | 5 min | Easy ✅ |

**You can have your portfolio live in under 5 minutes!** 🚀

---

**Last Updated:** December 14, 2025
