import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { KYCProvider } from './context/KYCContext';
import { Layout } from './components/Layout/Layout';
import { LandingPage } from './pages/LandingPage';
import { EmailVerification } from './pages/EmailVerification';
import { PersonalDetails } from './pages/PersonalDetails';
import { DocumentUpload } from './pages/DocumentUpload';
import { VerificationMock } from './pages/VerificationMock';
import { SummaryPreview } from './pages/SummaryPreview';
import { StatusDashboard } from './pages/StatusDashboard';

function App() {
  return (
    <BrowserRouter>
      <KYCProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="email-verification" element={<EmailVerification />} />
            <Route path="personal-details" element={<PersonalDetails />} />
            <Route path="document-upload" element={<DocumentUpload />} />
            <Route path="verification" element={<VerificationMock />} />
            <Route path="summary" element={<SummaryPreview />} />
            <Route path="status" element={<StatusDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </KYCProvider>
    </BrowserRouter>
  );
}

export default App;
