"use client";

import {
  Users, Link, GraduationCap, Briefcase, Building,
  BarChart, Target, Crosshair, Scale, HeartHandshake
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
        {/* Our Story Section */}
        <div className="space-y-6 text-center">
          <h2 className={clsx(
            "text-3xl font-bold flex items-center justify-center gap-3",
            darkMode ? "text-green-400" : "text-green-800"
          )}>
            <Building size={32} />
            Our Story
          </h2>
          <p className={clsx(
            "text-lg leading-relaxed max-w-3xl mx-auto",
            darkMode ? "text-gray-300" : "text-gray-600"
          )}>
            We strive to reconnect family members who once lived together under the care of St. Joseph of Nazareth.
            Our mission is to strengthen the bonds among our brothers and sisters by offering career guidance
            and supporting them in achieving their goals, helping them stay on the right path.
          </p>
        </div>

        {/* Image + About Association Section */}
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
              About The Nazarene Association
            </h3>
            <p className={clsx(
              "text-lg leading-relaxed",
              darkMode ? "text-gray-300" : "text-gray-600"
            )}>
              The Nazarene is the official alumni association of St. Joseph of
              Nazareth High School, Kavule Katende, uniting graduates from
              2008 to the present. Committed to fostering a vibrant community,
              The Nazarene emphasizes networking, career development,
              sportsmanship, and charitable outreach, while ensuring ongoing
              engagement among its members.
              Key initiatives include organizing career and mentorship programs
              for both alumni and current students, extending employment
              opportunities, and supporting members in need. The association
              also engages in charitable activities and hosts annual events such
              as sports competitions, alumni dinner, careers day, alumni day
              and the general assembly. Additionally, it publishes a yearly
              magazine and Alumni Year Books for Senior Four and Senior Six
              candidates.
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
            "p-8 rounded-xl space-y-4",
            darkMode ? "bg-gray-700" : "bg-white shadow-md"
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
            "p-8 rounded-xl space-y-4",
            darkMode ? "bg-gray-700" : "bg-white shadow-md"
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
              "text-lg",
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

        {/* Key Initiatives + Image Section */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h3 className={clsx(
              "text-2xl font-bold flex items-center gap-3",
              darkMode ? "text-green-800" : "text-green-800"
            )}>
              <HeartHandshake size={28} />
              Key Initiatives & Objectives
            </h3>

            <ul className="grid grid-cols-1 gap-6">
              {[
                { icon: Users, text: "Organize career mentorship programs for alumni and students" },
                { icon: Link, text: "Extend employment opportunities through our network" },
                { icon: GraduationCap, text: "Support members in need through charitable activities" },
                { icon: BarChart, text: "Host annual events: sports, alumni dinner, careers day" },
                { icon: Briefcase, text: "Maintain academic excellence through alumni-student sessions" },
                { icon: Building, text: "Facilitate leadership training and scholarship programs" },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className={clsx(
                    "p-2 rounded-lg flex-shrink-0",
                    darkMode ? "bg-gray-700 text-green-400" : "bg-green-100 text-green-700"
                  )}>
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className={clsx(
                    "text-lg flex-1",
                    darkMode ? "text-gray-300" : "text-gray-600"
                  )}>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg shadow-xl overflow-hidden flex justify-center items-center">
            <Image
              src="/images/initiatives.jpg"
              alt="Association initiatives in action"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}