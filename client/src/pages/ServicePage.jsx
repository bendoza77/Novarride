import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ServiceContext } from "../context/ServiceContext";
import { SetLocalStorage } from "../utils/LocalStorage";
import bg           from "../assets/pexels-thephotosaccount-30664842.jpg";
import clientImg    from "../assets/client.png";
import firstImg     from "../assets/first.png";
import secondImg    from "../assets/second.png";
import firstClient  from "../assets/first_client.png";
import secondClient from "../assets/second_client.png";
import thirdClient  from "../assets/third_client.png";
import fourthClient from "../assets/foruht_client.png";

const SERVICES = ["Car Rental With Driver", "Business Car Rental", "Airport Transfer", "Chauffeur Services"];

const AccordionItem = ({ title, open, onToggle }) => (
    <div className="border border-gray-100 rounded-xl cursor-pointer overflow-hidden hover:border-brand/25 transition-all bg-white" onClick={onToggle}>
        <div className="flex items-center justify-between gap-4 p-4">
            <span className={`text-sm font-medium transition-colors ${open ? 'text-brand' : 'text-gray-700'}`}>{title}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                 className={`flex-shrink-0 text-gray-300 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6" />
            </svg>
        </div>
        <div className={`accordion-body ${open ? 'open' : ''}`}>
            <p className="text-gray-500 text-sm leading-7 px-4 pb-4">
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.
            </p>
        </div>
    </div>
);

const ServicePage = () => {
    const { serviceInfo, setServiceInfo } = useContext(ServiceContext);
    const [openItem, setOpenItem] = useState(null);

    const handleServiceClick = (svc) => {
        setServiceInfo(() => { SetLocalStorage("service", svc); return svc; });
    };

    const faqs = ["Driver's License Requirements", "Insurance and Coverage Policy", "Available Payment Methods", "Cancellation and Modification Policy"];

    return (
        <div>
            <div className="page-hero-banner" style={{ backgroundImage: `url(${bg})` }}>
                <div className="label-pill justify-center">Services</div>
                <h1 className="hero-animate-1 font-bold text-white text-3xl md:text-5xl tracking-tight mb-4">{serviceInfo || "Our Services"}</h1>
                <nav className="hero-animate-2 flex items-center gap-2 text-sm text-white/50">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span><span className="text-brand">{serviceInfo || "Services"}</span>
                </nav>
            </div>

            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="flex flex-col gap-5">
                        <div className="card-base p-6" data-reveal="left">
                            <h3 className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-5">All Services</h3>
                            <div className="flex flex-col gap-2">
                                {SERVICES.map(svc => (
                                    <Link key={svc} to="/service" onClick={() => handleServiceClick(svc)}
                                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm transition-all border ${
                                            serviceInfo === svc
                                                ? 'bg-brand/8 border-brand/20 text-brand font-medium'
                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                                        }`}>
                                        {svc}
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)' }} data-reveal="left">
                            <div className="text-3xl mb-3">💬</div>
                            <h4 className="font-bold text-white mb-2">Need Help?</h4>
                            <p className="text-white/70 text-sm leading-6 mb-5">Our support team is ready to assist you with any questions.</p>
                            <Link to="/contact" className="flex items-center justify-center py-2.5 px-4 rounded-xl bg-white text-brand text-sm font-semibold hover:bg-gray-50 transition-all">
                                Contact Us
                            </Link>
                        </div>
                    </aside>

                    {/* Main content */}
                    <div className="flex flex-col gap-10">
                        <div className="rounded-3xl overflow-hidden aspect-[16/7] bg-gray-100 border border-gray-100 shadow-sm" data-reveal>
                            <img src={clientImg} alt={serviceInfo} className="w-full h-full object-cover" />
                        </div>

                        <div className="card-base p-8" data-reveal>
                            <div className="label-pill">Service Details</div>
                            <h2 className="font-bold text-gray-900 text-2xl mb-5">Discover Premium Rental Services</h2>
                            <div className="flex flex-col gap-4 text-gray-500 text-[15px] leading-7">
                                <p>We offer a wide range of car rental services designed to meet all your transportation needs. Whether you're traveling for business, planning a family vacation, or need a reliable vehicle for a special event, we have the perfect solution.</p>
                                <p>Our fleet and services are tailored to provide you with an exceptional experience. We combine cutting-edge technology with personalized service to make every journey comfortable, safe, and memorable.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4" data-reveal>
                            <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100 border border-gray-100">
                                <img src={firstImg} alt="Service" className="w-full h-full object-cover" />
                            </div>
                            <div className="rounded-2xl overflow-hidden aspect-video bg-gray-100 border border-gray-100">
                                <img src={secondImg} alt="Service" className="w-full h-full object-cover" />
                            </div>
                        </div>

                        <div data-reveal>
                            <div className="label-pill">Clients</div>
                            <h3 className="font-bold text-gray-900 text-xl mb-6">What Our Clients Say</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[firstClient, secondClient, thirdClient, fourthClient].map((img, i) => (
                                    <div key={i} className="rounded-2xl overflow-hidden aspect-square bg-gray-100 border border-gray-100"
                                         data-reveal="scale" style={{ transitionDelay: `${i * 80}ms` }}>
                                        <img src={img} alt={`Client ${i + 1}`} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div data-reveal>
                            <div className="label-pill">FAQ</div>
                            <h3 className="font-bold text-gray-900 text-xl mb-6">Frequently Asked Questions</h3>
                            <div className="flex flex-col gap-3">
                                {faqs.map((q, i) => (
                                    <AccordionItem key={q} title={q} open={openItem === i} onToggle={() => setOpenItem(openItem === i ? null : i)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicePage;
