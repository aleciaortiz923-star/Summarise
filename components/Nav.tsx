'use client';

import React from 'react';
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai';

const Nav = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <nav className="nav-for-you">
      <button className="nav-for-you__menu-button" onClick={toggleSidebar}>
        <AiOutlineMenu />
      </button>
      <div className="nav-for-you__search-container">
        <input type="text" placeholder="Search for books" className="nav-for-you__search-input" />
        <AiOutlineSearch className="nav-for-you__search-icon" />
      </div>
    </nav>
  );
};

export default Nav;
