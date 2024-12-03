import React from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { Mail, Send, Archive, Trash2, Plus, Filter } from 'lucide-react';

const EmailCampaigns = () => {
  const campaigns = [
    {
      id: 1,
      name: 'Welcome Newsletter',
      status: 'Sent',
      recipients: 1234,
      openRate: '68%',
      sentDate: '2024-01-15',
    },
    {
      id: 2,
      name: 'Monthly Update',
      status: 'Draft',
      recipients: 1500,
      openRate: '-',
      sentDate: '-',
    },
    {
      id: 3,
      name: 'Product Launch',
      status: 'Scheduled',
      recipients: 2000,
      openRate: '-',
      sentDate: '2024-01-20',
    },
  ];

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Mail className="w-6 h-6 mr-2" />
            <h1 className="text-2xl font-bold">Email Campaigns</h1>
          </div>
          <div className="flex space-x-3">
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-700">Total Sent</h3>
            <p className="text-3xl font-bold text-blue-800">4,734</p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-green-700">Average Open Rate</h3>
            <p className="text-3xl font-bold text-green-800">65.8%</p>
          </div>
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-purple-700">Active Subscribers</h3>
            <p className="text-3xl font-bold text-purple-800">2,156</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sent Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${campaign.status === 'Sent' ? 'bg-green-100 text-green-800' : 
                        campaign.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.recipients.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.openRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {campaign.sentDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Send className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Archive className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default EmailCampaigns;
