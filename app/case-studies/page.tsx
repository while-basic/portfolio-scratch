import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Christopher Celaya",
  description: "Detailed case studies of projects and solutions developed by Christopher Celaya, showcasing problem-solving approaches and technical implementations.",
};

const caseStudies = [
  {
    title: "EcoTrack",
    description: "Environmental monitoring platform",
    challenge: "Creating a scalable system for real-time environmental data tracking and visualization.",
    solution: "Developed a robust platform using React and D3.js for data visualization, with Node.js backend for real-time data processing.",
    impact: "Enabled organizations to monitor environmental metrics in real-time and make data-driven decisions.",
    technologies: ["React", "D3.js", "Node.js"],
    link: "/projects/ecotrack"
  },
  {
    title: "SmartBudget",
    description: "AI-powered personal finance app",
    challenge: "Building an intelligent system for personal finance management and insights.",
    solution: "Implemented AI algorithms for expense analysis and financial recommendations.",
    impact: "Helped users make better financial decisions through personalized insights and recommendations.",
    technologies: ["AI/ML", "Personal Finance APIs"],
    link: "/projects/smartbudget"
  },
  {
    title: "Gemini Pro Vision",
    description: "Computer vision and text-to-speech application",
    challenge: "Integrating Google's Gemini Pro API for real-time vision and speech capabilities in a web interface.",
    solution: "Built a web application that leverages machine learning for visual recognition and text generation.",
    impact: "Created an accessible interface for AI-powered visual analysis and communication.",
    technologies: ["Google Gemini Pro API", "Computer Vision", "Text-to-Speech", "React"],
    link: "/projects/gemini-pro-vision"
  }
];

export default function CaseStudies() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Case Studies</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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
            
            <a
              href={study.link}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Project Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
