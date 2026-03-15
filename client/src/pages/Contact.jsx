import { Link } from "react-router-dom";
import bg from "../assets/pexels-thephotosaccount-30664842.jpg";
import Map from "../components/Map";

const InfoItem = ({ icon, title, value }) => (
    <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-xl flex-shrink-0">{icon}</div>
        <div>
            <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{title}</p>
            <p className="text-white font-medium text-sm">{value}</p>
        </div>
    </div>
);

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const { userName, userLastName, userEmail, userPhone } = e.target;
        if (userName.value && userLastName.value && userEmail.value && userPhone.value) e.target.reset();
    };

    return (
        <div>
            <div className="page-hero-banner" style={{ backgroundImage: `url(${bg})` }}>
                <div className="label-pill justify-center">Get In Touch</div>
                <h1 className="hero-animate-1 font-bold text-white text-4xl md:text-5xl tracking-tight mb-4">Contact Us</h1>
                <nav className="hero-animate-2 flex items-center gap-2 text-sm text-white/50">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span><span className="text-brand">Contact</span>
                </nav>
            </div>

            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
                    {/* Info panel */}
                    <div data-reveal="left">
                        <div className="rounded-3xl p-8 h-full flex flex-col gap-8"
                             style={{ background: 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)' }}>
                            <div>
                                <div className="label-pill mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                                    <span style={{ background: 'rgba(255,255,255,0.5)' }} />Contact Info
                                </div>
                                <h2 className="font-bold text-white text-2xl leading-snug mb-3">We'd Love to<br />Hear From You</h2>
                                <p className="text-white/60 text-sm leading-6">Reach out via any channel and our team will respond within 24 hours.</p>
                            </div>
                            <div className="flex flex-col gap-5">
                                <InfoItem icon="📞" title="Phone"   value="+1 (555) 123-4567" />
                                <InfoItem icon="✉️" title="Email"   value="hello@novaride.com" />
                                <InfoItem icon="📍" title="Address" value="123 Drive Avenue, New York, NY 10001" />
                                <InfoItem icon="🕐" title="Hours"   value="Mon–Fri: 8am–8pm" />
                            </div>
                            <div className="mt-auto rounded-2xl p-4" style={{ background: 'rgba(0,0,0,0.15)' }}>
                                <p className="text-white/70 text-sm leading-6">Need immediate help? Use our 24/7 hotline or live chat in the app.</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="card-base p-7 md:p-10" data-reveal="right">
                        <h3 className="font-bold text-gray-900 text-xl mb-2">Send a Message</h3>
                        <p className="text-gray-400 text-sm mb-8">We'll respond within one business day.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs text-gray-400 font-medium">First Name</label>
                                    <input className="input-base" type="text" name="userName" placeholder="John" required />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs text-gray-400 font-medium">Last Name</label>
                                    <input className="input-base" type="text" name="userLastName" placeholder="Doe" required />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs text-gray-400 font-medium">Email</label>
                                    <input className="input-base" type="email" name="userEmail" placeholder="john@example.com" required />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs text-gray-400 font-medium">Phone</label>
                                    <input className="input-base" type="tel" name="userPhone" placeholder="+1 234 567 890" required />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs text-gray-400 font-medium">Message</label>
                                <textarea className="input-base resize-none" name="userMessage" placeholder="Tell us how we can help..." rows={5} />
                            </div>
                            <button type="submit" className="btn-primary self-start px-8">
                                Send Message
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-5 md:px-8 xl:px-12 pb-16" data-reveal>
                <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-sm"><Map /></div>
            </section>
        </div>
    );
};

export default Contact;
