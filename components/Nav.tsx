import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from './Skeleton';

interface Book {
  id: string;
  author: string;
  title: string;
  imageLink: string;
}

const Nav = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(() => {
      fetchBooks();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return (
    <nav className="nav-for-you">
      <div className="nav-for-you__search-container">
        <input
          type="text"
          placeholder="Search for books"
          className="nav-for-you__search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <AiOutlineSearch className="nav-for-you__search-icon" />
        {searchQuery && (
          <div className="search-results-dropdown">
            {loading ? (
              <div className="search-results-dropdown__item">
                <Skeleton width="40px" height="40px" />
                <div className="search-results-dropdown__details" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Skeleton width="100%" height="16px" />
                  <Skeleton width="50%" height="14px" />
                </div>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((book) => (
                <Link href={`/book/${book.id}`} key={book.id}>
                  <div className="search-results-dropdown__item">
                    <figure className="search-results-dropdown__image--wrapper">
                      <Image src={book.imageLink} alt={book.title} width={40} height={40} />
                    </figure>
                    <div className="search-results-dropdown__details">
                                            <h4 className="search-results-dropdown__title">
                        {book.title}
                        {book.subscriptionRequired && <span className="search-results-dropdown__premium-tag"> (Premium)</span>}
                      </h4>
                      <p className="search-results-dropdown__author">{book.author}</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="search-results-dropdown__item">No books found.</div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
