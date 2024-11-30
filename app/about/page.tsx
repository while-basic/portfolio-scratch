'use client';

import { PageLayout } from "@/components/page-layout";
import { motion } from "framer-motion";
import { FaUser, FaCode, FaLightbulb } from "react-icons/fa";

export default function AboutPage() {
  const skills = [
    "Python", "JavaScript", "TypeScript", "React", "Next.js",
    "Node.js", "MongoDB", "PostgreSQL", "Docker",
    "Git", "AWS", "Google Cloud", "Azure", "Linux",
  ];

  return (
    <PageLayout>
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Introduction Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <FaUser className="text-blue-500 text-xl" />
            </div>
            <h2 className="text-3xl font-semibold text-white">About Me</h2>
          </div>
          <div className="bg-[#111111] rounded-lg p-8 border border-white/5 shadow-xl backdrop-blur-sm">
            <p className="text-gray-400 leading-relaxed mb-6">
              I'm Christopher Celaya, a software engineer with a strong foundation in electrical engineering and industrial automation. 
              My journey from industrial maintenance to software development has given me a unique perspective on problem-solving and 
              system optimization.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Currently, I'm focused on building modern web applications using cutting-edge technologies while maintaining my interest 
              in hardware integration and automation. I believe in creating efficient, scalable solutions that make a real impact.
            </p>
          </div>
        </motion.section>

        {/* Technical Background Section */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
              <FaCode className="text-purple-500 text-xl" />
            </div>
            <h2 className="text-3xl font-semibold text-white">Technical Background</h2>
          </div>
          <div className="bg-[#111111] rounded-lg p-8 border border-white/5 shadow-xl backdrop-blur-sm">
            <p className="text-gray-400 leading-relaxed mb-6">
              With a background spanning both hardware and software, I bring a comprehensive understanding of technology 
              to every project. My experience includes:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                <span>Full-stack web development using modern JavaScript frameworks</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                <span>Industrial automation and control systems</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                <span>Cloud infrastructure and DevOps practices</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-purple-500 flex-shrink-0" />
                <span>Data center operations and maintenance</span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
              <FaLightbulb className="text-green-500 text-xl" />
            </div>
            <h2 className="text-3xl font-semibold text-white">Skills</h2>
          </div>
          <div className="bg-[#111111] rounded-lg p-8 border border-white/5 shadow-xl backdrop-blur-sm">
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-white/5 text-gray-300 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </PageLayout>
  );
}
