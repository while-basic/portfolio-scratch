'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PostCard } from '@/components/shared/post-card';
import { Flame, TrendingUp } from 'lucide-react';

// interface TrendingPost {
//   id: string;
//   title: string;
//   content: string;
//   imageSrc: string;
//   user: {
//     name: string;
//     image: string;
//     username: string;
//   };
//   likes: number;
//   comments: number;
//   createdAt: string;
//   trendingScore: number;
//   trendingChange: string;
// }

export default function TrendingPage() {
  const [timeRange, setTimeRange] = useState('today');
  const [category, setCategory] = useState('all');

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Trending Content</h1>
          <p className="text-muted-foreground">
            Here&apos;s what&apos;s trending in the community
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="images">AI Images</SelectItem>
              <SelectItem value="prompts">Prompts</SelectItem>
              <SelectItem value="discussions">Discussions</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Flame className="h-5 w-5 text-orange-500 mr-2" />
                    <span className="font-medium">Trending #{i + 1}</span>
                  </div>
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
                <PostCard
                  post={{
                    id: `trending-${i}`,
                    title: `Trending Post ${i + 1}`,
                    content: 'This is a trending post about AI technology...',
                    imageSrc: `/placeholder-${(i % 3) + 1}.jpg`,
                    user: {
                      name: `User ${i + 1}`,
                      image: '/placeholder-avatar.jpg',
                      username: `user${i + 1}`,
                    },
                    likes: Math.floor(Math.random() * 1000),
                    comments: Math.floor(Math.random() * 100),
                    createdAt: '2 hours ago',
                  }}
                  aspectRatio="video"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 