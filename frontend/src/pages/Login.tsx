import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '../api/client';

export default function Login() {
  const [searchParams] = useSearchParams();
  const isRegisterMode = searchParams.get('mode') === 'register';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegisterMode) {
        await apiClient.post('/auth/register', { email, password });
        // Automatically log in after registration
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        const res = await apiClient.post('/auth/login', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        localStorage.setItem('token', res.data.access_token);
        navigate('/dashboard');
      } else {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        const res = await apiClient.post('/auth/login', formData, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        localStorage.setItem('token', res.data.access_token);
        navigate('/dashboard');
      }
    } catch (error) {
      const err = error as { response?: { data?: { detail?: string } } };
      setError(err.response?.data?.detail || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  let buttonText = isRegisterMode ? 'Sign Up' : 'Log In';
  if (loading) {
    buttonText = 'Processing...';
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>

      <div className="container flex-center min-h-screen">
        <div className="glass-panel" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center">{isRegisterMode ? 'Create Account' : 'Welcome Back'}</h2>
          
          {error && <div className="badge badge-error" style={{ display: 'block', padding: '12px', marginBottom: '16px', borderRadius: '8px', textAlign: 'center' }}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email Address</label>
              <input 
                id="email"
                type="email" 
                className="input-field" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            
            <div>
              <label htmlFor="password">Password</label>
              <input 
                id="password"
                type="password" 
                className="input-field" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
              {buttonText}
            </button>
          </form>
          
          <p className="text-center" style={{ marginTop: '24px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}
            <Link 
              to={isRegisterMode ? '/login' : '/login?mode=register'} 
              style={{ marginLeft: '8px', fontWeight: '600' }}
            >
              {isRegisterMode ? 'Log In' : 'Sign Up'}
            </Link>
          </p>
          
          <div style={{ textAlign: 'center', marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
