import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKYC } from '../context/KYCContext';
import { User, Calendar, MapPin, Mail, Loader2, ArrowRight } from 'lucide-react';

export const PersonalDetails = () => {
  const navigate = useNavigate();
  const { setCurrentStep, email, fullName, personalDetails, setPersonalDetails } = useKYC();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setCurrentStep(3);
  }, [setCurrentStep]);

  useEffect(() => {
    if (!email) {
      navigate('/email-verification');
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // const response = await fetch('http://localhost:3000/api/kyc/personal-details', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, ...personalDetails })
      // });

      // if (!response.ok) throw new Error('Failed to save details');

      navigate('/document-upload');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100/60 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
        <div className="w-14 h-14 bg-blue-50/80 rounded-2xl flex items-center justify-center shadow-sm border border-blue-100/50">
          <User className="w-7 h-7 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Personal Details</h2>
          <p className="text-slate-500 text-sm mt-1">Please ensure details match your official Govt. ID.</p>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <User size={18} className="text-blue-500" />
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 relative group">
              <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider">Full Legal Name</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} />
                </span>
                <input
                  required
                  type="text"
                  name="fullName"
                  value={personalDetails.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl input-focus-ring outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2 relative group">
              <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider">Date of Birth</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Calendar size={18} />
                </span>
                <input
                  required
                  type="date"
                  name="dob"
                  value={personalDetails.dob}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl input-focus-ring outline-none transition-all text-slate-800 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2 relative group">
              <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  value={personalDetails.email}
                  onChange={handleChange}
                  placeholder="rahul@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl input-focus-ring outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider">Gender</label>
              <select
                required
                name="gender"
                value={personalDetails.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl input-focus-ring outline-none transition-all text-slate-800 font-medium appearance-none cursor-pointer"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
              >
                <option value="" disabled>Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 mb-8 mt-6">
          <h3 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <MapPin size={18} className="text-blue-500" />
            Address Details
          </h3>

          <div className="space-y-2 mb-6">
            <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider">Street Address</label>
            <input
              required
              type="text"
              name="address"
              value={personalDetails.address}
              onChange={handleChange}
              placeholder="e.g. 123 Main St, Apt 4B"
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl input-focus-ring outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider">City</label>
              <input
                required
                type="text"
                name="city"
                value={personalDetails.city}
                onChange={handleChange}
                placeholder="e.g. Mumbai"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl input-focus-ring outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider">State</label>
              <input
                required
                type="text"
                name="state"
                value={personalDetails.state}
                onChange={handleChange}
                placeholder="e.g. Maharashtra"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl input-focus-ring outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-semibold text-slate-700 uppercase tracking-wider">Pincode</label>
              <input
                required
                type="text"
                name="pincode"
                value={personalDetails.pincode}
                onChange={handleChange}
                placeholder="e.g. 400001"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl input-focus-ring outline-none transition-all text-slate-800 font-medium placeholder-slate-400"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="group relative inline-flex items-center gap-2 bg-slate-900 hover:bg-black disabled:bg-slate-300 text-white px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg disabled:shadow-none min-w-[160px] justify-center"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save & Continue'}
            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </form>
    </div>
  );
};
