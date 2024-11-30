'use client';

import { useParams } from 'next/navigation';
import { PageLayout } from "@/components/page-layout";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { projectData as medchatData } from './medchat';
import { projectData as ecotrackData } from './ecotrack';
import { projectData as smartbudgetData } from './smartbudget';
import { projectData as devflowData } from './devflow';

const allProjectData = {
  ...medchatData,
  ...ecotrackData,
  ...smartbudgetData,
  ...devflowData
};

export default function ProjectPage() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : '';
  const project = allProjectData[slug];

  if (!project) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-blue-500 hover:text-blue-600">
            <FaArrowLeft className="inline mr-2" />
            Back to Projects
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <div className="mb-6">
          <Link href="/projects" className="text-blue-500 hover:text-blue-600 flex items-center">
            <FaArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>

        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="text-xl text-gray-300 mb-8">{project.description}</p>

        <div className="space-y-12">
          <Section title="Introduction">
            <p>{project.introduction}</p>
          </Section>

          <Section title="Background">
            <p>{project.background}</p>
          </Section>

          <Section title="Use Case">
            <p>{project.useCase}</p>
          </Section>

          <Section title="Inspiration">
            <p>{project.inspiration}</p>
          </Section>

          <Section title="Project Details">
            <List items={[
              `Duration: ${project.projectDetails.duration}`,
              `Role: ${project.projectDetails.role}`,
              `Team Size: ${project.projectDetails.team}`,
              `Key Stakeholders: ${project.projectDetails.stakeholders.join(', ')}`
            ]} />
          </Section>

          <Section title="Technology Stack">
            {Object.entries(project.technologyStack).map(([category, technologies]) => (
              <div key={category} className="mb-4">
                <h4 className="text-lg font-semibold capitalize mb-2">{category}:</h4>
                <List items={technologies as string[]} />
              </div>
            ))}
          </Section>

          <Section title="Development Process">
            <List items={project.developmentProcess} />
          </Section>

          <Section title="Features">
            <List items={project.features} />
          </Section>

          <Section title="Benefits">
            <List items={project.benefits} />
          </Section>

          <Section title="Challenges">
            <List items={project.challenges} />
          </Section>

          <Section title="Future Plans">
            <List items={project.futurePlans} />
          </Section>

          <Section title="Conclusion">
            <p>{project.conclusion}</p>
          </Section>
        </div>
      </motion.div>
    </PageLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="text-gray-300">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
