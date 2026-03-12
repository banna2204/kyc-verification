import React from 'react';
import { useKYC } from '../../context/KYCContext';
import { Check } from 'lucide-react';

const steps = [
  'Intro',
  'Mobile',
  'Personal',
  'Documents',
  'Verification',
  'Summary',
  'Status'
];

export const Stepper = () => {
  const { currentStep } = useKYC();

  const extendedSteps = [
    { id: 1, title: 'Welcome to VerifyMe', subtitle: 'Usually takes 2 mins.' },
    { id: 2, title: 'Email Verification', subtitle: null },
    { id: 3, title: 'Personal Details', subtitle: null },
    { id: 4, title: 'Documents Upload', subtitle: null },
    { id: 5, title: 'Verification Processing', subtitle: null },
    { id: 6, title: 'Summary Preview', subtitle: null },
    { id: 7, title: 'Status & Completed', subtitle: null }
  ];

  return (
    <div className="w-full px-8 py-4 hidden md:block">
      <div className="relative flex flex-col gap-10">
        <div className="absolute left-[20px] top-[10px] bottom-[10px] w-[2px] bg-slate-200 z-0" />
        
        <div 
          className="absolute left-[20px] top-[10px] w-[2px] bg-blue-600 z-0 transition-all duration-700 ease-in-out"
          style={{ height: `${Math.max(0, ((currentStep - 1) / (extendedSteps.length - 1)) * 100)}%` }}
        />
        
        {extendedSteps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div key={step.id} className="relative z-10 flex items-start gap-6 group">
              <div 
                className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 relative ${
                  isActive || isCompleted 
                    ? 'bg-blue-50 text-white' 
                    : 'bg-white border-2 border-transparent text-transparent'
                }`}
              >
                {isActive && (
                   <div className="absolute inset-0 bg-blue-100 rounded-full scale-[1.3] opacity-60 animate-pulse"></div>
                )}
                <div className={`w-3.5 h-3.5 rounded-full z-10 ${
                  isActive ? 'bg-blue-600' 
                  : isCompleted ? 'bg-blue-500' 
                  : 'bg-slate-300'
                }`}></div>
              </div>
              
              <div className="flex flex-col pt-1.5 transition-all duration-300 cursor-default">
                <span className={`text-base font-semibold tracking-wide ${
                  isActive ? 'text-slate-900' : isCompleted ? 'text-slate-800' : 'text-slate-500'
                }`}>
                  {step.title}
                </span>
                {isActive && step.subtitle && (
                  <div className="mt-2 bg-blue-50/80 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full inline-flex w-fit shadow-sm border border-blue-100/50">
                    {step.subtitle}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
