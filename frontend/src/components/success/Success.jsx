import React from "react";

const Success = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 sm:p-10 flex flex-col items-center shadow-2xl animate-scale-in w-80 sm:w-96 relative">
        
        {/* Animated Checkmark */}
        <div className="checkmark-circle mb-4">
          ✓
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center">
          Verified Successfully
        </h2>

        {/* Subtext */}
        <p className="mt-2 text-gray-500 text-center text-sm sm:text-base">
          Your account has been verified. You can now continue to the dashboard.
        </p>

        {/* Continue Button */}
        <button
          onClick={onClose}
          className="mt-6 px-8 py-3 bg-[#143600] text-white rounded-full font-medium hover:bg-[#173300] transition-all shadow-lg"
        >
          Continue
        </button>
      </div>

      <style jsx>{`
        .checkmark-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #143600;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 45px;
          color: white;
          box-shadow: 0 4px 15px rgba(34, 197, 94, 0.5);
          animation: pop 0.4s ease forwards;
        }

        @keyframes pop {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          60% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          0% {
            transform: scale(0.95);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Success;