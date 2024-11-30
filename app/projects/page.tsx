Cimport { ProjectCard } from "@/components/project-card";

export default function ProjectsPage() {
  const projects = [
    {
      title: "MedChat",
      description: "AI-powered medical diagnosis assistance system for healthcare professionals",
      imageAlt: "Image of MedChat",
      tags: ["AI", "Healthcare", "React", "Node.js"]
    },
    {
      title: "Industrial Automation System",
      description: "Designed and implemented a complete industrial automation system for manufacturing processes",
      imageAlt: "Image of Industrial Automation System",
      tags: ["PLC", "SCADA", "Industrial IoT"]
    },
    {
      title: "Smart Building Control",
      description: "Developed an integrated building management system for energy efficiency and comfort",
      imageAlt: "Image of Smart Building Control",
      tags: ["Building Automation", "Energy Management", "IoT"]
    },
    {
      title: "Data Center Infrastructure",
      description: "Designed and implemented scalable data center infrastructure solutions",
      imageAlt: "Image of Data Center Infrastructure",
      tags: ["Infrastructure", "Networking", "Automation"]
    },
    {
      title: "Renewable Energy Integration",
      description: "Created systems for integrating renewable energy sources into existing power grids",
      imageAlt: "Image of Renewable Energy Integration",
      tags: ["Energy", "IoT", "Control Systems"]
    },
    {
      title: "Manufacturing Line Automation",
      description: "Automated manufacturing line processes for increased efficiency",
      imageAlt: "Image of Manufacturing Line Automation",
      tags: ["PLC", "Robotics", "Industrial IoT"]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-6xl font-bold mb-4 text-white text-center">My Projects</h1>
        <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          A collection of my work in industrial automation, control systems, and infrastructure
          projects. Each project showcases technical expertise and innovative solutions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              tags={project.tags}
              imageAlt={project.imageAlt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
