# 📚 Dynamic Content Configuration Guide

This guide explains how to manage all dynamic content in the Class 11-Newton website through JSON configuration files.

## 📁 Configuration Files Overview

| File | Purpose | Key Features |
|------|---------|--------------|
| `siteConfig.json` | Global site settings | Site name, colors, navigation |
| `homepageConfig.json` | Homepage content | Hero section, stats, explore cards |
| `studentsConfig.json` | Students page settings | Pagination, view modes, filters |
| `leadershipConfig.json` | Leadership page settings | Adviser/officers display, filters |
| `achievementsConfig.json` | Achievements with photos | Photo albums, categories, metadata |
| `footerConfig.json` | Footer content | Contact info, academic year |

---

## 🏠 Homepage Configuration (`homepageConfig.json`)

### Hero Section
```json
{
  "heroSection": {
    "topBadge": {
      "text": "✨ Welcome to Class 11-Newton",
      "className": "bg-gradient-to-r from-blue-500/20 to-purple-500/20"
    },
    "title": "Welcome to Class 11-Newton",
    "subtitle": {
      "text": "Where Excellence Meets Innovation, and Dreams Take Flight",
      "highlightWords": ["Excellence", "Innovation", "Dreams"]
    },
    "stats": [
      {
        "icon": "Users",
        "label": "Brilliant Minds",
        "value": "40+",
        "color": "blue"
      }
    ]
  }
}
```

### Explore Section Cards
```json
{
  "exploreSection": {
    "cards": [
      {
        "title": "Our Leadership",
        "description": "Meet our dedicated class adviser and student officers",
        "link": "/leadership",
        "gradient": "from-purple-600 to-indigo-600",
        "icon": "Crown"
      }
    ]
  }
}
```

---

## 👥 Students Configuration (`studentsConfig.json`)

### Page Settings
```json
{
  "pageSettings": {
    "studentsPerPage": 12,
    "defaultViewMode": "grid",
    "defaultSortBy": "name"
  }
}
```

### Hero Section Stats
```json
{
  "heroSection": {
    "stats": [
      {
        "icon": "Users",
        "value": "40+",
        "label": "Amazing Students",
        "calculation": "students.length"
      }
    ]
  }
}
```

---

## 👑 Leadership Configuration (`leadershipConfig.json`)

### Adviser Section
```json
{
  "adviserSection": {
    "title": "Our Class Adviser",
    "subtitle": "The guiding force behind our success",
    "cardSettings": {
      "showQuote": true,
      "showSubjects": true,
      "showExperience": true
    }
  }
}
```

### Officers Section
```json
{
  "officersSection": {
    "title": "Student Officers",
    "cardSettings": {
      "showPosition": true,
      "showMotto": true,
      "showSocialLinks": true
    }
  }
}
```

---

## 🏆 Achievements Configuration (`achievementsConfig.json`)

### Photo Albums Structure
```json
{
  "achievements": [
    {
      "id": 1,
      "title": "Academic Excellence Award",
      "category": "Academic",
      "photos": {
        "cover": "/images/achievements/academic-excellence/cover.jpg",
        "album": [
          {
            "url": "/images/achievements/academic-excellence/ceremony.jpg",
            "caption": "Award ceremony at the national convention",
            "photographer": "School Photography Club"
          }
        ]
      }
    }
  ]
}
```

### Photo Organization
```
public/images/achievements/
├── academic-excellence/
│   ├── cover.jpg
│   ├── ceremony.jpg
│   ├── trophy.jpg
│   └── team.jpg
├── science-fair/
│   ├── cover.jpg
│   ├── project-display.jpg
│   └── demonstration.jpg
└── cultural-dance/
    ├── cover.jpg
    ├── performance1.jpg
    └── costumes.jpg
```

### Photo Requirements
- **Formats**: JPG, JPEG, PNG, WebP
- **Cover Image**: 800x600px (4:3 ratio)
- **Album Images**: Max 1200x800px
- **File Size**: Max 2MB per image
- **Naming**: Use descriptive, lowercase names with hyphens

---

## 📷 Photo Album Management

### Adding New Achievement Photos

1. **Create Category Folder**
   ```
   public/images/achievements/[achievement-slug]/
   ```

2. **Add Cover Image**
   - Name: `cover.jpg`
   - Size: 800x600px
   - Quality: High (80-90%)

3. **Add Album Photos**
   - Descriptive names: `ceremony.jpg`, `trophy.jpg`, `team.jpg`
   - Include captions and photographer credits

