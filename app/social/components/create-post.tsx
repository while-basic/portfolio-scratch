'use client';

import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ImagePlus, X, Smile, AtSign, Hash } from 'lucide-react';
import Image from 'next/image';

interface CreatePostProps {
  onPost?: (data: { content: string; image?: File }) => void;
}

export function CreatePost({ onPost }: CreatePostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (content.trim() || selectedFile) {
      onPost?.({ content, image: selectedFile || undefined });
      setContent('');
      setSelectedImage(null);
      setSelectedFile(null);
      setIsExpanded(false);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className={`p-4 ${isExpanded ? 'space-y-4' : ''}`}>
        <div className="flex space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/user.jpg" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">
            <Textarea
              placeholder="Share your AI creations..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onClick={() => setIsExpanded(true)}
              className={`min-h-[40px] resize-none transition-all duration-200 ${
                isExpanded ? 'min-h-[120px]' : 'border-transparent'
              }`}
            />
            
            {selectedImage && (
              <div className="relative rounded-lg overflow-hidden bg-muted">
                <div className="aspect-video relative">
                  <Image
                    src={selectedImage}
                    alt="Selected image"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}

            {isExpanded && (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImagePlus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4 mr-2" />
                    Emoji
                  </Button>
                  <Button variant="ghost" size="sm">
                    <AtSign className="h-4 w-4 mr-2" />
                    Mention
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Hash className="h-4 w-4 mr-2" />
                    Tag
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  {isExpanded && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsExpanded(false);
                        setContent('');
                        setSelectedImage(null);
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    onClick={handleSubmit}
                    disabled={!content.trim() && !selectedImage}
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 