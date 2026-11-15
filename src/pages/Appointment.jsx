
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
  CheckCircle2,
  Eye,
  ShieldCheck,
  Heart,
} from "lucide-react";

import "../styles/Appointment.css";

const API_URL = "http://https://sunetra-eye-care-backend.onrender.com/api/appointments";
const SERVICES_API = "http://https://sunetra-eye-care-backend.onrender.com/api/services";

const initialFormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

export default function Appointment() {
  const [formData, setFormData] = useState(initialFormData);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState("");

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [appointmentId, setAppointmentId] = useState(null);

  const today = new Date();

  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        setServicesError("");

        const response = await fetch(SERVICES_API);

        if (!response.ok) {
          throw new Error("Unable to load available services.");
        }

        const data = await response.json();

        const activeServices = data.filter(
          (service) => service.active === true
        );

        setServices(activeServices);

        setFormData((previous) => ({
          ...previous,
          service:
            activeServices.length > 0
              ? activeServices[0].name
              : "",
        }));
      } catch (error) {
        console.error("Services loading error:", error);
        setServicesError(
          error.message || "Unable to load services. Please try again."
        );
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedValue =
      name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;

    setFormData((previous) => ({
      ...previous,
      [name]: updatedValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSubmitError("");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (
      !formData.service ||
      !services.some((service) => service.name === formData.service)
    ) {
      newErrors.service = "Please select an available service.";
    }

    if (!formData.date) {
      newErrors.date = "Please select your preferred date.";
    } else if (formData.date < localToday) {
      newErrors.date = "Please select today or a future date.";
    }

    if (!formData.time) {
      newErrors.time = "Please select your preferred time.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const appointmentData = {
      customerName: formData.name.trim(),
      phoneNumber: formData.phone,
      email: formData.email.trim() || null,
      appointmentDate: formData.date,
      appointmentTime: formData.time,
      serviceType: formData.service,
      message: formData.message.trim(),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const responseText = await response.text();

      let responseData = {};

      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
        } catch {
          responseData = {};
        }
      }

      if (!response.ok) {
        const errorMessage =
          responseData.message ||
          responseData.error ||
          "Unable to submit your appointment. Please try again.";

        throw new Error(errorMessage);
      }

      const message = `
Hello Sunetra Eye Care,

I have submitted an appointment request through your website.

Name: ${formData.name.trim()}
Phone: ${formData.phone}
Email: ${formData.email.trim() || "Not provided"}
Service: ${formData.service}
Preferred Date: ${formData.date}
Preferred Time: ${formData.time}
Message: ${formData.message.trim() || "Not provided"}

Please review my appointment request.
      `.trim();

      const url = `https://wa.me/?text=${encodeURIComponent(message)}`;

      setWhatsappUrl(url);
      setAppointmentId(responseData.id || null);
      setSubmitted(true);
    } catch (error) {
      console.error("Appointment submission error:", error);

      setSubmitError(
        error.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewRequest = () => {
    setFormData({
      ...initialFormData,
      service: services.length > 0 ? services[0].name : "",
    });

    setErrors({});
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError("");
    setWhatsappUrl("");
    setAppointmentId(null);
  };

  return (
    <main className="appointment-page">
      {/* HERO SECTION */}
      <section className="appointment-hero">
        <div className="container appointment-hero-inner">
          <div className="appointment-hero-content">
            <span className="appointment-eyebrow">
              <span></span>
              YOUR VISION, OUR PRIORITY
            </span>

            <h1>
              Your Journey to
              <span> Better Vision Starts Here.</span>
            </h1>

            <p>
              Take a step towards healthier vision. Request an appointment
              with Sunetra Eye Care and let us assist you with your
              eye-care needs.
            </p>

            <div className="appointment-hero-actions">
              <a href="#appointment-form" className="appointment-gold-button">
                Request Appointment
                <ArrowRight size={18} />
              </a>

              <Link to="/services" className="appointment-outline-button">
                Explore Our Services
              </Link>
            </div>

            <div className="appointment-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <strong>Appointment</strong>
            </div>
          </div>

          <div className="appointment-hero-visual">
            <div className="appointment-hero-accent"></div>

            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=90"
              alt="Eye care professional providing patient care"
              className="appointment-hero-image"
            />

            <div className="appointment-hero-badge">
              <div className="appointment-badge-icon">
                <Eye size={25} />
              </div>
              <div>
                <strong>Care for Your Eyes</strong>
                <span>Every vision deserves attention</span>
              </div>
            </div>

            <div className="appointment-hero-decoration"></div>
          </div>
        </div>
      </section>

      {/* APPOINTMENT CONTENT */}
      <section className="appointment-section">
        <div className="container appointment-layout">
          {/* LEFT INFORMATION */}
          <div className="appointment-info">
            <span className="appointment-eyebrow">
              <span></span>
              EASY APPOINTMENT REQUEST
            </span>

            <h2>
              Let's Take Care
              <span> of Your Vision.</span>
            </h2>

            <p className="appointment-info-description">
              Tell us a little about your requirements and preferred
              schedule. Our team can assist you with the next steps.
            </p>

            <div className="appointment-benefits">
              <div className="appointment-benefit">
                <div className="appointment-benefit-icon">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h3>Simple Appointment Request</h3>
                  <p>Share your details through an easy form.</p>
                </div>
              </div>

              <div className="appointment-benefit">
                <div className="appointment-benefit-icon">
                  <Heart size={22} />
                </div>
                <div>
                  <h3>Personal Assistance</h3>
                  <p>Get guidance for your eye-care enquiries.</p>
                </div>
              </div>

              <div className="appointment-benefit">
                <div className="appointment-benefit-icon">
                  <Clock size={22} />
                </div>
                <div>
                  <h3>Your Preferred Schedule</h3>
                  <p>Choose a date and time that suits you.</p>
                </div>
              </div>
            </div>

            <div className="appointment-assurance">
              <div className="appointment-assurance-icon">
                <ShieldCheck size={27} />
              </div>
              <div>
                <strong>Your Vision, Our Priority</strong>
                <span>
                  Thoughtful assistance for your eye-care journey.
                </span>
              </div>
            </div>
          </div>

          {/* APPOINTMENT FORM / SUCCESS SCREEN */}
          <div className="appointment-form-card" id="appointment-form">
            {!submitted ? (
              <>
                <div className="appointment-form-heading">
                  <div className="appointment-form-icon">
                    <CalendarDays size={25} />
                  </div>

                  <div>
                    <span>BOOK YOUR VISIT</span>
                    <h2>Appointment Request</h2>
                    <p>Please provide your details below.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="appointment-fields">
                    <div className="appointment-field">
                      <label htmlFor="appointment-name">Full Name *</label>
                      <div className="appointment-input">
                        <User size={18} />
                        <input
                          id="appointment-name"
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          autoComplete="name"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={
                            errors.name ? "appointment-name-error" : undefined
                          }
                        />
                      </div>
                      {errors.name && (
                        <span
                          className="appointment-error"
                          id="appointment-name-error"
                        >
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="appointment-field">
                      <label htmlFor="appointment-phone">Phone Number *</label>
                      <div className="appointment-input">
                        <Phone size={18} />
                        <input
                          id="appointment-phone"
                          type="tel"
                          name="phone"
                          placeholder="Enter 10-digit phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          inputMode="numeric"
                          autoComplete="tel"
                          maxLength={10}
                          aria-invalid={Boolean(errors.phone)}
                          aria-describedby={
                            errors.phone
                              ? "appointment-phone-error"
                              : undefined
                          }
                        />
                      </div>
                      {errors.phone && (
                        <span
                          className="appointment-error"
                          id="appointment-phone-error"
                        >
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    <div className="appointment-field">
                      <label htmlFor="appointment-email">Email Address</label>
                      <div className="appointment-input">
                        <Mail size={18} />
                        <input
                          id="appointment-email"
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleChange}
                          autoComplete="email"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={
                            errors.email
                              ? "appointment-email-error"
                              : undefined
                          }
                        />
                      </div>
                      {errors.email && (
                        <span
                          className="appointment-error"
                          id="appointment-email-error"
                        >
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className="appointment-field">
                      <label htmlFor="appointment-service">Select Service *</label>

                      <select
                        id="appointment-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.service)}
                        disabled={servicesLoading || services.length === 0}
                      >
                        {servicesLoading && (
                          <option value="">Loading services...</option>
                        )}

                        {!servicesLoading && services.length === 0 && (
                          <option value="">No services available</option>
                        )}

                        {services.map((service) => (
                          <option key={service.id} value={service.name}>
                            {service.name}
                          </option>
                        ))}
                      </select>

                      {servicesError && (
                        <span className="appointment-error">
                          {servicesError}
                        </span>
                      )}

                      {errors.service && (
                        <span className="appointment-error">
                          {errors.service}
                        </span>
                      )}
                    </div>

                    <div className="appointment-field">
                      <label htmlFor="appointment-date">Preferred Date *</label>
                      <div className="appointment-input">
                        <CalendarDays size={18} />
                        <input
                          id="appointment-date"
                          type="date"
                          name="date"
                          min={localToday}
                          value={formData.date}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.date)}
                          aria-describedby={
                            errors.date ? "appointment-date-error" : undefined
                          }
                        />
                      </div>
                      {errors.date && (
                        <span
                          className="appointment-error"
                          id="appointment-date-error"
                        >
                          {errors.date}
                        </span>
                      )}
                    </div>

                    <div className="appointment-field">
                      <label htmlFor="appointment-time">Preferred Time *</label>
                      <div className="appointment-input">
                        <Clock size={18} />
                        <input
                          id="appointment-time"
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          aria-invalid={Boolean(errors.time)}
                          aria-describedby={
                            errors.time ? "appointment-time-error" : undefined
                          }
                        />
                      </div>
                      {errors.time && (
                        <span
                          className="appointment-error"
                          id="appointment-time-error"
                        >
                          {errors.time}
                        </span>
                      )}
                    </div>

                    <div className="appointment-field full-width">
                      <label htmlFor="appointment-message">
                        Additional Message
                      </label>
                      <div className="appointment-input textarea-input">
                        <MessageSquare size={18} />
                        <textarea
                          id="appointment-message"
                          name="message"
                          placeholder="Tell us about your requirements..."
                          rows="4"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <p className="appointment-error" role="alert">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="appointment-submit"
                    disabled={submitting || servicesLoading || services.length === 0}
                  >
                    {submitting
                      ? "Submitting Your Request..."
                      : "Submit Appointment Request"}
                    {!submitting && <ArrowRight size={19} />}
                  </button>

                  <p className="appointment-note">
                    Your appointment request will be saved in our system.
                    You can also share the details through WhatsApp.
                  </p>
                </form>
              </>
            ) : (
              <div className="appointment-success">
                <div className="appointment-success-icon">
                  <CheckCircle2 size={48} />
                </div>

                <span className="appointment-success-kicker">
                  REQUEST SAVED SUCCESSFULLY
                </span>

                <h2>Thank You, {formData.name.trim()}!</h2>

                <p>
                  Your appointment request has been submitted successfully.
                  Our team can review your request and assist you with the
                  next steps.
                </p>

                {appointmentId && (
                  <p>
                    Appointment ID: <strong>#{appointmentId}</strong>
                  </p>
                )}

                <div className="appointment-success-details">
                  <div>
                    <span>Selected Service</span>
                    <strong>{formData.service}</strong>
                  </div>
                  <div>
                    <span>Preferred Date</span>
                    <strong>{formData.date}</strong>
                  </div>
                  <div>
                    <span>Preferred Time</span>
                    <strong>{formData.time}</strong>
                  </div>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="appointment-submit appointment-success-whatsapp"
                >
                  Share Details on WhatsApp
                  <ArrowRight size={19} />
                </a>

                <p className="appointment-note">
                  Your request is saved, but your appointment is not confirmed
                  until the clinic responds.
                </p>

                <button
                  type="button"
                  className="appointment-new-request"
                  onClick={handleNewRequest}
                >
                  Make Another Request
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BOTTOM TRUST SECTION */}
      <section className="appointment-bottom">
        <div className="container appointment-bottom-inner">
          <div className="appointment-bottom-icon">
            <Eye size={30} />
          </div>

          <div>
            <span>SUNETRA EYE CARE</span>
            <h2>Because Every Detail of Your Vision Matters.</h2>
            <p>
              We're here to help you take the next step towards better eye care.
            </p>
          </div>

          <Link to="/contact" className="appointment-bottom-button">
            Contact Us
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}