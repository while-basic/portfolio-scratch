import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  slug: string; 
}

export function ProjectCard({ 
  title, 
  description, 
  imageUrl, 
  tags,
  githubUrl,
  liveUrl,
  slug
}: ProjectCardProps) {
  const CardContent = () => (
    <div className="bg-[#111111] rounded-lg overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300">
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${title} preview`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            quality={75}
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()} 
            >
              <FaGithub className="text-lg" />
              <span>Code</span>
            </Link>
          )}
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()} 
            >
              <FaExternalLinkAlt className="text-lg" />
              <span>Live Demo</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <Link href={`/projects/${slug}`} className="group block">
      <CardContent />
    </Link>
  );
}
