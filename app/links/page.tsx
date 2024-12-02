import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout";
import { Card } from "@/components/ui/card";
import { ExternalLink, Github, Linkedin, Globe, Code, Headphones } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Links | Christopher Celaya",
  description: "Connect with Christopher Celaya through various social platforms and explore featured projects.",
}

const links = {
  social: [
    {
      title: "GitHub",
      description: "Check out my open source projects and contributions",
      url: "https://github.com/while-basic",
      icon: <Github className="w-5 h-5" />,
    },
    {
      title: "LinkedIn",
      description: "Connect with me professionally",
      url: "https://linkedin.com/in/christophercelaya",
      icon: <Linkedin className="w-5 h-5" />,
    },
  ],
  projects: [
    {
      title: "Portfolio Website",
      description: "My personal portfolio website",
      url: "https://chriscelaya.com",
      icon: <Globe className="w-5 h-5" />,
    },
    {
      title: "Modified Vercel AI Chat",
      description: "A modified version of Vercel AI Chat",
      url: "https://ai-chat-one-omega.vercel.app",
      icon: <Code className="w-5 h-5" />,
    },
  ],
  music: [
    {
      title: "SoundCloud",
      description: "Listen to my music productions and mixes",
      url: "https://soundcloud.com/",
      icon: <Headphones className="w-5 h-5" />,
    },
  ],
};

export default function LinksPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Links</h1>
          <p className="text-xl text-muted-foreground">
            Connect with me and explore my work
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Social</h2>
            <div className="space-y-4">
              {links.social.map((link, index) => (
                <Card key={index} className="p-6 hover:bg-accent/50 transition-colors">
                  <Link href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-start justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-muted-foreground group-hover:text-primary">
                        {link.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                          {link.title}
                        </h3>
                        <p className="text-muted-foreground">{link.description}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-primary" />
                  </Link>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="space-y-4">
              {links.projects.map((link, index) => (
                <Card key={index} className="p-6 hover:bg-accent/50 transition-colors">
                  <Link href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-start justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-muted-foreground group-hover:text-primary">
                        {link.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                          {link.title}
                        </h3>
                        <p className="text-muted-foreground">{link.description}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-primary" />
                  </Link>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Music</h2>
            <div className="space-y-4">
              {links.music.map((link, index) => (
                <Card key={index} className="p-6 hover:bg-accent/50 transition-colors">
                  <Link href={link.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-start justify-between group">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 text-muted-foreground group-hover:text-primary">
                        {link.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                          {link.title}
                        </h3>
                        <p className="text-muted-foreground">{link.description}</p>
                      </div>
                    </div>
                    <ExternalLink className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-primary" />
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
