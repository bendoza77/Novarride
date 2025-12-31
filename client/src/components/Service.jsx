import { Link } from "react-router-dom";
import { SetLocalStorage } from "../utils/LocalStorage";
import { memo, useContext } from "react";
import { ServiceContext } from "../context/ServiceContext";
import arrow_right from "../assets/arrow-removebg-preview (1).png"

const Service = memo(({image, title, text}) => {

    const { setServiceInfo } = useContext(ServiceContext);

    const handleService = () => {

        setServiceInfo(prev => {
            SetLocalStorage("service", title);
            return title;
        });
    }

    return (
        <>
            <div className="service_div">
                <img src={image} alt="" />

                <h1>{title}</h1>
                <p>{text}</p>

                <Link onClick={handleService} to={"/service"}><button><img src={arrow_right} alt="" /></button></Link>
            </div>
        </>
    );


})

export default Service