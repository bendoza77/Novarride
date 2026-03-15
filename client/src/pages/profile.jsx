import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Car from "../components/Car";
import bg from "../assets/pexels-thephotosaccount-30664842.jpg";

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

const Profile = () => {
    const { curUser } = useContext(UserContext);
    const [cars, setCars]   = useState([]);
    const [page, setPage]   = useState(1);
    const [openItem, setOpenItem] = useState(null);
    const PER_PAGE   = 6;
    const startIndex = (page - 1) * PER_PAGE;
    const totalPages = Math.ceil(cars.length / PER_PAGE);
    const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";

    useEffect(() => {
        document.title = "Profile — Novaride";
        fetch(`${API_URL}/cars`).then(r => r.json()).then(setCars).catch(console.log);
    }, []);

    const conditions = [
        "Driver's License Requirements","Insurance and Coverage Policy",
        "Available Payment Methods","Cancellation and Modification Policy",
        "Smoking and Pet Policies","Minimum Age Requirements",
    ];

    const initials = curUser.fullName
        ? curUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : "U";

    return (
        <div>
            <div className="page-hero-banner" style={{ backgroundImage: `url(${bg})` }}>
                <div className="label-pill justify-center">Account</div>
                <h1 className="hero-animate-1 font-bold text-white text-4xl md:text-5xl tracking-tight mb-4">My Profile</h1>
                <nav className="hero-animate-2 flex items-center gap-2 text-sm text-white/50">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span><span className="text-brand">{curUser.fullName || "Profile"}</span>
                </nav>
            </div>

            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    {/* User card */}
                    <div className="flex flex-col gap-5">
                        <div className="card-base p-7 flex flex-col items-center text-center gap-5" data-reveal="left">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                                style={{ background: 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)', border: '3px solid rgba(230,57,70,0.2)' }}>
                                {initials}
                            </div>
                            <div>
                                <h2 className="font-bold text-gray-900 text-xl mb-1">{curUser.fullName || "User"}</h2>
                                <p className="text-gray-400 text-sm">{curUser.email}</p>
                            </div>
                            <div className="section-divider w-full" />
                            <div className="w-full flex flex-col gap-3 text-left">
                                {[
                                    { icon: "👤", label: "Full Name", value: curUser.fullName },
                                    { icon: "✉️", label: "Email",     value: curUser.email },
                                    { icon: "📞", label: "Phone",     value: curUser.phone || "—" },
                                ].map(item => (
                                    <div key={item.label} className="flex items-start gap-3">
                                        <span className="text-lg mt-0.5">{item.icon}</span>
                                        <div>
                                            <p className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
                                            <p className="text-sm text-gray-700 font-medium mt-0.5 break-all">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card-base p-5" data-reveal="left">
                            <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-4">Quick Links</h4>
                            <div className="flex flex-col gap-1">
                                {[{ to: "/cars", label: "Browse Cars" }, { to: "/contact", label: "Contact Support" }, { to: "/about", label: "About Novaride" }].map(({ to, label }) => (
                                    <Link key={to} to={to}
                                        className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm text-gray-500 hover:text-brand hover:bg-brand/5 transition-all">
                                        {label}
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main */}
                    <div className="flex flex-col gap-10">
                        <div data-reveal>
                            <div className="label-pill">Recommended</div>
                            <h3 className="font-bold text-gray-900 text-2xl mb-6">Cars You Might Like</h3>
                            {cars.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                        {cars.slice(startIndex, startIndex + PER_PAGE).map((car, i) => <Car key={car._id} car={car} delay={i * 60} />)}
                                    </div>
                                    {totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-2 mt-8">
                                            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                                            </button>
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                                                <button key={n} onClick={() => setPage(n)}
                                                    className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${page === n ? 'bg-brand text-white border border-brand' : 'border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'}`}>
                                                    {n}
                                                </button>
                                            ))}
                                            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                                                className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="card-base p-10 flex flex-col items-center text-center gap-3">
                                    <div className="text-4xl">🚗</div>
                                    <p className="text-gray-400">No vehicles available at the moment.</p>
                                </div>
                            )}
                        </div>

                        <div className="section-divider" />

                        <div data-reveal>
                            <div className="label-pill">Policies</div>
                            <h3 className="font-bold text-gray-900 text-2xl mb-6">Rental Conditions</h3>
                            <div className="flex flex-col gap-3">
                                {conditions.map((c, i) => (
                                    <AccordionItem key={c} title={c} open={openItem === i} onToggle={() => setOpenItem(openItem === i ? null : i)} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
