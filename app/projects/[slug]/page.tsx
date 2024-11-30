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
    introduction: `MedChat revolutionizes healthcare communication by providing an intelligent, 
    AI-driven platform that connects patients with healthcare providers while ensuring data security 
    and efficient information exchange.`,
    
    background: `The healthcare industry faces ongoing challenges with patient communication and 
    information management. MedChat was developed to address the growing need for secure, 
    efficient, and intelligent healthcare communication solutions that can handle increasing 
    patient loads while maintaining high-quality care.`,
    
    useCase: `Healthcare providers use MedChat to streamline patient communications, automate routine 
    inquiries, and provide 24/7 basic medical guidance. Patients can securely communicate with their 
    healthcare providers, receive automated health insights, and manage their medical information 
    all in one platform.`,
    
    inspiration: `The inspiration for MedChat came from observing the communication challenges in 
    healthcare settings, particularly during the COVID-19 pandemic. The goal was to create a solution 
    that could help healthcare providers maintain high-quality patient care while managing increased 
    communication loads.`,
    
    projectDetails: {
      description: `MedChat uses advanced natural language processing to understand and respond to 
      patient inquiries. The system integrates with existing healthcare records systems while 
      maintaining strict HIPAA compliance. Real-time chat functionality is enhanced with AI-powered 
      response suggestions for healthcare providers.`,
      architecture: [
        'Microservices architecture for scalability',
        'End-to-end encryption for all communications',
        'AI-powered response system with medical knowledge base',
        'Real-time notification system'
      ]
    },
    
    technologyStack: {
      frontend: ['React', 'TypeScript', 'TailwindCSS'],
      backend: ['Node.js', 'Express', 'WebSocket'],
      database: ['MongoDB', 'Redis'],
      ai: ['TensorFlow', 'Natural Language Processing'],
      cloud: ['AWS', 'Docker', 'Kubernetes']
    },
    
    developmentProcess: {
      methodology: 'Agile Scrum',
      phases: [
        'Initial Research and Planning',
        'Security Architecture Design',
        'Frontend and Backend Development',
        'AI Model Training and Integration',
        'Testing and HIPAA Compliance Verification',
        'Beta Testing with Selected Healthcare Providers'
      ]
    },
    
    features: [
      'Secure real-time chat with end-to-end encryption',
      'AI-powered automated responses for common inquiries',
      'Integration with electronic health records',
      'Automated symptom analysis and triage',
      'Secure file sharing and medical image viewing',
      'Appointment scheduling and reminders'
    ],
    
    benefits: [
      'Reduced response time for patient inquiries',
      'Improved patient satisfaction scores',
      'Decreased administrative workload',
      'Enhanced data security and HIPAA compliance',
      'Better resource allocation for healthcare providers'
    ],
    
    challenges: [
      'Ensuring HIPAA compliance while maintaining system performance',
      'Building accurate medical language understanding models',
      'Integrating with various healthcare record systems',
      'Maintaining high availability for critical communications'
    ],
    
    futurePlans: [
      'Integration with telemedicine platforms',
      'Enhanced AI capabilities for medical image analysis',
      'Mobile application development',
      'International language support',
      'Integration with wearable health devices'
    ],
    
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

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
      {children}
    </div>
  );

  const List = ({ items }: { items: string[] }) => (
    <ul className="list-disc list-inside space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-gray-400">{item}</li>
      ))}
    </ul>
  );

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

          <div className="space-y-12">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
              <p className="text-xl text-gray-400">{project.description}</p>
            </div>

            <div className="flex gap-4 mb-12">
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

            <Section title="Introduction">
              <p className="text-gray-400 leading-relaxed">{project.introduction}</p>
            </Section>

            <Section title="Background">
              <p className="text-gray-400 leading-relaxed">{project.background}</p>
            </Section>

            <Section title="Use Case">
              <p className="text-gray-400 leading-relaxed">{project.useCase}</p>
            </Section>

            <Section title="Inspiration">
              <p className="text-gray-400 leading-relaxed">{project.inspiration}</p>
            </Section>

            <Section title="Project Details">
              <p className="text-gray-400 leading-relaxed mb-4">{project.projectDetails.description}</p>
              <h3 className="text-xl font-semibold text-white mb-2">Architecture</h3>
              <List items={project.projectDetails.architecture} />
            </Section>

            <Section title="Technology Stack">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(project.technologyStack).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-white mb-2 capitalize">{category}</h3>
                    <List items={items} />
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Development Process">
              <p className="text-gray-400 mb-4">Methodology: {project.developmentProcess.methodology}</p>
              <h3 className="text-lg font-semibold text-white mb-2">Development Phases</h3>
              <List items={project.developmentProcess.phases} />
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
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
