'use client';

import { useParams } from 'next/navigation';
import { PageLayout } from "@/components/page-layout";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { projectData as medchatData } from './medchat';
import { projectData as midisaberData } from './midisaber';
import { projectData as lawgptData } from './law-gpt';
import { projectData as blockchainTldData } from './blockchain-tld';
import { projectData as blenderData } from './3d-blender-animation';
import { projectData as ue5Data } from './ue5-game-environment';
import { projectData as unityData } from './unity-game-environment';
import { projectData as amicaData } from './amica-medical-doctor';
import { projectData as chattersyncData } from './chattersync';
import { projectData as geminiData } from './gemini-pro-vision';
import { projectData as translatorData } from './natural-language-translator';

interface ProjectDetails {
  duration: string;
  role: string;
  team: string;
  stakeholders: string[];
}

interface TechnologyStack {
  [key: string]: string[];
}

interface Project {
  title: string;
  description: string;
  introduction: string;
  background: string;
  useCase: string;
  inspiration: string;
  projectDetails: ProjectDetails;
  technologyStack: TechnologyStack;
  developmentProcess: string[];
  features: string[];
  benefits: string[];
  challenges: string[];
  futurePlans: string[];
  conclusion: string;
}

interface ProjectData {
  [key: string]: Project;
}

const allProjectData: ProjectData = {
  ...medchatData,
  ...midisaberData,
  ...lawgptData,
  ...blockchainTldData,
  ...blenderData,
  ...ue5Data,
  ...unityData,
  ...amicaData,
  ...chattersyncData,
  ...geminiData,
  ...translatorData
};

export default function ProjectPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const project = allProjectData[slug];

  if (!project) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-primary hover:underline inline-flex items-center gap-2">
            <FaArrowLeft /> Back to Projects
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/projects" className="text-primary hover:underline inline-flex items-center gap-2 mb-8">
            <FaArrowLeft /> Back to Projects
          </Link>

          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{project.description}</p>

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Duration:</strong> {project.projectDetails.duration}</p>
                <p><strong>Role:</strong> {project.projectDetails.role}</p>
              </div>
              <div>
                <p><strong>Team:</strong> {project.projectDetails.team}</p>
                <p><strong>Stakeholders:</strong> {project.projectDetails.stakeholders.join(', ')}</p>
              </div>
            </div>
          </Section>

          <Section title="Technology Stack">
            {Object.entries(project.technologyStack).map(([category, technologies]) => (
              <div key={category} className="mb-4">
                <h4 className="font-semibold mb-2">{category}</h4>
                <List items={technologies} />
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
        </motion.div>
      </div>
    </PageLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="text-muted-foreground">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
