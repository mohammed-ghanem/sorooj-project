
"use client"
// pages/index.tsx
import React from 'react';
import CustomTabs from './VideoLibTabs';


const VideoTabs: React.FC = () => {
  const tabs = [
    { id: 'tab1', title: <div>tab 11</div>, content: <p>Content of Tab 1</p> },
    { id: 'tab2', title:  <div>tab 2</div>, content: <p>Content of Tab 2</p> },
    { id: 'tab3', title:  <div>tab 3</div>, content: <p>Content of Tab 3</p> },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Custom Tabs</h1>
      <CustomTabs tabs={tabs} />
    </div>
  );
};

export default VideoTabs;
