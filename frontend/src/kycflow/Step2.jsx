import React, { useEffect } from 'react';
import { ShieldCheck, UploadCloud, Check } from 'lucide-react';

const Step2 = ({ formData, setFormData }) => {
  useEffect(() => {
    if (!formData.documentType) {
      setFormData({...formData, documentType: 'digilocker'});
    }
  }, []);

  return (
    <div className="space-y-6 animate-in slide-in-from-right duration-300">
      <h3 className="text-xl font-bold">Select Verification Method</h3>
      <div className="grid gap-4">
        {[
          { id: 'digilocker', title: 'DigiLocker (Fast & Secure)', icon: <ShieldCheck size={20}/> },
          { id: 'manual', title: 'Manual Document Upload', icon: <UploadCloud size={20}/> }
        ].map(doc => (
          <div key={doc.id} onClick={() => setFormData({...formData, documentType: doc.id})} className={`p-5 rounded-xl border-2 flex items-center justify-between cursor-pointer ${formData.documentType === doc.id ? 'border-[#173300] bg-[#9ee86f] ' : 'border-gray-200'}`}>
            <div className="flex items-center gap-4">
              <span className={formData.documentType === doc.id ? '' : 'text-gray-400'}>{doc.icon}</span>
              <span className="font-bold">{doc.title}</span>
            </div>
            {formData.documentType === doc.id && <Check size={16} className="text-[#173300]" />}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Step2;