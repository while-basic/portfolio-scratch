import { Card } from "@/components/ui/card"
import { Bell, Star, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  type: 'info' | 'warning' | 'success'
  message: string
  time: string
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    message: 'Your monthly usage report is ready',
    time: '5m ago'
  },
  {
    id: '2',
    type: 'success',
    message: 'Successfully generated 10 images',
    time: '1h ago'
  },
  {
    id: '3',
    type: 'warning',
    message: 'Approaching token usage limit',
    time: '2h ago'
  }
]

export function Notifications() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <Badge variant="secondary">3 New</Badge>
      </div>
      <div className="space-y-4">
        {mockNotifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <div className={`p-2 rounded-full ${
              notification.type === 'info' ? 'bg-blue-500/10 text-blue-500' :
              notification.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' :
              'bg-green-500/10 text-green-500'
            }`}>
              {notification.type === 'info' ? <Bell className="h-4 w-4" /> :
               notification.type === 'warning' ? <AlertCircle className="h-4 w-4" /> :
               <Star className="h-4 w-4" />}
            </div>
            <div className="flex-1">
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
} 