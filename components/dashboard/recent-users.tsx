"use client"

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export interface User {
  id: string
  email: string
  createdAt: string
}

interface RecentUsersProps {
  users?: User[]
}

// todo: replace user emails with first names only
const mockUsers: User[] = [
  {
    id: "1",
    email: "john@example.com",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    email: "sarah@example.com",
    createdAt: "2024-01-02",
  },
  {
    id: "3",
    email: "mike@example.com",
    createdAt: "2024-01-03",
  },
  {
    id: "4",
    email: "lisa@example.com",
    createdAt: "2024-01-04",
  },
]

export default function RecentUsers({ users = mockUsers }: RecentUsersProps) {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>
                  {user.email.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.email}</p>
                <p className="text-xs text-muted-foreground">
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
