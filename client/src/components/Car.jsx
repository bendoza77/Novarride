import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import { SetLocalStorage } from "../utils/LocalStorage";
import { UserContext } from "../context/UserContext";

const Car = memo(({ car, delay = 0 }) => {
    const { setCarInfo, carInfo } = useContext(CarContext);
    const { curUser } = useContext(UserContext);
    const isAdmin = ["admin", "moderator"].includes(curUser.role);

    const handleDelete = async () => {
        setCarInfo(() => { SetLocalStorage("car", car); return car; });
        try {
            const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";
            await fetch(`${API_URL}/cars?id=${carInfo._id}`, { method: "DELETE" });
        } catch (e) { console.log(e); }
    };

    const handleCar = () => {
        setCarInfo(() => { SetLocalStorage("car", car); return car; });
    };

    return (
        <div className="card-base overflow-hidden flex flex-col" style={{ animationDelay: `${delay}ms` }} data-reveal="scale">
            {/* Image */}
            <div className="relative overflow-hidden rounded-t-[18px] aspect-[16/9] bg-gray-100">
                <img src={car.image} alt={car.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold text-white"
                          style={{ background: 'rgba(230,57,70,0.9)', backdropFilter: 'blur(8px)' }}>
                        {car.type}
                    </span>
                </div>
                {isAdmin && (
                    <button onClick={handleDelete}
                        className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-white/90 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-brand transition-all text-xs font-bold shadow-sm">
                        ✕
                    </button>
                )}
            </div>

            {/* Info */}
            <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-semibold text-gray-900 text-[15px] leading-snug">{car.title}</h3>

                <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span>{car.doors} Doors</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span>{car.passengers} Seats</span>
                    </div>
                </div>

                <div className="section-divider" />

                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-brand font-bold text-lg">${car.pricePerDay}</span>
                        <span className="text-gray-400 text-xs ml-1">/day</span>
                    </div>
                    <Link to="/car" onClick={handleCar}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-600 text-xs font-medium hover:bg-brand hover:border-brand hover:text-white transition-all">
                        View
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
});

export default Car;
