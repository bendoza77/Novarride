import { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { CarContext } from "../context/CarContext";
import { SetLocalStorage } from "../utils/LocalStorage";
import { UserContext } from "../context/UserContext";
import doorImg from "../assets/door.png";
import passengerImg from "../assets/passenger.png";
import arrowImg from "../assets/arrow-removebg-preview (1).png";

const Car = memo(({ car, delay = 0 }) => {

    const { setCarInfo, carInfo } = useContext(CarContext);
    const { curUser } = useContext(UserContext);

    const handleDelete = async () => {

        setCarInfo(prev => {
            SetLocalStorage("car", car);
            return car;
        });

        try {
            const requset = await fetch(`http://localhost:3000/api/cars?id=${carInfo._id}`, {
                method: "DELETE"
            });

            const res = await requset.json();
            console.log(res);
        } catch (error) {
            console.log(error);
        }

    };

    const handleCar = () => {
        setCarInfo(prev => {
            SetLocalStorage("car", car);
            return car;
        });
    };

    return (
        <>
            <div key={car._id} style={{ animationDelay: `${delay}ms` }} className="car_div animate-card">
                <div className="car_image animate-zoom-rotate">
                    <img src={car.image} alt="" />
                    <div
                        onClick={handleDelete}
                        style={{ display: ["admin", "moderator"].includes(curUser.role) ? "block" : "none" }}
                        className="del_car"
                    >
                        <p>X</p>
                    </div>
                </div>

                <div className="car_bottom">
                    <div className="car_type">
                        <p>{car.type}</p>
                    </div>
                    <h1 style={{ animationDelay: `${delay + 100}ms` }} className="car_title animate-fade-up">{car.title}</h1>

                    <div style={{ animationDelay: `${delay + 150}ms` }} className="door animate-fade-up">
                        <div>
                            <img src={doorImg} alt="" />
                            <p>Doors</p>
                        </div>
                        <p>{car.doors}</p>
                    </div>

                    <div style={{ animationDelay: `${delay + 200}ms` }} className="passenger animate-fade-up">
                        <div>
                            <img src={passengerImg} alt="" />
                            <p>Passengers</p>
                        </div>
                        <p>{car.passengers}</p>
                    </div>

                    <Link onClick={handleCar} className="car_link" to={"/car"}>
                        <div style={{ animationDelay: `${delay + 300}ms` }} className="price animate-fade-up">
                            <p><span>${car.pricePerDay}</span>/Per Day</p>
                            <button className="car_button animate-pulse-glow">
                                <img src={arrowImg} alt="" />
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    );
});

export default Car;
