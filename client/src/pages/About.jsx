import { useState } from "react";
import { Link } from "react-router-dom";

import visionImg    from "../assets/pexels-albinberlin-905554.jpg";
import approachImg  from "../assets/pexels-mikebirdy-3729464.jpg";
import missionImg   from "../assets/pexels-toms-svilans-375611-1005617.jpg";
import aboutLeftImg from "../assets/Screenshot 2025-11-08 120025.png";
import bookingImg   from "../assets/booking.png";
import pickupImg    from "../assets/pick-up.png";
import brandsImg    from "../assets/brands.png";
import bg           from "../assets/pexels-thephotosaccount-30664842.jpg";

const TABS = [
    { id: 'vision',   label: 'Our Vision',   image: visionImg,
      desc: "We aim to redefine the car rental experience globally — making premium vehicles accessible, affordable, and effortless." },
    { id: 'mission',  label: 'Our Mission',  image: missionImg,
      desc: "To deliver the highest standard of vehicle rental services through innovation, technology, and a commitment to customer satisfaction." },
    { id: 'approach', label: 'Our Approach', image: approachImg,
      desc: "We combine cutting-edge technology with a personal touch — creating a seamless booking experience backed by world-class support." },
];

const FeatureItem = ({ text }) => (
    <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-brand/10 border border-brand/25 flex items-center justify-center flex-shrink-0">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#e63946" strokeWidth="3">
                <path d="M20 6L9 17l-5-5" />
            </svg>
        </div>
        <p className="text-gray-600 text-sm leading-6">{text}</p>
    </div>
);

const About = () => {
    const [activeTab, setActiveTab] = useState('vision');
    const currentTab = TABS.find(t => t.id === activeTab);

    const features = [
        { icon: "🚗", title: "Extensive Fleet",      desc: "500+ vehicles from economy to luxury." },
        { icon: "🎯", title: "Customer First",        desc: "Our entire operation is built around your comfort." },
        { icon: "📍", title: "Convenient Locations",  desc: "50+ pick-up points nationwide." },
        { icon: "🛡️", title: "Reliability & Safety", desc: "Every vehicle undergoes rigorous safety checks." },
    ];

    return (
        <div>
            <div className="page-hero-banner" style={{ backgroundImage: `url(${bg})` }}>
                <div className="label-pill justify-center">About Us</div>
                <h1 className="hero-animate-1 font-bold text-white text-4xl md:text-5xl tracking-tight mb-4">About Novaride</h1>
                <nav className="hero-animate-2 flex items-center gap-2 text-sm text-white/50">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span><span className="text-brand">About Us</span>
                </nav>
            </div>

            {/* About */}
            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-24">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
                    <div className="relative" data-reveal="left">
                        <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-gray-100 shadow-lg">
                            <img src={aboutLeftImg} alt="About" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-5 -right-4 md:-right-8 p-4 rounded-2xl animate-float bg-white shadow-lg border border-gray-100">
                            <p className="text-gray-900 font-bold text-3xl">8+</p>
                            <p className="text-gray-400 text-sm">Years of Excellence</p>
                        </div>
                    </div>
                    <div data-reveal="right">
                        <div className="label-pill">About Us</div>
                        <h2 className="section-heading mb-5">Your Trusted Partner<br />in Reliable Car Rental</h2>
                        <p className="text-gray-500 leading-7 mb-8">
                            Since our founding, Novaride has been committed to delivering an unmatched rental experience —
                            pairing premium vehicles with exceptional service at every touchpoint.
                        </p>
                        <div className="flex flex-col gap-5 mb-10">
                            {[
                                { icon: bookingImg, title: "Easy Booking Process",        desc: "Reserve your perfect vehicle in under 2 minutes." },
                                { icon: pickupImg,  title: "Convenient Pick-Up & Return", desc: "Flexible locations and timings to fit perfectly into your schedule." },
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
                        <Link to="/contact" className="btn-primary">Get In Touch</Link>
                    </div>
                </div>
            </section>

            <div className="section-divider" />

            {/* Brands */}
            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-20" data-reveal>
                <div className="text-center mb-10">
                    <div className="label-pill justify-center">Executive Partners</div>
                    <h2 className="section-heading">Trusted by Leading Brands</h2>
                </div>
                <div className="rounded-2xl p-6 overflow-hidden border border-gray-100 bg-white">
                    <img src={brandsImg} alt="Partner brands" className="w-full object-contain max-h-24 opacity-60 hover:opacity-100 transition-all duration-500" />
                </div>
            </section>

            <div className="section-divider" />

            {/* Vision/Mission/Approach */}
            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-24">
                <div className="text-center mb-12" data-reveal>
                    <div className="label-pill justify-center">Vision & Mission</div>
                    <h2 className="section-heading mb-4">Driving Excellence &<br />Innovation in Car Rental</h2>
                </div>
                <div className="flex justify-center gap-2 mb-12" data-reveal>
                    {TABS.map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                                activeTab === tab.id
                                    ? 'bg-brand text-white border-brand'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900'
                            }`}>
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div data-reveal="left">
                        <div className="label-pill">{currentTab.label}</div>
                        <h3 className="font-bold text-gray-900 text-2xl md:text-3xl leading-snug mb-5">
                            Pioneering Excellence in<br />Car Rental Services
                        </h3>
                        <p className="text-gray-500 leading-7 mb-8">{currentTab.desc}</p>
                        <p className="text-gray-500 leading-7 mb-8">
                            Quality is at the heart of everything we do. We maintain a diverse fleet of well-maintained
                            vehicles that meet the highest standards of safety and comfort.
                        </p>
                        <div className="flex flex-col gap-3.5">
                            {["Our customers are our top priority", "Quality is at the heart of everything we do", "Every vehicle leaves care looking its absolute best"].map(t => <FeatureItem key={t} text={t} />)}
                        </div>
                    </div>
                    <div data-reveal="right">
                        <div className="rounded-3xl overflow-hidden aspect-[4/3] border border-gray-100 shadow-lg">
                            <img src={currentTab.image} alt={currentTab.label} key={currentTab.id} className="w-full h-full object-cover transition-all duration-500" />
                        </div>
                    </div>
                </div>
            </section>

            <div className="section-divider" />

            {/* Why Choose Us */}
            <section className="py-24" style={{ background: '#f0f2f5' }}>
                <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12">
                    <div className="text-center max-w-xl mx-auto mb-14" data-reveal>
                        <div className="label-pill justify-center">Why Choose Us</div>
                        <h2 className="section-heading">Unmatched Quality<br />and Service</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {features.map((f, i) => (
                            <div key={f.title} className="card-base p-6 flex flex-col gap-4"
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
        </div>
    );
};

export default About;
