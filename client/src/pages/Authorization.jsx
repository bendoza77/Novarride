import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { SetLocalStorage } from "../utils/LocalStorage";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import bgImage from "../assets/meritt-thomas-BwBxVVdlpYE-unsplash.jpg";

const Authorization = () => {
    const { setCurUser } = useContext(UserContext);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_CLIENT_URL + "/api";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { userEmail, userPassword } = e.target;
        const toastId = toast.loading("Signing in...");
        try {
            const req = await fetch(`${API_URL}/auth/login`, {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail.value, password: userPassword.value }),
                credentials: "include"
            });
            const res = await req.json();
            if (!req.ok) throw new Error("Email or password is incorrect");
            if (res.status === "succasse") {
                setCurUser(() => { SetLocalStorage("curUser", res.data.user); return res.data.user; });
                navigate("/");
                toast.update(toastId, { render: "Welcome back!", type: "success", isLoading: false, autoClose: 2000 });
            }
        } catch (error) {
            toast.update(toastId, { render: `${error.message}`, type: "error", isLoading: false, autoClose: 3000 });
        }
    };

    return (
        <div className="min-h-[calc(100vh-72px)] flex">
            {/* Left: image */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden"
                style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.5) 100%)' }} />
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                    <div className="label-pill mb-4">Premium Fleet</div>
                    <h2 className="font-bold text-white text-4xl leading-tight mb-4">Drive in Style,<br />Every Journey</h2>
                    <p className="text-white/50 text-[15px] leading-7 max-w-sm">Join thousands of satisfied customers enjoying our premium car rental services.</p>
                </div>
            </div>

            {/* Right: form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-16 bg-white">
                <div className="w-full max-w-md">
                    <div className="mb-10">
                        <div className="label-pill mb-3">Welcome Back</div>
                        <h1 className="font-bold text-gray-900 text-3xl mb-2">Sign In to Novaride</h1>
                        <p className="text-gray-400 text-sm">Don't have an account?{' '}
                            <Link to="/register" className="text-brand hover:text-brand-hover font-medium transition-colors">Create one</Link>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 font-medium">Email Address</label>
                            <input className="input-base" type="email" name="userEmail" placeholder="you@example.com" required autoFocus />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs text-gray-400 font-medium">Password</label>
                            <div className="relative">
                                <input className="input-base pr-11" type={showPass ? "text" : "password"} name="userPassword" placeholder="Your password" required />
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
                        <button type="submit" className="btn-primary justify-center w-full py-4 text-base mt-2">Sign In</button>
                    </form>

                    <div className="section-divider my-7" />
                    <p className="text-center text-xs text-gray-400">
                        By signing in, you agree to our{' '}
                        <a href="#" className="text-gray-500 hover:text-brand transition-colors">Terms of Service</a>
                        {' '}and{' '}<a href="#" className="text-gray-500 hover:text-brand transition-colors">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Authorization;
