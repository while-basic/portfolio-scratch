"use client";

import { Card } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-white">Portfolio Dashboard</h1>
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 bg-black border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Total Users</p>
              <h2 className="text-2xl font-bold text-white">1234</h2>
              <p className="text-sm text-green-400">+20.1% from last month</p>
            </div>
            <div className="text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-black border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Emails Collected</p>
              <h2 className="text-2xl font-bold text-white">567</h2>
              <p className="text-sm text-green-400">+10.5% from last month</p>
            </div>
            <div className="text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z"/><polyline points="15,9 18,9 18,11"/><path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2v0"/><line x1="6" y1="10" x2="7" y2="10"/></svg>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-black border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Blog Posts</p>
              <h2 className="text-2xl font-bold text-white">15</h2>
              <p className="text-sm text-neutral-400">2 new posts this month</p>
            </div>
            <div className="text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-black border-neutral-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-400">Total Views</p>
              <h2 className="text-2xl font-bold text-white">45678</h2>
              <p className="text-sm text-green-400">+35.2% from last month</p>
            </div>
            <div className="text-neutral-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="p-4 bg-black border-neutral-800">
          <h2 className="text-xl font-semibold text-white mb-2">Analytics Overview</h2>
          <p className="text-sm text-neutral-400">Your portfolio performance over the last 6 months</p>
          <div className="h-[300px] flex items-center justify-center text-neutral-400">
            Chart visualization will be added here
          </div>
        </Card>

        <div className="grid gap-4 grid-cols-1">
          <Card className="p-4 bg-black border-neutral-800">
            <h2 className="text-xl font-semibold text-white mb-2">Calendar</h2>
            <p className="text-sm text-neutral-400">Keep track of important dates</p>
          </Card>

          <Card className="p-4 bg-black border-neutral-800">
            <h2 className="text-xl font-semibold text-white mb-2">Todo List</h2>
            <p className="text-sm text-neutral-400">Manage your tasks</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
