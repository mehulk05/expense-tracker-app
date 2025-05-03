// LoginForm.jsx
import React, { ChangeEvent, FormEvent, useState } from 'react';

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

interface ILoginFormData {
    email: string;
    password: string;
  }

  interface ILoginFormErrors {
    email?: string;
    password?: string;
  }
  
  
const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ILoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<ILoginFormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string>('');
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field-level errors
    if (errors[name as keyof ILoginFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  
    // Clear auth error when user modifies form
    if (authError) {
      setAuthError('');
    }
  };
  
  const validateForm = () => {
    const newErrors: ILoginFormErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setAuthError('');
    
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      // Login successful
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error: any) {
      // Handle Firebase auth errors with user-friendly messages
      let errorMessage = 'An error occurred during sign in.';
      
      switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'The email address is not valid.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password. Please try again.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed login attempts. Please try again later.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your connection.';
        break;
      default:
        console.error("Firebase auth error:", error);
      }
      
      setAuthError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-purple-100 dark:border-indigo-900">
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Sign In</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Enter your details to access your account</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          {authError && (
            <div className="bg-red-50 text-red-800 border border-red-200 rounded-lg p-3 text-sm">
              {authError}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input 
              id="email" 
              name="email"
              type="email" 
              placeholder="you@example.com" 
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white`}
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                Forgot password?
              </a>
            </div>
            <input 
              id="password"
              name="password" 
              type="password" 
              placeholder="••••••••" 
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-indigo-500'
              } focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-white`}
            />
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium shadow-md transition-all flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : 'Sign In'}
          </button>
        </form>
      </div>
      <div className="py-4 bg-gray-50 dark:bg-gray-800 text-center border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;