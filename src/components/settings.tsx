'use client';

import React, {useState, useCallback} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Slider} from '@/components/ui/slider';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useSettings} from '@/hooks/use-settings';

const Settings = () => {
  const {
    theme,
    setTheme,
    textSize,
    setTextSize,
    openRouterApiKey,
    setOpenRouterApiKey,
    activeModel,
    setActiveModel,
  } = useSettings();
  const [tempOpenRouterApiKey, setTempOpenRouterApiKey] = useState(openRouterApiKey);

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  const handleTextSizeChange = useCallback(
    (value: number[]) => {
      setTextSize(value[0]);
    },
    [setTextSize]
  );

  const handleSaveSettings = () => {
    if (tempOpenRouterApiKey !== openRouterApiKey) {
      setOpenRouterApiKey(tempOpenRouterApiKey);
    }
    alert('Settings saved!');
  };

  const handleModelChange = (value: string) => {
    setActiveModel(value);
  };

  return (
    <Tabs defaultValue="ui" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="ui">UI</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="help">Help</TabsTrigger>
      </TabsList>
      <TabsContent value="ui">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select value={theme} onValueChange={handleThemeChange}>
              <SelectTrigger id="theme">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="text-size">Text Size</Label>
            <Slider
              id="text-size"
              defaultValue={[textSize]}
              max={20}
              step={1}
              onValueChange={handleTextSizeChange}
            />
          </div>
        </div>
      </TabsContent>
      <TabsContent value="api">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="api-provider">API Provider</Label>
            <Select>
              <SelectTrigger id="api-provider">
                <SelectValue placeholder="Select API Provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="openrouter">OpenRouter</SelectItem>
                <SelectItem value="puter">Puter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* OpenRouter Settings */}
          <div>
            <Label htmlFor="openrouter-api-key">OpenRouter API Key</Label>
            <Input
              type="password"
              id="openrouter-api-key"
              placeholder="Enter OpenRouter API Key"
              value={tempOpenRouterApiKey}
              onChange={(e) => setTempOpenRouterApiKey(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="openrouter-model">OpenRouter Model</Label>
            <Select value={activeModel} onValueChange={handleModelChange}>
              <SelectTrigger id="openrouter-model">
                <SelectValue placeholder="Select OpenRouter Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mistralai/Mistral-7B-Instruct-v0.1">
                  Mistral 7B Instruct
                </SelectItem>
                <SelectItem value="google/gemma-7b">Gemma 7B</SelectItem>
                {/* Add more models as needed */}
              </SelectContent>
            </Select>
          </div>

          {/* Puter Settings */}
          <div>
            <Button onClick={() => window.open('https://puter.com', '_blank')}>
              Login to Puter.com
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="help">
        <p>Help content</p>
      </TabsContent>
      <Button onClick={handleSaveSettings}>Save</Button>
    </Tabs>
  );
};

export default Settings;
