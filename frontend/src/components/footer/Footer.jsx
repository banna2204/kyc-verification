import React from 'react'

const Footer = () => {
  return (
   <footer className="bg-[#9ee86f] text-[#143600] py-10 px-6">
  <div className="max-w-7xl mx-auto flex gap-8 justify-around">
    
    {/* Logo / Title */}
    <div className='w-md'>
      <div className="text-3xl font-bold text-[#143600] tracking-tighter mb-4">
        KYC
      </div>
      <p className="text-sm opacity-80">
        Secure, fast, and reliable KYC verification platform. 
        We help you stay compliant and build trust effortlessly.
      </p>
    </div>

    {/* Quick Links */}
    {/* <div>
      <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li className="hover:underline cursor-pointer">Home</li>
        <li className="hover:underline cursor-pointer">About</li>
        <li className="hover:underline cursor-pointer">Services</li>
        <li className="hover:underline cursor-pointer">Contact</li>
      </ul>
    </div> */}

    {/* Contact / Info */}
    <div>
      <h3 className="font-semibold text-lg mb-3">Contact</h3>
      <p className="text-sm mb-2">Email: support@kyc.com</p>
      <p className="text-sm mb-2">Phone: +91 98765 43210</p>
      <p className="text-sm">India</p>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="border-t border-[#143600]/30 mt-8 pt-4 text-center text-sm">
    © {new Date().getFullYear()} KYC. All rights reserved.
  </div>
</footer>
  )
}

export default Footer