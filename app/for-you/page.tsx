'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Sidebar';
import Nav from '@/components/Nav';
import SelectedForYou from '@/components/SelectedForYou';
import Recommended from '@/components/Recommended';
import SuggestedBooks from '@/components/SuggestedBooks';
import { useModal } from '@/context/ModalContext';

const ForYouPage = () => {
  const { user, loading } = useAuth();
  const { openModal } = useModal();

  useEffect(() => {
    if (!loading && !user) {
      openModal();
    }
  }, [user, loading, openModal]);

  return (
    <div className="for-you-page__container">
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="for-you-page__main-content">
        <Nav />
        {user ? (
          <>
            <SelectedForYou />
            <Recommended />
            <SuggestedBooks />
          </>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '5rem', fontSize: '1.5rem' }}>
            Please log in to see your personalized recommendations.
          </div>
        )}
      </div>
    </div>
  );
};

export default ForYouPage;
