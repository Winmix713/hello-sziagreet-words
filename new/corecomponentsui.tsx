// Button.jsx
import { useState } from 'react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
  ...props 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const baseClasses = "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-dark-800";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    xl: "px-6 py-3 text-lg"
  };
  
  const variantClasses = {
    primary: `bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 
              shadow-lg shadow-blue-500/30 hover:shadow-blue-600/40 active:shadow-blue-700/30 
              ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`,
    secondary: `bg-dark-700 text-white hover:bg-dark-600 border border-dark-600 backdrop-blur-md
                shadow-lg shadow-dark-900/30 hover:shadow-dark-800/40 active:shadow-dark-900/20
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`,
    ghost: `bg-transparent text-gray-200 hover:bg-dark-700/50 hover:text-white 
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`,
    glass: `bg-dark-800/30 backdrop-blur-md border border-dark-700/50 text-white hover:bg-dark-700/40
            shadow-lg shadow-dark-900/10 hover:shadow-dark-800/20 active:shadow-dark-900/5
            ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`,
    danger: `bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700
             shadow-lg shadow-red-500/30 hover:shadow-red-600/40 active:shadow-red-700/30
             ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      disabled={disabled || isLoading}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
      ) : icon && iconPosition === 'left' ? (
        <span className={`mr-2 ${isHovered ? 'scale-110' : 'scale-100'} transition-transform duration-200`}>
          {icon}
        </span>
      ) : null}
      
      <span>{children}</span>
      
      {!isLoading && icon && iconPosition === 'right' ? (
        <span className={`ml-2 ${isHovered ? 'scale-110' : 'scale-100'} transition-transform duration-200`}>
          {icon}
        </span>
      ) : null}
      
      {variant === 'primary' && (
        <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-blue-600/20 to-blue-500/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      )}
    </button>
  );
};

// Card.jsx
export const Card = ({
  children,
  variant = 'default',
  className = '',
  hoverEffect = true,
  ...props
}) => {
  const baseClasses = "rounded-xl transition-all duration-300";
  
  const variantClasses = {
    default: "bg-dark-800 border border-dark-700",
    glass: "bg-dark-800/40 backdrop-blur-md border border-dark-700/50",
    gradient: "bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700/70",
    neomorphic: "bg-dark-800 border border-dark-700/50 shadow-[5px_5px_10px_rgba(0,0,0,0.3),-5px_-5px_10px_rgba(30,41,59,0.2)]",
    highlight: "bg-dark-800 border border-blue-500/30"
  };
  
  const hoverClasses = hoverEffect 
    ? "hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1" 
    : "";

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${hoverClasses}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Input.jsx
export const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className = '',
  icon,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-400">{icon}</span>
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full rounded-lg border bg-dark-800/50 py-2.5 text-gray-100 placeholder-gray-500
            backdrop-blur-md transition-all duration-200
            ${icon ? 'pl-10 pr-4' : 'px-4'}
            ${error 
              ? 'border-red-500/50 focus:border-red-500 focus:ring-2 focus:ring-red-500/20' 
              : 'border-dark-700/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
};

// Badge.jsx
export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-full font-medium";
  
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base"
  };
  
  const variantClasses = {
    default: "bg-dark-700 text-gray-300",
    primary: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    success: "bg-green-500/20 text-green-300 border border-green-500/30",
    warning: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    danger: "bg-red-500/20 text-red-300 border border-red-500/30",
    neutral: "bg-gray-500/20 text-gray-300 border border-gray-500/30",
    gradient: "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-300 border border-blue-500/30"
  };

  return (
    <span
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};

// Tooltip.jsx
import { useState, useRef, useEffect } from 'react';

export const Tooltip = ({
  children,
  content,
  position = 'top',
  delay = 300,
  className = '',
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);
  const targetRef = useRef(null);
  let timeout;

  const calculatePosition = () => {
    if (!targetRef.current || !tooltipRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    
    let top, left;

    switch (position) {
      case 'top':
        top = -tooltipRect.height - 8;
        left = (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'bottom':
        top = targetRect.height + 8;
        left = (targetRect.width - tooltipRect.width) / 2;
        break;
      case 'left':
        top = (targetRect.height - tooltipRect.height) / 2;
        left = -tooltipRect.width - 8;
        break;
      case 'right':
        top = (targetRect.height - tooltipRect.height) / 2;
        left = targetRect.width + 8;
        break;
      default:
        top = -tooltipRect.height - 8;
        left = (targetRect.width - tooltipRect.width) / 2;
    }

    setTooltipPosition({ top, left });
  };

  const handleMouseEnter = () => {
    timeout = setTimeout(() => {
      setIsVisible(true);
      // Need to wait for the tooltip to be visible before calculating position
      setTimeout(calculatePosition, 0);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeout);
    setIsVisible(false);
  };

  useEffect(() => {
    // Recalculate position when tooltip content or visibility changes
    if (isVisible) {
      calculatePosition();
    }
  }, [content, isVisible]);

  return (
    <div 
      ref={targetRef}
      className="relative inline-flex" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={`
            absolute z-50 rounded bg-dark-900/90 px-2.5 py-1.5 text-xs text-white
            shadow-lg shadow-black/20 backdrop-blur-sm
            transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}
            ${className}
          `}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          {content}
          <div 
            className={`
              absolute h-2 w-2 rotate-45 bg-dark-900/90
              ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2' : ''}
              ${position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2' : ''}
              ${position === 'right' ? 'left-[-4px] top-1/2 -translate-y-1/2' : ''}
            `}
          />
        </div>
      )}
    </div>
  );
};

// DropdownMenu.jsx
import { useState, useRef, useEffect } from 'react';

export const DropdownMenu = ({
  trigger,
  children,
  align = 'left',
  width = 'auto',
  className = '',
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const alignmentClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2'
  };

  const widthClasses = {
    auto: 'min-w-[12rem]',
    sm: 'w-48',
    md: 'w-56',
    lg: 'w-64',
    xl: 'w-72',
    full: 'w-full'
  };

  return (
    <div ref={dropdownRef} className="relative inline-block" {...props}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>
      
      {isOpen && (
        <div 
          className={`
            absolute z-50 mt-2 rounded-lg border border-dark-700/50 bg-dark-800/95
            shadow-lg shadow-dark-900/50 backdrop-blur-md
            ${alignmentClasses[align]}
            ${widthClasses[width]}
            ${className}
          `}
        >
          <div className="py-1.5">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({
  children,
  icon,
  onClick,
  disabled = false,
  danger = false,
  className = '',
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex w-full items-center px-4 py-2 text-sm transition-colors
        ${danger ? 'text-red-400 hover:bg-red-500/10' : 'text-gray-200 hover:bg-dark-700/70'}
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${className}
      `}
      {...props}
    >
      {icon && <span className="mr-2 text-gray-400">{icon}</span>}
      {children}
    </button>
  );
};

