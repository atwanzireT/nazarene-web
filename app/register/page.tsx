"use client";
import Link from "next/link";
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";

export default function Page() {
  const { darkMode } = useTheme();

  return (
    <div className={clsx(
      "min-h-screen flex flex-col items-center justify-center px-4 py-12",
      darkMode 
        ? "bg-gradient-to-b from-gray-900 to-gray-800" 
        : "bg-gradient-to-b from-green-50 to-white"
    )}>
      {/* Background overlay */}
    <div
      className={clsx(
        "absolute inset-0 z-0 opacity-20 bg-cover bg-center",
        darkMode ? "bg-gray-900" : "bg-green-900"
      )}
      style={{
        backgroundImage: `url('/images/hero3.JPG')`,
      }}
    ></div>
      
      <div className="max-w-4xl w-full z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={clsx(
            "text-4xl md:text-5xl font-bold mb-2",
            darkMode ? "text-green-400" : "text-green-800"
          )}>
            The Nazarene Registration
          </h1>
          <p className={clsx(
            "text-lg",
            darkMode ? "text-green-300" : "text-green-600"
          )}>Complete your membership journey today</p>
        </div>

        {/* Description card */}
        <div className={clsx(
          "shadow-lg rounded-xl border-l-4 p-8 mb-10",
          darkMode 
            ? "bg-gray-800 border-green-500 text-gray-200" 
            : "bg-white border-green-600 text-gray-700"
        )}>
          <p className={clsx(
            "text-lg mb-6",
            darkMode ? "text-gray-200" : "text-gray-700"
          )}>
            Welcome to The Nazarene registration process. Please complete all
            required information to finalize your registration and join our community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            {/* Form button */}
            <Link
              className={clsx(
                "inline-flex items-center justify-center rounded-lg text-white py-3 px-8 font-medium transition-colors duration-300 w-full sm:w-auto shadow-md",
                darkMode 
                  ? "bg-green-600 hover:bg-green-500" 
                  : "bg-green-700 hover:bg-green-600"
              )}
              as="http://142.93.0.131/account-application/create/"
              href="http://142.93.0.131/account-application/create/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Start Registration
            </Link>

            {/* Learn more link */}
            <Link
              className={clsx(
                "inline-flex items-center justify-center rounded-lg border-2 py-3 px-6 font-medium transition-colors duration-300 w-full sm:w-auto",
                darkMode 
                  ? "border-green-500 text-green-400 hover:bg-gray-700" 
                  : "border-green-600 text-green-700 hover:bg-green-50"
              )}
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Learn More
            </Link>
          </div>
        </div>

        {/* Registration steps */}
        <div className={clsx(
          "shadow-md rounded-xl p-8 mb-10",
          darkMode ? "bg-gray-800" : "bg-white"
        )}>
          <h2 className={clsx(
            "text-2xl font-semibold mb-6 text-center",
            darkMode ? "text-green-400" : "text-green-800"
          )}>
            Registration Process
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={clsx(
              "rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden",
              darkMode 
                ? "bg-gray-700 border border-gray-600" 
                : "bg-white border border-green-200"
            )}>
              <div className={clsx(
                "p-4 text-center",
                darkMode ? "bg-green-600" : "bg-green-700"
              )}>
                <div className={clsx(
                  "inline-flex items-center justify-center w-12 h-12 rounded-full font-bold mb-2 text-xl",
                  darkMode 
                    ? "bg-gray-800 text-green-400" 
                    : "bg-white text-green-700"
                )}>
                  1
                </div>
                <h3 className="font-medium text-lg mb-1 text-white">Personal Details</h3>
              </div>
              <div className="p-4">
                <p className={clsx(
                  darkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Enter your basic information and identification details
                </p>
                <div className="mt-4">
                </div>
              </div>
            </div>

            <div className={clsx(
              "rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden",
              darkMode 
                ? "bg-gray-700 border border-gray-600" 
                : "bg-white border border-green-200"
            )}>
              <div className={clsx(
                "p-4 text-center",
                darkMode ? "bg-green-600" : "bg-green-700"
              )}>
                <div className={clsx(
                  "inline-flex items-center justify-center w-12 h-12 rounded-full font-bold mb-2 text-xl",
                  darkMode 
                    ? "bg-gray-800 text-green-400" 
                    : "bg-white text-green-700"
                )}>
                  2
                </div>
                <h3 className="font-medium text-lg mb-1 text-white">Contact Information</h3>
              </div>
              <div className="p-4">
                <p className={clsx(
                  darkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Provide your address and contact details for communication
                </p>
                <div className="mt-4">
                </div>
              </div>
            </div>

            <div className={clsx(
              "rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden",
              darkMode 
                ? "bg-gray-700 border border-gray-600" 
                : "bg-white border border-green-200"
            )}>
              <div className={clsx(
                "p-4 text-center",
                darkMode ? "bg-green-600" : "bg-green-700"
              )}>
                <div className={clsx(
                  "inline-flex items-center justify-center w-12 h-12 rounded-full font-bold mb-2 text-xl",
                  darkMode 
                    ? "bg-gray-800 text-green-400" 
                    : "bg-white text-green-700"
                )}>
                  3
                </div>
                <h3 className="font-medium text-lg mb-1 text-white">Review & Submit</h3>
              </div>
              <div className="p-4">
                <p className={clsx(
                  darkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Verify your information and complete the registration
                </p>
                <div className="mt-4">
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help section */}
        <div className={clsx(
          "rounded-xl p-6 mb-8",
          darkMode 
            ? "bg-gray-700 border border-gray-600" 
            : "bg-green-50 border border-green-100"
        )}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
            <div className="flex-shrink-0">
              <div className={clsx(
                "w-12 h-12 rounded-full flex items-center justify-center",
                darkMode 
                  ? "bg-gray-800 text-green-400" 
                  : "bg-green-100 text-green-700"
              )}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6m6 4v-8m6 8a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className={clsx(
                "font-medium text-lg mb-2",
                darkMode ? "text-green-400" : "text-green-800"
              )}>Need Assistance?</h3>
              <p className={clsx(
                "mb-3",
                darkMode ? "text-gray-300" : "text-gray-600"
              )}>
                If you have any questions or need help with your registration, our support team is ready to assist you.
              </p>
              <Link 
                href="/contact" 
                className={clsx(
                  "font-medium inline-flex items-center hover:underline",
                  darkMode ? "text-green-400" : "text-green-700"
                )}
              >
                Contact Support
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={clsx(
          "text-center text-sm pt-4",
          darkMode 
            ? "text-gray-400 border-t border-gray-700" 
            : "text-gray-500 border-t border-gray-200"
        )}>
          <p>© {new Date().getFullYear()} The Nazarene. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link 
              href="/privacy-policy" 
              className={clsx(
                darkMode ? "hover:text-green-400" : "hover:text-green-700"
              )}
            >Privacy Policy</Link>
            <Link 
              href="/terms" 
              className={clsx(
                darkMode ? "hover:text-green-400" : "hover:text-green-700"
              )}
            >Terms of Service</Link>
            <Link 
              href="/faq" 
              className={clsx(
                darkMode ? "hover:text-green-400" : "hover:text-green-700"
              )}
            >FAQ</Link>
          </div>
        </div>
      </div>
    </div>
  );
}