import type { ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  imageUrl: string;
  images: string[];
  ingredients: string[];
  nutritionalFacts: Record<string, string>;
  isGlutenFree: boolean;
  isOrganic: boolean;
  category: string;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
}

export interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  content: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export interface Review {
    id: number;
    author: string;
    date: string;
    rating: number;
    comment: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface OrderItem {
    id: string;
    product_id: string;
    quantity: number;
    price: number;
    products: { name: string; imageUrl: string };
}

export interface Order {
    id: string;
    reference: string;
    total_amount: number;
    created_at: string;
    order_items: OrderItem[];
}