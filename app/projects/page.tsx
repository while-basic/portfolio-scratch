'use client';

import { PageLayout } from "@/components/page-layout";
import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";

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
      githubUrl: "https://github.com/christophercelaya/portfolio",
      liveUrl: "https://christophercelaya.com",
      imageUrl: "/images/projects/portfolio.jpg",
      slug: "portfolio-website"
    },
    {
      title: "EcoTrack",
      description: "Environmental monitoring and data visualization platform",
      tags: ["React", "Node.js", "MongoDB", "D3.js"],
      githubUrl: "https://github.com/christophercelaya/ecotrack",
      liveUrl: "https://ecotrack-demo.com",
      imageUrl: "/images/projects/ecotrack.jpg",
      slug: "ecotrack"
    },
    {
      title: "EcoTrack",
      description: "A sustainability tracking application that helps users monitor and reduce their carbon footprint.",
      tags: ["Vue.js", "Python", "Flask", "PostgreSQL", "D3.js"],
      githubUrl: "https://github.com/christophercelaya/ecotrack",
      liveUrl: "https://ecotrack-demo.com",
      imageUrl: "/images/projects/ecotrack.jpg",
      slug: "ecotrack"
    },
    {
      title: "SmartBudget",
      description: "An intelligent personal finance management system with ML-powered insights and predictions.",
      tags: ["React Native", "TensorFlow.js", "Express", "MySQL", "Plaid API"],
      githubUrl: "https://github.com/christophercelaya/smartbudget",
      liveUrl: "https://smartbudget-app.com",
      imageUrl: "/images/projects/smartbudget.jpg",
      slug: "smartbudget"
    },
    {
      title: "DevFlow",
      description: "A developer productivity suite that streamlines workflow automation and project management.",
      tags: ["Angular", "NestJS", "GraphQL", "Redis", "Docker"],
      githubUrl: "https://github.com/christophercelaya/devflow",
      liveUrl: "https://devflow-suite.com",
      imageUrl: "/images/projects/devflow.jpg",
      slug: "devflow"
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
