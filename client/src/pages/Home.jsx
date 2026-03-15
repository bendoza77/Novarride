import { useContext, useEffect, useState } from "react";
import Service from "../components/Service";
import Car from "../components/Car";
import CarType from "../components/CarType";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import bgImage    from "../assets/meritt-thomas-BwBxVVdlpYE-unsplash.jpg";
import screenshot1 from "../assets/Screenshot 2025-11-08 120025.png";
import bookingImg  from "../assets/booking.png";
import pickupImg   from "../assets/pick-up.png";
import service1    from "../assets/Screenshot 2025-11-08 130034.png";
import service2    from "../assets/Screenshot 2025-11-08 130049.png";
import service3    from "../assets/Screenshot 2025-11-08 130101.png";
import service4    from "../assets/Screenshot 2025-11-08 130114.png";
import suvImg      from "../assets/pexels-mayday-1545743.jpg";
import hatchbackImg from "../assets/pexels-krislucas90-3264504.jpg";
import sedanImg    from "../assets/pexels-markusspiske-103286.jpg";
import faqImg      from "../assets/Screenshot 2025-11-25 174359.png";
import peopleImg   from "../assets/people.png";

const StatCard = ({ value, label }) => (
    <div className="flex flex-col items-center gap-1 px-8 py-5 border-r border-white/15 last:border-0">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-xs text-white/60 text-center">{label}</span>
    </div>
);

