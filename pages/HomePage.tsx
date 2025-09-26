import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, TESTIMONIALS } from '../constants';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { Rating } from '../components/icons/StarIcon';

// Hero Section
const HeroSection = () => (
  <section className="relative h-[90vh] bg-cover bg-center" style={{ backgroundImage: `url('https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')` }}>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
      <h1 className="text-5xl md:text-7xl font-bold font-serif leading-tight mb-4 drop-shadow-lg">
        Authentic Nigerian Flavors, Reimagined
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md">
        Experience the true taste of Nigeria with Reggie's Signature Plates, crafted with love and the freshest local ingredients.
      </p>
      <Button to="/products" variant="primary" className="text-lg">
        Explore Our Menu
      </Button>
    </div>
  </section>
);

// Custom Icons for Features
const LocallySourcedIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 16a1 1 0 001-1V8a1 1 0 011-1h1m0 9a1 1 0 011-1h1m0 0a1 1 0 011 1m-1-1V8a1 1 0 011-1h1m0 9a1 1 0 011-1h1m0 0a1 1 0 011 1m-1-1V8a1 1 0 011-1h1m0 9a1 1 0 011-1h1m0 0a1 1 0 011 1m-1-1V8a1 1 0 011-1h1" /></svg>;
const AuthenticRecipesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const QuickDeliveryIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1M8 8h1m4 0h1m-7 4h1m5 0h1m-7 4h1m5 0h1" /><path strokeLinecap="round" strokeLinejoin="round" d="M17 9h4l-4 6h4" /></svg>;

// Features List Section
const FeaturesListSection = () => {
    const features = [
        { icon: <LocallySourcedIcon />, title: 'Locally Sourced', description: 'Fresh ingredients from trusted local farms in Nigeria.' },
        { icon: <AuthenticRecipesIcon />, title: 'Authentic Recipes', description: 'Time-honored recipes that bring you the true taste.' },
        { icon: <QuickDeliveryIcon />, title: 'Quick Delivery', description: 'Hot and fresh meals delivered right to your doorstep in Abuja.' },
    ];
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {features.map(feature => (
                        <div key={feature.title} className="flex flex-col items-center">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-2xl font-semibold font-serif text-brand-dark mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Feature Section
const QualityFeatureSection = () => (
  <section className="py-20 bg-brand-light">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 items-center grid grid-cols-1 md:grid-cols-2 gap-16">
      <div className="wow-factor">
        <img src="https://images.pexels.com/photos/2544829/pexels-photo-2544829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Fresh Ingredients" className="rounded-lg shadow-2xl object-cover w-full h-full" crossOrigin="anonymous" loading="lazy" />
      </div>
      <div>
        <h2 className="text-4xl font-bold font-serif text-brand-primary mb-4">Dedicated to Quality & Satisfaction</h2>
        <p className="text-lg text-gray-700 mb-6">
          At Reggie's Signature Plates, quality isn't just an ingredient; it's our entire recipe. From sourcing the freshest produce from local markets in Abuja to meticulously crafting each dish, we pour our hearts into every meal.
        </p>
        <p className="text-lg text-gray-700">
          Our mission is simple: to bring joy to your table with delicious, high-quality food that feels both comforting and special. Your satisfaction is our greatest reward.
        </p>
      </div>
    </div>
  </section>
);

// Gallery Section
const GallerySection = () => (
    <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold font-serif text-brand-primary mb-12">Our Culinary Creations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="grid gap-4">
                    <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Pasta dish 1" crossOrigin="anonymous" loading="lazy" /></div>
                    <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src="https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Ramen bowl" crossOrigin="anonymous" loading="lazy" /></div>
                </div>
                <div className="grid gap-4">
                    <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src="https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Spicy noodles" crossOrigin="anonymous" loading="lazy" /></div>
                    <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src="https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Jollof spaghetti close-up" crossOrigin="anonymous" loading="lazy" /></div>
                </div>
                <div className="grid gap-4">
                    <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Grilled meat with pasta" crossOrigin="anonymous" loading="lazy" /></div>
                    <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src="https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Veggie noodles" crossOrigin="anonymous" loading="lazy" /></div>
                </div>
                <div className="grid gap-4">
                    <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src="https://images.pexels.com/photos/2232433/pexels-photo-2232433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Green pasta dish" crossOrigin="anonymous" loading="lazy" /></div>
                    <div><img className="h-auto max-w-full rounded-lg shadow-md transition-transform duration-300 hover:scale-105" src="https://images.pexels.com/photos/2703468/pexels-photo-2703468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Spaghetti bolognese" crossOrigin="anonymous" loading="lazy" /></div>
                </div>
            </div>
        </div>
    </section>
);

// Testimonial Section
const TestimonialSection = () => (
  <section className="py-20 bg-brand-light">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold font-serif text-brand-primary mb-12">What Our Customers Say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial) => (
          <Card key={testimonial.id} className="flex flex-col p-8 bg-white">
             <div className="text-brand-secondary text-6xl font-serif leading-none">“</div>
            <p className="text-gray-600 mb-6 flex-grow italic">"{testimonial.quote}"</p>
            <div className="mt-auto">
              <Rating rating={testimonial.rating} className="mb-2" />
              <p className="font-semibold text-brand-dark">{testimonial.author}</p>
              <p className="text-sm text-gray-500">{testimonial.role}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

// CTA Section
const CtaSection = () => (
    <section className="bg-brand-secondary">
        <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold font-serif sm:text-5xl text-brand-dark">
                <span className="block">Ready for a Taste Adventure?</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-brand-dark/80">
                Browse our full menu of signature pasta and noodle dishes and place your order today.
            </p>
            <Button to="/products" variant="primary" className="mt-8 w-full sm:w-auto">
                View All Products
            </Button>
        </div>
    </section>
);


const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <FeaturesListSection />
      <QualityFeatureSection />
      <GallerySection />
      <TestimonialSection />
      <CtaSection />
    </>
  );
};

export default HomePage;