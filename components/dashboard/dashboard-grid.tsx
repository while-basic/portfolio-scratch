'use client';

import React from 'react';
import AnalyticsChart from './analytics-chart';
import RecentUsers from './recent-users';
import StatsCard from './stats-card';
import { Users, FolderGit, BarChart3 } from 'lucide-react';

export default function DashboardGrid() {
  return (
    <div className="grid gap-6 p-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Users"
          value="1,234"
          change="+12%"
          trend="up"
          icon={<Users className="w-4 h-4" />}
        />
        <StatsCard
          title="Active Projects"
          value="56"
          change="+8%"
          trend="up"
          icon={<FolderGit className="w-4 h-4" />}
        />
        <StatsCard
          title="Completion Rate"
          value="94%"
          change="+5%"
          trend="up"
          icon={<BarChart3 className="w-4 h-4" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1">
        <RecentUsers />
      </div>
    </div>
  );
}