import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ExternalLink } from 'lucide-react'
import TextRoll from '../TextRoll'

const DigiLockerConnect = () => {
  return (
      <section className="py-24 px-6 bg-neutral-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-lime-400/5 to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#9ee86f] rounded-full mb-6">
                <div className="w-5 h-5 bg-[#9ee86f] rounded flex items-center justify-center">
                  <span className="text-[#9ee86f]  text-[8px] p-1 rounded bg-[#173300] font-black">DL</span>
                </div>
                <span className="text-xs font-bold text-[#173300] uppercase tracking-wider">DigiLocker Integrated</span>
              </div>
              <h2 className="font-display text-[#173300]  text-3xl md:text-5xl font-bold text-forest-900 mb-5  leading-tight">
                <TextRoll center className='tracking-tighter'>
                    AUTO FETCH YOUR
                </TextRoll>
                 <TextRoll center className='tracking-tighter'>
                      DOCUMENTS INSTANTLY
                 </TextRoll>
              
              </h2>
              <p className="text-[#173300] text-lg leading-relaxed mb-8 max-w-lg">
                Connect your DigiLocker account and we'll automatically fetch your Aadhaar, PAN, Driving License, 
                and educational certificates. No manual uploads needed.
              </p>
              <div className="flex flex-col gap-3">
                {['Aadhaar XML', 'PAN Card', 'Driving License', '12th Marksheet'].map((doc) => (
                  <div key={doc} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-lime-500" />
                    <span className="text-forest-800 font-medium">{doc}</span>
                    <span className="text-[10px] font-bold text-[#173300] bg-[#003F7D]/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      via DigiLocker
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 w-full max-w-md"
            >
              <div className="glass-panel rounded-3xl p-8 relative">
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-[#9ee86f] rounded-full blur-2xl" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#9ee86f] rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-[#173300] font-black text-sm">DL</span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-forest-900">DigiLocker</h4>
                    <p className="text-sm text-neutral-500">Government of India</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  {[
                    { name: 'Aadhaar Card', status: 'fetched' },
                    { name: 'PAN Card', status: 'fetched' },
                    { name: 'Driving License', status: 'fetching' },
                    { name: '12th Marksheet', status: 'idle' },
                  ].map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-3 bg-white/60 rounded-xl border border-neutral-100">
                      <span className="text-sm font-medium text-forest-800">{doc.name}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        doc.status === 'fetched' ? 'bg-lime-100 text-lime-700' :
                        doc.status === 'fetching' ? 'bg-amber-100 text-amber-700' :
                        'bg-neutral-100 text-neutral-500'
                      }`}>
                        {doc.status === 'fetched' ? '✅ Fetched' :
                         doc.status === 'fetching' ? '⏳ Fetching...' :
                         'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-[#9ee86f] text-[#173300] font-semibold py-3.5 rounded-xl hover:bg-[#a4e67b] cursor-pointer transition-colors flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Connect DigiLocker
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default DigiLockerConnect