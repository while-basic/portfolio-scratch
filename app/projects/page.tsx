import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe } from "lucide-react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  slug: string;
}

export const metadata: Metadata = {
  title: "Projects | Christopher Celaya",
  description: "Featured projects and portfolio work by Christopher Celaya",
}

export default function ProjectsPage() {
  const projects: Project[] = [
    {
      title: "Portfolio Website",
      description: "A modern portfolio website built with Next.js and Tailwind CSS, featuring animations and a clean design.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/christophercelaya/portfolio",
      liveUrl: "https://christophercelaya.com",
      imageUrl: "/images/projects/portfolio.webp",
      slug: "portfolio-website"
    },
    {
      title: "EcoTrack",
      description: "Environmental monitoring and data visualization platform",
      tags: ["React", "Node.js", "MongoDB", "D3.js"],
      githubUrl: "https://github.com/christophercelaya/ecotrack",
      liveUrl: "https://ecotrack-demo.com",
      imageUrl: "/images/projects/ecotrack.jpg",
      slug: "ecotrack"
    },
    {
      title: "SmartBudget",
      description: "An intelligent personal finance management system with ML-powered insights and predictions.",
      tags: ["React Native", "TensorFlow.js", "Express", "MySQL", "Plaid API"],
      githubUrl: "https://github.com/christophercelaya/smartbudget",
      liveUrl: "https://smartbudget-app.com",
      imageUrl: "/images/projects/smartbudget.jpg",
      slug: "smartbudget"
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground">A showcase of my recent work and side projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card key={project.slug} className="overflow-hidden">
              {project.imageUrl && (
                <div className="relative h-48 w-full">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button variant="default" size="sm" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <Globe className="mr-2 h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Featured Projects Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Featured Open Source Contributions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Project Name</h3>
              <p className="text-muted-foreground mb-4">
                Description of your contribution to an open source project.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Contribution
                </a>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
