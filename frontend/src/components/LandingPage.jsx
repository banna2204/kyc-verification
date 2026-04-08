import React, { useState } from "react";
import SignUp from "./signup/SignUp";
import TextRoll from "../components/TextRoll";


const LandingPage = () => {
  const [signup, setSignup] = useState(false);

  return (
    <section className="px-8  py-12 max-w-full h-screen flex flex-col items-center justify-center text-gray-800 relative">
      

      <div className="text-center mb-6 mt-10 text-[#173300]  font-extrabold">
        <TextRoll center className="block text-6xl md:text-8xl tracking-tighter">
          COMPLETE
        </TextRoll>

        <TextRoll center className="block text-6xl md:text-8xl tracking-tighter">
          YOUR
        </TextRoll>

        <TextRoll center className="block text-6xl md:text-8xl tracking-tighter">
          KYC
        </TextRoll>
      </div>

      <p className="text-lg md:text-xl text-center text-[#143600] max-w-xl mb-6">
        Verify your identity in minutes and start sending money safely, anywhere
        in the world. Enjoy seamless payments and no hidden fees once your KYC
        is complete.
      </p>
      <button
        onClick={() => setSignup(true)}
        className="px-7 py-3 text-xl font-medium rounded-full bg-[#143600] text-[#9ee86f] hover:bg-[#173300] transition"
      >
        <TextRoll center className="inline-block cursor-pointer tracking-tighter">
          START KYC
        </TextRoll>
      </button>
     
   

      {signup && <SignUp onClose={() => setSignup(false)} />}
    </section>
  );
};

export default LandingPage;
