import React, { useState, useEffect } from "react";
import axios from "axios";
import OTP from "../otp/OTP";
import Success from "../success/Success";

const animatedTexts = [
  "Verify your KYC easily",
  "Send money worldwide",
  "Save on hidden fees",
  "Secure & fast transactions",
];

const SignUp = ({ onClose }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("email"); // email -> otpSent -> otpInput -> success
  const [showOTP, setShowOTP] = useState(false);

  // Animated texts
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // OTP Sent overlay auto transition
  useEffect(() => {
    let timer;
    if (step === "otpSent") {
      timer = setTimeout(() => {
        setStep("otpInput");
        setShowOTP(true);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [step]);

  return (
    <>
      {/* SIGNUP MODAL */}
      {!showOTP && step !== "success" && step !== "otpSent" && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <div className="flex w-11/12 max-w-4xl h-96 rounded-2xl overflow-hidden animate-fade-in shadow-lg transform transition-transform duration-500 scale-95 animate-modal-open">
            {/* Left Pane */}
            <div className="w-1/2 bg-[#143600] flex flex-col justify-between p-6 text-[#9ee86f]">
              <h2 className="text-3xl font-bold mt-4">KYC Made Easy</h2>
              <div className="relative mt-6 h-12 flex items-center">
                <div className="absolute top-0 left-0 h-1 bg-[#9ee86f] w-0 animate-expand-shrink rounded-full"></div>
                <p
                  className={`text-lg font-bold relative z-10 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"
                    }`}
                >
                  {animatedTexts[currentTextIndex]}
                </p>
              </div>
            </div>

            {/* Right Pane */}
            <div className="w-1/2 bg-[#9ee86f] flex flex-col justify-center items-center p-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-800 text-xl font-bold hover:text-gray-900"
              >
                ✕
              </button>
              <h2 className="text-3xl font-bold mb-6 text-[#143600]">Welcome</h2>

              {/* Email Step */}
              {step === "email" && (
                <>
                  <p className="mb-4 text-gray-800 text-center">
                    Enter your email to continue
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="mb-4 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#143600]"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="mb-4 px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#143600]"
                  />
                  <button
                    onClick={async () => {
                      if (!email || !password) return alert("Enter email and password");
                      setLoading(true);
                      try {
                        const res = await axios.post("http://localhost:3000/api/auth/register", { email, password });
                        const data = res.data;

                        setLoading(false);
                        if (data.success) {
                          setStep("otpSent");
                        } else {
                          alert(data.message || "Failed to send OTP");
                        }
                      } catch (err) {
                        setLoading(false);
                        console.error(err);
                        alert(err.response?.data?.message || err.message || "Network error");
                      }
                    }}
                    className="px-6 py-3 w-full bg-[#143600] text-[#9ee86f] font-medium rounded-full hover:bg-[#0f2a00] transition"
                  >
                    Continue
                  </button>

                  {loading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-white/80 rounded-2xl">
                      <div className="w-10 h-10 border-4 border-t-[#143600] border-gray-200 rounded-full animate-spin"></div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* OTP Sent Overlay */}
      {step === "otpSent" && (
        <div className="absolute inset-0 flex justify-center items-center bg-[#9ee86f]/90 rounded-2xl z-50">
          <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col items-center shadow-2xl animate-scale-in w-64 sm:w-80 relative">
            <div className="otp-circle mb-4">📧</div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 text-center">
              OTP Sent
            </h2>
            <p className="mt-1 text-gray-500 text-center text-sm sm:text-base">
              We have sent an OTP to <span className="font-medium">{email}</span>
            </p>
            <div className="mt-4 w-8 h-8 border-4 border-t-[#143600] border-gray-200 rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {showOTP && step === "otpInput" && (
        <OTP
          email={email}
          onClose={() => {
            setShowOTP(false);
            onClose();
          }}
          onVerified={() => {
            setShowOTP(false);
            setStep("success");
          }}
        />
      )}

      {/* Success Modal */}
      {step === "success" && <Success onClose={onClose} />}

      {/* Tailwind CSS Animations */}
      <style jsx>{`
        @keyframes expandShrink {
          0%, 100% { width: 0%; }
          50% { width: 20%; }
        }
        .animate-expand-shrink {
          animation: expandShrink 2.5s ease-in-out infinite;
        }

        @keyframes modalFadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: modalFadeIn 0.3s ease-out forwards;
        }

        .otp-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #143600;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          color: white;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.5);
          animation: pop 0.4s ease forwards;
        }

        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }

        @keyframes scaleIn {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default SignUp;