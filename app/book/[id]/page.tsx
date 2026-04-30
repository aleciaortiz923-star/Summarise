'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { AiOutlineClockCircle, AiOutlineBook, AiOutlineAudio, AiOutlineStar } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-regular-svg-icons';
import Sidebar from '@/components/Sidebar';
import Nav from '@/components/Nav';

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
          setLoading(false);
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
                <div>Loading...</div>
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
      <div className="sidebar-wrapper">
        <Sidebar />
      </div>
      <div className="for-you-page__main-content">
        <Nav />
        <div className="book-page__container">
          <div className="book-page__left">
            <h1 className="book-page__title">{book.title}</h1>
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
              <button className="book-page__button book-page__button--secondary">
                <AiOutlineAudio style={{ marginRight: '8px' }} />
                Listen
              </button>
            </div>
            <a href="#" className="book-page__add-to-library">+ Add title to My Library</a>
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
          <div className="book-page__right">
            <Image src={book.imageLink} alt={book.title} width={300} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPage;