4. **Update JSON Configuration**
   ```json
   {
     "photos": {
       "cover": "/images/achievements/[slug]/cover.jpg",
       "album": [
         {
           "url": "/images/achievements/[slug]/photo1.jpg",
           "caption": "Description of the photo",
           "photographer": "Photographer name"
         }
       ]
     }
   }
   ```

### Photo Gallery Features
- **Lightbox**: Click to view full size
- **Slideshow**: Auto-advance every 5 seconds
- **Captions**: Show photo descriptions
- **Photographer Credits**: Attribution display
- **Navigation**: Previous/Next buttons
- **Thumbnails**: Grid view of all photos

---

## 🎨 Visual Customization

### Colors and Themes
```json
{
  "site": {
    "colors": {
      "primary": "#3B82F6",
      "secondary": "#8B5CF6",
      "accent": "#F59E0B"
    }
  }
}
```

### Animation Settings
```json
{
  "animations": {
    "cardHover": {
      "scale": 1.02,
      "duration": 0.2
    },
    "staggerDelay": 0.1
  }
}
```

---

## 🔧 Advanced Configuration

### Category Management
```json
{
  "categories": [
    {
      "value": "academic",
      "label": "Academic Excellence",
      "description": "Outstanding academic performances"
    }
  ]
}
```

### Filter Options
```json
{
  "filters": {
    "enableSearch": true,
    "searchPlaceholder": "Search achievements...",
    "levels": ["National", "Regional", "Inter-School", "Community"]
  }
}
```

### Display Settings
```json
{
  "displaySettings": {
    "gridView": {
      "columns": {
        "mobile": 1,
        "tablet": 2,
        "desktop": 3,
        "large": 4
      }
    }
  }
}
```

---

## 📱 Mobile Responsiveness

All configurations include mobile-specific settings:

- **Responsive Columns**: Different grid layouts per screen size
- **Touch-Friendly**: Larger buttons and touch targets
- **Optimized Images**: Appropriate sizes for mobile bandwidth
- **Adaptive Text**: Font sizes adjust to screen size

---

## 🚀 Quick Start Checklist

### For New Achievements:
- [ ] Create folder in `/public/images/achievements/`
- [ ] Add cover image (800x600px)
- [ ] Add album photos (max 8 photos)
- [ ] Update `achievementsConfig.json`
- [ ] Add photo captions and credits
- [ ] Test on mobile and desktop

### For Content Updates:
- [ ] Edit appropriate JSON file
- [ ] Maintain existing structure
- [ ] Test all view modes (grid/list)
- [ ] Verify mobile responsiveness
- [ ] Check photo loading

### For New Categories:
- [ ] Add to categories array
- [ ] Update filter options
- [ ] Create sample achievements
- [ ] Test filtering functionality

---

## 📞 Support and Maintenance

### File Locations
```
src/data/
├── siteConfig.json          # Global settings
├── homepageConfig.json      # Homepage content
├── studentsConfig.json      # Students page
├── leadershipConfig.json    # Leadership page
├── achievementsConfig.json  # Achievements with photos
├── footerConfig.json        # Footer content
└── DYNAMIC_CONTENT_GUIDE.md # This guide
```

### Best Practices
1. **Backup**: Always backup JSON files before editing
2. **Validation**: Use JSON validator to check syntax
3. **Testing**: Test changes on multiple devices
4. **Images**: Optimize photos before uploading
5. **Consistency**: Maintain naming conventions

### Common Issues
- **Broken Images**: Check file paths and names
- **JSON Errors**: Validate syntax with online tools
- **Mobile Issues**: Test responsive breakpoints
- **Performance**: Optimize large images

---

## 🎯 Examples and Templates

### Achievement Template
```json
{
  "id": 999,
  "title": "Your Achievement Title",
  "category": "Academic|Science|Cultural|Social|Sports",
  "date": "YYYY-MM-DD",
  "description": "Detailed description of the achievement",
  "level": "National|Regional|Inter-School|Community",
  "participants": ["Student Name 1", "Student Name 2"],
  "photos": {
    "cover": "/images/achievements/[slug]/cover.jpg",
    "album": [
      {
        "url": "/images/achievements/[slug]/photo1.jpg",
        "caption": "Photo description",
        "photographer": "Photographer name"
      }
    ]
  },
  "tags": ["tag1", "tag2", "tag3"],
  "externalLinks": [
    {
      "title": "Link Title",
      "url": "https://example.com",
      "type": "news|video|project|results"
    }
  ]
}
```

This guide ensures you can easily manage all dynamic content without touching the code! 🎉