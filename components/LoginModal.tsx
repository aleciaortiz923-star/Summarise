import React, { useState } from 'react';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { FaUser } from 'react-icons/fa';
import Image from 'next/image';

interface LoginModalProps {
  closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      closeModal();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      closeModal();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      closeModal();
    } catch (error: any) {
      // For simplicity, not distinguishing between login/register errors
      // You might want to handle this more gracefully
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        closeModal();
      } catch (registerError: any) {
        setError(registerError.message);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal__container">
        <button className="modal__close-btn" onClick={closeModal}>&times;</button>
        <div className="modal__content">
          <h2 className="modal__title">Log in to Summarist</h2>
          {error && <p className="error-message">{error}</p>}
          
          <button className="btn login-btn login-btn--guest" onClick={handleGuestLogin}>
            <FaUser className="guest-icon" />
            <span className="login-btn-text">Login as a Guest</span>
          </button>

          <div className="separator">or</div>

          <button className="btn login-btn login-btn--google" onClick={handleGoogleLogin}>
            <div className="google-logo-bg">
              <Image src="/assets/google.png" alt="Google logo" width={24} height={24} />
            </div>
            <span className="login-btn-text">Login with Google</span>
          </button>

          <div className="separator">or</div>

          <form className="login-form" onSubmit={handleEmailLogin}>
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className="btn login-btn--form" type="submit">Login</button>
          </form>

          <div className="login-links">
            <a href="#" className="login-link">Forgot your password?</a>
          </div>
        </div>
        <div className="register-link">
          <button className="btn btn--secondary">Don't have an account?</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
