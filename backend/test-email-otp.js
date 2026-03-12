import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/kyc';

async function testEmailOTP() {
  const email = 'test@example.com';
  const fullName = 'Test User';

  try {
    console.log('Testing /send-email-otp...');
    const sendResp = await axios.post(`${BASE_URL}/send-email-otp`, { email, fullName });
    console.log('Send Resp:', sendResp.data);

    // Since we don't have the actual OTP, we cannot test /verify-email-otp fully without 
    // either checking the database or mocking the OTP generation.
    // For verification purposes, I'll check if the server responds with 429 on second attempt.
    console.log('Testing cooldown...');
    try {
        await axios.post(`${BASE_URL}/send-email-otp`, { email, fullName });
    } catch (err) {
        console.log('Cooldown Resp (expected error):', err.response?.data);
    }

  } catch (error) {
    console.error('Error during test:', error.response?.data || error.message);
  }
}

testEmailOTP();
