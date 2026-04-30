'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiOutlineHome, AiOutlineSearch, AiOutlineSetting } from 'react-icons/ai';
import { BsBookmark, BsPencil } from 'react-icons/bs';
import { BiHelpCircle } from 'react-icons/bi';
import { useAuth } from '@/context/AuthContext';
import { useFirebase } from '@/context/FirebaseProvider';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { FaBook } from 'react-icons/fa';
import { useModal } from '@/context/ModalContext';

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const { auth } = useFirebase();
  const { openModal } = useModal();

  const handleLogout = async () => {
    if (auth) {
      await auth.signOut();
      openModal();
    }
  };

  const links = [
    { name: 'For you', href: '/for-you', icon: AiOutlineHome },
    { name: 'My Library', href: '/library', icon: BsBookmark },
    { name: 'Highlights', href: '/highlights', icon: BsPencil, disabled: true },
    { name: 'Search', href: '/search', icon: AiOutlineSearch, disabled: true },
  ];

  const bottomLinks = [
    { name: 'Settings', href: '/settings', icon: AiOutlineSetting },
    { name: 'Help & Support', href: '/help', icon: BiHelpCircle, disabled: true },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <FaBook />
        Summarist
      </div>
      <div className="sidebar__links">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link href={link.href} key={link.name} className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''} ${link.disabled ? 'sidebar__link--disabled' : ''}`}>
                <Icon />
                <span>{link.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="sidebar__bottom-links">
        {bottomLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link href={link.href} key={link.name} className={`sidebar__link ${link.disabled ? 'sidebar__link--disabled' : ''}`}>
                <Icon />
                <span>{link.name}</span>
            </Link>
          );
        })}
        {user ? (
          <div className="sidebar__link" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </div>
        ) : (
          <div className="sidebar__link" onClick={openModal}>
            <FiLogIn />
            <span>Login</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
