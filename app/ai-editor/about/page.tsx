'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  CodeIcon, 
  ZapIcon, 
  ShieldIcon, 
  StarIcon, 
  GithubIcon 
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="p-6 space-y-6 text-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">AI Editor</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          An intelligent, context-aware writing and coding assistant powered by cutting-edge AI technology.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
          <div className="flex items-center mb-4">
            <ZapIcon className="mr-3 text-blue-500" />
            <h2 className="text-xl font-semibold">Key Features</h2>
          </div>
          <ul className="space-y-2 text-gray-400">
            <li>• AI-powered code and text suggestions</li>
            <li>• Contextual understanding</li>
            <li>• Customizable AI models</li>
            <li>• Privacy-first design</li>
          </ul>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
          <div className="flex items-center mb-4">
            <ShieldIcon className="mr-3 text-green-500" />
            <h2 className="text-xl font-semibold">Privacy & Security</h2>
          </div>
          <p className="text-gray-400">
            We prioritize your data privacy. All AI interactions are processed securely, 
            with options to limit data sharing and context exposure.
          </p>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
          <div className="flex items-center mb-4">
            <CodeIcon className="mr-3 text-purple-500" />
            <h2 className="text-xl font-semibold">Technology</h2>
          </div>
          <p className="text-gray-400">
            Built with Next.js, React, and state-of-the-art AI models. 
            Designed for developers, writers, and creative professionals.
          </p>
        </div>

        <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800">
          <div className="flex items-center mb-4">
            <StarIcon className="mr-3 text-yellow-500" />
            <h2 className="text-xl font-semibold">Version</h2>
          </div>
          <div className="text-gray-400">
            <p>AI Editor v1.0.0</p>
            <p className="text-sm text-gray-500">Last Updated: June 2024</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <Button 
          variant="outline"
          className="inline-flex items-center border border-zinc-800 bg-zinc-900/50 text-white hover:bg-zinc-800 transition"
          onClick={() => window.open('https://github.com/your-repo', '_blank')}
        >
          <GithubIcon className="mr-2" /> View on GitHub
        </Button>
      </div>
    </div>
  );
}
