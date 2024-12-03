import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/components/admin/protected-route';
import { Settings as SettingsIcon, User, Globe, Bell, Shield, Save, Loader2 } from 'lucide-react';
import { settingsService, type Settings } from '@/lib/services/settings';
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const [settings, setSettings] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await settingsService.getAll();
      setSettings(settingsService.parseSettings(data));
    } catch (error) {
      toast.error('Failed to load settings');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const settingsToUpdate = Object.entries(settings).map(([key, value]) => ({
        key,
        value
      }));
      await settingsService.updateBulk(settingsToUpdate);
      toast.success('Settings saved successfully');
    } catch (error) {
      toast.error('Failed to save settings');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const settingsSections = [
    {
      id: 'profile',
      title: 'Profile Settings',
      icon: User,
      settings: [
        {
          id: 'name',
          label: 'Display Name',
          type: 'text',
          description: 'This is your public display name.'
        },
        {
          id: 'email',
          label: 'Email Address',
          type: 'email',
          description: 'Your email address for notifications.'
        },
        {
          id: 'bio',
          label: 'Biography',
          type: 'textarea',
          description: 'Brief description for your profile.'
        }
      ]
    },
    {
      id: 'site',
      title: 'Site Settings',
      icon: Globe,
      settings: [
        {
          id: 'siteTitle',
          label: 'Site Title',
          type: 'text',
          description: 'Your website title that appears in the browser tab.'
        },
        {
          id: 'metaDescription',
          label: 'Meta Description',
          type: 'textarea',
          description: 'Description that appears in search engine results.'
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Notification Settings',
      icon: Bell,
      settings: [
        {
          id: 'emailNotifications',
          label: 'Email Notifications',
          type: 'checkbox',
          description: 'Receive email notifications for important updates.'
        },
        {
          id: 'messageAlerts',
          label: 'Message Alerts',
          type: 'checkbox',
          description: 'Get notified when someone sends you a message.'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security Settings',
      icon: Shield,
      settings: [
        {
          id: 'twoFactor',
          label: '2-Factor Authentication',
          type: 'toggle',
          description: 'Add an extra layer of security to your account.'
        },
        {
          id: 'sessionTimeout',
          label: 'Session Timeout',
          type: 'select',
          options: [
            { value: '15', label: '15 minutes' },
            { value: '30', label: '30 minutes' },
            { value: '60', label: '1 hour' }
          ],
          description: 'Automatically log out after period of inactivity.'
        }
      ]
    }
  ];

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <SettingsIcon className="w-6 h-6 mr-2" />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-6">
            {settingsSections.map((section) => (
              <div key={section.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <section.icon className="w-5 h-5 mr-2 text-gray-600" />
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                  </div>

                  <div className="space-y-6">
                    {section.settings.map((setting) => (
                      <div key={setting.id} className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                        <div className="lg:col-span-1">
                          <label htmlFor={setting.id} className="block text-sm font-medium text-gray-700">
                            {setting.label}
                          </label>
                          <p className="mt-1 text-sm text-gray-500">{setting.description}</p>
                        </div>
                        <div className="lg:col-span-2">
                          {setting.type === 'text' || setting.type === 'email' ? (
                            <input
                              type={setting.type}
                              id={setting.id}
                              value={settings[setting.id] || ''}
                              onChange={(e) => handleChange(setting.id, e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          ) : setting.type === 'textarea' ? (
                            <textarea
                              id={setting.id}
                              value={settings[setting.id] || ''}
                              onChange={(e) => handleChange(setting.id, e.target.value)}
                              rows={3}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          ) : setting.type === 'checkbox' ? (
                            <input
                              type="checkbox"
                              id={setting.id}
                              checked={settings[setting.id] || false}
                              onChange={(e) => handleChange(setting.id, e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                          ) : setting.type === 'toggle' ? (
                            <button
                              type="button"
                              onClick={() => handleChange(setting.id, !settings[setting.id])}
                              className={`${
                                settings[setting.id] ? 'bg-blue-600' : 'bg-gray-200'
                              } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                            >
                              <span
                                className={`${
                                  settings[setting.id] ? 'translate-x-5' : 'translate-x-0'
                                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                              />
                            </button>
                          ) : setting.type === 'select' ? (
                            <select
                              id={setting.id}
                              value={settings[setting.id] || ''}
                              onChange={(e) => handleChange(setting.id, e.target.value)}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                              {setting.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Settings;
