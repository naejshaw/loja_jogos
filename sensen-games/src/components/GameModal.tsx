import { Star, ShoppingCart, Calendar, Users, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useStore } from '../contexts/useStore';
import { type Game } from '../types';
import { useState, useRef } from 'react';
import { resolveMedia } from '../utils/media';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface GameModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

export function GameModal({ game, isOpen, onClose }: GameModalProps) {
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useStore();

  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // use shared resolveMedia util

  if (!game) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-general border-slate-700 text-general">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary">
            {game.title}
          </DialogTitle>
          <DialogDescription className="text-general">
            {game.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Media: Image / Video toggle */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <button
                className={`px-3 py-1 rounded ${!showVideo ? 'bg-violet-600 text-white' : 'bg-general text-general'}`}
                onClick={() => setShowVideo(false)}
              >
                Ver Imagem
              </button>
              <button
                className={`px-3 py-1 rounded ${showVideo ? 'bg-violet-600 text-white' : 'bg-general text-general'}`}
                onClick={() => setShowVideo(true)}
              >
                Ver Vídeo
              </button>
            </div>

            <div className="aspect-video overflow-hidden rounded-lg bg-general">
              {!showVideo ? (
                <ImageWithFallback src={imageSrc} alt={game.title} className="w-full h-full object-cover" />
              ) : videoSrc ? (
                <video ref={videoRef} src={videoSrc} controls autoPlay loop className="w-full h-full object-cover" poster={imageSrc} />
              ) : (
                <ImageWithFallback src={imageSrc} alt={game.title} className="w-full h-full object-cover" />
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 bg-general p-3 rounded-lg">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <div>
                <p className="text-xs text-general">Avaliação</p>
                <p className="text-general">{game.rating}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-general p-3 rounded-lg">
              <Calendar className="w-5 h-5 text-violet-400" />
              <div>
                <p className="text-xs text-general">Lançamento</p>
                <p className="text-general">{String(game.releaseDate ?? '2024').slice(0, 10)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-general p-3 rounded-lg">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-general">Jogadores</p>
                <p className="text-general">{game.players || '1'}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-general p-3 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-xs text-general">Preço</p>
                <p className="text-general">{`R$ ${game.price.toFixed(2).replace('.', ',')}`}</p>
              </div>
            </div>
          </div>

          {/* Developer */}
          <div>
            <h3 className="text-general text-sm mb-1">Desenvolvedor</h3>
            <p className="text-general">{game.developer}</p>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-general text-sm mb-2">Gêneros</h3>
            <div className="flex flex-wrap gap-2">
              {game.genre.map((g) => (
                <span
                  key={g}
                  className="badge-primary-soft text-primary px-3 py-1 rounded-full text-sm"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-general text-sm mb-2">Descrição</h3>
            <p className="text-general leading-relaxed">
              {game.detailedDescription || game.description}
            </p>
          </div>

          {/* Features (Example) */}
          <div>
            <h3 className="text-general text-sm mb-2">Características</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-general">
                <span className="text-violet-400 mt-1">•</span>
                <span>Gráficos impressionantes e arte única</span>
              </li>
              <li className="flex items-start gap-2 text-general">
                <span className="text-violet-400 mt-1">•</span>
                <span>Jogabilidade envolvente e desafiadora</span>
              </li>
              <li className="flex items-start gap-2 text-general">
                <span className="text-violet-400 mt-1">•</span>
                <span>Trilha sonora original e imersiva</span>
              </li>
              <li className="flex items-start gap-2 text-general">
                <span className="text-violet-400 mt-1">•</span>
                <span>Suporte completo para controles</span>
              </li>
            </ul>
          </div>

          {/* System Requirements */}
          <div className="bg-general p-4 rounded-lg">
            <h3 className="text-general mb-3">Requisitos do Sistema</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs text-general mb-2">MÍNIMO</h4>
                <ul className="space-y-1 text-sm text-general">
                  <li>OS: Windows 10</li>
                  <li>CPU: Intel i5 ou equivalente</li>
                  <li>RAM: 8 GB</li>
                  <li>GPU: GTX 1050</li>
                  <li>Armazenamento: 5 GB</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs text-general mb-2">RECOMENDADO</h4>
                <ul className="space-y-1 text-sm text-general">
                  <li>OS: Windows 11</li>
                  <li>CPU: Intel i7 ou equivalente</li>
                  <li>RAM: 16 GB</li>
                  <li>GPU: RTX 2060</li>
                  <li>Armazenamento: 10 GB</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                inCart
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'btn-primary'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {inCart ? 'No Carrinho' : 'Adicionar ao Carrinho'}
            </button>
            <button
              onClick={handleAddToWishlist}
              className={`flex-1 px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                inWishlist
                  ? 'bg-pink-600 hover:bg-pink-700 text-white'
                  : 'bg-general hover:opacity-90 text-general'
              }`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              {inWishlist ? 'Na Lista de Desejos' : 'Adicionar à Lista de Desejos'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
// useStore hook provided by contexts/StoreContext