import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHero from '../components/AuthHero';
import RegisterForm from '../components/RegisterForm';
import '../styles/base.css';
import '../styles/auth.css';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName,  setLastName]  = useState('');
  const [email,     setEmail]     = useState('');
  const [password,  setPassword]  = useState('');
  const [errors,    setErrors]    = useState({});
  const [loading,   setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const x = {};

    if (!firstName.trim()) x.rF = 'This field is required.';
    if (!lastName.trim())  x.rL = 'This field is required.';
    if (!email.trim())     x.rE = 'This field is required.';
    if (!password)         x.rP = 'This field is required.';

    const em = email.trim().toLowerCase();
    if (!x.rE && !/^\S+@\S+\.\S+$/.test(em))
      x.rE = 'Enter a valid email.';

    if (!x.rP && password.length < 6)
      x.rP = 'Use at least 6 characters.';

    if (Object.keys(x).length) { setErrors(x); return; }

    setLoading(true);
    setErrors({});

    try {
    
      const otpRes  = await fetch('/api/send-otp', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: em }),
      });
      const otpData = await otpRes.json();

      if (!otpRes.ok) {
        setErrors({ rE: otpData.error || 'Failed to send verification code.' });
        setLoading(false);
        return;
      }

     
      sessionStorage.setItem('3a_reg', JSON.stringify({
        first_name: firstName.trim(),
        last_name:  lastName.trim(),
        email: em,
        password,
      }));
      navigate('/otp');
    } catch {
      setErrors({ rE: 'Cannot reach the server.' });
      setLoading(false);
    }
  }

  return (
    <div className="split">
      <AuthHero
        title="Create your account in a minute."
        subtitle="One account per customer. We email you a 6-digit code to verify it."
      />
      <RegisterForm
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        errors={errors}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
