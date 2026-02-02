import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import arrow_right from "../assets/arrow-removebg-preview (1).png"

const CarType = memo(({image, title, car, delay = 0}) => {

    const { setFilter } = useContext(CarContext);

    const handleFilter = () => {

        setFilter(car.filter(el => el.type === title.split(" ")[0]))

    }

    return (
        <>
            <div style={{ animationDelay: `${delay}ms` }} className="type_div animate-card">
                <img className="img_div animate-zoom-rotate" src={image} alt="" />
                <h1 style={{ animationDelay: `${delay + 100}ms` }} className="animate-fade-up">{title}</h1>
                <Link onClick={handleFilter} to={"/cars"}><button className="type_button animate-pulse-glow"><img src={arrow_right} alt="" /></button></Link>
            </div>            
        </>
    );



})

export default CarType