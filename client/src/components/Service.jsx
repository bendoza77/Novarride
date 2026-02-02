import { Link } from "react-router-dom";
import { SetLocalStorage } from "../utils/LocalStorage";
import { memo, useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";
import arrow_right from "../assets/arrow-removebg-preview (1).png"

const Service = memo(({image, title, text, delay = 0}) => {

    const { setServiceInfo } = useContext(ServiceContext);

    const handleService = () => {

        setServiceInfo(prev => {
            SetLocalStorage("service", title);
            return title;
        });
    }

    return (
        <>
            <div style={{ animationDelay: `${delay}ms` }} className="service_div animate-card">
                <img className="animate-float" src={image} alt="" />

                <h1 style={{ animationDelay: `${delay + 100}ms` }} className="animate-fade-up">{title}</h1>
                <p style={{ animationDelay: `${delay + 200}ms` }} className="animate-fade-up">{text}</p>

                <Link onClick={handleService} to={"/service"}><button className="animate-zoom-rotate"><img src={arrow_right} alt="" /></button></Link>
            </div>
        </>
    );


})

export default Service