import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// REVOLUTIONARY DROPDOWN SYSTEM - PERFECT GAP ARCHITECTURE
// ================================================================

// GLOBAL DROPDOWN MANAGER - Single source of truth
class PerfectDropdownManager {
  constructor() {
    this.activeDropdown = null;
    this.listeners = new Set();
  }

  setActive(dropdownId) {
    if (this.activeDropdown && this.activeDropdown !== dropdownId) {
      this.closeActive();
    }
    this.activeDropdown = dropdownId;
    this.lockScroll();
  }

  closeActive() {
    this.activeDropdown = null;
    this.unlockScroll();
    this.listeners.forEach(listener => listener());
  }

  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  lockScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '0px';
  }

  unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }
}

// GLOBAL MANAGER INSTANCE
const dropdownManager = new PerfectDropdownManager();

// PERFECT BACKDROP COMPONENT
const PerfectBackdrop = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{ opacity: 1, backdropFilter: 'blur(12px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black/40 z-[9999999998]"
      onClick={onClose}
      onMouseDown={onClose}
      onTouchStart={onClose}
    />,
    document.body
  );
};

// PERFECT DROPDOWN MENU COMPONENT
const PerfectDropdownMenu = ({ 
  isOpen, 
  triggerRect, 
  options, 
  value, 
  onChange, 
  onClose,
  align = 'left'
}) => {
  if (!isOpen || !triggerRect) return null;

  // PERFECT POSITIONING CALCULATOR
  const calculatePerfectPosition = () => {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    const isMobile = viewport.width < 640;
    
    // PERFECT DROPDOWN DIMENSIONS
    const dropdown = {
      width: Math.max(240, triggerRect.width),
      maxHeight: isMobile ? 280 : 360
    };

    // PERFECT GAP - HARDCODED 4PX ALWAYS
    const PERFECT_GAP = 4;
    const margin = 16;

    // PERFECT HORIZONTAL POSITIONING
    let left = triggerRect.left;
    if (align === 'right') {
      left = triggerRect.right - dropdown.width;
    } else if (align === 'center') {
      left = triggerRect.left + (triggerRect.width - dropdown.width) / 2;
    }

    // Prevent overflow
    left = Math.max(margin, Math.min(left, viewport.width - dropdown.width - margin));

    // PERFECT VERTICAL POSITIONING - REVOLUTIONARY APPROACH
    const spaceBelow = viewport.height - triggerRect.bottom;
    const spaceAbove = triggerRect.top;
    
    let top, height, direction;

    // SIMPLE PERFECT LOGIC: Try below first, then above
    if (spaceBelow >= dropdown.maxHeight + PERFECT_GAP + margin) {
      // PERFECT BELOW POSITIONING
      direction = 'below';
      top = triggerRect.bottom + PERFECT_GAP;
      height = dropdown.maxHeight;
    } else if (spaceAbove >= dropdown.maxHeight + PERFECT_GAP + margin) {
      // PERFECT ABOVE POSITIONING - FORCE EXACT 4PX GAP
      direction = 'above';
      height = dropdown.maxHeight;
      // CRITICAL: Position dropdown so its BOTTOM is exactly 4px above trigger TOP
      top = triggerRect.top - PERFECT_GAP - height;
      
      // DEBUG: Log upward positioning
      if (process.env.NODE_ENV === 'development') {
        console.log('🔺 UPWARD POSITIONING DEBUG:', {
          triggerTop: triggerRect.top,
          dropdownHeight: height,
          PERFECT_GAP: PERFECT_GAP,
          calculatedTop: top,
          formula: `${triggerRect.top} - ${PERFECT_GAP} - ${height} = ${top}`,
          expectedBottomOfDropdown: top + height,
          actualGapFromTrigger: triggerRect.top - (top + height)
        });
      }
    } else {
      // PERFECT FALLBACK - Use bigger space
      if (spaceBelow > spaceAbove) {
        direction = 'below';
        top = triggerRect.bottom + PERFECT_GAP;
        height = Math.max(200, spaceBelow - PERFECT_GAP - margin);
      } else {
        direction = 'above';
        height = Math.max(200, spaceAbove - PERFECT_GAP - margin);
        // CRITICAL: Position dropdown so its BOTTOM is exactly 4px above trigger TOP
        top = triggerRect.top - PERFECT_GAP - height;
        
        // DEBUG: Log fallback upward positioning
        if (process.env.NODE_ENV === 'development') {
          console.log('🔺 FALLBACK UPWARD DEBUG:', {
            triggerTop: triggerRect.top,
            dropdownHeight: height,
            PERFECT_GAP: PERFECT_GAP,
            calculatedTop: top,
            formula: `${triggerRect.top} - ${PERFECT_GAP} - ${height} = ${top}`,
            expectedBottomOfDropdown: top + height,
            actualGapFromTrigger: triggerRect.top - (top + height)
          });
        }
      }
    }

    // PERFECT DEBUG LOGGING
    if (process.env.NODE_ENV === 'development') {
      const actualGap = direction === 'below' 
        ? top - triggerRect.bottom 
        : triggerRect.top - (top + height);
      
      console.log('🎯 PERFECT DROPDOWN POSITIONING:', {
        page: window.location.pathname,
        direction,
        PERFECT_GAP,
        expectedGap: PERFECT_GAP,
        actualGap,
        gapPerfect: Math.abs(actualGap - PERFECT_GAP) < 1,
        triggerRect: {
          top: triggerRect.top,
          bottom: triggerRect.bottom,
          left: triggerRect.left,
          width: triggerRect.width,
          height: triggerRect.height
        },
        dropdown: {
          top,
          left,
          width: dropdown.width,
          height
        },
        spaces: {
          above: spaceAbove,
          below: spaceBelow
        }
      });
    }

    return {
      left: Math.round(left),
      top: Math.round(top),
      width: dropdown.width,
      height: Math.round(height)
    };
  };

  const position = calculatePerfectPosition();

  return createPortal(
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className="fixed z-[9999999999]"
      style={{
        left: position.left,
        top: position.top,
        width: position.width,
        height: position.height
      }}
    >
      {/* PERFECT DROPDOWN CONTAINER - NO HEADER FOR TRUE 4PX GAP */}
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* PERFECT OPTIONS CONTAINER - DIRECT CONTENT */}
        <div 
          className="overflow-y-auto"
          style={{ 
            maxHeight: position.height + 'px'
          }}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                onClose();
              }}
              className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between group ${
                value === option.value 
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-500' 
                  : 'text-gray-700'
              }`}
            >
              <span className="font-medium">{option.label}</span>
              {value === option.value && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.div>,
    document.body
  );
};

// MAIN PERFECT DROPDOWN COMPONENT
const PerfectDropdown = ({
  trigger,
  options = [],
  value,
  onChange,
  placeholder = 'Select...',
  align = 'left',
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerRect, setTriggerRect] = useState(null);
  const triggerRef = useRef(null);
  const dropdownId = useRef(Math.random().toString(36)).current;

  // PERFECT TRIGGER POSITIONING
  const updateTriggerPosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setTriggerRect(rect);
    }
  }, []);

  // PERFECT OPEN HANDLER
  const handleOpen = useCallback(() => {
    if (disabled) return;
    
    updateTriggerPosition();
    setIsOpen(true);
    dropdownManager.setActive(dropdownId);
  }, [disabled, dropdownId, updateTriggerPosition]);

  // PERFECT CLOSE HANDLER
  const handleClose = useCallback(() => {
    setIsOpen(false);
    dropdownManager.closeActive();
  }, []);

  // PERFECT TOGGLE HANDLER
  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [isOpen, handleClose, handleOpen]);

  // PERFECT ESCAPE KEY HANDLER + GLOBAL CLICK HANDLER
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    const handleGlobalClick = (e) => {
      if (isOpen && triggerRef.current && !triggerRef.current.contains(e.target)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleGlobalClick);
      document.addEventListener('touchstart', handleGlobalClick);
      window.addEventListener('resize', updateTriggerPosition);
      window.addEventListener('scroll', updateTriggerPosition, true);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleGlobalClick);
      document.removeEventListener('touchstart', handleGlobalClick);
      window.removeEventListener('resize', updateTriggerPosition);
      window.removeEventListener('scroll', updateTriggerPosition, true);
    };
  }, [isOpen, handleClose, updateTriggerPosition]);

  // PERFECT MANAGER LISTENER
  useEffect(() => {
    const removeListener = dropdownManager.addListener(() => {
      if (dropdownManager.activeDropdown !== dropdownId) {
        setIsOpen(false);
      }
    });

    return removeListener;
  }, [dropdownId]);

  // PERFECT CLEANUP
  useEffect(() => {
    return () => {
      if (isOpen) {
        dropdownManager.closeActive();
      }
    };
  }, [isOpen]);

  const selectedOption = options.find(option => option.value === value);

  return (
    <>
      {/* PERFECT TRIGGER BUTTON */}
      <div className={`relative ${className}`}>
        <button
          ref={triggerRef}
          onClick={handleToggle}
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
              {selectedOption?.label || placeholder}
            </span>
          </div>
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 text-gray-500 ${
              isOpen ? 'rotate-180 text-blue-500' : ''
            }`} 
          />
        </button>
      </div>

      {/* PERFECT BACKDROP */}
      <AnimatePresence>
        <PerfectBackdrop 
          isOpen={isOpen} 
          onClose={handleClose} 
        />
      </AnimatePresence>

      {/* PERFECT DROPDOWN MENU */}
      <AnimatePresence>
        <PerfectDropdownMenu
          isOpen={isOpen}
          triggerRect={triggerRect}
          options={options}
          value={value}
          onChange={onChange}
          onClose={handleClose}
          align={align}
        />
      </AnimatePresence>
    </>
  );
};

export default PerfectDropdown;