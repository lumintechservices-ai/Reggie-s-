import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import type { Order } from '../types';
import Button from '../components/ui/Button';

const OrderHistoryPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setSearched(true);
        setOrders([]);

        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    *,
                    products ( name, imageUrl )
                )
            `)
            .eq('customer_email', email)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching orders:', error);
        } else {
            setOrders(data as Order[]);
        }
        setLoading(false);
    };

    return (
        <div className="bg-brand-light min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold font-serif tracking-tight text-brand-dark sm:text-6xl">Order History</h1>
                    <p className="mt-4 text-lg text-gray-600">Enter the email you used to place your orders to see your history.</p>
                </div>

                <form onSubmit={handleSearch} className="mx-auto mt-12 max-w-lg">
                    <div className="flex gap-x-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand-primary sm:text-sm sm:leading-6"
                        />
                        <Button type="submit" loading={loading} disabled={loading}>
                            {loading ? 'Searching...' : 'Find Orders'}
                        </Button>
                    </div>
                </form>

                <div className="mt-16">
                    {loading && <p className="text-center text-gray-500">Searching for your orders...</p>}
                    
                    {!loading && searched && orders.length === 0 && (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-semibold text-brand-dark">No Orders Found</h3>
                            <p className="mt-2 text-gray-500">We couldn't find any orders associated with that email address.</p>
                        </div>
                    )}
                    
                    {!loading && orders.length > 0 && (
                        <div className="space-y-8">
                            {orders.map(order => (
                                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                                    <div className="flex flex-wrap justify-between items-baseline gap-4 border-b pb-4 mb-4">
                                        <div>
                                            <h3 className="font-semibold text-brand-dark">Order Reference</h3>
                                            <p className="text-sm text-gray-500 font-mono">{order.reference}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-brand-dark">Date</h3>
                                            <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-brand-dark">Total</h3>
                                            <p className="text-lg font-bold text-brand-primary">₦{order.total_amount.toLocaleString()}</p>
                                        </div>
                                    </div>
                                    <ul className="divide-y divide-gray-200">
                                        {order.order_items.map(item => (
                                            <li key={item.id} className="flex py-4">
                                                <img src={item.products.imageUrl} alt={item.products.name} className="h-16 w-16 rounded-md object-cover" />
                                                <div className="ml-4 flex flex-1 justify-between">
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{item.products.name}</p>
                                                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-700">₦{(item.price * item.quantity).toLocaleString()}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderHistoryPage;