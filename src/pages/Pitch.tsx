import React, { useState } from 'react';
import Sidebar, { Footer } from '@/components/layout/Sidebar';
import { RightSidebar } from '@/components/layout/RightSidebar';
import MainContent from '@/components/pitch/MainContent';
import PitchDetailsPage from '@/components/pitch/PitchDetails';
import PitchFAQ from '@/components/pitch/PitchFAQ';
import PitchAnalysis from '@/components/pitch/PitchAnalyticsGraph';

type View = 'main' | 'details' | 'faq' | 'analysis';

// Main Component
const Pitch = () => {
   const [currentView, setCurrentView] = useState<View>('main');
  return (
    <div className="flex h-screen overflow-x-hidden dark:bg-black
    dark:text-white">
      {/* Sidebar */}
      <div className="fixed max-md:hidden left-0 top-0 w-[245px] max-lg:w-10 dark:dark-color max-md:w-0 h-full z-50 dark:bg-[#0f001a]">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="dark:text-white max-[769px]:mb-10 flex flex-1 max-lg:ml-[80px] max-lg:mr-0 ml-[245px] mr-[350px] justify-center max-md:ml-0 max-md:mr-0 dark:bg-[#0f001a]">
        {currentView === 'main' && <MainContent onNavigate={setCurrentView} />}
        {currentView === 'details' && <PitchDetailsPage onNavigate={setCurrentView} />}
        {currentView === 'faq' && <PitchFAQ onNavigate={setCurrentView} />}
        {currentView === 'analysis' && <PitchAnalysis onNavigate={setCurrentView} />}
        <div className='lg:hidden z-40 dark:bg-[#0f001a]'> <Footer /></div>
      </main>
        
   

      {/* Right Sidebar */}
      <div className="fixed max-md:hidden max-lg:hidden right-0 top-0 w-[350px] max-md:w-0 h-full z-40 bg-white dark:bg-[#0f001a]">
        <RightSidebar />
      </div>
    </div>
  );
};

export default Pitch;