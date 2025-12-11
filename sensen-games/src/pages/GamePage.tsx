import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import type { Game } from '../types';

const GamePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (!slug) {
        setError('Nenhum slug de jogo fornecido.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3001/api/games/${slug}`);
        setGame(response.data);
      } catch (err) {
        setError('Falha ao buscar detalhes do jogo.');
        console.error('Erro ao buscar jogo:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGame();
  }, [slug]);

  if (loading) {
    return <div className="container mx-auto p-4 text-white text-center">Carregando jogo...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500 text-center">Erro: {error}</div>;
  }

  if (!game) {
    return <div className="container mx-auto p-4 text-white text-center">Jogo não encontrado</div>;
  }

  return (
    <div style={{
        backgroundColor: `var(--page-background-color)`,
      }} className="container mx-auto p-4 text-white">
      <h1 className="text-4xl font-bold mb-4">{game.title}</h1>
      <img src={'http://localhost:3001' + game.image} alt={game.title} className="w-full h-auto mb-4" />
      <p>{game.description}</p>
      {/* Optionally display platforms and store links */}
      {game.platforms && game.platforms.length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Plataformas:</h2>
          <p>{game.platforms.join(', ')}</p>
        </div>
      )}
      {game.storeLinks && Object.keys(game.storeLinks).length > 0 && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">Onde Comprar:</h2>
          <ul>
            {Object.entries(game.storeLinks).map(([store, link]) => (
              <li key={store}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  {store}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GamePage;