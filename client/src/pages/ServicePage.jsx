import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ServiceContext } from "../context/ServiceContext";



const ServicePage = () => {
    const { serviceInfo } = useContext(ServiceContext);
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(false);
    const [three, setThree] = useState(false);
    const [four, setFour] = useState(false);

    const handleQuestionOne = () => {
        setOne(!one);
        setTwo(false);
        setThree(false);
        setFour(false);
    };

    const handleQuestionTwo = () => {
        setOne(false);
        setTwo(!two);
        setThree(false);
        setFour(false);
    };

    const handleQuestionThree = () => {
        setOne(false);
        setTwo(false);
        setThree(!three);
        setFour(false);
    };

    const handleQuestionFour = () => {
        setOne(false);
        setTwo(false);
        setThree(false);
        setFour(!four);
    };

    return (
        <div className="servicePage">
            <div className="about_top">
                <h1>{serviceInfo}</h1>
                <div className="about_nav">
                    <Link to={"/"}><p className="about_home">Home</p></Link>
                    <p>/</p>
                    <Link to={"/services"}><p className="place1">Cars</p></Link>
                    <p>/</p>
                    <p style={{ color: "rgb(255, 45, 45)" }}>{serviceInfo}</p>
                </div>
            </div>

            <div className="serv_info">
                <div className="serv_left">
                    <div className="left_up">
                        <h1>Our Services</h1>
                        <div>
                            <p>Car Rental With Drive</p>
                            <img className="serv_image" src={redArrow} alt="" />
                        </div>
                        <div>
                            <p>Business Car Rental</p>
                            <img className="serv_image" src={redArrow} alt="" />
                        </div>
                        <div>
                            <p>Airport Transfer</p>
                            <img className="serv_image" src={redArrow} alt="" />
                        </div>
                        <div>
                            <p>Chauffeur Services</p>
                            <img className="serv_image" src={redArrow} alt="" />
                        </div>
                    </div>

                    <div className="left_bottom">
                        <img src={helpImg} alt="" />
                        <h1>Need help ?</h1>
                        <p>We strive to provide exceptional customer service and support. Whether you have questions.</p>

                        <div className="contact_us">
                            <Link className="contact" to={"contact"}><button className="contact">Contact Us</button></Link>
                            <Link to={"contact"}><button className="contact1"><img src={arrowRight} alt="" /></button></Link>
                        </div>
                    </div>
                </div>

                <div className="serv_right">
                    <div className="right_top">
                        <img src={clientImg} alt="" />
                    </div>

                    <div className="right_info">
                        <h1>Discover premium rental services</h1>
                        <p>We offer a wide range of car rental services designed to meet all your transportation needs. Whether you’re <br />
                            traveling for business, planning a family vacation, or need a reliable vehicle for a special event, we have the <br />
                            perfect solution for you.</p>
                        <p>We offer a comprehensive range of car rental services designed to meet the diverse needs of our clients. <br />
                            Whether you’re traveling for business, planning a family vacation, or need a reliable vehicle for a special event, our <br />
                            fleet and services are tailored to provide you with the perfect solution. Discover the various services we offer and <br />
                            why we are the preferred choice for car rentals.</p>
                    </div>

                    <div className="sr">
                        <img src={first} alt="" />
                        <img src={second} alt="" />
                    </div>

                    <div className="clients">
                        <img src={firstClient} alt="" />
                        <img src={secondClient} alt="" />
                        <img src={thirdClient} alt="" />
                        <img src={fourthClient} alt="" />
                    </div>

                    <div className="rental_condition">
                        <div className="general_title">
                            <img src={siteLogo} alt="" />
                            <p>Frequently Asked Questions</p>
                        </div>

                        <h1>You need to know about servicet</h1>

                        <div className="agreement">
                            <div onClick={handleQuestionOne} className={`que ${one ? "que1" : "que11"}`}>
                                <div className="as">
                                    <p>Driver's License Requirements</p>
                                    <img src={!one ? plusIcon : minusIcon} alt="" />
                                </div>
                                <div className="ans" style={{ display: one ? "block" : "none" }}>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when <br />
                                        looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                                </div>
                            </div>

                            <div onClick={handleQuestionTwo} className={`que ${two ? "que1" : "que11"}`}>
                                <div className="as">
                                    <p>Insurance and Coverage policy</p>
                                    <img src={!two ? plusIcon : minusIcon} alt="" />
                                </div>
                                <div className="ans" style={{ display: two ? "block" : "none" }}>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when <br />
                                        looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                                </div>
                            </div>

                            <div onClick={handleQuestionThree} className={`que ${three ? "que1" : "que11"}`}>
                                <div className="as">
                                    <p>Available payment Methods</p>
                                    <img src={!three ? plusIcon : minusIcon} alt="" />
                                </div>
                                <div className="ans" style={{ display: three ? "block" : "none" }}>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when <br />
                                        looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                                </div>
                            </div>

                            <div onClick={handleQuestionFour} className={`que ${four ? "que1" : "que11"}`}>
                                <div className="as">
                                    <p>Cancellation and Modification policy</p>
                                    <img src={!four ? plusIcon : minusIcon} alt="" />
                                </div>
                                <div className="ans" style={{ display: four ? "block" : "none" }}>
                                    <p>It is a long established fact that a reader will be distracted by the readable content of a page when <br />
                                        looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicePage;
