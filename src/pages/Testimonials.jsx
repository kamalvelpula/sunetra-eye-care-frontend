
import { Link } from "react-router-dom";
import {
  Quote,
  MessageCircle,
  ArrowRight,
  Heart,
  ShieldCheck,
  Eye,
  Sparkles,
} from "lucide-react";

import "../styles/Testimonials.css";

const testimonials = [
  {
    name: "Happy Customer",
    location: "Challakere",
    message:
      "A good eye-care experience starts with understanding your vision needs. We value every customer and their feedback.",
  },
  {
    name: "Valued Customer",
    location: "Challakere",
    message:
      "Finding the right spectacles can make everyday life more comfortable. Customer satisfaction is always important to us.",
  },
  {
    name: "Our Customer",
    location: "Challakere",
    message:
      "We appreciate everyone who chooses Sunetra Eye Care for their eyewear and eye-care requirements.",
  },
];

export default function Testimonials() {
  return (
    <main className="testimonials-page">

      {/* HERO SECTION */}
      <section className="testimonials-hero">
        <div className="container testimonials-hero-inner">

          <div className="testimonials-hero-content">
            <span className="testimonials-eyebrow">
              <Heart size={16} />
              CUSTOMER EXPERIENCE
            </span>

            <h1>
              Your Trust Is
              <span> Our Inspiration</span>
            </h1>

            <p>
              Every customer has a unique vision journey.
              We believe in creating a comfortable,
              caring and welcoming eye-care experience.
            </p>

            <div className="testimonials-hero-actions">
              <Link
                to="/contact"
                className="testimonials-gold-button"
              >
                Get in Touch
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="testimonials-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Testimonials</span>
            </div>
          </div>

          <div className="testimonials-hero-visual">
            <div className="testimonials-hero-accent"></div>

            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=90"
              alt="Friendly healthcare consultation"
            />

            <div className="testimonials-hero-badge">
              <Heart size={23} />
              <div>
                <strong>Care That Matters</strong>
                <span>Your vision is important to us</span>
              </div>
            </div>
          </div>

          <div className="testimonials-hero-decoration"></div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="testimonials-intro section">
        <div className="container">

          <div className="testimonials-section-heading">
            <span>YOUR TRUST MATTERS</span>

            <h2>
              Every Vision Deserves
              <span> Better Care</span>
            </h2>

            <p>
              We aim to make your journey towards better
              vision comfortable, convenient and personal.
              Your feedback helps us improve.
            </p>
          </div>

          {/* TESTIMONIAL CARDS */}
          <div className="testimonials-grid">
            {testimonials.map((item, index) => (
              <article
                className="testimonial-card"
                key={item.name}
              >
                <div className="testimonial-card-top">
                  <span className="testimonial-quote">
                    <Quote size={27} />
                  </span>

                  <span className="testimonial-number">
                    0{index + 1}
                  </span>
                </div>

                <p className="testimonial-message">
                  "{item.message}"
                </p>

                <div className="testimonial-divider"></div>

                <div className="testimonial-customer">
                  <span className="testimonial-avatar">
                    {item.name.charAt(0)}
                  </span>

                  <div>
                    <h3>{item.name}</h3>
                    <span>{item.location}</span>
                  </div>
                </div>

                <div className="testimonial-card-bottom"></div>
              </article>
            ))}
          </div>

          <div className="testimonials-demo-note">
            <Sparkles size={19} />
            <p>
              These are sample testimonials for design preview.
              Replace them with genuine customer feedback
              before publishing the website.
            </p>
          </div>

        </div>
      </section>

      {/* WHY TRUST US */}
      <section className="testimonials-trust">
        <div className="container">

          <div className="testimonials-section-heading">
            <span>THE SUNETRA EXPERIENCE</span>

            <h2>
              What Matters
              <span> to Us</span>
            </h2>

            <p>
              We focus on making every interaction
              thoughtful and customer-friendly.
            </p>
          </div>

          <div className="testimonials-trust-grid">

            <article className="testimonials-trust-card">
              <div className="testimonials-trust-icon">
                <Eye size={27} />
              </div>

              <h3>Vision First</h3>

              <p>
                Understanding your vision needs is
                an important part of better eye care.
              </p>

              <span className="testimonials-trust-line"></span>
            </article>

            <article className="testimonials-trust-card">
              <div className="testimonials-trust-icon">
                <Heart size={27} />
              </div>

              <h3>Personal Care</h3>

              <p>
                We value your comfort and aim to
                provide a welcoming experience.
              </p>

              <span className="testimonials-trust-line"></span>
            </article>

            <article className="testimonials-trust-card">
              <div className="testimonials-trust-icon">
                <ShieldCheck size={27} />
              </div>

              <h3>Customer Trust</h3>

              <p>
                Your confidence and satisfaction
                matter to us at every step.
              </p>

              <span className="testimonials-trust-line"></span>
            </article>

          </div>
        </div>
      </section>

      {/* FEEDBACK CTA */}
      <section className="testimonials-feedback">
        <div className="container testimonials-feedback-inner">

          <div className="testimonials-feedback-icon">
            <MessageCircle size={37} />
          </div>

          <div className="testimonials-feedback-content">
            <span>WE VALUE YOUR FEEDBACK</span>

            <h2>
              Your Experience Matters to Us
            </h2>

            <p>
              Have questions about our services?
              We would love to hear from you.
            </p>
          </div>

          <Link
            to="/contact"
            className="testimonials-contact-button"
          >
            Contact Us
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>

    </main>
  );
}