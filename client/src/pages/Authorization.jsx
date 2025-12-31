import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SetLocalStorage } from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Authorization = () => {

    const { setCurUser } = useContext(UserContext);
    const [res, setRes] = useState({});
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";

    const handleSubmit = async (e) => {

        e.preventDefault();

        const { userEmail, userPassword } = e.target

        const data = {
            email: userEmail.value,
            password: userPassword.value
        }

        try {
            const request = await fetch(`${API_URL}/users/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
                credentials: "include"
            });

            const res = await request.json();
            setRes(res);
            console.log(res);

            if (res.status === "succasse") {
                setCurUser(prev => {
                    SetLocalStorage("curUser", res.data.user);
                    return res.data.user
                })
                
                navigate("/");
            }

        } catch (error) {
            console.log(error);
        }

    } 

    return (
        <>
            <form onSubmit={handleSubmit} className="auth_form">
                <div>
                    <label htmlFor="userEmail">Enter Your Email</label> <br />
                    <input type="email" name="userEmail" id="userEmail" required placeholder="Enter Your Email"/>
                </div>

                <div>
                    <label htmlFor="userPassword">Enter Your Password</label> <br />
                    <input type="password" name="userPassword" id="userPassword" required placeholder="Enter Your Password"/>
                </div>
                <button>Login</button>
                <p style={{marginTop: "20px", color: "red"}}>{res.message}</p>
            </form>
        </>
    );




}

export default Authorization