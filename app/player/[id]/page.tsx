'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import Nav from '@/components/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPlay, faPause, faRotateLeft, faRotateRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useFontSize } from '@/context/FontSizeContext';

interface Book {
  id: string;
  author: string;
  title: string;
  imageLink: string;
  audioLink: string;
  summary: string;
}

const PlayerPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { fontSize } = useFontSize();

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

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgress = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (audioRef.current) {
      const timeline = e.currentTarget;
      const rect = timeline.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = audioRef.current.duration * percentage;
    }
  };

  const forward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const backward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging && audioRef.current && timelineRef.current) {
      const timeline = timelineRef.current;
      const rect = timeline.getBoundingClientRect();
      let percentage = (e.clientX - rect.left) / rect.width;
      if (percentage < 0) percentage = 0;
      if (percentage > 1) percentage = 1;
      audioRef.current.currentTime = audioRef.current.duration * percentage;
    }
  };

  if (loading) {
    return (
      <div className="for-you-page__main-content">
        <Nav />
        <div>Loading...</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="for-you-page__main-content">
        <Nav />
        <div>Book not found.</div>
      </div>
    );
  }

  return (
    <>
      <Nav />
      <div className="player-page__summary">
        <h1 className="player-page__summary-title">{book.title}</h1>
        <div className={`player-page__summary-text font-size--${fontSize}`}>
          {book.summary.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="player-controls__container">
        <div className="player-controls__book-details">
          <Image
            src={book.imageLink}
            alt={book.title}
            width={56}
            height={56}
            className="player-controls__book-image"
          />
          <div>
            <div className="player-controls__book-title">{book.title}</div>
            <div className="player-controls__book-author">{book.author}</div>
          </div>
        </div>
        <div className="player-controls__buttons">
          <button onClick={backward}>
            <FontAwesomeIcon icon={faRotateLeft} />
            <span className="skip-amount">10</span>
          </button>
          <button onClick={togglePlayPause} className="player-controls__play-btn">
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
          </button>
          <button onClick={forward}>
            <FontAwesomeIcon icon={faRotateRight} />
            <span className="skip-amount">10</span>
          </button>
        </div>
        <div className="player-controls__timeline-container"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp} 
        >
          <div className="player-controls__timeline-time">{formatTime(currentTime)}</div>
          <div className="player-controls__timeline" onClick={seek} ref={timelineRef}>
            <div className="player-controls__progress" style={{ width: `${progress}%` }}>
              <div className="player-controls__thumb" onMouseDown={handleMouseDown}></div>
            </div>
          </div>
          <div className="player-controls__timeline-time">{formatTime(duration)}</div>
        </div>
      </div>
      <audio ref={audioRef} src={book.audioLink} onTimeUpdate={handleProgress} onLoadedMetadata={handleLoadedMetadata} />
    </>
  );
};

export default PlayerPage;
