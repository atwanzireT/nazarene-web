"use client";

import Header from "@/components/header";
import HeroSlider from "@/components/HeroSlider";
import clsx from "clsx";
import { useTheme } from "@/context/ThemeContext";
import AboutSection from "@/components/aboutSection";
import StaffSection from "@/components/staff";

export default function Home() {
  const { darkMode } = useTheme();

  return (
    <div 
      className={clsx(
        "min-h-screen grid grid-rows-[auto_1fr_auto] font-sans transition-colors duration-200 ",
        darkMode 
          ? "bg-gray-900 text-white" 
          : "bg-white text-green-600"
      )}
    >
      {/* Header */}
      <Header />

      {/* Hero Section with Slider */}
      <section className="w-full pt-20">
        <HeroSlider />
      </section>

      {/* Main content */}
      <main className="w-full max-w-7xl mx-auto px-4 py-16 flex flex-col items-center gap-10">
        {/* About Us */}
        <AboutSection />
        <StaffSection />
               
        {/* CTA Section */}
        <div className={clsx(
          "w-full p-8 rounded-lg text-center my-8",
          darkMode ? "bg-gray-800" : "bg-gray-50"
        )}>
          <h3 className={clsx(
            "text-2xl font-bold mb-4",
            darkMode ? "text-white" : "text-green-800"
          )}>
            Ready to get started?
          </h3>
          <p className={clsx(
            "mb-6 max-w-2xl mx-auto",
            darkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Join us today and discover how we can help bring your vision to life.
          </p>
          <button className={clsx(
            "px-6 py-3 rounded-md font-medium transition-colors",
            darkMode 
              ? "bg-blue-600 text-white hover:bg-blue-700" 
              : "bg-green-800 text-white hover:bg-green-950"
          )}>
            Contact Us
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className={clsx(
        "text-center py-6 text-sm transition-colors",
        darkMode ? "text-gray-400" : "text-green-800"
      )}>
        &copy; {new Date().getFullYear()} The Nazarene. All rights reserved.
      </footer>
    </div>
  );
}