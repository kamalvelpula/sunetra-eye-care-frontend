
import {
  Eye,
  Glasses,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  Heart,
  Clock,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/Services.css";

const SERVICES_API = "http://https://sunetra-eye-care-backend.onrender.com/api/services";

const benefits = [
  {
    icon: Heart,
    number: "01",
    title: "Personal Attention",
    description:
      "We value your concerns and aim to provide friendly assistance.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Helpful Guidance",
    description:
      "We help you understand available eye-care options.",
  },
  {
    icon: Clock,
    number: "03",
    title: "Convenient Enquiries",
    description:
      "Contact us to ask about services and appointment availability.",
  },
];

function getServiceIcon(name = "") {
  const title = name.toLowerCase();

  if (title.includes("spectacle") || title.includes("lens")) {
    return Glasses;
  }

  if (title.includes("consultation") || title.includes("doctor")) {
    return Stethoscope;
  }

  return Eye;
}

function getServiceLabel(name = "") {
  const title = name.toLowerCase();

  if (title.includes("spectacle") || title.includes("lens")) {
    return "VISION & COMFORT";
  }

  if (title.includes("consultation") || title.includes("doctor")) {
    return "EXPERT GUIDANCE";
  }

  if (title.includes("testing")) {
    return "VISION TESTING";
  }

  return "VISION CARE";
}

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(SERVICES_API);

      if (!response.ok) {
        throw new Error("Unable to load services. Please try again.");
      }

      const data = await response.json();

      const activeServices = data.filter(
        (service) => service.active === true
      );

      setServices(activeServices);
    } catch (err) {
      setError(
        err.message || "Something went wrong while loading services."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="services-page">

      {/* HERO SECTION */}
      <section className="services-hero">
        <div className="container services-hero-content">

          <div className="services-hero-text">
            <div className="services-eyebrow">
              <span />
              OUR SERVICES
              <span />
            </div>

            <h1>
              Complete Care for
              <span>Your Vision Needs.</span>
            </h1>

            <p>
              Discover eye-care support, spectacle solutions
              and consultation guidance at Sunetra Eye Care,
              Challakere.
            </p>

            <div className="services-hero-actions">
              <Link to="/appointment" className="services-gold-button">
                Enquire Now <ArrowRight size={18} />
              </Link>

              <Link to="/contact" className="services-outline-button">
                Contact Us
              </Link>
            </div>

            <div className="services-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <strong>Services</strong>
            </div>
          </div>

          <div className="services-hero-visual">
            <div className="services-hero-image">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=85"
                alt="Eye care consultation"
              />
            </div>

            <div className="services-image-accent" />

            <div className="services-floating-card">
              <div className="services-floating-icon">
                <Eye size={25} />
              </div>
              <div>
                <strong>Your Vision Matters</strong>
                <span>Care with attention</span>
              </div>
            </div>

            <div className="services-hero-decoration">
              <Sparkles size={25} />
            </div>
          </div>

        </div>
      </section>

      {/* SERVICES FROM DATABASE */}
      <section className="section services-main">
        <div className="container">

          <div className="services-section-heading">
            <div className="services-eyebrow">
              <span />
              WHAT WE OFFER
              <span />
            </div>

            <h2>
              Our Eye Care <span>Services</span>
            </h2>

            <p>
              Explore our services and find the support
              that suits your vision requirements.
            </p>
          </div>

          {loading && (
            <div className="services-loading">
              Loading our services...
            </div>
          )}

          {!loading && error && (
            <div className="services-error">
              <p>{error}</p>
              <button onClick={fetchServices}>
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && services.length === 0 && (
            <div className="services-empty">
              <Eye size={35} />
              <h3>Services Coming Soon</h3>
              <p>
                Our services will be displayed here soon.
                Please contact us for more information.
              </p>
            </div>
          )}

          {!loading && !error && services.length > 0 && (
            <div className="services-list">
              {services.map((service, index) => {
                const Icon = getServiceIcon(service.name);

                const number = String(index + 1).padStart(2, "0");

                return (
                  <article
                    className="service-detail-card"
                    key={service.id}
                  >

                    <div className="service-detail-visual">

                      {service.imageUrl ? (
                        <img
                          src={service.imageUrl}
                          alt={service.name}
                          className="service-database-image"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="service-detail-icon">
                          <Icon size={38} strokeWidth={1.5} />
                        </div>
                      )}

                      <span className="service-detail-number">
                        {number}
                      </span>

                      <span className="service-detail-label">
                        {getServiceLabel(service.name)}
                      </span>
                    </div>

                    <div className="service-detail-content">
                      <span className="service-number">
                        SERVICE {number}
                      </span>

                      <h3>{service.name}</h3>

                      <p>{service.description}</p>

                      <Link to="/appointment">
                        Enquire About This Service
                        <ArrowRight size={17} />
                      </Link>
                    </div>

                    <div className="service-card-line" />
                  </article>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="services-benefits">
        <div className="container">

          <div className="services-section-heading">
            <div className="services-eyebrow">
              <span />
              WHY CHOOSE US
              <span />
            </div>

            <h2>
              Your Vision Matters <span>To Us</span>
            </h2>

            <p>
              We aim to make your eye-care experience
              simple, comfortable and helpful.
            </p>
          </div>

          <div className="services-benefits-grid">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  className="services-benefit-card"
                  key={benefit.title}
                >
                  <span className="services-benefit-number">
                    {benefit.number}
                  </span>

                  <div className="services-benefit-icon">
                    <Icon size={29} strokeWidth={1.6} />
                  </div>

                  <h3>{benefit.title}</h3>

                  <p>{benefit.description}</p>

                  <div className="services-benefit-line" />
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="services-trust">
        <div className="container services-trust-inner">
          <div className="services-trust-icon">
            <BadgeCheck size={34} />
          </div>

          <div>
            <span>OUR COMMITMENT</span>
            <h2>Friendly Support for Your Eye-Care Needs</h2>
            <p>
              We are here to help you explore suitable services
              and understand your available options.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="services-cta">
        <div className="container services-cta-content">

          <div className="services-cta-text">
            <span>LET'S TAKE CARE OF YOUR VISION</span>

            <h2>
              Need Help Choosing the Right
              <strong> Eye-Care Service?</strong>
            </h2>

            <p>
              Get in touch with Sunetra Eye Care for more information.
            </p>
          </div>

          <Link to="/contact" className="services-cta-button">
            Contact Us <ArrowRight size={18} />
          </Link>

        </div>
      </section>

    </div>
  );
}