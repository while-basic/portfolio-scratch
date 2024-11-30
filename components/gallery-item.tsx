interface GalleryItemProps {
  title: string;
  imageAlt: string;
}

export function GalleryItem({ title, imageAlt }: GalleryItemProps) {
  return (
    <div className="relative group">
      <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
        <img
          src="/placeholder.jpg"
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <h3 className="text-white text-xl font-semibold">{title}</h3>
        </div>
      </div>
    </div>
  );
}
