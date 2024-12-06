'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CreatePost } from './create-post';

interface Post {
  id: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

export function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      user: {
        name: 'Sarah Chen',
        username: 'sarahchen',
        avatar: '/avatars/sarah.jpg'
      },
      content: 'Just experimented with the new image generation model. The results are incredible! 🎨 #AIArt #DigitalCreation',
      image: '/images/ai-art-1.jpg',
      likes: 128,
      comments: 24,
      timestamp: '2 hours ago',
      isLiked: false,
      isSaved: false
    },
    {
      id: '2',
      user: {
        name: 'Alex Rivera',
        username: 'arivera',
        avatar: '/avatars/alex.jpg'
      },
      content: 'Created this stunning landscape using the new terrain generation feature. What do you think? 🌄 #AILandscape #DigitalArt',
      image: '/images/ai-art-2.jpg',
      likes: 256,
      comments: 42,
      timestamp: '4 hours ago',
      isLiked: true,
      isSaved: true
    }
  ]);

  const handleCreatePost = async (data: { content: string; image?: File }) => {
    // In a real app, you would upload the image to your storage service
    // and create the post through your API
    const newPost: Post = {
      id: Date.now().toString(),
      user: {
        name: 'Current User',
        username: 'currentuser',
        avatar: '/avatars/user.jpg'
      },
      content: data.content,
      image: data.image ? URL.createObjectURL(data.image) : undefined,
      likes: 0,
      comments: 0,
      timestamp: 'Just now',
      isLiked: false,
      isSaved: false
    };

    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isSaved: !post.isSaved
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <CreatePost onPost={handleCreatePost} />

      {/* Posts Feed */}
      {posts.map(post => (
        <Card key={post.id} className="overflow-hidden">
          {/* Post Header */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.user.avatar} />
                <AvatarFallback>{post.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.user.name}</p>
                <p className="text-sm text-muted-foreground">@{post.user.username} · {post.timestamp}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-3">
            <p className="text-sm whitespace-pre-wrap">{post.content}</p>
          </div>

          {/* Post Image */}
          {post.image && (
            <div className="relative aspect-[4/3] bg-muted">
              <Image
                src={post.image}
                alt="Post image"
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Post Actions */}
          <div className="p-4 flex items-center justify-between border-t">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleLike(post.id)}
                className={cn(post.isLiked && "text-red-500")}
              >
                <Heart className={cn("h-4 w-4 mr-2", post.isLiked && "fill-current")} />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="h-4 w-4 mr-2" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => handleSave(post.id)}
              className={cn(post.isSaved && "text-blue-500")}
            >
              <Bookmark className={cn("h-4 w-4", post.isSaved && "fill-current")} />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
} 