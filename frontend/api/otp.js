// api/otp.js
import { API_BASE } from '../constants';

export async function requestOtp(email) {
  const resp = await fetch(`${API_BASE}/request-otp`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email }),
  });
  return resp.json();
}

export async function verifyOtp(email, code) {
  const resp = await fetch(`${API_BASE}/verify-otp`, {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email, code }),
  });
  return resp.json();
}
