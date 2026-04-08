import React from 'react'
import lock from '../../public/lock.png'
import TextRoll from './TextRoll'

const SecurityStep = () => {
  return (
    <div className="flex flex-col max-w-7xl mx-auto md:flex-row items-center bg-white p-6 md:p-12 gap-12 md:gap-16">
      {/* Left Side - Text */}
      <div className="md:w-1/2  flex flex-col justify-center text-[#173300]">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tighter mb-6">
          <TextRoll center>
            SAFE AT EVERY STEP
          </TextRoll>
            
         
        </h2>
        
        <hr className='text-gray-200 mb-2'/>
        <p className="mb-4 text-lg md:text-xl">
          With our dedicated team in India, your identity is verified safely from your doorstep.
        </p>
        <hr className='text-gray-200 mb-2'/>
        <p className="mb-4 text-lg md:text-xl">
          Our specialist anti-fraud and security teams use advanced technology to protect your documents.
        </p>
        <hr className='text-gray-200 mb-2'/>
        <p className="mb-4 text-lg md:text-xl">
          Fully regulated, with 70 licences worldwide to ensure your KYC process is smooth and secure.
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="md:w-1/2 flex justify-center md:justify-end hover:overflow-hidden">
        <img
          src={lock} 
          alt="KYC Security Illustration"
          className="w-full max-w-sm md:max-w-md rounded-lg object-contain transition-transform duration-500 hover:rotate-20"
        />
      </div>
    </div>
  )
}

export default SecurityStep