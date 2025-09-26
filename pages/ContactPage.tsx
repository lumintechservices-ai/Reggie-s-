import React, { useState } from 'react';
import { FAQS } from '../constants';
import Button from '../components/ui/Button';

const ContactPage: React.FC = () => {

    const HeaderSection = () => (
        <div className="relative bg-brand-dark">
            <div className="absolute inset-0">
                <img className="h-full w-full object-cover" src="https://images.pexels.com/photos/4393668/pexels-photo-4393668.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Contact background"/>
                <div className="absolute inset-0 bg-brand-dark/70 mix-blend-multiply" aria-hidden="true" />
            </div>
            <div className="relative mx-auto max-w-7xl py-24 px-6 sm:py-32 lg:px-8 text-center">
                <h1 className="text-4xl font-bold font-serif tracking-tight text-white sm:text-5xl lg:text-6xl">Get in Touch</h1>
                <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-200">We'd love to hear from you. Whether it's a question about an order, catering, or just to say hello, we're here to help.</p>
            </div>
        </div>
    );
    
    const ContactSection = () => (
        <div className="bg-white py-16 px-6 lg:px-8">
            <div className="mx-auto max-w-lg md:grid md:max-w-none md:grid-cols-2 md:gap-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl font-serif">Contact Information</h2>
                    <div className="mt-3">
                        <p className="text-lg text-gray-500">
                           Our team is ready to assist you.
                        </p>
                    </div>
                    <div className="mt-9">
                        <div className="flex">
                            <div className="flex-shrink-0">
                               <p className="text-2xl">📞</p>
                            </div>
                            <div className="ml-3 text-base text-gray-500">
                                <p>+234 805 555 0101</p>
                                <p className="mt-1">Mon-Sat, 11am to 9pm</p>
                            </div>
                        </div>
                        <div className="mt-6 flex">
                             <div className="flex-shrink-0">
                               <p className="text-2xl">✉️</p>
                            </div>
                            <div className="ml-3 text-base text-gray-500">
                                <p>hello@reggiesplates.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-12 sm:mt-16 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl font-serif">Send Us a Message</h2>
                    <form action="#" method="POST" className="mt-9 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                        <div>
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                            <div className="mt-1"><input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-brand-primary focus:ring-brand-primary" /></div>
                        </div>
                        <div>
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                            <div className="mt-1"><input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-brand-primary focus:ring-brand-primary" /></div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <div className="mt-1"><input id="email" name="email" type="email" autoComplete="email" className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-brand-primary focus:ring-brand-primary" /></div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <div className="mt-1"><textarea id="message" name="message" rows={4} className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-brand-primary focus:ring-brand-primary" defaultValue={''} /></div>
                        </div>
                        <div className="sm:col-span-2"><Button className="w-full justify-center">Submit</Button></div>
                    </form>
                </div>
            </div>
        </div>
    );
    
    const LocationsSection = () => (
        <div className="bg-brand-light py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold font-serif text-brand-dark">Our Home in Abuja</h2>
                <p className="mt-6 text-lg text-gray-600">While we are primarily a delivery service, our kitchen is located in the vibrant heart of Abuja.</p>
                <div className="mt-10">
                    <img className="rounded-lg shadow-xl mx-auto" src="https://images.pexels.com/photos/3994364/pexels-photo-3994364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Map of a city" crossOrigin="anonymous" loading="lazy" />
                </div>
            </div>
        </div>
    );
    
    const FaqSection = () => {
        const [openFaq, setOpenFaq] = useState<number | null>(0);

        const toggleFaq = (index: number) => {
            setOpenFaq(openFaq === index ? null : index);
        };
        
        return (
            <div className="bg-white">
                <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-serif">Frequently Asked Questions</h2>
                        <p className="mt-4 text-lg text-gray-500">Can't find the answer you're looking for? Reach out to our customer support team.</p>
                    </div>
                    <dl className="mt-12 space-y-4">
                        {FAQS.map((faq, index) => (
                             <div key={index} className="rounded-lg bg-gray-50 p-6 transition-all duration-300">
                                <dt>
                                    <button onClick={() => toggleFaq(index)} className="flex w-full items-start justify-between text-left text-gray-600">
                                        <span className="font-medium text-gray-900">{faq.question}</span>
                                        <span className="ml-6 flex h-7 items-center transition-transform duration-300" style={{ transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0)' }}>
                                           <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </span>
                                    </button>
                                </dt>
                                <dd className={`overflow-hidden transition-all duration-500 ease-in-out ${openFaq === index ? 'max-h-96 mt-2 pr-12' : 'max-h-0'}`}>
                                    <p className="text-base text-gray-500">{faq.answer}</p>
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        );
    }

    return (
        <>
            <HeaderSection />
            <ContactSection />
            <LocationsSection />
            <FaqSection />
        </>
    );
};

export default ContactPage;