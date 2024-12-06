"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SocialFeed } from './components/social-feed';
import { BrainCircuit, ImageIcon, MessageSquare, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function SocialPage() {
  const [/* selectedTab */, /* setSelectedTab */] = useState("feed");

  return (
    <div className="container py-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] gap-6">
        {/* Left Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Discover</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/social/trending">
                <Button variant="ghost" className="w-full justify-start" size="lg">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Trending
                </Button>
              </Link>
              <Link href="/social/following">
                <Button variant="ghost" className="w-full justify-start" size="lg">
                  <Users className="mr-2 h-4 w-4" />
                  Following
                </Button>
              </Link>
              <Link href="/social/gallery">
                <Button variant="ghost" className="w-full justify-start" size="lg">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  AI Gallery
                </Button>
              </Link>
              <Link href="/social/discussions">
                <Button variant="ghost" className="w-full justify-start" size="lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Discussions
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Popular Tags</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="secondary" size="sm" className="mr-2">
                #AIArt
              </Button>
              <Button variant="secondary" size="sm" className="mr-2">
                #DigitalArt
              </Button>
              <Button variant="secondary" size="sm" className="mr-2">
                #AIPortrait
              </Button>
              <Button variant="secondary" size="sm" className="mr-2">
                #Landscape
              </Button>
              <Button variant="secondary" size="sm" className="mr-2">
                #AICreative
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <Input 
              placeholder="Search posts..." 
              className="max-w-sm"
            />
            <Tabs defaultValue="trending" className="flex-1">
              <TabsList>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="latest">Latest</TabsTrigger>
                <TabsTrigger value="following">Following</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <SocialFeed />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trending Creators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-muted" />
                    <div>
                      <p className="font-medium">Creator {i}</p>
                      <p className="text-sm text-muted-foreground">@creator{i}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trending Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <BrainCircuit className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">#AIArt</p>
                    <p className="text-sm text-muted-foreground">1.2k posts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <ImageIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">#ImageGeneration</p>
                    <p className="text-sm text-muted-foreground">856 posts</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MessageSquare className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">#ChatGPT</p>
                    <p className="text-sm text-muted-foreground">623 posts</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 