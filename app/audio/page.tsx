"use client"

import { useState } from 'react'
import { AudioVisualizer } from '@/components/three/AudioVisualizer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface AudioProject {
  title: string
  description: string
  audioUrl: string
  tags: string[]
}

const audioProjects: AudioProject[] = [
  {
    title: "Studio Recording",
    description: "Professional multi-track recording and mixing",
    audioUrl: "/audio/home.mp3",
    tags: ["Recording", "Mixing", "Production"]
  },
  {
    title: "Sound Design",
    description: "Custom sound effects and ambient soundscapes",
    audioUrl: "/audio/home.mp3",
    tags: ["Sound Design", "Synthesis", "Effects"]
  },
  // Add more projects as needed
]

export default function AudioPage() {
  const [selectedProject, setSelectedProject] = useState<AudioProject | null>(null)
  const [visualizerMode, setVisualizerMode] = useState<'bars' | 'circular' | 'wave'>('bars')

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Audio Engineering</h1>
      
      {/* Audio Visualizer */}
      <div className="mb-12">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Live Audio Visualization</h2>
              <p className="text-muted-foreground">
                Real-time frequency analysis and waveform visualization
              </p>
            </div>
            <div className="space-x-2">
              <Button
                variant={visualizerMode === 'bars' ? 'default' : 'outline'}
                onClick={() => setVisualizerMode('bars')}
              >
                Bars
              </Button>
              <Button
                variant={visualizerMode === 'circular' ? 'default' : 'outline'}
                onClick={() => setVisualizerMode('circular')}
              >
                Circular
              </Button>
              <Button
                variant={visualizerMode === 'wave' ? 'default' : 'outline'}
                onClick={() => setVisualizerMode('wave')}
              >
                Wave
              </Button>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg overflow-hidden">
            <AudioVisualizer mode={visualizerMode} />
          </div>
        </Card>
      </div>

      {/* Audio Projects */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {audioProjects.map((project) => (
            <Card key={project.title} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <Button
                onClick={() => setSelectedProject(project)}
                variant="outline"
                className="w-full"
              >
                🎵 Listen to Sample
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Audio Player Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">{selectedProject.title}</h2>
              <Button
                variant="ghost"
                onClick={() => setSelectedProject(null)}
              >
                ✕
              </Button>
            </div>
            <audio
              controls
              className="w-full mb-4"
              src={selectedProject.audioUrl}
            />
            <div className="text-sm text-muted-foreground">
              {selectedProject.description}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
