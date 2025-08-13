import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    
    console.log('Password reset requested for:', email);
    // TODO: Implement actual password reset logic
    setIsSubmitted(true);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="auth-card">
        <h1 className="auth-title">Campus Connect</h1>
        {isSubmitted ? (
          <div className="text-center">
            <div className="text-green-600 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Check your email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to <span className="font-medium">{email}</span>
            </p>
            <Link href="/login" className="link-text block">
              Back to Login
            </Link>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Forgot your password?</h2>
            <p className="text-gray-600 text-center mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field mt-1"
                  placeholder="Enter your email"
                />
                {error && <p className="error-text">{error}</p>}
              </div>

              <button type="submit" className="btn-primary">
                Send Reset Link
              </button>

              <div className="text-center mt-4">
                <Link href="/login" className="link-text">
                  Back to Login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
