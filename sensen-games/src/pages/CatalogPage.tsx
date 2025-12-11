import { useState, useEffect } from 'react';
import { Star, Tag } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { GameModal } from '../components/GameModal';
import type { Game } from '../types';
import { useSettings } from '../context/SettingsContext';
import axios from 'axios';

const CatalogPage = () => {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('Todos');

  const { settings, loading: settingsLoading, error: settingsError } = useSettings();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/games');
        setGamesData(response.data);
      } catch (err) {
        setGamesError('Failed to fetch games from API.');
        console.error('Error fetching games:', err);
      } finally {
        setGamesLoading(false);
      }
    };
    fetchGames();
  }, []);

  const allGenres = ['Todos', ...new Set(gamesData.flatMap(game => game.genre))];

  const filteredGames = selectedGenre === 'Todos'
    ? gamesData
    : gamesData.filter(game => game.genre.includes(selectedGenre));

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  if (settingsLoading || gamesLoading) {
    return <div className="bg-gray-900 text-white h-screen flex items-center justify-center">Carregando dados...</div>;
  }

  if (settingsError || gamesError) {
    return <div className="bg-gray-900 text-red-500 h-screen flex items-center justify-center">Erro: {settingsError || gamesError}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4 text-violet-300">{settings?.catalogPageTitle || 'Catálogo de Jogos'}</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore nossa seleção curada de jogos indie incríveis
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-violet-400" />
            <span className="text-slate-300">Filtrar por gênero:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedGenre === genre
                    ? 'bg-violet-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game._id}
              className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-violet-600 transition-all hover:scale-105 cursor-pointer"
              onClick={() => handleGameClick(game)}
            >
              <div className="aspect-video overflow-hidden bg-slate-800">
                <ImageWithFallback
                  src={'http://localhost:3001' + game.image}
                  alt={game.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl text-slate-100">{game.title}</h3>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm">{game.rating}</span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-400 mb-3">{game.developer}</p>
                
                <p className="text-slate-300 text-sm mb-4">{game.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.genre.map((g) => (
                    <span
                      key={g}
                      className="text-xs badge-primary-soft text-primary px-2 py-1 rounded"
                    >
                      {g}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-violet-400">{`R$ ${game.price.toFixed(2).replace('.', ',')}`}</span>
                  <button 
                    className="btn-primary px-4 py-2 rounded transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGameClick(game);
                    }}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-xl">
              Nenhum jogo encontrado para este gênero.
            </p>
          </div>
        )}
      </div>

      <GameModal 
        game={selectedGame} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
};

export default CatalogPage;