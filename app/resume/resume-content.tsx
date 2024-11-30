"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, Github, Linkedin } from "lucide-react"

export function ResumeContent() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-5xl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Christopher Celaya</h1>
        <p className="text-xl mb-6 text-muted-foreground">Software Developer | Mechatronic Technician | Audio Engineer</p>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="sm" asChild>
            <a href="tel:915-279-0197">
              <Mail className="mr-2 h-4 w-4" />
              915-279-0197
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
                Results-driven and innovative technician with extensive experience in computer science. Expertise in software development and project management, complemented by a strong background in preventative maintenance and industrial manufacturing. Seeking a challenging position to apply technical skills toward the growth and success of a forward-thinking organization.
              </p>
            </Card>
          </section>

          {/* Work Experience */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Work Experience</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold">Data Center Technician II</h3>
                <p className="text-muted-foreground mb-3">T5 Data Centers • San Antonio, Texas • 2021-2022</p>
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Maintain and operate both critical and non-critical data center infrastructure</li>
                  <li>Collaborate with CFT team to ensure 100% uptime while minimizing risks</li>
                  <li>Utilize CMMS for managing scheduled and unscheduled tasks</li>
                  <li>Conduct preventive maintenance on electrical and mechanical equipment</li>
                  <li>Troubleshoot and document technical problems, escalate when necessary</li>
                  <li>Supervise external contractors, ensuring adherence to critical facility work rules</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold">Mechatronics Technician</h3>
                <p className="text-muted-foreground mb-3">CN Wire • Santa Teresa, New Mexico • 2018-2021</p>
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Troubleshoot, maintain, and perform repairs on factory equipment</li>
                  <li>Interpret diagrams, schematics, and electrical code specifications</li>
                  <li>Install and repair electrical components and HMI touch panels</li>
                  <li>Maintain cooling, compression, and emulsion systems</li>
                  <li>Update manufacturing records and process work orders</li>
                  <li>Manage end-to-end electrical projects, minimizing downtime</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold">Wiring Technician | Quality Assurance</h3>
                <p className="text-muted-foreground mb-3">Schneider Electric • El Paso, Texas • 2016-2017</p>
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Assembled and tested electrical panels and control systems</li>
                  <li>Performed quality control inspections on finished products</li>
                  <li>Maintained detailed documentation of assembly processes</li>
                  <li>Collaborated with engineering team on product improvements</li>
                </ul>
              </Card>
            </div>
          </section>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Skills Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Skills</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Programming</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>JavaScript</Badge>
                    <Badge>TypeScript</Badge>
                    <Badge>Python</Badge>
                    <Badge>React</Badge>
                    <Badge>Node.js</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Technical</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>PLC Programming</Badge>
                    <Badge>Electrical</Badge>
                    <Badge>Mechanical</Badge>
                    <Badge>AutoCAD</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge>Git</Badge>
                    <Badge>Docker</Badge>
                    <Badge>AWS</Badge>
                    <Badge>Linux</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Education</h2>
            <Card className="p-6">
              <h3 className="font-semibold">The University of Texas at El Paso</h3>
              <p className="text-muted-foreground">B.S. in Electrical Engineering</p>
              <p className="text-muted-foreground">2015-2018</p>
            </Card>
          </section>

          {/* Certifications Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Certifications</h2>
            <Card className="p-6">
              <ul className="space-y-2 text-muted-foreground">
                <li>AWS Certified Cloud Practitioner</li>
                <li>CompTIA A+</li>
                <li>OSHA 30-Hour Safety</li>
              </ul>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
