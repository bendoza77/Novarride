import { memo, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { SetLocalStorage } from "../utils/LocalStorage";
import logo from "../assets/logo.png"
import arrow_right from "../assets/arrow-removebg-preview (1).png"
import menu from "../assets/menu.png"
import profile from "../assets/profile.png"
import { toast } from "react-toastify";

const Nav = memo(() => {

    const [side, setSide] = useState(false);
    const { curUser, setCurUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        const toastId = toast.loading("User logout...");
        
        setCurUser(prev => {
            SetLocalStorage("curUser", {});
            return {};
        })

        setSide(false);
        navigate("/register");

        toast.update(toastId, {
            render: "You logout succassefuly",
            type: "success",
            isLoading: false,
            autoClose: 2000
        })

    }

    return (
        <>
            <div style={{display: side ? "block" : "none"}} className="sidebar animate-slide-right fixed inset-0 bg-black/80 backdrop-blur-md z-50">
                <div className="cancle flex justify-end px-5 py-4">
                    <div onClick={() => setSide(false)} className="h-10 w-10 bg-brand text-white rounded-xl flex items-center justify-center text-xl cursor-pointer">
                        <p>X</p>
                    </div>
                </div>

                <div className="side_nav flex flex-col gap-4 px-6 text-white text-lg">
                    <Link style={{textDecoration: "none"}} onClick={() => setSide(false)} to={"/"}><p style={{color: "red"}}>Home</p></Link>
                    <Link style={{textDecoration: "none"}} onClick={() => setSide(false)} to={"/about"}><p>About Us</p></Link>
                    <Link style={{textDecoration: "none"}} onClick={() => setSide(false)} to={"/cars"}><p>Cars</p></Link>
                    <Link style={{textDecoration: "none"}} onClick={() => setSide(false)} to={"/contact"}><p>Contact Us</p></Link>
                    <Link style={{textDecoration: "none"}} onClick={() => setSide(false)} to={"/contact"}><p>Book A Rental</p></Link>
                    <Link style={{textDecoration: "none", display: Object.keys(curUser).length === 0 ? "block" : "none"}} onClick={() => setSide(false)} to={"/authorization"}><p>Login</p></Link>
                    <Link style={{textDecoration: "none", display: Object.keys(curUser).length === 0  ? "block" : "none"}} onClick={() => setSide(false)} to={"/register"}><p>Register</p></Link>
                    <Link style={{textDecoration: "none", display: Object.keys(curUser).length > 0  ? "block" : "none"}} onClick={handleLogOut}><p>Log Out</p></Link>
                </div>
            </div>
            <header className="animate-fade-down w-full px-4 md:px-10 lg:px-16 xl:px-24 py-4 flex items-center justify-between gap-6 sticky top-0 bg-white/80 backdrop-blur-lg z-30">
                <div className="logo flex-shrink-0 w-24 md:w-32">
                    <Link to={"/"}><img className="w-full object-contain" src={logo} alt="" /></Link>
                </div>

                <div className="navigations hidden lg:flex items-center gap-8">
                    <Link to={"/"}><button style={{color: "red"}}>Home</button></Link>
                    <Link to={"/about"}><button>About Us</button></Link>
                    <Link to={"/cars"}><button>Cars</button></Link>
                    <Link to={"/contact"}><button>Contact Us</button></Link>
                </div>

                <div className="book flex items-center gap-4">
                    <Link className="btn hidden sm:block" to={"/contact"}><button className="btn">Book A Rental</button></Link>
                    <Link className="hidden sm:block" to={"/contact"}><button className="rental"><img src={arrow_right} alt="" /></button></Link>
                    <div onClick={() => setSide(true)} className="menu lg:hidden h-11 w-11 rounded-full bg-brand flex items-center justify-center cursor-pointer">
                        <img className="w-5" src={menu} alt="" />
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