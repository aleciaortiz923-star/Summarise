'use client';

import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Nav = () => {
  return (
    <nav className="nav-for-you">
      <div className="nav-for-you__search-container">
        <input type="text" placeholder="Search for books" className="nav-for-you__search-input" />
        <AiOutlineSearch className="nav-for-you__search-icon" />
      </div>
    </nav>
  );
};

export default Nav;
