"use client";

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'sonner'

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    siteName: 'My Portfolio',
    siteDescription: 'Personal portfolio and blog',
    enableBlog: true,
    enableProjects: true,
    enableComments: true,
    emailNotifications: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Implement settings update API call
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      toast.success('Settings updated successfully')
    } catch (error) {
      toast.error('Failed to update settings')
      console.error('Settings update error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Input
                  id="siteDescription"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                />
              </div>

              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Blog</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable the blog feature
                  </p>
                </div>
                <Switch
                  checked={settings.enableBlog}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableBlog: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Projects</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable the projects section
                  </p>
                </div>
                <Switch
                  checked={settings.enableProjects}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableProjects: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Comments</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable comments on blog posts
                  </p>
                </div>
                <Switch
                  checked={settings.enableComments}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableComments: checked })}
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email notifications for important updates
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
