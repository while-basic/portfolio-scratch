'use client';

import { PageLayout } from "@/components/page-layout";
import { motion } from "framer-motion";
import { FaCode, FaCogs, FaServer, FaTools, FaBrain } from "react-icons/fa";

interface SkillCategory {
  title: string;
  icon: JSX.Element;
  skills: string[];
}

export default function SkillsPage() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Programming Languages",
      icon: <FaCode className="text-blue-500 text-xl" />,
      skills: [
        "Python",
        "JavaScript",
        "TypeScript",
        "Java",
        "C/C++",
        "SQL"
      ]
    },
    {
      title: "Web Technologies",
      icon: <FaServer className="text-purple-500 text-xl" />,
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "Express",
        "HTML5",
        "CSS3/Sass",
        "Tailwind CSS",
        "REST APIs",
        "GraphQL"
      ]
    },
    {
      title: "Industrial & Automation",
      icon: <FaCogs className="text-green-500 text-xl" />,
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
      skills: [
        "Git",
        "Docker",
        "AWS",
        "Google Cloud",
        "CI/CD",
        "Linux",
        "Bash Scripting"
      ]
    },
    {
      title: "Other Skills",
      icon: <FaBrain className="text-red-500 text-xl" />,
      skills: [
        "Machine Learning",
        "Data Analysis",
        "System Architecture",
        "Project Management",
        "Technical Documentation",
        "Problem Solving"
      ]
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-[1200px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-semibold text-white mb-4">Technical Skills</h2>
          <p className="text-gray-400 leading-relaxed">
            A comprehensive overview of my technical skills and expertise across various domains,
            from software development to industrial automation.
          </p>
        </motion.div>

        <div className="space-y-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
              </div>

              <div className="bg-[#111111] rounded-lg p-8 border border-white/5 shadow-xl backdrop-blur-sm">
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 rounded-full bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + skillIndex * 0.05
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
