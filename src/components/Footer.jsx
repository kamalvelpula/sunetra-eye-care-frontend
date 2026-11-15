
import { Link } from "react-router-dom";
import {
  Eye,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
} from "lucide-react";

import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="footer-eye">
              <Eye size={35} />
            </span>

            <span>
              <strong>Sunetra</strong>
              <small>Eye Care</small>
            </span>
          </Link>

          <p>
            Your vision deserves the best care. We are here
            to help you explore eye-care services and quality
            spectacles for everyday living.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/doctors">Our Doctors</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="footer-column">
          <h3>Our Services</h3>
          <Link to="/services">Eye Checkup</Link>
          <Link to="/services">Quality Spectacles</Link>
          <Link to="/services">Doctor Consultation</Link>

          <Link to="/appointment" className="footer-appointment">
            Book Appointment
            <ArrowUpRight size={15} />
          </Link>
        </div>

        <div className="footer-column footer-contact">
          <h3>Contact Information</h3>

          <p>
            <MapPin />
            Challakere, Karnataka, India
          </p>

          <a href="tel:+918105427908">
            <Phone />
            +91 8105427908
          </a>

          <a href="mailto:info@sunetraeyecare.in">
            <Mail />
            info@sunetraeyecare.in
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} Sunetra Eye Care.
            All Rights Reserved.
          </p>

          <p>See the World More Clearly.</p>
        </div>
      </div>
    </footer>
  );
}