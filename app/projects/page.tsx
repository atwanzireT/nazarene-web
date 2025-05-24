"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Calendar, MapPin, Clock, Users, GalleryThumbnails,
    ChevronRight, Filter, X
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";
import Image from "next/image";
import Header from "@/components/header";
import { motion } from "framer-motion";
import axios from "axios";
import API_ENDPOINT from "@/api_config";

// Project status configuration
const STATUS_CONFIG = {
    pending: {
        label: 'Pending',
        color: 'blue',
        action: 'Express Interest'
    },
    upcoming: {
        label: 'Upcoming',
        color: 'indigo',
        action: 'Contribute Now'
    },
    ongoing: {
        label: 'Ongoing',
        color: 'green',
        action: 'Contribute Now'
    },
    completed: {
        label: 'Completed',
        color: 'gray',
        action: 'View Gallery'
    },
    cancelled: {
        label: 'Cancelled',
        color: 'red',
        action: null
    },
    postponed: {
        label: 'Postponed',
        color: 'amber',
        action: null
    }
};

// Default image URL
const DEFAULT_COVER_IMAGE = '/images/project-default.jpg';

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

// Type definitions
/**
 * @typedef {Object} Project
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} status
 * @property {string} [status_display]
 * @property {number} progress
 * @property {string|null} start_date
 * @property {string|null} end_date
 * @property {string|null} budget
 * @property {string} raised_amount
 * @property {string|null} location
 * @property {string|null} cover_image
 * @property {boolean} is_featured
 * @property {any[]} activities
 * @property {number} duration
 * @property {boolean} is_active
 * @property {string} created
 */

