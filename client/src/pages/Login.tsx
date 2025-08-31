import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';



const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, error: authError, clearError } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.username, formData.password);
      navigate('/');
    } catch (error) {
      // Error is handled by the auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
const handleGoogleLogin = () => {
  // In real app: trigger Google OAuth flow here
  navigate("/verify-code"); // redirect to Gmail code page
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 ">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className={`mt-1 input border-2 ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-primary-500`}
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600 ">{errors.username}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center">
  <input
    id="password"
    name="password"
    type={showPassword ? "text" : "password"}
    required
    className={`mt-1 input border-2 ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:ring-2 focus:ring-primary-500`}
    placeholder="Enter your password"
    value={formData.password}
    onChange={handleChange}
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="ml-2 text-sm text-gray-600 hover:text-gray-800"
  >
    {showPassword ? "❌👁️" : "👁️"}
  </button>
</div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          {authError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Authentication Error
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    {authError}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <Link
              to="/forgot-password"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Forgot your password?
            </Link>
          </div>
          {/* Divider */}
<div className="flex items-center justify-center mt-6">
  <div className="h-px w-full bg-gray-200" />
  <span className="px-2 text-sm text-gray-500">or</span>
  <div className="h-px w-full bg-gray-200" />
</div>

{/* Google login button */}
<button
  type="button"
  onClick={handleGoogleLogin}
  className="mt-4 flex w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-2 font-medium shadow-sm hover:bg-gray-50 transition"
>
  {/* Google G logo (SVG) */}
  <svg className="mr-2 h-5 w-5" viewBox="0 0 533.5 544.3">
    <path fill="#4285F4" d="M533.5 278.4c0-17.4-1.5-34.1-4.3-50.3H272v95.1h147.5c-6.4 34.6-25.5 63.9-54.2 83.5l87.3 67.8c51-47.1 80.9-116.6 80.9-196.1z"/>
    <path fill="#34A853" d="M272 544.3c73.5 0 135.2-24.4 180.3-66.1l-87.3-67.8c-24.2 16.2-55.3 25.8-93 25.8-71.4 0-132-48.2-153.5-113.1H27.4v71.2c45.1 89.1 137.5 150 244.6 150z"/>
    <path fill="#FBBC05" d="M118.5 322.9c-10.8-32.5-10.8-67.5 0-100l-91.1-71.2c-39.6 78.2-39.6 164.3 0 242.5l91.1-71.3z"/>
    <path fill="#EA4335" d="M272 107.7c39.9 0 75.9 13.7 104.2 40.6l78.1-78.1C407.2 24.6 345.5 0 272 0 164.9 0 72.5 60.9 27.4 150l91.1 71.2c21.5-64.8 82.1-113.5 153.5-113.5z"/>
  </svg>
  Continue with Google
</button>


        </form>
      </div>
    </div>
  );
};

export default Login;
