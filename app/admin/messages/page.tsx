"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MessagesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Messages</h1>
      <Card>
        <CardHeader>
          <CardTitle>Message Center</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Message management functionality coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
