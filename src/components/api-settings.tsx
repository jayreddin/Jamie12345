'use client';

import React from 'react';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

const ApiSettings = () => {
  return (
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
      <div>
        <Label htmlFor="api-key">API Key</Label>
        <Input type="password" id="api-key" placeholder="Enter API Key" />
      </div>
      <Button>Save</Button>
    </div>
  );
};

export default ApiSettings;
