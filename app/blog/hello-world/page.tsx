import Link from 'next/link'

export default function HelloWorldPost() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center px-4 py-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            Back
          </Link>
        </div>

        <article className="prose prose-invert max-w-none">
          <h1>Hello World</h1>
          <p className="text-muted-foreground">
            You&apos;ve seen so many videos and blogs mention &apos;Hello World&apos;, but do you really know what it means?
          </p>

          <div className="text-sm text-muted-foreground mb-8">
            <span>Written by John Doe</span>
            <span className="mx-2">•</span>
            <span>Sep 20, 2024</span>
          </div>

          <h2>What is &quot;Hello World&quot;?</h2>
          <p>
            &quot;Hello World&quot; is essentially a way to confirm that everything is working as expected. When
            you write and run this program, it outputs the phrase &quot;Hello, World!&quot; to the screen, showing
            that your environment is set up correctly. Every programming language has its own
            syntax for doing this, and it&apos;s the perfect way to get comfortable with the basics.
          </p>

          <h2>A Simple Example in Python:</h2>
          <pre><code className="language-python">print(&quot;Hello, World!&quot;)</code></pre>

          <p>
            That&apos;s it! Running this code will output the text to the console, and boom—you&apos;ve just
            written your first Python program.
          </p>
        </article>
      </div>
    </div>
  )
}
