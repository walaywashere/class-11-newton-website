// Utility function to scroll to top when navigating between pages
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};

// Alternative instant scroll to top (no animation)
export const scrollToTopInstant = () => {
  // For mobile compatibility, use setTimeout to ensure it works after navigation
  setTimeout(() => {
    window.scrollTo(0, 0);
    // Backup method for stubborn mobile browsers
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, 10);
};

export default scrollToTop;