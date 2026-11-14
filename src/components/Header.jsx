
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  CalendarDays,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import "../styles/Header.css";

const navigation = [
  { label: "Home", path: "/", end: true },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services", dropdown: true },
  { label: "Our Doctors", path: "/doctors" },
  { label: "Gallery", path: "/gallery" },
  { label: "Testimonials", path: "/testimonials" },
  { label: "Contact", path: "/contact" },
];

function SunetraEyeLogo() {
  return (
    <svg
      viewBox="0 0 100 70"
      width="58"
      height="48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sunetra Eye Care logo"
      role="img"
    >
      <path
        d="M5 37C25 5 69 0 95 24C77 15 54 14 36 24C23 30 13 42 5 37Z"
        fill="#087C70"
      />

      <path
        d="M5 37C27 58 65 69 95 35C72 48 43 53 5 37Z"
        fill="#078F86"
      />

      <path
        d="M7 30C25 2 65 -2 89 15"
        stroke="#D9A52B"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      <path
        d="M17 42C36 57 66 59 89 38"
        stroke="#D9A52B"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <circle cx="48" cy="35" r="19" fill="#087F91" />
      <circle cx="48" cy="35" r="14" fill="#20B7AD" />
      <circle cx="48" cy="35" r="9" fill="#092F3D" />
      <circle cx="43" cy="29" r="4" fill="white" />
      <circle cx="54" cy="41" r="2" fill="#D9A52B" />

      <path
        d="M76 29H87M81.5 23.5V34.5"
        stroke="#D9A52B"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="main-header">
      <div className="top-contact-bar">
        <div className="header-container top-contact-inner">
          <div className="contact-left">
            <a href="#location">
              <MapPin size={17} />
              <span>Challakere, Karnataka</span>
            </a>

            <span className="top-divider"></span>

            <a href="tel:+918105427908">
              <Phone size={17} />
              <span>+91 8105427908</span>
            </a>

            <span className="top-divider"></span>

            <a href="mailto:info@sunetraeyecare.in">
              <Mail size={19} />
              <span>info@sunetraeyecare.in</span>
            </a>
          </div>
        </div>
      </div>

      <div className="navigation-bar">
        <div className="header-container navigation-inner">
          <Link to="/" className="brand-logo" onClick={closeMenu}>
            <span className="brand-eye">
              <SunetraEyeLogo />
            </span>

            <span className="brand-name">
              <strong>Sunetra</strong>
              <span>Eye Care</span>
            </span>
          </Link>

          <button
            className="mobile-menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          <nav
            className={`navigation-menu ${menuOpen ? "menu-open" : ""}`}
          >
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `navigation-link ${isActive ? "active" : ""}`
                }
              >
                {item.label}

                {item.dropdown && (
                  <ChevronDown
                    className="navigation-chevron"
                    size={15}
                  />
                )}
              </NavLink>
            ))}

            <Link
              to="/appointment"
              className="header-appointment"
              onClick={closeMenu}
            >
              <CalendarDays size={19} />
              <span>Book Appointment</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}