'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PostCard } from '@/components/shared/post-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Post {
  id: string;
  title: string;
  content: string;
  imageSrc: string;
  user: {
    name: string;
    image: string;
    username: string;
  };
  likes: number;
  comments: number;
  createdAt: string;
}

interface FollowedUser {
  id: string;
  name: string;
  username: string;
  image: string;
  bio: string;
  postsCount: number;
  followersCount: number;
}

export default function FollowingPage() {
  const [selectedTab, setSelectedTab] = useState('posts');

  // Mock data - replace with real API call
  const followedUsers: FollowedUser[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      username: 'sarahchen',
      image: '/avatars/sarah.jpg',
      bio: 'AI Artist | Digital Creator',
      postsCount: 156,
      followersCount: 12300
    },
    {
      id: '2',
      name: 'Alex Rivera',
      username: 'arivera',
      image: '/avatars/alex.jpg',
      bio: 'Exploring AI & Art',
      postsCount: 89,
      followersCount: 8900
    },
  ];

  const posts: Post[] = [
    {
      id: '1',
      title: 'Amazing AI-generated landscape',
      content: 'Created this stunning landscape using the latest AI model. #AIArt #Landscape',
      imageSrc: '/placeholder-1.jpg',
      user: followedUsers[0],
      likes: 1234,
      comments: 89,
      createdAt: '2 hours ago'
    },
    {
      id: '2',
      title: 'Portrait series using new techniques',
      content: 'Experimenting with different styles in portrait generation. #AIPortrait',
      imageSrc: '/placeholder-2.jpg',
      user: followedUsers[1],
      likes: 892,
      comments: 45,
      createdAt: '4 hours ago'
    },
  ];

  return (
    <div className="container py-6 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Following</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {followedUsers.map((user) => (
                <div key={user.id} className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium truncate">{user.name}</p>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Following
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{user.bio}</p>
                    <div className="flex gap-4 mt-2 text-sm">
                      <span>{user.postsCount} posts</span>
                      <span>{user.followersCount.toLocaleString()} followers</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Suggested to Follow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">User {i}</p>
                      <p className="text-sm text-muted-foreground">@user{i}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Input 
              placeholder="Search in following..." 
              className="max-w-sm"
            />
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                aspectRatio="square"
              />
            ))}
          </div>

          {posts.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No posts yet</h3>
                <p className="text-muted-foreground mt-1">
                  Follow more creators to see their content here
                </p>
                <Button className="mt-4" variant="outline">
                  Discover Creators
                </Button>
              </CardContent>
            </Card>
          )}

          {posts.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button variant="outline" size="lg">
                Load More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 