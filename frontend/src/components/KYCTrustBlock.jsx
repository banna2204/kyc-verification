import React from "react";
import { FaShieldAlt, FaCertificate, FaClock } from "react-icons/fa";
import TextRoll from "./TextRoll";

const KycTrustBlock = () => {
  return (
    <div className="my-12 flex flex-col items-center gap-10 text-center px-4 md:px-0">

       <div className="text-center mb-4 text-[#173300] font-extrabold ">
        <TextRoll center  className="block text-5xl md:text-7xl  tracking-tighter">
         SECURE YOUR
        </TextRoll>

        <TextRoll center className="block text-5xl md:text-7xl  tracking-tighter">
          IDENTITY
        </TextRoll>

        <TextRoll center className="block text-5xl md:text-7xl  tracking-tighter">
        INSTANTLY
        </TextRoll>
      </div>


      {/* Badges with icons */}
      <div className="flex flex-col md:flex-row items-center gap-20  mt-8">
        {/* Badge 1 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#a0e2e1] text-3xl">
            <FaShieldAlt className="text-4xl cursor-pointer text-[#173300] transition-transform duration-500 hover:rotate-180" />
          </div>
          <span className="text-xl font-semibold text-[#173300]">
            RBI Compliant
          </span>
        </div>

        {/* Badge 2 */}
        <div className="flex items-center gap-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#a0e2e1] text-3xl">
            <FaCertificate className="text-4xl text-[#173300] cursor-pointer transition-transform duration-500 hover:rotate-180" />
          </div>
          <span className="text-xl font-semibold text-[#173300]">
            ISO Certified
          </span>
        </div>

        {/* Badge 3 */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-[#a0e2e1] cursor-pointer text-3xl">
            <FaClock className="text-4xl text-[#173300] transition-transform duration-500 hover:rotate-180" />
          </div>
          <span className="text-xl font-semibold text-[#173300]">
            24/7 Support
          </span>
        </div>
      </div>
    </div>
  );
};

export default KycTrustBlock;
