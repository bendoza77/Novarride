import { memo, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { SetLocalStorage } from "../utils/LocalStorage";
import logo from "../assets/logo.png"
import arrow_right from "../assets/arrow-removebg-preview (1).png"
import menu from "../assets/menu.png"
import profile from "../assets/profile.png"

const Nav = memo(() => {

    const [side, setSide] = useState(false);
    const { curUser, setCurUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        
        setCurUser(prev => {
            SetLocalStorage("curUser", {});
            return {};
        })

        setSide(false);
        navigate("/register");

    }

    return (
        <>
            <div style={{display: side ? "block" : "none"}} className="sidebar">
                <div className="cancle">
                    <div onClick={() => setSide(false)}>
                        <p>X</p>
                    </div>
                </div>

                <div className="side_nav">
                    <Link onClick={() => setSide(false)} to={"/"}><p style={{color: "red"}}>Home</p></Link>
                    <Link onClick={() => setSide(false)} to={"/about"}><p>About Us</p></Link>
                    <Link onClick={() => setSide(false)} to={"/cars"}><p>Cars</p></Link>
                    <Link onClick={() => setSide(false)} to={"/contact"}><p>Contact Us</p></Link>
                    <Link onClick={() => setSide(false)} to={"/contact"}><p>Book A Rental</p></Link>
                    <Link style={{display: Object.keys(curUser).length === 0 ? "block" : "none"}} onClick={() => setSide(false)} to={"/authorization"}><p>Login</p></Link>
                    <Link style={{display: Object.keys(curUser).length === 0  ? "block" : "none"}} onClick={() => setSide(false)} to={"/register"}><p>Register</p></Link>
                    <Link style={{display: Object.keys(curUser).length > 0  ? "block" : "none"}} onClick={handleLogOut}><p>Log Out</p></Link>
                </div>
            </div>
            <header>
                <div className="logo">
                    <Link to={"/"}><img src={logo} alt="" /></Link>
                </div>

                <div className="navigations">
                    <Link to={"/"}><button style={{color: "red"}}>Home</button></Link>
                    <Link to={"/about"}><button>About Us</button></Link>
                    <Link to={"/cars"}><button>Cars</button></Link>
                    <Link to={"/contact"}><button>Contact Us</button></Link>
                </div>

                <div className="book">
                    <Link className="btn" to={"/contact"}><button className="btn">Book A Rental</button></Link>
                    <Link to={"/contact"}><button className="rental"><img src={arrow_right} alt="" /></button></Link>
                    <div onClick={() => setSide(true)} className="menu">
                        <img src={menu} alt="" />
                    </div>

                    <Link style={{display: Object.keys(curUser).length === 0 ? "block" : "none"}} to={"/register"}><button className="register">Register</button></Link>
                    <Link style={{display: Object.keys(curUser).length === 0  ? "block" : "none"}} to={"/authorization"}><button className="autho">Login</button></Link>
                    <div style={{display: Object.keys(curUser).length > 0  ? "block" : "none"}} className="profile">
                        <img onClick={() => navigate("/profile")} className="profile_image" src={profile} alt="" />
                    </div>
                    {Object.keys(curUser).length > 0 && <p className="out" onClick={handleLogOut}>Log Out</p>}
                </div>
            </header>
        </>
    );



})

export default Nav