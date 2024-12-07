"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Users,
  Activity,
  AlertCircle,
  Clock,
  Search,
} from "lucide-react";

export default function ChatManagement() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Chat Management</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="outline">
            <AlertCircle className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Sessions</p>
                <h3 className="text-2xl font-bold mt-1">28</h3>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Messages</p>
                <h3 className="text-2xl font-bold mt-1">1,234</h3>
              </div>
              <MessageSquare className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Response Time</p>
                <h3 className="text-2xl font-bold mt-1">1.2s</h3>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
                <h3 className="text-2xl font-bold mt-1">98.5%</h3>
              </div>
              <Activity className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger value="active">Active Sessions</TabsTrigger>
          <TabsTrigger value="history">Chat History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Active Chat Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Active Session Item */}
                {[1, 2, 3].map((session) => (
                  <div
                    key={session}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium">User #{session}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Started 5 minutes ago
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        End
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Chat History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* History items will go here */}
                <p className="text-gray-500 dark:text-gray-400">
                  Chat history will be displayed here...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">
                  Analytics visualization will be displayed here...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Chat Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Settings controls will go here */}
                <p className="text-gray-500 dark:text-gray-400">
                  Chat configuration settings will be displayed here...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 