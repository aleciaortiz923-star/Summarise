'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { AiOutlineClockCircle, AiOutlineBook, AiOutlineAudio, AiOutlineStar } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import Sidebar from '@/components/Sidebar';
import Nav from '@/components/Nav';
import Link from 'next/link';
import Skeleton from '@/components/Skeleton';
import { useAuth } from '@/context/AuthContext';
import { useModal } from '@/context/ModalContext';

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

const BookPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const { user } = useAuth();
  const { openModal } = useModal();

  const handleAddToLibrary = () => {
    setIsAdded(true);
  };

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          setLoading(true);
          const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
          const data = await response.json();
          setBook(data);
        } catch (error) {
          console.error('Error fetching book:', error);
        } finally {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        }
      };

      fetchBook();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="for-you-page__container">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <div className="for-you-page__main-content">
          <Nav />
          <div className="book-page__container">
            <div className="book-page__right">
              <Skeleton width="300px" height="300px" />
            </div>
            <div className="book-page__left">
              <Skeleton width="300px" height="36px" />
              <Skeleton width="150px" height="20px" />
              <Skeleton width="200px" height="16px" />
              <div className="book-page__info-wrapper">
                <Skeleton width="100px" height="20px" />
                <Skeleton width="100px" height="20px" />
                <Skeleton width="100px" height="20px" />
                <Skeleton width="100px" height="20px" />
              </div>
              <div className="book-page__actions">
                <Skeleton width="120px" height="48px" />
                <Skeleton width="120px" height="48px" />
              </div>
              <Skeleton width="180px" height="20px" />
              <div className="book-page__section">
                <Skeleton width="150px" height="24px" />
                <div className="book-page__tags">
                  <Skeleton width="80px" height="24px" />
                  <Skeleton width="80px" height="24px" />
                </div>
                <Skeleton width="100%" height="16px" />
                <Skeleton width="100%" height="16px" />
                <Skeleton width="50%" height="16px" />
              </div>
              <div className="book-page__section">
                <Skeleton width="150px" height="24px" />
                <Skeleton width="100%" height="16px" />
                <Skeleton width="100%" height="16px" />
                <Skeleton width="50%" height="16px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
        <div className="for-you-page__container">
            <div className="sidebar-wrapper">
                <Sidebar />
            </div>
            <div className="for-you-page__main-content">
                <Nav />
                <div>Book not found.</div>
            </div>
        </div>
    );
  }

  return (
    <div className="for-you-page__container">

      <div className="for-you-page__main-content">
        <Nav />
        <div className="book-page__container">
          <div className="book-page__right">
            <Image src={book.imageLink} alt={book.title} width={300} height={300} />
          </div>
          <div className="book-page__left">
            <h1 className="book-page__title">
              {book.title}
              {!user && book.subscriptionRequired && <span className="book-page__premium-tag"> (Premium)</span>}
            </h1>
            <p className="book-page__author">{book.author}</p>
            <p className="book-page__subtitle">{book.subTitle}</p>
            <div className="book-page__info-wrapper">
              <div className="book-page__info-item">
                <AiOutlineStar />
                <span>{book.averageRating} ({book.totalRating} ratings)</span>
              </div>
              <div className="book-page__info-item">
                <AiOutlineClockCircle />
                <span>04:40</span>
              </div>
              <div className="book-page__info-item">
                <AiOutlineAudio />
                <span>Audio & Text</span>
              </div>
              <div className="book-page__info-item">
                <FontAwesomeIcon icon={faLightbulb} />
                <span>{book.keyIdeas} Key ideas</span>
              </div>
            </div>
            <div className="book-page__actions">
              <button className="book-page__button book-page__button--primary">
                <AiOutlineBook style={{ marginRight: '8px' }} />
                Read
              </button>
              {!user && (
                <button
                  className="book-page__button book-page__button--secondary"
                  onClick={() => openModal(`/player/${id}`)}
                >
                  <AiOutlineAudio style={{ marginRight: '8px' }} />
                  Listen
                </button>
              )}
              {user && (
                <Link href={`/player/${id}`}>
                  <button className="book-page__button book-page__button--secondary">
                    <AiOutlineAudio style={{ marginRight: '8px' }} />
                    Listen
                  </button>
                </Link>
              )}
            </div>
            <button onClick={handleAddToLibrary} disabled={isAdded} className="book-page__add-to-library">
                {isAdded ? 'Added to Library' : '+ Add title to My Library'}
              </button>
              
            <div className="book-page__section">
              <h3 className="book-page__section-title">What's it about?</h3>
              <div className="book-page__tags">
                {book.tags.map(tag => <div key={tag} className="book-page__tag">{tag}</div>)}
              </div>
              <p>{book.bookDescription}</p>
            </div>
            <div className="book-page__section">
              <h3 className="book-page__section-title">About the author</h3>
              <p>{book.authorDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
