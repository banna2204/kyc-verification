import React from 'react';
import { Outlet } from 'react-router-dom';
import { Stepper } from './Stepper';
import { Shield } from 'lucide-react';

export const Layout = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm sticky top-0 z-50">
        <div className="w-full px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <span className="font-bold text-2xl tracking-tight">
              Verify<span className="font-medium">Me</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium">
            <span className="hidden sm:block cursor-pointer hover:text-green-100 transition-colors">Need Help?</span>
            <div className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
            <div className="flex items-center justify-center p-2 rounded-full hover:bg-white/10 cursor-pointer transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 w-full max-w-[1400px] mx-auto bg-white relative">
        <aside className="hidden md:block w-[300px] lg:w-[350px] shrink-0 border-r border-gray-100 bg-white min-h-[calc(100vh-64px)] relative pt-8 pb-10">
          <Stepper />
        </aside>

        <main className="flex-1 px-4 sm:px-8 lg:px-16 py-8 md:py-12 bg-[#FAFBFA] min-h-[calc(100vh-64px)] overflow-x-hidden relative">
          <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
