import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

export const LoginModal = ({ isOpen, onClose, onNavigate }) => {
  const { login, register } = useStore();
  const [activeTab, setActiveTab] = useState("login"); // 'login' or 'register'
  
  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Registration questions state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Please enter both User ID and Password.");
      return;
    }
    setErrorMsg("");
    setIsSubmitting(true);
    const res = await login(username, password);
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setErrorMsg("");
      onClose();
      if (onNavigate) onNavigate("home");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!regName.trim()) {
      setErrorMsg("Question 1: Please enter your Full Name.");
      return;
    }

    const emailVal = regEmail.trim();
    if (!emailVal || !emailVal.includes("@") || !emailVal.includes(".")) {
      setErrorMsg("Question 2: Please enter a valid Email ID (e.g. name@example.com).");
      return;
    }

    const rawDigits = regPhone.replace(/\D/g, "");
    if (!regPhone.trim() || rawDigits.length < 10) {
      setErrorMsg("Question 3: Please enter a valid 10-digit Mobile / WhatsApp Phone Number.");
      return;
    }

    if (!regUsername.trim()) {
      setErrorMsg("Question 4: Please choose a unique User ID.");
      return;
    }

    if (!regPassword.trim() || regPassword.length < 3) {
      setErrorMsg("Question 5: Please create a password of at least 3 characters.");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);
    const res = await register({
      name: regName.trim(),
      email: emailVal,
      phone: regPhone.trim(),
      username: regUsername.trim(),
      password: regPassword.trim()
    });
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      setErrorMsg("");
      onClose();
      if (onNavigate) onNavigate("home");
    }
  };

  return (
    <div className="modal-overlay active" onClick={onClose}>
      <div className="modal-card" style={{ maxWidth: "500px" }} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.3rem" }}>👤</span>
            <h3 className="modal-title font-serif" style={{ margin: 0 }}>
              Art Alay Customer Portal
            </h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* Tab Switcher */}
        <div className="login-modal-tabs">
          <button
            type="button"
            className={`login-tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => { setActiveTab("login"); setErrorMsg(""); }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`login-tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => { setActiveTab("register"); setErrorMsg(""); }}
          >
            New User Registration
          </button>
        </div>

        <div style={{ padding: "1.5rem" }}>
          {errorMsg && (
            <div style={{
              background: "#fef2f2",
              color: "#b91c1c",
              border: "1px solid #fecaca",
              padding: "0.6rem 0.8rem",
              borderRadius: "var(--radius-sm)",
              fontSize: "0.825rem",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem"
            }}>
              <span>⚠️</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === "login" ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group" style={{ marginBottom: "1rem" }}>
                <label className="form-label" style={{ fontWeight: 600 }}>User ID / Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter User ID (e.g. Vikas or Meenu)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                  <label className="form-label" style={{ fontWeight: 600, margin: 0 }}>Password</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ background: "none", border: "none", color: "var(--color-primary)", fontSize: "0.75rem", cursor: "pointer", padding: 0 }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", padding: "0.8rem" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <div style={{ marginTop: "1.25rem", textAlign: "center", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => { setActiveTab("register"); setErrorMsg(""); }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--color-primary)",
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "underline",
                    padding: 0
                  }}
                >
                  Register here
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group" style={{ marginBottom: "0.85rem" }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                  1. What is your Full Name? *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Meenu Sharma"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "0.85rem" }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                  2. What is your Email ID? *
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@example.com (for invoices & curing updates)"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "0.85rem" }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                  3. What is your Mobile / WhatsApp Phone Number? *
                </label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+91 98765 43210 (for dispatch tracking)"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "0.85rem" }}>
                <label className="form-label" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                  4. Choose your User ID / Username *
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. priyasharma (used to log in)"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                  <label className="form-label" style={{ fontWeight: 600, margin: 0, fontSize: "0.85rem" }}>
                    5. Create a Password *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    style={{ background: "none", border: "none", color: "var(--color-primary)", fontSize: "0.75rem", cursor: "pointer", padding: 0 }}
                  >
                    {showRegPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  type={showRegPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Choose a secure password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%", padding: "0.8rem" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Complete Registration & Sign In"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
