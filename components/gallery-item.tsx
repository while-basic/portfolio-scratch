import Image from "next/image";

interface GalleryItemProps {
  title: string;
  imageAlt: string;
  imageSrc?: string;
  onClick?: () => void;
}

export function GalleryItem({ title, imageAlt, imageSrc, onClick }: GalleryItemProps) {
  // Default image if none provided
  const defaultImage = "/images/placeholder.jpg";
  
  return (
    <div 
      className="relative aspect-square cursor-pointer overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
      onClick={onClick}
    >
      <Image
        src={imageSrc || defaultImage}
        alt={imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        quality={75}
      />
      <div className="absolute inset-0 bg-black/50 flex items-end p-4">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
      </div>
    </div>
  );
}
