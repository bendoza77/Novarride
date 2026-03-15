import { memo } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import facebookIcon from "../assets/facebook-app-symbol.png";
import twitterIcon   from "../assets/twitter (1).png";
import instagramIcon from "../assets/instagram.png";
import linkedinIcon  from "../assets/linkedin.png";
import youtubeIcon   from "../assets/youtube.png";

const SocialLink = ({ icon, label }) => (
    <a href="#" aria-label={label}
        className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:border-brand/40 hover:bg-brand/6 transition-all group">
        <img src={icon} alt={label} className="w-4 h-4 opacity-40 group-hover:opacity-80 transition-opacity" />
    </a>
);

const Footer = memo(() => {
    const handleNewsletter = (e) => {
        e.preventDefault();
        if (e.target.email.value) e.target.reset();
    };

    return (
        <footer className="mt-20 border-t border-gray-100" style={{ background: '#f0f2f5' }}>
            <div className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link to="/"><img src={logo} alt="Novaride" className="h-8 w-auto mb-5" /></Link>
                        <p className="text-gray-500 text-sm leading-7 max-w-[220px]">
                            Premium car rental services designed for comfort, convenience, and reliability.
                        </p>
                        <div className="flex items-center gap-2 mt-6">
                            <SocialLink icon={youtubeIcon}   label="YouTube" />
                            <SocialLink icon={facebookIcon}  label="Facebook" />
                            <SocialLink icon={twitterIcon}   label="Twitter" />
                            <SocialLink icon={instagramIcon} label="Instagram" />
                            <SocialLink icon={linkedinIcon}  label="LinkedIn" />
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Legal</h4>
                        <ul className="space-y-3.5">
                            {['Terms & Conditions', 'Privacy Policy', 'Legal Notice', 'Accessibility'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-sm text-gray-500 hover:text-brand transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Quick Links</h4>
                        <ul className="space-y-3.5">
                            {[
                                { label: 'Home',     to: '/' },
                                { label: 'About Us', to: '/about' },
                                { label: 'Cars',     to: '/cars' },
                                { label: 'Contact',  to: '/contact' },
                            ].map(({ label, to }) => (
                                <li key={to}>
                                    <Link to={to} className="text-sm text-gray-500 hover:text-brand transition-colors">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">Newsletter</h4>
                        <p className="text-sm text-gray-500 leading-6 mb-5">Stay updated with our latest offers.</p>
                        <form onSubmit={handleNewsletter} className="flex gap-2">
                            <input type="email" name="email" placeholder="Your email" required className="input-base flex-1 text-sm py-2.5" />
                            <button type="submit" className="px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-hover text-white text-sm font-medium transition-all whitespace-nowrap">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                <div className="section-divider my-10" />
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-400">© 2025 Novaride. All rights reserved.</p>
                    <p className="text-xs text-gray-300">Built for the road ahead.</p>
                </div>
            </div>
        </footer>
    );
});

export default Footer;
