'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Heart, Share2, Flag, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function DiscussionPage({ params }: { params: { id: string } }) {
  const [replyContent, setReplyContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const discussion = {
    id: params.id,
    title: 'Best practices for prompt engineering',
    content: 'I&apos;ve been experimenting with different prompt styles and would love to hear what works best for others. Share your tips!',
    category: 'Prompt Engineering',
    author: {
      name: 'Sarah Chen',
      avatar: '/avatars/01.png'
    },
    createdAt: '2 days ago',
    likes: 24,
    views: 156,
    isLiked: false,
    isBookmarked: false,
    tags: ['prompts', 'tips', 'best-practices']
  };

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      // Implement reply submission logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReplyContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={discussion.author.avatar} />
                <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{discussion.author.name}</p>
                <p className="text-sm text-muted-foreground">{discussion.createdAt}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Flag className="h-5 w-5" />
            </Button>
          </div>
          <CardTitle className="mt-4">{discussion.title}</CardTitle>
          <div className="flex items-center space-x-2">
            {discussion.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{discussion.content}</p>
          <Separator />
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Heart className={`h-4 w-4 mr-2 ${discussion.isLiked ? 'fill-current' : ''}`} />
              {discussion.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Reply
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Star className={`h-4 w-4 mr-2 ${discussion.isBookmarked ? 'fill-current' : ''}`} />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Reply to Discussion</h2>
        <Card>
          <CardContent className="p-4">
            <form onSubmit={handleSubmitReply}>
              <Textarea
                placeholder="Write your reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[100px] mb-4"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Posting...' : 'Post Reply'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 