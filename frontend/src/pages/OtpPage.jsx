import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { flash } from '../store/db';
import AuthHero from '../components/AuthHero';
import OtpForm from '../components/OtpForm';
import '../styles/base.css';
import '../styles/auth.css';

export default function OtpPage() {
  const navigate = useNavigate();

  const [reg] = useState(() => {
    try {
      const raw = sessionStorage.getItem('3a_reg');
      if (!raw) return null;
      const r = JSON.parse(raw);
      return r && r.email ? r : null;
    } catch {
      return null;
    }
  });

  const [code,    setCode]    = useState('');
  const [error,   setError]   = useState('');
  const [note,    setNote]    = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!reg) navigate('/register', { replace: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function post(url, body) {
    const res  = await fetch(url, {
      method:      'POST',
      credentials: 'include',
      headers:     { 'Content-Type': 'application/json' },
      body:        JSON.stringify(body),
    });
    const data = await res.json();
    return { ok: res.ok, data };
  }

  async function handleResend() {
    if (!reg) return;
    setNote(''); setError('');
    try {
      const { ok, data } = await post('/api/send-otp', { email: reg.email });
      setCode('');
      if (!ok) { setError(data.error || 'Failed to resend code.'); return; }
      setNote('A new code was sent to your email.');
    } catch {
      setError('Cannot reach the server.');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!reg) return;
    setNote('');

    const trimmed = code.trim();
    if (!/^\d{6}$/.test(trimmed)) { setError('Enter the 6-digit code.'); return; }

    setLoading(true); setError('');
    try {
      // Step 1 — verify OTP
      const { ok: otpOk, data: otpData } = await post('/api/verify-otp', {
        email: reg.email, code: trimmed,
      });
      if (!otpOk) {
        setError(otpData.error || 'Verification failed.');
        setLoading(false); return;
      }

      // Step 2 — save user to MySQL via backend
      const { ok: regOk, data: regData } = await post('/users/register', {
        first_name: reg.first_name,
        last_name:  reg.last_name,
        email:      reg.email,
        password:   reg.password,
      });
      if (!regOk) {
        setError(regData.error || 'Could not create account.');
        setLoading(false); return;
      }

      sessionStorage.removeItem('3a_reg');
      sessionStorage.setItem('3a_prefill', reg.email);
      flash('Email verified. Your account is ready. Please log in.');
      navigate('/login', { replace: true });
    } catch {
      setError('Cannot reach the server.');
      setLoading(false);
    }
  }

  if (!reg) return null;

  return (
    <div className="split">
      <AuthHero
        title="Check your email."
        subtitle="Enter the 6-digit code to finish creating your account."
      />
      <OtpForm
        email={reg.email}
        code={code}
        setCode={v => { setCode(v); setError(''); }}
        error={error}
        note={note}
        loading={loading}
        onSubmit={handleSubmit}
        onResend={handleResend}
      />
    </div>
  );
}
