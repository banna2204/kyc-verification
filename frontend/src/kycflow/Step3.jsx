import React, { useState } from 'react';
import { Upload, FileCheck } from 'lucide-react';
import ManualUpload from '../components/document/ManualUpload';

const Step3 = ({ formData, setFormData }) => {
  const [digiFetched, setDigiFetched] = useState(false);

  const handleFileChange = (field, file) => {
    setFormData({ ...formData, [field]: file });
  };

  const UploadBox = ({ title, field, currentFile }) => (
    <label className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-[#173300]/40 hover:bg-gray-50 transition-all group">
      <Upload className={`mb-3 transition-colors ${currentFile ? 'text-[#173300]' : 'text-gray-400 group-hover:text-[#173300]'}`} size={28} />
      <span className="text-sm font-bold text-gray-700">{currentFile ? currentFile.name : title}</span>
      <span className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-semibold">JPG, PNG UP TO 10MB</span>
      <input 
        type="file" 
        className="hidden" 
        accept="image/*"
        onChange={(e) => handleFileChange(field, e.target.files[0])} 
      />
    </label>
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <h3 className="text-xl font-bold text-[#173300]">Identity Verification</h3>
      
      {formData.documentType === 'digilocker' ? (
        <div className="mt-4 p-6 border rounded-xl bg-gray-50 flex flex-col items-center text-center space-y-4">
          <FileCheck size={48} className="text-[#173300]" />
          <div>
            <h4 className="font-bold text-gray-800">Fetch from DigiLocker</h4>
            <p className="text-sm text-gray-500 mt-1">Provide your Aadhaar number to fetch documents securely.</p>
          </div>
          <input 
            type="text" 
            placeholder="Enter 12-digit Aadhaar Number" 
            className="border p-3 rounded w-full max-w-sm text-center tracking-widest outline-none focus:border-[#173300]"
            value={formData.digilockerId || ''}
            onChange={(e) => setFormData({...formData, digilockerId: e.target.value})}
          />
          <button 
            onClick={() => setDigiFetched(true)}
            className={`px-6 py-2 rounded text-white font-bold transition-all ${digiFetched ? 'bg-[#9ee86f] text-[#173300]' : 'bg-[#173300]'}`}
          >
            {digiFetched ? '✓ Documents Fetched' : 'Authenticate & Fetch'}
          </button>
        </div>
      ) : (
        <div className="-mt-4">
           <ManualUpload onAllDocumentsUploaded={() => setFormData({...formData, documentsVerified: true })} />
        </div>
      )}
    </div>
  );
};

export default Step3;