interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageAlt: string;
}

export function ProjectCard({ title, description, tags, imageAlt }: ProjectCardProps) {
  return (
    <div className="bg-[#2C2C2C] rounded-lg overflow-hidden">
      <div className="aspect-video relative">
        <img
          src="/placeholder.jpg"
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-black text-white text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
