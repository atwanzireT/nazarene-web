"use client";

import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Gallery from "@/components/Gallery"; 

export default function EventsPage() {
    const { darkMode } = useTheme();

    return (
        <div className={clsx(
            "min-h-screen grid grid-rows-[auto_1fr_auto] font-sans",
            darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
        )}>
            <Header />

            <main className="w-full max-w-7xl mx-auto px-4 py-20 pt-30">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-12 md:mb-16 rounded-2xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-black/40 flex items-center justify-center z-10">
                        <div className="text-center p-6 md:p-16 max-w-3xl">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white drop-shadow-lg">
                                Alumni Projects Gallery
                            </h1>
                            <p className="text-base md:text-xl font-medium text-white mb-6 md:mb-8 drop-shadow">
                                Connect, engage, and give back through our diverse range of alumni development projects
                            </p>
                        </div>
                    </div>
                    <div className="h-56 md:h-96 w-full relative">
                        <Image
                            src="/hero1.JPG"
                            alt="Alumni projects banner"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                {/* Gallery Section */}
                <section className="mb-24">
                    <Gallery />
                </section>
                
                {/* Call to Action Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={clsx(
                        "rounded-xl p-8 md:p-12 text-center mb-16",
                        darkMode ? "bg-gray-800" : "bg-green-50"
                    )}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Have a project to showcase?
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Share your work with our alumni community and inspire others.
                        We welcome projects from all disciplines and career stages.
                    </p>
                    <button className={clsx(
                        "px-6 py-3 rounded-lg font-medium transition-all",
                        darkMode 
                            ? "bg-green-600 hover:bg-green-500 text-white" 
                            : "bg-green-600 hover:bg-green-700 text-white"
                    )}>
                        Submit Your Project
                    </button>
                </motion.section>
            </main>

            {/* Footer */}
            <footer className={clsx(
                "py-8 border-t",
                darkMode ? "bg-gray-900 border-gray-800 text-gray-400" : "bg-white border-gray-200 text-gray-600"
            )}>
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>© 2025 Alumni Association. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}