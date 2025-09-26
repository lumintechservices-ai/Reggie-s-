import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PRODUCTS } from '../constants';
import Button from '../components/ui/Button';
import { Rating } from '../components/icons/StarIcon';
import type { Review, Product } from '../types';
import { supabase } from '../lib/supabaseClient';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import WishlistIcon from '../components/icons/WishlistIcon';

const ProductNotFound = () => (
    <div className="text-center py-20">
        <h1 className="text-4xl font-bold font-serif text-brand-primary">Product Not Found</h1>
        <p className="mt-4 text-lg">We couldn't find the product you're looking for.</p>
        <Button to="/products" className="mt-8">Back to Menu</Button>
    </div>
);

const ReviewSection: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="mt-16">
                <h3 className="text-2xl font-bold text-gray-900 font-serif">No Reviews Yet</h3>
                <p className="text-gray-600">Be the first to review this product!</p>
            </div>
        );
    }
    return (
        <div className="mt-16">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 font-serif">Customer Reviews</h3>
            <div className="mt-6 space-y-10">
                {reviews.map((review) => (
                    <div key={review.id} className="border-t border-gray-200 pt-10">
                        <div className="flex items-center">
                             <Rating rating={review.rating} />
                            <p className="ml-3 text-sm text-gray-700">{review.author} on <time dateTime={review.date}>{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time></p>
                        </div>
                        <div className="mt-4 text-base italic text-gray-600" dangerouslySetInnerHTML={{ __html: `"${review.comment}"` }}/>
                    </div>
                ))}
            </div>
        </div>
    );
};


const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState<string | undefined>(undefined);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();
    const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .single();

            if (error || !data) {
                console.error("Error fetching product, falling back to mock data:", error);
                const fallbackProduct = PRODUCTS.find(p => p.id === productId);
                setProduct(fallbackProduct || null);
                setMainImage(fallbackProduct?.imageUrl);
            } else {
                setProduct(data as Product);
                setMainImage(data.imageUrl);
            }
            setLoading(false);
        };
        fetchProduct();
    }, [productId]);
    
    const handleAddToCart = () => {
        if (product) {
            addToCart({ ...product, quantity });
            toast.success(`${quantity} x ${product.name} added to cart!`);
        }
    };

    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => Math.max(1, prev + amount));
    };

    const handleWishlistToggle = () => {
      if (!product) return;
      if (isWishlisted(product.id)) {
        removeFromWishlist(product.id);
        toast.success(`${product.name} removed from wishlist!`);
      } else {
        addToWishlist(product.id);
        toast.success(`${product.name} added to wishlist!`);
      }
    };

    if (loading) {
        return <div className="text-center py-20 text-2xl font-semibold">Loading Product...</div>
    }

    if (!product) {
        return <ProductNotFound />;
    }
    
    return (
        <div className="bg-white">
            <div className="pt-6 pb-16 sm:pb-24">
                 <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                        {/* Image gallery */}
                        <div>
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg shadow-lg">
                                <img src={mainImage} alt={product.name} className="h-full w-full object-cover object-center" crossOrigin="anonymous" />
                            </div>
                            <div className="mt-4 grid grid-cols-4 gap-4">
                                {product.images.map((image, idx) => (
                                    <button key={idx} onClick={() => setMainImage(image)} className={`aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md transition-all ${mainImage === image ? 'ring-2 ring-brand-primary ring-offset-2' : 'opacity-70 hover:opacity-100'}`}>
                                        <img src={image} alt={`${product.name} thumbnail ${idx+1}`} className="h-full w-full object-cover object-center" crossOrigin="anonymous" loading="lazy" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product info */}
                        <div className="mt-10 lg:mt-0">
                            <h1 className="text-3xl font-bold font-serif tracking-tight text-brand-dark sm:text-4xl">{product.name}</h1>
                            <div className="mt-3">
                                <h2 className="sr-only">Product information</h2>
                                <p className="text-3xl tracking-tight text-gray-900">₦{product.price.toLocaleString()}</p>
                            </div>
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <Rating rating={product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length} />
                                    <span className="ml-3 text-sm text-gray-600 hover:text-gray-800">{product.reviews.length} reviews</span>
                                </div>
                            </div>
                            <div className="mt-6">
                                <p className="text-base text-gray-700">{product.longDescription}</p>
                            </div>
                            <div className="mt-10">
                                <div className="flex items-center space-x-4">
                                    <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
                                    <div className="flex items-center">
                                        <button type="button" onClick={() => handleQuantityChange(-1)} className="px-3 py-1 border rounded-l-md hover:bg-gray-100 transition-colors">-</button>
                                        <span className="w-12 text-center px-4 py-1 border-t border-b">{quantity}</span>
                                        <button type="button" onClick={() => handleQuantityChange(1)} className="px-3 py-1 border rounded-r-md hover:bg-gray-100 transition-colors">+</button>
                                    </div>
                                </div>
                                <div className="mt-10 flex gap-x-4">
                                    <Button onClick={handleAddToCart} className="flex-1">Add to Cart</Button>
                                    <button onClick={handleWishlistToggle} className="p-3 border rounded-md hover:bg-gray-100 transition-colors" aria-label="Add to wishlist">
                                        <WishlistIcon className={`w-6 h-6 ${isWishlisted(product.id) ? 'text-brand-primary' : 'text-gray-500'}`} isFilled={isWishlisted(product.id)} />
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 flex gap-2">
                                {product.isGlutenFree && <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Gluten-Free</span>}
                                {product.isOrganic && <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Organic</span>}
                            </div>
                        </div>
                    </div>

                    <div className="mt-16">
                         <div className="border-t border-gray-200 pt-10">
                            <h3 className="text-sm font-medium text-gray-900">Ingredients</h3>
                            <div className="mt-4 prose prose-sm text-gray-500">
                                <ul role="list">
                                    {product.ingredients.map((ingredient) => (
                                        <li key={ingredient}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <ReviewSection reviews={product.reviews} />
                    </div>
                </div>
            </div>
             {/* CTA Section */}
            <section className="bg-brand-light">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        <span className="block font-serif">Loved this dish?</span>
                        <span className="block text-brand-primary font-serif">Explore more flavors.</span>
                    </h2>
                    <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                        <Button to="/products" variant='secondary'>Continue Shopping</Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;