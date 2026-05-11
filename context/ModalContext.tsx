'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  isModalOpen: boolean;
  redirectPath: string | null;
  openModal: (path?: string) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const openModal = (path?: string) => {
    setIsModalOpen(true);
    if (path && typeof path === 'string') {
      setRedirectPath(path);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRedirectPath(null);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, redirectPath }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
