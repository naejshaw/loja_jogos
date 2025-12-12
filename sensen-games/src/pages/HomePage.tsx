import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Trophy } from 'lucide-react';
import axios from 'axios';
import type { Game } from '../types';
import { useSettings } from '../context/SettingsContext';

const HomePage = () => {
  const [gamesData, setGamesData] = useState<Game[]>([]);
  const [gamesLoading, setGamesLoading] = useState(true);
  const [gamesError, setGamesError] = useState<string | null>(null);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);

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

  useEffect(() => {
    if (gamesData.length > 0) {
      const timer = setInterval(() => {
        setCurrentGameIndex((prevIndex) => (prevIndex + 1) % gamesData.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [gamesData]);

  const goToNextGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex + 1) % gamesData.length);
  };

  const goToPreviousGame = () => {
    setCurrentGameIndex((prevIndex) => (prevIndex - 1 + gamesData.length) % gamesData.length);
  };

  const goToGame = (index: number) => {
    setCurrentGameIndex(index);
  };

  const heroGames = gamesData;
  const currentGame = heroGames[currentGameIndex];

  if (settingsLoading || gamesLoading) {
    return <div className="bg-gray-900 text-white h-screen flex items-center justify-center">Carregando dados...</div>;
  }

  if (settingsError || gamesError) {
    return <div className="bg-gray-900 text-red-500 h-screen flex items-center justify-center">Erro: {settingsError || gamesError}</div>;
  }

  if (gamesData.length === 0) {
    return <div className="bg-gray-900 text-white h-screen flex items-center justify-center">Nenhum jogo encontrado.</div>;
  }

  return (
    <div className="text-general">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentGame ? ('http://localhost:3001' + currentGame.image) : ''})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold">{settings?.homepageTitle || currentGame.title}</h1>
          <Link to={`/games/${currentGame.slug}`}>
            <button className="mt-8 btn-primary font-bold py-3 px-8 rounded-lg transition-colors">
              JOGUE AGORA
            </button>
          </Link>
        </div>

        <button
          onClick={goToPreviousGame}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNextGame}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-800 bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-4 w-full overflow-x-auto pb-2">
          <div className="flex space-x-2 justify-center">
            {heroGames.map((game, index) => (
              <img
                key={game._id}
                src={'http://localhost:3001' + game.image}
                alt={game.title}
                className={`h-16 w-24 object-cover cursor-pointer rounded-md transition-all flex-shrink-0 ${
                  index === currentGameIndex ? 'border-2 border-violet-600 scale-110' : 'border-2 border-transparent opacity-70'
                }`}
                onClick={() => goToGame(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-center mb-12 text-primary">
            {settings?.homepageFeaturedSectionTitle || 'Por Que Escolher a IndieVerse?'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-general border border-slate-800 rounded-lg p-6 hover:border-violet-600 transition-colors">
              <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl mb-3 text-general">Curadoria Especial</h3>
              <p className="text-general">
                Selecionamos cuidadosamente cada jogo para garantir qualidade e originalidade.
              </p>
            </div>

            <div className="bg-general border border-slate-800 rounded-lg p-6 hover:border-violet-600 transition-colors">
              <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl mb-3 text-general">Comunidade Ativa</h3>
              <p className="text-general">
                Faça parte de uma comunidade apaixonada por jogos indie e suas histórias únicas.
              </p>
            </div>

            <div className="bg-general border border-slate-800 rounded-lg p-6 hover:border-violet-600 transition-colors">
              <div className="w-12 h-12 bg-violet-600/20 rounded-lg flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl mb-3 text-general">Apoio aos Desenvolvedores</h3>
              <p className="text-general">
                Comprando aqui, você apoia diretamente os criadores independentes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-general">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl text-center mb-8 text-primary">
            {settings?.homepageAboutUsTitle || 'Sobre a IndieVerse'}
          </h2>
          <div className="space-y-4 text-general">
            <p>
              {settings?.homepageAboutUsText || 'Fundada por entusiastas de jogos indie, a IndieVerse nasceu da paixão por descobrir e compartilhar experiências de jogo únicas e inovadoras. Acreditamos que os melhores jogos nem sempre vêm dos grandes estúdios, mas sim de desenvolvedores independentes com visões criativas e ousadas.'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-6 text-violet-300">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-general mb-8">
            Explore nosso catálogo e encontre seu próximo jogo favorito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalogo"
              className="btn-primary px-8 py-3 rounded-lg transition-colors"
            >
              Ver Catálogo
            </Link>
            <Link
              to="/contato"
              className="bg-general hover:opacity-90 text-general px-8 py-3 rounded-lg transition-colors border border-slate-700"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;