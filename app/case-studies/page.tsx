'use client';

import { useRouter } from 'next/navigation';

const caseStudies = [
  {
    title: "Medchat",
    description: "AI-powered chatbot",
    challenge: "Creating an AI-powered chatbot that assists medical professionals with real-time diagnosis and medical literature recommendations.",
    solution: "Developed a chatbot that leverages AI to provide real-time diagnoses and medical literature recommendations.",
    impact: "Enhanced patient care and medical literacy for medical professionals.",
    technologies: ["OpenAI API", "React", "Next.js"],
    slug: "medchat"
  },
  {
    title: "Midisaber",
    description: "Music production tool",
    challenge: "Creating a unique music production tool that leverages motion-controlled MIDI interfaces.",
    solution: "Built a music production tool that uses MIDI interfaces to control audio effects and create unique music compositions.", 
    impact: "Provided a creative and immersive experience for music producers and artists.",
    technologies: ["MIDI Interfaces", "Audio Effects", "React"],
    slug: "midisaber"
  },
  {
    title: "Gemini Pro Vision",
    description: "Computer vision and text-to-speech application",
    challenge: "Integrating Google's Gemini Pro API for real-time vision and speech capabilities in a web interface.",
    solution: "Built a web application that leverages machine learning for visual recognition and text generation.",
    impact: "Created an accessible interface for AI-powered visual analysis and communication.",
    technologies: ["Google Gemini Pro API", "Computer Vision", "Text-to-Speech", "React"],
    slug: "gemini-pro-vision"
  },
  {
    title: "Law-GPT",
    description: "Legal assistant", 
    challenge: "Creating a legal assistant that provides case law summaries, legal precedent analysis, and document drafting.",
    solution: "Developed a legal assistant that leverages AI to provide case law summaries, legal precedent analysis, and document drafting.",
    impact: "Enhanced legal literacy and knowledge for lawyers and legal professionals.",
    technologies: ["OpenAI API", "LangChain", "React"],
    slug: "law-gpt"
  },
  {
    title: "Blockchain TLD Service",
    description: "Blockchain TLD service",
    challenge: "Creating a blockchain-based TLD service for domain registration and management.",
    solution: "Built a blockchain-based TLD service for domain registration and management.",
    impact: "Provided a secure and decentralized platform for domain ownership and management.",
    technologies: ["Blockchain", "Solidity", "React"],
    slug: "blockchain-tld-service"
  },
  {
    title: "3D Blender Model",
    description: "3D model of a floating metal orb",
    challenge: "Creating a 3D model of a floating metal orb using Blender.",
    solution: "Built a 3D model of a floating metal orb using Blender.",
    impact: "Provided a visually appealing and interactive representation of a floating metal orb.",
    technologies: ["Blender", "3D Modeling", "React"],
    slug: "3d-blender-model"
  },
  {
    title: "Unreal Engine Game Environment",
    description: "Game environment",
    challenge: "Creating a game environment using Unreal Engine.",
    solution: "Built a game environment using Unreal Engine.",
    impact: "Provided a realistic and immersive game experience for players.",
    technologies: ["Unreal Engine", "Game Development", "React"],
    slug: "unreal-engine-game-environment"
  },
  {
    title: "Unity Game Environment",
    description: "Game environment",
    challenge: "Creating a game environment using Unity.",
    solution: "Built a game environment using Unity.",
    impact: "Provided a realistic and immersive game experience for players.",
    technologies: ["Unity", "Game Development", "React"],
    slug: "unity-game-environment"
  },
  {
    title: "Amica Medical Chatbot",
    description: "AI-powered chatbot",
    challenge: "Creating an AI-powered chatbot that assists medical professionals with real-time diagnosis and medical literature recommendations.",
    solution: "Developed a chatbot that leverages AI to provide real-time diagnoses and medical literature recommendations.",
    impact: "Enhanced patient care and medical literacy for medical professionals.",
    technologies: ["OpenAI API", "React", "Next.js"],
    slug: "amica-medical-chatbot"
  },
  {
    title: "Chattersync",
    description: "AI-powered chatbot",
    challange: "Creating an AI-powered chatbot that talks to itself and provides real-time responses.",
    solution: "Developed a chatbot that leverages AI to provide real-time responses.",
    impact: "Enhanced user experience and engagement for users.",
    technologies: ["OpenAI API", "React", "Next.js"],
    slug: "chattersync"
  },
  {
    title: "Gemini Pro Vision",
    description: "Computer vision and text-to-speech application",
    challenge: "Integrating Google's Gemini Pro API for real-time vision and speech capabilities in a web interface.",
    solution: "Built a web application that leverages machine learning for visual recognition and text generation.",
    impact: "Created an accessible interface for AI-powered visual analysis and communication.",
    technologies: ["Google Gemini Pro API", "Computer Vision", "Text-to-Speech", "React"],
    slug: "gemini-pro-vision"
  },
  {
    title: "Replicate SDXL Image Generator",
    description: "Image generator",
    challenge: "Creating an image generator using the Replicate SDXL API.",
    solution: "Built an image generator using the Replicate SDXL API.",
    impact: "Provided a powerful and flexible tool for generating high-quality images.",
    technologies: ["Replicate SDXL API", "Image Generation", "React"],
    slug: "replicate-sdxl-image-generator"
  }
];

export default function CaseStudies() {
  const router = useRouter();

  const handleCardClick = (slug: string) => {
    router.push(`/projects/${slug}`);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Case Studies</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, index) => (
          <div 
            key={index}
            onClick={() => handleCardClick(study.slug)}
            className="cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4">{study.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{study.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Challenge</h3>
                <p className="text-gray-600 dark:text-gray-300">{study.challenge}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Solution</h3>
                <p className="text-gray-600 dark:text-gray-300">{study.solution}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Impact</h3>
                <p className="text-gray-600 dark:text-gray-300">{study.impact}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                  {study.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="mt-6">
                <span className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                  View Project Details
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
