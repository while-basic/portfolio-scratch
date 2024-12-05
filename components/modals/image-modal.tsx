'use client'

import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Image from "next/image"
import { Heart, Trash2, Loader2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { toast } from '@/components/ui/use-toast'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  imageId: string
  prompt: string
  userName: string
  createdAt: string
  likes: number
  onLike: () => void
  hasLiked: boolean
  onDelete?: () => void
  canDelete?: boolean
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageId,
  prompt,
  userName,
  createdAt,
  likes,
  onLike,
  hasLiked,
  canDelete = false
}) => {
  const [isDeleting] = useState(false)
  const [isSharing, setIsSharing] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/delete-from-gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      // Close the modal
      onClose();
      
      toast({
        description: "Image deleted successfully"
      });
      
      // Trigger a page refresh
      window.location.reload();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        description: "Failed to delete image",
        variant: "destructive"
      });
    }
  };

  const handleShareToGallery = async () => {
    try {
      setIsSharing(true);
      
      const response = await fetch('/api/share-to-gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imageUrl: imageUrl,
          prompt: prompt
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      toast({
        title: "Success",
        description: "Image shared to gallery successfully!"
      });
      onClose();
    } catch (error) {
      console.error('Failed to share image:', error);
      toast({
        title: "Error",
        description: "Failed to share image to gallery",
        variant: "destructive"
      });
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] max-w-4xl w-[90vw] p-0 bg-black text-white rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Image Section - 3 columns */}
            <div className="md:col-span-3 relative aspect-square">
              <Image
                src={imageUrl}
                alt={prompt}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Details Section - 2 columns */}
            <div className="md:col-span-2 p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold">{userName}</h3>
                  <p className="text-sm text-neutral-400">
                    {formatDistanceToNow(new Date(createdAt))} ago
                  </p>
                </div>
                <button
                  className={`p-2 rounded-full hover:bg-white/10 ${hasLiked ? "text-pink-500" : "text-white"}`}
                  onClick={onLike}
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-1">Prompt</p>
                <p className="text-sm text-neutral-300">{prompt}</p>
              </div>

              <div className="flex items-center space-x-4 text-sm text-neutral-400">
                <span>{likes} likes</span>
              </div>

              {/* Comments section - To be implemented */}
              <div className="mt-4 flex-1 border-t border-neutral-800">
                <div className="py-4">
                  <p className="text-sm text-neutral-400">
                    Comments coming soon...
                  </p>
                </div>
              </div>

              <button 
                onClick={handleShareToGallery}
                disabled={isSharing}
                className="mt-4 p-2 rounded bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
              >
                {isSharing ? 'Sharing...' : 'Share to Gallery'}
              </button>
            </div>
          </div>

          {canDelete && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 rounded-full hover:bg-white/10 text-red-500 absolute top-4 left-4"
              aria-label="Delete image"
            >
              {isDeleting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Trash2 className="h-5 w-5" />
              )}
            </button>
          )}

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white"
              aria-label="Close"
            >
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ImageModal 