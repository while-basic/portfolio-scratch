'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, ImageIcon, Users, TrendingUp, Clock, Star, ImagePlus, Share2, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { StatsCard } from './stats-card';

export default function DashboardGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Quick Actions */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Start a new conversation or create content</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Link href="/chat" className="block">
            <Card className="cursor-pointer hover:bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-center font-semibold">New Chat</h3>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Start a conversation with AI
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/image-generation" className="block">
            <Card className="cursor-pointer hover:bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <ImagePlus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-center font-semibold">Generate Image</h3>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Create AI-generated artwork
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/social" className="block">
            <Card className="cursor-pointer hover:bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-center font-semibold">Social Feed</h3>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Connect with other creators
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/gallery" className="block">
            <Card className="cursor-pointer hover:bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-center font-semibold">AI Gallery</h3>
                <p className="text-center text-sm text-muted-foreground mt-2">
                  Browse community creations
                </p>
              </CardContent>
            </Card>
          </Link>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Usage Stats</CardTitle>
          <CardDescription>Monitor your AI usage and credits</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <StatsCard
            title="Total Conversations"
            value="128"
            icon={<MessageSquare className="h-6 w-6" />}
          />
          <StatsCard
            title="Images Generated"
            value="64"
            icon={<ImageIcon className="h-6 w-6" />}
          />
          <StatsCard
            title="Social Connections"
            value="256"
            icon={<Users className="h-6 w-6" />}
          />
          <StatsCard
            title="Gallery Submissions"
            value="32"
            icon={<ImageIcon className="h-6 w-6" />}
          />
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="col-span-2 md:col-span-1">
        <CardHeader>
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            <CardTitle>Trending Topics</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="mr-4 text-2xl font-bold text-muted-foreground">
                  #{i + 1}
                </div>
                <div>
                  <h4 className="font-medium">AI Art Techniques</h4>
                  <p className="text-sm text-muted-foreground">
                    Tips for better prompts
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Content */}
      <Card className="col-span-2 md:col-span-1">
        <CardHeader>
          <div className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            <CardTitle>Featured Content</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center">
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={`/avatars/0${i + 1}.png`} />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">Amazing AI Art</h4>
                  <p className="text-sm text-muted-foreground">
                    by Creator {i + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="col-span-2">
        <CardHeader>
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-blue-500" />
            <CardTitle>Recent Activity</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Generated Image */}
            <div className="flex items-start space-x-4">
              <div className="relative h-24 w-24 rounded-lg overflow-hidden">
                <Image
                  className="object-cover"
                  src="/placeholder.svg"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt="Generated image"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">New Image Generated</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  &ldquo;A futuristic cityscape at sunset&rdquo;
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat Conversation */}
            <div className="flex items-start space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <BrainCircuit className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Chat Conversation</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Discussed AI technology trends
                </p>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Continue Chat
                </Button>
              </div>
            </div>

            {/* Social Interaction */}
            <div className="flex items-start space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">New Connection</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Connected with AI Artist
                </p>
                <Button variant="outline" size="sm">
                  <ImageIcon className="h-4 w-4 text-primary" />
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
