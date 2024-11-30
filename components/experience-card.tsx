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
    <div className="bg-[#111111] rounded-lg p-8 border border-white/5 shadow-xl backdrop-blur-sm hover:border-white/10 transition-all duration-300">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-blue-400 mb-1">{company}</p>
          <p className="text-gray-500 text-sm">{location}</p>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="inline-block px-4 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
            {period}
          </span>
        </div>
      </div>
      
      <ul className="space-y-2 mt-6">
        {responsibilities.map((responsibility, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-400">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-500 flex-shrink-0" />
            <span className="leading-relaxed">{responsibility}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
