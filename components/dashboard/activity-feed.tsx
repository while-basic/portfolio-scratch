import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Image as ImageIcon, FileText, Settings } from "lucide-react"

interface Activity {
  id: string
  type: 'message' | 'image' | 'document' | 'setting'
  description: string
  timestamp: string
  user?: {
    name: string
    avatar?: string
  }
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'message',
    description: 'Started a new chat conversation',
    timestamp: '2 minutes ago',
    user: {
      name: 'John Doe',
      avatar: '/avatars/user-1.png'
    }
  },
  {
    id: '2',
    type: 'image',
    description: 'Generated new AI image',
    timestamp: '1 hour ago',
    user: {
      name: 'Sarah Smith',
      avatar: '/avatars/user-2.png'
    }
  },
  {
    id: '3',
    type: 'document',
    description: 'Created new AI document',
    timestamp: '3 hours ago'
  }
]

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'message':
      return <MessageSquare className="h-4 w-4" />
    case 'image':
      return <ImageIcon className="h-4 w-4" />
    case 'document':
      return <FileText className="h-4 w-4" />
    case 'setting':
      return <Settings className="h-4 w-4" />
  }
}

export function ActivityFeed() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="p-2 rounded-full bg-muted">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
              {activity.user && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
} 