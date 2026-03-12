import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKYC } from '../context/KYCContext';
import { ScanFace, FileSearch, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const VerificationMock = () => {
  const navigate = useNavigate();
  const { setCurrentStep, email } = useKYC();

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setCurrentStep(5);
    if (!email) {
      navigate('/email-verification');
    }
  }, [setCurrentStep, email, navigate]);

  const loadingSteps = [
    { icon: FileSearch, text: "Scanning Documents for Authenticity", delay: 1500 },
    { icon: ScanFace, text: "Performing Face Match with ID", delay: 3500 },
    { icon: ShieldCheck, text: "Running Background Compliance Checks", delay: 5500 },
    { icon: CheckCircle2, text: "Verification Complete!", delay: 7000 }
  ];

  useEffect(() => {
    let timeouts = [];
    loadingSteps.forEach((step, index) => {
      const timeoutId = setTimeout(() => {
        setActiveStep(index);
        if (index === loadingSteps.length - 1) {
          setTimeout(() => {
            navigate('/summary');
          }, 1500);
        }
      }, step.delay);
      timeouts.push(timeoutId);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [navigate]);

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/80 backdrop-blur-xl p-8 md:p-14 rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-white/60 animate-fade-in-up relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-4 tracking-tight">AI Identity Verification</h2>
        <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium">Please wait while our neural networks analyze your documents securely.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
        <div className="relative flex justify-center items-center h-[400px] bg-gradient-to-b from-slate-50 to-white rounded-[2.5rem] border border-slate-100 shadow-inner overflow-hidden group">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_70%)] opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>
          
          <div className="absolute inset-0 border-[1px] border-blue-200/30 rounded-full scale-[0.3] shadow-[0_0_30px_rgba(59,130,246,0.1)]"></div>
          <div className="absolute inset-0 border-[1px] border-blue-200/20 rounded-full scale-[0.6]"></div>
          <div className="absolute inset-0 border-[1px] border-blue-200/10 rounded-full scale-[0.9]"></div>
          
          <div className="absolute inset-0 flex justify-center items-center">
             <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-[scan_2.5s_ease-in-out_infinite]"></div>
          </div>

          <div className="relative z-10 w-40 h-40 bg-white/90 backdrop-blur-md rounded-[2rem] shadow-2xl flex items-center justify-center border border-white/80 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-[2rem] opacity-50"></div>
            {activeStep === 0 && <FileSearch className="w-20 h-20 text-blue-500 drop-shadow-md animate-pulse" />}
            {activeStep === 1 && <ScanFace className="w-20 h-20 text-indigo-500 drop-shadow-md animate-pulse" />}
            {activeStep === 2 && <ShieldCheck className="w-20 h-20 text-blue-600 drop-shadow-md animate-pulse" />}
            {activeStep === 3 && <CheckCircle2 className="w-20 h-20 text-emerald-500 drop-shadow-md" />}
          </div>
          
          <div className="absolute w-3 h-3 bg-blue-400 rounded-full top-1/4 left-1/4 animate-ping opacity-70 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
          <div className="absolute w-2 h-2 bg-indigo-400 rounded-full bottom-1/3 right-1/4 animate-ping opacity-60 shadow-[0_0_10px_rgba(99,102,241,0.8)]" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute w-2 h-2 bg-emerald-400 rounded-full top-1/3 right-1/3 animate-ping opacity-50 shadow-[0_0_10px_rgba(16,185,129,0.8)]" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="space-y-10 relative">
          <div className="absolute left-[31px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-blue-100 via-slate-100 to-transparent z-0"></div>
          {loadingSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;
            const isPending = index > activeStep;

            return (
               <div key={index} className={`relative z-10 flex items-start gap-8 transition-all duration-700 ${isPending ? 'opacity-30 translate-y-2' : isActive ? 'opacity-100 translate-y-0 scale-105' : 'opacity-100 translate-y-0'}`}>
                <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 z-10 ${isActive ? 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/30 border border-blue-400/50' :
                    isCompleted ? 'bg-gradient-to-br from-emerald-400 to-emerald-500 text-white shadow-lg shadow-emerald-500/20 border border-emerald-300/50' : 'bg-white border-2 border-slate-100 text-slate-300'
                  }`}>
                  <Icon className={`w-7 h-7 transition-colors duration-300 ${isActive || isCompleted ? 'text-white' : ''}`} />
                </div>
                <div className="flex-1 pt-2">
                  <p className={`text-xl font-extrabold tracking-tight transition-colors duration-300 ${isActive ? 'text-slate-900' : isCompleted ? 'text-emerald-700' : 'text-slate-400'}`}>
                    {step.text}
                  </p>
                  {isActive ? (
                    <div className="w-full bg-slate-100 h-2 mt-4 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full w-1/2 rounded-full animate-[progress_1.5s_ease-in-out_infinite] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                    </div>
                  ) : isCompleted ? (
                    <p className="text-sm font-bold text-emerald-600 mt-2 flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Completed successfully</p>
                  ) : (
                    <p className="text-sm font-semibold text-slate-400 mt-2">Waiting in secure queue...</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0%, 100% { transform: translateY(-130px); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          50% { transform: translateY(130px); opacity: 1; }
        }
        @keyframes progress {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
      `}} />
    </div>
  );
};
