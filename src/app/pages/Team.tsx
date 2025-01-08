import { Github, Linkedin } from "lucide-react";

const Team = () => {
  return (
    <div className="min-h-screen pt-16 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Meet Our Talented Team
          </h1>
          <p className="text-xl text-primary">
            A group of creative minds and innovative problem-solvers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-card/80 backdrop-blur rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-border"
            >
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-primary text-center mb-2">{member.name}</h3>
              <p className="text-primary text-center mb-4">{member.role}</p>
              <div className="flex justify-center gap-4">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const teamMembers = [
  {
    name: "Mayank Pradkar",
    role: "Lead Developer",
    image: "/lovable-uploads/9ed43508-6ace-4820-8ddf-cc789c3a3c17.png",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Dharamchand Patle",
    role: "Frontend Developer",
    image: "/lovable-uploads/9ed43508-6ace-4820-8ddf-cc789c3a3c17.png",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Rahul Patil",
    role: "Backend Developer",
    image: "/lovable-uploads/9ed43508-6ace-4820-8ddf-cc789c3a3c17.png",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Neelesh Kumar Jatav",
    role: "UI/UX Designer",
    image: "/lovable-uploads/9ed43508-6ace-4820-8ddf-cc789c3a3c17.png",
    linkedin: "#",
    github: "#",
  },
];

export default Team;