'use client';

import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import UISettings from '@/components/ui-settings';
import ApiSettings from '@/components/api-settings';

const Settings = () => {
  return (
    <Tabs defaultValue="ui" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="ui">UI</TabsTrigger>
        <TabsTrigger value="api">API</TabsTrigger>
        <TabsTrigger value="help">Help</TabsTrigger>
      </TabsList>
      <TabsContent value="ui">
        <UISettings />
      </TabsContent>
      <TabsContent value="api">
        <ApiSettings />
      </TabsContent>
      <TabsContent value="help">
        <p>Help content</p>
      </TabsContent>
    </Tabs>
  );
};

export default Settings;