export default function ProjectsPage() {
    const { darkMode } = useTheme();
    const [filters, setFilters] = useState(['pending', 'upcoming', 'ongoing']);
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [projects, setProjects] = useState({
        all: [],
        filtered: [],
        loading: true,
        error: null
    });

    // Filter projects function
    const filterProjects = useCallback((allProjects, currentFilters) => {
        return allProjects.filter(project => currentFilters.includes(project.status));
    }, []);

    // Fetch projects
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/projects/`);
                const allProjects = response.data;

                setProjects(prev => ({
                    ...prev,
                    all: allProjects,
                    filtered: filterProjects(allProjects, filters),
                    loading: false,
                    error: null
                }));
            } catch (err) {
                console.error("Error fetching projects:", err);
                setProjects(prev => ({
                    ...prev,
                    loading: false,
                    error: "Failed to load projects. Please try again later."
                }));
            }
        };

        fetchProjects();
    }, [filters, filterProjects]);

    // Update filtered projects when filters change
    useEffect(() => {
        if (projects.all.length === 0) return;

        setProjects(prev => ({
            ...prev,
            filtered: filterProjects(prev.all, filters)
        }));
    }, [filters, projects.all.length, filterProjects]);

    // Helper functions
    const formatDate = (dateString) => {
        if (!dateString) return "Not scheduled";
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return "Invalid date";
        }
    };

    const calculateDaysRemaining = (endDate) => {
        if (!endDate) return null;
        try {
            const diff = new Date(endDate) - new Date();
            return Math.ceil(diff / (1000 * 60 * 60 * 24));
        } catch{
            return null;
        }
    };

    const formatCurrency = (amount) => {
        if (!amount) return "UGX 0";
        try {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'UGX',
                maximumFractionDigits: 0
            }).format(parseFloat(amount));
        } catch {
            return "KES 0";
        }
    };

    // Filter functions
    const toggleFilter = (status) => {
        setFilters(prev =>
            prev.includes(status)
                ? prev.filter(f => f !== status)
                : [...prev, status]
        );
    };

    const setPresetFilters = (presetFilters) => {
        setFilters(presetFilters);
        document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    // UI helper functions
    const getStatusInfo = (project) => {
        const status = project.status;
        const config = STATUS_CONFIG[status] || { label: status, color: 'gray', action: null };

        return {
            label: project.status_display || config.label,
            color: config.color,
            action: config.action
        };
    };

    // Component rendering functions
    const renderActionButton = (project) => {
        const { status } = project;
        const { action } = getStatusInfo(project);

        if (!action) {
            const statusText = status === 'cancelled' ? 'Project Cancelled' : 'Postponed - Stay Tuned';
            const icon = status === 'cancelled' ? <X className="w-4 h-4" /> : <Clock className="w-4 h-4" />;
            const textColor = status === 'cancelled' ? (darkMode ? "text-red-400" : "text-red-600") :
                (darkMode ? "text-amber-400" : "text-amber-600");

            return (
                <div className={clsx(
                    "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium",
                    darkMode ? "bg-gray-800" : "bg-gray-100",
                    textColor
                )}>
                    {icon}
                    {statusText}
                </div>
            );
        }

        if (status === 'completed') {
            return (
                <button
                    onClick={() => window.location.href = `/projects/gallery/${project.id}`}
                    className={clsx(
                        "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors",
                        darkMode ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    )}
                >
                    <GalleryThumbnails className="w-4 h-4" />
                    {action}
                </button>
            );
        }

        return (
            <a
                href={`/projects/donate/${project.id}`}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors bg-green-800 hover:bg-green-950 text-white"
            >
                <Users className="w-4 h-4" />
                {action}
            </a>
        );
    };

    // Loading and error states

    if (projects.loading) {
        return (
            <div className={clsx(
                "min-h-screen flex flex-col",
                darkMode ? "bg-gray-900" : "bg-gray-50"
            )}>
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
                        <p className={clsx(
                            "text-lg",
                            darkMode ? "text-gray-300" : "text-gray-600"
                        )}>
                            Loading projects...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (projects.error) {
        return (
            <div className={clsx(
                "min-h-screen flex items-center justify-center",
                darkMode ? "bg-gray-900" : "bg-gray-50"
            )}>
                <div className={clsx(
                    "max-w-md p-6 rounded-lg text-center",
                    darkMode ? "bg-gray-800" : "bg-white shadow"
                )}>
                    <div className="text-red-500 mb-4">
                        <X size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Error Loading Projects</h3>
                    <p className="mb-4">{projects.error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-4 py-2 rounded-lg font-medium bg-green-600 text-white"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

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
                                Alumni Projects
                            </h1>
                            <p className="text-base md:text-xl font-medium text-white mb-6 md:mb-8 drop-shadow">
                                Connect, engage, and give back through our diverse range of alumni development projects
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button
                                    onClick={() => setPresetFilters(['upcoming', 'ongoing'])}
                                    className="px-5 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all bg-white text-green-800 hover:bg-green-50"
                                >
                                    Current & Upcoming Projects
                                </button>
                                <button
                                    onClick={() => setPresetFilters(['completed'])}
                                    className="px-5 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-800 hover:bg-opacity-10"
                                >
                                    Completed Projects
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="h-56 md:h-96 w-full relative">
                        <Image
                            src="/images/hero1.jpg"
                            alt="Alumni projects banner"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                {/* Filter Section */}
                <section className="mb-8 md:mb-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        variants={fadeIn}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 md:mb-6"
                    >
                        <div className="flex items-center">
                            <h2 className={clsx(
                                "text-2xl md:text-3xl font-bold flex items-center gap-2 md:gap-3",
                                darkMode ? "text-green-400" : "text-green-800"
                            )}>
                                <Calendar size={28} className="text-green-800" />
                                Projects
                            </h2>

                            <span className={clsx(
                                "ml-3 px-3 py-1 rounded-full text-sm",
                                darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
                            )}>
                                {projects.filtered.length} found
                            </span>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setShowFilterMenu(!showFilterMenu)}
                                className={clsx(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg border",
                                    darkMode
                                        ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                                        : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                                )}
                                aria-expanded={showFilterMenu}
                                aria-controls="filter-menu"
                            >
                                <Filter size={18} />
                                <span>Filter Projects</span>
                                {filters.length > 0 && (
                                    <span className={clsx(
                                        "ml-2 px-2 py-0.5 rounded-full text-xs",
                                        darkMode ? "bg-green-900 text-green-300" : "bg-green-100 text-green-800"
                                    )}>
                                        {filters.length}
                                    </span>
                                )}
                            </button>

                            {showFilterMenu && (
                                <div
                                    id="filter-menu"
                                    className={clsx(
                                        "absolute right-0 top-full mt-2 p-4 rounded-lg shadow-lg z-20 w-64",
                                        darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                                    )}
                                >
                                    <div className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="font-medium mb-2">Project Status</h3>
                                        <div className="space-y-2">
                                            {Object.entries(STATUS_CONFIG).map(([key, { label }]) => (
                                                <div key={key} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`status-${key}`}
                                                        checked={filters.includes(key)}
                                                        onChange={() => toggleFilter(key)}
                                                        className="mr-2 rounded"
                                                    />
                                                    <label htmlFor={`status-${key}`} className="text-sm">
                                                        {label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => setFilters([])}
                                            className={clsx(
                                                "text-xs px-2 py-1 rounded",
                                                darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                            )}
                                        >
                                            Clear All
                                        </button>
                                        <button
                                            onClick={() => setFilters(Object.keys(STATUS_CONFIG))}
                                            className={clsx(
                                                "text-xs px-2 py-1 rounded",
                                                darkMode ? "text-green-400 hover:text-green-300" : "text-green-800 hover:text-green-950"
                                            )}
                                        >
                                            Show All
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Active Filters Display */}
                    {filters.length > 0 && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeIn}
                            className="flex flex-wrap gap-2 mb-4 md:mb-6"
                        >
                            {filters.map(filter => {
                                const { label } = STATUS_CONFIG[filter] || { label: filter };
                                return (
                                    <span
                                        key={filter}
                                        className={clsx(
                                            "flex items-center gap-1 px-3 py-1 rounded-full text-xs",
                                            darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                                        )}
                                    >
                                        {label}
                                        <button
                                            onClick={() => toggleFilter(filter)}
                                            className="ml-1 p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                            aria-label={`Remove ${label} filter`}
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                );
                            })}
                            <button
                                onClick={() => setFilters([])}
                                className={clsx(
                                    "text-xs px-3 py-1 rounded-full",
                                    darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900",
                                    "hover:underline"
                                )}
                            >
                                Clear All
                            </button>
                        </motion.div>
                    )}
                </section>

                {/* Projects Section */}
                <section id="projects-section" className="mb-12 md:mb-16 scroll-mt-24">
                    {projects.filtered.length > 0 ? (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={stagger}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {projects.filtered.map((project) => {
                                const { label } = getStatusInfo(project);
                                const daysRemaining = calculateDaysRemaining(project.end_date);

                                return (
                                    <motion.div
                                        key={project.id}
                                        variants={fadeIn}
                                        whileHover={{ y: -5 }}
                                        className={clsx(
                                            "flex flex-col rounded-xl shadow-lg overflow-hidden transition-all border h-full",
                                            darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                                        )}
                                    >
                                        <div className="relative h-48">
                                            <div className={clsx(
                                                "absolute top-0 right-0 m-3 px-3 py-1 rounded-full text-xs font-semibold z-10",
                                                "text-white",
                                            )}>
                                                {label}
                                            </div>
                                            <Image
                                                src={project.cover_image || DEFAULT_COVER_IMAGE}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                priority={project.is_featured}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                                        </div>

                                        <div className="p-6 flex-1">
                                            <h3 className={clsx(
                                                "text-xl font-bold mb-3",
                                                darkMode ? "text-white" : "text-gray-800"
                                            )}>
                                                {project.title}
                                            </h3>

                                            <div className="space-y-3 mb-4">
                                                <div className="flex items-start gap-3">
                                                    <Clock className={clsx(
                                                        "w-4 h-4 flex-shrink-0 mt-1",
                                                        darkMode ? "text-green-400" : "text-green-600"
                                                    )} />
                                                    <span className={clsx("text-sm", darkMode ? "text-gray-300" : "text-gray-600")}>
                                                        {project.start_date ? (
                                                            <>
                                                                Starts: {formatDate(project.start_date)}
                                                                {project.end_date && (
                                                                    <>
                                                                        <br />
                                                                        Ends: {formatDate(project.end_date)}
                                                                        {daysRemaining > 0 && (
                                                                            <span className="font-medium">
                                                                                {' '}({daysRemaining} days left)
                                                                            </span>
                                                                        )}
                                                                    </>
                                                                )}
                                                            </>
                                                        ) : 'Dates to be announced'}
                                                    </span>
                                                </div>

                                                {project.location && (
                                                    <div className="flex items-center gap-3">
                                                        <MapPin className={clsx(
                                                            "w-4 h-4 flex-shrink-0",
                                                            darkMode ? "text-green-400" : "text-green-600"
                                                        )} />
                                                        <span className={clsx("text-sm", darkMode ? "text-gray-300" : "text-gray-600")}>
                                                            {project.location}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Progress bar for active projects */}
                                                {['pending', 'upcoming', 'ongoing'].includes(project.status) && (
                                                    <div className="mt-4">
                                                        <div className="flex justify-between text-sm mb-1">
                                                            <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
                                                                {project.status === 'pending' ? 'Interest' : 'Progress'}
                                                            </span>
                                                            <span className={darkMode ? "text-green-400" : "text-green-600"}>
                                                                {project.progress}%
                                                            </span>
                                                        </div>
                                                        <div className={clsx(
                                                            "w-full h-2 rounded-full overflow-hidden",
                                                            darkMode ? "bg-gray-700" : "bg-gray-200"
                                                        )}>
                                                            <div
                                                                className="h-full bg-green-800"
                                                                style={{ width: `${project.progress}%` }}
                                                                role="progressbar"
                                                                aria-valuenow={project.progress}
                                                                aria-valuemin="0"
                                                                aria-valuemax="100"
                                                            ></div>
                                                        </div>
                                                        {project.budget && (
                                                            <div className="flex justify-between text-xs mt-1">
                                                                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                                                    Raised: {formatCurrency(project.raised_amount)}
                                                                </span>
                                                                <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                                                    Goal: {formatCurrency(project.budget)}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <p className={clsx(
                                                "text-sm mb-6 line-clamp-3",
                                                darkMode ? "text-gray-400" : "text-gray-600"
                                            )}>
                                                {project.description || 'No description available'}
                                            </p>
                                        </div>

                                        <div className="px-6 pb-6 mt-auto">
                                            {renderActionButton(project)}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <div className={clsx(
                            "text-center py-12 md:py-16 rounded-lg border",
                            darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                        )}>
                            <p className="text-xl mb-4">No projects found with the selected filters</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button
                                    onClick={() => setFilters(Object.keys(STATUS_CONFIG))}
                                    className="px-4 py-2 rounded-lg font-medium bg-green-600 text-white"
                                >
                                    Show All Projects
                                </button>
                                <button
                                    onClick={() => setFilters([])}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg font-medium border",
                                        darkMode ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-700"
                                    )}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {/* CTA Section */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    className={clsx(
                        "rounded-2xl py-8 md:py-12 px-6 md:px-12 mt-12 md:mt-16 mb-8 md:mb-12 text-center",
                        "bg-gradient-to-r",
                        darkMode ? "from-green-900 to-green-800" : "from-green-800 to-green-700"
                    )}
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">Get Involved in Our Projects</h2>
                    <p className="text-base md:text-lg text-white mb-6 md:mb-8 max-w-2xl mx-auto">
                        Want to help organize or sponsor an upcoming alumni project?
                        We welcome your ideas and support!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/contact"
                            className="px-5 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all flex items-center gap-2 bg-white text-green-700 hover:bg-green-50"
                        >
                            <span>Contact Us</span>
                            <ChevronRight size={18} />
                        </a>
                        <a
                            href="/volunteer"
                            className="px-5 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all flex items-center gap-2 bg-transparent border-2 border-white text-white hover:text-green-800 hover:bg-white hover:bg-opacity-10"
                        >
                            <span>Volunteer</span>
                            <ChevronRight size={18} />
                        </a>
                    </div>
                </motion.section>
            </main>

            <footer className={clsx(
                "py-6 md:py-8 border-t",
                darkMode ? "bg-gray-900 border-gray-800 text-gray-400" : "bg-white border-gray-200 text-gray-600"
            )}>
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>© 2025 Alumni Association. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}