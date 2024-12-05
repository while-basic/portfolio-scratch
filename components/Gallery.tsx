'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageItem {
  id: string;
  url: string;
  title: string;
  username: string;
  uploadDate: string;
  likes: number;
  category: string;
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Placeholder data - replace with actual data from your backend
  const images: ImageItem[] = [];
  
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'recent', name: 'Recent Uploads' },
    { id: 'ai', name: 'AI Generated' },
  ];

  return (
    <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Community Gallery</h2>
        
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Upload Button */}
        <div className="text-center mb-8">
          <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Share Your Creation
          </button>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.length > 0 ? (
            images.map((image) => (
              <div
                key={image.id}
                className="relative group aspect-square overflow-hidden rounded-lg bg-gray-100"
              >
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="font-medium">{image.title}</p>
                    <p className="text-sm">by {image.username}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span>❤️ {image.likes}</span>
                      <span>•</span>
                      <span className="text-sm">{image.uploadDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No images to display yet. Be the first to share!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
