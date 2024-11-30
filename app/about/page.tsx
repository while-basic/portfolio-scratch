import { Metadata } from "next"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "About | Christopher Celaya",
  description: "Learn more about Christopher Celaya and his journey in software development and technology.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Professional Journey</h2>
            <p className="text-muted-foreground mb-4">
              With a unique blend of software development and industrial automation expertise, I bring a diverse perspective to technical challenges. My journey began in industrial automation, where I developed a strong foundation in electrical systems and controls.
            </p>
            <p className="text-muted-foreground">
              Today, I&apos;m focused on software development, combining my hardware knowledge with modern programming practices to create innovative solutions.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Technical Philosophy</h2>
            <p className="text-muted-foreground mb-4">
              I believe in creating software that isn&apos;t just functional, but also maintainable and scalable. My approach combines practical industrial experience with modern development practices.
            </p>
            <p className="text-muted-foreground">
              I&apos;m particularly interested in the intersection of software and hardware, exploring ways to bridge these domains to create more efficient and reliable systems.
            </p>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Core Skills</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Software Development</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">JavaScript</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Industrial Automation</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">PLC Programming</Badge>
                  <Badge variant="secondary">HMI Design</Badge>
                  <Badge variant="secondary">Control Systems</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Continuous Learning</h2>
            <p className="text-muted-foreground">
              I&apos;m constantly exploring new technologies and methodologies, believing that the best solutions come from a combination of proven practices and innovative approaches.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
