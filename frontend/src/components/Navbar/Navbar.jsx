import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate()

    const OnLogout = () => {
        Cookies.remove('jwt_token')
        navigate('/login', { replace: true })
    }

    return (
        <nav className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg">
            <div className="h-[70px] px-6 md:px-10 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-wide text-cyan-400"
                >
                    MyBrand
                </Link>

                {/* Desktop Links */}
                <ul className="hidden md:flex gap-8 text-slate-200 font-medium">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/chatbot" className="nav-link">Chatbot</Link></li>
                    <li><Link to="/about" className="nav-link">About</Link></li>
                    <li><Link to="/courses" className="nav-link">Courses</Link></li>
                    <li><Link to="/contact" className="nav-link">Contact</Link></li>
                </ul>

                {/* Logout Button (Desktop) */}
                <button
                    className="hidden md:block px-5 py-2 rounded-full bg-red-500 text-white
          font-semibold hover:bg-red-400 transition"
                    onClick={OnLogout}
                >
                    Logout
                </button>

                {/* Hamburger (Mobile) */}
                <button
                    className="md:hidden text-slate-200 text-3xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✕" : "☰"}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-slate-900 px-6 pb-4 space-y-4">
                    <Link to="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/about" className="mobile-link" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/services" className="mobile-link" onClick={() => setMenuOpen(false)}>Services</Link>
                    <Link to="/projects" className="mobile-link" onClick={() => setMenuOpen(false)}>Projects</Link>
                    <Link to="/contact" className="mobile-link" onClick={() => setMenuOpen(false)}>Contact</Link>

                    {/* Logout Button (Mobile) */}
                    <button
                        className="w-full mt-3 px-4 py-2 rounded-lg bg-red-500 text-white
            font-semibold hover:bg-red-400 transition"
                        onClick={OnLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
