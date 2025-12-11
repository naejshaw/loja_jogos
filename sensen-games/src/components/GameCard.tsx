import React, { useRef } from 'react';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
  onClick?: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onClick }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasVideo = !!game.video && game.video.trim() !== '';

  const resolveMedia = (s?: string) => {
    if (!s) return ''
    if (s.startsWith('/')) return `http://localhost:3001${s}`
    return s
  }

  const handleMouseEnter = () => {
    if (hasVideo) {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }
  };

  const handleMouseLeave = () => {
    if (hasVideo) {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div
      className="group relative m-1 cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-video bg-general"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <img src={resolveMedia(game.image)} alt={game.title} className={`h-full w-full object-cover transition-opacity ${hasVideo && 'group-hover:opacity-0'}`} />
      {hasVideo && (
        <>
          <video
            ref={videoRef}
            src={resolveMedia(game.video)}
            loop
            className="absolute top-0 left-0 h-full w-full object-cover opacity-0 transition-opacity group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-5 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white opacity-75 transition-opacity group-hover:opacity-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </>
      )}
      <div className={`absolute inset-0 bg-black bg-opacity-75 opacity-0 transition-opacity ${hasVideo && 'group-hover:opacity-100 group-hover:bg-opacity-5'} flex items-center justify-center`}>
        <h3 className="text-center text-2xl font-bold text-general">{game.title}</h3>
      </div>
    </div>
  );
};

export default GameCard;
