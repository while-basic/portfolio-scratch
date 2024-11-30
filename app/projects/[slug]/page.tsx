'use client';

import { useParams } from 'next/navigation';
import { PageLayout } from "@/components/page-layout";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft } from "react-icons/fa";

// This would typically come from a database or CMS
const projectData = {
  'medchat': {
    title: 'MedChat',
    description: 'An AI-powered medical consultation platform',
    fullDescription: `MedChat is a sophisticated healthcare communication platform that leverages artificial intelligence to facilitate 
    better interactions between healthcare providers and patients. The platform includes real-time chat capabilities, automated symptom 
    analysis, and secure medical record integration.`,
    challenges: [
      'Implementing HIPAA-compliant data storage and transmission',
      'Building a reliable real-time chat system',
      'Integrating machine learning models for symptom analysis'
    ],
    solutions: [
      'Utilized end-to-end encryption for all communications',
      'Implemented WebSocket technology with fallback options',
      'Developed a custom ML pipeline for medical text analysis'
    ],
    technologies: ['React', 'Node.js', 'WebSocket', 'TensorFlow', 'MongoDB'],
    imageUrl: '/images/gallery/medchat.jpg',
    githubUrl: 'https://github.com/username/medchat',
    liveUrl: 'https://medchat-demo.com'
  },
  // Add more projects here...
};

export default function ProjectPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const project = projectData[slug as keyof typeof projectData];

  if (!project) {
    return (
      <PageLayout>
        <div className="max-w-[1200px] mx-auto px-4 py-24">
          <h1 className="text-4xl font-bold text-white mb-8">Project Not Found</h1>
          <Link href="/projects" className="text-blue-500 hover:text-blue-400 flex items-center gap-2">
            <FaArrowLeft /> Back to Projects
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-[1200px] mx-auto px-4 py-24">
        <Link href="/projects" className="text-gray-400 hover:text-white flex items-center gap-2 mb-8">
          <FaArrowLeft /> Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
              <p className="text-xl text-gray-400">{project.description}</p>
            </div>

            <div className="flex gap-4">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <FaGithub className="text-lg" />
                  <span>View Code</span>
                </Link>
              )}
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                >
                  <FaExternalLinkAlt className="text-lg" />
                  <span>Live Demo</span>
                </Link>
              )}
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Overview</h2>
              <p className="text-gray-400 leading-relaxed">{project.fullDescription}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Challenges</h2>
              <ul className="list-disc list-inside space-y-2">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="text-gray-400">{challenge}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Solutions</h2>
              <ul className="list-disc list-inside space-y-2">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="text-gray-400">{solution}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-white mb-4">Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
