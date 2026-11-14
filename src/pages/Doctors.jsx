import { Link } from "react-router-dom";

import {
  ArrowRight,
  GraduationCap,
  BriefcaseBusiness,
  Eye,
  Heart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "../styles/Doctors.css";

const doctors = [
  {
    name: "Dr. Arjun Kumar",
    qualification: "MBBS, MS (Ophthalmology)",
    experience: "8 Years",
    specialization: "Eye Specialist",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&auto=format&fit=crop",
    gender: "Male",
    number: "01",
  },
  {
    name: "Dr. Rahul Sharma",
    qualification: "MBBS, DO",
    experience: "6 Years",
    specialization: "Eye Care Specialist",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=700&auto=format&fit=crop",
    gender: "Male",
    number: "02",
  },
  {
    name: "Dr. Priya Reddy",
    qualification: "MBBS, MS (Ophthalmology)",
    experience: "5 Years",
    specialization: "Ophthalmologist",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=700&auto=format&fit=crop",
    gender: "Female",
    number: "03",
  },
];

const values = [
  {
    icon: Heart,
    title: "Patient-Centred Care",
    description:
      "We believe every individual deserves attention, respect and friendly assistance.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Guidance",
    description:
      "We aim to help visitors understand their eye-care options and next steps.",
  },
  {
    icon: Eye,
    title: "Focus on Vision",
    description:
      "Our goal is to make eye-care information and services easier to access.",
  },
];

export default function Doctors() {
  return (
    <main className="doctors-page">

      {/* HERO SECTION */}
      <section className="doctors-hero">
        <div className="container doctors-hero-inner">

          <div className="doctors-hero-content">
            <div className="doctors-eyebrow">
              <span />
              OUR MEDICAL TEAM
              <span />
            </div>

            <h1>
              Meet Our
              <span>Doctors</span>
            </h1>

            <p>
              Dedicated professionals committed to supporting
              your vision and eye-care needs.
            </p>

            <div className="doctors-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <strong>Our Doctors</strong>
            </div>
          </div>

          <div className="doctors-hero-visual">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop"
              alt="Medical professionals providing eye care"
            />

            <div className="doctors-hero-image-accent" />

            <div className="doctors-hero-badge">
              <div>
                <Eye size={25} />
              </div>
              <span>
                <strong>Your Vision</strong>
                <small>Our Priority</small>
              </span>
            </div>

            <div className="doctors-hero-decoration">
              <Sparkles size={24} />
            </div>
          </div>

        </div>
      </section>

      {/* DOCTORS SECTION */}
      <section className="doctors-team-section">
        <div className="container">

          <div className="doctors-section-heading">
            <div className="doctors-eyebrow">
              <span />
              EXPERT EYE CARE
              <span />
            </div>

            <h2>
              Our Professional <span>Team</span>
            </h2>

            <p>
              Get to know the team behind our commitment to
              better vision and eye care.
            </p>
          </div>

          <div className="doctors-grid">
            {doctors.map((doctor) => (
              <article className="doctor-card" key={doctor.name}>

                <div className="doctor-image-wrap">
                  <img
                    src={doctor.image}
                    alt={`Demo portrait of ${doctor.gender} doctor`}
                    loading="lazy"
                  />

                  <span className="doctor-image-number">
                    {doctor.number}
                  </span>

                  <span className="doctor-image-icon">
                    <Eye size={23} />
                  </span>
                </div>

                <div className="doctor-details">

                  <span className="doctor-specialization">
                    {doctor.specialization}
                  </span>

                  <h3>{doctor.name}</h3>

                  <div className="doctor-info">
                    <div className="doctor-info-icon">
                      <GraduationCap size={19} />
                    </div>

                    <div>
                      <small>Qualification</small>
                      <p>{doctor.qualification}</p>
                    </div>
                  </div>

                  <div className="doctor-info">
                    <div className="doctor-info-icon">
                      <BriefcaseBusiness size={18} />
                    </div>

                    <div>
                      <small>Experience</small>
                      <p>{doctor.experience}</p>
                    </div>
                  </div>

                  <Link
                    to="/appointment"
                    className="doctor-card-link"
                  >
                    Request Appointment
                    <ArrowRight size={17} />
                  </Link>

                </div>

                <div className="doctor-card-line" />
              </article>
            ))}
          </div>

          <p className="doctors-demo-note">
            Demo profiles for website design.
          </p>

        </div>
      </section>

      {/* OUR VALUES */}
      <section className="doctors-values">
        <div className="container">

          <div className="doctors-section-heading">
            <div className="doctors-eyebrow">
              <span />
              OUR COMMITMENT
              <span />
            </div>

            <h2>
              Care That Begins With <span>Trust</span>
            </h2>

            <p>
              We want every visitor to feel comfortable
              and informed about their eye-care needs.
            </p>
          </div>

          <div className="doctors-values-grid">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article className="doctors-value-card" key={value.title}>
                  <div className="doctors-value-icon">
                    <Icon size={29} strokeWidth={1.6} />
                  </div>

                  <h3>{value.title}</h3>

                  <p>{value.description}</p>

                  <div className="doctors-value-line" />
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="doctors-cta">
        <div className="container doctors-cta-inner">

          <div className="doctors-cta-content">
            <span className="doctors-cta-eyebrow">
              YOUR VISION MATTERS
            </span>

            <h2>
              Give Your Eyes the
              <strong>Care They Deserve</strong>
            </h2>

            <p>
              Take the next step towards better eye care.
              Request an appointment with us.
            </p>
          </div>

          <Link to="/appointment" className="doctors-button">
            Book Appointment
            <ArrowRight size={19} />
          </Link>

        </div>
      </section>

    </main>
  );
}