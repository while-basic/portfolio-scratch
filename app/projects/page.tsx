'use client';

import { PageLayout } from "@/components/page-layout";
import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";
import { FaCode, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

interface Project {
  title: string;
  description: string;
  tags: string[];
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
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/username/portfolio",
      liveUrl: "https://portfolio.com",
      imageUrl: "/images/projects/portfolio.jpg",
      slug: "portfolio-website"
    },
    {
      title: "AI Chat Application",
      description: "Real-time chat application with AI-powered responses and natural language processing capabilities.",
      tags: ["React", "Node.js", "OpenAI API", "WebSocket"],
      githubUrl: "https://github.com/username/ai-chat",
      liveUrl: "https://ai-chat.com",
      imageUrl: "/images/projects/ai-chat.jpg",
      slug: "ai-chat-application"
    },
    {
      title: "Industrial IoT Dashboard",
      description: "Dashboard for monitoring and controlling industrial equipment with real-time data visualization.",
      tags: ["Python", "React", "MQTT", "InfluxDB"],
      githubUrl: "https://github.com/username/iot-dashboard",
      imageUrl: "/images/projects/iot-dashboard.jpg",
      slug: "industrial-iot-dashboard"
    },
    {
      title: "Blockchain Explorer",
      description: "Web application for exploring and analyzing blockchain transactions and smart contracts.",
      tags: ["Vue.js", "Web3.js", "Express", "MongoDB"],
      githubUrl: "https://github.com/username/blockchain-explorer",
      liveUrl: "https://block-explorer.com",
      imageUrl: "/images/projects/blockchain.jpg",
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
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
