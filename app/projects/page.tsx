'use client';

import { PageLayout } from "@/components/page-layout";
import { ProjectCard } from "@/components/project-card";
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
  slug: string;
}

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with Next.js and Tailwind CSS, featuring animations and a clean design.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/username/portfolio",
      liveUrl: "https://portfolio.com",
      slug: "portfolio-website"
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered responses and natural language processing capabilities.",
      technologies: ["React", "Node.js", "OpenAI API", "WebSocket"],
      githubUrl: "https://github.com/username/ai-chat",
      liveUrl: "https://ai-chat.com",
      slug: "ai-chat-application"
    },
    {
      title: "Industrial IoT Dashboard",
      description: "Dashboard for monitoring and controlling industrial equipment with real-time data visualization.",
      technologies: ["Python", "React", "MQTT", "InfluxDB"],
      githubUrl: "https://github.com/username/iot-dashboard",
      slug: "industrial-iot-dashboard"
    },
    {
      title: "Blockchain Explorer",
      description: "Web application for exploring and analyzing blockchain transactions and smart contracts.",
      technologies: ["Vue.js", "Web3.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/username/blockchain-explorer",
      liveUrl: "https://block-explorer.com",
      slug: "blockchain-explorer"
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold text-white mb-4">Projects</h1>
          <p className="text-xl text-gray-400">
            A collection of my recent work and experiments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-[#111111] rounded-lg p-6 border border-white/5 shadow-xl backdrop-blur-sm hover:border-white/10 transition-all duration-300">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
