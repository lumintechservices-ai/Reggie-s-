import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import CartIcon from './icons/CartIcon';
import WishlistIcon from './icons/WishlistIcon';
import OrderHistoryIcon from './icons/OrderHistoryIcon';


const NavLinks = ({ onClick }: { onClick?: () => void }) => {
  const linkStyles = "text-gray-700 hover:text-brand-primary transition-colors duration-300 py-2";
  const activeLinkStyles = { color: '#D94662', borderBottom: '2px solid #D94662' };
  
  return (
    <>
      <NavLink to="/" className={linkStyles} style={({ isActive }) => isActive ? activeLinkStyles : {}} onClick={onClick}>Home</NavLink>
      <NavLink to="/products" className={linkStyles} style={({ isActive }) => isActive ? activeLinkStyles : {}} onClick={onClick}>Menu</NavLink>
      <NavLink to="/blog" className={linkStyles} style={({ isActive }) => isActive ? activeLinkStyles : {}} onClick={onClick}>Blog</NavLink>
      <NavLink to="/contact" className={linkStyles} style={({ isActive }) => isActive ? activeLinkStyles : {}} onClick={onClick}>Contact Us</NavLink>
      <NavLink to="/order-history" className={linkStyles} style={({ isActive }) => isActive ? activeLinkStyles : {}} onClick={onClick}>Order History</NavLink>
    </>
  );
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, toggleCart } = useCart();
  const { wishlist } = useWishlist();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistItemCount = wishlist.length;
  
  const closeMobileMenu = () => setIsOpen(false);

  return (
    <nav className="bg-brand-light/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold font-serif text-brand-primary">
              Reggie's Signature Plates
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <NavLinks />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="relative hidden md:block text-brand-dark hover:text-brand-primary p-2 rounded-full transition-colors">
              <WishlistIcon />
              {wishlistItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-xs font-medium text-white">
                  {wishlistItemCount}
                </span>
              )}
              <span className="sr-only">Open wishlist</span>
            </Link>

            <button onClick={toggleCart} className="relative hidden md:block text-brand-dark hover:text-brand-primary p-2 rounded-full transition-colors">
              <CartIcon />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-xs font-medium text-white">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Open cart</span>
            </button>
            <div className="ml-4 -mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-brand-primary inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-light focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 flex flex-col items-center">
            <NavLinks onClick={closeMobileMenu} />
            <div className="flex space-x-4 mt-4">
              <Link to="/wishlist" onClick={closeMobileMenu} className="relative text-brand-dark hover:text-brand-primary p-2 rounded-full transition-colors">
                <WishlistIcon />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-xs font-medium text-white">
                    {wishlistItemCount}
                  </span>
                )}
                <span className="sr-only">Open wishlist</span>
              </Link>
              <button onClick={() => { toggleCart(); closeMobileMenu(); }} className="relative text-brand-dark hover:text-brand-primary p-2 rounded-full transition-colors">
                <CartIcon />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary text-xs font-medium text-white">
                    {cartItemCount}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;