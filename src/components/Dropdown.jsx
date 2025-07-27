import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ 
  trigger, 
  options = [], 
  value, 
  onChange, 
  placeholder = "Select option",
  className = "",
  dropdownClassName = "",
  align = "right" // "left", "right", "center"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Calculate dropdown position to prevent cutoff
  useEffect(() => {
    if (isOpen && dropdownRef.current && triggerRef.current) {
      const trigger = triggerRef.current;
      const dropdown = dropdownRef.current;
      const triggerRect = trigger.getBoundingClientRect();
      const dropdownRect = dropdown.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let left = 0;
      let top = -dropdownRect.height - 8; // Always show above trigger

      // Horizontal positioning
      switch (align) {
        case 'left':
          left = 0;
          break;
        case 'center':
          left = (triggerRect.width - dropdownRect.width) / 2;
          break;
        case 'right':
        default:
          left = triggerRect.width - dropdownRect.width;
          break;
      }

      // Prevent horizontal overflow
      const triggerLeft = triggerRect.left;
      const dropdownRight = triggerLeft + left + dropdownRect.width;
      const dropdownLeft = triggerLeft + left;

      if (dropdownRight > viewportWidth - 16) {
        // Overflowing right, align to right edge
        left = viewportWidth - triggerLeft - dropdownRect.width - 16;
      } else if (dropdownLeft < 16) {
        // Overflowing left, align to left edge
        left = 16 - triggerLeft;
      }

      // Check if dropdown would go above viewport when showing upward
      const triggerTop = triggerRect.top;
      const dropdownTop = triggerTop + top;

      if (dropdownTop < 16) {
        // If showing above would go off-screen, show below instead
        top = triggerRect.height + 8;
      }

      setDropdownStyle({
        left: `${left}px`,
        top: `${top}px`,
        minWidth: `${Math.max(triggerRect.width, 180)}px`
      });
    }
  }, [isOpen, align]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          triggerRef.current && !triggerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`relative ${className}`} style={{ zIndex: 9999999 }}>
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors min-w-[120px] w-full relative ${
          isOpen ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
        }`}
        style={{ zIndex: 9999999 }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {trigger}
          <span className="text-sm font-medium truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 transition-transform flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Portal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile and hero sections */}
            <div 
              className="fixed inset-0 z-[9999998] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Hero Section Backdrop - Desktop */}
            <div 
              className="fixed inset-0 z-[9999997] hidden md:block"
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent' }}
            />
            
            {/* Dropdown Menu */}
            <motion.div
              ref={dropdownRef}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={`absolute bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden ${dropdownClassName}`}
              style={{
                ...dropdownStyle,
                zIndex: 9999999,
                maxHeight: '60vh',
                overflowY: 'auto',
                position: 'absolute'
              }}
            >
              {options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-sm font-medium ${
                    value === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                  } ${
                    index === 0 ? 'rounded-t-xl' : 
                    index === options.length - 1 ? 'rounded-b-xl' : ''
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;