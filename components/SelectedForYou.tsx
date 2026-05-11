'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { AiFillAudio } from 'react-icons/ai';
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

const SelectedForYou = () => {
  const [book, setBook] = useState<Book | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch('https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected');
        const data = await response.json();
        // The API returns an array, so we take the first book
        if (data && data.length > 0) {
          setTimeout(() => {
            setBook(data[0]);
          }, 500);
        }
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, []);

  return (
    <section className="selected-for-you">
      <h2 className="selected-for-you__title">Selected just for you</h2>
      {book ? (
        <div className="selected-for-you__book">
          <div className="selected-for-you__book-subtitle">
            {book.subTitle}
          </div>
          <div className="selected-for-you__book-image-wrapper">
            <Image src={book.imageLink} alt={book.title} width={150} height={150} />
          </div>
          <div className="selected-for-you__book-details">
            <h3 className="selected-for-you__book-title">{book.title}{!user && book.subscriptionRequired && ' (Premium)'}</h3>
            <p className="selected-for-you__book-author">{book.author}</p>
            <div className="selected-for-you__book-duration">
                <div className="selected-for-you__book-play-icon">
                    <AiFillAudio />
                </div>
              <span>3 mins 23 secs</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="selected-for-you__book">
          <div className="selected-for-you__book-subtitle">
            <Skeleton width="200px" height="16px" />
          </div>
          <div className="selected-for-you__book-image-wrapper">
            <Skeleton width="150px" height="150px" />
          </div>
          <div className="selected-for-you__book-details">
            <Skeleton width="250px" height="20px" className="selected-for-you__book-title" />
            <Skeleton width="150px" height="16px" className="selected-for-you__book-author" />
            <div className="selected-for-you__book-duration">
              <Skeleton width="40px" height="40px" className="selected-for-you__book-play-icon" />
              <Skeleton width="100px" height="16px" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SelectedForYou;
