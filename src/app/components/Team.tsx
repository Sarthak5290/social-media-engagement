"use client";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Image from "next/image"; // Import Image from next/image

// TeamMemberCard Component
interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

const TeamMemberCard = ({
  name,
  role,
  description,
  imageUrl,
  socialLinks,
}: TeamMemberProps) => {
  return (
    <div className="bg-dark text-white rounded-lg p-6 shadow-card max-w-xs mx-auto">
      {/* Image Container with Border */}
      <div className="relative w-32 h-32 mx-auto mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-team-accent" />
        <Image
          src={imageUrl}
          alt={name}
          width={128} // Specify width
          height={128} // Specify height
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-xl font-semibold text-team-heading mb-2">{name}</h3>
        <p className="text-gray-300 text-sm mb-4 px-4">{description}</p>
        <p className="font-medium text-team-text mb-4">{role}</p>

        {/* Social Links */}
        <div className="flex justify-center space-x-4">
          {socialLinks.facebook && (
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-team-accent transition-colors"
            >
              <Facebook size={20} />
            </a>
          )}
          {socialLinks.twitter && (
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-team-accent transition-colors"
            >
              <Twitter size={20} />
            </a>
          )}
          {socialLinks.instagram && (
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-team-accent transition-colors"
            >
              <Instagram size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Team Page
const Team = () => {
  const teamMembers = [
    {
      name: "Alex Smith",
      role: "Creative Leader",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      socialLinks: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      name: "Jane Doe",
      role: "Product Manager",
      description:
        "Expert in leading cross-functional teams to deliver innovative products.",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      socialLinks: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      name: "Samuel Brown",
      role: "Lead Developer",
      description:
        "Passionate about building scalable and efficient solutions.",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      socialLinks: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
    {
      name: "Emily White",
      role: "UX/UI Designer",
      description:
        "Dedicated to creating intuitive and user-friendly interfaces.",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      socialLinks: {
        facebook: "https://facebook.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-black py-12 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-team-heading mb-12">
          Meet Our Team
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
