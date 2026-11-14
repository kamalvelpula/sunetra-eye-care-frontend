import {
  Eye,
  Heart,
  ShieldCheck,
  Users,
  Glasses,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Target,
  Award,
} from "lucide-react";

import { Link } from "react-router-dom";
import "../styles/About.css";

const features = [
  {
    icon: Eye,
    number: "01",
    title: "Eye Care First",
    description:
      "We focus on helping people understand and care for their vision.",
  },
  {
    icon: Glasses,
    number: "02",
    title: "Spectacle Solutions",
    description:
      "Explore spectacle options suited to your vision needs and preferences.",
  },
  {
    icon: Heart,
    number: "03",
    title: "Personal Attention",
    description:
      "We believe every customer deserves friendly and attentive service.",
  },
  {
    icon: ShieldCheck,
    number: "04",
    title: "Customer Confidence",
    description:
      "We aim to make your eye-care experience comfortable and clear.",
  },
];

const services = [
  {
    icon: Eye,
    number: "01",
    title: "Eye Checkups",
    description:
      "Eye checkup support to help you understand your vision requirements.",
  },
  {
    icon: Glasses,
    number: "02",
    title: "Spectacles",
    description:
      "Spectacle options for everyday comfort, style and vision needs.",
  },
  {
    icon: Stethoscope,
    number: "03",
    title: "Doctor Consultation",
    description:
      "Consultation support and guidance for further eye-care needs.",
  },
];

export default function About() {
  return (
    <main className="about-page">

      {/* HERO SECTION */}

      <section className="about-hero">
        <div className="container about-hero-container">

          <div className="about-hero-content">
            <div className="about-eyebrow">
              <span></span>
              ABOUT SUNETRA EYE CARE
              <span></span>
            </div>

            <h1>
              Caring for Your Eyes,
              <span> Brightening Your World.</span>
            </h1>

            <p>
              Your vision matters. At Sunetra Eye Care,
              Challakere, we aim to make eye-care services
              and spectacle solutions accessible and convenient.
            </p>

            <div className="about-hero-actions">
              <Link to="/services" className="about-gold-button">
                Explore Our Services
                <ArrowRight size={18} />
              </Link>

              <Link to="/contact" className="about-outline-button">
                Get in Touch
              </Link>
            </div>

            <div className="about-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <strong>About Us</strong>
            </div>
          </div>

          <div className="about-hero-visual">
            <div className="about-hero-image">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85"
                alt="Eye care professional consultation"
              />
            </div>

            <div className="about-hero-image-accent"></div>

            <div className="about-image-badge">
              <div className="about-badge-icon">
                <Eye size={25} />
              </div>

              <div>
                <strong>Your Vision</strong>
                <span>Our Priority</span>
              </div>
            </div>

            <div className="about-hero-decoration">
              <Sparkles size={22} />
            </div>
          </div>

        </div>
      </section>

      {/* INTRODUCTION */}

      <section className="about-intro section">
        <div className="container about-intro-grid">

          <div className="about-intro-visual">
            <div className="about-intro-image">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=85"
                alt="Customer receiving personal attention"
                loading="lazy"
              />
            </div>

            <div className="about-intro-small-image">
              <img
                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=85"
                alt="Eyeglasses"
                loading="lazy"
              />
            </div>

            <div className="about-experience-card">
              <Eye size={27} />
              <strong>Better Vision</strong>
              <span>Starts with proper eye care</span>
            </div>
          </div>

          <div className="about-intro-content">
            <div className="about-eyebrow about-eyebrow-left">
              <span></span>
              WHO WE ARE
            </div>

            <h2>
              Welcome to
              <span> Sunetra Eye Care</span>
            </h2>

            <p>
              Sunetra Eye Care is focused on providing
              convenient eye-care support for individuals
              and families in Challakere.
            </p>

            <p>
              From eye checkup support and spectacle
              solutions to doctor consultation guidance,
              we aim to make your experience simple,
              comfortable and customer-friendly.
            </p>

            <div className="about-check-list">
              <div>
                <CheckCircle2 />
                <span>Eye checkup support</span>
              </div>

              <div>
                <CheckCircle2 />
                <span>Spectacle solutions</span>
              </div>

              <div>
                <CheckCircle2 />
                <span>Doctor consultation guidance</span>
              </div>

              <div>
                <CheckCircle2 />
                <span>Friendly customer assistance</span>
              </div>
            </div>

            <Link to="/services" className="about-gold-button">
              Discover Our Services
              <ArrowRight size={18} />
            </Link>
          </div>

        </div>
      </section>

      {/* OUR APPROACH */}

      <section className="about-approach">
        <div className="container">

          <div className="about-section-heading">
            <div className="about-eyebrow">
              <span></span>
              OUR APPROACH
              <span></span>
            </div>

            <h2>
              Eye Care with
              <span> Attention and Care</span>
            </h2>

            <p>
              We believe good eye care begins with understanding
              your needs and providing helpful guidance.
            </p>
          </div>

          <div className="about-features-grid">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  className="about-feature-card"
                  key={feature.number}
                >
                  <span className="about-card-number">
                    {feature.number}
                  </span>

                  <div className="about-feature-icon">
                    <Icon size={27} />
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                  <div className="about-card-bottom-line"></div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* OUR SERVICES */}

      <section className="about-services section">
        <div className="container">

          <div className="about-section-heading">
            <div className="about-eyebrow">
              <span></span>
              WHAT WE OFFER
              <span></span>
            </div>

            <h2>
              Supporting Your
              <span> Vision Needs</span>
            </h2>

            <p>
              Explore the eye-care support and services
              available at Sunetra Eye Care.
            </p>
          </div>

          <div className="about-services-grid">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <article
                  className="about-service-card"
                  key={service.number}
                >
                  <div className="about-service-top">
                    <div className="about-service-icon">
                      <Icon size={29} />
                    </div>

                    <span>{service.number}</span>
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <Link to="/services">
                    Learn More
                    <ArrowRight size={17} />
                  </Link>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* OUR VALUES */}

      <section className="about-values">
        <div className="container about-values-inner">

          <div className="about-values-icon">
            <Target size={35} />
          </div>

          <div className="about-values-content">
            <span>OUR COMMITMENT</span>

            <h2>
              Making Eye Care More
              <strong> Comfortable and Accessible</strong>
            </h2>

            <p>
              Our goal is to offer a welcoming experience,
              helpful guidance and suitable spectacle
              solutions for our customers.
            </p>
          </div>

          <div className="about-values-award">
            <Award size={35} />
          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="about-cta">
        <div className="container about-cta-content">

          <div className="about-cta-text">
            <div className="about-eyebrow about-cta-eyebrow">
              <span></span>
              YOUR VISION DESERVES ATTENTION
            </div>

            <h2>
              Take the Next Step Towards
              <span> Better Eye Care.</span>
            </h2>

            <p>
              Have a question or need assistance?
              Get in touch with Sunetra Eye Care.
            </p>
          </div>

          <Link to="/contact" className="about-cta-button">
            Contact Us
            <ArrowRight size={18} />
          </Link>

        </div>
      </section>

    </main>
  );
}