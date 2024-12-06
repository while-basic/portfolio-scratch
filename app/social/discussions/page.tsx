'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, Users, TrendingUp, PlusCircle, MessageCircleMore } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function DiscussionsPage() {
  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Discussions</h1>
            <p className="text-muted-foreground">
              Join conversations about AI and share your insights
            </p>
          </div>
          <Link href="/social/discussions/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-center font-semibold">Active Discussions</h3>
              <p className="text-center text-3xl font-bold mt-2">128</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <MessageCircleMore className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-center font-semibold">Total Replies</h3>
              <p className="text-center text-3xl font-bold mt-2">1,024</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-center font-semibold">Active Users</h3>
              <p className="text-center text-3xl font-bold mt-2">256</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search discussions..."
            className="max-w-sm"
          />
          <Button variant="outline">
            Filter
          </Button>
        </div>

        {/* Discussion List */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Link key={i} href={`/social/discussions/${i + 1}`}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={`/avatars/0${(i % 3) + 1}.png`} />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Discussion Title {i + 1}</h3>
                        <Badge variant="secondary">AI Ethics</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Started by User {i + 1} • 2 hours ago
                      </p>
                      <p className="text-sm">
                        This is a preview of the discussion content...
                      </p>
                      <div className="flex items-center space-x-4 mt-4">
                        <span className="text-sm text-muted-foreground flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {Math.floor(Math.random() * 50)} replies
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {Math.floor(Math.random() * 100)} participants
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 