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

  // Calculate dropdown position with better PC alignment
  const getDropdownPosition = () => {
    if (!triggerPosition.width) return {};
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const dropdownWidth = Math.max(triggerPosition.width, 220);
    let dropdownMaxHeight = Math.min(320, viewportHeight * 0.5);
    
    let left = triggerPosition.x;
    let top = triggerPosition.y - dropdownMaxHeight - 12; // Above trigger by default

    // Horizontal alignment with better PC support
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

    // Enhanced overflow prevention for PC screens
    const margin = 24; // Larger margin for PC
    if (left + dropdownWidth > viewportWidth - margin) {
      left = viewportWidth - dropdownWidth - margin;
    }
    if (left < margin) {
      left = margin;
    }

    // Smart vertical positioning
    const spaceAbove = triggerPosition.y;
    const spaceBelow = viewportHeight - (triggerPosition.y + triggerPosition.height);
    
    if (spaceAbove >= dropdownMaxHeight + 12) {
      // Show above if there's enough space
      top = triggerPosition.y - dropdownMaxHeight - 12;
    } else if (spaceBelow >= dropdownMaxHeight + 12) {
      // Show below if there's enough space
      top = triggerPosition.y + triggerPosition.height + 12;
    } else {
      // Show in the larger space, but limit height
      if (spaceAbove > spaceBelow) {
        const availableHeight = spaceAbove - 24;
        top = 24;
        dropdownMaxHeight = Math.min(dropdownMaxHeight, availableHeight);
      } else {
        const availableHeight = spaceBelow - 24;
        top = triggerPosition.y + triggerPosition.height + 12;
        dropdownMaxHeight = Math.min(dropdownMaxHeight, availableHeight);
      }
    }

    return {
      left: `${Math.round(left)}px`,
      top: `${Math.round(top)}px`,
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

      {/* Full-Page Modal Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Full-Page Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/30 z-[999999998]"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown Container */}
            <div className="fixed inset-0 z-[999999999] pointer-events-none">
              {/* Highlighted Trigger Clone */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute pointer-events-none"
                style={{
                  left: `${triggerPosition.x}px`,
                  top: `${triggerPosition.y}px`,
                  width: `${triggerPosition.width}px`,
                  height: `${triggerPosition.height}px`,
                }}
              >
                <div className="w-full h-full bg-white border-2 border-blue-500 rounded-xl shadow-xl" 
                     style={{ boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2)' }} />
              </motion.div>

              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`absolute bg-white border border-gray-300 rounded-xl shadow-2xl overflow-hidden pointer-events-auto ${dropdownClassName}`}
                style={{
                  ...getDropdownPosition(),
                  overflowY: 'auto',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)'
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
           </>
         )}
       </AnimatePresence>
    </>
  );
};

export default Dropdown;