import { useContext } from "react";
import { SetLocalStorage } from "../utils/LocalStorage";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {

    const { setUsers, setCurUser } = useContext(UserContext);
    const [res, setRes] = useState({});
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";

    const handleSubmit = async (e) => {

        e.preventDefault();

        const { userName, userEmail, userLastName, userPhone, userPassword } = e.target
        const toastId = toast.loading("User register...");

        const data = {
            fullName: `${userName.value} ${userLastName.value}`,
            email: userEmail.value,
            password: userPassword.value,
            phone: userPhone.value
        }

        try {
            const request = await fetch(`${API_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            });

            const res = await request.json();
            setRes(res);
            
            if (!request.ok) {
                throw new Error(res.message);
            }

            if (res.status === "succasse") {
                setUsers(prev => {
                    SetLocalStorage("users", [...prev, data]);
                    return [...prev, data];
                })

                setCurUser(prev => {
                    SetLocalStorage("curUser", data);
                    return data;
                })

                navigate("/");
                toast.update(toastId, {
                    render: "You register succassefuly",
                    type: "success",
                    isLoading: false,
                    autoClose: 2000
                })
            }

        } catch (error) {
            toast.update(toastId, {
                render: `Error ${error}`,
                type: "error",
                isLoading: false,
                autoClose: 2000
            })
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit} className="register_form animate-fade-up">
                <div className="reg_first">
                    <div className="reg_name">
                        <label htmlFor="userName">Enter Your Name</label> <br />
                        <input type="text" name="userName" id="userName" placeholder="Enter Your Name" required/>
                    </div>

                    <div className="reg_lastname">
                        <label htmlFor="userLastName">Enter Your Name</label> <br />
                        <input type="text" name="userLastName" id="userLastName" placeholder="Enter Your Last Name" required/>
                    </div>
                </div>

                <div className="reg_second">
                    <label htmlFor="userPhone">Enter Your Mobile No.</label> <br />
                    <input type="text" name="userPhone" id="userPhone" placeholder="Enter Your Mobile No." required/>
                </div>

                <div className="reg_third">
                    <div className="reg_email">
                        <label htmlFor="userEmail">Enter Your Email</label> <br />
                        <input type="email" name="userEmail" id="userEmail" placeholder="Enter Your Email" required/>
                    </div>

                    <div className="reg_password">
                        <label htmlFor="userPassword">Enter Your Password</label> <br />
                        <input type="password" name="userPassword" id="userPassword" placeholder="Enter Your Password" required/>
                    </div>
                </div>
                <button>Create Accounte</button>
            </form>
        </>
    );



}

export default Register