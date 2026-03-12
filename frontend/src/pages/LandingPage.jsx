import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, UserCheck, FileKey, ArrowRight } from 'lucide-react';
import { useKYC } from '../context/KYCContext';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { setCurrentStep } = useKYC();

  useEffect(() => {
    setCurrentStep(1);
  }, [setCurrentStep]);

  const handleStart = () => {
    setCurrentStep(1); // Set to step 1
    navigate('/email-verification');
  };

  return (
    <div className="flex flex-col items-center text-center animate-fade-in-up">
      <div className="w-12 h-12 mb-8 relative group">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
        <div className="w-full h-full bg-gradient-to-tr from-blue-50 to-indigo-100 rounded-[2rem] rotate-3 group-hover:rotate-12 transition-transform duration-500 flex items-center justify-center shadow-inner border border-white">
          <ShieldCheck className="text-blue-600 w-12 h-12 -rotate-3 group-hover:-rotate-12 transition-transform duration-500" strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
        Secure Identity <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Verification</span>
      </h2>

      <p className="text-slate-500 md:text-lg max-w-xl mb-12 leading-relaxed">
        We need to verify your identity to ensure security and comply with regulations.
        It takes just <span className="font-semibold text-slate-700">3 minutes</span> and your data is bank-grade encrypted.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-12 text-left">
        <div className="p-6 bg-white rounded-3xl border border-slate-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex gap-5 items-start">
          <div className="bg-blue-50/50 p-3 rounded-2xl">
            <UserCheck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-1.5">AI-Powered Flow</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Instant document extraction and face match verification.</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300 flex gap-5 items-start">
          <div className="bg-emerald-50/50 p-3 rounded-2xl">
            <FileKey className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-1.5">256-bit Security</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Your data never leaves our secure encrypted vault.</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleStart}
        className="group relative inline-flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-10 py-4 rounded-full font-semibold transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] hover:-translate-y-1 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 ease-in-out"></div>
        <span className="relative z-10 text-lg">Start Verification</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform relative z-10" />
      </button>
    </div>
  );
};
