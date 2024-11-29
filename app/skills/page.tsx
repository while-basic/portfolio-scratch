import { SkillSection } from "@/components/skill-section";

export default function SkillsPage() {
  const skillSections = [
    {
      title: "Mechatronics",
      skills: [
        "PLC Programming",
        "Robotics",
        "Industrial Automation"
      ]
    },
    {
      title: "Software Development",
      skills: [
        "JavaScript",
        "Python",
        "React",
        "Node.js",
        "SQL",
        "Git"
      ]
    },
    {
      title: "Audio Engineering",
      skills: [
        "Pro Tools",
        "Ableton Live",
        "Mixing & Mastering"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-12 text-white">Skills</h1>
        <div className="space-y-12">
          {skillSections.map((section, index) => (
            <SkillSection
              key={index}
              title={section.title}
              skills={section.skills}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
