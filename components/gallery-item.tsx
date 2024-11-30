interface GalleryItemProps {
  title: string;
  imageAlt: string;
}

export function GalleryItem({ title, imageAlt }: GalleryItemProps) {
  return (
    <div className="relative group">
      <div className="aspect-video bg-[#2C2C2C] rounded-lg overflow-hidden">
        <div className="w-full h-full flex items-center justify-center text-4xl text-gray-400">
          ?
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-opacity rounded-lg flex items-center justify-center">
        <h3 className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
          {title}
        </h3>
      </div>
    </div>
  );
}
