import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowRight, Star } from 'lucide-react';
import { type Game } from '../types';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useStore } from '../contexts/useStore';

export function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, isInCart } = useStore();

  const handleAddToCart = (game: Game) => {
    addToCart(game);
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <Heart className="w-24 h-24 mx-auto mb-6 text-slate-700" />
            <h2 className="text-3xl mb-4 text-slate-300">Sua lista de desejos está vazia</h2>
            <p className="text-slate-400 mb-8">
              Salve seus jogos favoritos para comprar depois!
            </p>
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 btn-primary px-6 py-3 rounded-lg transition-colors"
            >
              Explorar Catálogo
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-4 text-violet-300">Lista de Desejos</h1>
          <p className="text-slate-300">
            {wishlist.length} {wishlist.length === 1 ? 'jogo' : 'jogos'} na sua lista
          </p>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((game: Game) => {
            const g = game as unknown as { _id?: string; id?: string; slug?: string };
            const gameKey = g._id ?? g.id ?? g.slug ?? game.title;
            return (
            <div
              key={String(gameKey)}
              className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden hover:border-violet-600 transition-all group"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden bg-slate-800">
              <ImageWithFallback
                src={game.image}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Remove Button */}
              <button
                onClick={() => removeFromWishlist(game)}
                className="absolute top-2 right-2 bg-slate-900/80 hover:bg-red-600 text-slate-100 p-2 rounded-full transition-colors"
                title="Remover da lista de desejos"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {/* In Cart Badge */}
              {isInCart(game) && (
                <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                <ShoppingCart className="w-3 h-3" />
                No carrinho
                </div>
              )}
              </div>

              {/* Info */}
              <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl text-slate-100">{game.title}</h3>
                <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm">{game.rating}</span>
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-3">{game.developer}</p>

              <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                {game.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {game.genre.slice(0, 2).map((g: string) => (
                <span
                  key={g}
                  className="text-xs badge-primary-soft text-primary px-2 py-1 rounded"
                >
                  {g}
                </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-violet-400">{game.price}</span>
                <button
                onClick={() => handleAddToCart(game)}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                  isInCart(game)
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'btn-primary'
                }`}
                >
                <ShoppingCart className="w-4 h-4" />
                {isInCart(game) ? 'No carrinho' : 'Adicionar'}
                </button>
              </div>
              </div>
              </div>
            );
            })}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
            Continuar explorando
          </Link>
        </div>
      </div>
    </div>
  );
}

// useStore hook is exported from contexts/StoreContext
