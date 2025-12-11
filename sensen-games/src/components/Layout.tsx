import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Menu, X, ShoppingCart, Heart } from 'lucide-react';
import Footer from './Footer';
import { useState } from 'react';
import { useStore } from '../contexts/useStore';
import { useSettings } from '../context/SettingsContext';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount, wishlist } = useStore();
  const { settings } = useSettings();

  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Contato', href: '/contato' },
  ];

  const isActive = (href: string) => location.pathname === href;

  const cartCount = getCartCount();
  const wishlistCount = wishlist.length;

  return (
    <div className="min-h-screen flex flex-col bg-general text-general font-site">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors">
              {settings?.logoUrl ? (
                <img
                  src={settings.logoUrl.startsWith('/') ? `http://localhost:3001${settings.logoUrl}` : settings.logoUrl}
                  alt={settings?.siteName ?? 'IndieVerse'}
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <Gamepad2 className="w-8 h-8" />
              )}
              <span className="text-xl">{settings?.siteName ?? 'IndieVerse'}</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors ${
                    isActive(item.href)
                      ? 'text-violet-400'
                      : 'text-slate-300 hover:text-violet-400'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Wishlist Icon */}
              <Link
                to="/lista-desejos"
                className="relative text-slate-300 hover:text-violet-400 transition-colors"
                title="Lista de Desejos"
              >
                <Heart className={`w-6 h-6 ${isActive('/lista-desejos') ? 'text-violet-400 fill-current' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                to="/carrinho"
                className="relative text-slate-300 hover:text-violet-400 transition-colors"
                title="Carrinho"
              >
                <ShoppingCart className={`w-6 h-6 ${isActive('/carrinho') ? 'text-violet-400' : ''}`} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-violet-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-300 hover:text-violet-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block py-2 transition-colors ${
                    isActive(item.href)
                      ? 'text-violet-400'
                      : 'text-slate-300 hover:text-violet-400'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Wishlist Link */}
              <Link
                to="/lista-desejos"
                className={`flex items-center gap-2 py-2 transition-colors ${
                  isActive('/lista-desejos')
                    ? 'text-violet-400'
                    : 'text-slate-300 hover:text-violet-400'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Heart className="w-5 h-5" />
                Lista de Desejos
                {wishlistCount > 0 && (
                  <span className="bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Mobile Cart Link */}
              <Link
                to="/carrinho"
                className={`flex items-center gap-2 py-2 transition-colors ${
                  isActive('/carrinho')
                    ? 'text-violet-400'
                    : 'text-slate-300 hover:text-violet-400'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                Carrinho
                {cartCount > 0 && (
                  <span className="bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}
