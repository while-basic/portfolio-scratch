interface GalleryFilterProps {
  categories: {
    name: string;
    count: number;
  }[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function GalleryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onCategoryChange(category.name)}
          className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 transition-colors
            ${
              activeCategory === category.name
                ? "bg-white text-black"
                : "bg-[#2C2C2C] text-gray-300 hover:bg-[#3C3C3C]"
            }`}
        >
          <span>{category.name}</span>
          <span className="bg-[#1C1C1C] px-2 py-0.5 rounded-full text-xs">
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
}
