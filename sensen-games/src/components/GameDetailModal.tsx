import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaSteam } from 'react-icons/fa';
import type { Game } from '../types';

interface GameDetailModalProps {
  game: Game;
  onClose: () => void;
}

const platformIcons: { [key: string]: React.ElementType } = {

  PC: FaSteam,
};

const GameDetailModal: React.FC<GameDetailModalProps> = ({ game, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-4xl rounded-lg bg-gray-900 p-8">
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
        >
          <FaTimes size={24} />
        </button>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <video src={game.video && game.video.startsWith('/') ? `http://localhost:3001${game.video}` : game.video} autoPlay loop className="h-full w-full rounded-lg object-cover" />
          </div>
          <div>
            <h2 className="mb-4 text-4xl font-bold">{game.title}</h2>
            <p className="mb-4 text-lg">{game.description}</p>
            <div className="mb-4">
              <h3 className="mb-2 text-2xl font-bold">Plataformas</h3>
              <div className="flex space-x-4">
                {game.platforms?.map((platform) => {
                  const Icon = platformIcons[platform];
                  return Icon ? <Icon key={platform} size={32} /> : null;
                })}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="mb-2 text-2xl font-bold">Compre Agora</h3>
              <div className="flex space-x-4">
                {Object.entries(game.storeLinks || {}).map(([store, link]) => {
                  const Icon = platformIcons[store === 'steam' ? 'PC' : store]; // Simplified icon mapping logic
                  return (
                    <a
                      key={store}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-400 flex items-center space-x-2" // Added flex for better alignment
                    >
                      {Icon ? <Icon size={32} /> : <span className="text-xl">{store}</span>} {/* Display store name if no icon */}
                    </a>
                  );
                })}
              </div>
            </div>
            <Link to={`/games/${game.slug}`}>
              <button className="mt-4 bg-blue-600 px-4 py-2 font-bold text-white rounded-md hover:bg-blue-700">
                Ver mais
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailModal;
