import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKYC } from '../context/KYCContext';
import { Edit2, ShieldCheck, Loader2, ArrowRight, FileText, User, CheckCircle } from 'lucide-react';

export const SummaryPreview = () => {
  const navigate = useNavigate();
  const { setCurrentStep, email, fullName, personalDetails, documents } = useKYC();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setCurrentStep(6);
    if (!email) {
      navigate('/email-verification');
    }
  }, [setCurrentStep, email, navigate]);

  const handleSubmitFinal = async () => {
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/status');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const PreviewItem = ({ label, value }) => (
    <div className="flex flex-col">
    <span className="text-[13px] font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</span>
    <span className="text-slate-900 font-medium">{value || <span className="text-slate-400 italic">Not Provided</span>}</span>
  </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 animate-fade-in-up">
      <div className="flex items-center gap-5 mb-8 pb-6 border-b border-slate-100/80">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl hidden sm:flex items-center justify-center shadow-sm border border-blue-100/50">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Review Application</h2>
          <p className="text-slate-500 text-sm mt-1.5">Please verify your details before final submission.</p>
        </div>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-8">
        <div className="relative bg-slate-50/50 rounded-3xl p-7 border border-slate-100/80 hover:border-slate-200 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2.5">
              <User className="text-blue-500 w-5 h-5" />
              Personal Details
            </h3>
            <button onClick={() => navigate('/personal-details')} className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-semibold gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-all hover:bg-blue-50 hover:border-blue-200">
              <Edit2 size={14} /> Edit
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-7 gap-x-8">
            <PreviewItem label="Full Name" value={fullName || personalDetails.fullName} />
            <PreviewItem label="Date of Birth" value={personalDetails.dob} />
            <PreviewItem label="Gender" value={personalDetails.gender} />
            <PreviewItem label="Email" value={email} />
            <div className="sm:col-span-2">
              <PreviewItem 
                label="Registered Address" 
                value={`${personalDetails.address || ''}, ${personalDetails.city || ''}, ${personalDetails.state || ''} - ${personalDetails.pincode || ''}`} 
              />
            </div>
          </div>
        </div>

        <div className="relative bg-white border border-slate-200/80 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-800">Submitted Documents</h3>
            <button onClick={() => navigate('/document-upload')} className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-semibold gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm transition-all hover:bg-blue-50 hover:border-blue-200">
              <Edit2 size={14} /> Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['Aadhaar Card', 'PAN Card', 'Live Selfie'].map((docName, i) => (
              <div key={i} className="group bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-3 transition-colors hover:bg-emerald-50 hover:border-emerald-200">
                <div className="w-12 h-12 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-emerald-100 group-hover:border-emerald-200 transition-all duration-300">
                  <ShieldCheck className="text-emerald-500 w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-slate-700">{docName}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100/50 px-2 py-0.5 rounded-full">Verified</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4">
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 border-t border-slate-100 pt-8">
            <button
              onClick={() => navigate('/document-upload')}
              className="w-full sm:w-auto px-6 py-3.5 text-slate-600 font-medium hover:bg-slate-100 rounded-xl transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleSubmitFinal}
              disabled={loading}
              className="w-full sm:w-auto group relative inline-flex items-center gap-2 bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg disabled:shadow-none min-w-[200px] justify-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Confirm Application'}
              {!loading && <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
