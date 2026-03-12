import { createContext, useContext, useState } from 'react';

const KYCContext = createContext();

export const useKYC = () => {
  return useContext(KYCContext);
};

export const KYCProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [personalDetails, setPersonalDetails] = useState({
    dob: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [documents, setDocuments] = useState({
    aadhaar: null,
    pan: null,
    selfie: null
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const value = {
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    email,
    setEmail,
    fullName,
    setFullName,
    personalDetails,
    setPersonalDetails,
    documents,
    setDocuments,
  };

  return <KYCContext.Provider value={value}>{children}</KYCContext.Provider>;
};
