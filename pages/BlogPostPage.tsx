import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BLOG_POSTS, TESTIMONIALS } from '../constants';
import Button from '../components/ui/Button';
import { supabase } from '../lib/supabaseClient';
import type { BlogPost } from '../types';


const PostNotFound = () => (
    <div className="text-center py-20">
        <h1 className="text-4xl font-bold font-serif text-brand-primary">Post Not Found</h1>
        <p className="mt-4 text-lg">We couldn't find the blog post you're looking for.</p>
        <Button to="/blog" className="mt-8">Back to Blog</Button>
    </div>
);

const BlogPostPage: React.FC = () => {
    const { blogPostId } = useParams<{ blogPostId: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!blogPostId) return;
            setLoading(true);
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', blogPostId)
                .single();
            
            if (error || !data) {
                console.error("Error fetching post, falling back to mock data:", error);
                const fallbackPost = BLOG_POSTS.find(p => p.id === blogPostId);
                setPost(fallbackPost || null);
            } else {
                setPost(data as BlogPost);
            }
            setLoading(false);
        };
        fetchPost();
    }, [blogPostId]);

    if (loading) {
        return <div className="text-center py-20 text-2xl font-semibold">Loading Post...</div>
    }

    if (!post) {
        return <PostNotFound />;
    }

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold font-serif tracking-tight text-brand-dark sm:text-4xl">{post.title}</h2>
                    <p className="mt-2 text-lg leading-8 text-gray-600">
                        Posted by {post.author} on {post.date}
                    </p>
                </div>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
                    <img src={post.imageUrl} alt={post.title} className="w-full rounded-2xl shadow-lg" crossOrigin="anonymous" loading="lazy" />
                    <article className="prose lg:prose-xl max-w-none text-gray-700">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </article>
                </div>

                {/* Testimonial Section */}
                <section className="mt-24">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-serif">
                            Don't just take our word for it
                        </p>
                    </div>
                    <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20">
                        <div className="-mt-8 sm:-mx-4 sm:text-left">
                            <div className="pt-8 sm:inline-block sm:w-full sm:px-4">
                                <figure className="rounded-2xl bg-gray-50 p-8 text-sm leading-6">
                                    <blockquote className="text-gray-900">
                                        <p>“{TESTIMONIALS[0].quote}”</p>
                                    </blockquote>
                                    <figcaption className="mt-6 flex items-center gap-x-4">
                                        <div>
                                            <div className="font-semibold text-gray-900">{TESTIMONIALS[0].author}</div>
                                            <div className="text-gray-600">{TESTIMONIALS[0].role}</div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <div className="mt-24 bg-brand-secondary rounded-2xl p-12 text-center">
                    <h3 className="text-3xl font-bold font-serif text-brand-dark">Ready to try our signature plates?</h3>
                    <p className="mt-4 text-lg text-brand-dark/80">Inspired by our stories? Taste the passion behind them.</p>
                    <Button to="/products" className="mt-8">Explore Menu</Button>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;