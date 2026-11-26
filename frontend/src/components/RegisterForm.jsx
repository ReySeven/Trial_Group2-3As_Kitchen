import { Link } from 'react-router-dom';

const RegisterForm = ({ firstName, setFirstName, lastName, setLastName, email, setEmail, password, setPassword, errors, loading, onSubmit }) => {
  return (
    <main className="form-side">
      <form className="card auth-card" onSubmit={onSubmit} noValidate>
        <div>
          <h2>Register</h2>
          <p className="muted">Fill in your details to create a customer account.</p>
        </div>

        <div className="form-row">
          <div>
            <label className="field">First name
              <input type="text" placeholder="Juan" value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className={errors.rF ? 'bad' : ''} />
            </label>
            <p className="er">{errors.rF || ''}</p>
          </div>
          <div>
            <label className="field">Last name
              <input type="text" placeholder="Dela Cruz" value={lastName}
                onChange={e => setLastName(e.target.value)}
                className={errors.rL ? 'bad' : ''} />
            </label>
            <p className="er">{errors.rL || ''}</p>
          </div>
        </div>

        <div>
          <label className="field">Email
            <input type="email" placeholder="you@example.com" value={email}
              onChange={e => setEmail(e.target.value)}
              className={errors.rE ? 'bad' : ''} autoComplete="email" />
          </label>
          {errors.rE && <p className="er">{errors.rE}</p>}
        </div>

        <div>
          <label className="field">Password
            <input type="password" placeholder="At least 6 characters" value={password}
              onChange={e => setPassword(e.target.value)}
              className={errors.rP ? 'bad' : ''} autoComplete="new-password" />
          </label>
          {errors.rP && <p className="er">{errors.rP}</p>}
        </div>

        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Sending code…' : 'Create account and send code'}
        </button>

        <p className="center muted">
          Already have an account?&nbsp;<Link to="/login">Log in</Link>
        </p>
      </form>
    </main>
  );
};

export default RegisterForm;
