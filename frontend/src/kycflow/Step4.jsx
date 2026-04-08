import React from 'react';
import { FileCheck, FileText, ShieldCheck } from 'lucide-react';

const Step4 = ({ formData }) => {
  return (
    <div className="space-y-6 animate-in zoom-in duration-300">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-[#9ee86f] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <FileCheck className="text-[#173300]" size={30} />
        </div>
        <h3 className="text-2xl font-bold text-[#173300]">Ready to Submit</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto mt-2">
          Please review your details below before taking the final step to submit your KYC verification.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Section 1: Personal Data */}
        <div className="p-6 border-b border-gray-100">
          <h4 className="text-sm font-bold text-[#173300] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9ee86f]"></span> Personal Information
          </h4>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">First Name</p>
              <p className="font-semibold text-gray-800">{formData.name || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Last Name</p>
              <p className="font-semibold text-gray-800">{formData.lastName || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
              <p className="font-semibold text-gray-800">{formData.dob || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Phone Number</p>
              <p className="font-semibold text-gray-800">{formData.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Country</p>
              <p className="font-semibold text-gray-800">{formData.country || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">State / Province</p>
              <p className="font-semibold text-gray-800">{formData.state || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">City</p>
              <p className="font-semibold text-gray-800">{formData.city || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Zip / Postal Code</p>
              <p className="font-semibold text-gray-800">{formData.zip || 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Trading / Additional Info */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h4 className="text-sm font-bold text-[#173300] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9ee86f]"></span> Trading Profile
          </h4>
          <div className="grid grid-cols-1 gap-y-4 gap-x-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">Document Base Region</p>
              <p className="font-semibold text-gray-800 uppercase">{formData.docType ? formData.docType.replace('_', ' ') : 'Not provided'}</p>
            </div>
          </div>
        </div>

        {/* Section 3: Document Status */}
        <div className="p-6">
          <h4 className="text-sm font-bold text-[#173300] uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9ee86f]"></span> Verification Method
          </h4>
          <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#e2fbc7] rounded-lg">
                <ShieldCheck className="text-[#173300]" size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-800 text-sm">
                  {formData.documentType === 'digilocker' ? 'DigiLocker Verification' : 'Manual Document Upload'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {formData.documentType === 'digilocker' ? 'Documents synced automatically' : (formData.documentsVerified ? 'Documents uploaded & ready' : 'Uploads required/missing')}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${(formData.documentType === 'digilocker' || formData.documentsVerified)
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
                }`}>
                {(formData.documentType === 'digilocker' || formData.documentsVerified) ? 'Valid' : 'Pending Action'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
