'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Users, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Topic {
  id: string;
  title: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  replies: number;
  views: number;
  lastActivity: string;
  tags: string[];
  solved?: boolean;
  trending?: {
    score: number;
    change: string;
  };
}

export default function TrendingDiscussionsPage() {
  // Mock data - replace with real API call
  const topics: Topic[] = [
    {
      id: '1',
      title: 'Best practices for image generation prompts',
      category: 'prompts',
      author: {
        name: 'Sarah Chen',
        avatar: '/avatars/sarah.jpg'
      },
      replies: 23,
      views: 1234,
      lastActivity: '5 minutes ago',
      tags: ['prompts', 'tips', 'image-gen'],
      solved: true,
      trending: {
        score: 98,
        change: '+125%'
      }
    },
    {
      id: '2',
      title: 'How to integrate the API with Next.js',
      category: 'integrations',
      author: {
        name: 'Alex Rivera',
        avatar: '/avatars/alex.jpg'
      },
      replies: 15,
      views: 876,
      lastActivity: '2 hours ago',
      tags: ['api', 'nextjs', 'tutorial'],
      trending: {
        score: 85,
        change: '+82%'
      }
    },
  ];

  const timeRanges = [
    { label: 'Today', value: 'today' },
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
  ];

  const [selectedTimeRange, setSelectedTimeRange] = useState('today');

  return (
    <div className="container py-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Trending Discussions</h1>
        <p className="text-muted-foreground mt-1">
          Popular discussions gaining traction in the community
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Input 
            placeholder="Search trending discussions..." 
            className="max-w-sm"
          />
          <div className="flex items-center gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range.value}
                variant={selectedTimeRange === range.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-0 divide-y divide-border">
            {topics.map((topic) => (
              <Link 
                key={topic.id} 
                href={`/social/discussions/${topic.id}`}
                className="block"
              >
                <div className="p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <span className="text-sm font-medium">{topic.trending?.score}</span>
                      <span className="text-xs text-green-500">{topic.trending?.change}</span>
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={topic.author.avatar} />
                      <AvatarFallback>{topic.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{topic.title}</h3>
                        {topic.solved && (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                            Solved
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{topic.author.name}</span>
                        <span>•</span>
                        <span>{topic.lastActivity}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {topic.tags.map(tag => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {topic.replies}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {topic.views}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {topics.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No trending discussions</h3>
            <p className="text-muted-foreground mt-1">
              Check back later for popular discussions
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 