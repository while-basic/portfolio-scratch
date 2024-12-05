'use client';

import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AISettingsPage() {
  const [aiModel, setAIModel] = useState('gpt-4');
  const [autoSuggestEnabled, setAutoSuggestEnabled] = useState(true);
  const [contextWindowSize, setContextWindowSize] = useState(5);
  const [privacyMode, setPrivacyMode] = useState(false);

  const handleModelChange = (value: string) => {
    setAIModel(value);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">AI Settings</h1>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-md">AI Model</label>
          <Select value={aiModel} onValueChange={handleModelChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              <SelectItem value="claude-2">Claude 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-md">Auto Suggest</label>
          <Switch 
            checked={autoSuggestEnabled}
            onCheckedChange={setAutoSuggestEnabled}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-md">Context Window Size</label>
          <Select 
            value={contextWindowSize.toString()} 
            onValueChange={(value) => setContextWindowSize(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Context Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 Lines</SelectItem>
              <SelectItem value="5">5 Lines</SelectItem>
              <SelectItem value="10">10 Lines</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-md">Privacy Mode</label>
          <Switch 
            checked={privacyMode}
            onCheckedChange={setPrivacyMode}
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500">
          {privacyMode 
            ? "Privacy Mode: AI suggestions will not use external data" 
            : "Privacy Mode: AI may use contextual data for improved suggestions"}
        </p>
      </div>
    </div>
  );
}
