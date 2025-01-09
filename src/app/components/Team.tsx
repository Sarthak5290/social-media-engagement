"use client";
import { Instagram, Linkedin, Github } from "lucide-react";
import Image from "next/image";

// TeamMemberCard Component
interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
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
    <div className="relative bg-dark text-white rounded-lg p-6 shadow-card max-w-xs mx-auto border-white border-2 w-[90%]">
      {/* Gradient Glow Border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-team-accent via-team-glow to-team-accent p-[2px] -z-10"></div>

      {/* Card Content */}
      <div className="bg-dark rounded-lg">
        {/* Image Container */}
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={imageUrl}
            alt={name}
            width={128}
            height={128}
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-xl font-semibold text-team-heading mb-2">
            {name}
          </h3>
          <p className="text-gray-300 text-sm mb-4 px-4">{description}</p>
          <p className="font-medium text-team-text mb-4">{role}</p>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {socialLinks.linkedin && (
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-team-accent transition-colors"
              >
                <Linkedin size={20} />
              </a>
            )}
            {socialLinks.github && (
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-team-accent transition-colors"
              >
                <Github size={20} />
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
    </div>
  );
};

// Main Team Page
const Team = () => {
  const teamMembers = [
    {
      name: "Prathamesh Bhaskar",
      role: "AIML and Backend",
      description:
        "Building the team and setting architecture and foundation of the application",
      imageUrl: "/Prathamesh.jpeg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com",
      },
    },
    {
      name: "Ashitosh Katale",
      role: "Full Stack Developer",
      description:
        "Designing and building server-side of application ensuring the smooth operation of an app.",
      imageUrl: "/ashutosh.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com",
      },
    },
    {
      name: "Sarthak Gaikwad",
      role: "NextJs Developer",
      description: "Passionate about building scalable and efficient solutions.",
      imageUrl: "/sarthak.jpg",
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        instagram: "https://instagram.com",
      },
    },
    {
      name: "Atharva Divekar",
      role: "AI Engineer",
      description:
        "Creating conversational interfaces, like chatbots with keen knowledge for AI systems.",
      imageUrl: "/ghanshyam.png",
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
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