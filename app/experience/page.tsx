'use client';

import { PageLayout } from "@/components/page-layout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FaBuilding, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
  technologies?: string[];
}

export default function ExperiencePage() {
  const experiences: Experience[] = [
    {
      title: "Data Center Technician II",
      company: "T5 Data Centers",
      location: "San Antonio, Texas",
      period: "2021-2022",
      technologies: ["CMMS", "Data Center Infrastructure", "Critical Systems", "Preventive Maintenance"],
      responsibilities: [
        "Maintain and operate both critical and non-critical data center infrastructure, equipment, and systems",
        "Collaborate with a team of Critical Facilities Technician (CFT) to ensure total availability (100% uptime) while minimizing risks",
        "Utilize a Computerized Maintenance Management System (CMMS) for managing scheduled and unscheduled data center tasks",
        "Conduct preventive maintenance on electrical and mechanical equipment within the data center",
        "Troubleshoot and document technical problems, escalate when necessary, and ensure resolution",
        "Supervise external contractors, ensuring adherence to critical facility work rules"
      ]
    },
    {
      title: "Mechatronics Technician",
      company: "CN Wire",
      location: "Santa Teresa, New Mexico",
      period: "2018-2021",
      technologies: ["PLC", "HMI", "Industrial IoT", "Electrical Systems", "Automation"],
      responsibilities: [
        "Troubleshoot, maintain, and perform repairs and installations on factory equipment",
        "Interpret diagrams, schematics, and electrical code specification",
        "Install and repair electrical commutators, electronic sensors, and Human Machine Interface (HMI) touch panels",
        "Maintain a number of cooling, compression and emulsion systems required for the facility to maintain operation",
        "Update manufacturing records, process work orders, and installation reports",
        "Install, maintain, and troubleshoot electrical components and equipment for industrial installation",
        "Managed end-to-end electrical projects, minimizing downtime, and ensuring production safety and quality standards are met"
      ]
    },
    {
      title: "Wiring Technician | Quality Assurance",
      company: "Schneider Electric",
      location: "El Paso, Texas",
      period: "2016-2017",
      technologies: ["Quality Control", "Electrical Systems", "Technical Documentation"],
      responsibilities: [
        "Troubleshoot electrical and electromechanical operations",
        "Interpret point-to-point diagrams, bill of materials, and wiring schematics",
        "Collaborate with engineering and assembly teams to resolve problems",
        "Ensure quality standards are met through thorough testing and documentation",
        "Maintain detailed records of quality control processes and outcomes"
      ]
    },
    {
      title: "Maintenance Technician",
      company: "Delfingen",
      location: "El Paso, Texas",
      period: "2015-2016",
      responsibilities: [
        "Manage maintenance on powered industrial equipment, including pneumatic, hydraulic, water, and electrical power",
        "Carry out tasks including PVC cutter repair, electrical troubleshooting, and preventative maintenance",
        "Determine and resolve issues with corrugated screws, cutters, pullies, and printing systems",
        "Complete additional duties such as welding, fabrication, including building maintenance"
      ]
    },
    {
      title: "Maintenance Technician III",
      company: "Dal-Tile",
      location: "El Paso, Texas",
      period: "2013-2015",
      responsibilities: [
        "Install and maintain hydraulic press, electrical panels and mechanical components",
        "Acknowledge machine malfunctions, install electro-mechanical valves, and perform routine maintenance",
        "Carry out additional routine maintenance on raw material conveyors, dust, compression, and cooling systems",
        "Operate industrial hydraulic systems, serve oil changes, and routine die-block quality checks",
        "Manage material processing and storage, including silos, spray dryers, ball mills, and vibrating screens",
        "Monitor material transportation utilizing pneumatic, belt, and elevator conveying systems"
      ]
    }
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Professional Experience</h1>
          <p className="text-xl text-muted-foreground">
            My journey through industrial automation and software development
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <Card key={index} className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{experience.title}</h2>
                  <div className="space-y-2">
                    <div className="flex items-center text-muted-foreground">
                      <FaBuilding className="mr-2" />
                      {experience.company}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <FaMapMarkerAlt className="mr-2" />
                      {experience.location}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <FaCalendarAlt className="mr-2" />
                      {experience.period}
                    </div>
                  </div>
                </div>
                
                {experience.technologies && (
                  <div className="mt-4 md:mt-0">
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Key Responsibilities</h3>
                <ul className="space-y-2">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      <span className="text-muted-foreground">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        {/* Skills Gained Section */}
        <div className="mt-12">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Key Skills Developed</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Industrial Automation</Badge>
                  <Badge variant="secondary">PLC Programming</Badge>
                  <Badge variant="secondary">SCADA Systems</Badge>
                  <Badge variant="secondary">Electrical Systems</Badge>
                  <Badge variant="secondary">Preventive Maintenance</Badge>
                  <Badge variant="secondary">Technical Documentation</Badge>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Project Management</Badge>
                  <Badge variant="secondary">Team Collaboration</Badge>
                  <Badge variant="secondary">Problem Solving</Badge>
                  <Badge variant="secondary">Quality Assurance</Badge>
                  <Badge variant="secondary">Safety Compliance</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
