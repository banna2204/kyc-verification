import React, { useState } from 'react';
import { Info, User, Scan, FileCheck, Check } from 'lucide-react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import TextRoll from '../components/TextRoll';


const KycVerification = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', lastName: '', phone: '',
    zip: '', city: '', currency: 'Gel', docType: 'id_card',
    country: '', state: '',
    idFront: null,
  });

  const steps = [
    { id: 1, title: 'Personal Information', icon: <Info size={18} /> },
    { id: 2, title: 'Traders Profile', icon: <User size={18} /> },
    { id: 3, title: 'Identity Verification', icon: <Scan size={18} /> },
    { id: 4, title: 'Terms & Submission', icon: <FileCheck size={18} /> },
  ];

  // Validation Check before proceeding to the next step
  const canProceed = () => {
    if (step === 1) {
      return Boolean(
        formData.name && 
        formData.lastName && 
        formData.dob && 
        formData.phone && 
        formData.country && 
        formData.state && 
        formData.city && 
        formData.zip
      );
    }
    return true;
  };

  return (
    <div className="min-h-screen  p-8 md:px-16 md:py-6 font-sans ">
      <div className="max-w-6xl mx-auto text-gray-800">
        <div className="mb-12">
          <h1 className="text-3xl font-bold tracking-tighter text-[#173300]">
            <TextRoll center>
          KYC VERIFICATION
          </TextRoll>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Verify your Identity and get Started</p>
          <div className="h-0.5 bg-gray-300 w-full mt-8 opacity-50"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 relative">
          {/* SIDEBAR STEPPER (Exact Alignment preserved) */}
          <div className="w-full lg:w-72 relative">
                
                 <div className="absolute -right-8.5 top-0 h-105 w-0.5 bg-gray-300 hidden lg:block"></div>
            <div className="flex flex-col gap-14">
              {steps.map((s) => (
                <div key={s.id} className="flex items-center justify-end gap-6 relative">
                  <div className="text-right">
                    <p className={`text-sm font-bold transition-all ${step === s.id ? 'text-[#173300]' : 'text-gray-500'}`}>{s.title}</p>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest mt-0.5 font-semibold">Step {s.id}/4</p>
                  </div>
                  <div className={`z-10 w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-300
                    ${step >= s.id ? 'bg-[#173300] border-[#9ee86f] text-white' : 'bg-[#9ee86f] border-[#173300] text-[#173300]'}`}>
                    {step > s.id ? <Check size={18} strokeWidth={3} /> : s.icon}
                  </div>
                 
                  <div className={`absolute -right-9.75 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-[#9ee86f] z-20 hidden lg:block ${step >= s.id ? 'bg-[#173300]' : 'bg-white'}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* DYNAMIC FORM AREA */}
          <div className="flex-1 flex flex-col min-h-[400px]">
            <div className="flex-1 relative">
              {step === 1 && <Step1 formData={formData} setFormData={setFormData} />}
              {step === 2 && <Step2 formData={formData} setFormData={setFormData} />}
              {step === 3 && <Step3 formData={formData} setFormData={setFormData} />}
              {step === 4 && <Step4 formData={formData} />}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-100 relative z-20 bg-white">
              <button 
                onClick={() => setStep(step - 1)} 
                disabled={step === 1} 
                className={`px-10 py-3 rounded-xl border-2 border-[#173300] cursor-pointer font-bold text-sm transition-all ${step === 1 ? 'opacity-30 cursor-not-allowed border-gray-200 text-gray-400' : 'text-[#173300] hover:bg-[#e2fbc7]'}`}
              >
                Back
              </button>
              <button 
                disabled={!canProceed()}
                onClick={() => {
                  if (step === 3 && formData.documentType === 'manual' && !formData.documentsVerified) {
                    alert('Please upload and verify all 3 documents (Aadhaar, PAN, and Photo) before continuing.');
                    return;
                  }
                  step === 4 ? alert('Submitted') : setStep(step + 1);
                }} 
                className={`px-10 py-3 rounded-xl text-white font-bold text-sm border-2 transition-all ${canProceed() ? 'bg-[#173300] border-[#173300] cursor-pointer hover:bg-[#1a4a00] active:scale-95 shadow-md hover:shadow-lg' : 'bg-gray-300 border-gray-300 cursor-not-allowed text-gray-400'}`}
              >
                {step === 4 ? 'Submit Verification' : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KycVerification;