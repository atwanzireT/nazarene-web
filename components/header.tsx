"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import clsx from "clsx";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = Cookies.get('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Remove tokens from cookies
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setIsLoggedIn(false);
    router.push('/');
  };

  return (
    <nav
      className={clsx(
        "fixed w-full z-100 shadow-md transition-colors duration-300",
        darkMode ? "bg-gray-900 border-b border-gray-800" : "bg-white border-b border-gray-100"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="h-10 w-10 bg-green-800 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span
              className={clsx(
                "ml-2 text-xl font-semibold transition-colors duration-300",
                darkMode ? "text-gray-100" : "text-green-900"
              )}
            >
              The Nazarene
            </span>
          </div>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Projects", "Activities", "Events", "Gallery", "Contact"].map((link) => {
              const href =
                link === "Home"
                  ? "/"
                  : link === "Projects"
                  ? "/projects/"
                  : link === "Events"
                  ? "/events/"
                  : link === "Activities"
                  ? "/activities/"
                  : link === "Gallery"
                  ? "/gallery/"
                  : link === "Contact"
                  ? "/contact/"
                  : "#";
              return (
                <Link
                  key={link}
                  href={href}
                  className={clsx(
                    "px-3 py-2 text-lg font-medium rounded-md transition-colors duration-300",
                    darkMode
                      ? "text-gray-300 hover:bg-gray-800 hover:text-green-400"
                      : "text-green-900 hover:bg-gray-50 hover:text-green-950"
                  )}
                >
                  {link}
                </Link>
              );
            })}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={clsx(
                "p-2 rounded-full transition-colors duration-300",
                darkMode
                  ? "text-green-700 hover:bg-gray-800"
                  : "text-green-800 hover:bg-gray-100"
              )}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* <Link
                  href="/profile"
                  className={clsx(
                    "p-2 rounded-full transition-colors duration-300",
                    darkMode
                      ? "text-green-400 hover:bg-gray-800"
                      : "text-green-700 hover:bg-gray-100"
                  )}
                  aria-label="User profile"
                >
                  <User size={22} />
                </Link> */}
                <button
                  onClick={handleLogout}
                  className={clsx(
                    "px-5 py-2.5 rounded-md text-base font-medium transition-colors duration-300",
                    darkMode
                      ? "bg-red-800 text-white hover:bg-red-700"
                      : "bg-red-700 text-white hover:bg-red-800"
                  )}
                  aria-label="Logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => router.push("/login")}
                className={clsx(
                  "px-5 py-2.5 rounded-md text-base font-medium transition-colors duration-300",
                  darkMode
                    ? "bg-green-800 text-white hover:bg-green-700"
                    : "bg-green-700 text-white hover:bg-green-800"
                )}
                aria-label="Login"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile toggles */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={clsx(
                "p-2 rounded-full transition-colors duration-300",
                darkMode
                  ? "text-green-600 hover:bg-gray-800"
                  : "text-green-800 hover:bg-gray-100"
              )}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={clsx(
                "p-2 rounded-md transition-colors duration-300",
                darkMode
                  ? "text-gray-300 hover:bg-gray-800 hover:text-green-400"
                  : "text-green-700 hover:bg-gray-100 hover:text-green-800"
              )}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={clsx(
        "md:hidden overflow-hidden transition-all duration-300",
        mobileMenuOpen ? "max-h-96" : "max-h-0",
        darkMode ? "bg-gray-900" : "bg-white"
      )}>
        <div className="px-4 pt-2 pb-3 space-y-1">
          {["Home", "Projects", "Activities", "Events", "Gallery", "Contact"].map((link) => {
            const href =
              link === "Home"
                ? "/"
                : link === "Projects"
                ? "/projects/"
                : link === "Events"
                ? "/events/"
                : link === "Activities"
                ? "/activities/"
                : link === "Gallery"
                ? "/gallery/"
                : link === "Contact"
                ? "/contact/"
                : "#";
            return (
              <Link
                key={link}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300",
                  darkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-green-400"
                    : "text-green-700 hover:bg-gray-50 hover:text-green-800"
                )}
              >
                {link}
              </Link>
            );
          })}
        </div>
        <div
          className={clsx(
            "pt-4 pb-3 border-t px-5",
            darkMode ? "border-gray-800" : "border-gray-100"
          )}
        >
          {isLoggedIn ? (
            <>
              {/* <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={clsx(
                  "block w-full mb-3 px-3 py-2 rounded-md text-base font-medium text-center transition-colors duration-300",
                  darkMode
                    ? "text-green-400 hover:bg-gray-800"
                    : "text-green-700 hover:bg-gray-100"
                )}
              >
                My Profile
              </Link> */}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className={clsx(
                  "w-full px-5 py-2.5 rounded-md text-base font-medium transition-colors duration-300",
                  darkMode
                    ? "bg-red-800 text-white hover:bg-red-700"
                    : "bg-red-700 text-white hover:bg-red-800"
                )}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                router.push("/login");
                setMobileMenuOpen(false);
              }}
              className={clsx(
                "w-full px-5 py-2.5 rounded-md text-base font-medium transition-colors duration-300",
                darkMode
                  ? "bg-green-800 text-white hover:bg-green-700"
                  : "bg-green-700 text-white hover:bg-green-800"
              )}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}