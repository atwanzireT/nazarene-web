"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Users, User, GalleryThumbnails, ChevronRight, Filter, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";
import Image from "next/image";
import Header from "@/components/header";
import { motion } from "framer-motion";
import axios from "axios";
import API_ENDPOINT from "@/api_config";
import React from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

// Event status options
const STATUS_CHOICES = [
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'postponed', label: 'Postponed' },
    { value: 'archived', label: 'Archived' },
];

// Type definitions
interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    status: string;
    attendeesExpected: number;
    attendeesCurrent: number;
    registerLink: string;
    bannerImage: string;
    galleryImages: string[];
}

// API Event Response Type
interface ApiEventResponse {
    id: number;
    title: string;
    description?: string;
    event_date: string;
    location?: string;
    organizer?: string;
    status?: string;
    slots?: number;
    attendees_count?: number;
    cover_image?: string;
    gallery_images?: string[];
}

// Error Response Type
interface ApiErrorResponse {
    detail?: string;
    non_field_errors?: string[];
}

// Animation variants
const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const stagger = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function EventsPage() {
    const { darkMode } = useTheme();
    const [filters, setFilters] = useState<string[]>(['upcoming', 'ongoing']);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Format date helper function
    const formatDate = (dateString: string | null | undefined): string => {
        if (!dateString) return "Date not set";
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    // Format time helper function
    const formatTime = (dateString: string | null | undefined): string => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Fetch events from API with proper error handling and token authentication
    useEffect(() => {
        const fetchEvents = async () => {
            const token = Cookies.get('access_token');

            if (!token) {
                router.push('/login');
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                const response = await axios.get<ApiEventResponse[]>(`${API_ENDPOINT}/api/events/`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.status !== 200) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const formattedEvents: Event[] = response.data.map((event: ApiEventResponse) => ({
                    id: event.id,
                    title: event.title,
                    description: event.description || 'No description available',
                    date: event.event_date,
                    time: formatTime(event.event_date),
                    location: event.location || 'Location to be announced',
                    organizer: event.organizer || 'Alumni Association',
                    status: event.status || 'upcoming',
                    attendeesExpected: event.slots || 0,
                    attendeesCurrent: event.attendees_count || 0,
                    registerLink: `/events/${event.id}/register`,
                    bannerImage: event.cover_image || '/images/event-default.jpg',
                    galleryImages: event.gallery_images || []
                }));

                setAllEvents(formattedEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
                setError("Failed to load events. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, [router]);

    // Update filtered events whenever filters or allEvents change
    useEffect(() => {
        if (allEvents.length > 0) {
            const filtered = allEvents.filter(event => filters.includes(event.status));
            setFilteredEvents(filtered);
        }
    }, [filters, allEvents]);

    // Toggle filter selection
    const toggleFilter = (status: string): void => {
        if (filters.includes(status)) {
            setFilters(filters.filter(f => f !== status));
        } else {
            setFilters([...filters, status]);
        }
    };

    // Clear all filters
    const clearFilters = (): void => {
        setFilters([]);
    };

    // Show all filters
    const showAllFilters = (): void => {
        setFilters(STATUS_CHOICES.map(choice => choice.value));
    };

    // Get label for status
    const getStatusLabel = (status: string): string => {
        const statusObj = STATUS_CHOICES.find(s => s.value === status);
        return statusObj ? statusObj.label : status;
    };

    // Get color for status badge
    const getStatusColor = (status: string): string => {
        switch (status) {
            case 'upcoming':
                return darkMode ? "bg-blue-600" : "bg-blue-500";
            case 'ongoing':
                return darkMode ? "bg-green-600" : "bg-green-500";
            case 'completed':
                return darkMode ? "bg-gray-600" : "bg-gray-500";
            case 'cancelled':
                return darkMode ? "bg-red-600" : "bg-red-500";
            case 'postponed':
                return darkMode ? "bg-amber-600" : "bg-amber-500";
            case 'archived':
                return darkMode ? "bg-purple-600" : "bg-purple-500";
            default:
                return darkMode ? "bg-gray-600" : "bg-gray-500";
        }
    };

    const registerForEvent = async (eventId: number): Promise<void> => {
        try {
            await axios.post(`${API_ENDPOINT}/api/registrations/`, {
                event: eventId,
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('access_token')}`,
                },
            });

            alert("Successfully registered for the event!");
        } catch (error) {
            // Type guard to check if error is an axios error with response
            if (axios.isAxiosError(error) && error.response) {
                // If not authenticated, redirect to login
                if (error.response.status === 401 || error.response.status === 403) {
                    window.location.href = "/login?next=" + encodeURIComponent(window.location.pathname);
                    return;
                }

                const errorData = error.response.data as ApiErrorResponse;
                const message =
                    errorData?.detail ||
                    errorData?.non_field_errors?.[0] ||
                    "Registration failed. Please try to login in and try again.";
                alert(message);
            } else {
                alert("Registration failed. Please try to login in and try again.");
            }
        }
    };

    // Get action button based on event status
    const getActionButton = (event: Event): React.ReactElement | null => {
        switch (event.status) {
            case 'upcoming':
            case 'ongoing':
                return (
                    <button
                        onClick={() => registerForEvent(event.id)}
                        className={clsx(
                            "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors",
                            darkMode
                                ? "bg-green-600 hover:bg-green-700 text-white"
                                : "bg-green-600 hover:bg-green-700 text-white"
                        )}
                    >
                        <Users className="w-4 h-4" />
                        Register Now
                    </button>

                );
            case 'completed':
            case 'archived':
                return (
                    <button className={clsx(
                        "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium transition-colors",
                        darkMode
                            ? "bg-gray-700 hover:bg-gray-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    )}>
                        <GalleryThumbnails className="w-4 h-4" />
                        View Gallery ({event.galleryImages.length})
                    </button>
                );
            case 'cancelled':
                return (
                    <div className={clsx(
                        "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium",
                        darkMode ? "bg-gray-800 text-red-400" : "bg-gray-100 text-red-600"
                    )}>
                        <X className="w-4 h-4" />
                        Event Cancelled
                    </div>
                );
            case 'postponed':
                return (
                    <div className={clsx(
                        "w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-medium",
                        darkMode ? "bg-gray-800 text-amber-400" : "bg-gray-100 text-amber-600"
                    )}>
                        <Clock className="w-4 h-4" />
                        Postponed - Stay Tuned
                    </div>
                );
            default:
                return null;
        }
    };


    // Loading state component
    if (isLoading) {
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
                            Loading events...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state component
    if (error) {
        return (
            <div className={clsx(
                "min-h-screen flex flex-col",
                darkMode ? "bg-gray-900" : "bg-gray-50"
            )}>
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className={clsx(
                        "max-w-md p-6 rounded-lg text-center",
                        darkMode ? "bg-gray-800" : "bg-white shadow"
                    )}>
                        <div className="text-red-500 mb-4">
                            <X size={48} className="mx-auto" />
                        </div>
                        <h3 className={clsx(
                            "text-xl font-bold mb-2",
                            darkMode ? "text-white" : "text-gray-800"
                        )}>
                            Error Loading Events
                        </h3>
                        <p className={clsx(
                            "mb-4",
                            darkMode ? "text-gray-300" : "text-gray-600"
                        )}>
                            {error}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className={clsx(
                                "px-4 py-2 rounded-lg font-medium",
                                darkMode ? "bg-green-600 text-white" : "bg-green-600 text-white"
                            )}
                        >
                            Try Again
                        </button>
                    </div>
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
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative mb-16 rounded-2xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-black/40 flex items-center justify-center z-10">
                        <div className="text-center p-8 md:p-16 max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
                                Alumni Events
                            </h1>
                            <p className="text-lg md:text-xl font-medium text-white mb-8 drop-shadow">
                                Connect, engage, and give back through our diverse range of alumni activities
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <button
                                    onClick={() => {
                                        setFilters(['upcoming', 'ongoing']);
                                        document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={clsx(
                                        "px-6 py-3 rounded-lg font-semibold transition-all",
                                        "bg-white text-green-700 hover:bg-green-50"
                                    )}
                                >
                                    Current & Upcoming Events
                                </button>
                                <button
                                    onClick={() => {
                                        setFilters(['completed', 'archived']);
                                        document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={clsx(
                                        "px-6 py-3 rounded-lg font-semibold transition-all",
                                        "bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10"
                                    )}
                                >
                                    Past Events
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="h-64 md:h-96 w-full relative">
                        <Image
                            src="/hero1.JPG"
                            alt="Alumni events banner"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                </motion.div>

                {/* Filter Section */}
                <section className="mb-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5 }}
                        variants={fadeIn}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
                    >
                        <div className="flex items-center">
                            <h2 className={clsx(
                                "text-3xl font-bold flex items-center gap-3",
                                darkMode ? "text-green-400" : "text-green-700"
                            )}>
                                <Calendar size={32} className="text-green-500" />
                                Events
                            </h2>

                            <span className={clsx(
                                "ml-4 px-3 py-1 rounded-full text-sm",
                                darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
                            )}>
                                {filteredEvents.length} found
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
                            >
                                <Filter size={18} />
                                <span>Filter Events</span>
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
                                <div className={clsx(
                                    "absolute right-0 top-full mt-2 p-4 rounded-lg shadow-lg z-20 w-64",
                                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200"
                                )}>
                                    <div className="mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
                                        <h3 className="font-medium mb-2">Event Status</h3>
                                        <div className="space-y-2">
                                            {STATUS_CHOICES.map((status) => (
                                                <div key={status.value} className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        id={`status-${status.value}`}
                                                        checked={filters.includes(status.value)}
                                                        onChange={() => toggleFilter(status.value)}
                                                        className="mr-2 rounded"
                                                    />
                                                    <label htmlFor={`status-${status.value}`} className="text-sm">
                                                        {status.label}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <button
                                            onClick={clearFilters}
                                            className={clsx(
                                                "text-xs px-2 py-1 rounded",
                                                darkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                                            )}
                                        >
                                            Clear All
                                        </button>
                                        <button
                                            onClick={showAllFilters}
                                            className={clsx(
                                                "text-xs px-2 py-1 rounded",
                                                darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"
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
                            className="flex flex-wrap gap-2 mb-6"
                        >
                            {filters.map(filter => (
                                <span
                                    key={filter}
                                    className={clsx(
                                        "flex items-center gap-1 px-3 py-1 rounded-full text-xs",
                                        darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                                    )}
                                >
                                    {getStatusLabel(filter)}
                                    <button
                                        onClick={() => toggleFilter(filter)}
                                        className="ml-1 p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                    >
                                        <X size={12} />
                                    </button>
                                </span>
                            ))}
                            <button
                                onClick={clearFilters}
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

                {/* Events Section */}
                <section id="events-section" className="mb-16 scroll-mt-24">
                    {filteredEvents.length > 0 ? (
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={stagger}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredEvents.map((event) => (
                                <motion.div
                                    key={event.id}
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
                                            getStatusColor(event.status)
                                        )}>
                                            {getStatusLabel(event.status)}
                                        </div>
                                        <Image
                                            src={event.bannerImage}
                                            alt={event.title}
                                            fill
                                            className="object-cover"
                                            priority={event.status === 'ongoing'}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                                    </div>

                                    <div className="p-6 flex-1">
                                        <h3 className={clsx(
                                            "text-xl font-bold mb-3",
                                            darkMode ? "text-white" : "text-gray-800"
                                        )}>
                                            {event.title}
                                        </h3>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center gap-3">
                                                <Clock className={clsx(
                                                    "w-4 h-4 flex-shrink-0",
                                                    darkMode ? "text-green-400" : "text-green-600"
                                                )} />
                                                <span className={clsx("text-sm", darkMode ? "text-gray-300" : "text-gray-600")}>
                                                    {formatDate(event.date)} • {event.time}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <MapPin className={clsx(
                                                    "w-4 h-4 flex-shrink-0",
                                                    darkMode ? "text-green-400" : "text-green-600"
                                                )} />
                                                <span className={clsx("text-sm", darkMode ? "text-gray-300" : "text-gray-600")}>
                                                    {event.location}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <User className={clsx(
                                                    "w-4 h-4 flex-shrink-0",
                                                    darkMode ? "text-green-400" : "text-green-600"
                                                )} />
                                                <span className={clsx("text-sm", darkMode ? "text-gray-300" : "text-gray-600")}>
                                                    Organized by: {event.organizer}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Users className={clsx(
                                                    "w-4 h-4 flex-shrink-0",
                                                    darkMode ? "text-green-400" : "text-green-600"
                                                )} />
                                                <span className={clsx("text-sm", darkMode ? "text-gray-300" : "text-gray-600")}>
                                                    {event.status === 'completed'
                                                        ? `${event.attendeesCurrent} attended`
                                                        : `${event.attendeesCurrent} of ${event.attendeesExpected} registered`}
                                                </span>
                                            </div>
                                        </div>

                                        <p className={clsx(
                                            "text-sm mb-6 line-clamp-3",
                                            darkMode ? "text-gray-400" : "text-gray-600"
                                        )}>
                                            {event.description}
                                        </p>
                                    </div>

                                    <div className="px-6 pb-6 mt-auto">
                                        {getActionButton(event)}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className={clsx(
                            "text-center py-16 rounded-lg border",
                            darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                        )}>
                            <p className="text-xl mb-4">No events found with the selected filters</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={showAllFilters}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg font-medium",
                                        darkMode ? "bg-green-600 text-white" : "bg-green-600 text-white"
                                    )}
                                >
                                    Show All Events
                                </button>
                                <button
                                    onClick={clearFilters}
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
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeIn}
                    className={clsx(
                        "rounded-2xl py-12 px-8 md:px-12 mt-16 mb-12 text-center",
                        "bg-gradient-to-r",
                        darkMode ? "from-green-900 to-green-800" : "from-green-600 to-green-500"
                    )}
                >
                    <h2 className="text-3xl font-bold mb-6 text-white">Get Involved in Our Events</h2>
                    <p className="text-lg text-white mb-8 max-w-2xl mx-auto">
                        Want to help organize or sponsor an upcoming alumni event?
                        We welcome your ideas and support!
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="/contact"
                            className={clsx(
                                "px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2",
                                "bg-white text-green-700 hover:bg-green-50"
                            )}
                        >
                            <span>Contact Us</span>
                            <ChevronRight size={18} />
                        </a>
                        <a
                            href="/volunteer"
                            className={clsx(
                                "px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2",
                                "bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10"
                            )}
                        >
                            <span>Volunteer</span>
                            <ChevronRight size={18} />
                        </a>
                    </div>
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