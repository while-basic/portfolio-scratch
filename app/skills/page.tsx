import { SkillCard } from "@/components/skill-card";
import { PageLayout } from "@/components/page-layout";

export default function SkillsPage() {
  const skillCategories = [
    {
      title: "Development",
      skills: [
        {
          title: "Frontend Development",
          percentage: 90,
          description: "Building modern, responsive web applications with React and Next.js",
          tags: ["React", "Next.js", "TypeScript", "HTML5", "CSS3", "Tailwind"]
        },
        {
          title: "Backend Development",
          percentage: 85,
          description: "Developing scalable backend services and APIs",
          tags: ["Node.js", "Python", "Java", "SQL", "MongoDB", "PostgreSQL"]
        },
        {
          title: "DevOps & Tools",
          percentage: 80,
          description: "Managing development operations and cloud infrastructure",
          tags: ["Docker", "Git", "CI/CD", "AWS", "Linux"]
        }
      ]
    },
    {
      title: "Industrial",
      skills: [
        {
          title: "Preventive Maintenance",
          percentage: 95,
          description: "Expert in preventive maintenance of industrial equipment",
          tags: ["Equipment Maintenance", "CMMS Systems", "Maintenance Scheduling"]
        },
        {
          title: "Manufacturing",
          percentage: 90,
          description: "Extensive experience in industrial manufacturing environments",
          tags: ["Production Line", "Quality Control", "Process Optimization"]
        },
        {
          title: "Electrical Systems",
          percentage: 85,
          description: "Strong background in electrical and control systems",
          tags: ["PLC Programming", "HMI Interfaces", "Control Systems", "NFPA 70E"]
        }
      ]
    },
    {
      title: "Management",
      skills: [
        {
          title: "Project Management",
          percentage: 85,
          description: "Managing technical projects and cross-functional teams",
          tags: ["Agile", "Scrum", "Team Leadership", "Resource Planning"]
        },
        {
          title: "Technical Leadership",
          percentage: 80,
          description: "Leading technical teams and making architectural decisions",
          tags: ["Team Mentoring", "Code Reviews", "Architecture Design"]
        }
      ]
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-24">
        <div className="flex justify-between items-start mb-16">
          <h1 className="text-6xl font-bold text-white">My<br />Skills</h1>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Here&apos;s a comprehensive overview of my technical skills and proficiency levels
            across various domains and technologies.
          </p>
        </div>

        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16 last:mb-0">
            <h2 className="text-2xl font-semibold text-white mb-8">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.skills.map((skill, skillIndex) => (
                <SkillCard
                  key={skillIndex}
                  title={skill.title}
                  percentage={skill.percentage}
                  description={skill.description}
                  tags={skill.tags}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
