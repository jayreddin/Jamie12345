'use client';

import React from 'react';
import {Label} from '@/components/ui/label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select';
import {Slider} from '@/components/ui/slider';
import {Button} from '@/components/ui/button';

const UISettings = () => {
  return (
    <div className="grid gap-4">
      <div>
        <Label htmlFor="theme">Theme</Label>
        <Select>
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
        <Slider id="text-size" defaultValue={[12]} max={20} step={1} />
      </div>
      <Button>Save</Button>
    </div>
  );
};

export default UISettings;
