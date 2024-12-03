import React from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const HelpAndSupport = () => {
  const supportOptions = [
    {
      title: 'Email Support',
      description: 'Send us an email and we\'ll get back to you within 24 hours',
      icon: Mail,
      action: 'chris@chriscelaya.xyz'
    },
    {
      title: 'Phone Support',
      description: 'Available Monday to Friday, 9 AM to 5 PM EST',
      icon: Phone,
      action: '+1 (555) 123-4567'
    },
    {
      title: 'Live Chat (coming soon)',
      description: 'Chat with our support team in real-time',
      icon: MessageCircle,
      action: 'Start Chat'
    }
  ];

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Help & Support</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportOptions.map((option) => (
            <div key={option.title} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center mb-4">
                <option.icon className="w-6 h-6 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold">{option.title}</h2>
              </div>
              <p className="text-gray-600 mb-4">{option.description}</p>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                {option.title === 'Live Chat' ? option.action : `Contact via ${option.title.split(' ')[0]}`}
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">How do I create a new blog post?</h3>
              <p className="text-gray-600">Navigate to the Blog Posts section and click the "New Post" button in the top right corner.</p>
            </div>
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">How can I change my account settings?</h3>
              <p className="text-gray-600">Go to the Settings page from the sidebar menu to manage your account preferences.</p>
            </div>
            <div className="pb-4">
              <h3 className="font-medium mb-2">How do I update my portfolio projects?</h3>
              <p className="text-gray-600">Visit the Projects section to add, edit, or remove portfolio items.</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default HelpAndSupport;
