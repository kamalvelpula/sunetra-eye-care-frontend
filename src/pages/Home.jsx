
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Glasses,
  HeartHandshake,
  ScanEye,
  ShieldCheck,
  Stethoscope,
  ChevronDown,
  CircleHelp,
  Monitor,
  Sun,
  Droplets,
  Eye,
} from "lucide-react";

import { Link } from "react-router-dom";
import "../styles/Home.css";

const SERVICES_API = "http://https://sunetra-eye-care-backend.onrender.com/api/services";

const getServiceIcon = (serviceName = "") => {
  const name = serviceName.toLowerCase();

  if (name.includes("spectacle") || name.includes("glass")) {
    return Glasses;
  }

  if (name.includes("consultation") || name.includes("doctor")) {
    return Stethoscope;
  }

  if (name.includes("contact lens") || name.includes("lens")) {
    return Eye;
  }

  if (name.includes("computer") || name.includes("digital")) {
    return Monitor;
  }

  return ScanEye;
};

const careFeatures = [
  {
    icon: HeartHandshake,
    title: "Friendly Guidance",
    description:
      "A welcoming experience and helpful guidance for your eye-care needs.",
  },
  {
    icon: Glasses,
    title: "Spectacle Choices",
    description:
      "Explore different spectacle styles and options to suit your preferences.",
  },
  {
    icon: ShieldCheck,
    title: "Care You Can Trust",
    description:
      "We focus on making your eye-care experience comfortable and convenient.",
  },
];

const eyeCareTips = [
  {
    icon: Monitor,
    number: "01",
    title: "Follow the 20-20-20 Rule",
    description:
      "Every 20 minutes, look at something about 20 feet away for at least 20 seconds to give your eyes a break.",
    tag: "Screen Care",
  },
  {
    icon: Sun,
    number: "02",
    title: "Protect Your Eyes Outdoors",
    description:
      "Wear sunglasses that provide UV protection when spending time outdoors in bright sunlight.",
    tag: "Outdoor Care",
  },
  {
    icon: Eye,
    number: "03",
    title: "Give Your Eyes a Break",
    description:
      "Take regular breaks during reading and screen use. Remember to blink naturally and avoid long periods of uninterrupted viewing.",
    tag: "Daily Habit",
  },
  {
    icon: Droplets,
    number: "04",
    title: "Stay Hydrated",
    description:
      "Drink enough water throughout the day and maintain healthy daily habits to support your overall well-being.",
    tag: "Healthy Living",
  },
];

