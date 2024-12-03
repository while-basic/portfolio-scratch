import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout";
import { Card } from "@/components/ui/card";
import { Github } from "lucide-react";
import { getProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";
import { ProjectLinkButton } from "@/components/project-link-button";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Project } from "@/lib/projects"; 

export const metadata: Metadata = {
  title: "Projects | Christopher Celaya",
  description: "Featured projects and portfolio work by Christopher Celaya",
}

// This ensures the page is statically generated at build time
export const revalidate = 3600; // Revalidate every hour

async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-xl text-muted-foreground">A showcase of my recent work and side projects</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              tags={project.tags}
              githubUrl={project.githubUrl}
              liveUrl={project.liveUrl}
              slug={project.slug}
            />
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Open Source Contributions</h2>
          <div className="grid grid-cols-1 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-2">Open Source Project Name</h3>
              <p className="text-muted-foreground mb-4">
                Description of your contribution to an open source project.
              </p>
              <ProjectLinkButton variant="outline" size="sm" href="#">
                <Github className="mr-2 h-4 w-4" />
                View Contribution
              </ProjectLinkButton>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default ProjectsPage;
