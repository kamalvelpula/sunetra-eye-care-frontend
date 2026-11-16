
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  CalendarDays,
  Users,
  Clock,
  RefreshCw,
  LogOut,
  Trash2,
  CheckCircle,
  Eye,
  AlertCircle,
  Mail,
  MessageSquare,
  Phone,
  User,
  ArrowLeft,
  Plus,
  Pencil,
  X,
  BriefcaseBusiness,
  Power,
  Images,
} from "lucide-react";

import "../styles/AdminDashboard.css";

const APPOINTMENTS_API = "https://sunetra-eye-care-backend.onrender.com/api/appointments";
const CONTACT_API = "https://sunetra-eye-care-backend.onrender.com/api/contact";
const SERVICES_API = "https://sunetra-eye-care-backend.onrender.com/api/services";
const GALLERY_API = "https://sunetra-eye-care-backend.onrender.com/api/gallery";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("appointments");

  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [services, setServices] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);

  const [error, setError] = useState("");
  const [messagesError, setMessagesError] = useState("");
  const [servicesError, setServicesError] = useState("");
  const [galleryError, setGalleryError] = useState("");

  const [updatingId, setUpdatingId] = useState(null);
  const [updatingMessageId, setUpdatingMessageId] = useState(null);
  const [deletingMessageId, setDeletingMessageId] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const [showServiceForm, setShowServiceForm] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [savingService, setSavingService] = useState(false);
  const [deletingServiceId, setDeletingServiceId] = useState(null);
  const [updatingServiceId, setUpdatingServiceId] = useState(null);

  const [serviceForm, setServiceForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    active: true,
  });

  const [showGalleryForm, setShowGalleryForm] = useState(false);
  const [editingGalleryId, setEditingGalleryId] = useState(null);
  const [savingGallery, setSavingGallery] = useState(false);
  const [deletingGalleryId, setDeletingGalleryId] = useState(null);
  const [updatingGalleryId, setUpdatingGalleryId] = useState(null);

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "",
    imageUrl: "",
    active: true,
  });

  const username = localStorage.getItem("adminUsername") || "Admin";

  const getHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  });

  const handleUnauthorized = (response) => {
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUsername");
      navigate("/admin/login");
      return true;
    }

    return false;
  };

  // Fetch Appointments
  const fetchAppointments = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(APPOINTMENTS_API, {
        method: "GET",
        headers: getHeaders(),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to load appointments.");
      }

      const data = await response.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Appointments error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Contact Messages
  const fetchMessages = async () => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
      return;
    }

    setMessagesLoading(true);
    setMessagesError("");

    try {
      const response = await fetch(CONTACT_API, {
        method: "GET",
        headers: getHeaders(),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to load contact messages.");
      }

      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Contact messages error:", err);
      setMessagesError(err.message || "Something went wrong.");
    } finally {
      setMessagesLoading(false);
    }
  };

  // Fetch Services
  const fetchServices = async () => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
      return;
    }

    setServicesLoading(true);
    setServicesError("");

    try {
      const response = await fetch(SERVICES_API, {
        method: "GET",
        headers: getHeaders(),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to load services.");
      }

      const data = await response.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Services error:", err);
      setServicesError(err.message || "Something went wrong.");
    } finally {
      setServicesLoading(false);
    }
  };

  // Fetch Gallery Images
  const fetchGallery = async () => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
      return;
    }

    setGalleryLoading(true);
    setGalleryError("");

    try {
      const response = await fetch(`${GALLERY_API}/admin`, {
        method: "GET",
        headers: getHeaders(),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to load gallery images.");
      }

      const data = await response.json();
      setGalleryImages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Gallery error:", err);
      setGalleryError(err.message || "Something went wrong.");
    } finally {
      setGalleryLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchMessages();
    fetchServices();
    fetchGallery();
  }, []);

  // Update Appointment Status
  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    setError("");

    try {
      const response = await fetch(
        `${APPOINTMENTS_API}/${id}/status?status=${encodeURIComponent(status)}`,
        {
          method: "PUT",
          headers: getHeaders(),
        }
      );

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to update appointment status.");
      }

      await fetchAppointments();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete Appointment
  const deleteAppointment = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) return;

    setError("");

    try {
      const response = await fetch(`${APPOINTMENTS_API}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to delete appointment.");
      }

      setAppointments((previous) =>
        previous.filter((appointment) => appointment.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Update Contact Message Status
  const updateMessageStatus = async (id, status) => {
    setUpdatingMessageId(id);
    setMessagesError("");

    try {
      const response = await fetch(
        `${CONTACT_API}/${id}/status?status=${encodeURIComponent(status)}`,
        {
          method: "PUT",
          headers: getHeaders(),
        }
      );

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to update message status.");
      }

      const updatedMessage = await response.json();

      setMessages((previous) =>
        previous.map((message) =>
          message.id === id ? updatedMessage : message
        )
      );

      setSelectedMessage((previous) =>
        previous?.id === id ? updatedMessage : previous
      );
    } catch (err) {
      console.error("Update message status error:", err);
      setMessagesError(err.message || "Unable to update message status.");
    } finally {
      setUpdatingMessageId(null);
    }
  };

  // Delete Contact Message
  const deleteMessage = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact message?"
    );

    if (!confirmed) return;

    setDeletingMessageId(id);
    setMessagesError("");

    try {
      const response = await fetch(`${CONTACT_API}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to delete contact message.");
      }

      setMessages((previous) =>
        previous.filter((message) => message.id !== id)
      );

      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error("Delete message error:", err);
      setMessagesError(err.message || "Unable to delete message.");
    } finally {
      setDeletingMessageId(null);
    }
  };

  // Reset Service Form
  const resetServiceForm = () => {
    setServiceForm({
      name: "",
      description: "",
      imageUrl: "",
      active: true,
    });

    setEditingServiceId(null);
    setShowServiceForm(false);
  };

  // Open Add Service Form
  const openAddServiceForm = () => {
    setServiceForm({
      name: "",
      description: "",
      imageUrl: "",
      active: true,
    });

    setEditingServiceId(null);
    setShowServiceForm(true);
    setServicesError("");
  };

  // Open Edit Service Form
  const openEditServiceForm = (service) => {
    setServiceForm({
      name: service.name || "",
      description: service.description || "",
      imageUrl: service.imageUrl || "",
      active: service.active ?? true,
    });

    setEditingServiceId(service.id);
    setShowServiceForm(true);
    setServicesError("");
  };

  // Handle Service Input Changes
  const handleServiceInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setServiceForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add or Update Service
  const saveService = async (e) => {
    e.preventDefault();

    if (!serviceForm.name.trim() || !serviceForm.description.trim()) {
      setServicesError("Please enter service name and description.");
      return;
    }

    setSavingService(true);
    setServicesError("");

    try {
      const isEditing = editingServiceId !== null;

      const url = isEditing
        ? `${SERVICES_API}/${editingServiceId}`
        : SERVICES_API;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          name: serviceForm.name.trim(),
          description: serviceForm.description.trim(),
          imageUrl: serviceForm.imageUrl.trim(),
          active: serviceForm.active,
        }),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error(
          isEditing
            ? "Unable to update service."
            : "Unable to add service."
        );
      }

      const savedService = await response.json();

      if (isEditing) {
        setServices((previous) =>
          previous.map((service) =>
            service.id === editingServiceId ? savedService : service
          )
        );
      } else {
        setServices((previous) => [...previous, savedService]);
      }

      resetServiceForm();
    } catch (err) {
      console.error("Save service error:", err);
      setServicesError(err.message || "Unable to save service.");
    } finally {
      setSavingService(false);
    }
  };

  // Activate / Deactivate Service
  const toggleServiceStatus = async (service) => {
    setUpdatingServiceId(service.id);
    setServicesError("");

    try {
      const response = await fetch(`${SERVICES_API}/${service.id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          name: service.name,
          description: service.description,
          imageUrl: service.imageUrl || "",
          active: !service.active,
        }),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to update service status.");
      }

      const updatedService = await response.json();

      setServices((previous) =>
        previous.map((item) =>
          item.id === service.id ? updatedService : item
        )
      );
    } catch (err) {
      console.error("Toggle service error:", err);
      setServicesError(err.message || "Unable to update service status.");
    } finally {
      setUpdatingServiceId(null);
    }
  };

  // Delete Service
  const deleteService = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    setDeletingServiceId(id);
    setServicesError("");

    try {
      const response = await fetch(`${SERVICES_API}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to delete service.");
      }

      setServices((previous) =>
        previous.filter((service) => service.id !== id)
      );
    } catch (err) {
      console.error("Delete service error:", err);
      setServicesError(err.message || "Unable to delete service.");
    } finally {
      setDeletingServiceId(null);
    }
  };

  // Reset Gallery Form
  const resetGalleryForm = () => {
    setGalleryForm({
      title: "",
      category: "",
      imageUrl: "",
      active: true,
    });

    setEditingGalleryId(null);
    setShowGalleryForm(false);
  };

  // Open Add Gallery Form
  const openAddGalleryForm = () => {
    setGalleryForm({
      title: "",
      category: "",
      imageUrl: "",
      active: true,
    });

    setEditingGalleryId(null);
    setShowGalleryForm(true);
    setGalleryError("");
  };

  // Open Edit Gallery Form
  const openEditGalleryForm = (item) => {
    setGalleryForm({
      title: item.title || "",
      category: item.category || "",
      imageUrl: item.imageUrl || "",
      active: item.active ?? true,
    });

    setEditingGalleryId(item.id);
    setShowGalleryForm(true);
    setGalleryError("");
  };

  // Handle Gallery Form Changes
  const handleGalleryInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setGalleryForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add or Update Gallery Image
  const saveGalleryImage = async (e) => {
    e.preventDefault();

    if (
      !galleryForm.title.trim() ||
      !galleryForm.category.trim() ||
      !galleryForm.imageUrl.trim()
    ) {
      setGalleryError("Please enter title, category and image URL.");
      return;
    }

    setSavingGallery(true);
    setGalleryError("");

    try {
      const isEditing = editingGalleryId !== null;

      const url = isEditing
        ? `${GALLERY_API}/${editingGalleryId}`
        : GALLERY_API;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: getHeaders(),
        body: JSON.stringify({
          title: galleryForm.title.trim(),
          category: galleryForm.category.trim(),
          imageUrl: galleryForm.imageUrl.trim(),
          active: galleryForm.active,
        }),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error(
          isEditing
            ? "Unable to update gallery image."
            : "Unable to add gallery image."
        );
      }

      const savedImage = await response.json();

      if (isEditing) {
        setGalleryImages((previous) =>
          previous.map((item) =>
            item.id === editingGalleryId ? savedImage : item
          )
        );
      } else {
        setGalleryImages((previous) => [...previous, savedImage]);
      }

      resetGalleryForm();
    } catch (err) {
      console.error("Save gallery image error:", err);
      setGalleryError(err.message || "Unable to save gallery image.");
    } finally {
      setSavingGallery(false);
    }
  };

  // Activate / Deactivate Gallery Image
  const toggleGalleryStatus = async (item) => {
    setUpdatingGalleryId(item.id);
    setGalleryError("");

    try {
      const response = await fetch(`${GALLERY_API}/${item.id}`, {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify({
          title: item.title,
          category: item.category,
          imageUrl: item.imageUrl,
          active: !item.active,
        }),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to update gallery image status.");
      }

      const updatedImage = await response.json();

      setGalleryImages((previous) =>
        previous.map((image) =>
          image.id === item.id ? updatedImage : image
        )
      );
    } catch (err) {
      console.error("Toggle gallery status error:", err);
      setGalleryError(err.message || "Unable to update image status.");
    } finally {
      setUpdatingGalleryId(null);
    }
  };

  // Delete Gallery Image
  const deleteGalleryImage = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery image?"
    );

    if (!confirmed) return;

    setDeletingGalleryId(id);
    setGalleryError("");

    try {
      const response = await fetch(`${GALLERY_API}/${id}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (handleUnauthorized(response)) return;

      if (!response.ok) {
        throw new Error("Unable to delete gallery image.");
      }

      setGalleryImages((previous) =>
        previous.filter((item) => item.id !== id)
      );

      if (editingGalleryId === id) {
        resetGalleryForm();
      }
    } catch (err) {
      console.error("Delete gallery image error:", err);
      setGalleryError(err.message || "Unable to delete gallery image.");
    } finally {
      setDeletingGalleryId(null);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    navigate("/admin/login");
  };

  // Appointment Status Styling
  const getStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return "status-confirmed";
      case "CANCELLED":
        return "status-cancelled";
      case "COMPLETED":
        return "status-completed";
      default:
        return "status-pending";
    }
  };

  // Contact Message Status Styling
  const getMessageStatusClass = (status) => {
    switch (status?.toUpperCase()) {
      case "READ":
        return "status-confirmed";
      case "REPLIED":
        return "status-completed";
      default:
        return "status-pending";
    }
  };

  // Date Formatting
  const formatDate = (date) => {
    if (!date) return "-";

    const parsed = new Date(`${date}T00:00:00`);

    return Number.isNaN(parsed.getTime())
      ? date
      : parsed.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  const activeServices = services.filter((service) => service.active).length;
  const inactiveServices = services.length - activeServices;

  const activeGalleryImages = galleryImages.filter(
    (item) => item.active
  ).length;

  const inactiveGalleryImages =
    galleryImages.length - activeGalleryImages;

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">
            <Eye size={25} />
          </div>

          <div>
            <h2>Sunetra</h2>
            <span>Eye Care Admin</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">

          <button
            type="button"
            className={`admin-nav-item ${
              activeTab === "appointments" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("appointments");
              setSelectedMessage(null);
              resetServiceForm();
              resetGalleryForm();
            }}
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${
              activeTab === "appointments" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("appointments");
              setSelectedMessage(null);
              resetServiceForm();
              resetGalleryForm();
            }}
          >
            <CalendarDays size={19} />
            <span>Appointments</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${
              activeTab === "messages" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("messages");
              setSelectedMessage(null);
              resetServiceForm();
              resetGalleryForm();
            }}
          >
            <Mail size={19} />
            <span>Contact Messages</span>
            <span className="admin-message-count">
              {messages.length}
            </span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${
              activeTab === "services" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("services");
              setSelectedMessage(null);
              resetServiceForm();
              resetGalleryForm();
            }}
          >
            <BriefcaseBusiness size={19} />
            <span>Services</span>
          </button>

          <button
            type="button"
            className={`admin-nav-item ${
              activeTab === "gallery" ? "active" : ""
            }`}
            onClick={() => {
              setActiveTab("gallery");
              setSelectedMessage(null);
              resetServiceForm();
              resetGalleryForm();
            }}
          >
            <Images size={19} />
            <span>Gallery</span>
          </button>

        </nav>

        <button
          className="admin-logout-button"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          Logout
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-main">

        <header className="admin-topbar">
          <div>
            <h1>
              {activeTab === "messages"
                ? "Contact Messages"
                : activeTab === "services"
                ? "Services Management"
                : activeTab === "gallery"
                ? "Gallery Management"
                : "Dashboard"}
            </h1>

            <p>
              {activeTab === "messages"
                ? "Manage customer enquiries and messages."
                : activeTab === "services"
                ? "Add, edit and manage your eye-care services."
                : activeTab === "gallery"
                ? "Manage images displayed in your website gallery."
                : "Manage your eye-care appointments."}
            </p>
          </div>

          <div className="admin-profile">
            <div className="admin-profile-avatar">
              {username.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{username}</strong>
              <span>Administrator</span>
            </div>
          </div>
        </header>

        {/* APPOINTMENTS TAB */}
        {activeTab === "appointments" && (
          <>
            <section className="admin-welcome">
              <div>
                <span>WELCOME BACK</span>
                <h2>Hello, {username}!</h2>
                <p>
                  Here's an overview of your appointment bookings.
                </p>
              </div>

              <button
                className="admin-refresh-button"
                onClick={fetchAppointments}
                disabled={loading}
              >
                <RefreshCw
                  size={17}
                  className={loading ? "admin-spinning" : ""}
                />
                Refresh
              </button>
            </section>

            <section className="admin-stats">

              <div className="admin-stat-card">
                <div className="admin-stat-icon green">
                  <CalendarDays size={23} />
                </div>
                <div>
                  <span>Total Appointments</span>
                  <h3>{appointments.length}</h3>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon gold">
                  <Clock size={23} />
                </div>
                <div>
                  <span>Pending</span>
                  <h3>
                    {
                      appointments.filter(
                        (a) => a.status?.toUpperCase() === "PENDING"
                      ).length
                    }
                  </h3>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon blue">
                  <CheckCircle size={23} />
                </div>
                <div>
                  <span>Confirmed</span>
                  <h3>
                    {
                      appointments.filter(
                        (a) => a.status?.toUpperCase() === "CONFIRMED"
                      ).length
                    }
                  </h3>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon purple">
                  <Users size={23} />
                </div>
                <div>
                  <span>Contact Messages</span>
                  <h3>{messages.length}</h3>
                </div>
              </div>

            </section>

            <section className="admin-appointments-section">

              <div className="admin-section-heading">
                <div>
                  <h2>Recent Appointments</h2>
                  <p>View and manage customer bookings.</p>
                </div>
              </div>

              {error && (
                <div className="admin-error-message">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              {loading ? (
                <div className="admin-loading">
                  <RefreshCw
                    size={25}
                    className="admin-spinning"
                  />
                  <p>Loading appointments...</p>
                </div>
              ) : appointments.length === 0 ? (
                <div className="admin-empty-state">
                  <CalendarDays size={42} />
                  <h3>No Appointments Yet</h3>
                  <p>New customer bookings will appear here.</p>
                </div>
              ) : (
                <div className="admin-table-wrapper">
                  <table className="admin-appointments-table">

                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Contact</th>
                        <th>Service</th>
                        <th>Date & Time</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                          <td>#{appointment.id}</td>

                          <td>
                            <strong>
                              {appointment.customerName || "-"}
                            </strong>
                          </td>

                          <td>
                            <div className="admin-contact-details">
                              <span>
                                {appointment.phoneNumber || "-"}
                              </span>
                              <small>
                                {appointment.email || "-"}
                              </small>
                            </div>
                          </td>

                          <td>{appointment.serviceType || "-"}</td>

                          <td>
                            <div className="admin-date-details">
                              <span>
                                {formatDate(appointment.appointmentDate)}
                              </span>
                              <small>
                                {appointment.appointmentTime || "-"}
                              </small>
                            </div>
                          </td>

                          <td>
                            <span
                              className={`admin-status ${getStatusClass(
                                appointment.status
                              )}`}
                            >
                              {appointment.status || "PENDING"}
                            </span>
                          </td>

                          <td>
                            <div className="admin-action-buttons">
                              <select
                                value={appointment.status || "PENDING"}
                                onChange={(e) =>
                                  updateStatus(
                                    appointment.id,
                                    e.target.value
                                  )
                                }
                                disabled={updatingId === appointment.id}
                              >
                                <option value="PENDING">Pending</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                              </select>

                              <button
                                className="admin-delete-button"
                                onClick={() =>
                                  deleteAppointment(appointment.id)
                                }
                                title="Delete appointment"
                              >
                                <Trash2 size={17} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>
              )}

            </section>
          </>
        )}

        {/* CONTACT MESSAGES TAB */}
        {activeTab === "messages" && (
          <section className="admin-appointments-section">

            <div className="admin-section-heading">
              <div>
                <h2>
                  {selectedMessage
                    ? "Message Details"
                    : "Customer Messages"}
                </h2>
                <p>
                  {selectedMessage
                    ? "View the complete customer enquiry."
                    : "All messages submitted through the contact form."}
                </p>
              </div>

              <button
                className="admin-refresh-button"
                onClick={fetchMessages}
                disabled={messagesLoading}
              >
                <RefreshCw
                  size={17}
                  className={messagesLoading ? "admin-spinning" : ""}
                />
                Refresh
              </button>
            </div>

            {messagesError && (
              <div className="admin-error-message">
                <AlertCircle size={18} />
                {messagesError}
              </div>
            )}

            {selectedMessage ? (
              <div className="admin-message-details">

                <button
                  className="admin-refresh-button"
                  onClick={() => setSelectedMessage(null)}
                >
                  <ArrowLeft size={17} />
                  Back to Messages
                </button>

                <div className="admin-message-detail-card">

                  <div className="admin-message-detail-heading">
                    <div className="admin-stat-icon green">
                      <MessageSquare size={23} />
                    </div>

                    <div>
                      <span>Message ID #{selectedMessage.id}</span>
                      <h2>
                        {selectedMessage.subject || "No Subject"}
                      </h2>
                    </div>
                  </div>

                  <div className="admin-message-info">
                    <p>
                      <User size={18} />
                      <strong>Name:</strong>
                      {selectedMessage.name || "-"}
                    </p>

                    <p>
                      <Mail size={18} />
                      <strong>Email:</strong>
                      {selectedMessage.email || "-"}
                    </p>

                    <p>
                      <Phone size={18} />
                      <strong>Phone:</strong>
                      {selectedMessage.phoneNumber || "-"}
                    </p>
                  </div>

                  <div className="admin-message-body">
                    <h3>Customer Message</h3>
                    <p>{selectedMessage.message || "-"}</p>
                  </div>

                  <div className="admin-message-status-control">
                    <label htmlFor="detail-message-status">
                      Message Status
                    </label>

                    <select
                      id="detail-message-status"
                      value={selectedMessage.status || "NEW"}
                      onChange={(e) =>
                        updateMessageStatus(
                          selectedMessage.id,
                          e.target.value
                        )
                      }
                      disabled={
                        updatingMessageId === selectedMessage.id
                      }
                    >
                      <option value="NEW">New</option>
                      <option value="READ">Read</option>
                      <option value="REPLIED">Replied</option>
                    </select>

                    {updatingMessageId === selectedMessage.id && (
                      <small>Updating status...</small>
                    )}
                  </div>

                  <button
                    className="admin-delete-button admin-message-delete"
                    onClick={() => deleteMessage(selectedMessage.id)}
                    disabled={deletingMessageId === selectedMessage.id}
                  >
                    <Trash2 size={17} />
                    {deletingMessageId === selectedMessage.id
                      ? "Deleting..."
                      : "Delete Message"}
                  </button>

                </div>
              </div>
            ) : messagesLoading ? (
              <div className="admin-loading">
                <RefreshCw
                  size={25}
                  className="admin-spinning"
                />
                <p>Loading contact messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="admin-empty-state">
                <Mail size={42} />
                <h3>No Contact Messages Yet</h3>
                <p>Customer enquiries will appear here.</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-appointments-table">

                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Subject</th>
                      <th>Status</th>
                      <th>Message</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {messages.map((message) => (
                      <tr key={message.id}>
                        <td>#{message.id}</td>

                        <td>
                          <strong>{message.name || "-"}</strong>
                        </td>

                        <td>{message.email || "-"}</td>
                        <td>{message.phoneNumber || "-"}</td>
                        <td>{message.subject || "-"}</td>

                        <td>
                          <span
                            className={`admin-status ${getMessageStatusClass(
                              message.status
                            )}`}
                          >
                            {message.status || "NEW"}
                          </span>
                        </td>

                        <td className="admin-message-preview">
                          {message.message || "-"}
                        </td>

                        <td>
                          <div className="admin-action-buttons">

                            <button
                              className="admin-view-button"
                              onClick={() => setSelectedMessage(message)}
                              title="View message"
                            >
                              <Eye size={17} />
                              View
                            </button>

                            <button
                              className="admin-delete-button"
                              onClick={() => deleteMessage(message.id)}
                              disabled={deletingMessageId === message.id}
                              title="Delete message"
                            >
                              <Trash2 size={17} />
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            )}

          </section>
        )}

        {/* SERVICES MANAGEMENT TAB */}
        {activeTab === "services" && (
          <section className="admin-appointments-section">

            <div className="admin-section-heading">
              <div>
                <h2>Manage Services</h2>
                <p>Add and manage services offered by your eye-care clinic.</p>
              </div>

              <div className="admin-action-buttons">
                <button
                  className="admin-refresh-button"
                  onClick={fetchServices}
                  disabled={servicesLoading}
                >
                  <RefreshCw
                    size={17}
                    className={servicesLoading ? "admin-spinning" : ""}
                  />
                  Refresh
                </button>

                <button
                  className="admin-view-button"
                  onClick={openAddServiceForm}
                >
                  <Plus size={18} />
                  Add Service
                </button>
              </div>
            </div>

            <section className="admin-stats">

              <div className="admin-stat-card">
                <div className="admin-stat-icon green">
                  <BriefcaseBusiness size={23} />
                </div>
                <div>
                  <span>Total Services</span>
                  <h3>{services.length}</h3>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon blue">
                  <CheckCircle size={23} />
                </div>
                <div>
                  <span>Active Services</span>
                  <h3>{activeServices}</h3>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon gold">
                  <Power size={23} />
                </div>
                <div>
                  <span>Inactive Services</span>
                  <h3>{inactiveServices}</h3>
                </div>
              </div>

            </section>

            {servicesError && (
              <div className="admin-error-message">
                <AlertCircle size={18} />
                {servicesError}
              </div>
            )}

            {/* ADD / EDIT SERVICE FORM */}
            {showServiceForm && (
              <div className="admin-message-detail-card admin-service-form-card">

                <div className="admin-section-heading">
                  <div>
                    <h2>
                      {editingServiceId
                        ? "Edit Service"
                        : "Add New Service"}
                    </h2>
                    <p>Enter the service information below.</p>
                  </div>

                  <button
                    className="admin-delete-button"
                    onClick={resetServiceForm}
                    type="button"
                    title="Close form"
                  >
                    <X size={19} />
                  </button>
                </div>

                <form onSubmit={saveService} className="admin-service-form">

                  <div className="admin-service-form-field">
                    <label htmlFor="service-name">Service Name *</label>
                    <input
                      id="service-name"
                      type="text"
                      name="name"
                      placeholder="Example: Eye Checkup"
                      value={serviceForm.name}
                      onChange={handleServiceInputChange}
                      required
                    />
                  </div>

                  <div className="admin-service-form-field">
                    <label htmlFor="service-description">Description *</label>
                    <textarea
                      id="service-description"
                      name="description"
                      placeholder="Enter service description..."
                      value={serviceForm.description}
                      onChange={handleServiceInputChange}
                      rows="4"
                      required
                    />
                  </div>

                  <div className="admin-service-form-field">
                    <label htmlFor="service-image">Image URL</label>
                    <input
                      id="service-image"
                      type="text"
                      name="imageUrl"
                      placeholder="Enter image URL (optional)"
                      value={serviceForm.imageUrl}
                      onChange={handleServiceInputChange}
                    />
                  </div>

                  <label className="admin-service-active-checkbox">
                    <input
                      type="checkbox"
                      name="active"
                      checked={serviceForm.active}
                      onChange={handleServiceInputChange}
                    />
                    <span>Active Service</span>
                  </label>

                  <div className="admin-action-buttons">
                    <button
                      type="submit"
                      className="admin-view-button"
                      disabled={savingService}
                    >
                      {savingService ? (
                        <>
                          <RefreshCw size={17} className="admin-spinning" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={17} />
                          {editingServiceId ? "Update Service" : "Save Service"}
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="admin-refresh-button"
                      onClick={resetServiceForm}
                      disabled={savingService}
                    >
                      Cancel
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* SERVICES LIST */}
            {servicesLoading ? (
              <div className="admin-loading">
                <RefreshCw size={25} className="admin-spinning" />
                <p>Loading services...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="admin-empty-state">
                <BriefcaseBusiness size={42} />
                <h3>No Services Found</h3>
                <p>Click Add Service to create your first service.</p>
              </div>
            ) : (
              <div className="admin-services-grid">

                {services.map((service) => (
                  <article className="admin-service-card" key={service.id}>

                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="admin-service-image"
                      />
                    ) : (
                      <div className="admin-service-image-placeholder">
                        <Eye size={35} />
                      </div>
                    )}

                    <div className="admin-service-card-content">

                      <div className="admin-service-card-heading">
                        <h3>{service.name}</h3>

                        <span
                          className={`admin-status ${
                            service.active
                              ? "status-confirmed"
                              : "status-cancelled"
                          }`}
                        >
                          {service.active ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </div>

                      <p>{service.description}</p>

                      <div className="admin-service-card-actions">

                        <button
                          className="admin-view-button"
                          onClick={() => openEditServiceForm(service)}
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          className="admin-refresh-button"
                          onClick={() => toggleServiceStatus(service)}
                          disabled={updatingServiceId === service.id}
                        >
                          <Power size={16} />
                          {updatingServiceId === service.id
                            ? "Updating..."
                            : service.active
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        <button
                          className="admin-delete-button"
                          onClick={() => deleteService(service.id)}
                          disabled={deletingServiceId === service.id}
                          title="Delete service"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </div>
                  </article>
                ))}

              </div>
            )}

          </section>
        )}

        {/* GALLERY MANAGEMENT TAB */}
        {activeTab === "gallery" && (
          <section className="admin-appointments-section">

            <div className="admin-section-heading">
              <div>
                <h2>Manage Gallery</h2>
                <p>Add and manage images displayed on your website.</p>
              </div>

              <div className="admin-action-buttons">
                <button
                  className="admin-refresh-button"
                  onClick={fetchGallery}
                  disabled={galleryLoading}
                >
                  <RefreshCw
                    size={17}
                    className={galleryLoading ? "admin-spinning" : ""}
                  />
                  Refresh
                </button>

                <button
                  className="admin-view-button"
                  onClick={openAddGalleryForm}
                >
                  <Plus size={18} />
                  Add Image
                </button>
              </div>
            </div>

            {/* GALLERY STATISTICS */}
            <section className="admin-stats">

              <div className="admin-stat-card">
                <div className="admin-stat-icon green">
                  <Images size={23} />
                </div>
                <div>
                  <span>Total Images</span>
                  <h3>{galleryImages.length}</h3>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon blue">
                  <CheckCircle size={23} />
                </div>
                <div>
                  <span>Active Images</span>
                  <h3>{activeGalleryImages}</h3>
                </div>
              </div>

              <div className="admin-stat-card">
                <div className="admin-stat-icon gold">
                  <Power size={23} />
                </div>
                <div>
                  <span>Inactive Images</span>
                  <h3>{inactiveGalleryImages}</h3>
                </div>
              </div>

            </section>

            {galleryError && (
              <div className="admin-error-message">
                <AlertCircle size={18} />
                {galleryError}
              </div>
            )}

            {/* ADD / EDIT GALLERY FORM */}
            {showGalleryForm && (
              <div className="admin-message-detail-card admin-gallery-form-card">

                <div className="admin-section-heading">
                  <div>
                    <h2>
                      {editingGalleryId ? "Edit Gallery Image" : "Add New Gallery Image"}
                    </h2>
                    <p>Enter the image details below.</p>
                  </div>

                  <button
                    className="admin-delete-button"
                    onClick={resetGalleryForm}
                    type="button"
                    title="Close form"
                  >
                    <X size={19} />
                  </button>
                </div>

                <form onSubmit={saveGalleryImage} className="admin-service-form">

                  <div className="admin-service-form-field">
                    <label htmlFor="gallery-title">Image Title *</label>
                    <input
                      id="gallery-title"
                      type="text"
                      name="title"
                      placeholder="Example: Modern Eyewear Collection"
                      value={galleryForm.title}
                      onChange={handleGalleryInputChange}
                      required
                    />
                  </div>

                  <div className="admin-service-form-field">
                    <label htmlFor="gallery-category">Category *</label>
                    <input
                      id="gallery-category"
                      type="text"
                      name="category"
                      placeholder="Example: Spectacles"
                      value={galleryForm.category}
                      onChange={handleGalleryInputChange}
                      required
                    />
                  </div>

                  <div className="admin-service-form-field">
                    <label htmlFor="gallery-image-url">Image URL *</label>
                    <input
                      id="gallery-image-url"
                      type="url"
                      name="imageUrl"
                      placeholder="Paste image URL here"
                      value={galleryForm.imageUrl}
                      onChange={handleGalleryInputChange}
                      required
                    />
                  </div>

                  {galleryForm.imageUrl && (
                    <div className="admin-gallery-preview">
                      <span>Image Preview</span>
                      <img
                        src={galleryForm.imageUrl}
                        alt="Gallery preview"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}

                  <label className="admin-service-active-checkbox">
                    <input
                      type="checkbox"
                      name="active"
                      checked={galleryForm.active}
                      onChange={handleGalleryInputChange}
                    />
                    <span>Active Image</span>
                  </label>

                  <div className="admin-action-buttons">
                    <button
                      type="submit"
                      className="admin-view-button"
                      disabled={savingGallery}
                    >
                      {savingGallery ? (
                        <>
                          <RefreshCw size={17} className="admin-spinning" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <CheckCircle size={17} />
                          {editingGalleryId ? "Update Image" : "Save Image"}
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="admin-refresh-button"
                      onClick={resetGalleryForm}
                      disabled={savingGallery}
                    >
                      Cancel
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* GALLERY IMAGES LIST */}
            {galleryLoading ? (
              <div className="admin-loading">
                <RefreshCw size={25} className="admin-spinning" />
                <p>Loading gallery images...</p>
              </div>
            ) : galleryImages.length === 0 ? (
              <div className="admin-empty-state">
                <Images size={42} />
                <h3>No Gallery Images Found</h3>
                <p>Click Add Image to upload your first gallery image URL.</p>
              </div>
            ) : (
              <div className="admin-services-grid admin-gallery-grid">

                {galleryImages.map((item) => (
                  <article className="admin-service-card admin-gallery-card" key={item.id}>

                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title || "Gallery image"}
                        className="admin-service-image admin-gallery-image"
                      />
                    ) : (
                      <div className="admin-service-image-placeholder">
                        <Images size={35} />
                      </div>
                    )}

                    <div className="admin-service-card-content">

                      <div className="admin-service-card-heading">
                        <h3>{item.title}</h3>

                        <span
                          className={`admin-status ${
                            item.active
                              ? "status-confirmed"
                              : "status-cancelled"
                          }`}
                        >
                          {item.active ? "ACTIVE" : "INACTIVE"}
                        </span>
                      </div>

                      <p className="admin-gallery-category">
                        Category: {item.category || "-"}
                      </p>

                      <div className="admin-service-card-actions">

                        <button
                          className="admin-view-button"
                          onClick={() => openEditGalleryForm(item)}
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          className="admin-refresh-button"
                          onClick={() => toggleGalleryStatus(item)}
                          disabled={updatingGalleryId === item.id}
                        >
                          <Power size={16} />
                          {updatingGalleryId === item.id
                            ? "Updating..."
                            : item.active
                            ? "Deactivate"
                            : "Activate"}
                        </button>

                        <button
                          className="admin-delete-button"
                          onClick={() => deleteGalleryImage(item.id)}
                          disabled={deletingGalleryId === item.id}
                          title="Delete gallery image"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </div>
                  </article>
                ))}

              </div>
            )}

          </section>
        )}

      </main>
    </div>
  );
}