import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useStore } from '../contexts/useStore';

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useStore();

  const formatPrice = (price: number) => `R$ ${price.toFixed(2).replace('.', ',')}`;

  const total = getCartTotal();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-primary" />
            <h2 className="text-3xl mb-4 text-general">Seu carrinho está vazio</h2>
            <p className="text-general mb-8">
              Adicione alguns jogos incríveis ao seu carrinho!
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
    <div className="min-h-screen page-bg text-general py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-4 text-primary">Carrinho de Compras</h1>
          <div className="flex justify-between items-center">
            <p className="text-general">
              {cart.length} {cart.length === 1 ? 'item' : 'itens'} no carrinho
            </p>
            <button
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 text-sm transition-colors"
            >
              Limpar carrinho
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item: typeof cart[number]) => (
              <div
              key={item.id}
              className="bg-general border border-slate-800 rounded-lg p-4 hover:border-violet-600/50 transition-colors"
              >
              <div className="flex gap-4">
                {/* Image */}
                <div className="w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-general">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                  <h3 className="text-xl text-general mb-1">{item.title}</h3>
                  <p className="text-sm text-general">{item.developer}</p>
                  </div>
                  <button
                  onClick={() => removeFromCart(item.id!)}
                  className="text-red-400 hover:text-red-300 transition-colors p-2"
                  title="Remover do carrinho"
                  >
                  <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {item.genre.slice(0, 2).map((g: string) => (
                  <span
                    key={g}
                    className="text-xs badge-primary-soft text-primary px-2 py-1 rounded"
                  >
                    {g}
                  </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id!, item.quantity - 1)}
                    className="bg-general hover:border-violet-600 text-general p-2 rounded transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-general w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id!, item.quantity + 1)}
                    className="bg-general hover:border-violet-600 text-general p-2 rounded transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                  <p className="text-violet-400">{formatPrice(item.price as number)}</p>
                  {item.quantity > 1 && (
                    <p className="text-xs text-slate-500">
                    {item.quantity} x {formatPrice(item.price as number)}
                    </p>
                  )}
                  </div>
                </div>
                </div>
              </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-general border border-slate-800 rounded-lg p-6 sticky top-24">
              <h2 className="text-2xl mb-6 text-general">Resumo do Pedido</h2>

              <div className="space-y-3 mb-6">
                {cart.map((item: typeof cart[number]) => (
                  <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-general">
                    {item.title} x{item.quantity}
                  </span>
                  <span className="text-general">
                    R$ {((item.price as number) * item.quantity).toFixed(2).replace('.', ',')}
                  </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-general">Total</span>
                  <span className="text-2xl text-violet-400">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button className="w-full btn-primary px-6 py-3 rounded-lg transition-colors mb-3">
                Finalizar Compra
              </button>

              <Link
                to="/catalogo"
                className="block text-center text-violet-400 hover:text-violet-300 transition-colors text-sm"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// useStore is provided by the StoreContext (see contexts/StoreContext.tsx)

