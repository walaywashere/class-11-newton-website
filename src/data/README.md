# Footer Configuration

This folder contains the JSON configuration files for customizing various parts of the website.

## footerConfig.json

This file controls all the content and settings for the website footer. You can easily customize:

### Branding Section
- `name`: Your class name
- `tagline`: Class motto or tagline
- `academicYear`: Current academic year (e.g., "2025-2026")
- `description`: Description of your class

### Class Statistics
Array of statistics to display:
- `label`: Display name (e.g., "Students")
- `value`: The value to show (e.g., "40+")
- `icon`: Icon name (must match available icons in iconMapper.js)

### Quick Links
Navigation links in the footer:
- `name`: Display text
- `href`: URL path
- `icon`: Icon name

### Contact Information
- `schoolName`: Your school name
- `city`: Your city
- `email`: Contact email
- `academicYear`: Full academic year text

### Social Links
Social media links:
- `name`: Platform name
- `href`: URL (use "#" for placeholder)
- `icon`: Icon name
- `color`: Hover color class

### Copyright
- `text`: Copyright text
- `madeWithLove`: Footer credit text (use ❤️ for heart icon placement)

## Available Icons

The following icons are available for use:
- Users
- BookOpen
- Trophy
- Calendar
- Sparkles
- Github
- Instagram
- Twitter
- MapPin
- Mail
- Heart

To add more icons, update `src/utils/iconMapper.js`.

## Example Usage

```json
{
  "branding": {
    "name": "Class 11-Newton",
    "tagline": "Excellence in Education",
    "academicYear": "2025-2026",
    "description": "Your class description here..."
  }
}
```

Simply edit the JSON file and the footer will automatically update with your changes!