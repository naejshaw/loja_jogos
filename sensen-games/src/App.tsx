import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { StoreProvider } from './contexts/StoreContext';
import { SettingsProvider } from './context/SettingsContext';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ContactPage from './pages/ContactPage';
import { WishlistPage } from './pages/WishlistPage';
import GamePage from './pages/GamePage';
import './App.css';
import { CartPage } from './pages/CartPage';

function App() {
  return (
    <SettingsProvider>
      <StoreProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/contato" element={<ContactPage />} />
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/lista-desejos" element={<WishlistPage />} />
              <Route path="/games/:slug" element={<GamePage />} />
            </Routes>
          </Layout>
          <Toaster position="top-right" theme="dark" richColors />
        </Router>
      </StoreProvider>
    </SettingsProvider>
  );
}

export default App;