import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Car from "../components/Car";

import profileImg from "../assets/profile.png";
import siteLogo from "../assets/site-logo-removebg-preview.png";
import leftArrow from "../assets/left-arrow-removebg-preview.png";
import rightArrow from "../assets/arrow-removebg-preview (1).png";
import plusIcon from "../assets/plus.png";
import minusIcon from "../assets/minus.png";
import fleetOption1 from "../assets/Screenshot 2025-11-24 191635.png";
import customerService from "../assets/Screenshot 2025-11-24 191649.png";
import middleImg from "../assets/Screenshot 2025-11-24 191712.png";
import locationImg from "../assets/Screenshot 2025-11-24 191724.png";
import safetyImg from "../assets/Screenshot 2025-11-24 191735.png";
import bg from "../assets/pexels-thephotosaccount-30664842.jpg";

const Profile = () => {
    const { curUser } = useContext(UserContext);
    const [page, setPage] = useState(1);
    const startIndex = (page - 1) * 6;
    const [car, setCar] = useState([]);
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);
    const [five, setFive] = useState(false);
    const [six, setSix] = useState(false);

    const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";

    const handleQuestionOne = () => { setOne(!one); setTwo(false); setThree(false); setFour(false); setFive(false); setSix(false); }
    const handleQuestionTwo = () => { setOne(false); setThree(false); setTwo(!two); setFour(false); setFive(false); setSix(false); }
    const handleQuestionThree = () => { setOne(false); setTwo(false); setThree(!three); setFour(false); setFive(false); setSix(false); }
    const handleQuestionFour = () => { setOne(false); setTwo(false); setThree(false); setFour(!four); setFive(false); setSix(false); }
    const handleQuestionFive = () => { setOne(false); setTwo(false); setThree(false); setFour(false); setFive(!five); setSix(false); }
    const handleQuestionSix = () => { setOne(false); setTwo(false); setThree(false); setFour(false); setFive(false); setSix(!six); }

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
    }, []);

    return (
        <>
            <div className="profile_div space-y-32">
                <div style={{backgroundImage: `url(${bg})`}} className="about_top animate-fade-down">
                    <h1 className="animate-fade-up">Profile</h1>
                    <div className="about_nav">
                        <Link to={"/"}><p className="about_home">Home</p></Link>
                        <p>/</p>
                        <Link to={"/cars"}><p className="place1">Profile</p></Link>
                        <p>/</p>
                        <p style={{color: "rgb(255, 45, 45)"}}>{curUser.fullName}</p>
                    </div>
                </div>
                
                <div className="profile_bottom animate-fade-up">
                    <div className="profile_left animate-slide-right">
                        <img src={profileImg} alt="" />
                        <div className="user_info">
                            <p>Full Name: <span>{curUser.fullName}</span></p>
                            <p>Email: <span>{curUser.email}</span></p>
                            <p>Mobile No. <span>{curUser.phone}</span></p>
                        </div>
                    </div>

                    <div className="profile_right animate-slide-left">
                        <div className="car_like">
                            <div className="profile_title">
                                <img src={siteLogo} alt="" />
                                <p>Profile</p>
                            </div>
                            <h1 style={{fontSize: "50px"}}>The Cars You May Like It</h1>
                            <div style={{marginTop: "50px"}} className="col_right1">
                                <div style={{display: "grid"}} className="page_one">
                                    { car.slice(startIndex, startIndex + 6).map((el, idx) => <Car key={el._id} delay={idx * 120} car={el}/> ) }
                                </div>
                                <div className="col_button">
                                    <button style={{display: page === 1 ? "none": "block", padding: "2px", backgroundColor: "rgb(255, 45, 45)"}} onClick={() => setPage(page - 1)}><img src={leftArrow} alt="" /></button>
                                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                                        {Array.from({ length: Math.ceil(car.length / 6) }, (_, i) => (
                                            <button key={i} onClick={() => setPage(i + 1)} style={{ fontWeight: page === i + 1 ? "bold" : "normal", backgroundColor: page === i + 1 ? "black" : "rgb(255, 45, 45)" }}>{i + 1}</button>
                                        ))}
                                    </div>
                                    <button style={{display: page === Math.ceil(car.length / 6) ? "none": "block", padding: "2px", backgroundColor: "rgb(255, 45, 45)"}} onClick={() => setPage(page + 1)}><img src={rightArrow} alt="" /></button>
                                </div>
                            </div>
                        </div>

                        <div className="rental_condition animate-fade-up">
                            <div className="general_title">
                                <img src={siteLogo} alt="" />
                                <p>Rental Conditions</p>
                            </div>
                            <h1>Policies and agreement</h1>
                            <div className="agreement">
                                <div onClick={handleQuestionOne} className={`que ${one ? "que1" : "que11"}`}>
                                    <div className="as">
                                        <p>Driver's License Requirements</p>
                                        <img src={!one ? plusIcon : minusIcon} alt="" />
                                    </div>
                                    <div className="ans" style={{display: one ? "block" : "none"}}>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when <br /> looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                                    </div>
                                </div>
                                <div onClick={handleQuestionTwo} className={`que ${two ? "que1" : "que11"}`}>
                                    <div className="as">
                                        <p>Insurance and Coverage policy</p>
                                        <img src={!two ? plusIcon : minusIcon} alt="" />
                                    </div>
                                    <div className="ans" style={{display: two ? "block" : "none"}}>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when <br /> looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                                    </div>
                                </div>
                                <div onClick={handleQuestionThree} className={`que ${three ? "que1" : "que11"}`}>
                                    <div className="as">
                                        <p>Available payment Methods</p>
                                        <img src={!three ? plusIcon : minusIcon} alt="" />
                                    </div>
                                    <div className="ans" style={{display: three ? "block" : "none"}}>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when <br /> looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                                    </div>
                                </div>
                                <div onClick={handleQuestionFour} className={`que ${four ? "que1" : "que11"}`}>
                                    <div className="as">
                                        <p>Cancellation and Modification policy</p>
                                        <img src={!four ? plusIcon : minusIcon} alt="" />
                                    </div>
                                    <div className="ans" style={{display: four ? "block" : "none"}}>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when <br /> looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                                    </div>
                                </div>
                                <div onClick={handleQuestionFive} className={`que ${five ? "que1" : "que11"}`}>
                                    <div className="as">
                                        <p>Smoking and Pet Policies</p>
                                        <img src={!five ? plusIcon : minusIcon} alt="" />
                                    </div>
                                    <div className="ans" style={{display: five ? "block" : "none"}}>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when <br /> looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                                    </div>
                                </div>
                                <div onClick={handleQuestionSix} className={`que ${six ? "que1" : "que11"}`}>
                                    <div className="as">
                                        <p>The minimum age Requirements</p>
                                        <img src={!six ? plusIcon : minusIcon} alt="" />
                                    </div>
                                    <div className="ans" style={{display: six ? "block" : "none"}}>
                                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when <br /> looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="choose animate-fade-up">
                    <div className="choose_title">
                        <img src={siteLogo} alt="" />
                        <p>Why Choose Us</p>
                    </div>
                    <h1>Unmatched quality and service <br /> for your needs</h1>
                    <div className="choose_bottom">
                        <div className="choose_left">
                            <div className="fleet_op">
                                <img src={fleetOption1} alt="" />
                                <div className="op_right">
                                    <h1>Extensive Fleet Options</h1>
                                    <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                                </div>
                            </div>
                            <div className="ser">
                                <img src={customerService} alt="" />
                                <div className="ser_right">
                                    <h1>Exceptional Customer Service</h1>
                                    <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                                </div>
                            </div>
                        </div>
                        <div className="choose_middle">
                            <img src={middleImg} alt="" />
                        </div>
                        <div className="choose_right">
                            <div className="fleet_op">
                                <img src={locationImg} alt="" />
                                <div className="op_right">
                                    <h1 style={{marginLeft: "-120px"}}>Convenient Locations</h1>
                                    <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                                </div>
                            </div>
                            <div className="ser">
                                <img src={safetyImg} alt="" />
                                <div className="ser_right">
                                    <h1 style={{marginLeft: "-120px"}}>Reliability And Safety</h1>
                                    <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;
