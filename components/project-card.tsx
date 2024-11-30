import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
}

export function ProjectCard({ title, description, imageUrl, tags }: ProjectCardProps) {
  return (
    <div className="bg-[#111111] rounded-lg overflow-hidden border border-white/5">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={`${title} preview`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
