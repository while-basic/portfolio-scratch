import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, Github, Linkedin } from "lucide-react"

export const metadata: Metadata = {
  title: "Resume | Christopher Celaya",
  description: "Professional resume and qualifications of Christopher Celaya - Full Stack Developer",
}

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-5xl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Christopher Celaya</h1>
        <p className="text-xl mb-6 text-muted-foreground">Mechatronic Technician | Software Developer | Audio Engineer</p>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="sm" asChild>
            <a href="mailto:your.email@example.com">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/christophercelaya" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="https://linkedin.com/in/christophercelaya" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          <Button variant="default" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content - Left 2 Columns */}
        <div className="md:col-span-2 space-y-6">
          {/* Professional Summary */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Professional Summary</h2>
            <Card className="p-6">
              <p className="text-muted-foreground">
                Full Stack Developer with expertise in building modern web applications using React, Next.js, and Node.js.
                Passionate about creating intuitive user experiences and writing clean, maintainable code.
                Experienced in working with cross-functional teams and delivering high-quality software solutions.
              </p>
            </Card>
          </section>

          {/* Work Experience */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Work Experience</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold">Full Stack Developer</h3>
                <p className="text-muted-foreground">Company Name • 2021 - Present</p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Developed and maintained multiple web applications using React, Next.js, and Node.js</li>
                  <li>Implemented responsive designs and improved application performance by 40%</li>
                  <li>Collaborated with design team to create intuitive user interfaces</li>
                  <li>Led migration of legacy systems to modern tech stack</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold">Frontend Developer</h3>
                <p className="text-muted-foreground">Previous Company • 2019 - 2021</p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Built responsive web applications using React and TypeScript</li>
                  <li>Implemented state management solutions using Redux and Context API</li>
                  <li>Collaborated with backend team to integrate REST APIs</li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Featured Projects</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold">Personal Portfolio</h3>
                <p className="text-muted-foreground mb-3">Next.js, TypeScript, Tailwind CSS</p>
                <p>Modern portfolio website showcasing projects and skills</p>
              </Card>
            </div>
          </section>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">Node.js</Badge>
              <Badge variant="secondary">JavaScript</Badge>
              <Badge variant="secondary">HTML/CSS</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">Git</Badge>
              <Badge variant="secondary">REST APIs</Badge>
              <Badge variant="secondary">MongoDB</Badge>
              <Badge variant="secondary">PostgreSQL</Badge>
              <Badge variant="secondary">AWS</Badge>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Education</h2>
            <Card className="p-6">
              <h3 className="text-lg font-semibold">Bachelor of Science in Computer Science</h3>
              <p className="text-muted-foreground">University Name</p>
              <p className="text-muted-foreground">2015 - 2019</p>
            </Card>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Certifications</h2>
            <div className="space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold">AWS Certified Developer</h3>
                <p className="text-muted-foreground">Amazon Web Services</p>
              </Card>
            </div>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Languages</h2>
            <ul className="space-y-2">
              <li>English (Native)</li>
              <li>Spanish (Fluent)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
