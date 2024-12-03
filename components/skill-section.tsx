interface SkillSectionProps {
  title: string;
  skills: string[];
}

export function SkillSection({ title, skills }: SkillSectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <li
            key={index}
            className="text-white bg-gray-800 rounded-lg p-3 text-center"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}
