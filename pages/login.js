import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../context/AuthContext';
import { VALIDATION_RULES } from '../utils/constants';
import { isValidEmail } from '../utils/helpers';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/feed');
    }
  }, [isAuthenticated, isLoading, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = VALIDATION_RULES.EMAIL.REQUIRED;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = VALIDATION_RULES.EMAIL.INVALID;
    }

    if (!formData.password) {
      newErrors.password = VALIDATION_RULES.PASSWORD.REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        router.push('/feed');
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="auth-card">
        <h1 className="auth-title">Campus Connect</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            error={errors.email}
            required
            fullWidth
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
            required
            fullWidth
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="link-text">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center mt-4">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <Link href="/signup" className="link-text">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
