'use client';

import { PageLayout } from "@/components/page-layout";
import { motion } from "framer-motion";
import { FaCode, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
}

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with Next.js and Tailwind CSS, featuring animations and a clean design.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/username/portfolio",
      liveUrl: "https://portfolio.com"
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered responses and natural language processing capabilities.",
      technologies: ["React", "Node.js", "OpenAI API", "WebSocket"],
      githubUrl: "https://github.com/username/ai-chat",
      liveUrl: "https://ai-chat.com"
    },
    {
      title: "Industrial IoT Dashboard",
      description: "Dashboard for monitoring and controlling industrial equipment with real-time data visualization.",
      technologies: ["Python", "React", "MQTT", "InfluxDB"],
      githubUrl: "https://github.com/username/iot-dashboard"
    },
    {
      title: "Blockchain Explorer",
      description: "Web application for exploring and analyzing blockchain transactions and smart contracts.",
      technologies: ["Vue.js", "Web3.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/username/blockchain-explorer",
      liveUrl: "https://block-explorer.com"
    }
  ];

  return (
    <PageLayout>
      <div className="max-w-[1200px] mx-auto px-4">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <FaCode className="text-blue-500 text-xl" />
            </div>
            <h2 className="text-3xl font-semibold text-white">Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="bg-[#111111] rounded-lg p-6 border border-white/5 shadow-xl backdrop-blur-sm hover:border-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-white/5 text-gray-300 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <FaGithub className="text-lg" />
                      <span>Code</span>
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <FaExternalLinkAlt className="text-lg" />
                      <span>Live Demo</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
}
