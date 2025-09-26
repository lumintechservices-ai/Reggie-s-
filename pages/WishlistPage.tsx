import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabaseClient';
import type { Product } from '../types';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import TrashIcon from '../components/icons/TrashIcon';

const WishlistPage: React.FC = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            if (wishlist.length === 0) {
                setWishlistItems([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .in('id', wishlist);

            if (error) {
                console.error('Error fetching wishlist items:', error);
                setWishlistItems([]);
            } else {
                setWishlistItems(data as Product[]);
            }
            setLoading(false);
        };
        fetchWishlistItems();
    }, [wishlist]);

    const handleAddToCart = (product: Product) => {
        addToCart({ ...product, quantity: 1 });
        toast.success(`${product.name} added to cart!`);
    };

    const handleRemoveFromWishlist = (product: Product) => {
        removeFromWishlist(product.id);
        toast.success(`${product.name} removed from wishlist!`);
    };

    return (
        <div className="bg-brand-light min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold font-serif tracking-tight text-brand-dark sm:text-6xl">Your Wishlist</h1>
                    <p className="mt-4 text-lg text-gray-600">Your saved favorites, all in one place.</p>
                </div>

                <div className="mt-16">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading your wishlist...</p>
                    ) : wishlistItems.length === 0 ? (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-semibold text-brand-dark">Your wishlist is empty.</h3>
                            <p className="mt-2 text-gray-500">Explore our menu and add your favorites!</p>
                            <Button to="/products" className="mt-6">Explore Menu</Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {wishlistItems.map((product) => (
                                <Card key={product.id} className="h-full flex flex-col group relative">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                                        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover object-center" />
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold font-serif text-brand-dark">{product.name}</h3>
                                        <p className="mt-4 text-xl font-bold text-brand-primary">₦{product.price.toLocaleString()}</p>
                                        <div className="mt-6 flex flex-col gap-y-3">
                                            <Button onClick={() => handleAddToCart(product)} variant="primary">Add to Cart</Button>
                                             <button onClick={() => handleRemoveFromWishlist(product)} className="flex items-center justify-center text-sm font-medium text-gray-600 hover:text-brand-primary transition-colors">
                                                <TrashIcon className="w-4 h-4 mr-2" />
                                                Remove from Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WishlistPage;