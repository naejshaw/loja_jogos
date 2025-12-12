import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Star, ShoppingCart, Calendar, Users, Heart, ArrowLeft } from 'lucide-react';
import { FaSteam } from 'react-icons/fa'; // Only for platform icon mapping
import type { Game } from '../types';
import { resolveMedia } from '../utils/media';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useStore } from '../contexts/useStore';


const platformIcons: { [key: string]: React.ElementType } = {
  PC: FaSteam,
};

const GamePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate(); // Initialize useNavigate
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { addToCart, addToWishlist, isInCart, isInWishlist } = useStore();


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
    return <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">Carregando jogo...</div>;
  }

  if (error) {
    return <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8 text-red-500 flex items-center justify-center">Erro: {error}</div>;
  }

  if (!game) {
    return <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">Jogo não encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart(game);
  };

  const handleAddToWishlist = () => {
    addToWishlist(game);
  };

  const inCart = isInCart(game);
  const inWishlist = isInWishlist(game);

  const videoSrc = resolveMedia(game.video);
  const imageSrc = resolveMedia(game.image);

  return (
    <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto relative"> {/* Added relative to position back button */}
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="fixed mt-1 top-16 left-4 z-40 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full shadow-lg transition-colors flex items-center justify-center"
          aria-label="Voltar"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h1 className="text-4xl font-bold mb-6 text-primary">{game.title}</h1>

        <div className="space-y-8">
          {/* Media: Image / Video toggle */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${!showVideo ? 'bg-violet-600 text-white' : 'bg-general text-general'}`}
                onClick={() => setShowVideo(false)}
              >
                Ver Imagem
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${showVideo ? 'bg-violet-600 text-white' : 'bg-general text-general'}`}
                onClick={() => setShowVideo(true)}
              >
                Ver Vídeo
              </button>
            </div>

            <div className="aspect-video overflow-hidden rounded-lg bg-general shadow-lg">
              {!showVideo ? (
                <ImageWithFallback src={imageSrc} alt={game.title} className="w-full h-full object-cover" />
              ) : videoSrc ? (
                <video ref={videoRef} src={videoSrc} controls autoPlay loop className="w-full h-full object-cover" poster={imageSrc} />
              ) : (
                <ImageWithFallback src={imageSrc} alt={game.title} className="w-full h-full object-cover" />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg ${
                inCart
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'btn-primary'
              }`}
            >
              <ShoppingCart className="w-6 h-6" />
              {inCart ? 'No Carrinho' : 'Adicionar ao Carrinho'}
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`flex-1 px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-lg ${
                inWishlist
                  ? 'bg-pink-600 hover:bg-pink-700 text-white'
                  : 'bg-general hover:opacity-90 text-general border border-slate-700'
              }`}
            >
              <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
              {inWishlist ? 'Na Lista de Desejos' : 'Adicionar à Lista de Desejos'}
            </button>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 bg-general p-4 rounded-lg shadow-md">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <div>
                <p className="text-sm text-general">Avaliação</p>
                <p className="text-general text-lg font-semibold">{game.rating}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-general p-4 rounded-lg shadow-md">
              <Calendar className="w-6 h-6 text-violet-400" />
              <div>
                <p className="text-sm text-general">Lançamento</p>
                <p className="text-general text-lg font-semibold">{String(game.releaseDate ?? '2024')}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-general p-4 rounded-lg shadow-md">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-sm text-general">Jogadores</p>
                <p className="text-general text-lg font-semibold">{game.players || '1'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-general p-4 rounded-lg shadow-md">
              <ShoppingCart className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-sm text-general">Preço</p>
                <p className="text-general text-lg font-semibold">{`R$ ${game.price.toFixed(2).replace('.', ',')}`}</p>
              </div>
            </div>
          </div>

          {/* Developer */}
          <div className="bg-general p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-primary">Desenvolvedor</h3>
            <p className="text-general leading-relaxed">{game.developer}</p>
          </div>

          {/* Genres */}
          <div className="bg-general p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary">Gêneros</h3>
            <div className="flex flex-wrap gap-3">
              {game.genre.map((g) => (
                <span
                  key={g}
                  className="badge-primary-soft text-primary px-4 py-2 rounded-full text-md font-medium"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="bg-general p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2 text-primary">Sobre este Jogo</h3>
            <p className="text-general leading-relaxed">
              {game.detailedDescription || game.description}
            </p>
          </div>

          {/* Features (Example) */}
          <div className="bg-general p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary">Características Principais</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-general">
                <span className="text-violet-400 mt-1 text-lg">•</span>
                <span>Gráficos impressionantes e arte única que transportam você para um mundo imersivo.</span>
              </li>
              <li className="flex items-start gap-3 text-general">
                <span className="text-violet-400 mt-1 text-lg">•</span>
                <span>Jogabilidade envolvente e desafiadora, com horas de diversão e exploração.</span>
              </li>
              <li className="flex items-start gap-3 text-general">
                <span className="text-violet-400 mt-1 text-lg">•</span>
                <span>Trilha sonora original e imersiva que complementa perfeitamente a atmosfera do jogo.</span>
              </li>
              <li className="flex items-start gap-3 text-general">
                <span className="text-violet-400 mt-1 text-lg">•</span>
                <span>Suporte completo para controles, proporcionando uma experiência de jogo flexível.</span>
              </li>
              <li className="flex items-start gap-3 text-general">
                <span className="text-violet-400 mt-1 text-lg">•</span>
                <span>Atualizações regulares e conteúdo adicional para manter a experiência sempre nova.</span>
              </li>
            </ul>
          </div>

          {/* System Requirements */}
          <div className="bg-general p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-primary">Requisitos do Sistema</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-semibold text-general mb-2">MÍNIMO</h4>
                <ul className="space-y-2 text-sm text-general">
                  <li><span className="font-medium">OS:</span> Windows 10</li>
                  <li><span className="font-medium">CPU:</span> Intel i5 ou equivalente</li>
                  <li><span className="font-medium">RAM:</span> 8 GB</li>
                  <li><span className="font-medium">GPU:</span> GTX 1050</li>
                  <li><span className="font-medium">Armazenamento:</span> 5 GB</li>
                </ul>
              </div>
              <div>
                <h4 className="text-md font-semibold text-general mb-2">RECOMENDADO</h4>
                <ul className="space-y-2 text-sm text-general">
                  <li><span className="font-medium">OS:</span> Windows 11</li>
                  <li><span className="font-medium">CPU:</span> Intel i7 ou equivalente</li>
                  <li><span className="font-medium">RAM:</span> 16 GB</li>
                  <li><span className="font-medium">GPU:</span> RTX 2060</li>
                  <li><span className="font-medium">Armazenamento:</span> 10 GB</li>
                </ul>
              </div>
            </div>
          </div>

           {/* Store Links (from original GamePage, slightly adapted) */}
           {game.storeLinks && Object.keys(game.storeLinks).length > 0 && (
            <div className="bg-general p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-primary">Onde Comprar</h3>
              <div className="flex flex-wrap gap-4">
                {Object.entries(game.storeLinks).map(([store, link]) => {
                  const Icon = platformIcons[store === 'steam' ? 'PC' : store]; // Re-using platformIcons for store links
                  return (
                    <a
                      key={store}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-violet-400 flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg transition-colors"
                    >
                      {Icon ? <Icon size={24} className="text-general" /> : <span className="text-general font-medium">{store}</span>}
                      <span className="text-general font-medium">{store === 'steam' ? 'Steam' : store}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;