"use client";
import { useEffect, useState } from "react";
import { Mail, Phone, Calendar } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";
import axios from "axios";
import API_ENDPOINT from "@/api_config";
import Image from "next/image";

export default function StaffSection() {
  const { darkMode } = useTheme();
  const [selectedMember, setSelectedMember] = useState(null);
  const [staffMembers, setStaffMembers] = useState([]);

  useEffect(() => {
    console.log("Fetching staff members...", staffMembers);
    const getStaffMembers = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/api/executive-team/`);
        if (response.status === 200) {
          setStaffMembers(response.data);
          console.log("Fetched staff members...", staffMembers);

        } else {
          console.error("Failed to fetch staff members");
          setStaffMembers([]);
        }
      } catch (error) {
        console.error("Error fetching staff members:", error);
        setStaffMembers([]);
      }
    };

    getStaffMembers();
  }, [staffMembers]);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={clsx(
      "min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300",
      darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={clsx(
            "text-3xl font-bold mb-4",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            The Executive
          </h2>
          <p className={clsx(
            "max-w-2xl mx-auto text-lg",
            darkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Meet our dedicated team members who work tirelessly to serve our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staffMembers.map((member, index) => (
            <div
              key={index}
              className={clsx(
                "rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1",
                darkMode ? "bg-gray-700" : "bg-white"
              )}
              onClick={() => setSelectedMember(member)}
            >
              <div className="flex items-center justify-center pt-6">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className={clsx(
                  "text-xl font-semibold mb-1",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  {member.name}
                </h3>
                <p className={clsx(
                  "text-sm font-medium mb-4",
                  darkMode ? "text-blue-300" : "text-blue-600"
                )}>
                  {member.position}
                </p>
                <div className={clsx(
                  "flex items-center justify-center mb-2",
                  darkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  <Mail size={16} className="mr-2" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className={clsx(
                  "flex items-center justify-center",
                  darkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  <Phone size={16} className="mr-2" />
                  <span className="text-sm">{member.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className={clsx(
            "w-full max-w-lg rounded-lg shadow-xl p-6 relative",
            darkMode ? "bg-gray-800" : "bg-white"
          )}>
            <button
              onClick={() => setSelectedMember(null)}
              className={clsx(
                "absolute top-4 right-4 p-1 rounded-full",
                darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                <Image
                  width={128}
                  height={128}
                  src={selectedMember.image_url}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className={clsx(
                  "text-2xl font-bold",
                  darkMode ? "text-white" : "text-gray-900"
                )}>
                  {selectedMember.name}
                </h3>
                <p className={clsx(
                  "text-lg font-medium mb-2",
                  darkMode ? "text-blue-300" : "text-blue-600"
                )}>
                  {selectedMember.position}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className={clsx(
                "flex items-center",
                darkMode ? "text-gray-300" : "text-gray-700"
              )}>
                <Mail className="w-5 h-5 mr-3" />
                <span>{selectedMember.email}</span>
              </div>
              <div className={clsx(
                "flex items-center",
                darkMode ? "text-gray-300" : "text-gray-700"
              )}>
                <Phone className="w-5 h-5 mr-3" />
                <span>{selectedMember.phone}</span>
              </div>
              <div className={clsx(
                "flex items-center",
                darkMode ? "text-gray-300" : "text-gray-700"
              )}>
                <Calendar className="w-5 h-5 mr-3" />
                <span>Term: {formatDate(selectedMember.term_start)} - {formatDate(selectedMember.term_end)}</span>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedMember(null)}
                className={clsx(
                  "px-4 py-2 rounded-md text-sm font-medium",
                  darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                )}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}