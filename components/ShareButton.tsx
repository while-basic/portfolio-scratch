'use client';

import { useState } from 'react';
import { shareToTwitter, shareToLinkedIn, downloadImage } from '@/utils/share';

export default function ShareButton({ imageUrl, description }: { imageUrl: string; description: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
        aria-label="Share"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl z-10">
          <button
            onClick={() => {
              shareToTwitter(window.location.href, description);
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Share on Twitter
          </button>
          <button
            onClick={() => {
              shareToLinkedIn(window.location.href);
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Share on LinkedIn
          </button>
          <button
            onClick={() => {
              downloadImage(imageUrl, 'ai-generated-image.jpg');
              setIsOpen(false);
            }}
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
} 