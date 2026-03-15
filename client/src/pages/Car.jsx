import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import { UserContext } from "../context/UserContext";
import bg from "../assets/pexels-thephotosaccount-30664842.jpg";

const SpecItem = ({ icon, label, value }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
        <div className="flex items-center gap-3 text-gray-400">
            <span className="text-base">{icon}</span>
            <span className="text-sm">{label}</span>
        </div>
        <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
);

const AccordionItem = ({ title, open, onToggle }) => (
    <div className="border border-gray-100 rounded-xl cursor-pointer overflow-hidden transition-all hover:border-brand/25 bg-white" onClick={onToggle}>
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

const Car = () => {
    const { carInfo } = useContext(CarContext);
    const { curUser }  = useContext(UserContext);
    const [openItem, setOpenItem] = useState(null);
    const [bookState, setBookState] = useState("idle");

    const handleBook = () => setBookState(curUser.email ? "form" : "auth");

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, phone, dateStart, dateEnd } = e.target;
        if (name.value && email.value && phone.value && dateStart.value && dateEnd.value) {
            setBookState("idle"); e.target.reset();
        }
    };

    const conditions = [
        "Driver's License Requirements",
        "Insurance and Coverage Policy",
        "Available Payment Methods",
        "Cancellation and Modification Policy",
        "Smoking and Pet Policies",
        "Minimum Age Requirements",
    ];

    return (
        <>
            {/* Booking Modal */}
            {bookState === "form" && (
                <>
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={() => setBookState("idle")} />
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="modal-animate w-full max-w-lg rounded-3xl p-7 bg-white border border-gray-100 shadow-2xl">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h2 className="font-bold text-gray-900 text-xl mb-1">Reserve Your Vehicle</h2>
                                    <p className="text-gray-400 text-sm">Fill in the details to confirm your booking.</p>
                                </div>
                                <button onClick={() => setBookState("idle")}
                                    className="w-8 h-8 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-all flex-shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                                <div className="grid grid-cols-2 gap-3">
                                    <input className="input-base" type="text"  name="name"  placeholder="Full Name"    required />
                                    <input className="input-base" type="email" name="email" placeholder="Email"         required />
                                </div>
                                <input className="input-base" type="text" name="phone" placeholder="Phone Number" required />
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs text-gray-400">Pickup Date</label>
                                        <input className="input-base" type="date" name="dateStart" required />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs text-gray-400">Return Date</label>
                                        <input className="input-base" type="date" name="dateEnd" required />
                                    </div>
                                </div>
                                <input className="input-base" type="text" name="message" placeholder="Additional message (optional)" />
                                <button type="submit" className="btn-primary justify-center mt-1">Confirm Booking</button>
                            </form>
                        </div>
                    </div>
                </>
            )}

            <div>
                <div className="page-hero-banner" style={{ backgroundImage: `url(${bg})` }}>
                    <h1 className="hero-animate-1 font-bold text-white text-3xl md:text-5xl tracking-tight mb-4">{carInfo.title}</h1>
                    <nav className="hero-animate-2 flex items-center gap-2 text-sm text-white/50">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/cars" className="hover:text-white transition-colors">Cars</Link>
                        <span>/</span><span className="text-brand">{carInfo.title}</span>
                    </nav>
                </div>

                <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
                        {/* Left */}
                        <div className="flex flex-col gap-8">
                            <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-gray-100 border border-gray-100 shadow-sm" data-reveal>
                                <img src={carInfo.image} alt={carInfo.title} className="w-full h-full object-cover" />
                            </div>

                            <div className="card-base p-7" data-reveal>
                                <div className="label-pill">General Information</div>
                                <h3 className="font-bold text-gray-900 text-xl mb-4">Know About Our Car Service</h3>
                                <p className="text-gray-500 text-sm leading-7">
                                    Experience exceptional quality and comfort with our premium vehicle. Our cars are maintained to the highest
                                    standards, ensuring a safe and enjoyable journey every time. Each vehicle includes GPS navigation,
                                    Bluetooth connectivity, and comprehensive insurance coverage.
                                </p>
                            </div>

                            <div className="card-base p-7" data-reveal>
                                <div className="label-pill">Amenities</div>
                                <h3 className="font-bold text-gray-900 text-xl mb-6">Premium Features & Amenities</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {[
                                        { icon: "🌐", label: "GPS Navigation" }, { icon: "🎵", label: "Bluetooth Audio" },
                                        { icon: "❄️", label: "Climate Control" }, { icon: "📷", label: "Backup Camera" },
                                        { icon: "🔋", label: "USB Charging" },   { icon: "🛡️", label: "Full Insurance" },
                                    ].map(a => (
                                        <div key={a.label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-100">
                                            <span className="text-lg">{a.icon}</span>
                                            <span className="text-xs text-gray-600 font-medium">{a.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div data-reveal>
                                <div className="label-pill">Rental Conditions</div>
                                <h3 className="font-bold text-gray-900 text-xl mb-6">Policies & Agreements</h3>
                                <div className="flex flex-col gap-3">
                                    {conditions.map((c, i) => (
                                        <AccordionItem key={c} title={c} open={openItem === i} onToggle={() => setOpenItem(openItem === i ? null : i)} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right sidebar */}
                        <div className="flex flex-col gap-5">
                            <div className="card-base p-6 sticky top-[88px]" data-reveal="right">
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-brand font-bold text-4xl">${carInfo.pricePerDay}</span>
                                    <span className="text-gray-400 text-sm">/day</span>
                                </div>

                                <div className="mb-6">
                                    <SpecItem icon="🚪" label="Doors"         value={carInfo.doors} />
                                    <SpecItem icon="👤" label="Passengers"    value={carInfo.passengers} />
                                    <SpecItem icon="⚙️" label="Transmission"  value={carInfo.transmission} />
                                    <SpecItem icon="📅" label="Car Age"       value={`${carInfo.age} years`} />
                                    <SpecItem icon="🧳" label="Luggage"       value={`${carInfo.luggage} bags`} />
                                    <SpecItem icon="❄️" label="Air Condition" value={carInfo.airCondition ? "Yes" : "No"} />
                                </div>

                                <button onClick={handleBook} className="btn-primary justify-center w-full text-base py-4">
                                    Book Now
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {bookState === "auth" && (
                                    <div className="mt-4 p-3.5 rounded-xl bg-brand/6 border border-brand/15">
                                        <p className="text-brand text-sm text-center">
                                            Please <Link to="/authorization" className="underline font-medium">login</Link>
                                            {' '}or{' '}<Link to="/register" className="underline font-medium">register</Link> to book.
                                        </p>
                                    </div>
                                )}

                                <div className="section-divider my-5" />
                                <div className="flex flex-col gap-3">
                                    {[
                                        { icon: "✓", text: "Free cancellation up to 24h" },
                                        { icon: "✓", text: "Comprehensive insurance included" },
                                        { icon: "✓", text: "24/7 roadside assistance" },
                                    ].map(t => (
                                        <div key={t.text} className="flex items-center gap-2.5">
                                            <span className="w-4 h-4 rounded-full bg-green-50 border border-green-200 flex items-center justify-center text-green-500 text-[10px] font-bold flex-shrink-0">{t.icon}</span>
                                            <span className="text-xs text-gray-400">{t.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Car;
