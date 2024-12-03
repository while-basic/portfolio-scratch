import React from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { BarChart2, Users, FileText, Mail } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { name: 'Total Users', value: '1,234', icon: Users },
    { name: 'Blog Posts', value: '45', icon: FileText },
    { name: 'Emails Sent', value: '2,456', icon: Mail },
    { name: 'Engagement Rate', value: '78%', icon: BarChart2 },
  ];

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.name}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
                <stat.icon className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
