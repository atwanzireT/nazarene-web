import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Users,
  Briefcase,
  CalendarDays,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import axios from "axios";

const ContactUsPage = () => {
  const { darkMode } = useTheme();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general"
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  // Update the handleInputChange function with proper event typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState(prev => ({
          ...prev,
          [name]: value
      }));
  };

  const handleSubmit = async () => {
    // Form validation
    if (!formState.name || !formState.email || !formState.message) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    try {
      // await new Promise(resolve => setTimeout(resolve, 1500));
      await axios.post("http://127.0.0.1:8000/api/contact-messages/", formState, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log("Form submitted:", formState);
      setSubmitStatus("success");
      // Reset form
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general"
      });
    } catch{
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      description: "Our team typically responds within 24 hours",
      contact: "thenazarene.alumni@gmail.com",
      action: "Send email",
      link: "mailto:thenazarene.alumni@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      description: "Available Monday to Friday, 9am - 5pm",
      contact: "+256 700 839729, +256 784 464980",
      action: "Call now",
      link: "tel:+256 784 464980"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      description: "The Nazarene Alumni Office",
      contact: "Kavule Katende, uganda",
      action: "Get directions",
      link: "https://maps.app.goo.gl/x3Ep7AADMjbE3kPn7"
    }
  ];

  const socialMedia = [
    { name: "Facebook", icon: <Facebook size={20} /> },
    { name: "Twitter", icon: <Twitter size={20} /> },
    { name: "Instagram", icon: <Instagram size={20} /> },
    { name: "LinkedIn", icon: <Linkedin size={20} /> }
  ];

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "alumni", label: "Alumni Support" },
    { value: "events", label: "Events & Programming" },
    { value: "donations", label: "Donations & Giving" },
    { value: "careers", label: "Career Services" }
  ];


  return (
    <div className={clsx(
      "min-h-screen grid grid-rows-[auto_1fr_auto] font-sans",
      darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
    )}>
      <Header />

      <main className="w-full">
        {/* Hero Section */}
        <section
          className={clsx(
            "w-full py-24 md:py-32 bg-cover bg-center relative overflow-hidden",
            darkMode ? "bg-gray-800" : ""
          )}
          style={{ backgroundImage: "url('/images/hero1.JPG')" }}
        >
          {/* Gradient overlay for better text readability */}
          <div className={clsx(
            "absolute inset-0 z-0",
            darkMode
              ? "bg-gradient-to-r from-gray-900/80 to-gray-800/70"
              : "bg-gradient-to-r from-green-900/70 to-green-700/60"
          )}></div>

          {/* Subtle pattern overlay for added texture */}
          <div className="absolute inset-0 z-0 opacity-5 bg-[radial-gradient(circle,_rgba(255,255,255,0.8)_1px,_transparent_1px)] bg-[length:20px_20px]"></div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white">
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-8">
                We&rsquo;re here to answer your questions and help you connect with
                our alumni community. Reach out to us through any of the channels below.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#contact-form"
                  className={clsx(
                    "px-6 py-3 rounded-full font-medium text-white transition-all",
                    darkMode
                      ? "bg-green-600 hover:bg-green-500"
                      : "bg-green-600 hover:bg-green-700"
                  )}
                >
                  Send a Message
                </a>
                <a
                  href="#faq"
                  className={clsx(
                    "px-6 py-3 rounded-full font-medium transition-all",
                    darkMode
                      ? "bg-white/10 hover:bg-white/20 text-white"
                      : "bg-white/30 hover:bg-white/40 text-white"
                  )}
                >
                  View FAQs
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Methods Section */}
        <section className="max-w-7xl mx-auto px-4 py-16 -mt-16 relative z-20 mt-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className={clsx(
                  "rounded-xl p-8 flex flex-col items-center text-center transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1",
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-750 border border-gray-700"
                    : "bg-white hover:bg-gray-50"
                )}
              >
                <div className={clsx(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-5",
                  darkMode ? "bg-green-900/50 text-green-400" : "bg-green-100 text-green-600"
                )}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{method.title}</h3>
                <p className={clsx(
                  "text-sm mb-4",
                  darkMode ? "text-gray-400" : "text-gray-500"
                )}>
                  {method.description}
                </p>
                <p className="font-medium mb-5 text-lg">{method.contact}</p>
                <Link
                  href={method.link}
                  className={clsx(
                    "flex items-center text-sm font-medium px-4 py-2 rounded-full transition-all",
                    darkMode
                      ? "bg-green-900/30 hover:bg-green-900/50 text-green-400"
                      : "bg-green-100 hover:bg-green-200 text-green-700"
                  )}
                >
                  {method.action}
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Contact Form and Map Section */}
        <section id="contact-form" className={clsx(
          "py-16 md:py-24",
          darkMode ? "bg-gray-800/50" : "bg-white"
        )}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="lg:col-span-7"
              >
                <div className={clsx(
                  "rounded-2xl p-8 md:p-10 shadow-lg",
                  darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                )}>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Send Us a Message</h2>
                  <p className={clsx(
                    "mb-8",
                    darkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    Fill out the form below and we&rsquo;ll get back to you as soon as possible.
                  </p>

                  {/* Success Message */}
                  {submitStatus === "success" && (
                    <div className={clsx(
                      "mb-6 p-4 rounded-lg flex items-start",
                      darkMode ? "bg-green-900/30 text-green-300" : "bg-green-50 text-green-700"
                    )}>
                      <CheckCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Message sent successfully!</p>
                        <p className={clsx(
                          "text-sm mt-1",
                          darkMode ? "text-green-400" : "text-green-600"
                        )}>
                          We&rsquo;ll respond to your inquiry as soon as possible.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === "error" && (
                    <div className={clsx(
                      "mb-6 p-4 rounded-lg flex items-start",
                      darkMode ? "bg-red-900/30 text-red-300" : "bg-red-50 text-red-700"
                    )}>
                      <AlertCircle size={20} className="mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Error sending message</p>
                        <p className={clsx(
                          "text-sm mt-1",
                          darkMode ? "text-red-400" : "text-red-600"
                        )}>
                          Please fill out all required fields and try again.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-5">
                    {/* Name and Email - Side by side on larger screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleInputChange}
                          className={clsx(
                            "w-full p-3 rounded-lg border transition-all",
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                              : "bg-white border-gray-300 text-gray-900 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          )}
                          placeholder="John Doe"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formState.email}
                          onChange={handleInputChange}
                          className={clsx(
                            "w-full p-3 rounded-lg border transition-all",
                            darkMode
                              ? "bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                              : "bg-white border-gray-300 text-gray-900 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                          )}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    {/* Category dropdown */}
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-2">
                        Inquiry Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formState.category}
                        onChange={handleInputChange}
                        className={clsx(
                          "w-full p-3 rounded-lg border transition-all appearance-none",
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            : "bg-white border-gray-300 text-gray-900 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        )}
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formState.subject}
                        onChange={handleInputChange}
                        className={clsx(
                          "w-full p-3 rounded-lg border transition-all",
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            : "bg-white border-gray-300 text-gray-900 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        )}
                        placeholder="How can we help you?"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formState.message}
                        onChange={handleInputChange}
                        className={clsx(
                          "w-full p-3 rounded-lg border transition-all",
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                            : "bg-white border-gray-300 text-gray-900 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                        )}
                        placeholder="Please describe how we can help you..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className={clsx(
                        "w-full py-3 px-6 rounded-lg font-medium flex justify-center items-center transition-all",
                        isSubmitting ? "opacity-80 cursor-not-allowed" : "",
                        darkMode
                          ? "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20"
                          : "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
                      )}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Send Message <Send className="ml-2" size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Map and Office Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="lg:col-span-5"
              >
                <div className={clsx(
                  "rounded-2xl overflow-hidden shadow-lg",
                  darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                )}>
                  {/* Map (placeholder) */}
                  <div className="h-72 bg-gray-300 relative">
                    <div className={clsx(
                      "absolute inset-0 flex items-center justify-center",
                      darkMode ? "bg-green-900/5" : "bg-green-600/5"
                    )}>
                      <div className="text-center p-4">
                        <MapPin size={38} className={clsx(
                          darkMode ? "text-green-400" : "text-green-700"
                        )} />
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7804972039025!2d32.38115327410756!3d0.24948256412616462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc70a4b1e4db%3A0xa8fa052241bf169b!2sSt.%20Joseph%20of%20Nazareth%20High%20School!5e0!3m2!1sen!2sug!4v1747559243513!5m2!1sen!2sug"
                          width="600"
                          height="450"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>

                    </div>
                  </div>

                  {/* Office Info */}
                  <div style={{ marginTop: 100 }} className="p-6 md:p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                      <Briefcase size={20} className={clsx(
                        "mr-2",
                        darkMode ? "text-green-400" : "text-green-600"
                      )} />
                      The Nazarene Alumni Office
                    </h3>

                    <div className="space-y-5">
                      <div className="flex">
                        <MapPin size={20} className={clsx(
                          "mr-3 mt-1 flex-shrink-0",
                          darkMode ? "text-green-400" : "text-green-600"
                        )} />
                        <div>
                          <p className="font-medium mb-1">Location</p>
                          <p className={clsx(
                            darkMode ? "text-gray-300" : "text-gray-600"
                          )}>
                            Kavule Katende, uganda<br />
                            32 Km, Kampala<br />
                            Mpigi Highway
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <Clock size={20} className={clsx(
                          "mr-3 mt-1 flex-shrink-0",
                          darkMode ? "text-green-400" : "text-green-600"
                        )} />
                        <div>
                          <p className="font-medium mb-1">Office Hours</p>
                          <p className={clsx(
                            darkMode ? "text-gray-300" : "text-gray-600"
                          )}>
                            Monday - Friday: 9:00 AM - 5:00 PM<br />
                            Saturday - Sunday: Closed
                          </p>
                        </div>
                      </div>

                      <div className="flex">
                        <Mail size={20} className={clsx(
                          "mr-3 mt-1 flex-shrink-0",
                          darkMode ? "text-green-400" : "text-green-600"
                        )} />
                        <div>
                          <p className="font-medium mb-1">Email</p>
                          <a
                            href="mailto:thenazarene.alumni@gmail.com"
                            className={clsx(
                              "transition-colors",
                              darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"
                            )}
                          >
                            thenazarene.alumni@gmail.com
                          </a>
                        </div>
                      </div>

                      <div className="flex">
                        <Phone size={20} className={clsx(
                          "mr-3 mt-1 flex-shrink-0",
                          darkMode ? "text-green-400" : "text-green-600"
                        )} />
                        <div>
                          <p className="font-medium mb-1">Phone</p>
                          <a
                            href="+256 700 839729"
                            className={clsx(
                              "transition-colors",
                              darkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"
                            )}
                          >
                            +256 700 839729, +256 784 464980
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="mt-8 p-6 md:p-8 rounded-2xl shadow-lg bg-opacity-50 backdrop-blur-sm" style={{
                  background: darkMode ? "linear-gradient(to right, rgba(20, 83, 45, 0.3), rgba(22, 101, 52, 0.2))" : "linear-gradient(to right, rgba(220, 252, 231, 0.7), rgba(187, 247, 208, 0.5))"
                }}>
                  <h3 className="text-xl font-bold mb-5 flex items-center">
                    <Users size={20} className={clsx(
                      "mr-2",
                      darkMode ? "text-green-400" : "text-green-600"
                    )} />
                    Connect With Us
                  </h3>
                  <div className="flex space-x-3">
                    {socialMedia.map((social) => (
                      <a
                        key={social.name}
                        href="#"
                        className={clsx(
                          "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                          darkMode
                            ? "bg-gray-800/80 hover:bg-gray-700 text-green-400 hover:text-green-300"
                            : "bg-white/80 hover:bg-white text-green-600 hover:text-green-700 shadow-sm"
                        )}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                  <p className={clsx(
                    "mt-4 text-sm",
                    darkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    Follow us to stay updated with alumni events and opportunities
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="faq" className={clsx(
          "py-16 md:py-24",
          darkMode ? "bg-gray-900" : "bg-gray-50"
        )}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className={clsx(
                  "max-w-2xl mx-auto",
                  darkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Find quick answers to common questions about contacting our alumni office.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: <Clock size={20} />,
                  q: "How quickly will I receive a response?",
                  a: "We aim to respond to all inquiries within 1-2 business days. For urgent matters, please call our office directly."
                },
                {
                  icon: <CalendarDays size={20} />,
                  q: "Can I schedule a meeting with alumni staff?",
                  a: "Yes, you can request an appointment through our contact form or by calling our office. Virtual meetings are also available."
                },
                {
                  icon: <Users size={20} />,
                  q: "How do I update my contact information?",
                  a: "Alumni can update their information by logging into the alumni portal or by contacting our office directly via email or phone."
                },
                {
                  icon: <MessageSquare size={20} />,
                  q: "How can I volunteer with the alumni association?",
                  a: "We have many volunteer opportunities available. Please use the contact form and select 'Alumni Support' to inquire about current openings."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                  className={clsx(
                    "p-6 md:p-8 rounded-xl shadow-lg transition-all hover:shadow-xl",
                    darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-100"
                  )}
                >
                  <div className="flex items-start">
                    <div className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0",
                      darkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"
                    )}>
                      {faq.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-3">{faq.q}</h3>
                      <p className={clsx(
                        darkMode ? "text-gray-300" : "text-gray-600"
                      )}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Help Link */}
            <div className="mt-12 text-center">
              <p className={clsx(
                "mb-4",
                darkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Can&rsquo;t find what you&rsquo;re looking for?
              </p>
              <a
                href="#contact-form"
                className={clsx(
                  "inline-flex items-center px-6 py-3 rounded-full font-medium transition-all",
                  darkMode
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                )}
              >
                Ask Your Question <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={clsx(
        "py-8 border-t",
        darkMode ? "bg-gray-900 border-gray-800 text-gray-400" : "bg-gray-50 border-gray-200 text-gray-600"
      )}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>© 2025 Alumni Association. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ContactUsPage;