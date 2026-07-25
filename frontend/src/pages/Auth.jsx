import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { LogoMark } from '../components/Illustrations';
import './Auth.css';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';

  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [usernameSuggestions, setUsernameSuggestions] = useState([]);

  const [form, setForm] = useState({ identifier: '', email: '', username: '', password: '' });

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const isSignup = mode === 'signup';

  function switchMode() {
    setMode(isSignup ? 'login' : 'signup');
    setError('');
    setUsernameSuggestions([]);
  }

  function updateField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setUsernameSuggestions([]);
    setSubmitting(true);

    try {
      if (isSignup) {
        await signup({ email: form.email, username: form.username, password: form.password });
      } else {
        await login({ identifier: form.identifier, password: form.password }, rememberMe);
      }
      navigate('/dashboard');
    } catch (err) {
      const data = err.data || {};

      if (data.field === 'email') {
        setError('That email is already registered.');
      } else if (data.field === 'username') {
        setError('That username is already taken. Try one of these:');
        setUsernameSuggestions(data.suggestions || []);
      } else {
        setError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <Link to="/" className="auth-logo">
        <LogoMark className="auth-logo__icon" />
        <span>Gym Tracker</span>
      </Link>

      <div className="auth-card squircle">
        <h1>{isSignup ? 'Create your account' : 'Welcome back'}</h1>
        <p className="auth-subtitle">
          {isSignup
            ? 'Start tracking your workouts in under a minute.'
            : 'Log in to pick up right where you left off.'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <label className="auth-field">
              <span>Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="you@example.com"
              />
            </label>
          )}

          {isSignup ? (
            <label className="auth-field">
              <span>Username</span>
              <input
                type="text"
                required
                value={form.username}
                onChange={(e) => updateField('username', e.target.value)}
                placeholder="yourusername"
              />
            </label>
          ) : (
            <label className="auth-field">
              <span>Username or email</span>
              <input
                type="text"
                required
                value={form.identifier}
                onChange={(e) => updateField('identifier', e.target.value)}
                placeholder="username or email"
              />
            </label>
          )}

          <label className="auth-field">
            <span>Password</span>
            <div className="auth-password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={form.password}
                onChange={(e) => updateField('password', e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </label>

          {!isSignup && (
            <label className="auth-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
          )}

          {error && (
            <div className="auth-error">
              <p>{error}</p>
              {usernameSuggestions.length > 0 && (
                <div className="auth-suggestions">
                  {usernameSuggestions.map((s) => (
                    <button
                      type="button"
                      key={s}
                      className="auth-suggestion-chip"
                      onClick={() => updateField('username', s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
              {error.includes('already registered') && (
                <button type="button" className="auth-inline-link" onClick={switchMode}>
                  Log in instead
                </button>
              )}
            </div>
          )}

          <Button type="submit" variant="primary" className="btn--full" disabled={submitting}>
            {submitting ? 'Please wait…' : isSignup ? 'Sign up' : 'Log in'}
          </Button>
        </form>

        <button type="button" className="auth-switch" onClick={switchMode}>
          {isSignup ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
}
