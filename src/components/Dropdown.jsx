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
  const [triggerPosition, setTriggerPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef(null);

  // Calculate trigger position for modal-style positioning
  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTriggerPosition({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height
      });
    }
  }, [isOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const selectedOption = options.find(option => option.value === value);

  // Calculate dropdown position
  const getDropdownPosition = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const dropdownWidth = Math.max(triggerPosition.width, 200);
    const dropdownMaxHeight = Math.min(300, viewportHeight * 0.4);
    
    let left = triggerPosition.x;
    let top = triggerPosition.y - dropdownMaxHeight - 8; // Above trigger by default

    // Horizontal alignment
    switch (align) {
      case 'left':
        left = triggerPosition.x;
        break;
      case 'center':
        left = triggerPosition.x + (triggerPosition.width - dropdownWidth) / 2;
        break;
      case 'right':
      default:
        left = triggerPosition.x + triggerPosition.width - dropdownWidth;
        break;
    }

    // Prevent horizontal overflow
    if (left + dropdownWidth > viewportWidth - 16) {
      left = viewportWidth - dropdownWidth - 16;
    }
    if (left < 16) {
      left = 16;
    }

    // Check if we should show below instead of above
    if (top < 16) {
      top = triggerPosition.y + triggerPosition.height + 8;
    }

    // Final check - if still doesn't fit, center vertically
    if (top + dropdownMaxHeight > viewportHeight - 16) {
      top = Math.max(16, (viewportHeight - dropdownMaxHeight) / 2);
    }

    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${dropdownWidth}px`,
      maxHeight: `${dropdownMaxHeight}px`
    };
  };

  return (
    <>
      {/* Trigger Button */}
      <div className={`relative ${className}`}>
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between gap-2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors min-w-[120px] w-full ${
            isOpen ? 'ring-2 ring-blue-500 ring-opacity-50 bg-blue-50' : ''
          }`}
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
      </div>

      {/* Modal-Style Dropdown Portal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0" style={{ zIndex: 999999999 }}>
            {/* Blurred Backdrop - Highlights Only Dropdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Highlighted Trigger Clone */}
            <div
              className="absolute pointer-events-none"
              style={{
                left: `${triggerPosition.x}px`,
                top: `${triggerPosition.y}px`,
                width: `${triggerPosition.width}px`,
                height: `${triggerPosition.height}px`,
              }}
            >
              <div className="w-full h-full bg-white border-2 border-blue-400 rounded-xl shadow-lg backdrop-blur-sm" />
            </div>

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`absolute bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden ${dropdownClassName}`}
              style={{
                ...getDropdownPosition(),
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Dropdown Header */}
              <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  {trigger}
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    {placeholder}
                  </span>
                </div>
              </div>

              {/* Options */}
              <div className="max-h-64 overflow-y-auto">
                {options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1, delay: index * 0.02 }}
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-all duration-150 text-sm font-medium flex items-center justify-between group ${
                      value === option.value 
                        ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-500' 
                        : 'text-gray-700 hover:text-blue-600'
                    }`}
                  >
                    <span>{option.label}</span>
                    {value === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-blue-500 rounded-full"
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Dropdown Footer */}
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-center">
                <span className="text-xs text-gray-500">
                  {options.length} option{options.length !== 1 ? 's' : ''} available
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dropdown;