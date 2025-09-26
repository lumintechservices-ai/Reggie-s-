import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PRODUCTS, TESTIMONIALS } from '../constants';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { supabase } from '../lib/supabaseClient';
import type { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import WishlistIcon from '../components/icons/WishlistIcon';

// Header Section
const ProductsHeader = () => (
    <div className="relative bg-brand-dark py-24 sm:py-32">
        <div className="absolute inset-0">
            <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/1256875/pexels-photo-1256875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Pasta background"/>
            <div className="absolute inset-0 bg-brand-dark/70 mix-blend-multiply" aria-hidden="true" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold font-serif tracking-tight text-white sm:text-6xl">Our Signature Plates</h2>
            <p className="mt-6 text-lg leading-8 text-gray-200">Explore our curated collection of pasta and noodle dishes, made with passion and the finest local ingredients.</p>
        </div>
    </div>
);

const ProductSkeleton = () => (
    <div className="group">
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <div className="aspect-h-1 aspect-w-1 w-full bg-gray-200 animate-pulse xl:aspect-h-8 xl:aspect-w-7" />
            <div className="p-4 flex flex-col flex-grow">
                <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse mt-2" />
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse mt-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mt-1" />
                <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse mt-4" />
            </div>
        </div>
    </div>
);

// Products List Section
const ProductsList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        isGlutenFree: false,
        isOrganic: false,
    });
    const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('products').select('*');
            if (error || !data || data.length === 0) {
                console.error("Error fetching products, falling back to mock data:", error);
                setProducts(PRODUCTS);
            } else {
                setProducts(data as Product[]);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);
    
    const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
      e.preventDefault(); // Prevent navigating to product page
      if (isWishlisted(product.id)) {
        removeFromWishlist(product.id);
        toast.success(`${product.name} removed from wishlist!`);
      } else {
        addToWishlist(product.id);
        toast.success(`${product.name} added to wishlist!`);
      }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFilters(prev => ({ ...prev, [name]: checked }));
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGlutenFree = !filters.isGlutenFree || product.isGlutenFree;
            const matchesOrganic = !filters.isOrganic || product.isOrganic;
            return matchesSearch && matchesGlutenFree && matchesOrganic;
        });
    }, [products, searchTerm, filters]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                {/* Search and Filter Section */}
                <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="md:col-span-2">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Menu</label>
                        <input
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="e.g., Jollof Spaghetti"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm p-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dietary Options</label>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center">
                                <input id="isGlutenFree" name="isGlutenFree" type="checkbox" checked={filters.isGlutenFree} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary" />
                                <label htmlFor="isGlutenFree" className="ml-3 text-sm text-gray-600">Gluten-Free</label>
                            </div>
                            <div className="flex items-center">
                                <input id="isOrganic" name="isOrganic" type="checkbox" checked={filters.isOrganic} onChange={handleFilterChange} className="h-4 w-4 rounded border-gray-300 text-brand-primary focus:ring-brand-primary" />
                                <label htmlFor="isOrganic" className="ml-3 text-sm text-gray-600">Organic</label>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="sr-only">Products</h2>
                
                {loading ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {Array.from({ length: 4 }).map((_, i) => <ProductSkeleton key={i} />)}
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-brand-dark">No Dishes Found</h3>
                        <p className="mt-2 text-gray-500">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {filteredProducts.map((product) => (
                            <Link key={product.id} to={`/products/${product.id}`} className="group">
                                <Card className="h-full flex flex-col relative">
                                    <button onClick={(e) => handleWishlistToggle(e, product)} className="absolute top-2 right-2 z-10 p-2 bg-white/70 rounded-full hover:bg-white transition-colors" aria-label="Add to wishlist">
                                        <WishlistIcon className={`w-6 h-6 ${isWishlisted(product.id) ? 'text-brand-primary' : 'text-gray-500'}`} isFilled={isWishlisted(product.id)} />
                                    </button>
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                                        <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110" crossOrigin="anonymous" loading="lazy" />
                                    </div>
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="mt-2 text-lg font-semibold font-serif text-brand-dark group-hover:text-brand-primary transition-colors">{product.name}</h3>
                                        <p className="mt-1 text-sm text-gray-600 flex-grow">{product.description}</p>
                                        <p className="mt-4 text-xl font-bold text-brand-primary">₦{product.price.toLocaleString()}</p>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Features List Section
const ProductFeatures = () => {
    const features = [
        { name: 'Gluten-Free Options', description: 'Delicious choices for everyone. Look for the GF badge!' },
        { name: 'Organic Ingredients', description: 'Made with certified organic produce and ingredients.' },
        { name: 'Special Dietary Choices', description: 'Vegan and vegetarian options available upon request.' },
    ];

    return (
        <div className="bg-brand-light py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-brand-primary">Quality First</h2>
                    <p className="mt-2 text-3xl font-bold font-serif tracking-tight text-brand-dark sm:text-4xl">Everything You Need to Know</p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-brand-dark">
                                   <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary">
                                    <span className="text-white text-xl">✓</span>
                                   </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

// Testimonial Section
const TestimonialSection = () => (
    <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <div className="mx-auto max-w-xl text-center">
                <h2 className="text-4xl font-bold font-serif text-brand-primary mb-4">From Our Customers</h2>
            </div>
            <figure className="mt-10">
                <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                    <p>“{TESTIMONIALS[1].quote}”</p>
                </blockquote>
                <figcaption className="mt-10">
                    <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                        <div className="font-semibold text-gray-900">{TESTIMONIALS[1].author}</div>
                        <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                            <circle cx={1} cy={1} r={1} />
                        </svg>
                        <div className="text-gray-600">{TESTIMONIALS[1].role}</div>
                    </div>
                </figcaption>
            </figure>
        </div>
    </section>
);


// CTA Section
const CtaSection = () => (
  <div className="bg-brand-light">
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
      <h2 className="text-3xl font-bold font-serif tracking-tight text-brand-dark sm:text-4xl">
        Ready to dive in?
        <br />
        Start your delicious journey today.
      </h2>
      <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
        <Button onClick={() => window.scrollTo(0, 0)} variant="primary">Order Now</Button>
        <Link to="/contact" className="text-sm font-semibold leading-6 text-gray-900 hover:text-brand-primary transition-colors">
          Contact Us <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  </div>
)


const ProductsPage: React.FC = () => {
    return (
        <>
            <ProductsHeader />
            <ProductsList />
            <ProductFeatures />
            <TestimonialSection />
            <CtaSection />
        </>
    );
};

export default ProductsPage;