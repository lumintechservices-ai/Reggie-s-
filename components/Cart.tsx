import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabaseClient';
import CloseIcon from './icons/CloseIcon';
import TrashIcon from './icons/TrashIcon';
import Button from './ui/Button';
import EmptyCartIcon from './icons/EmptyCartIcon';

const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_live_b7c2aa9f7969bd49bce5ff2215ec9daa6fcd0852';

declare global {
    interface Window {
        PaystackPop: any;
    }
}


const Cart: React.FC = () => {
    const { isCartOpen, toggleCart, cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const [customerEmail, setCustomerEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handlePaymentSuccess = async (reference: string) => {
        setIsProcessing(true);
        
        // 1. Create the main order record
        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert({
                reference,
                customer_email: customerEmail,
                total_amount: total,
            })
            .select('id')
            .single();

        if (orderError || !orderData) {
            toast.error('Failed to create order. Please contact support.');
            console.error('Supabase order insert error:', orderError);
            setIsProcessing(false);
            return;
        }

        const orderId = orderData.id;

        // 2. Create order items linked to the main order
        const orderItems = cart.map(item => ({
            order_id: orderId,
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
        }));

        const { error: itemsError } = await supabase.from('order_items').insert(orderItems);

        if (itemsError) {
            // Attempt to roll back or flag the order for manual review
            toast.error('Failed to save order details. Please contact support.');
            console.error('Supabase order_items insert error:', itemsError);
        } else {
            toast.success('Payment successful! Your order has been placed.');
            clearCart();
            toggleCart();
        }

        setIsProcessing(false);
    }
    
    const handleCheckout = () => {
        if (!customerEmail) {
            toast.error('Please enter your email address.');
            return;
        }

        if (cart.length === 0) {
            toast.error('Your cart is empty.');
            return;
        }
        
        setIsProcessing(true);

        const handler = window.PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email: customerEmail,
            amount: total * 100, // Amount in Kobo
            ref: '' + Math.floor((Math.random() * 1000000000) + 1), // Unique ref
            onClose: () => {
                setIsProcessing(false);
                toast('Payment window closed.', { icon: 'ℹ️' });
            },
            callback: (response: any) => {
                handlePaymentSuccess(response.reference);
            }
        });

        handler.openIframe();
    };

    return (
        <>
            <div
                className={`fixed inset-0 bg-black/60 z-50 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleCart}
                aria-hidden="true"
            />
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-brand-light shadow-2xl z-50 transform transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-heading"
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 id="cart-heading" className="text-2xl font-serif font-bold text-brand-dark">Your Cart</h2>
                        <button onClick={toggleCart} className="p-2 rounded-full hover:bg-gray-200" aria-label="Close cart">
                            <CloseIcon />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-6">
                        {cart.length === 0 ? (
                             <div className="flex flex-col items-center justify-center h-full text-center">
                                <EmptyCartIcon className="w-40 h-40 text-gray-300" />
                                <h3 className="mt-6 text-xl font-semibold text-brand-dark">Your cart is feeling light!</h3>
                                <p className="mt-2 text-gray-500">Add some delicious dishes to get started.</p>
                                <Button to="/products" variant="secondary" className="mt-6" onClick={toggleCart}>Start Shopping</Button>
                            </div>
                        ) : (
                            <ul className="divide-y divide-gray-200">
                                {cart.map(item => (
                                    <li key={item.id} className="flex py-4">
                                        <img src={item.imageUrl} alt={item.name} className="h-24 w-24 rounded-md object-cover" crossOrigin="anonymous" loading="lazy" />
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-brand-dark">
                                                    <h3 className="font-serif"><Link to={`/products/${item.id}`} onClick={toggleCart}>{item.name}</Link></h3>
                                                    <p className="ml-4 font-semibold">₦{(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="flex items-center border border-gray-300 rounded-md">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-lg hover:bg-gray-100 rounded-l-md" aria-label={`Decrease quantity of ${item.name}`}>-</button>
                                                    <span className="px-3 py-1 text-center" aria-live="polite">{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-lg hover:bg-gray-100 rounded-r-md" aria-label={`Increase quantity of ${item.name}`}>+</button>
                                                </div>
                                                <button onClick={() => removeFromCart(item.id)} className="font-medium text-brand-primary hover:text-brand-primary/80 p-1" aria-label={`Remove ${item.name} from cart`}>
                                                   <TrashIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {cart.length > 0 && (
                      <div className="border-t border-gray-200 p-6 bg-white">
                         <div className="flex justify-between text-lg font-bold text-brand-dark">
                            <p>Subtotal</p>
                            <p>₦{total.toLocaleString()}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                        <div className="mt-6">
                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email for Receipt</label>
                             <input
                                type="email"
                                name="email"
                                id="email"
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm p-2"
                                placeholder="you@example.com"
                             />
                        </div>
                        <div className="mt-6">
                             <Button onClick={handleCheckout} className="w-full justify-center" disabled={isProcessing} loading={isProcessing}>
                                {isProcessing ? 'Processing...' : 'Checkout with Paystack'}
                            </Button>
                        </div>
                      </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;