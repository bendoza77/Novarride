import { Link } from "react-router-dom";
import { SetLocalStorage } from "../utils/LocalStorage";
import { memo, useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";

const Service = memo(({ image, title, text, delay = 0 }) => {
    const { setServiceInfo } = useContext(ServiceContext);

    const handleService = () => {
        setServiceInfo(() => { SetLocalStorage("service", title); return title; });
    };

    return (
        <div
            className="card-base p-6 flex flex-col gap-4 group cursor-pointer"
            style={{ transitionDelay: `${delay}ms` }}
            data-reveal="scale"
        >
            <div className="w-14 h-14 rounded-2xl bg-brand/8 border border-brand/15 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-brand/15 group-hover:border-brand/25">
                <img src={image} alt={title} className="w-8 h-8 object-contain" />
            </div>

            <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-gray-900 text-[15px] leading-snug group-hover:text-brand transition-colors">{title}</h3>
                <p className="text-sm text-gray-500 leading-6">{text}</p>
            </div>

            <Link to="/service" onClick={handleService}
                className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-brand transition-colors mt-auto">
                Learn more
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </Link>
        </div>
    );
});

export default Service;
