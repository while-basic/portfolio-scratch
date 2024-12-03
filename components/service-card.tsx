"use client"

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

export function ServiceCard({ icon, title, description, link }: ServiceCardProps) {
  return (
    <div className="rounded-xl p-6 bg-[#111111] border border-gray-800">
      <div className="text-3xl mb-6 text-white">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-white">
        {title}
      </h3>
      <p className="text-gray-400 mb-6 text-base leading-relaxed">
        {description}
      </p>
      <a
        href={link}
        className="text-white hover:text-gray-300 inline-flex items-center text-sm font-medium"
      >
        Learn More →
      </a>
    </div>
  );
}
