import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Global Dropdown Manager - Single source of truth for all dropdowns
class DropdownManager {
  constructor() {
    this.activeDropdown = null;
    this.listeners = new Set();
  }

  setActive(dropdown) {
    if (this.activeDropdown && this.activeDropdown !== dropdown) {
      this.activeDropdown.close();
    }
    this.activeDropdown = dropdown;
    this.notifyListeners();
  }

  clearActive() {
    this.activeDropdown = null;
    this.notifyListeners();
  }

  addListener(listener) {
    this.listeners.add(listener);
  }

  removeListener(listener) {
    this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

const dropdownManager = new DropdownManager();

// Global Backdrop Component - Renders at document body level
const GlobalBackdrop = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed inset-0 bg-black/40 z-[9999999998]"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999999998,
      }}
      onClick={onClose}
    />,
    document.body
  );
};

// Enhanced Dropdown Menu Component - Renders at document body level
const DropdownMenu = ({ 
  isOpen, 
  triggerRect, 
  options, 
  value, 
  onChange, 
  onClose,
  placeholder,
  align = 'right',
  trigger 
}) => {
  if (!isOpen || !triggerRect) return null;

  // Calculate perfect position
  const getPosition = () => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Responsive width calculation
    const isMobile = viewport.width < 640; // sm breakpoint
    const minWidth = isMobile ? 200 : 240;
    const maxWidth = isMobile ? viewport.width - 32 : 320;
    
    const dropdown = {
      width: Math.min(maxWidth, Math.max(triggerRect.width, minWidth)),
      maxHeight: Math.min(400, viewport.height * 0.6),
    };

    // Smart horizontal positioning with auto-alignment
    let left = triggerRect.left;
    
    // Determine the best alignment based on available space
    const spaceOnLeft = triggerRect.left;
    const spaceOnRight = viewport.width - triggerRect.right;
    const margin = isMobile ? 16 : 32; // Smaller margins on mobile
    
    // Auto-detect best alignment if not explicitly set or if there's not enough space
    let effectiveAlign = align;
    if (align === 'right' && spaceOnRight < dropdown.width + margin) {
      effectiveAlign = 'left'; // Switch to left if not enough space on right
    } else if (align === 'left' && spaceOnLeft < dropdown.width + margin) {
      effectiveAlign = 'right'; // Switch to right if not enough space on left
    }
    
    switch (effectiveAlign) {
      case 'left':
        left = triggerRect.left;
        break;
      case 'center':
        left = triggerRect.left + (triggerRect.width - dropdown.width) / 2;
        break;
      case 'right':
      default:
        left = triggerRect.right - dropdown.width;
        break;
    }
    
    // Special alignment adjustment for better visual alignment
    // If dropdown is wider than trigger, adjust positioning for better visual balance
    if (dropdown.width > triggerRect.width && effectiveAlign === 'left') {
      // Slightly offset to align with trigger's visual center for better appearance
      const offset = Math.min(8, (dropdown.width - triggerRect.width) / 4);
      left = triggerRect.left - offset;
    }

    // Final overflow prevention with generous margins
    left = Math.max(margin, Math.min(left, viewport.width - dropdown.width - margin));

    // Vertical positioning - prefer above, fallback to below
    const spaceAbove = triggerRect.top;
    const spaceBelow = viewport.height - triggerRect.bottom;
    const requiredSpace = dropdown.maxHeight + 16;

    let top;
    let actualHeight = dropdown.maxHeight;

    if (spaceAbove >= requiredSpace) {
      // Show above
      top = triggerRect.top - dropdown.maxHeight - 16;
    } else if (spaceBelow >= requiredSpace) {
      // Show below
      top = triggerRect.bottom + 16;
    } else {
      // Use the larger space and adjust height
      if (spaceAbove > spaceBelow) {
        actualHeight = Math.max(200, spaceAbove - 32);
        top = 32;
      } else {
        actualHeight = Math.max(200, spaceBelow - 32);
        top = triggerRect.bottom + 16;
      }
    }

    return {
      left: Math.round(left),
      top: Math.round(top),
      width: dropdown.width,
      height: actualHeight,
    };
  };

  const position = getPosition();

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-[9999999999]"
      style={{
        position: 'fixed',
        left: `${position.left}px`,
        top: `${position.top}px`,
        width: `${position.width}px`,
        maxHeight: `${position.height}px`,
        zIndex: 9999999999,
        boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            {trigger}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">{placeholder}</h3>
            <p className="text-xs text-gray-500">{options.length} options available</p>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="max-h-80 overflow-y-auto py-2">
        {options.map((option, index) => {
          const isSelected = value === option.value;
          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
              onClick={() => {
                onChange(option.value);
                onClose();
              }}
              className={`w-full text-left px-6 py-4 hover:bg-blue-50 transition-all duration-200 text-sm font-medium flex items-center justify-between group relative ${
                isSelected
                  ? 'bg-blue-100 text-blue-700 shadow-sm'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"
                />
              )}
              
              <span className="flex-1">{option.label}</span>
              
              {isSelected && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0"
                />
              )}
              
              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                initial={false}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-center">
        <span className="text-xs text-gray-500 font-medium">
          {value ? `Selected: ${options.find(o => o.value === value)?.label}` : 'Select an option'}
        </span>
      </div>
    </motion.div>,
    document.body
  );
};

// Trigger Highlight Component - Shows highlighted trigger
const TriggerHighlight = ({ isVisible, triggerRect }) => {
  if (!isVisible || !triggerRect) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="fixed pointer-events-none z-[9999999999]"
      style={{
        position: 'fixed',
        left: `${triggerRect.left}px`,
        top: `${triggerRect.top}px`,
        width: `${triggerRect.width}px`,
        height: `${triggerRect.height}px`,
        zIndex: 9999999999,
      }}
    >
      <div 
        className="w-full h-full bg-white rounded-xl shadow-xl border-2 border-blue-500"
        style={{
          boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.2), 0 8px 25px -5px rgba(0, 0, 0, 0.1)',
        }}
      />
    </motion.div>,
    document.body
  );
};

// Main Dropdown Component
const GlobalDropdown = ({
  trigger,
  options = [],
  value,
  onChange,
  placeholder = 'Select option',
  align = 'right',
  className = '',
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState(null);
  const [hasBackdrop, setHasBackdrop] = useState(false);
  const triggerRef = useRef(null);
  const dropdownId = useRef(Math.random().toString(36).substr(2, 9));

  // Update backdrop state based on global manager
  useEffect(() => {
    const updateBackdrop = () => {
      setHasBackdrop(dropdownManager.activeDropdown?.id === dropdownId.current);
    };

    dropdownManager.addListener(updateBackdrop);
    return () => dropdownManager.removeListener(updateBackdrop);
  }, []);

  // Handle opening
  const handleOpen = () => {
    if (disabled || !triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    setTriggerRect({
      left: rect.left,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      width: rect.width,
      height: rect.height,
    });

    setIsOpen(true);
    dropdownManager.setActive({
      id: dropdownId.current,
      close: () => setIsOpen(false),
    });
  };

  // Handle closing
  const handleClose = () => {
    setIsOpen(false);
    setTriggerRect(null);
    dropdownManager.clearActive();
  };

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Close when another dropdown opens
  useEffect(() => {
    if (!isOpen && dropdownManager.activeDropdown?.id !== dropdownId.current) {
      setIsOpen(false);
      setTriggerRect(null);
    }
  }, [hasBackdrop, isOpen]);

  const selectedOption = options.find(option => option.value === value);

  return (
    <>
      {/* Trigger Button */}
      <div className={`relative ${className}`}>
        <button
          ref={triggerRef}
          onClick={isOpen ? handleClose : handleOpen}
          disabled={disabled}
          className={`flex items-center justify-between gap-3 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 min-w-[140px] w-full shadow-sm ${
            isOpen 
              ? 'ring-2 ring-blue-500 ring-opacity-50 bg-blue-50 border-blue-200' 
              : ''
          } ${
            disabled 
              ? 'opacity-50 cursor-not-allowed' 
              : 'cursor-pointer'
          }`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="flex-shrink-0">
              {trigger}
            </div>
            <span className="text-sm font-medium truncate text-gray-900">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 text-gray-500 ${
              isOpen ? 'rotate-180 text-blue-500' : ''
            }`}
          />
        </button>
      </div>

      {/* Global Components */}
      <AnimatePresence>
        <GlobalBackdrop 
          isVisible={hasBackdrop} 
          onClose={handleClose} 
        />
        <TriggerHighlight 
          isVisible={isOpen} 
          triggerRect={triggerRect} 
        />
        <DropdownMenu
          isOpen={isOpen}
          triggerRect={triggerRect}
          options={options}
          value={value}
          onChange={onChange}
          onClose={handleClose}
          placeholder={placeholder}
          align={align}
          trigger={trigger}
        />
      </AnimatePresence>
    </>
  );
};

export default GlobalDropdown;