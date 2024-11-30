'use client';

import { PageLayout } from "@/components/page-layout";
import { motion } from "framer-motion";
import { FaUser, FaCode, FaLightbulb } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AboutPage() {
  const skills = [
    "Python", "JavaScript", "TypeScript", "React", "Next.js",
    "Node.js", "Express", "MongoDB", "PostgreSQL", "Docker",
    "Git", "AWS", "Google Cloud", "Azure", "CI/CD"
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-muted-foreground">Software Engineer & Full Stack Developer</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content - Left 2 Columns */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Introduction */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Background</h2>
              <Card className="p-6">
                <p className="text-muted-foreground mb-4">
                  I'm a Software Engineer with a passion for building beautiful,
                  functional, and user-friendly applications. I specialize in full-stack
                  development using modern technologies like React, Next.js, Node.js, and
                  various cloud platforms.
                </p>
                <p className="text-muted-foreground">
                  When I'm not coding, you'll find me exploring new technologies,
                  contributing to open-source projects, or sharing my knowledge through
                  technical writing and mentoring.
                </p>
              </Card>
            </section>

            {/* Technical Background */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Technical Journey</h2>
              <Card className="p-6">
                <p className="text-muted-foreground mb-4">
                  With several years of experience in software development, I've worked
                  on a diverse range of projects from web applications to automation
                  systems. My approach combines technical expertise with a strong focus
                  on user experience and business value.
                </p>
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Full-stack web development with modern frameworks</li>
                  <li>Cloud architecture and deployment</li>
                  <li>Performance optimization and scalability</li>
                  <li>Team leadership and technical mentoring</li>
                </ul>
              </Card>
            </section>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Quick Skills */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Core Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Interests */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Interests</h2>
              <Card className="p-6">
                <ul className="space-y-2 text-muted-foreground">
                  <li>Open Source Development</li>
                  <li>Artificial Intelligence</li>
                  <li>Cloud Architecture</li>
                  <li>DevOps & Automation</li>
                  <li>Technical Writing</li>
                </ul>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
