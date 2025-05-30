"use client";

import {
  Users, Link, GraduationCap, Briefcase, Building,
  BarChart, Target, Crosshair, Scale, HeartHandshake,
  Trophy, BookOpen, Globe, Award, HandHeart, Calendar
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";
import Image from "next/image";

export default function AboutSection() {
  const { darkMode } = useTheme();

  return (
    <section className={clsx(
      "w-full py-16 px-4 sm:px-6 lg:px-8",
      darkMode ? "bg-gray-800" : "bg-gray-50"
    )}>
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Executive Summary Section */}
        <div className="space-y-6 text-center">
          <h2 className={clsx(
            "text-4xl font-bold flex items-center justify-center gap-3",
            darkMode ? "text-green-400" : "text-green-800"
          )}>
            <Building size={36} />
            The Nazarene Alumni Association
          </h2>
          <div className={clsx(
            "inline-block px-6 py-2 rounded-full text-sm font-semibold mb-4",
            darkMode ? "bg-green-800 text-green-200" : "bg-green-100 text-green-800"
          )}>
            Est. 2008 • Shine Wherever You Are
          </div>
          <p className={clsx(
            "text-base leading-relaxed max-w-4xl mx-auto",
            darkMode ? "text-gray-300" : "text-gray-600"
          )}>
            The official alumni association of St. Joseph of Nazareth High School, Kavule Katende,
            uniting graduates from 2008 to the present. We are committed to fostering a vibrant community
            that emphasizes networking, career development, sportsmanship, and charitable outreach,
            while ensuring ongoing engagement among our members.
          </p>
        </div>

        {/* Image + Detailed About Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="rounded-lg shadow-xl overflow-hidden">
            <Image
              src="/images/about.JPG"
              alt="Nazarene Association members"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h3 className={clsx(
              "text-2xl font-semibold flex items-center gap-3",
              darkMode ? "text-green-400" : "text-green-800"
            )}>
              <Scale size={28} />
              Who We Do
            </h3>
            <p className={clsx(
              "text-base leading-relaxed",
              darkMode ? "text-gray-300" : "text-gray-600"
            )}>
              Important projects include setting up mentorship and career programs for current and former students, increasing job openings, and helping individuals in need.  The organization
              also sponsors yearly events such athletic competitions, alumni dinners, careers days, alumni days, and the general assembly in addition to its charity endeavors.  For Senior Four and Senior Six applicants, it also publishes an annual magazine and Alumni Year Books.
            </p>
            <p className={clsx(
              "text-base leading-relaxed",
              darkMode ? "text-gray-300" : "text-gray-600"
            )}>
              Starting in 2025, The Nazarene will introduce the Nazarene Sports
              League, an annual competitive platform aimed at enhancing
              alumni engagement. To sustain its activities and generate revenue,
              The Nazarene plans to secure sponsorships, charge event
              participation fees, sell advertising in its publications, and offer
              branded merchandise. Through these efforts, The Nazarene aims
              to provide significant value to its members while promoting
              community building, networking, and wellness initiatives.
            </p>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className={clsx(
            "p-8 rounded-xl space-y-4 border-l-4 border-green-500",
            darkMode ? "bg-gray-700" : "bg-white shadow-lg"
          )}>
            <div className="flex items-center gap-3">
              <div className={clsx(
                "p-3 rounded-lg",
                darkMode ? "bg-gray-600 text-green-400" : "bg-green-100 text-green-800"
              )}>
                <Crosshair size={24} />
              </div>
              <h3 className={clsx(
                "text-xl font-semibold",
                darkMode ? "text-white" : "text-gray-800"
              )}>
                Our Mission
              </h3>
            </div>
            <p className={clsx(
              "text-lg",
              darkMode ? "text-gray-300" : "text-gray-600"
            )}>
              To promote the best interests of the school and its alumni.
            </p>
          </div>

          {/* Vision Card */}
          <div className={clsx(
            "p-8 rounded-xl space-y-4 border-l-4 border-blue-500",
            darkMode ? "bg-gray-700" : "bg-white shadow-lg"
          )}>
            <div className="flex items-center gap-3">
              <div className={clsx(
                "p-3 rounded-lg",
                darkMode ? "bg-gray-600 text-green-400" : "bg-green-100 text-green-800"
              )}>
                <Target size={24} />
              </div>
              <h3 className={clsx(
                "text-xl font-semibold",
                darkMode ? "text-white" : "text-gray-800"
              )}>
                Our Vision
              </h3>
            </div>
            <p className={clsx(
              "text-sm",
              darkMode ? "text-gray-300" : "text-gray-600"
            )}>
              To develop and maintain relationship with Alumni and the school
              as a whole, support and encourage these groups in their
              endeavours and extend a hand of fellowship, through financial,
              material support and to communicate with and bring value to the
              alumni body and to support, actively and financially, the goals of
              the school.
            </p>
          </div>
        </div>

        {/* Key Programs & Services */}
        <div className="space-y-8">
          <h3 className={clsx(
            "text-3xl font-bold text-center flex items-center justify-center gap-3",
            darkMode ? "text-green-400" : "text-green-800"
          )}>
            <Trophy size={32} />
            Our Programs & Services
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Careers & Mentorship Program",
                desc: "Alumni share career experiences and offer mentorship to current students and young alumni"
              },
              {
                icon: Trophy,
                title: "Nazarene Sports League",
                desc: "Annual competitive platform enhancing alumni engagement through sports competitions"
              },
              {
                icon: Calendar,
                title: "The Nazarene Dinner",
                desc: "Exclusive celebration honoring winners and top performers from our Sports League"
              },
              {
                icon: Users,
                title: "General Assembly",
                desc: "Annual gathering where alumni discuss the future, review activities, and set new goals"
              },
              {
                icon: HandHeart,
                title: "Charitable Outreach",
                desc: "Community volunteer work and charitable projects supporting those in need"
              },
              {
                icon: BookOpen,
                title: "Publications",
                desc: "Annual magazine, yearbooks, and merchandise showcasing alumni achievements"
              }
            ].map((program, index) => (
              <div key={index} className={clsx(
                "p-6 rounded-xl space-y-3 transition-transform hover:scale-105",
                darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-white shadow-md hover:shadow-lg"
              )}>
                <div className={clsx(
                  "p-3 rounded-lg w-fit",
                  darkMode ? "bg-gray-600 text-green-400" : "bg-green-100 text-green-700"
                )}>
                  <program.icon size={24} />
                </div>
                <h4 className={clsx(
                  "text-lg font-semibold",
                  darkMode ? "text-white" : "text-gray-800"
                )}>
                  {program.title}
                </h4>
                <p className={clsx(
                  "text-sm",
                  darkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  {program.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Objectives + Image Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className={clsx(
              "text-2xl font-bold flex items-center gap-3",
              darkMode ? "text-green-400" : "text-green-800"
            )}>
              <HeartHandshake size={28} />
              Our Core Objectives
            </h3>

            <div className="grid gap-4">
              {[
                { icon: Users, text: "Foster unity and togetherness amongst members" },
                { icon: Link, text: "Provide linkage between association, school, and stakeholders" },
                { icon: GraduationCap, text: "Design social, economic, and cultural programs for wellbeing" },
                { icon: Briefcase, text: "Create training grounds for leadership and employment opportunities" },
                { icon: Scale, text: "Foster high moral standards through civic education" },
                { icon: Building, text: "Ensure proper career guidance to current students" },
                { icon: Award, text: "Advocate for member rights and marginalized groups" },
                { icon: Globe, text: "Maintain high academic standards through interactive sessions" }
              ].map((item, index) => (
                <div key={index} className={clsx(
                  "flex items-start gap-4 p-0 rounded-lg transition-colors",
                  darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                )}>
                  <div className={clsx(
                    "p-1 rounded-lg flex-shrink-0",
                    darkMode ? "bg-gray-700 text-green-400" : "bg-green-100 text-green-700"
                  )}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className={clsx(
                    "text-base flex-1",
                    darkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg shadow-xl overflow-hidden">
            <Image
              src="/images/initiatives.jpg"
              alt="Association initiatives in action"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Future Plans */}
        <div className={clsx(
          "p-8 rounded-xl space-y-6",
          darkMode ? "bg-gray-700" : "bg-white shadow-lg"
        )}>
          <h3 className={clsx(
            "text-2xl font-bold text-center flex items-center justify-center gap-3",
            darkMode ? "text-green-400" : "text-green-800"
          )}>
            <BarChart size={28} />
            Looking Forward
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className={clsx(
                "text-lg font-semibold",
                darkMode ? "text-white" : "text-gray-800"
              )}>
                Growth Initiatives
              </h4>
              <ul className="space-y-2">
                {[
                  "Expand Nazarene Sports League with more sports and family competitions",
                  "Develop annual Alumni Summit for professional development",
                  "Establish Nazarene Foundation for scholarships and sports programs",
                  "Acquire land for sports facilities and event hosting"
                ].map((item, index) => (
                  <li key={index} className={clsx(
                    "flex items-start gap-2",
                    darkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    <span className="text-green-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className={clsx(
                "text-lg font-semibold",
                darkMode ? "text-white" : "text-gray-800"
              )}>
                Sustainability Focus
              </h4>
              <ul className="space-y-2">
                {[
                  "Eco-friendly merchandise and packaging initiatives",
                  "Green event planning to minimize environmental impact",
                  "Diverse revenue streams for financial sustainability",
                  "Strong partnerships with corporate sponsors and media"
                ].map((item, index) => (
                  <li key={index} className={clsx(
                    "flex items-start gap-2",
                    darkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    <span className="text-green-500 mt-1">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}