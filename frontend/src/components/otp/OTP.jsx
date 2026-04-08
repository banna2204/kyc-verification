import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


const OTP = ({ email, onClose, onVerified }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const navigate = useNavigate()

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // move to next box
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return alert("Enter 6-digit OTP");

    try {
      const res = await axios.post("http://localhost:3000/api/auth/verify-otp", { email, otp: enteredOtp });
      const data = res.data;

      if (data.success) {
        localStorage.setItem("token", data.token);
        onVerified(enteredOtp);
        navigate('/kyc');
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Network error");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
      <div className="bg-white w-11/12 max-w-md rounded-2xl p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-800 text-xl font-bold hover:text-gray-900"
        >
          ✕
        </button>

        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Enter OTP</h2>
          <p className="mb-4 text-gray-700">6-digit code sent to {email}</p>

          <div className="flex gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#143600]"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="px-6 py-3 w-full bg-[#143600] text-[#9ee86f] font-medium rounded-full hover:bg-[#0f2a00] transition"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTP;