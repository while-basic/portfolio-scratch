"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, Github, Linkedin } from "lucide-react"
import { CodeIcon, GlobeIcon, Settings2Icon, BotIcon, WrenchIcon } from "@/components/icons"
import { AudioPlayer } from "@/components/ui/audio-player"
import { Breadcrumb } from "@/components/breadcrumb"

export default function ResumePage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8 max-w-5xl">
      <Breadcrumb />
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Christopher Celaya</h1>
        <p className="text-xl mb-6 text-muted-foreground">Mechatronic Technician | Software Developer | Audio Engineer</p>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" size="sm" asChild>
            <a href="tel:915-279-0197">
              <Mail className="mr-2 h-4 w-4" />
              915-279-0197
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="https://github.com/while-basic" target="_blank" rel="noopener noreferrer">
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
        
        {/* Audio Players */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <AudioPlayer
            src="/audio/cover-letter.wav"
            title="AI Podcast | Cover Letter"
          />
          <AudioPlayer
            src="/audio/resume.wav"
            title="AI Podcast | Resume"
          />
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
                  <li>Maintain and operate both critical and non-critical data center infrastructure, equipment, and systems</li>
                  <li>Collaborate with a team of Critical Facilities Technician (CFT) to ensure total availability (100% uptime) while minimizing risks</li>
                  <li>Utilize a Computerized Maintenance Management System (CMMS) for managing scheduled and unscheduled data center tasks</li>
                  <li>Conduct preventive maintenance on electrical and mechanical equipment within the data center</li>
                  <li>Troubleshoot and document technical problems, escalate when necessary, and ensure resolution</li>
                  <li>Supervise external contractors, ensuring adherence to critical facility work rules</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold">Mechatronics Technician</h3>
                <p className="text-muted-foreground mb-3">CN Wire • Santa Teresa, New Mexico • 2018-2021</p>
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Troubleshoot, maintain electrical repairs and installations on factory equipment</li>
                  <li>Interpret diagrams, schematics, and electrical code specification</li>
                  <li>Install and repair electrical commutators, electronic sensors, and Human Machine Interface (HMI) touch panels</li>
                  <li>Maintain a number of cooling, compression and emulsion systems required for the facility to maintain operation</li>
                  <li>Update manufacturing records, process work orders, and installation reports</li>
                  <li>Install, maintain, and troubleshoot electrical components and equipment for industrial installation</li>
                  <li>Managed end-to-end electrical projects, minimizing downtime, and ensuring production safety and quality standards are met</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold">Wiring Technician | Quality Assurance</h3>
                <p className="text-muted-foreground mb-3">Schneider Electric • El Paso, Texas • 2016-2017</p>
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Troubleshoot electrical and electromechanical operations</li>
                  <li>Interpret point-to-point diagrams, bill of materials, and wiring schematics</li>
                  <li>Collaborate with engineering and assembly teams to resolve problems</li>
                  <li>Use various tools and software for ground fault detection</li>
                  <li>Oversee testing and assembly of low voltage electronic products for clients</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold">Maintenance Technician</h3>
                <p className="text-muted-foreground mb-3">Delfingen • El Paso, Texas • 2015-2016</p>
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Manage maintenance on powered industrial equipment, including pneumatic, hydraulic, water, and electrical power</li>
                  <li>Carry out tasks including PVC cutter repair, electrical troubleshooting, and preventative maintenance</li>
                  <li>Determine and resolve issues with corrugated screws, cutters, pullers, and printing systems</li>
                  <li>Complete additional duties such as welding, fabrication, including building maintenance</li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold">Maintenance Technician III</h3>
                <p className="text-muted-foreground mb-3">Dal-Tile • El Paso, Texas • 2013-2015</p>
                <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
                  <li>Install and maintain hydraulic press, electrical panels and mechanical components</li>
                  <li>Acknowledge machine malfunctions, install electro-mechanical valves, and perform routine maintenance</li>
                  <li>Carry out additional routine maintenance on raw material conveyors, dust, compression, and cooling systems</li>
                  <li>Operate industrial hydraulic systems, serve oil changes, and routine die-block quality checks</li>
                  <li>Manage materials processing and storage, including silos, spray dryers, ball mills, and vibrating screens</li>
                  <li>Monitor material transportation utilizing pneumatic, belt, and elevator conveying systems</li>
                </ul>
              </Card>
            </div>
          </section>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Technical Skills Section */}
          <section>
            <div className="grid gap-4">
              <h2 className="text-2xl font-bold">Technical Skills</h2>
              
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  <div className="flex items-center">
                    <CodeIcon className="w-5 h-5 mr-2" />
                    Programming & Development
                  </div>
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Python</Badge>
                  <Badge variant="outline">JavaScript</Badge>
                  <Badge variant="outline">Java</Badge>
                  <Badge variant="outline">C</Badge>
                  <Badge variant="outline">C#</Badge>
                  <Badge variant="outline">HTML</Badge>
                  <Badge variant="outline">CSS</Badge>
                  <Badge variant="outline">React</Badge>
                  <Badge variant="outline">Node.js</Badge>
                  <Badge variant="outline">Next.js</Badge>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  <div className="flex items-center">
                    <GlobeIcon className="w-5 h-5 mr-2" />
                    Database & Cloud Technologies
                  </div>
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">SQL</Badge>
                  <Badge variant="outline">MongoDB</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                  <Badge variant="outline">Google Cloud</Badge>
                  <Badge variant="outline">Azure</Badge>
                  <Badge variant="outline">Docker</Badge>
                  <Badge variant="outline">Git</Badge>
                  <Badge variant="outline">Version Control</Badge>
                  <Badge variant="outline">CI/CD</Badge>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  <div className="flex items-center">
                    <Settings2Icon className="w-5 h-5 mr-2" />
                    Industrial Automation
                  </div>
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">PLC Programming</Badge>
                  <Badge variant="outline">HMI Integration</Badge>
                  <Badge variant="outline">SCADA Systems</Badge>
                  <Badge variant="outline">Electrical Systems</Badge>
                  <Badge variant="outline">Mechanical Systems</Badge>
                  <Badge variant="outline">Pneumatics</Badge>
                  <Badge variant="outline">Hydraulics</Badge>
                  <Badge variant="outline">Industrial IoT</Badge>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  <div className="flex items-center">
                    <WrenchIcon className="w-5 h-5 mr-2" />
                    Professional Skills
                  </div>
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Project Management</Badge>
                  <Badge variant="outline">Preventative Maintenance</Badge>
                  <Badge variant="outline">Quality Assurance</Badge>
                  <Badge variant="outline">Technical Documentation</Badge>
                  <Badge variant="outline">Problem Solving</Badge>
                  <Badge variant="outline">Team Leadership</Badge>
                  <Badge variant="outline">Cross-functional Collaboration</Badge>
                  <Badge variant="outline">Process Optimization</Badge>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  <div className="flex items-center">
                    <BotIcon className="w-5 h-5 mr-2" />
                    AI & Machine Learning
                  </div>
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Large Language Models</Badge>
                  <Badge variant="outline">Computer Vision</Badge>
                  <Badge variant="outline">Natural Language Processing</Badge>
                  <Badge variant="outline">TensorFlow</Badge>
                  <Badge variant="outline">PyTorch</Badge>
                  <Badge variant="outline">Neural Networks</Badge>
                </div>
              </Card>
            </div>
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Education</h2>
            <Card className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Computer Programming & Computer Science</h3>
                  <p className="text-muted-foreground">El Paso Community College</p>
                </div>
                <div>
                  <h3 className="font-semibold">Electrical Engineering</h3>
                  <p className="text-muted-foreground">University of Texas at El Paso</p>
                </div>
              </div>
            </Card>
          </section>

          {/* Certifications Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Certifications</h2>
            <Card className="p-6">
              <ul className="space-y-2 text-muted-foreground">
                <li>NFPA 70E: Electrical Safety</li>
                <li>OSHA 10: Construction Safety</li>
              </ul>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
