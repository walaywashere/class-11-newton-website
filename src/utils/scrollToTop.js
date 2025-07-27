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
  window.scrollTo(0, 0);
};

export default scrollToTop;