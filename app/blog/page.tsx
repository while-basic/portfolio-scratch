import Link from 'next/link'
import { Breadcrumb } from "@/components/breadcrumb"

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <Breadcrumb />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        
        <div className="space-y-8">
          <article className="bg-card rounded-lg p-6 hover:bg-card/80 transition-colors">
            <Link href="/blog/hello-world">
              <h2 className="text-3xl font-bold mb-2 hover:underline">Hello World</h2>
              <p className="text-muted-foreground mb-4">
                You&apos;ve seen so many videos and blogs mention &apos;Hello World&apos;, but do you really know what it means?
              </p>
              <div className="text-sm text-muted-foreground">
                <span>Written by John Doe</span>
                <span className="mx-2">•</span>
                <span>Sep 20, 2024</span>
              </div>
            </Link>
          </article>
        </div>
      </div>
    </div>
  )
}
