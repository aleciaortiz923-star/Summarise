'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Nav from '@/components/Nav';

import SelectedForYou from '@/components/SelectedForYou';

import Recommended from '@/components/Recommended';

import SuggestedBooks from '@/components/SuggestedBooks';

const ForYouPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="for-you-page__container">
      {isModalOpen && <LoginModal closeModal={closeModal} />}
      <div className={`sidebar-wrapper ${isSidebarOpen ? 'sidebar-wrapper--open' : ''}`}>
        <Sidebar openModal={openModal} />
      </div>
      <div className="for-you-page__main-content">
        <Nav toggleSidebar={toggleSidebar} />
        <SelectedForYou />
        <Recommended />
        <SuggestedBooks />
      </div>
    </div>
  );
};

export default ForYouPage;
