import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CarContext } from "../context/CarContext";
import { UserContext } from "../context/UserContext";
import Car from "../components/Car";
import bg from "../assets/pexels-thephotosaccount-30664842.jpg";

const Cars = () => {
    const [car, setCar]     = useState([]);
    const { filter, setFilter } = useContext(CarContext);
    const [result, setResult] = useState("");
    const { curUser } = useContext(UserContext);
    const [page, setPage]   = useState(1);
    const PER_PAGE   = 6;
    const startIndex = (page - 1) * PER_PAGE;
    const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";
    const isAdmin  = ["moderator", "admin"].includes(curUser.role);
    const displayCars = filter.length > 0 ? filter : car;
    const totalPages  = Math.ceil(displayCars.length / PER_PAGE);
    const pageCars    = displayCars.slice(startIndex, startIndex + PER_PAGE);

    const handleCreate = async (e) => {
        e.preventDefault();
        const { title, carType, passenger, transmission, carAge, luggage, airCondition, pricePerDay } = e.target;
        const data = { title: title.value, carType: carType.value, passenger: passenger.value, transmission: transmission.value, carAge: carAge.value, luggage: luggage.value, airCondition: airCondition.value, pircePerDay: pricePerDay.value };
        try {
            const req = await fetch(`${API_URL}/cars`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
            setResult(await req.json());
        } catch (err) { console.log(err); }
    };

    const handleFilter = (e) => {
        e.preventDefault();
        const { carName, carType } = e.target;
        const checked = Array.from(carType).filter(el => el.checked).map(el => el.value);
        const title   = carName.value.toLowerCase().trim();
        setFilter(car.filter(el => {
            const nameMatch = title === "" || el.title.toLowerCase().trim().startsWith(title);
            const typeMatch = checked.length === 0 || checked.includes(el.type);
            return nameMatch && typeMatch;
        }));
        setPage(1);
    };

    useEffect(() => {
        document.title = "Cars — Novaride";
        fetch(`${API_URL}/cars`).then(r => r.json()).then(setCar).catch(console.log);
    }, []);

    return (
        <div>
            <div className="page-hero-banner" style={{ backgroundImage: `url(${bg})` }}>
                <div className="label-pill justify-center">Fleet</div>
                <h1 className="hero-animate-1 font-bold text-white text-4xl md:text-5xl tracking-tight mb-4">Our Cars</h1>
                <nav className="hero-animate-2 flex items-center gap-2 text-sm text-white/50">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span><span className="text-brand">Cars</span>
                </nav>
            </div>

            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="card-base p-6 mb-5" data-reveal="left">
                            <h3 className="font-semibold text-gray-900 mb-5 text-sm uppercase tracking-wider">Filter Cars</h3>
                            <form onSubmit={handleFilter} className="flex flex-col gap-5">
                                <div>
                                    <label className="text-xs text-gray-400 mb-2 block">Search by name</label>
                                    <input type="text" name="carName" placeholder="Search cars..." className="input-base" />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-3 block">Car Type</label>
                                    <div className="flex flex-col gap-2.5">
                                        {[{ value: "Sedan", label: "Sedan" }, { value: "Hatchback", label: "Hatchback" }, { value: "SUV", label: "SUV" }].map(({ value, label }) => (
                                            <label key={value} className="flex items-center gap-3 cursor-pointer group">
                                                <input type="checkbox" value={value} name="carType" className="w-4 h-4 accent-brand rounded" />
                                                <span className="text-sm text-gray-500 group-hover:text-gray-900 transition-colors">{label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <button type="submit" className="btn-primary justify-center text-sm py-2.5">Apply Filter</button>
                                {filter.length > 0 && (
                                    <button type="button" onClick={() => { setFilter([]); setPage(1); }}
                                        className="text-xs text-gray-400 hover:text-brand transition-colors text-center">
                                        Clear filter ({filter.length} results)
                                    </button>
                                )}
                            </form>
                        </div>

                        {isAdmin && (
                            <div className="card-base p-6" data-reveal="left">
                                <h3 className="font-semibold text-gray-900 mb-5 text-sm uppercase tracking-wider">Add New Car</h3>
                                <form onSubmit={handleCreate} className="flex flex-col gap-3">
                                    {[
                                        { name: "title",       placeholder: "Car title",         type: "text" },
                                        { name: "carType",     placeholder: "Car type",           type: "text" },
                                        { name: "passenger",   placeholder: "Passengers",         type: "number" },
                                        { name: "carAge",      placeholder: "Car age (years)",    type: "number" },
                                        { name: "luggage",     placeholder: "Luggage capacity",   type: "number" },
                                        { name: "pricePerDay", placeholder: "Price per day ($)",  type: "number" },
                                    ].map(f => <input key={f.name} {...f} required className="input-base text-sm" />)}
                                    <select name="transmission" required className="input-base text-sm">
                                        <option value="">Transmission</option>
                                        <option value="manual">Manual</option>
                                        <option value="automatic">Automatic</option>
                                    </select>
                                    <label className="flex items-center gap-2.5 text-sm text-gray-500 cursor-pointer">
                                        <input type="checkbox" name="airCondition" className="accent-brand" /> Air Conditioning
                                    </label>
                                    <button type="submit" className="btn-primary justify-center text-sm py-2.5 mt-1">Add Car</button>
                                    {result.message && <p className="text-brand text-xs">{result.message}</p>}
                                </form>
                            </div>
                        )}
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6" data-reveal>
                            <h2 className="text-gray-900 font-semibold">
                                {displayCars.length > 0 ? `${displayCars.length} vehicles found` : 'All Vehicles'}
                            </h2>
                            {totalPages > 1 && <p className="text-gray-400 text-sm">Page {page} of {totalPages}</p>}
                        </div>

                        {pageCars.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                {pageCars.map((el, idx) => <Car key={el._id} delay={idx * 60} car={el} />)}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-24 text-center">
                                <div className="text-5xl mb-4">🚗</div>
                                <p className="text-gray-500 text-lg font-medium mb-2">No vehicles found</p>
                                <p className="text-gray-400 text-sm">Try adjusting your filters</p>
                            </div>
                        )}

                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-10" data-reveal>
                                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                                    className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                                    <button key={n} onClick={() => setPage(n)}
                                        className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                                            page === n ? 'bg-brand text-white border border-brand' : 'border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'
                                        }`}>
                                        {n}
                                    </button>
                                ))}
                                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                                    className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Cars;
