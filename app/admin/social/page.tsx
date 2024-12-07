"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Twitter, Instagram, Youtube } from "lucide-react";

export default function SocialPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Social Media Integration</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Twitter className="h-5 w-5" />
              Twitter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" placeholder="Enter Twitter API key" />
              </div>
              <Button className="w-full">Connect Twitter</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Instagram className="h-5 w-5" />
              Instagram
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Access Token</Label>
                <Input type="password" placeholder="Enter Instagram access token" />
              </div>
              <Button className="w-full">Connect Instagram</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Youtube className="h-5 w-5" />
              YouTube
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" placeholder="Enter YouTube API key" />
              </div>
              <Button className="w-full">Connect YouTube</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 