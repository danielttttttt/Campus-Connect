import React from 'react';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';
import Button from './ui/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      eventId: null 
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
      eventId: Date.now().toString() // Simple error ID for tracking
    });

    // In a real app, you would send this to an error reporting service
    // like Sentry, LogRocket, etc.
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false
      });
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      eventId: null 
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div className="text-center">
                <FiAlertTriangle className="mx-auto h-12 w-12 text-red-500" />
                <h2 className="mt-4 text-lg font-medium text-gray-900">
                  Something went wrong
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  We're sorry, but something unexpected happened. Please try again.
                </p>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="mt-4 text-left">
                    <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                      Error Details (Development Only)
                    </summary>
                    <div className="mt-2 p-3 bg-gray-100 rounded text-xs font-mono text-gray-800 overflow-auto max-h-40">
                      <div className="font-bold text-red-600">Error:</div>
                      <div className="mb-2">{this.state.error.toString()}</div>
                      <div className="font-bold text-red-600">Stack Trace:</div>
                      <div>{this.state.errorInfo.componentStack}</div>
                    </div>
                  </details>
                )}
                
                <div className="mt-6 flex flex-col space-y-3">
                  <Button
                    onClick={this.handleRetry}
                    leftIcon={<FiRefreshCw />}
                    fullWidth
                  >
                    Try Again
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={this.handleGoHome}
                    leftIcon={<FiHome />}
                    fullWidth
                  >
                    Go to Homepage
                  </Button>
                </div>
                
                {this.state.eventId && (
                  <p className="mt-4 text-xs text-gray-400">
                    Error ID: {this.state.eventId}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for wrapping components with error boundary
export const withErrorBoundary = (Component, fallback = null) => {
  const WrappedComponent = (props) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );
  
  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};

// Lightweight error boundary for smaller components
export const ErrorFallback = ({ error, resetError }) => (
  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
    <div className="flex items-center">
      <FiAlertTriangle className="h-5 w-5 text-red-500 mr-2" />
      <h3 className="text-sm font-medium text-red-800">
        Something went wrong
      </h3>
    </div>
    <p className="mt-1 text-sm text-red-700">
      {error?.message || 'An unexpected error occurred'}
    </p>
    <div className="mt-3">
      <Button
        size="sm"
        variant="outline"
        onClick={resetError}
        leftIcon={<FiRefreshCw />}
      >
        Try again
      </Button>
    </div>
  </div>
);

export default ErrorBoundary;
