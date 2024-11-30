import { ExperienceCard } from "@/components/experience-card";
import { EducationCard } from "@/components/education-card";
import { SkillsTagCloud } from "@/components/skills-tag-cloud";
import { PageLayout } from "@/components/page-layout";

export default function ExperiencePage() {
  const experiences = [
    {
      title: "Data Center Technician II",
      company: "T5 Data Centers",
      location: "San Antonio, Texas",
      period: "2021-2022",
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
      responsibilities: [
        "Troubleshoot electrical and electromechanical operations",
        "Interpret point-to-point diagrams, bill of materials, and wiring schematics",
        "Collaborate with engineering and assembly teams to resolve problems",
        "Use various tools and software for ground fault detection",
        "Oversee testing and assembly of low voltage electronic products for clients"
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

  const education = [
    {
      school: "University of Texas at El Paso",
      program: "Electrical Engineering",
      status: "Attended"
    },
    {
      school: "El Paso Community College",
      program: "Electrical Engineering & Computer Science",
      status: "Attended"
    }
  ];

  const skills = [
    "Python, JavaScript, Java, C, C#",
    "HTML, CSS, React, Node.js",
    "SQL, MongoDB, PostgreSQL",
    "Google Cloud, Azure",
    "Docker",
    "Git",
    "Preventative Maintenance",
    "Software Development",
    "Industrial Manufacturing",
    "Project Management",
    "Product Design and Prototyping",
    "Problem-Solving",
    "Cross-Disciplinary Knowledge"
  ];

  const certifications = [
    "NFPA 70E - Electrical Safety",
    "OSHA 10 - Construction Safety"
  ];

  return (
    <PageLayout>
      <div className="mb-12">
        <h1 className="text-6xl font-bold text-white mb-4">Experience</h1>
        <p className="text-gray-400">
          A comprehensive overview of my professional journey and achievements.
        </p>
      </div>
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} {...experience} />
        ))}
      </div>
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8">Education</h2>
        <div className="bg-[#1C1C1C] rounded-lg p-6">
          {education.map((edu, index) => (
            <EducationCard
              key={index}
              school={edu.school}
              program={edu.program}
              status={edu.status}
            />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8">Skills</h2>
        <div className="bg-[#1C1C1C] rounded-lg p-6">
          <SkillsTagCloud skills={skills} />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-white mb-8">Certifications</h2>
        <div className="bg-[#1C1C1C] rounded-lg p-6">
          <ul className="space-y-2">
            {certifications.map((cert, index) => (
              <li key={index} className="text-gray-300">
                • {cert}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageLayout>
  );
}
