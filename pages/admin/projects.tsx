import React from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { Briefcase, Plus, ExternalLink, Edit, Trash2, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      id: 1,
      name: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution built with Next.js and Stripe',
      status: 'Live',
      tech: ['Next.js', 'TypeScript', 'Stripe'],
      github: 'https://github.com/username/project',
      demo: 'https://project-demo.com',
    },
    {
      id: 2,
      name: 'AI Chat Application',
      description: 'Real-time chat application with AI-powered responses',
      status: 'In Development',
      tech: ['React', 'Node.js', 'OpenAI'],
      github: 'https://github.com/username/chat-app',
      demo: null,
    },
    {
      id: 3,
      name: 'Portfolio Website',
      description: 'Personal portfolio website with admin dashboard',
      status: 'Live',
      tech: ['React', 'TypeScript', 'Tailwind'],
      github: 'https://github.com/username/portfolio',
      demo: 'https://portfolio.com',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Briefcase className="w-6 h-6 mr-2" />
            <h1 className="text-2xl font-bold">Projects</h1>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold">{project.name}</h2>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                    ${project.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Github className="w-5 h-5" />
                    </button>
                    {project.demo && (
                      <button className="text-blue-600 hover:text-blue-900">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Projects;