// Switch.jsx
export const Switch = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: {
      switch: 'w-8 h-4',
      thumb: 'w-3 h-3',
      translate: 'translate-x-4',
      label: 'text-xs'
    },
    md: {
      switch: 'w-11 h-6',
      thumb: 'w-5 h-5',
      translate: 'translate-x-5',
      label: 'text-sm'
    },
    lg: {
      switch: 'w-14 h-7',
      thumb: 'w-6 h-6',
      translate: 'translate-x-7',
      label: 'text-base'
    }
  };

  return (
    <label className={`relative inline-flex items-center ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="peer sr-only"
        {...props}
      />
      <div
        className={`
          ${sizeClasses[size].switch}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          rounded-full bg-dark-700 
          border border-dark-600
          peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500/20
          peer-checked:bg-blue-500 peer-checked:border-blue-600
          after:absolute after:top-[2px] after:left-[2px]
          after:rounded-full after:bg-white after:transition-all
          after:shadow-md
          after:content-['']
          after:${sizeClasses[size].thumb}
          peer-checked:after:${sizeClasses[size].translate}
          peer-checked:after:border-white
          transition-all duration-200
        `}
      ></div>
      {label && (
        <span className={`ml-3 ${sizeClasses[size].label} ${disabled ? 'opacity-50' : ''}`}>
          {label}
        </span>
      )}
    </label>
  );
};

// ProgressBar.jsx
export const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  showValue = false,
  className = '',
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  };

  const variantClasses = {
    primary: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    danger: 'bg-red-500',
    gradient: 'bg-gradient-to-r from-blue-500 to-blue-600'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex w-full justify-between">
        {showValue && (
          <div className="mb-1 flex w-full justify-end">
            <span className="text-xs font-medium text-gray-400">
              {percentage.toFixed(0)}%
            </span>
          </div>
        )}
      </div>
      <div
        className={`w-full overflow-hidden rounded-full bg-dark-700 ${sizeClasses[size]}`}
        {...props}
      >
        <div
          className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Avatar.jsx
export const Avatar = ({
  src,
  alt = '',
  size = 'md',
  status,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };

  const statusClasses = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
  };

  const getInitials = () => {
    if (!alt) return '';
    return alt
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="relative inline-flex flex-shrink-0">
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`
            rounded-full object-cover
            ring-2 ring-dark-700 ring-offset-2 ring-offset-dark-900
            ${sizeClasses[size]}
            ${className}
          `}
          {...props}
        />
      ) : (
        <div
          className={`
            flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30
            text-white
            ${sizeClasses[size]}
            ${className}
          `}
          {...props}
        >
          {getInitials()}
        </div>
      )}
      
      {status && (
        <span
          className={`
            absolute right-0 top-0 h-2.5 w-2.5 rounded-full ring-2 ring-dark-900
            ${statusClasses[status]}
          `}
        />
      )}
    </div>
  );
};

// Tab.jsx
import { useState } from 'react';

export const Tabs = ({
  tabs = [],
  defaultTab = 0,
  variant = 'default',
  className = '',
  onChange,
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (index) => {
    setActiveTab(index);
    if (onChange) onChange(index);
  };

  const variantClasses = {
    default: 'border-b border-dark-700',
    pills: 'flex-wrap space-x-2',
    cards: 'flex-wrap space-x-2',
    minimal: 'border-b border-dark-700'
  };

  const tabStyles = {
    default: (index) => `
      py-2.5 px-4 border-b-2 -mb-px
      ${index === activeTab 
        ? 'border-blue-500 text-blue-400' 
        : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-dark-600'}
    `,
    pills: (index) => `
      py-2 px-4 rounded-full 
      ${index === activeTab 
        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
        : 'text-gray-400 hover:bg-dark-700/50 hover:text-gray-300'}
    `,
    cards: (index) => `
      py-2 px-4 rounded-t-lg
      ${index === activeTab 
        ? 'bg-dark-800 text-white border-t border-l border-r border-dark-700' 
        : 'bg-dark-900/50 text-gray-400 hover:bg-dark-800/50 hover:text-gray-300'}
    `,
    minimal: (index) => `
      py-2.5 px-4
      ${index === activeTab 
        ? 'text-blue-400 font-medium' 
        : 'text-gray-400 hover:text-gray-300'}
    `
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      <div className={`flex ${variantClasses[variant]}`}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            className={`
              transition-all duration-200
              focus:outline-none text-sm font-medium
              ${tabStyles[variant](index)}
            `}
          >
            {typeof tab === 'string' ? tab : tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">
        {tabs.map((tab, index) => (
          <div 
            key={index} 
            className={`${activeTab === index ? 'block' : 'hidden'}`}
          >
            {typeof tab === 'object' && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

// Alert.jsx
export const Alert = ({
  title,
  children,
  variant = 'info',
  icon,
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}) => {
  const variantClasses = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    success: 'bg-green-500/10 border-green-500/30 text-green-300',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    danger: 'bg-red-500/10 border-red-500/30 text-red-300'
  };

  return (
    <div
      className={`
        rounded-lg border p-4
        ${variantClasses[variant]}
        ${className}
      `}
      role="alert"
      {...props}
    >
      <div className="flex">
        {icon && (
          <div className="mr-3 flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1">
          {title && (
            <h3 className="mb-1 font-medium">
              {title}
            </h3>
          )}
          <div className="text-sm opacity-90">
            {children}
          </div>
        </div>
        {dismissible && onDismiss && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 inline-flex h-8 w-8 items-center justify-center rounded-lg p-1.5 text-gray-300 hover:bg-dark-700/50"
            onClick={onDismiss}
          >
            <span className="sr-only">Dismiss</span>
            <svg className="h-3 w-3" aria-hidden="true" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// Modal.jsx
import { useEffect, useRef } from 'react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  footer,
  closeOnClickOutside = true,
  className = '',
  ...props
}) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (closeOnClickOutside && modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeOnClickOutside]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"></div>
      
      <div className="relative z-50 w-full px-4 sm:px-0">
        <div
          ref={modalRef}
          className={`
            mx-auto overflow-hidden rounded-xl bg-dark-800 border border-dark-700
            shadow-xl backdrop-blur-lg transition-all
            ${sizeClasses[size]}
            ${className}
          `}
          {...props}
        >
          <div className="flex items-center justify-between border-b border-dark-700 px-6 py-4">
            <h3 className="text-lg font-medium text-white">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-400 hover:bg-dark-700 hover:text-gray-200"
            >
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div className="px-6 py-4">
            {children}
          </div>
          
          {footer && (
            <div className="border-t border-dark-700 bg-dark-800/70 px-6 py-4 flex justify-end space-x-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Toast.jsx
export const Toast = ({
  message,
  type = 'info',
  duration = 3000,
  position = 'bottom-right',
  onClose,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) setTimeout(onClose, 300);
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    success: 'bg-green-500/10 border-green-500/30 text-green-300',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    error: 'bg-red-500/10 border-red-500/30 text-red-300'
  };
  
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2'
  };

  const icons = {
    info: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    success: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    error: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };

  return (
    <div
      className={`
        fixed z-50 ${positionClasses[position]}
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
      {...props}
    >
      <div
        className={`
          flex w-full max-w-sm items-center justify-between rounded-lg border
          p-4 shadow-lg backdrop-blur-md
          ${typeClasses[type]}
        `}
      >
        <div className="flex items-center">
          <div className="mr-3 flex-shrink-0">
            {icons[type]}
          </div>
          <div className="text-sm font-medium">
            {message}
          </div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) setTimeout(onClose, 300);
          }}
          className="ml-4 flex-shrink-0 rounded p-1.5 hover:bg-dark-700/50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// AnimatedCounter.jsx
