
import { MessageCircle } from "lucide-react";
import "../styles/WhatsAppButton.css";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hello Sunetra Eye Care, I would like to enquire about your eye-care services."
  );

  return (
    <a
      href={`https://wa.me/?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-button"
      aria-label="Contact Sunetra Eye Care on WhatsApp"
    >
      <MessageCircle size={23} />
      <span>Chat with Us</span>
    </a>
  );
}