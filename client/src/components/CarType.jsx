import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { CarContext } from "../context/CarContext";

const CarType = memo(({ image, title, car, delay = 0 }) => {
    const { setFilter } = useContext(CarContext);

    const handleFilter = () => {
        setFilter(car.filter(el => el.type === title.split(" ")[0]));
    };

    return (
        <div
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            style={{ minHeight: '240px', border: '1px solid #e9eaec', transitionDelay: `${delay}ms` }}
            data-reveal="scale"
        >
            <img src={image} alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/70" />

            <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                    <p className="text-xs text-white/60 font-medium uppercase tracking-widest mb-1">Category</p>
                    <h3 className="text-white font-bold text-xl leading-tight">{title}</h3>
                </div>
                <Link to="/cars" onClick={handleFilter}
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand hover:bg-brand-hover transition-all hover:scale-105 flex-shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
});

export default CarType;
