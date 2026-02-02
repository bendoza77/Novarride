import Media from "./Media";
import { Link as ScrollLink  } from "react-scroll";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png"
import arrow_right from "../assets/arrow-removebg-preview (1).png"
import { memo } from "react";

const Footer = memo(() => {

    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault();

        const { userEmail } = e.target

        if (userEmail.value) {
            e.target.reset();
        }

    }

    return (
        <>
            <div className="footer animate-fade-up">
                <div className="footer_top">
                    <div className="left1 animate-slide-right">
                        <img className="animate-zoom-rotate" src={logo} alt="" />
                        <p>Experience the ease and <br /> convenience of renting a car with <br /> Novaride.</p>
                    </div>

                    <div className="dv">         
                        <div className="left2 animate-fade-up">
                            <h1>legal policy</h1>
                            <ScrollLink  smooth={true} duration={200} to={`${location.pathname}` === "/" ? "home" : `${location.pathname}`.slice(1)} ><p style={{marginTop: "25px"}}>Term & Condition</p></ScrollLink >
                            <ScrollLink  smooth={true} duration={200} to={`${location.pathname}` === "/" ? "home" : `${location.pathname}`.slice(1)} ><p>Privacy Policy</p></ScrollLink >
                            <ScrollLink  smooth={true} duration={200} to={`${location.pathname}` === "/" ? "home" : `${location.pathname}`.slice(1)}><p>Legal Notice</p></ScrollLink >
                            <ScrollLink  smooth={true} duration={200} to={`${location.pathname}` === "/" ? "home" : `${location.pathname}`.slice(1)}><p>Accessibility</p></ScrollLink >
                        </div>


                        <div className="right1 animate-fade-up">
                            <h1>quick links</h1>
                            <Link to={"/"}><p style={{marginTop: "25px"}}>Home</p></Link>
                            <Link to={"/about"}><p>About Us</p></Link>
                            <Link to={"/cars"}><p>Car Type</p></Link>
                            <Link to={"/services"}><p>Service</p></Link>
                        </div>

                        <div className="right2 animate-fade-up">
                            <h1>Subscribe to the Newsleeters</h1>
                            <div className="right22">
                                <form onSubmit={handleSubmit} style={{display: "flex", aligneItems: "center"}}>
                                    <input type="email" name="userEmail" required placeholder="Email..."/>
                                    <button><img src={arrow_right} alt="" /></button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="footer_bottom animate-fade-up">
                    <div className="bottom_left">
                        <p>© 2024 Novaride. All rights reserved.</p>
                    </div>

                    <div className="bottom_right animate-scale-in">
                        <Media image="./src/assets/youtube.png" />
                        <Media image="./src/assets/facebook-app-symbol.png" />
                        <Media image="./src/assets/twitter (1).png" />
                        <Media image="./src/assets/instagram.png" />
                        <Media image="./src/assets/linkedin.png" />
                    </div>
                </div>
            </div>
        </>
    );




})

export default Footer