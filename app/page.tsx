"use client";
import React, { useState } from 'react';
import NavTab from '@/components/ui/NavTab';
import ProjectsGrid from '@/components/ui/ProjectGrid';
import ProfileCard from '@/components/ui/ProfileCard';

export default function Page() {
  const [selectedTab, setSelectedTab] = useState('about');

  return (
    <div className="h-screen flex flex-col gap-10 items-center justify-center bg-gray-50 dark:bg-black p-4">
      <NavTab onTabChange={setSelectedTab} />
      <div className="flex-grow flex items-center justify-center w-full overflow-y-auto">
        {selectedTab === 'about' && <ProfileCard />}
        {selectedTab === 'project' && <ProjectsGrid />}
        {/* You can add components for 'blog' and 'contact' here */}
      </div>
    </div>
  );
}