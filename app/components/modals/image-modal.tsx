'use client'

import React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Image from "next/image"
import { Heart } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  prompt: string
  userName: string
  createdAt: string
  likes: number
  onLike: () => void
  hasLiked: boolean
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  prompt,
  userName,
  createdAt,
  likes,
  onLike,
  hasLiked
}) => {
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
            </div>
          </div>

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