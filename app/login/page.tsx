"use client";

import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import clsx from "clsx";
import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import API_ENDPOINT from "@/api_config";
import { AxiosError } from "axios";
import { 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Mail, 
  Lock, 
  AlertCircle 
} from "lucide-react";

const LoginScreen = () => {
  const { darkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    // Reset error state
    setError("");
    setIsLoading(true);
    
    try {
      // Check if API_ENDPOINT is defined
      if (!API_ENDPOINT) {
        throw new Error("API endpoint is not configured");
      }

      // Call your Django JWT endpoint
      const response = await axios.post(`${API_ENDPOINT}/api/token/`, {
        email,
        password
      });

      const { access, refresh } = response.data;

      // Store tokens in cookies with proper typing
      const cookieOptions = {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict' as const,
      };

      // Set access token (short-lived)
      Cookies.set('access_token', access, {
        ...cookieOptions,
        expires: 1 / 24, // 1 hour
      });

      // Set refresh token (longer-lived)
      Cookies.set('refresh_token', refresh, {
        ...cookieOptions,
        expires: rememberMe ? 30 : 1,
      });

      // Redirect to dashboard or home page
      router.push('/');
      
    } catch (err) {
      const error = err as AxiosError;
      console.error('Login error:', error);
      if (error.message === "API endpoint is not configured") {
        setError("System configuration error. Please contact support.");
      } else if (error.response) {
        if (error.response.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else {
          setError("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Animation component replacement (if framer-motion is not available)
  const MotionDiv = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>
      {children}
    </div>
  );

  return (
    <div className={clsx(
      "min-h-screen flex flex-col items-center",
      darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
    )}>
      {/* Logo/Header Area */}
      <div className="w-full py-8 px-4 text-center">
        <Link href="/" className="inline-block">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 relative">
              {/* Logo */}
              <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xl" aria-label="Logo">
                N
              </div>
            </div>
            <span className="ml-3 text-xl font-bold">The Nazarene Alumni Association</span>
          </div>
        </Link>
      </div>
      
      {/* Login Container */}
      <div className="flex-1 flex w-full max-w-6xl px-4 py-12">
        {/* Left Side - Hero Image */}
        <MotionDiv 
          className="hidden lg:block w-1/2 pr-12"
        >
          <div className="relative h-full rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-900/90 to-green-600/70 z-10 flex flex-col items-start justify-end p-12">
              <h2 className="text-4xl font-bold text-white mb-4">Welcome Back!</h2>
              <p className="text-white/90 text-lg mb-8">
                Sign in to access exclusive alumni resources, connect with fellow graduates, and stay updated on upcoming events.
              </p>
              <div className="flex space-x-3">
                <div className="w-3 h-3 rounded-full bg-white/30" aria-hidden="true"></div>
                <div className="w-3 h-3 rounded-full bg-white" aria-hidden="true"></div>
                <div className="w-3 h-3 rounded-full bg-white/30" aria-hidden="true"></div>
              </div>
            </div>
            <div className="absolute inset-0">
              {/* Fixed: Using relative path for background image */}
              <div className="w-full h-full bg-green-800">
                {/* Added error handling for background image */}
                <div className="w-full h-full opacity-60 bg-cover bg-center" 
                     style={{backgroundImage: `url('/hero2.JPG')`}}
                     role="img"
                     aria-label="Alumni gathering"></div>
              </div>
            </div>
          </div>
        </MotionDiv>
        
        {/* Right Side - Login Form */}
        <MotionDiv 
          className="w-full lg:w-1/2 flex items-center justify-center lg:pl-12"
        >
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
            
            {/* Error Message */}
            {error && (
              <div className={clsx(
                "mb-6 p-4 rounded-lg flex items-start",
                darkMode ? "bg-red-900/30 text-red-300" : "bg-red-50 text-red-600"
              )}
              role="alert">
                <AlertCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>{error}</span>
              </div>
            )}
            
            {/* Login Form */}
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
                  )} aria-hidden="true">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  )} aria-hidden="true">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    aria-label={showPassword ? "Hide password" : "Show password"}
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
                  "w-full py-3 px-4 rounded-lg font-medium flex justify-center items-center transition-all",
                  isLoading ? "opacity-80 cursor-not-allowed" : "",
                  "bg-green-800 hover:bg-green-950 text-white"
                )}
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                ) : (
                  <>
                    Sign In <ArrowRight className="ml-2" size={18} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
            
            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <p className="text-sm">
                Don&rsquo;t have an account?{" "}
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
        </MotionDiv>
      </div>
      
      {/* Footer */}
      <div className={clsx(
        "w-full py-6 px-4 text-center border-t",
        darkMode ? "border-gray-800 text-gray-400" : "border-gray-200 text-gray-600"
      )}>
        <p className="text-sm">© 2025 Alumni Association. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LoginScreen;