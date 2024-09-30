"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [showLoginForm, setShowLoginForm] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors({ email: '', password: '' });
    }, 2000);

    return () => clearTimeout(timer);
  }, [errors]);

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log('Form is valid');
    }
  };

  const handleForgotPassword = () => {
    setShowLoginForm(false);
  };

  const handleBackToLogin = () => {
    setShowLoginForm(true);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-800 rounded-[10px] shadow-md w-full max-w-md p-8">
        {showLoginForm ? (
          <>
            <p className="text-2xl font-bold mb-6 text-center text-white tracking-widest">
              Log In
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-xs italic mt-2">{errors.email}</p>}
              </div>
              <div className="mb-6">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="******************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="text-red-500 text-xs italic mt-2">{errors.password}</p>}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:text-gray-500"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold mb-6 text-center text-white tracking-widest">
              Forgot Password
            </p>
            <form>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-xs italic mt-2">{errors.email}</p>}
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:text-gray-500"
                  onClick={handleBackToLogin}
                >
                  Back to Login
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
