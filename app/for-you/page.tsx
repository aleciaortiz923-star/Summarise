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

  return (
    <div className="for-you-page__container">

      <div className="for-you-page__main-content">
        <Nav />
        <>
          <SelectedForYou />
          <Recommended />
          <SuggestedBooks />
        </>
      </div>
    </div>
  );
};

export default ForYouPage;
