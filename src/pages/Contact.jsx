
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";
import "../styles/Contact.css";

const contactDetails = [
  {
    icon: MapPin,
    title: "Our Location",
    description: "Challakere, Karnataka, India",
    link: "https://www.google.com/maps/search/?api=1&query=Challakere%2C+Karnataka",
    linkText: "View on Google Maps",
  },
  {
    icon: MessageCircle,
    title: "Send an Enquiry",
    description: "Have questions about our eye-care services?",
    link: "#contact-form",
    linkText: "Write a Message",
  },
  {
    icon: Clock,
    title: "Appointment Enquiry",
    description: "Get in touch to ask about appointment availability.",
    link: "/appointment",
    linkText: "Enquire Now",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = `
Hello Sunetra Eye Care,

Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email || "Not provided"}
Subject: ${form.subject}

Message:
${form.message}
    `.trim();

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="contact-page">

      {/* HERO SECTION */}
      <section className="contact-hero">
        <div className="container contact-hero-inner">

          <div className="contact-hero-content">
            <span className="contact-eyebrow">
              <span></span>
              WE ARE HERE FOR YOU
            </span>

            <h1>
              Let's Talk About
              <span> Your Vision.</span>
            </h1>

            <p>
              Your eye health matters to us. Connect with Sunetra Eye Care
              for eye-care enquiries, spectacles and appointment assistance.
              We're always happy to help.
            </p>

            <div className="contact-hero-actions">
              <Link to="/appointment" className="contact-gold-button">
                Book an Appointment
                <ArrowRight size={18} />
              </Link>

              <a href="#contact-form" className="contact-outline-button">
                Send a Message
              </a>
            </div>

            <div className="contact-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <strong>Contact Us</strong>
            </div>
          </div>

          <div className="contact-hero-visual">
            <div className="contact-hero-image-accent"></div>

            <img
              className="contact-hero-image"
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1100&q=90"
              alt="Eye care professional assisting a patient"
            />

            <div className="contact-hero-badge">
              <div className="contact-badge-icon">
                <Eye size={25} />
              </div>
              <div>
                <strong>Your Vision Matters</strong>
                <span>Care with confidence</span>
              </div>
            </div>

            <div className="contact-hero-decoration"></div>
          </div>

        </div>
      </section>

      {/* CONTACT INFORMATION */}
      <section className="contact-info-section section">
        <div className="container">

          <div className="contact-section-heading">
            <span className="contact-eyebrow contact-eyebrow-center">
              GET IN TOUCH
            </span>

            <h2>
              We'd Love to <span>Hear From You</span>
            </h2>

            <p>
              Choose a convenient way to connect with our eye-care team.
            </p>
          </div>

          <div className="contact-info-grid">
            {contactDetails.map((item, index) => {
              const Icon = item.icon;

              return (
                <article className="contact-info-card" key={item.title}>
                  <div className="contact-info-top">
                    <div className="contact-info-icon">
                      <Icon size={26} />
                    </div>
                    <span className="contact-info-number">
                      0{index + 1}
                    </span>
                  </div>

                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  {item.link.startsWith("/") || item.link.startsWith("#") ? (
                    <Link to={item.link} className="contact-info-link">
                      {item.linkText}
                      <ArrowRight size={17} />
                    </Link>
                  ) : (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="contact-info-link"
                    >
                      {item.linkText}
                      <ArrowRight size={17} />
                    </a>
                  )}
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="contact-form-section" id="contact-form">
        <div className="container contact-form-grid">

          <div className="contact-form-intro">
            <span className="contact-eyebrow">
              <span></span>
              SEND US A MESSAGE
            </span>

            <h2>
              How Can We
              <span> Assist You?</span>
            </h2>

            <p>
              Have a question or need assistance? Share your details and
              enquiry. We'll help you take the next step towards better
              eye care.
            </p>

            <div className="contact-form-points">
              <div>
                <CheckCircle2 size={21} />
                <span>Eye checkup enquiries</span>
              </div>

              <div>
                <CheckCircle2 size={21} />
                <span>Spectacles and lens enquiries</span>
              </div>

              <div>
                <CheckCircle2 size={21} />
                <span>Doctor consultation assistance</span>
              </div>

              <div>
                <CheckCircle2 size={21} />
                <span>Appointment-related questions</span>
              </div>
            </div>

            <div className="contact-help-card">
              <div className="contact-help-icon">
                <ShieldCheck size={27} />
              </div>

              <div>
                <strong>Your Vision, Our Priority</strong>
                <span>
                  We're here to guide you with care and attention.
                </span>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-heading">
              <span>LET'S CONNECT</span>
              <h3>Send Your Enquiry</h3>
              <p>Fill in the details below to get started.</p>
            </div>

            <div className="contact-input-row">
              <div className="contact-field">
                <label htmlFor="contact-name">Your Name *</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-phone">Phone Number *</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  pattern="[0-9+\-\s]{10,15}"
                  title="Enter a valid phone number"
                  required
                />
              </div>
            </div>

            <div className="contact-input-row">
              <div className="contact-field">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">Enquiry Type *</label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an enquiry</option>
                  <option value="Eye Checkup">Eye Checkup</option>
                  <option value="Spectacles">Spectacles</option>
                  <option value="Doctor Consultation">
                    Doctor Consultation
                  </option>
                  <option value="Appointment Enquiry">
                    Appointment Enquiry
                  </option>
                  <option value="Other Enquiry">Other Enquiry</option>
                </select>
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="contact-message">Your Message *</label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Tell us how we can help you..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="contact-submit-button">
              Continue with WhatsApp
              <Send size={18} />
            </button>

            <span className="contact-form-note">
              <MessageCircle size={15} />
              Your message will open in WhatsApp for you to review and send.
            </span>
          </form>

        </div>
      </section>

      {/* LOCATION / MAP */}
      <section className="contact-map-section section">
        <div className="container">

          <div className="contact-section-heading">
            <span className="contact-eyebrow contact-eyebrow-center">
              FIND OUR LOCATION
            </span>

            <h2>
              Come <span>Visit Us</span>
            </h2>

            <p>
              Find our location and plan your visit to Sunetra Eye Care.
            </p>
          </div>

          <div className="contact-map-card">
            <div className="contact-map-details">
              <div className="contact-map-icon">
                <MapPin size={27} />
              </div>

              <div>
                <span>OUR LOCATION</span>
                <h3>Sunetra Eye Care</h3>
                <p>Challakere, Karnataka, India</p>
              </div>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Challakere%2C+Karnataka"
                target="_blank"
                rel="noreferrer"
                className="contact-map-link"
              >
                Get Directions
                <ArrowRight size={17} />
              </a>
            </div>

            <div className="contact-map-frame">
              <iframe
                title="Sunetra Eye Care location map"
                src="https://maps.google.com/maps?q=Challakere%2C%20Karnataka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