const AccordionItem = ({ number, title, open, onToggle }) => (
    <div className="border-b border-gray-100 last:border-0 py-4 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-lg bg-brand/8 border border-brand/15 flex items-center justify-center text-brand text-sm font-bold flex-shrink-0">
                    {number}
                </span>
                <span className={`font-medium text-[15px] transition-colors ${open ? 'text-gray-900' : 'text-gray-600'}`}>{title}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 className={`flex-shrink-0 text-gray-300 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6" />
            </svg>
        </div>
        <div className={`accordion-body ${open ? 'open' : ''}`}>
            <p className="text-gray-500 text-sm leading-7 mt-3 pl-12">
                Explore our diverse selection of premium vehicles. Choose your preferred pickup and
                return dates, and select a location that fits your schedule perfectly.
            </p>
        </div>
    </div>
);

const Home = () => {
    const [cars, setCars]   = useState([]);
    const [openFaq, setOpenFaq]   = useState(null);
    const [openWork, setOpenWork] = useState(null);
    const [bookAlert, setBookAlert] = useState(false);
    const { curUser } = useContext(UserContext);
    const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(curUser).length === 0) { setBookAlert(true); return; }
        e.target.reset();
        setBookAlert(false);
    };

    useEffect(() => {
        document.title = "Novaride — Premium Car Rental";
        fetch(`${API_URL}/cars`).then(r => r.json()).then(setCars).catch(console.log);
    }, []);

    const workSteps = [
        { title: "Browse & Select",  desc: "Explore our diverse fleet of premium vehicles and choose the perfect match for your journey." },
        { title: "Book & Confirm",   desc: "Complete your reservation with our streamlined booking process. Instant confirmation guaranteed." },
        { title: "Drive & Enjoy",    desc: "Pick up your vehicle and hit the road. We handle the details, you enjoy the drive." },
    ];

    const faqs = [
        { q: "What do I need to rent a car?" },
        { q: "How old do I need to be to rent a car?" },
        { q: "Can I rent a car with a debit card?" },
    ];

    const features = [
        { icon: "🚗", title: "500+ Vehicles",    desc: "Extensive fleet from economy to luxury" },
        { icon: "⚡", title: "Instant Booking",  desc: "Confirm your reservation in seconds" },
        { icon: "🛡️", title: "Full Insurance",   desc: "Comprehensive coverage included" },
        { icon: "📍", title: "50+ Locations",    desc: "Pick-up points across the country" },
    ];

    return (
        <div className="overflow-hidden">
            {/* ── Hero ── */}
            <section className="relative min-h-[calc(100vh-72px)] flex flex-col justify-center"
                style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-20 w-full">
                    <div className="max-w-2xl">
                        <div className="hero-animate-1 label-pill mb-6">Premium Car Rental</div>
                        <h1 className="hero-animate-2 font-bold text-white leading-[1.1] tracking-tight mb-6"
                            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}>
                            Drive in Style,<br />
                            <span className="text-brand">Save More</span> Every Trip
                        </h1>
                        <p className="hero-animate-3 text-white/60 text-lg leading-8 max-w-lg mb-10">
                            Whether you're planning a weekend getaway or a business trip — we offer
                            a wide range of premium vehicles to suit every need.
                        </p>
                        <div className="hero-animate-4 flex flex-wrap gap-4">
                            <Link to="/cars" className="btn-primary relative">
                                Explore Fleet
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link to="/about" className="btn-ghost" style={{ color: 'rgba(255,255,255,0.85)', borderColor: 'rgba(255,255,255,0.25)' }}>
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="hero-animate-5 mt-16 inline-flex rounded-2xl overflow-hidden"
                         style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)' }}>
                        <StatCard value="500+" label="Vehicles Available" />
                        <StatCard value="10K+" label="Happy Customers" />
                        <StatCard value="50+"  label="City Locations" />
                        <StatCard value="4.9★" label="Average Rating" />
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
                    <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/30" />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </div>
            </section>

            {/* ── Quick Booking ── */}
            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 -mt-6 relative z-10">
                <div className="glass rounded-3xl p-6 md:p-8 shadow-xl" data-reveal>
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
                        <h2 className="text-gray-900 font-semibold text-lg">Quick Booking</h2>
                        <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand" />
                        <p className="text-gray-400 text-sm">Fill in the details below and we'll get back to you</p>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 font-medium">Full Name</label>
                            <input className="input-base" type="text" name="userFullName" placeholder="John Doe" required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 font-medium">Mobile No.</label>
                            <input className="input-base" type="text" name="userPhoneNumber" placeholder="+1 234 567 890" required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 font-medium">Pickup Location</label>
                            <input className="input-base" type="text" name="userLocation" placeholder="City or airport" required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 font-medium">Pickup Date</label>
                            <input className="input-base" type="date" name="userDate" required />
                        </div>
                        <div className="flex flex-col gap-1.5 justify-end">
                            <button type="submit" className="btn-primary justify-center w-full">Search Cars</button>
                        </div>
                    </form>
                    {bookAlert && <p className="mt-3 text-brand text-sm">Please login or create an account to search.</p>}
                </div>
            </section>

            {/* ── About Us ── */}
            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-28">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
                    <div className="relative" data-reveal="left">
                        <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-gray-100 shadow-lg">
                            <img src={screenshot1} alt="About Novaride" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-5 -right-4 md:-right-8 p-4 rounded-2xl animate-float bg-white shadow-lg border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-xl">🏆</div>
                                <div>
                                    <p className="text-gray-900 font-bold text-sm">Top Rated</p>
                                    <p className="text-gray-400 text-xs">4.9 / 5.0 rating</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div data-reveal="right">
                        <div className="label-pill">About Us</div>
                        <h2 className="section-heading mb-5">Your Trusted Partner<br />in Premium Car Rental</h2>
                        <p className="text-gray-500 leading-7 mb-8">
                            We've built our reputation on delivering an exceptional rental experience — from
                            the moment you book to the moment you return your vehicle.
                        </p>
                        <div className="flex flex-col gap-5">
                            {[
                                { icon: bookingImg, title: "Easy Booking Process",       desc: "Optimized booking flow so you can reserve your vehicle in under 2 minutes." },
                                { icon: pickupImg,  title: "Convenient Pick-Up & Return", desc: "Flexible pick-up and drop-off locations to fit your exact schedule." },
                            ].map(item => (
                                <div key={item.title} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-brand/8 border border-brand/15 flex items-center justify-center flex-shrink-0">
                                        <img src={item.icon} alt={item.title} className="w-6 h-6 object-contain" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                                        <p className="text-gray-500 text-sm leading-6">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-4 mt-10">
                            <Link to="/about" className="btn-primary">Discover More</Link>
                            <Link to="/contact" className="btn-ghost">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider" />

            {/* ── Services ── */}
            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-24">
                <div className="text-center max-w-xl mx-auto mb-14" data-reveal>
                    <div className="label-pill justify-center">Our Services</div>
                    <h2 className="section-heading mb-4">Explore Our Wide Range<br />of Rental Services</h2>
                    <p className="text-gray-500 text-[15px] leading-7">From single-driver rentals to full chauffeur packages.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                    {[
                        { img: service1, title: "Car Rental With Driver",  text: "Professional drivers for complete peace of mind." },
                        { img: service2, title: "Business Car Rental",     text: "Executive fleet options for corporate travel." },
                        { img: service3, title: "Airport Transfer",        text: "Seamless pick-up and drop-off at all major airports." },
                        { img: service4, title: "Chauffeur Services",      text: "Premium chauffeur experience for special occasions." },
                    ].map((s, i) => (
                        <Service key={s.title} image={s.img} title={s.title} text={s.text} delay={i * 80} />
                    ))}
                </div>
            </section>

            <div className="section-divider" />

            {/* ── Fleet ── */}
            <section className="py-24 overflow-hidden" style={{ background: '#f0f2f5' }}>
                <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 mb-10" data-reveal>
                    <div className="label-pill">Our Fleet</div>
                    <h2 className="section-heading">Browse Our Extensive<br />Vehicle Collection</h2>
                </div>

                {cars.length > 0 && (
                    <div className="relative overflow-hidden py-4">
                        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                             style={{ background: 'linear-gradient(90deg, #f0f2f5, transparent)' }} />
                        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
                             style={{ background: 'linear-gradient(-90deg, #f0f2f5, transparent)' }} />
                        <div className="flex gap-5 fleet-scroll" style={{ width: 'max-content' }}>
                            {[...cars, ...cars].map((car, i) => (
                                <div key={`${car._id}-${i}`} className="w-[280px] flex-shrink-0">
                                    <Car car={car} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {[
                            { image: suvImg,       title: "SUV Car" },
                            { image: hatchbackImg,  title: "Hatchback Car" },
                            { image: sedanImg,     title: "Sedan Car" },
                        ].map((item, i) => (
                            <CarType key={item.title} car={cars} image={item.image} title={item.title} delay={i * 100} />
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider" />

            {/* ── How It Works ── */}
            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div data-reveal="left">
                        <div className="label-pill">How It Works</div>
                        <h2 className="section-heading mb-5">Streamlined Process<br />for a Hassle-Free Ride</h2>
                        <p className="text-gray-500 leading-7 mb-8">
                            Our rental process is designed to get you on the road as quickly and smoothly as possible.
                        </p>
                        <div className="flex flex-col">
                            {workSteps.map((step, i) => (
                                <AccordionItem key={i} number={i + 1} title={step.title}
                                    open={openWork === i} onToggle={() => setOpenWork(openWork === i ? null : i)} />
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center" data-reveal="right">
                        <div className="relative">
                            <img src={peopleImg} alt="Happy customers"
                                className="w-full max-w-md rounded-3xl object-cover animate-float-slow border border-gray-100 shadow-lg" />
                            <div className="absolute -top-4 -right-4 px-4 py-3 rounded-2xl animate-float bg-white shadow-lg border border-gray-100"
                                 style={{ animationDelay: '0.5s' }}>
                                <p className="text-gray-900 font-bold text-2xl">10K+</p>
                                <p className="text-gray-400 text-xs">Satisfied Customers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider" />

            {/* ── Why Choose Us ── */}
            <section className="py-24" style={{ background: '#f0f2f5' }}>
                <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12">
                    <div className="text-center max-w-xl mx-auto mb-14" data-reveal>
                        <div className="label-pill justify-center">Why Choose Us</div>
                        <h2 className="section-heading">Unmatched Quality &<br />Service for Your Needs</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map((f, i) => (
                            <div key={f.title} className="card-base p-6 flex flex-col gap-4 text-center items-center"
                                data-reveal="scale" style={{ transitionDelay: `${i * 80}ms` }}>
                                <div className="text-3xl">{f.icon}</div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
                                    <p className="text-gray-500 text-sm leading-6">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className="section-divider" />

            {/* ── FAQ ── */}
            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div className="hidden lg:block sticky top-28" data-reveal="left">
                        <img src={faqImg} alt="FAQ"
                            className="w-full rounded-3xl object-cover animate-float-slow border border-gray-100 shadow-lg" />
                    </div>
                    <div data-reveal="right">
                        <div className="label-pill">FAQ</div>
                        <h2 className="section-heading mb-8">Everything You Need<br />to Know</h2>
                        <div className="flex flex-col">
                            {faqs.map((f, i) => (
                                <AccordionItem key={i} number={i + 1} title={f.q}
                                    open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ── */}
            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-12 mb-8">
                <div className="relative overflow-hidden rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
                     style={{ background: 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)' }}
                     data-reveal>
                    <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-20"
                         style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)', transform: 'translate(30%,-30%)' }} />
                    <div className="relative z-10">
                        <h2 className="font-bold text-white mb-3" style={{ fontSize: 'clamp(24px, 4vw, 40px)' }}>
                            Ready to Hit the Road?
                        </h2>
                        <p className="text-white/75 text-[15px] leading-7 max-w-md">
                            Our team is here to help 24/7. Get in touch and we'll find the perfect vehicle for your next adventure.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 relative z-10">
                        <Link to="/contact"
                            className="px-7 py-3.5 rounded-xl bg-white text-brand font-semibold hover:bg-gray-50 transition-all hover:-translate-y-0.5 hover:shadow-lg">
                            Contact Us →
                        </Link>
                        <Link to="/cars"
                            className="px-7 py-3.5 rounded-xl border-2 border-white/30 text-white font-medium hover:bg-white/10 transition-all">
                            Browse Cars
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
