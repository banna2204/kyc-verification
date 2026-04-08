import { BrowserRouter, Route, Routes } from 'react-router'
import './App.css'
import DigiLockerConnect from './components/digiLocker/DigiLockerConnect'
import KycTrustBlock from './components/KYCTrustBlock'
import LandingPage from './components/LandingPage'
import NavBar from './components/NavBar'
import SecurityStep from './components/SecurityStep'
import Footer from './components/footer/Footer'
import KycVerification from './kycflow/KYCVerification'
import AdminPanel from './components/admin/AdminPanel'
import AdminLogin from './components/admin/AdminLogin'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={
          <>
            <div className='bg-[#9ee86f]'>
              <NavBar />
              <LandingPage />
            </div>
            <KycTrustBlock />
            <SecurityStep />
            <DigiLockerConnect />
          </>
        } />

        <Route path="/kyc" element={<KycVerification/>} />
        <Route path="/admin-login" element={<AdminLogin/>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel/></ProtectedRoute>} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App