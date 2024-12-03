interface SkillCardProps {
  title: string;
  percentage: number;
  description: string;
  tags: string[];
}

export function SkillCard({ title, percentage, description, tags }: SkillCardProps) {
  return (
    <div className="bg-[#1C1C1C] rounded-lg p-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <span className="text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full h-1.5 bg-[#2C2C2C] rounded-full mb-4">
        <div 
          className="h-full bg-white rounded-full" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-[#2C2C2C] text-gray-300 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
