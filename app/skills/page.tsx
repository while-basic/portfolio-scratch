"use client";

import { PageLayout } from "@/components/page-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaCode, FaCogs, FaServer, FaTools, FaBrain } from "react-icons/fa";

interface SkillCategory {
  title: string;
  icon: JSX.Element;
  skills: string[];
  description: string;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: <FaCode className="text-blue-500 text-xl" />,
    description: "Core programming languages I use for software development",
    skills: [
      "Python",
      "JavaScript",
      "TypeScript",
      "Java",
      "C/C++",    
      "SQL",
    ]
  },
  {
    title: "Web Technologies",
    icon: <FaServer className="text-purple-500 text-xl" />,
    description: "Modern web development technologies and frameworks",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
    ]
  },
  {
    title: "Industrial & Automation",
    icon: <FaCogs className="text-green-500 text-xl" />,
    description: "Technologies for industrial automation and control systems",
    skills: [
      "PLC Programming",
      "SCADA Systems",
      "Industrial IoT",
      "Robotics",
      "Control Systems",
      "HMI Development"
    ]
  },
  {
    title: "DevOps & Tools",
    icon: <FaTools className="text-yellow-500 text-xl" />,
    description: "Tools and technologies for DevOps and development",
    skills: [
      "Git",
      "Docker",
      "AWS",
      "Google Cloud",
      "Vercel",
      "Railway",
      "Supabase",
      "PlanetScale",
      "Azure",
    ]
  },
  {
    title: "Other Skills",
    icon: <FaBrain className="text-red-500 text-xl" />,
    description: "Other technical skills and areas of expertise",
    skills: [
      "Machine Learning",
      "System Architecture",
      "Project Management",
      "Technical Documentation",
      "Problem Solving"
    ]
  }
];

export default function SkillsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* 3D Skills Visualization */}
        
        {/* Original Skills Content */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Technical Skills</h1>
          <p className="text-xl text-muted-foreground">A comprehensive overview of my technical expertise</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-foreground">Skills & Expertise</h1>
          <div className="grid gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index} className="p-6 bg-card">
                <div className="flex items-center gap-3 mb-4">
                  {category.icon}
                  <h2 className="text-2xl font-semibold text-foreground">{category.title}</h2>
                </div>
                <p className="text-muted-foreground mb-6">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <Badge 
                      key={idx} 
                      variant="secondary"
                      className="text-secondary-foreground bg-secondary hover:bg-secondary/80"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Skills Section */}
        <div className="mt-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Additional Competencies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Development Tools</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Git</Badge>
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">VS Code</Badge>
                  <Badge variant="secondary">Figma</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Team Leadership</Badge>
                  <Badge variant="secondary">Problem Solving</Badge>
                  <Badge variant="secondary">Technical Writing</Badge>
                  <Badge variant="secondary">Mentoring</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
