interface ExperienceCardProps {
  title: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export function ExperienceCard({
  title,
  company,
  location,
  period,
  responsibilities,
}: ExperienceCardProps) {
  return (
    <div className="bg-[#1C1C1C] rounded-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-1">{title}</h3>
          <p className="text-gray-400">
            {company} - {location}
          </p>
        </div>
        <span className="text-gray-400">{period}</span>
      </div>
      <ul className="space-y-3">
        {responsibilities.map((responsibility, index) => (
          <li key={index} className="flex items-start text-gray-300">
            <span className="mr-2 text-gray-400">•</span>
            <span>{responsibility}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
