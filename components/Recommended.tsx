'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiFillAudio, AiFillStar } from 'react-icons/ai';
import Link from 'next/link';
import Skeleton from './Skeleton';
import { useAuth } from '@/context/AuthContext';

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
}

const Recommended = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="recommended">
      <h2 className="recommended__title">Recommended For You</h2>
      <p className="recommended__subtitle">We think you’ll like these</p>
      <div className="recommended__books">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div className="recommended-book" key={index}>
              <Skeleton width="150px" height="150px" />
              <div className="recommended-book__details">
                <Skeleton width="100%" height="20px" />
                <Skeleton width="75%" height="16px" />
                <Skeleton width="50%" height="16px" />
                <div className="recommended-book__info">
                  <Skeleton width="50px" height="16px" />
                  <Skeleton width="50px" height="16px" />
                </div>
              </div>
            </div>
          ))
        ) : (
          books.slice(0, 5).map((book) => (
            <Link href={`/book/${book.id}`} key={book.id}>
              <div className="recommended-book">
                {!user && book.subscriptionRequired && <div className="recommended-book__pro-badge">Premium</div>}
                <div className="recommended-book__image-wrapper">
                    <Image src={book.imageLink} alt={book.title} width={150} height={150} />
                </div>
                <div className="recommended-book__details">
                  <h3 className="recommended-book__title">
                    {book.title}
                    {!user && book.subscriptionRequired && <span className="recommended-book__premium-tag"> (Premium)</span>}
                  </h3>
                  <p className="recommended-book__author">{book.author}</p>
                  <p className="recommended-book__subtitle">{book.subTitle}</p>
                  <div className="recommended-book__info">
                    <div className="recommended-book__duration">
                      <AiFillAudio />
                      <span>4:20</span>
                    </div>
                    <div className="recommended-book__rating">
                      <AiFillStar />
                      <span>{book.averageRating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default Recommended;
