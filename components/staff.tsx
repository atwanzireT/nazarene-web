"use client";
import { useEffect, useState } from "react";
import { Mail, Phone, Calendar, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import clsx from "clsx";
import axios, { AxiosResponse } from "axios";
import API_ENDPOINT from "@/api_config";
import Image from "next/image";

// TypeScript interfaces
interface StaffMember {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  image_url: string;
  term_start: string;
  term_end: string;
}

const StaffSection: React.FC = () => {
  const { darkMode } = useTheme();
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStaffMembers = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        
        const response: AxiosResponse<StaffMember[]> = await axios.get(
          `${API_ENDPOINT}/api/executive-team/`
        );
        
        if (response.status === 200) {
          setStaffMembers(response.data);
        } else {
          throw new Error("Failed to fetch staff members");
        }
      } catch (err) {
        console.error("Error fetching staff members:", err);
        setError("Failed to load staff members. Please try again later.");
        setStaffMembers([]);
      } finally {
        setLoading(false);
      }
    };

    getStaffMembers();
  }, []); // Removed staffMembers dependency to prevent infinite loop

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleMemberClick = (member: StaffMember): void => {
    setSelectedMember(member);
  };

  const handleCloseModal = (): void => {
    setSelectedMember(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  if (loading) {
    return (
      <div className={clsx(
        "min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center",
        darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"
      )}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg">Loading staff members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={clsx(
        "min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center",
        darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"
      )}>
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(
      "min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300",
      darkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-gray-900"
    )}>
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h2 className={clsx(
            "text-3xl font-bold mb-4",
            darkMode ? "text-white" : "text-gray-900"
          )}>
            The Executive Team
          </h2>
          <p className={clsx(
            "max-w-2xl mx-auto text-lg",
            darkMode ? "text-gray-300" : "text-gray-600"
          )}>
            Meet our dedicated team members who work tirelessly to serve our community.
          </p>
        </header>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {staffMembers.map((member) => (
            <StaffCard
              key={member.id}
              member={member}
              darkMode={darkMode}
              onClick={() => handleMemberClick(member)}
            />
          ))}
        </div>

        {/* Empty State */}
        {staffMembers.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className={clsx(
              "text-lg",
              darkMode ? "text-gray-300" : "text-gray-600"
            )}>
              No staff members found.
            </p>
          </div>
        )}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
        <StaffModal
          member={selectedMember}
          darkMode={darkMode}
          onClose={handleCloseModal}
          onKeyDown={handleKeyDown}
          formatDate={formatDate}
        />
      )}
    </div>
  );
};

// Staff Card Component
interface StaffCardProps {
  member: StaffMember;
  darkMode: boolean;
  onClick: () => void;
}

const StaffCard: React.FC<StaffCardProps> = ({ member, darkMode, onClick }) => (
  <article
    className={clsx(
      "rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500",
      darkMode ? "bg-gray-700" : "bg-white"
    )}
    onClick={onClick}
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    tabIndex={0}
    role="button"
    aria-label={`View details for ${member.name}`}
  >
    <div className="flex items-center justify-center pt-6">
      <div className="w-32 h-32 rounded-full overflow-hidden">
        <Image
          src={member.image_url}
          alt={`Profile photo of ${member.name}`}
          width={128}
          height={128}
          className="w-full h-full object-cover"
          priority={false}
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
      
      <div className="space-y-2">
        <div className={clsx(
          "flex items-center justify-center text-sm",
          darkMode ? "text-gray-300" : "text-gray-600"
        )}>
          <Mail size={16} className="mr-2 flex-shrink-0" aria-hidden="true" />
          <span className="truncate">{member.email}</span>
        </div>
        
        <div className={clsx(
          "flex items-center justify-center text-sm",
          darkMode ? "text-gray-300" : "text-gray-600"
        )}>
          <Phone size={16} className="mr-2 flex-shrink-0" aria-hidden="true" />
          <span>{member.phone}</span>
        </div>
      </div>
    </div>
  </article>
);

// Staff Modal Component
interface StaffModalProps {
  member: StaffMember;
  darkMode: boolean;
  onClose: () => void;
  onKeyDown: (event: React.KeyboardEvent) => void;
  formatDate: (dateString: string) => string;
}

const StaffModal: React.FC<StaffModalProps> = ({ 
  member, 
  darkMode, 
  onClose, 
  onKeyDown, 
  formatDate 
}) => (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    onClick={onClose}
    onKeyDown={onKeyDown}
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title"
  >
    <div 
      className={clsx(
        "w-full max-w-lg rounded-lg shadow-xl p-6 relative",
        darkMode ? "bg-gray-800" : "bg-white"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className={clsx(
          "absolute top-4 right-4 p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
          darkMode 
            ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
            : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        )}
        aria-label="Close modal"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Member Info */}
      <div className="flex flex-col sm:flex-row items-center mb-6">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
          <Image
            width={128}
            height={128}
            src={member.image_url}
            alt={`Profile photo of ${member.name}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="text-center sm:text-left">
          <h3 
            id="modal-title"
            className={clsx(
              "text-2xl font-bold mb-1",
              darkMode ? "text-white" : "text-gray-900"
            )}
          >
            {member.name}
          </h3>
          <p className={clsx(
            "text-lg font-medium",
            darkMode ? "text-blue-300" : "text-blue-600"
          )}>
            {member.position}
          </p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-4">
        <div className={clsx(
          "flex items-center",
          darkMode ? "text-gray-300" : "text-gray-700"
        )}>
          <Mail className="w-5 h-5 mr-3 flex-shrink-0" aria-hidden="true" />
          <a 
            href={`mailto:${member.email}`}
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            {member.email}
          </a>
        </div>
        
        <div className={clsx(
          "flex items-center",
          darkMode ? "text-gray-300" : "text-gray-700"
        )}>
          <Phone className="w-5 h-5 mr-3 flex-shrink-0" aria-hidden="true" />
          <a 
            href={`tel:${member.phone}`}
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            {member.phone}
          </a>
        </div>
        
        <div className={clsx(
          "flex items-center",
          darkMode ? "text-gray-300" : "text-gray-700"
        )}>
          <Calendar className="w-5 h-5 mr-3 flex-shrink-0" aria-hidden="true" />
          <span>
            Term: {formatDate(member.term_start)} - {formatDate(member.term_end)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={onClose}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500",
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
);

export default StaffSection;