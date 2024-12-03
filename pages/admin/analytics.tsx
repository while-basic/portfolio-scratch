import React from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { BarChart2, TrendingUp, Users, Eye, Clock, Download, Calendar, Filter } from 'lucide-react';

const Analytics = () => {
  const metrics = [
    { name: 'Total Views', value: '124,567', change: '+12.5%', icon: Eye },
    { name: 'Unique Visitors', value: '45,789', change: '+8.2%', icon: Users },
    { name: 'Avg. Time', value: '3m 45s', change: '+2.1%', icon: Clock },
    { name: 'Bounce Rate', value: '32.4%', change: '-5.8%', icon: TrendingUp },
  ];

  const pageViews = [
    { page: '/portfolio', views: 12500, uniqueVisitors: 8900 },
    { page: '/blog', views: 8700, uniqueVisitors: 6200 },
    { page: '/about', views: 5400, uniqueVisitors: 4100 },
    { page: '/contact', views: 3200, uniqueVisitors: 2800 },
    { page: '/projects', views: 2900, uniqueVisitors: 2100 },
  ];

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <BarChart2 className="w-6 h-6 mr-2" />
            <h1 className="text-2xl font-bold">Analytics</h1>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Last 30 Days
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {metrics.map((metric) => (
            <div key={metric.name} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{metric.name}</p>
                  <p className="text-2xl font-bold mt-1">{metric.value}</p>
                </div>
                <metric.icon className="w-6 h-6 text-gray-400" />
              </div>
              <div className={`mt-2 text-sm ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change} from last month
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Traffic Overview</h2>
            <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
              [Traffic Chart Placeholder]
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Top Pages</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 text-sm font-semibold text-gray-600">Page</th>
                    <th className="text-right py-3 text-sm font-semibold text-gray-600">Views</th>
                    <th className="text-right py-3 text-sm font-semibold text-gray-600">Unique Visitors</th>
                  </tr>
                </thead>
                <tbody>
                  {pageViews.map((page) => (
                    <tr key={page.page} className="border-b">
                      <td className="py-3 text-sm">{page.page}</td>
                      <td className="text-right py-3 text-sm">{page.views.toLocaleString()}</td>
                      <td className="text-right py-3 text-sm">{page.uniqueVisitors.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Analytics;
