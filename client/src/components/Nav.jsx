import { memo, useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { SetLocalStorage } from "../utils/LocalStorage";
import logo from "../assets/logo.png";
import { toast } from "react-toastify";

const Nav = memo(() => {
    const [open, setOpen]       = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { curUser, setCurUser } = useContext(UserContext);
    const navigate  = useNavigate();
    const location  = useLocation();
    const isLoggedIn = Object.keys(curUser).length > 0;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { setOpen(false); }, [location.pathname]);

    const handleLogOut = () => {
        const toastId = toast.loading("Logging out...");
        setCurUser(() => { SetLocalStorage("curUser", {}); return {}; });
        navigate("/");
        toast.update(toastId, { render: "Logged out successfully", type: "success", isLoading: false, autoClose: 2000 });
    };

    const links = [
        { to: "/",        label: "Home" },
        { to: "/about",   label: "About" },
        { to: "/cars",    label: "Cars" },
        { to: "/contact", label: "Contact" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Mobile overlay menu */}
            <div
                className={`fixed inset-0 z-50 flex flex-col transition-all duration-300 ${
                    open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                style={{ background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(20px)' }}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <Link to="/"><img src={logo} alt="Novaride" className="h-8 w-auto" /></Link>
                    <button
                        onClick={() => setOpen(false)}
                        className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:border-gray-300 transition-all"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-col px-6 py-8 flex-1 gap-1">
                    {links.map(({ to, label }) => (
                        <Link
                            key={to} to={to}
                            className={`text-lg font-medium py-3.5 px-4 rounded-xl transition-all border ${
                                isActive(to)
                                    ? 'text-brand bg-brand/6 border-brand/15'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-transparent'
                            }`}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="px-6 py-8 border-t border-gray-100 flex flex-col gap-3">
                    {isLoggedIn ? (
                        <>
                            <button onClick={() => navigate("/profile")}
                                className="w-full py-3.5 px-5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-all">
                                My Profile
                            </button>
                            <button onClick={handleLogOut}
                                className="w-full py-3.5 px-5 rounded-xl bg-brand hover:bg-brand-hover text-white font-semibold transition-all">
                                Log Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/authorization"
                                className="w-full py-3.5 px-5 rounded-xl border border-gray-200 text-gray-700 font-medium text-center hover:bg-gray-50 transition-all">
                                Login
                            </Link>
                            <Link to="/register"
                                className="w-full py-3.5 px-5 rounded-xl bg-brand hover:bg-brand-hover text-white font-semibold text-center transition-all">
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* Main header */}
            <header
                className={`nav-animate fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
                    scrolled ? 'py-3' : 'py-4'
                }`}
                style={scrolled ? {
                    background: 'rgba(255,255,255,0.92)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid #e9eaec',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.06)'
                } : {
                    background: 'transparent'
                }}
            >
                <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 flex items-center justify-between gap-6">
                    <Link to="/" className="flex-shrink-0">
                        <img src={logo} alt="Novaride" className="h-8 md:h-9 w-auto" />
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {links.map(({ to, label }) => (
                            <Link
                                key={to} to={to}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors group ${
                                    isActive(to) ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                                }`}
                            >
                                {label}
                                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-brand rounded-full transition-all duration-300 ${
                                    isActive(to) ? 'w-5' : 'w-0 group-hover:w-4'
                                }`} />
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2.5">
                        <Link to="/contact" className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-5">
                            Book a Rental
                        </Link>

                        {isLoggedIn ? (
                            <div className="hidden lg:flex items-center gap-2">
                                <button
                                    onClick={() => navigate("/profile")}
                                    className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
                                >
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                    </svg>
                                </button>
                                <button onClick={handleLogOut} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-700 transition-colors">
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <div className="hidden lg:flex items-center gap-2">
                                <Link to="/authorization" className="px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                                    Login
                                </Link>
                                <Link to="/register" className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                                    Register
                                </Link>
                            </div>
                        )}

                        <button
                            onClick={() => setOpen(true)}
                            className="lg:hidden w-10 h-10 rounded-xl border border-gray-200 flex flex-col items-center justify-center gap-1.5 hover:bg-gray-50 hover:border-gray-300 transition-all"
                        >
                            <span className="w-5 h-0.5 bg-gray-700 rounded-full" />
                            <span className="w-3.5 h-0.5 bg-gray-400 rounded-full" />
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
});

export default Nav;
