import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CarContext } from "../context/CarContext";
import { UserContext } from "../context/UserContext";
import Car from "../components/Car";

import leftArrow from "../assets/left-arrow-removebg-preview.png";
import rightArrow from "../assets/arrow-removebg-preview (1).png";

const Cars = () => {

    const [car, setCar] = useState([]);
    const { filter, setFilter } = useContext(CarContext);
    const [result, setResult] = useState("");
    const { curUser } = useContext(UserContext);
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * 6;

    const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";

    const handleCreate = async (e) => {
        e.preventDefault();

        const {
            title,
            carType,
            passenger,
            transmission,
            carAge,
            luggage,
            airCondition,
            pricePerDay,
        } = e.target

        const data = {
            title: title.value,
            carType: carType.value,
            passenger: passenger.value,
            transmission: transmission.value,
            carAge: carAge.value,
            luggage: luggage.value,
            airCondition: airCondition.value,
            pircePerDay: pricePerDay.value
        };

        try {
            const request = await fetch(`${API_URL}/cars`, {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });

            const result = await request.json();
            console.log(result);
            setResult(result);

        } catch (error) {
            console.log(error);
        }
    }

    const handleFilter = (e) => {
        e.preventDefault();
        const { carName, carType } = e.target;
        const checked = Array.from(carType).filter(el => el.checked).map(el => el.value);
        const title = carName.value.toLocaleLowerCase().trim();

        const filtered = car.filter(el => {
            const name = title === "" || `${el.title}`.toLocaleLowerCase().trim().startsWith(title);
            const type = checked.length === 0 || checked.includes(el.type);

            return name && type;
        })

        setFilter(filtered);
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const carApi = await fetch(`${API_URL}/cars`);
                const carJson = await carApi.json();
                setCar(carJson);
            } catch (error) {
                console.log(error);
            }
        }
        fetchApi();
    }, [])

    return (
        <>
            <div className="cars_div">
                <div className="about_top">
                    <h1>Cars</h1>
                    <div className="about_nav">
                        <Link to={"/"}><p className="about_home">Home</p></Link>
                        <p>/</p>
                        <p className="place">Cars</p>
                    </div>
                </div>

                <div className="collection">
                    <div className="col_left">
                        <form onSubmit={handleFilter}>
                            <input type="text" name="carName" id="search" placeholder="Search..."/>

                            <div className="types_div">
                                <h1 style={{marginTop: "50px"}}>Car Types</h1>
                                <div className="cheks">
                                    <label htmlFor="chek1">
                                        <div className="chek">
                                            <input type="checkbox" value="Sedan" name="carType" id="chek1" />
                                            <p>Sedan Car</p>
                                        </div>
                                    </label>

                                    <label htmlFor="chek2">
                                        <div className="chek">
                                            <input value="Hatchback" type="checkbox" name="carType" id="chek2" />
                                            <p>Hatchback Car</p>
                                        </div>
                                    </label>

                                    <label htmlFor="chek3">
                                        <div className="chek">
                                            <input value="SUV" type="checkbox" name="carType" id="chek3" />
                                            <p>SUV Car</p>
                                        </div>
                                    </label>
                                </div>
                            </div> 
                            <button>Search</button>
                        </form>
                        <form style={{display: ["moderator", "admin"].includes(curUser.role) ? "block" : "none"}} onSubmit={handleCreate} className="add_car">
                            <div>
                                <input type="text" name="title" placeholder="Enter car title" required />
                            </div>
                            <div>
                                <input type="text" name="carType" placeholder="Enter car type" required />
                            </div>
                            <div>
                                <input type="number" name="passenger" placeholder="Enter number of passengers" required />
                            </div>
                            <div>
                                <select name="transmission" required>
                                    <option value="">Select transmission</option>
                                    <option value="manual">Manual</option>
                                    <option value="automatic">Automatic</option>
                                </select>
                            </div>
                            <div>
                                <input type="number" name="carAge" placeholder="Enter car age in years" required />
                            </div>
                            <div>
                                <input type="number" name="luggage" placeholder="Enter luggage capacity" required />
                            </div>
                            <div>
                                <label>
                                    <input type="checkbox" name="airCondition" id="air" />
                                    Air Conditioning
                                </label>
                            </div>
                            <div>
                                <input type="number" name="pricePerDay" placeholder="Enter price per day" required />
                            </div>
                            <button style={{display: ["moderator", "admin"].includes(curUser.role) ? "block" : "none", marginTop: "20px"}} >Add Car</button>
                        </form>
                        <p style={{color: "red", marginTop: "20px", lineHeight: "25px"}}>{result.message}</p>
                    </div>

                    <div className="col_right">
                        <div style={{display: "grid"}} className="page_one">
                            {filter.length !== 0 ? filter.slice(startIndex, startIndex + 6).map(el => <Car key={el._id} car={el} />) : car.slice(startIndex, startIndex + 6).map(el => <Car key={el._id} car={el}/>)}
                        </div>

                        <div style={{display: [1, 2, 3, 4, 5, 6].includes(filter.length) ? "none": "flex"}} className="col_button">
                            <button style={{display: page === 1 ? "none": "block", padding: "2px", backgroundColor: "rgb(255, 45, 45)"}} onClick={() => setPage(page - 1)}>
                                <img src={leftArrow} alt="" />
                            </button>
                            <div style={{display: "flex", aligneItems: "center", gap: "10px"}}>
                                {Array.from({ length: Math.ceil(car.length / 6) }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        style={{
                                            fontWeight: page === i + 1 ? "bold" : "normal",
                                            backgroundColor: page === i + 1 ? "black" : "rgb(255, 45, 45)"
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                            <button style={{display: page === Math.ceil(car.length / 6) ? "none": "block", padding: "2px", backgroundColor: "rgb(255, 45, 45)"}} onClick={() => setPage(page + 1)}>
                                <img src={rightArrow} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cars;
