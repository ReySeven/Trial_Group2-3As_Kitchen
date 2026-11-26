import { Link } from 'react-router-dom';

const OtpForm = ({ email, code, setCode, error, note, loading, onSubmit, onResend }) => {
  return (
    <main className="form-side">
      <form className="card auth-card" onSubmit={onSubmit} noValidate>
        <div>
          <h2>Verify your email</h2>
          <p className="muted">We sent a code to <b>{email}</b>. It expires in 10 minutes.</p>
        </div>

        {note && <div className="success">{note}</div>}

        <div>
          <label className="field">6-digit code
            <input
              type="text"
              className={`otp-input${error ? ' bad' : ''}`}
              placeholder="000000"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={e => setCode(e.target.value)}
              autoComplete="one-time-code"
              autoFocus
            />
          </label>
          {error && <p className="er">{error}</p>}
        </div>

        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Verifying…' : 'Verify and continue'}
        </button>

        <div className="row" style={{ justifyContent: 'center', gap: '12px' }}>
          <button type="button" className="button secondary small"
            onClick={onResend} disabled={loading}>
            Resend code
          </button>
          <span className="muted">·</span>
          <Link to="/register" className="small">Change email</Link>
        </div>
      </form>
    </main>
  );
};

export default OtpForm;