const faqs = [
  {
    question: "What services are available at Sunetra Eye Care?",
    answer:
      "We provide eye-care service guidance, spectacle options and assistance with doctor consultations and referrals.",
  },
  {
    question: "How can I request an eye checkup appointment?",
    answer:
      "Visit our Appointment page, enter your contact details and preferred date and time, then submit your request through the available WhatsApp option.",
  },
  {
    question: "Can I explore different types of spectacles?",
    answer:
      "Yes. You can explore different spectacle styles, frame designs and lens options. Contact us to ask about available choices.",
  },
  {
    question: "Do you provide doctor consultation?",
    answer:
      "We provide guidance and referrals for eye-related medical consultations. Contact us to understand the available consultation arrangements.",
  },
  {
    question: "How can I contact Sunetra Eye Care?",
    answer:
      "You can reach us through the Contact page, phone or WhatsApp using the contact details displayed on our website.",
  },
  {
    question: "Can I visit without booking an appointment?",
    answer:
      "You can contact us before visiting to check availability and confirm the most convenient time.",
  },
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState(0);

  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        setServicesError("");

        const response = await fetch(SERVICES_API);

        if (!response.ok) {
          throw new Error("Unable to load services.");
        }

        const data = await response.json();

        const activeServices = data.filter(
          (service) => service.active === true
        );

        setServices(activeServices);
      } catch (error) {
        console.error("Error fetching home services:", error);
        setServicesError(
          "Our services are temporarily unavailable. Please try again later."
        );
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq((current) => (current === index ? null : index));
  };

  return (
    <main className="home-page">
      {/* ================= HERO SECTION ================= */}

      <section className="home-hero">
        <div className="home-hero-image">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=90"
            alt="Professional eye care consultation"
            fetchPriority="high"
          />
        </div>

        <div className="home-hero-shade"></div>

        <div className="container home-hero-container">
          <div className="home-hero-content">
            <div className="home-hero-label">
              <span className="home-label-icon">
                <ScanEye size={17} />
              </span>
              <span>WELCOME TO SUNETRA EYE CARE</span>
            </div>

            <h1>
              A Clearer View.
              <br />
              <span>A Brighter</span>
              <br />
              Tomorrow.
            </h1>

            <p className="home-hero-description">
              Your vision deserves thoughtful care. Discover helpful
              eye-care services, quality spectacles and friendly guidance
              at Sunetra Eye Care.
            </p>

            <div className="home-hero-actions">
              <Link to="/appointment" className="home-gold-button">
                Book an Appointment
                <ArrowRight size={18} />
              </Link>

              <Link to="/services" className="home-text-button">
                Explore Our Services
                <ArrowUpRight size={18} />
              </Link>
            </div>

            <div className="home-hero-points">
              <div>
                <CheckCircle2 size={18} />
                <span>Quality Care</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Friendly Service</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Vision Support</span>
              </div>
            </div>
          </div>
        </div>

        <div className="home-hero-note">
          <span className="home-hero-note-icon">
            <HeartHandshake size={25} />
          </span>
          <div>
            <strong>Your Vision Matters</strong>
            <span>Care that puts you first</span>
          </div>
        </div>

        <div className="home-hero-bottom-line"></div>
      </section>

      {/* ================= INTRO STRIP ================= */}

      <section className="home-intro-strip">
        <div className="container home-intro-inner">
          <div className="home-intro-item">
            <span className="home-intro-icon">
              <ScanEye size={23} />
            </span>
            <div>
              <strong>Eye Care</strong>
              <span>Support for your vision</span>
            </div>
          </div>

          <div className="home-intro-divider"></div>

          <div className="home-intro-item">
            <span className="home-intro-icon">
              <Glasses size={23} />
            </span>
            <div>
              <strong>Quality Spectacles</strong>
              <span>Styles for your preference</span>
            </div>
          </div>

          <div className="home-intro-divider"></div>

          <div className="home-intro-item">
            <span className="home-intro-icon">
              <Stethoscope size={23} />
            </span>
            <div>
              <strong>Consultation Guidance</strong>
              <span>Helpful medical referrals</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES SECTION ================= */}

      <section className="home-services-section">
        <div className="container">
          <div className="home-section-top">
            <div className="home-section-label">
              <span></span>
              WHAT WE OFFER
              <span></span>
            </div>

            <h2 className="home-section-title">
              Thoughtful Care for
              <br />
              <span>Every Vision</span>
            </h2>

            <p className="home-section-description">
              Explore our eye-care services, designed to support your
              vision needs with helpful guidance and care.
            </p>
          </div>

          {servicesLoading ? (
            <p className="home-services-message">
              Loading our services...
            </p>
          ) : servicesError ? (
            <p className="home-services-message home-services-error">
              {servicesError}
            </p>
          ) : services.length === 0 ? (
            <p className="home-services-message">
              Our services will be available here soon.
            </p>
          ) : (
            <div className="home-service-grid">
              {services.map((service, index) => {
                const Icon = getServiceIcon(service.name);

                return (
                  <article className="home-service-card" key={service.id}>
                    <div className="home-service-image">
                      <img
                        src={
                          service.imageUrl ||
                          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=85"
                        }
                        alt={service.name}
                        loading="lazy"
                      />

                      <span className="home-service-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="home-service-image-icon">
                        <Icon size={23} />
                      </span>
                    </div>

                    <div className="home-service-content">
                      <h3>{service.name}</h3>

                      <p>{service.description}</p>

                      <Link to="/services" className="home-service-link">
                        Learn More
                        <ArrowUpRight size={17} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}

      <section className="home-about-section">
        <div className="container home-about-layout">
          <div className="home-about-visual">
            <div className="home-about-main-image">
              <img
                src="https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=1000&q=85"
                alt="Eye care examination"
                loading="lazy"
              />
            </div>

            <div className="home-about-small-image">
              <img
                src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=85"
                alt="Eyeglasses"
                loading="lazy"
              />
            </div>

            <div className="home-about-image-caption">
              <ScanEye size={24} />
              <div>
                <strong>See Better</strong>
                <span>Live Brighter</span>
              </div>
            </div>
          </div>

          <div className="home-about-content">
            <div className="home-section-label home-section-label-left">
              <span></span>
              ABOUT SUNETRA EYE CARE
            </div>

            <h2>
              Your Vision
              <br />
              Deserves <span>the Best.</span>
            </h2>

            <p className="home-about-description">
              At Sunetra Eye Care, we believe that good vision plays
              an important role in everyday life. We aim to make your
              eye-care experience comfortable with helpful services,
              quality spectacles and friendly guidance.
            </p>

            <div className="home-about-checks">
              <div>
                <CheckCircle2 size={19} />
                <span>Eye-care service guidance</span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>Spectacle styles and options</span>
              </div>

              <div>
                <CheckCircle2 size={19} />
                <span>Doctor consultation referrals</span>
              </div>
            </div>

            <Link to="/about" className="home-dark-button">
              Discover Our Story
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="home-care-section">
        <div className="container">
          <div className="home-section-top">
            <div className="home-section-label">
              <span></span>
              THE SUNETRA EXPERIENCE
              <span></span>
            </div>

            <h2 className="home-section-title">
              A Caring Approach to
              <br />
              <span>Your Eye Care</span>
            </h2>

            <p className="home-section-description">
              We want every visit to feel welcoming, comfortable and
              focused on your needs.
            </p>
          </div>

          <div className="home-care-grid">
            {careFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article className="home-care-card" key={feature.title}>
                  <span className="home-care-number">
                    0{index + 1}
                  </span>

                  <div className="home-care-icon">
                    <Icon size={27} />
                  </div>

                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>

                  <div className="home-care-card-line"></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= EYE CARE TIPS SECTION ================= */}

      <section className="home-eye-tips-section">
        <div className="container">
          <div className="home-section-top">
            <div className="home-section-label">
              <span></span>
              SIMPLE HABITS, HEALTHIER EYES
              <span></span>
            </div>

            <h2 className="home-section-title">
              Take Care of Your Eyes,
              <br />
              <span>Every Single Day.</span>
            </h2>

            <p className="home-section-description">
              Small everyday habits can make a difference. Explore
              these simple tips to support your eye-care routine.
            </p>
          </div>

          <div className="home-eye-tips-grid">
            {eyeCareTips.map((tip) => {
              const Icon = tip.icon;

              return (
                <article className="home-eye-tip-card" key={tip.number}>
                  <div className="home-eye-tip-top">
                    <span className="home-eye-tip-icon">
                      <Icon size={25} />
                    </span>

                    <span className="home-eye-tip-number">
                      {tip.number}
                    </span>
                  </div>

                  <span className="home-eye-tip-tag">
                    {tip.tag}
                  </span>

                  <h3>{tip.title}</h3>

                  <p>{tip.description}</p>

                  <div className="home-eye-tip-line"></div>
                </article>
              );
            })}
          </div>

          <div className="home-eye-tips-note">
            <Eye size={19} />
            <p>
              If you experience persistent eye discomfort or changes
              in vision, consult a qualified eye-care professional.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}

      <section className="home-faq-section">
        <div className="container home-faq-layout">
          <div className="home-faq-intro">
            <div className="home-section-label home-section-label-left">
              <span></span>
              NEED SOME HELP?
            </div>

            <h2>
              Frequently Asked
              <br />
              <span>Questions</span>
            </h2>

            <p>
              Find answers to common questions about our eye-care
              services, spectacles and appointments.
            </p>

            <div className="home-faq-help">
              <span className="home-faq-help-icon">
                <CircleHelp size={23} />
              </span>

              <div>
                <strong>Still have questions?</strong>
                <span>We are happy to help you.</span>
                <Link to="/contact">
                  Contact Us <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          <div className="home-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;

              return (
                <article
                  className={`home-faq-item ${isOpen ? "active" : ""}`}
                  key={faq.question}
                >
                  <button
                    type="button"
                    className="home-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="home-faq-number">
                      0{index + 1}
                    </span>

                    <span className="home-faq-question-text">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={20}
                      className="home-faq-chevron"
                    />
                  </button>

                  {isOpen && (
                    <div className="home-faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= APPOINTMENT CTA ================= */}

      <section className="home-appointment-section">
        <div className="container">
          <div className="home-appointment-card">
            <div className="home-appointment-decoration"></div>

            <div className="home-appointment-content">
              <div className="home-appointment-label">
                <Clock3 size={16} />
                YOUR VISION DESERVES ATTENTION
              </div>

              <h2>
                Take the First Step
                <br />
                Towards <span>Better Vision.</span>
              </h2>

              <p>
                Have questions or want to visit us? Get in touch with
                Sunetra Eye Care for enquiries and appointments.
              </p>

              <div className="home-appointment-actions">
                <Link
                  to="/appointment"
                  className="home-gold-button"
                >
                  <CalendarDays size={18} />
                  Book an Appointment
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/contact"
                  className="home-appointment-contact"
                >
                  Contact Us
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </div>

            <div className="home-appointment-visual">
              <img
                src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=85"
                alt="Modern eyeglasses"
                loading="lazy"
              />
            </div>

            <div className="home-appointment-ring"></div>
          </div>
        </div>
      </section>
    </main>
  );
}