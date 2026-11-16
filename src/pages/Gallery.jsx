
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Images,
  Eye,
  Camera,
  Sparkles,
} from "lucide-react";

import "../styles/Gallery.css";

const GALLERY_API = "https://sunetra-eye-care-backend.onrender.com/api/gallery";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(GALLERY_API);

        if (!response.ok) {
          throw new Error("Unable to load gallery images.");
        }

        const data = await response.json();
        setGalleryImages(data);
      } catch (err) {
        console.error("Gallery loading error:", err);
        setError("Unable to load gallery images. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <main className="gallery-page">
      {/* HERO SECTION */}
      <section className="gallery-hero">
        <div className="container gallery-hero-inner">
          <div className="gallery-hero-content">
            <span className="gallery-eyebrow">
              <Images size={16} />
              OUR VISUAL COLLECTION
            </span>

            <h1>
              A Glimpse Into
              <span> Our World</span>
            </h1>

            <p>
              Explore our eyewear collection and discover
              styles that bring clarity, comfort and
              confidence to your everyday life.
            </p>

            <div className="gallery-hero-actions">
              <Link to="/appointment" className="gallery-gold-button">
                Book an Appointment
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="gallery-breadcrumb">
              <Link to="/">Home</Link>
              <span>/</span>
              <span>Gallery</span>
            </div>
          </div>

          <div className="gallery-hero-visual">
            <div className="gallery-hero-image-accent"></div>

            <img
              src="https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=90"
              alt="Premium eyewear collection"
            />

            <div className="gallery-hero-badge">
              <Sparkles size={23} />
              <div>
                <strong>Style Meets Vision</strong>
                <span>Discover your perfect look</span>
              </div>
            </div>
          </div>

          <div className="gallery-hero-decoration"></div>
        </div>
      </section>

      {/* GALLERY INTRO */}
      <section className="gallery-intro section">
        <div className="container">
          <div className="gallery-section-heading">
            <span>A GLIMPSE OF SUNETRA EYE CARE</span>

            <h2>
              Discover Our World of
              <span> Eyewear</span>
            </h2>

            <p>
              From timeless classics to modern designs,
              explore eyewear styles that complement
              your personality and everyday needs.
            </p>
          </div>

          {/* DATABASE GALLERY */}
          {loading ? (
            <p className="gallery-status-message">
              Loading gallery images...
            </p>
          ) : error ? (
            <p className="gallery-status-message gallery-error">
              {error}
            </p>
          ) : galleryImages.length === 0 ? (
            <p className="gallery-status-message">
              Gallery images will be available here soon.
            </p>
          ) : (
            <div className="gallery-grid">
              {galleryImages.map((item, index) => (
                <article
                  className={`gallery-card gallery-card-${(index % 6) + 1}`}
                  key={item.id}
                >
                  <div className="gallery-image-wrapper">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                    />

                    <div className="gallery-image-overlay">
                      <span className="gallery-category">
                        {item.category}
                      </span>

                      <h3>{item.title}</h3>

                      <span className="gallery-view-link">
                        Explore Collection
                        <ArrowRight size={16} />
                      </span>
                    </div>

                    <span className="gallery-image-icon">
                      <Camera size={19} />
                    </span>

                    <span className="gallery-image-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="gallery-bottom-note">
            <Eye size={20} />
            <p>
              The right eyewear is more than an accessory.
              It is a part of your everyday confidence.
            </p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="gallery-cta">
        <div className="container gallery-cta-inner">
          <div className="gallery-cta-icon">
            <Eye size={38} />
          </div>

          <div className="gallery-cta-content">
            <span>YOUR VISION MATTERS</span>

            <h2>
              Find the Perfect Eyewear for You
            </h2>

            <p>
              Explore our eye-care services and request
              an appointment with us.
            </p>
          </div>

          <Link
            to="/appointment"
            className="gallery-cta-button"
          >
            Book Appointment
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}