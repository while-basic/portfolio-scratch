import { ProjectCard } from "@/components/project-card";

export default function ProjectsPage() {
  const projects = [
    {
      title: "Automated Manufacturing System",
      description: "Designed and implemented a fully automated manufacturing system using PLCs and custom software.",
      tags: ["Mechatronics", "Software"]
    },
    {
      title: "Audio Visualization App",
      description: "Developed a real-time audio visualization application using React and Web Audio API.",
      tags: ["Software", "Audio"]
    },
    {
      title: "Smart Home Audio System",
      description: "Created a distributed audio system for smart homes with custom hardware and mobile app control.",
      tags: ["Mechatronics", "Software", "Audio"]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-white">Featured Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
