import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { supabase } from '../lib/supabaseClient';
import type { BlogPost } from '../types';


// Header Section
const BlogHeader = () => (
    <div className="relative bg-brand-dark py-24 sm:py-32">
         <div className="absolute inset-0">
            <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/349609/pexels-photo-349609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Spices and ingredients"/>
            <div className="absolute inset-0 bg-brand-dark/70 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold font-serif tracking-tight text-white sm:text-6xl">From Our Kitchen to Yours</h2>
            <p className="mt-6 text-lg leading-8 text-gray-200">Tips, stories, and culinary inspiration from the team at Reggie's Signature Plates.</p>
        </div>
    </div>
);


// Blog List Section
const BlogList = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('blog_posts').select('*');

            if (error || !data || data.length === 0) {
                 console.error("Error fetching blog posts, falling back to mock data:", error);
                 setPosts(BLOG_POSTS);
            } else {
                setPosts(data as BlogPost[]);
            }
            setLoading(false);
        };
        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-24">
                <h2 className="text-2xl font-semibold">Loading posts...</h2>
            </div>
        )
    }

    return (
        <div className="bg-brand-light py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {posts.map((post) => (
                         <Link to={`/blog/${post.id}`} key={post.id} className="group">
                            <Card className="flex flex-col h-full">
                                <article className="flex flex-col items-start justify-between h-full">
                                    <div className="relative w-full overflow-hidden">
                                        <img src={post.imageUrl} alt="" className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] transition-transform duration-500 group-hover:scale-110" crossOrigin="anonymous" loading="lazy" />
                                    </div>
                                    <div className="max-w-xl p-6 flex flex-col flex-grow">
                                        <div className="flex items-center gap-x-4 text-xs">
                                            <time dateTime={post.date} className="text-gray-500">{post.date}</time>
                                        </div>
                                        <div className="flex-grow mt-3">
                                            <h3 className="text-lg font-semibold font-serif leading-6 text-gray-900 group-hover:text-brand-primary transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.excerpt}</p>
                                        </div>
                                        <div className="relative mt-8 flex items-center gap-x-4">
                                            <div className="text-sm leading-6">
                                                <p className="font-semibold text-gray-900">
                                                    {post.author}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};


// CTA Section
const CtaSection = () => (
    <section className="bg-white">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold font-serif sm:text-4xl text-brand-dark">
                <span className="block">Stay in the loop.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-600">
                Subscribe to our newsletter for the latest recipes, stories, and exclusive offers delivered straight to your inbox.
            </p>
            <form className="mt-8 sm:flex justify-center">
                <input type="email" required className="w-full sm:max-w-xs px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-brand-primary focus:border-brand-primary rounded-md" placeholder="Enter your email" />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <Button>Subscribe</Button>
                </div>
            </form>
        </div>
    </section>
);


const BlogPage: React.FC = () => {
    return (
        <>
            <BlogHeader />
            <BlogList />
            <CtaSection />
        </>
    );
};

export default BlogPage;