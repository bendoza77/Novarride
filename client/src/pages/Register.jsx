import { useContext, useState } from "react";
import { SetLocalStorage } from "../utils/LocalStorage";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from "../assets/meritt-thomas-BwBxVVdlpYE-unsplash.jpg";

const Register = () => {
    const { setUsers, setCurUser } = useContext(UserContext);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { userName, userEmail, userLastName, userPhone, userPassword } = e.target;
        const toastId = toast.loading("Creating your account...");
        const data = { fullName: `${userName.value} ${userLastName.value}`, email: userEmail.value, password: userPassword.value, phone: userPhone.value };
        try {
            const req = await fetch(`${API_URL}/auth/signup`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data), credentials: "include"
            });
            const res = await req.json();
            if (!req.ok) throw new Error(res.message);
            if (res.status === "succasse") {
                setUsers(prev => { SetLocalStorage("users", [...prev, data]); return [...prev, data]; });
                setCurUser(() => { SetLocalStorage("curUser", data); return data; });
                navigate("/");
                toast.update(toastId, { render: "Account created successfully!", type: "success", isLoading: false, autoClose: 2000 });
            }
        } catch (error) {
            toast.update(toastId, { render: `${error.message}`, type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    return (
        <div className="min-h-[calc(100vh-72px)] flex">
            {/* Left: form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-16 bg-white">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <div className="label-pill mb-3">Join Novaride</div>
                        <h1 className="font-bold text-gray-900 text-3xl mb-2">Create Your Account</h1>
                        <p className="text-gray-400 text-sm">Already have an account?{' '}
                            <Link to="/authorization" className="text-brand hover:text-brand-hover font-medium transition-colors">Sign in</Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-gray-400 font-medium">First Name</label>
                                <input className="input-base" type="text" name="userName" placeholder="John" required />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-gray-400 font-medium">Last Name</label>
                                <input className="input-base" type="text" name="userLastName" placeholder="Doe" required />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 font-medium">Phone Number</label>
                            <input className="input-base" type="tel" name="userPhone" placeholder="+1 234 567 890" required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 font-medium">Email Address</label>
                            <input className="input-base" type="email" name="userEmail" placeholder="you@example.com" required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 font-medium">Password</label>
                            <div className="relative">
                                <input className="input-base pr-11" type={showPass ? "text" : "password"} name="userPassword" placeholder="Create a strong password" required />
                                <button type="button" onClick={() => setShowPass(s => !s)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                        {showPass
                                            ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>
                                            : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                                        }
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="btn-primary justify-center w-full py-4 text-base mt-2">Create Account</button>
                    </form>

                    <div className="section-divider my-7" />
                    <p className="text-center text-xs text-gray-400">
                        By registering, you agree to our{' '}
                        <a href="#" className="text-gray-500 hover:text-brand transition-colors">Terms of Service</a>
                        {' '}and{' '}<a href="#" className="text-gray-500 hover:text-brand transition-colors">Privacy Policy</a>
                    </p>
                </div>
            </div>

            {/* Right: image */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden"
                style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(225deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.5) 100%)' }} />
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <div className="flex flex-col gap-3 mb-8">
                        {["Free cancellation on all bookings", "500+ premium vehicles available", "24/7 dedicated customer support"].map(b => (
                            <div key={b} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 text-[10px] font-bold flex-shrink-0">✓</div>
                                <span className="text-white/70 text-sm">{b}</span>
                            </div>
                        ))}
                    </div>
                    <div className="label-pill mb-3">New Member</div>
                    <h2 className="font-bold text-white text-3xl leading-tight">Start Your Journey<br />With Novaride Today</h2>
                </div>
            </div>
        </div>
    );
};

export default Register;