import { useEffect, useState, useRef } from 'react';

export const AnimatedCounter = ({
  value = 0,
  duration = 1000,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startValueRef = useRef(0);
  const startTimeRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTimeRef.current;
      
      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easedProgress = easeOutQuad(progress);
        const nextValue = startValueRef.current + (value - startValueRef.current) * easedProgress;
        
        setDisplayValue(nextValue);
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, duration]);

  // Easing function for smoother animation
  const easeOutQuad = (t) => t * (2 - t);

  // Format the display value with appropriate decimals
  const formattedValue = displayValue.toFixed(decimals);

  return (
    <div className={`font-medium ${className}`} {...props}>
      {prefix}{formattedValue}{suffix}
    </div>
  );
};

// SkeletonLoader.jsx
export const SkeletonLoader = ({
  variant = 'text',
  width,
  height,
  rounded = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-dark-700 to-dark-800";
  
  const variantClasses = {
    text: "h-4 w-full",
    avatar: "rounded-full",
    button: "h-10 w-24",
    card: "w-full h-32",
    image: "w-full h-40",
    custom: ""
  };
  
  const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full"
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${roundedClasses[rounded]}
        ${className}
      `}
      style={{
        width: width,
        height: height
      }}
      {...props}
    />
  );
};

// GlassPanelStyled.jsx - Special glassmorphism container
export const GlassPanel = ({
  children,
  variant = 'default',
  blur = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = "border rounded-xl backdrop-blur";
  
  const variantClasses = {
    default: "bg-dark-800/40 border-dark-700/50",
    light: "bg-dark-700/30 border-dark-600/40",
    dark: "bg-dark-900/60 border-dark-800/60",
    blue: "bg-dark-800/30 border-blue-500/20",
    purple: "bg-dark-800/30 border-purple-500/20",
    gradient: "bg-gradient-to-br from-dark-800/40 to-dark-900/40 border-dark-700/40"
  };
  
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl"
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${blurClasses[blur]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// TypingEffect.jsx - Animated typing component
import { useState, useEffect } from 'react';

export const TypingEffect = ({
  text,
  typingSpeed = 50,
  startDelay = 0,
  cursorBlinking = true,
  onComplete,
  className = '',
  ...props
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Reset when text changes
    setDisplayText('');
    setCurrentIndex(0);
    setIsTyping(false);
    
    // Start delay before typing
    const startTimer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);
    
    return () => clearTimeout(startTimer);
  }, [text, startDelay]);
  
  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) return;
    
    const typingTimer = setTimeout(() => {
      setDisplayText(prev => prev + text[currentIndex]);
      setCurrentIndex(prev => prev + 1);
      
      if (currentIndex + 1 >= text.length && onComplete) {
        setTimeout(onComplete, typingSpeed);
      }
    }, typingSpeed);
    
    return () => clearTimeout(typingTimer);
  }, [isTyping, currentIndex, text, typingSpeed, onComplete]);

  return (
    <div className={`inline-block ${className}`} {...props}>
      <span>{displayText}</span>
      {(isTyping || cursorBlinking) && (
        <span className={`inline-block w-0.5 h-5 ml-0.5 bg-blue-400 ${cursorBlinking ? 'animate-blink' : ''}`}></span>
      )}
    </div>
  );
};

// FloatingCard.jsx - Card with floating animation effect
export const FloatingCard = ({
  children,
  variant = 'default',
  floatIntensity = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = "rounded-xl transition-all duration-300";
  
  const variantClasses = {
    default: "bg-dark-800 border border-dark-700",
    glass: "bg-dark-800/40 backdrop-blur-md border border-dark-700/50",
    gradient: "bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700/70",
    highlight: "bg-dark-800 border border-blue-500/30"
  };
  
  const floatClasses = {
    none: "",
    sm: "animate-float-sm",
    md: "animate-float-md",
    lg: "animate-float-lg"
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${floatClasses[floatIntensity]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// CommandMenu.jsx - Command palette similar to Raycast
import { useState, useEffect, useRef } from 'react';

export const CommandMenu = ({
  isOpen,
  onClose,
  commands = [],
  placeholder = 'Type a command...',
  className = '',
  ...props
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCommands, setFilteredCommands] = useState(commands);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const commandListRef = useRef(null);
  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCommands(commands);
    } else {
      const filtered = commands.filter(command => 
        command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (command.description && command.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredCommands(filtered);
    }
    setSelectedIndex(0);
  }, [searchTerm, commands]);
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
          break;
        case 'Enter':
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].onSelect();
            onClose();
          }
          break;
        case 'Escape':
          onClose();
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);
  
  useEffect(() => {
    if (commandListRef.current && selectedIndex > 0) {
      const selectedElement = commandListRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4 sm:px-0">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div 
        className={`
          relative w-full max-w-xl rounded-xl border border-dark-700
          bg-dark-800/95 shadow-xl backdrop-blur-lg
          ${className}
        `}
        {...props}
      >
        <div className="border-b border-dark-700 p-4">
          <div className="flex items-center">
            <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={placeholder}
              className="w-full bg-transparent py-1 text-gray-100 placeholder-gray-500 focus:outline-none"
            />
            <div className="ml-2 rounded border border-dark-600 bg-dark-700 px-2 py-1 text-xs text-gray-400">
              ESC
            </div>
          </div>
        </div>
        
        <div 
          ref={commandListRef}
          className="max-h-[60vh] overflow-y-auto p-2"
        >
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command, index) => (
              <div
                key={index}
                onClick={() => {
                  command.onSelect();
                  onClose();
                }}
                className={`
                  flex cursor-pointer items-center rounded-lg px-4 py-3
                  ${selectedIndex === index 
                    ? 'bg-blue-500/20 text-blue-300' 
                    : 'hover:bg-dark-700/70 text-gray-200'}
                `}
              >
                {command.icon && (
                  <div className="mr-3 text-gray-400">
                    {command.icon}
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-medium">{command.name}</div>
                  {command.description && (
                    <div className="text-xs text-gray-400">{command.description}</div>
                  )}
                </div>
                {command.shortcut && (
                  <div className="ml-4 flex space-x-1">
                    {command.shortcut.map((key, keyIndex) => (
                      <div 
                        key={keyIndex}
                        className="rounded border border-dark-600 bg-dark-700 px-2 py-1 text-xs text-gray-400"
                      >
                        {key}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-400">
              No commands found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};,
,
npm install @radix-ui/themes



import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
 optimizeDeps: {
    exclude: ['lucide-react'],
  ],
})
