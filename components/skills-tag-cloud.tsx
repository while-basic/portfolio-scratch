interface SkillsTagCloudProps {
  skills: string[];
}

export function SkillsTagCloud({ skills }: SkillsTagCloudProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 bg-[#2C2C2C] text-gray-300 rounded-md text-sm"
        >
          {skill}
        </span>
      ))}
    </div>
  );
}
