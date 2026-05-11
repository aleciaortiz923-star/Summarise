'use client';

import { useAuth } from '@/context/AuthContext';
import { useModal } from '@/context/ModalContext';
import Nav from '@/components/Nav';
import React from 'react';
import Image from 'next/image';

const SettingsPage = () => {
  const { user } = useAuth();
  const { openModal } = useModal();

  return (
    <div>
      <Nav />
      <div className="settings__container">
                <h1 className="settings__title">Settings</h1>
        {user ? (
          <div className="settings__content">
            <div className="settings__subscription">
              <h2 className="settings__subscription-title">Your Subscription Plan</h2>
                            <p className="settings__subscription-plan">Premium Plus</p>
              <button className="btn settings__upgrade-btn">Manage Subscription</button>
            </div>
            <div className="settings__user-details">
                            <h2 className="settings__user-details-title">Email</h2>
                            <p className="settings__user-email">hanna@gmail.com</p>
            </div>
          </div>
        ) : (
          <div className="settings__logged-out">
            <div className="settings__logged-out-image">
              <Image src="/assets/login.png" alt="Login to see your details" width={400} height={400} />
            </div>
            <p className="settings__logged-out-text">Log in to your account to see your details.</p>
            <button className="btn settings__login-btn" onClick={openModal}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
