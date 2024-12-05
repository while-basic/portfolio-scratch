'use client';

import React, { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function EditorPreferencesPage() {
  const [theme, setTheme] = useState('dark');
  const [fontSize, setFontSize] = useState(14);
  const [lineHeight, setLineHeight] = useState(1.5);
  const [autoSave, setAutoSave] = useState(true);
  const [minimap, setMinimap] = useState(true);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Editor Preferences</h1>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-md">Editor Theme</label>
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="solarized">Solarized</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-md">Font Size</label>
          <Select 
            value={fontSize.toString()} 
            onValueChange={(value) => setFontSize(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Font Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12px</SelectItem>
              <SelectItem value="14">14px</SelectItem>
              <SelectItem value="16">16px</SelectItem>
              <SelectItem value="18">18px</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-md">Line Height</label>
          <Select 
            value={lineHeight.toString()} 
            onValueChange={(value) => setLineHeight(Number(value))}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Line Height" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1.2">1.2</SelectItem>
              <SelectItem value="1.5">1.5</SelectItem>
              <SelectItem value="2.0">2.0</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <label className="text-md">Auto Save</label>
          <Switch 
            checked={autoSave}
            onCheckedChange={setAutoSave}
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="text-md">Minimap</label>
          <Switch 
            checked={minimap}
            onCheckedChange={setMinimap}
          />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500">
          Customize your editor experience with these preferences.
        </p>
      </div>
    </div>
  );
}
