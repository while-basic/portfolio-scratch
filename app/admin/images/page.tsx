"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Image as ImageIcon,
  Settings,
  Clock,
  Loader2,
  Filter,
  Download,
  Trash2,
  Plus,
} from "lucide-react";

export default function ImageGeneration() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Image Generation</h1>
        <div className="flex space-x-4">
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            New Generation
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Queue Status</p>
                <h3 className="text-2xl font-bold mt-1">5 Pending</h3>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Generated Today</p>
                <h3 className="text-2xl font-bold mt-1">128</h3>
              </div>
              <ImageIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
                <h3 className="text-2xl font-bold mt-1">99.2%</h3>
              </div>
              <Filter className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="queue" className="space-y-6">
        <TabsList className="bg-white dark:bg-gray-800 p-1 rounded-lg">
          <TabsTrigger value="queue">Generation Queue</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="presets">Style Presets</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="queue">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Active Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Queue Items */}
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                        <Loader2 className="h-5 w-5 text-gray-500 dark:text-gray-400 animate-spin" />
                      </div>
                      <div>
                        <p className="font-medium">Generation #{item}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Processing... (2 minutes remaining)
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500">
                        Cancel
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
              <CardTitle>Generation History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* History Items */}
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="relative group rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700"
                  >
                    <div className="aspect-square bg-gray-200 dark:bg-gray-600" />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="bg-white dark:bg-gray-800">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="bg-white dark:bg-gray-800">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presets">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Style Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Preset Cards */}
                {[1, 2, 3, 4, 5, 6].map((preset) => (
                  <Card key={preset} className="bg-gray-50 dark:bg-gray-700">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Preset #{preset}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Style description goes here...
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Generation Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Settings Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-50 dark:bg-gray-700">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">API Configuration</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Configure API endpoints and keys
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gray-50 dark:bg-gray-700">
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Default Parameters</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Set default generation parameters
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 