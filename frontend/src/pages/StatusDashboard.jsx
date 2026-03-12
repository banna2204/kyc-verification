import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKYC } from '../context/KYCContext';
import { CheckCircle2, XCircle, Clock, AlertCircle, Activity, CheckCircle, Loader2 } from 'lucide-react';

export const StatusDashboard = () => {
  const navigate = useNavigate();
  const { setCurrentStep, email, fullName } = useKYC();

  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setCurrentStep(7);
  }, [setCurrentStep]);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!email) {
        navigate('/email-verification');
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/api/kyc/status/${email}`);
        if (!response.ok) throw new Error('Failed to fetch status');

        const data = await response.json();
        const serverData = data.user;
        
        const timelineEvents = serverData.timelineEvents || [
          { status: 'Email Verified', message: 'Email address verified successfully.', timestamp: new Date(Date.now() - 3600000).toISOString() },
          { status: 'Details Submitted', message: 'Personal details saved.', timestamp: new Date(Date.now() - 1800000).toISOString() },
          { status: 'Documents Uploaded', message: 'Aadhaar, PAN & Selfie uploaded.', timestamp: new Date().toISOString() }
        ];

        setStatusData({
          status: serverData.status || 'Pending Verification',
          timelineEvents: timelineEvents,
          fullName: serverData.fullName
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [email, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-500 font-medium">Fetching your KYC status...</p>
      </div>
    );
  }

  if (error && !statusData) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button onClick={() => navigate('/')} className="text-blue-600 font-medium hover:underline">Return Home</button>
      </div>
    );
  }

  const { status, timelineEvents } = statusData;

  const getStatusConfig = (s) => {
    switch (s) {
      case 'Approved':
        return { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50', border: 'border-green-200', text: 'KYC Approved', bgColor: 'from-green-400' };
      case 'Rejected':
        return { icon: XCircle, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-200', text: 'KYC Rejected', bgColor: 'from-red-400' };
      default:
        return { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200', text: 'Pending Verification', bgColor: 'from-amber-400' };
    }
  };

  const statusInfo = getStatusConfig(status);

  const mockData = {
    referenceId: 'APP-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
    submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
    estimatedCompletion: '2-4 hours',
    timeline: timelineEvents.map(event => ({
      step: event.status,
      status: 'Completed', 
      date: new Date(event.timestamp).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }))
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className={`relative overflow-hidden bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border ${statusInfo.border} mb-8 animate-fade-in-up`}>
        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${statusInfo.bgColor} to-transparent opacity-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none`}></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-6 group">
            <div className={`absolute inset-0 rounded-full blur-xl opacity-40 transition-opacity group-hover:opacity-60 ${statusInfo.bgColor}`}></div>
            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center bg-white shadow-xl border-4 ${statusInfo.border} transition-transform group-hover:scale-105 duration-300`}>
              <statusInfo.icon className={`w-12 h-12 ${statusInfo.color}`} />
            </div>
          </div>

          <p className="text-blue-600 font-bold mb-2 tracking-wide uppercase text-sm">Welcome back, {fullName || statusData.fullName}</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
            Hello, {fullName || statusData.fullName}
          </h2>
          <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">
            {status === 'Pending Verification'
              ? "We are currently reviewing your documents. This usually takes between 2-4 hours."
              : status === 'Approved'
                ? "Your identity has been successfully verified. You now have full access."
                : "Unfortunately, we could not verify your identity. Please check your email for details."}
          </p>

          {status === 'Pending Verification' && (
            <div className="mt-8 flex items-center gap-2.5 text-sm font-bold text-amber-700 bg-amber-50 px-5 py-2.5 rounded-full border border-amber-200/60 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
              </span>
              Analysis in progress
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
        <div className="md:col-span-2">
          <div className="bg-white p-7 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100/80 sticky top-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              Application Details
            </h3>
            <div className="space-y-5">
              <div className="flex flex-col gap-1.5 pb-5 border-b border-slate-100/80">
                <span className="text-slate-400 text-[13px] font-semibold uppercase tracking-wider">Reference ID</span>
                <span className="text-slate-900 font-bold font-mono text-base">{mockData.referenceId}</span>
              </div>
              <div className="flex flex-col gap-1.5 pb-5 border-b border-slate-100/80">
                <span className="text-slate-400 text-[13px] font-semibold uppercase tracking-wider">Submission Date</span>
                <span className="text-slate-900 font-medium">{mockData.submittedAt}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-slate-400 text-[13px] font-semibold uppercase tracking-wider">Estimated Completion</span>
                <span className="text-slate-900 font-medium">{mockData.estimatedCompletion}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100/80 h-full">
            <h3 className="text-xl font-bold text-slate-800 mb-8">Verification Timeline</h3>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.4rem] before:h-full before:w-0.5 before:bg-slate-100">
              {mockData.timeline.map((event, index) => (
                <div key={index} className="relative flex items-start gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle size={20} className="text-emerald-600" />
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1 sm:gap-4">
                      <span className="font-bold text-slate-800 text-base">{event.step}</span>
                      <span className="text-xs text-slate-400 font-medium shrink-0 whitespace-nowrap bg-slate-50 px-2.5 py-1 rounded-md">{event.date}</span>
                    </div>
                    <span className="text-sm font-semibold text-emerald-600 inline-flex items-center gap-1.5 mt-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100/50">
                      Completed
                    </span>
                  </div>
                </div>
              ))}

              {status === 'Pending Verification' && (
                <div className="relative flex items-start gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-blue-50 text-blue-500 shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-300">
                      <Clock size={20} />
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1 sm:gap-4">
                      <span className="font-bold text-slate-800 text-base">Final Review</span>
                      <span className="text-xs text-blue-400 font-medium shrink-0 whitespace-nowrap bg-blue-50 px-2.5 py-1 rounded-md">In Progress</span>
                    </div>
                    <span className="text-sm font-medium text-blue-600 flex items-center gap-2 mt-1 bg-blue-50/50 px-3 py-1.5 rounded-xl border border-blue-100/50 w-fit">
                      <Loader2 size={14} className="animate-spin" /> Analyst reviewing documents
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
