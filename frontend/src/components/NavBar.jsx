import React from 'react';
import TextRoll from './TextRoll';
import { Link, useNavigate } from 'react-router';

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center px-8 py-4 fixed top-0 left-0 w-full z-50 bg-[#9ee86f]  shadow-md">
      <div className="text-3xl font-bold text-[#143600] tracking-tighter ">KYC</div>
      {/* <ul className="flex space-x-8 text-gray-700 font-medium">
        <li className="hover:text-[#173300] cursor-pointer">Home</li>
        <li className="hover:text-[#173300] cursor-pointer">Features</li>
        <li className="hover:text-[#173300] cursor-pointer">Pricing</li>
        <li className="hover:text-[#173300] cursor-pointer">Contact</li>
      </ul> */}
     
      <div className="flex space-x-4">
        <button 
          onClick={() => navigate('/admin-login')}
          className="bg-transparent border-2 border-[#143600] font-bold text-[#143600] px-6 py-2 rounded-full hover:bg-white/20 transition"
        >
          {/* <TextRoll className="inline-block">Admin Login</TextRoll> */}Admin Login
        </button>
      </div>
    </nav>
  );
}