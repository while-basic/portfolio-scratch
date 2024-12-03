'use client';

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb } from "@/components/breadcrumb"
import { withClientBoundary } from "@/components/client-wrapper"

function AboutPage() {
  return (
    <div className="container mx-auto px-4 pt-24 pb-8">
      <Breadcrumb />
      <h1 className="text-4xl font-bold mb-8">About Me</h1>

      <div className="grid grid-cols-1 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-muted-foreground mb-4">
            I am a mechatronic technologist and software developer, where I work on industrial manufacturing equipment,
            software, and web development. Before my obsession with technology, I was primarily focused on music
            production. During COVID-19, I distributed my first album on streaming services such as Apple Music and
            Spotify.
          </p>
          <p className="text-muted-foreground">
            In my spare time, I enjoy investing in learning new things, building web apps, and further expand my
            ideas. I am particularly interested in complex projects with artificial intelligence, virtual reality, industrial
            manufacturing, data centers, and blockchain technology. If you think I can be helpful to you or your cause and
            would like to meet, please feel free to get in touch.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Executive Summary</h2>
          <p className="text-muted-foreground">
            With over 11 years of experience troubleshooting complex electromechanical systems and developing software
            solutions, I believe I have the skills and background to excel in this position. As outlined on my attached resume,
            I have extensive hands-on experience maintaining and repairing industrial equipment and machinery. From
            pneumatic and hydraulic systems to PLCs and HMIs, I have worked with a wide variety of components and
            understand how to keep production lines running smoothly. I also have experience with programming
            languages C Python and JavaScript and have worked on projects involving robotics, computer vision, and
            embedded systems. In addition to my technical expertise, I am an analytical and solutions-oriented
            professional. Whether troubleshooting sudden breakdown or planning major upgrades, I can systematically
            evaluate problems, weigh alternatives, and implement effective solutions.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Objective</h2>
          <p className="text-muted-foreground mb-4">
            To obtain an Industrial Mechanic role that leverages my 11+ years of experience troubleshooting complex
            industrial equipment and developing robust software solutions for manufacturing systems, instrumentation, and
            robotics. I offer my expertise in preventative maintenance, manufacturing processes, and programming
            languages to improve production efficiency, uptime, quality, and innovation.
          </p>
          <p className="text-muted-foreground">
            My goal is to utilize my skill set in automation technologies to reduce downtime and drive process
            improvements through systemic analysis and effective implementations.
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Core Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Industrial Automation</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">PLCs</Badge>
                <Badge variant="secondary">SCADA</Badge>
                <Badge variant="secondary">HMIs</Badge>
                <Badge variant="secondary">Industrial IoT Devices</Badge>
                <Badge variant="secondary">Robotic Proceses</Badge>
                <Badge variant="secondary">Vision Inspection</Badge>
                <Badge variant="secondary">Automated Guided Vehicles (AGVs)</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Machine Learning</Badge>
                <Badge variant="secondary">Artificial Intelligence</Badge>
                <Badge variant="secondary">Deep Learning</Badge>
                <Badge variant="secondary">Virtual Reality</Badge>
                <Badge variant="secondary">Blockchain</Badge>
                <Badge variant="secondary">Data Centers</Badge>
                <Badge variant="secondary">Manufacturing</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Mechanical Systems</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Chillers</Badge>
                <Badge variant="secondary">Hydraulics</Badge>
                <Badge variant="secondary">Compressors</Badge>
                <Badge variant="secondary">Air Handling</Badge>
                <Badge variant="secondary">Pneumatic</Badge>
                <Badge variant="secondary">Conveyors & Material Handling</Badge>
                <Badge variant="secondary">Cooling Towers</Badge>
                <Badge variant="secondary">Plumbing</Badge>
                <Badge variant="secondary">Fire Suppression</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Electrical Systems</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Power Distribution</Badge>
                <Badge variant="secondary">Transformers</Badge>
                <Badge variant="secondary">Circuit Breakers and Switchgear</Badge>
                <Badge variant="secondary">Electric Motors (AC/DC)</Badge>
                <Badge variant="secondary">Variable Frequency Drives (VFDs)</Badge>
                <Badge variant="secondary">Generators and Backup Power Systems</Badge>
                <Badge variant="secondary">Control Panels and PLCs</Badge>
                <Badge variant="secondary">Electrical Grounding</Badge>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Software Development</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">JavaScript</Badge>
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">C</Badge>
                <Badge variant="secondary">C++</Badge>
                <Badge variant="secondary">HTML</Badge>
                <Badge variant="secondary">CSS</Badge>
                <Badge variant="secondary">Tailwind</Badge>
                <Badge variant="secondary">Git</Badge>
                <Badge variant="secondary">GitHub</Badge>
                <Badge variant="secondary">Docker</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">MongoDB</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default withClientBoundary(AboutPage);
