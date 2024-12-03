"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Users</h1>
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>User management functionality coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
