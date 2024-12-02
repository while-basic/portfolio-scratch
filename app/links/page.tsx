import { Metadata } from "next"
import { PageLayout } from "@/components/page-layout";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Featured Links | Christopher Celaya",
  description: "A collection of featured miscellaneous projects, urls, and resources by Christopher Celaya. Some projects contain code I did not create.",
}

const links = [
  {
    title: "Modified Vercel AI Chat",
    description: "A modified version of Vercel AI Chat",
    url: "https://ai-chat-one-omega.vercel.app",
  },
  {
    title: "Project Beta",
    description: "Cutting-edge machine learning solutions",
    url: "https://example.com/project-beta",
  },
  // Add more links as needed
];

export default function LinksPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Featured Links</h1>
          <p className="text-xl text-muted-foreground">
            A curated collection of my projects and resources
          </p>
        </div>

        <div className="space-y-4">
          {links.map((link, index) => (
            <Card key={index} className="p-6 hover:bg-accent/50 transition-colors">
              <Link href={link.url} target="_blank" rel="noopener noreferrer"
                className="flex items-start justify-between group">
                <div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary">
                    {link.title}
                  </h2>
                  <p className="text-muted-foreground">{link.description}</p>
                </div>
                <ExternalLink className="w-5 h-5 mt-1 text-muted-foreground group-hover:text-primary" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
