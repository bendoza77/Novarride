import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { SetLocalStorage } from "../utils/LocalStorage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Authorization = () => {

    const { setCurUser } = useContext(UserContext);
    const [res, setRes] = useState({});
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { userEmail, userPassword } = e.target;
        const toastId = toast.loading("User login...");

        const data = {
            email: userEmail.value,
            password: userPassword.value
        }

        try {
            const request = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
                credentials: "include"
            });

            const res = await request.json();
            setRes(res);

            if (!request.ok) {
                throw new Error("Email or Password is incorrect")
            }

            if (res.status === "succasse") {
                setCurUser(prev => {
                    SetLocalStorage("curUser", res.data.user);
                    return res.data.user
                })
                
                navigate("/");
                toast.update(toastId, {
                    render: "You log in succassefuly",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000
                })
            }

        } catch (error) {
            toast.update(toastId, {
                render: `Error: ${error}`,
                type: "error",
                isLoading: false,
                autoClose: 2000
            })
        }

    } 

    return (
        <>
            <form onSubmit={handleSubmit} className="auth_form animate-fade-up">
                <div>
                    <label htmlFor="userEmail">Enter Your Email</label> <br />
                    <input type="email" name="userEmail" id="userEmail" required placeholder="Enter Your Email"/>
                </div>

                <div>
                    <label htmlFor="userPassword">Enter Your Password</label> <br />
                    <input type="password" name="userPassword" id="userPassword" required placeholder="Enter Your Password"/>
                </div>
                <button>Login</button>
            </form>
        </>
    );




}

export default Authorization