import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import arrow_right from "../assets/arrow-removebg-preview (1).png"

const CarType = memo(({image, title, car}) => {

    const { setFilter } = useContext(CarContext);

    const handleFilter = () => {

        setFilter(car.filter(el => el.type === title.split(" ")[0]))

    }

    return (
        <>
            <div className="type_div">
                <img className="img_div" src={image} alt="" />
                <h1>{title}</h1>
                <Link onClick={handleFilter} to={"/cars"}><button className="type_button"><img src={arrow_right} alt="" /></button></Link>
            </div>            
        </>
    );



})

export default CarType