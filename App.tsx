import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Cart from './components/Cart';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <WishlistProvider>
        <HashRouter>
          <ScrollToTop />
          <Toaster position="top-center" reverseOrder={false} />
          <div className="bg-brand-light text-brand-dark font-sans">
            <Navbar />
            <Cart />
            <main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:productId" element={<ProductDetailPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:blogPostId" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/order-history" element={<OrderHistoryPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </WishlistProvider>
    </CartProvider>
  );
};

export default App;