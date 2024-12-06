"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

interface PostCardProps {
  post: {
    id: string
    title?: string
    content: string
    imageSrc: string
    user: {
      name: string
      image: string
      username: string
    }
    likes: number
    comments: number
    createdAt: string
  }
  onImageClick?: () => void
  aspectRatio?: "square" | "video"
  showFullContent?: boolean
}

export function PostCard({
  post,
  onImageClick,
  aspectRatio = "square",
  showFullContent = false,
}: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      <div 
        className={`relative ${aspectRatio === "square" ? "aspect-square" : "aspect-video"} ${onImageClick ? "cursor-pointer" : ""}`}
        onClick={onImageClick}
      >
        <Image
          src={post.imageSrc}
          alt={post.title || "Post image"}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={post.user.image} />
            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            {post.title && <h3 className="font-semibold">{post.title}</h3>}
            <p className="text-sm text-gray-500">@{post.user.username}</p>
          </div>
        </div>
        
        <p className={`text-sm text-gray-600 mb-4 ${!showFullContent && "line-clamp-2"}`}>
          {post.content}
        </p>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            {post.likes}
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="w-4 h-4 mr-2" />
            {post.comments}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
} 