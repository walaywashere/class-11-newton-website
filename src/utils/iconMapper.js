import { 
  Users,
  BookOpen,
  Trophy,
  Calendar,
  Sparkles,
  Github,
  Instagram,
  Twitter,
  MapPin,
  Mail,
  Heart
} from 'lucide-react';

// Icon mapping object
const iconMap = {
  Users,
  BookOpen,
  Trophy,
  Calendar,
  Sparkles,
  Github,
  Instagram,
  Twitter,
  MapPin,
  Mail,
  Heart
};

// Function to get icon component by name
export const getIcon = (iconName) => {
  return iconMap[iconName] || Users; // Default to Users if icon not found
};

export default iconMap;