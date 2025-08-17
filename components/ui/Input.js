import { forwardRef, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Input = forwardRef(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  helperText,
  disabled = false,
  required = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  className = '',
  inputClassName = '',
  id,
  name,
  autoComplete,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;
  const hasError = Boolean(error);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const baseInputClasses = [
    'w-full px-3 py-2 border rounded-md transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
    'disabled:bg-gray-100 disabled:cursor-not-allowed',
    hasError 
      ? 'border-red-500 focus:ring-red-500' 
      : isFocused 
        ? 'border-blue-500' 
        : 'border-gray-300',
    leftIcon ? 'pl-10' : '',
    (rightIcon || type === 'password') ? 'pr-10' : '',
    inputClassName
  ].filter(Boolean).join(' ');

  const containerClasses = [
    'relative',
    fullWidth ? 'w-full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label 
          htmlFor={id || name} 
          className={`block text-sm font-medium mb-1 ${hasError ? 'text-red-700' : 'text-gray-700'}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className={`${hasError ? 'text-red-500' : 'text-gray-400'}`}>
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          type={inputType}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          className={baseInputClasses}
          {...props}
        />
        
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisibility}
            tabIndex={-1}
          >
            {showPassword ? (
              <FiEyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            ) : (
              <FiEye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
        
        {rightIcon && type !== 'password' && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className={`${hasError ? 'text-red-500' : 'text-gray-400'}`}>
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <p className={`mt-1 text-sm ${hasError ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
