interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
}

export function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <div className="bg-black border border-gray-800 rounded-lg p-6 text-white">
      <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-white mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-gray-800 text-white rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
