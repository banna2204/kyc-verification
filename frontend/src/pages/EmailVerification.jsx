import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKYC } from '../context/KYCContext';
import { Mail, Shield, ArrowRight, Loader2, User } from 'lucide-react';

export const EmailVerification = () => {
  const navigate = useNavigate();
  const { setCurrentStep, email, setEmail, fullName, setFullName } = useKYC();

  const [step, setStep] = useState('input');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  const inputs = useRef([]);

  useEffect(() => {
    setCurrentStep(1); // Set to step 1 as it's the first step now
  }, [setCurrentStep]);

  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!fullName || fullName.length < 2) {
      setError('Please enter your full name');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // const response = await fetch('http://localhost:3000/api/kyc/send-email-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, fullName })
      // });

      // const data = await response.json();

      // if (!response.ok) {
      //   if (response.status === 429) {
      //     // Extract seconds from message if possible, or just use 30
      //     setCooldown(30);
      //     throw new Error(data.message);
      //   }
      //   throw new Error(data.message || 'Failed to send OTP');
      // }

      setStep('otp');
      setCooldown(30); // 30 seconds cooldown after success
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length < 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // const response = await fetch('http://localhost:3000/api/kyc/verify-email-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, otp: otpValue })
      // });

      // if (!response.ok) {
      //   const data = await response.json();
      //   throw new Error(data.message || 'Invalid OTP');
      // }

      navigate('/personal-details');
    } catch (err) {
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-xl p-8 sm:p-10 rounded-[2rem] shadow-2xl shadow-blue-900/5 border border-white/60 animate-fade-in-up relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-8 relative z-10">
        <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center mb-6 shadow-inner border border-white relative group">
          <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-2xl group-hover:bg-blue-400/30 transition-colors duration-500"></div>
          <Mail className="w-10 h-10 text-blue-600 relative z-10 drop-shadow-sm group-hover:scale-110 transition-transform duration-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
          {step === 'input' ? 'Get Started' : 'Verify Email'}
        </h2>
        <p className="text-slate-500 font-medium px-4">
          {step === 'input'
            ? 'Enter your details to start the KYC verification process.'
            : `We sent a 6-digit secure code to ${email}`}
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50/80 backdrop-blur-sm text-red-600 text-sm font-medium rounded-xl border border-red-100 flex items-center justify-center gap-2 animate-shake">
          <Shield className="w-4 h-4" />
          {error}
        </div>
      )}

      {step === 'input' ? (
        <form onSubmit={handleInputSubmit} className="space-y-5 relative z-10">
          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300" />
              <input
                type="text"
                required
                placeholder="Enter Email"
                className="w-full pl-12 pr-4 py-4 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-semibold text-slate-800 placeholder-slate-300 transition-all duration-300 shadow-sm"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors duration-300" />
              <input
                type="email"
                required
                placeholder="example@mail.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-semibold text-slate-800 placeholder-slate-300 transition-all duration-300 shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || cooldown > 0}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:shadow-none flex justify-center items-center gap-2 group mt-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : cooldown > 0 ? `Resend in ${cooldown}s` : 'Send OTP'}
            {!loading && cooldown === 0 && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-300" />}
          </button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="space-y-8 relative z-10">
          <div className="space-y-2 text-center pt-2">
            <div className="flex justify-center gap-2 sm:gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-extrabold bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all duration-300 text-slate-800 shadow-sm"
                />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <button
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 disabled:shadow-none flex justify-center items-center gap-2 group"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Verify & Proceed'}
              {!loading && <Shield className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />}
            </button>
            <button
              type="button"
              onClick={() => { setStep('input'); setOtp(['', '', '', '', '', '']); }}
              className="w-full text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors py-2"
            >
              Change email or name? Click here
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
