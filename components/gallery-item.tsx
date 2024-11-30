import Image from "next/image";

interface GalleryItemProps {
  src: string;
  alt: string;
  onClick: () => void;
}

export function GalleryItem({ src, alt, onClick }: GalleryItemProps) {
  return (
    <div 
      className="relative aspect-square cursor-pointer overflow-hidden rounded-lg hover:opacity-80 transition-opacity"
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={false}
        quality={75}
      />
    </div>
  );
}
