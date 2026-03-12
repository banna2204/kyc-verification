import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKYC } from '../context/KYCContext';
import { UploadCloud, CheckCircle2, FileText, Camera, ArrowRight, Loader2 } from 'lucide-react';

export const DocumentUpload = () => {
  const navigate = useNavigate();
  const { setCurrentStep, email, documents, setDocuments } = useKYC();

  const [method, setMethod] = useState('digilocker'); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const aadhaarRef = useRef(null);
  const panRef = useRef(null);
  const selfieRef = useRef(null);

  useEffect(() => {
    setCurrentStep(4);
    if (!email) {
      navigate('/email-verification');
    }
  }, [setCurrentStep, email, navigate]);

  const handleFileChange = (type) => (e) => {
    if (e.target.files && e.target.files[0]) {
      setDocuments(prev => ({ ...prev, [type]: e.target.files[0] }));
    }
  };

  const simulateDigilocker = async () => {
    setLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 2500));

    navigate('/verification');
    setLoading(false);
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!documents.aadhaar || !documents.pan || !documents.selfie) {
      setError('Please upload all required documents.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('email', email);
    formData.append('aadhaar', documents.aadhaar);
    formData.append('pan', documents.pan);
    formData.append('selfie', documents.selfie);

    try {
      const response = await fetch('http://localhost:3000/api/kyc/documents', {
        method: 'POST',
        body: formData, 
      });

      if (!response.ok) throw new Error('Failed to upload documents');

      navigate('/verification');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const FileUploadBox = ({ title, type, file, icon: Icon, fileRef }) => (
    <div
      onClick={() => fileRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 min-h-[160px] group ${file
          ? 'border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50/70 shadow-sm'
          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
        }`}
    >
      <input
        type="file"
        className="hidden"
        ref={fileRef}
        onChange={handleFileChange(type)}
        accept="image/jpeg,image/png,application/pdf"
      />
      {file ? (
        <div className="text-center animate-fade-in-up">
          <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-7 h-7 text-emerald-600" />
          </div>
          <p className="text-sm font-bold text-slate-800 mb-1 truncate max-w-[180px]" title={file.name}>{file.name}</p>
          <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded inline-block">Ready to upload</p>
        </div>
      ) : (
        <div className="text-center group-hover:-translate-y-1 transition-transform duration-300">
          <div className="w-14 h-14 bg-white rounded-full shadow-sm border border-slate-100 flex items-center justify-center mb-4 mx-auto group-hover:shadow-md transition-shadow">
            <Icon className="w-7 h-7 text-blue-500" />
          </div>
          <p className="text-sm font-bold text-slate-700 mb-1">{title}</p>
          <p className="text-xs text-slate-500 font-medium">PDF, JPG or PNG (Max. 5MB)</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 text-center sm:text-left">
        <div className="w-14 h-14 bg-indigo-50/80 rounded-2xl  items-center justify-center shadow-sm border border-indigo-100/50 hidden sm:flex">
          <UploadCloud className="w-7 h-7 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Identity Documents</h2>
          <p className="text-slate-500 text-sm mt-1">Upload clear, readable images of your original documents.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <div className="flex bg-slate-100/80 p-1.5 rounded-2xl mb-8 w-full max-w-md mx-auto sm:mx-0">
        <button
          onClick={() => setMethod('digilocker')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${method === 'digilocker' ? 'bg-white text-indigo-600 shadow-[0_2px_10px_rgb(0,0,0,0.08)]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
        >
          Fast: DigiLocker
        </button>
        <button
          onClick={() => setMethod('manual')}
          className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${method === 'manual' ? 'bg-white text-blue-600 shadow-[0_2px_10px_rgb(0,0,0,0.08)]' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}`}
        >
          Manual Upload
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
          {error}
        </div>
      )}

      {method === 'digilocker' ? (
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50/50 border border-indigo-100/60 rounded-[2rem] p-10 text-center shadow-inner relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Digilocker_logo.svg"
            alt="Digilocker"
            className="h-16 mx-auto mb-8 drop-shadow-sm relative z-10"
            onError={(e) => { e.target.style.display = 'none' }} // fallback if image fails
          />
          <h3 className="text-2xl font-bold text-slate-800 mb-3 relative z-10 tracking-tight">Connect your DigiLocker</h3>
          <p className="text-slate-600 mb-10 max-w-sm mx-auto relative z-10 leading-relaxed">
            Securely fetch your Aadhaar and PAN details directly from Govt. records. No manual uploads required.
          </p>

          <button
            onClick={simulateDigilocker}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-10 py-4 rounded-full font-bold transition-all duration-300 shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-[0_8px_30px_rgb(79,70,229,0.5)] hover:-translate-y-1 mx-auto w-full max-w-xs relative z-10 group"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Authenticate'}
            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />}
          </button>
        </div>
      ) : (
        <form onSubmit={handleManualSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FileUploadBox
              title="Aadhaar Card (Front & Back)"
              type="aadhaar"
              file={documents.aadhaar}
              icon={FileText}
              fileRef={aadhaarRef}
            />
            <FileUploadBox
              title="PAN Card"
              type="pan"
              file={documents.pan}
              icon={FileText}
              fileRef={panRef}
            />
            <FileUploadBox
              title="Live Selfie"
              type="selfie"
              file={documents.selfie}
              icon={Camera}
              fileRef={selfieRef}
            />
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-8 mt-4">
            <button
              type="submit"
              disabled={loading || !documents.aadhaar || !documents.pan || !documents.selfie}
              className="group relative inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.16)] disabled:shadow-none min-w-[200px]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Upload & Proceed'}
              {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
