"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Admin Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Settings management functionality coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
