import React from 'react';
import { ChevronDown } from 'lucide-react';

// Common Input Component
const InputGroup = ({ label, field, value, type = "text", placeholder = "", onChange }) => (
  <div className="space-y-2">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}</label>
    <input
      type={type}
      value={value || ""}
      placeholder={placeholder}
      onChange={(e) => onChange(field, e.target.value)}
      className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#173300] focus:ring-1 focus:ring-[#173300] text-sm transition-all bg-white"
    />
  </div>
);

// Common Select Component
const SelectGroup = ({ label, field, value, options, onChange, disabled = false, placeholder = "Select an option" }) => (
  <div className="space-y-2 relative">
    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}</label>
    <div className="relative">
      <select
        value={value || ""}
        onChange={(e) => onChange(field, e.target.value)}
        disabled={disabled}
        className={`w-full border border-gray-300 rounded-xl p-3 pr-10 outline-none focus:border-[#173300] focus:ring-1 focus:ring-[#173300] text-sm transition-all bg-white appearance-none cursor-pointer ${disabled ? 'opacity-60 cursor-not-allowed bg-gray-50' : ''}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#173300]">
        <ChevronDown size={16} />
      </div>
    </div>
  </div>
);

// Minimal state data mapped to countries
const locationData = {
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  'United States': ['California', 'Texas', 'New York', 'Florida', 'Illinois'],
  'India': [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
    'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir',
    'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
    'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ],
  'Georgia': ['Tbilisi', 'Imereti', 'Adjara', 'Kakheti'],
  'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
  'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta']
};

const Step1 = ({ formData, setFormData }) => {

  const handleChange = (field, value) => {
    if (field === 'country') {
      // If country changes, clear the state selection automatically so it isn't invalid
      setFormData({ ...formData, country: value, state: "" });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const countries = Object.keys(locationData);
  const states = formData.country ? locationData[formData.country] : [];

  return (
    <div className="min-h-full animate-in fade-in duration-500">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#173300] mb-2">Personal Details</h3>
        <p className="text-sm text-gray-500">Please provide your accurate personal information to proceed.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
        {/* Name Fields */}
        <InputGroup label="First Name" field="name" value={formData.name} placeholder="e.g. John" onChange={handleChange} />
        <InputGroup label="Last Name" field="lastName" value={formData.lastName} placeholder="e.g. Doe" onChange={handleChange} />

        {/* Date of Birth */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Date of Birth</label>
          <div className="relative">
            <input
              type="date"
              value={formData.dob || ""}
              onChange={(e) => handleChange('dob', e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-3 px-4 outline-none focus:border-[#173300] focus:ring-1 focus:ring-[#173300] text-sm transition-all bg-white"
            />
          </div>
        </div>

        {/* Phone */}
        <InputGroup label="Phone Number" field="phone" value={formData.phone} type="tel" placeholder="+44 123 456 789" onChange={handleChange} />

        {/* Country & State Dropdowns */}
        <SelectGroup 
          label="Country" 
          field="country" 
          value={formData.country} 
          options={countries} 
          placeholder="Select Country..." 
          onChange={handleChange} 
        />
        
        <SelectGroup 
          label="State/Province" 
          field="state" 
          value={formData.state} 
          options={states} 
          placeholder={formData.country ? "Select State..." : "Select a country first"} 
          disabled={!formData.country}
          onChange={handleChange} 
        />

        {/* City Input (Normal Text) */}
        <InputGroup label="City" field="city" value={formData.city} placeholder="e.g. London" onChange={handleChange} />

        {/* Zip Code */}
        <InputGroup label="Zip / Postal Code" field="zip" value={formData.zip} placeholder="e.g. 10001" onChange={handleChange} />

      </div>
    </div>
  );
};

export default Step1;