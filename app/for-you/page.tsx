'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Nav from '@/components/Nav';
import SelectedForYou from '@/components/SelectedForYou';
import Recommended from '@/components/Recommended';
import SuggestedBooks from '@/components/SuggestedBooks';
import LoginModal from '@/components/LoginModal';

const ForYouPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="for-you-page__container">
      {isModalOpen && <LoginModal closeModal={closeModal} />}
      <div className="sidebar-wrapper">
        <Sidebar openModal={openModal} />
      </div>
      <div className="for-you-page__main-content">
        <Nav />
        <SelectedForYou />
        <Recommended />
        <SuggestedBooks />
      </div>
    </div>
  );
};

export default ForYouPage;
