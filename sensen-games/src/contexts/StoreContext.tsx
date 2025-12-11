import { createContext, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { type Game } from '../types';

interface CartItem extends Game {
  quantity: number;
}

interface StoreContextType {
  cart: CartItem[];
  wishlist: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (gameId?: Game | number | string) => void;
  updateQuantity: (gameId: Game | number | string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (game: Game) => void;
  removeFromWishlist: (gameId?: Game | number | string) => void;
  isInCart: (gameId?: Game | number | string) => boolean;
  isInWishlist: (gameId?: Game | number | string) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

type GameLike = Game & { _id?: string; slug?: string; id?: string | number };

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Game[]>([]);

  const getGameKey = (g?: GameLike | number | string) => {
    if (g == null) return '';
    if (typeof g === 'string' || typeof g === 'number') return String(g);
    // prefer backend _id, then id, then slug
    // ensure we always compare strings
    return String(g._id ?? g.id ?? g.slug ?? '');
  };

  const addToCart = (game: Game) => {
    setCart((currentCart) => {
      const key = getGameKey(game);
      const existingItem = currentCart.find((item) => getGameKey(item) === key);

      if (existingItem) {
        toast.success('Quantidade atualizada no carrinho!');
        return currentCart.map((item) =>
          getGameKey(item) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success(`${game.title} adicionado ao carrinho!`);
      // normalize id on insertion
      return [...currentCart, { ...(game as GameLike), id: key, quantity: 1 }];
    });
  };

  const removeFromCart = (gameId?: GameLike | number | string) => {
    const key = getGameKey(gameId);
    setCart((currentCart) => {
      const item = currentCart.find((item) => getGameKey(item) === key);
      if (item) {
        toast.info(`${item.title} removido do carrinho`);
      }
      return currentCart.filter((item) => getGameKey(item) !== key);
    });
  };

  const updateQuantity = (gameId: GameLike | number | string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(gameId);
      return;
    }
    const key = getGameKey(gameId);
    setCart((currentCart) =>
      currentCart.map((item) =>
        getGameKey(item) === key ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success('Carrinho limpo!');
  };

  const addToWishlist = (game: Game) => {
    setWishlist((currentWishlist) => {
      const key = getGameKey(game);
      if (currentWishlist.find((item) => getGameKey(item) === key)) {
        toast.info('Este jogo já está na sua lista de desejos!');
        return currentWishlist;
      }

      toast.success(`${game.title} adicionado à lista de desejos!`);
      // normalize id on insertion
      return [...currentWishlist, { ...(game as GameLike), id: key }];
    });
  };

  const removeFromWishlist = (gameId?: GameLike | number | string) => {
    const key = getGameKey(gameId);
    setWishlist((currentWishlist) => {
      const item = currentWishlist.find((item) => getGameKey(item) === key);
      if (item) {
        toast.info(`${item.title} removido da lista de desejos`);
      }
      return currentWishlist.filter((item) => getGameKey(item) !== key);
    });
  };

  const isInCart = (gameId?: GameLike | number | string) => {
    const key = getGameKey(gameId);
    return cart.some((item) => getGameKey(item) === key);
  };

  const isInWishlist = (gameId?: GameLike | number | string) => {
    const key = getGameKey(gameId);
    return wishlist.some((item) => getGameKey(item) === key);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInCart,
        isInWishlist,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export { StoreContext };
