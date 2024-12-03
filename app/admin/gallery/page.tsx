"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GalleryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Gallery</h1>
      <Card>
        <CardHeader>
          <CardTitle>Gallery Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Gallery management functionality coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
