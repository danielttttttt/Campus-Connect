import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

const Toast = ({
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  action = null,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };

  const icons = {
    success: <FiCheck className="h-5 w-5" />,
    error: <FiX className="h-5 w-5" />,
    warning: <FiAlertCircle className="h-5 w-5" />,
    info: <FiInfo className="h-5 w-5" />,
  };

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  const iconColors = {
    success: 'text-green-400',
    error: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400',
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          className={`max-w-sm w-full border rounded-lg shadow-lg p-4 ${colors[type]}`}
        >
          <div className="flex items-start">
            <div className={`flex-shrink-0 ${iconColors[type]}`}>
              {icons[type]}
            </div>
            
            <div className="ml-3 flex-1">
              {title && (
                <p className="text-sm font-medium">
                  {title}
                </p>
              )}
              {message && (
                <p className={`text-sm ${title ? 'mt-1' : ''}`}>
                  {message}
                </p>
              )}
              {action && (
                <div className="mt-2">
                  {action}
                </div>
              )}
            </div>
            
            <div className="ml-4 flex-shrink-0">
              <button
                onClick={handleClose}
                className="inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Toast Container Component
const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={onRemove}
        />
      ))}
    </div>
  );
};

export { Toast, ToastContainer };
