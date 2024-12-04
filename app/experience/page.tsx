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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-foreground">Professional Experience</h1>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="p-6 bg-card text-card-foreground">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col space-y-2">
                    <h2 className="text-2xl font-semibold text-foreground">{exp.title}</h2>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <FaBuilding className="text-primary" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <FaMapMarkerAlt className="text-primary" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <FaCalendarAlt className="text-primary" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground">Key Responsibilities:</h3>
                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
