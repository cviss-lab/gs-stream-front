import React from 'react';
import TopNavigation from '../components/controls/TopNavigation';

export function ViewerLayout({ leftPanel, mainContent }) {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopNavigation />
      <div className="flex flex-1 overflow-hidden">
        {leftPanel}
        {mainContent}
      </div>
    </div>
  );
}
