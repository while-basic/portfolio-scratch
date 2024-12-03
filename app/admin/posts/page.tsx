"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <Card>
        <CardHeader>
          <CardTitle>Post Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Blog post management functionality coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
