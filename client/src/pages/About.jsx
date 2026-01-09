import { useState } from "react";
import { Link } from "react-router-dom";

import visionImg from "../assets/pexels-albinberlin-905554.jpg";
import approachImg from "../assets/pexels-mikebirdy-3729464.jpg";
import missionImg from "../assets/pexels-toms-svilans-375611-1005617.jpg";

import aboutLeftImg from "../assets/Screenshot 2025-11-08 120025.png";
import siteLogo from "../assets/site-logo.png";
import bookingImg from "../assets/booking.png";
import pickupImg from "../assets/pick-up.png";

import siteLogoWhite from "../assets/site-logo-removebg-preview.png";
import brandsImg from "../assets/brands.png";
import likeImg from "../assets/like.png";

import fleet1 from "../assets/Screenshot 2025-11-24 191635.png";
import fleet2 from "../assets/Screenshot 2025-11-24 191649.png";
import fleetMiddle from "../assets/Screenshot 2025-11-24 191712.png";
import fleet3 from "../assets/Screenshot 2025-11-24 191724.png";
import fleet4 from "../assets/Screenshot 2025-11-24 191735.png";
import bg from "../assets/pexels-thephotosaccount-30664842.jpg";


const About = () => {

    const [carImage, setCarImage] = useState(visionImg);
    const [vission, setVission] = useState(true);
    const [approach, setApproach] = useState(false);
    const [mission, setMission] = useState(false);
    const [title, setTitle] = useState("Vision");

    const handleVission = () => {
        setCarImage(visionImg);
        setVission(true);
        setApproach(false);
        setMission(false);
        setTitle("Vision");
    };

    const handleApproach = () => {
        setCarImage(approachImg);
        setVission(false);
        setApproach(true);
        setMission(false);
        setTitle("Approach");
    };

    const handleMission = () => {
        setCarImage(missionImg);
        setVission(false);
        setApproach(false);
        setMission(true);
        setTitle("Mission");
    };

    return (
        <>
            <div className="about">
                <div style={{backgroundImage: `url(${bg})`, backgroundSize: "cover"}} className="about_top">
                    <h1>About Us</h1>
                    <div className="about_nav">
                        <Link to={"/"}><p className="about_home">Home</p></Link>
                        <p>/</p>
                        <p className="place">About Us</p>
                    </div>
                </div>

                <div style={{ marginTop: "100px" }} className="about-us">
                    <div className="left_us">
                        <img src={aboutLeftImg} alt="" />
                    </div>

                    <div className="right_us">
                        <div className="title">
                            <img src={siteLogo} alt="" />
                            <p>About Us</p>
                        </div>

                        <h1>Your trusted partner in <br /> reliable car rental</h1>
                        <p className="la">Aqestic Optio Amet A Ququam Saepe Aliquid Voluate Dicta Fuga Dolor Saerror Sed <br /> Earum A Magni Soluta Quam Minus Dolor Dolor</p>

                        <div className="booking_info">
                            <img src={bookingImg} alt="" />
                            <div className="booking_title">
                                <p className="process">Easy Booking Process</p>
                                <p className="booking_text">We Have Optimized The Booking Process So That Our Clients Can <br /> Experience The Easiest And The Safest Service</p>
                            </div>
                        </div>

                        <div className="pick_up">
                            <img src={pickupImg} alt="" />
                            <div className="pickup_title">
                                <p style={{ fontSize: 20, fontWeight: 500 }}>Convenient Pick-Up & Return Process</p>
                                <p style={{ color: "rgba(128, 128, 128, 0.752", marginTop: 20, lineHeight: "25px" }}>We Have Optimized The Booking Process So That Our Clients Can <br /> Experience The Easiest And The Safest Service</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="brands">
                    <div className="brands_title">
                        <img src={siteLogoWhite} alt="" />
                        <p>Executive Partners</p>
                    </div>

                    <h1>Trusted by leading brands</h1>

                    <img className="brand_image" src={brandsImg} alt="" />
                </div>

                <div className="mission">
                    <div className="mission_title">
                        <img src={siteLogoWhite} alt="" />
                        <p>Vision Mission</p>
                    </div>

                    <h1>Driving excellence and innovation <br /> in car rental services</h1>

                    <div className="mis">
                        <div style={{ backgroundColor: vission ? "rgb(255, 45, 45)" : "white", color: vission ? "white" : "black" }} onClick={handleVission} className="vision">
                            <p>Our Vision</p>
                        </div>

                        <div style={{ backgroundColor: mission ? "rgb(255, 45, 45)" : "white", color: mission ? "white" : "black" }} onClick={handleMission} className="miss">
                            <p>Our Mission</p>
                        </div>

                        <div style={{ backgroundColor: approach ? "rgb(255, 45, 45)" : "white", color: approach ? "white" : "black" }} onClick={handleApproach} className="approach">
                            <p>Our Approach</p>
                        </div>
                    </div>

                    <div className="mission_bottom">
                        <div className="mission_left">
                            <div className="mis_left">
                                <img src={siteLogoWhite} alt="" />
                                <p>Our {title}</p>
                            </div>

                            <h1>Pioneering excellence in <br /> car rental services</h1>

                            <p className="mission_info">We aim to continually innovate and integrate the latest technology into our <br /> services. From easy online bookings to advanced vehicle tracking systems, our goal <br /> is to make the car rental process seamless and efficient for our customers. Quality <br /> is at the heart of everything we do. We maintain a diverse fleet of well-maintained <br /> vehicles that meet the highest standards of safety and comfort.</p>

                            <div style={{ marginTop: "40px" }} className="like">
                                <img src={likeImg} alt="" />
                                <p>Our customers are our top priority</p>
                            </div>

                            <div className="like">
                                <img src={likeImg} alt="" />
                                <p>Quality is at the heart of everything we do</p>
                            </div>

                            <div className="like">
                                <img src={likeImg} alt="" />
                                <p>every vehicle leaves care looking its absolute best</p>
                            </div>
                        </div>

                        <div className="mission_right">
                            <img src={carImage} alt="" />
                        </div>
                    </div>
                </div>

                <div className="choose">
                    <div className="choose_title">
                        <img src={siteLogoWhite} alt="" />
                        <p>Why Choose Us</p>
                    </div>

                    <h1>Unmatched quality and service <br /> for your needs</h1>

                    <div className="choose_bottom">
                        <div className="choose_left">
                            <div className="fleet_op">
                                <img src={fleet1} alt="" />
                                <div className="op_right">
                                    <h1>Extensive Fleet Options</h1>
                                    <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                                </div>
                            </div>

                            <div className="ser">
                                <img src={fleet2} alt="" />
                                <div className="ser_right">
                                    <h1>Exceptional Customer Service</h1>
                                    <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                                </div>
                            </div>
                        </div>

                        <div className="choose_middle">
                            <img src={fleetMiddle} alt="" />
                        </div>

                        <div className="choose_right">
                            <div className="fleet_op">
                                <img src={fleet3} alt="" />
                                <div className="op_right">
                                    <h1 style={{ marginLeft: "-120px" }}>Convenient Locations</h1>
                                    <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                                </div>
                            </div>

                            <div className="ser">
                                <img src={fleet4} alt="" />
                                <div className="ser_right">
                                    <h1 style={{ marginLeft: "-120px" }}>Reliability And Safety</h1>
                                    <p>Quisque Sollicitudin Feugiat Risus, Eu Posuere <br /> Ex Euismod Eu. Phasellus Hendrerit, Massa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default About;
