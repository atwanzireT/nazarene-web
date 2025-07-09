"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import clsx from "clsx";
import axios from "axios";
import Cookies from 'js-cookie';
import {
  Eye,
  EyeOff,
  ArrowRight,
  Mail,
  Lock,
  AlertCircle
} from "lucide-react";
import Image from "next/image";

const LoginScreen = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post('/api/token/', {
        email: formData.email,
        password: formData.password
      });

      const { access, refresh } = response.data;

      // Set cookies
      Cookies.set('access_token', access, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: 1 / 24 // 1 hour
      });

      Cookies.set('refresh_token', refresh, {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: rememberMe ? 30 : 1
      });

      router.push('/');
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx(
      "min-h-screen flex flex-col items-center",
      darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
    )}>
      {/* Logo/Header */}
      <div className="w-full py-8 px-4 text-center">
        <Link href="/" className="inline-block">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 relative">
              <Image
                src="/logo.png"
                alt="Logo"
                width={45}
                height={45}
                className="h-12 w-12 object-contain rounded"
              />
            </div>
            <span className="ml-3 text-xl font-bold">The Nazarene Alumni Association</span>
          </div>
        </Link>
      </div>

      {/* Login Container */}
      <div className="flex-1 flex w-full max-w-6xl px-4 py-12">
        {/* Left Side - Hero Image (hidden on mobile) */}
        <div className="hidden lg:block w-1/2 pr-12">
          <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
            <div className={clsx(
              "absolute inset-0 bg-gradient-to-tr z-10 flex flex-col items-start justify-end p-12",
              darkMode ? "from-gray-900/90 to-gray-800/70" : "from-green-900/90 to-green-600/70"
            )}>
              <h2 className="text-4xl font-bold text-white mb-4">Welcome Back!</h2>
              <p className="text-white/90 text-lg mb-8">
                Sign in to access exclusive alumni resources.
              </p>
            </div>
            <div className={clsx(
              "absolute inset-0",
              darkMode ? "bg-gray-800" : "bg-green-800"
            )}>
              <div className="w-full h-full opacity-60 bg-cover bg-center" style={{ backgroundImage: "url('/hero2.JPG')" }}></div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:pl-12">
          <div className={clsx(
            "w-full max-w-md p-8 rounded-xl shadow-lg",
            darkMode ? "bg-gray-800" : "bg-white"
          )}>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Sign In</h1>
              <p className={clsx(
                "text-sm",
                darkMode ? "text-gray-400" : "text-gray-500"
              )}>
                Enter your credentials to access your account
              </p>
            </div>

            {error && (
              <div className={clsx(
                "mb-6 p-4 rounded-lg flex items-start",
                darkMode ? "bg-red-900/30 text-red-300" : "bg-red-50 text-red-600"
              )}>
                <AlertCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className={clsx(
                  "relative rounded-lg border overflow-hidden flex items-center",
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                    : "bg-white border-gray-300 focus-within:border-green-500"
                )}>
                  <div className={clsx(
                    "pl-3",
                    darkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={clsx(
                      "block w-full py-3 px-3 outline-none",
                      darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                    )}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className={clsx(
                      "text-xs",
                      darkMode ? "text-green-400 hover:text-green-300" : "text-green-800 hover:text-green-950"
                    )}
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className={clsx(
                  "relative rounded-lg border overflow-hidden flex items-center",
                  darkMode
                    ? "bg-gray-700 border-gray-600 focus-within:border-green-500"
                    : "bg-white border-gray-300 focus-within:border-green-500"
                )}>
                  <div className={clsx(
                    "pl-3",
                    darkMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={clsx(
                      "block w-full py-3 px-3 outline-none",
                      darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
                    )}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={clsx(
                      "pr-3",
                      darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                    )}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center mb-6">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 rounded text-green-600 focus:ring-green-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={clsx(
                  "w-full py-3 px-4 rounded-lg font-medium flex justify-center items-center",
                  isLoading ? "opacity-80 cursor-not-allowed" : "",
                  "bg-green-800 hover:bg-green-950 text-white"
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2" size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-sm">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className={clsx(
                    "font-medium",
                    darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"
                  )}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={clsx(
        "w-full py-6 px-4 text-center border-t",
        darkMode ? "border-gray-800 text-gray-400" : "border-gray-200 text-gray-600"
      )}>
        <p className="text-sm">© 2025 The Nazarene. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginScreen;