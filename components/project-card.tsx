interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageAlt: string;
}

export function ProjectCard({ title, description, tags, imageAlt }: ProjectCardProps) {
  return (
    <div className="bg-[#1C1C1C] rounded-lg overflow-hidden">
      <div className="aspect-video bg-[#2C2C2C] flex items-center justify-center p-4">
        <div className="text-4xl text-gray-400">?</div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
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
    </div>
  );
}
