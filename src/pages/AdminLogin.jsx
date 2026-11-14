
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  User,
  ArrowRight,
} from "lucide-react";

import "../styles/AdminLogin.css";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.password) {
      setError("Please enter your username and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:8080/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username.trim(),
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid username or password."
        );
      }

      if (!data.token) {
        throw new Error("Login token was not received.");
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem(
        "adminUsername",
        data.username || formData.username
      );

      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Admin login error:", err);

      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-container">

        <div className="admin-login-brand">
          <div className="admin-login-logo">
            <LockKeyhole size={32} />
          </div>

          <span>SUNETRA EYE CARE</span>

          <h1>Admin Login</h1>

          <p>
            Sign in to manage your eye-care website.
          </p>
        </div>

        <div className="admin-login-card">
          <form onSubmit={handleSubmit}>

            <div className="admin-login-field">
              <label htmlFor="admin-username">
                Username
              </label>

              <div className="admin-login-input">
                <User size={19} />

                <input
                  id="admin-username"
                  type="text"
                  name="username"
                  placeholder="Enter admin username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className="admin-login-field">
              <label htmlFor="admin-password">
                Password
              </label>

              <div className="admin-login-input">
                <LockKeyhole size={19} />

                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="admin-login-password-toggle"
                  onClick={() =>
                    setShowPassword((previous) => !previous)
                  }
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="admin-login-error" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="admin-login-submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In to Dashboard"}

              {!loading && <ArrowRight size={19} />}
            </button>

          </form>

          <p className="admin-login-security-note">
            Authorized personnel only. Your login is protected.
          </p>
        </div>

      </div>
    </main>
  );
}