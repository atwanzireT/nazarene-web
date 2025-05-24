"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import clsx from "clsx";

// Sample slider images - make sure these images exist in your public folder
const sliderImages = [
  {
    url: "/hero1.JPG", // Changed from /images/hero1.jpg
    alt: "Hero Image 1",
    title: "Stay Connected",
    subtitle: "Maintain relationships with the alumni and school as a whole"
  },
  {
    url: "/hero2.JPG", // Changed from /images/hero2.jpg
    alt: "Hero Image 2",
    title: "Career Support",
    subtitle: "Support our very own in career paths"
  },
  {
    url: "/hero3.JPG", // Changed from /images/hero3.jpg
    alt: "Hero Image 3",
    title: "Give Back",
    subtitle: "Extend a hand of fellowship through finance and material support"
  }
];

export default function HeroSlider() {
  const { darkMode } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageErrors, setImageErrors] = useState(new Set());
  
  // Handle slide navigation
  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    // Reset transition state after animation completes
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);
  
  const prevSlide = useCallback(() => {
    const newIndex = currentSlide === 0 ? sliderImages.length - 1 : currentSlide - 1;
    goToSlide(newIndex);
  }, [currentSlide, goToSlide]);
  
  const nextSlide = useCallback(() => {
    const newIndex = currentSlide === sliderImages.length - 1 ? 0 : currentSlide + 1;
    goToSlide(newIndex);
  }, [currentSlide, goToSlide]);
  
  // Auto-advance slide every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [nextSlide]);

  // Handle image errors
  const handleImageError = useCallback((index: number) => {
    setImageErrors(prev => new Set([...prev, index]));
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Image slider */}
      <div className="relative w-full h-full">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={clsx(
              "absolute top-0 left-0 w-full h-full transition-opacity duration-500 ease-in-out",
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* Fallback background if image fails */}
            {imageErrors.has(index) && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 z-0"></div>
            )}
            
            {/* Image overlay */}
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            
            {/* Image */}
            <Image
              src={image.url}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
              onError={() => handleImageError(index)}
              // Add unoptimized prop if you're having optimization issues
              // unoptimized
            />
            
            {/* Text content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
              <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
                {image.title}
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-center">
                {image.subtitle}
              </p>
              <div className="flex space-x-4">
                <button className={clsx(
                  "px-6 py-3 rounded-md font-medium transition-colors",
                  darkMode 
                    ? "bg-green-800 hover:bg-green-950" 
                    : "bg-green-800 hover:bg-green-950"
                )}>
                  Get Started
                </button>
                <button className="px-6 py-3 rounded-md font-medium border border-white bg-transparent hover:bg-white/20 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 focus:outline-none transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 focus:outline-none transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={clsx(
              "w-3 h-3 rounded-full transition-colors",
              index === currentSlide 
                ? "bg-white" 
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}