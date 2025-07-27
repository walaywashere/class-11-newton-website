# Class 11-Newton Showcase

A beautiful, interactive showcase website for Class 11-Newton, featuring student profiles, leadership information, and class achievements. Built with modern web technologies for an engaging user experience.

## ✨ Features

- **Interactive Student Showcase** - Browse through class members with detailed profiles
- **Leadership Section** - Meet the class adviser and student officers
- **Achievements Timeline** - Visual timeline of class milestones and accomplishments
- **Responsive Design** - Optimized for all devices and screen sizes
- **Smooth Animations** - Powered by Framer Motion for delightful interactions
- **Modern UI** - Clean, professional design with Tailwind CSS

## 🚀 Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth interactions
- **Lucide React** - Beautiful, customizable icons

## 🛠️ Development

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd class-11-newton
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Code Quality

- **Linting**: `npm run lint`
- **ESLint Configuration**: Modern flat config with React support
- **Code Standards**: Consistent formatting and best practices

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── homepage.jsx     # Landing page with animated hero
│   ├── navbar.jsx       # Navigation component
│   ├── preloader.jsx    # Loading animation
│   ├── leadership.jsx   # Class adviser and officers
│   ├── studentshowcase.jsx # Student profiles with pagination
│   └── achievements.jsx # Timeline of class achievements
├── data/
│   └── classData.jsx    # Student and achievement data
├── assets/              # Static assets
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## 🎨 Customization

### Adding New Students
Edit `src/data/classData.jsx` and add student objects to the `students` array:

```javascript
{
  name: 'Student Name',
  photo: 'photo-url',
  role: 'Position (optional)',
  dreamJob: 'Future career goal',
  funFact: 'Interesting fact',
  socials: { instagram: 'username' },
  quote: "Personal quote"
}
```

### Adding Achievements
Add achievement objects to the `achievements` array in `classData.jsx`:

```javascript
{
  date: 'YYYY-MM-DD',
  title: 'Achievement Title',
  description: 'Detailed description',
  image: 'image-url (optional)',
  tags: ['tag1', 'tag2'],
  icon: IconComponent
}
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Deployment

The project can be deployed to any static hosting service:

- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 📄 License

This project is created for educational purposes. All rights reserved to Class 11-Newton.

---

Made with ❤️ by Class 11-Newton
