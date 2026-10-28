import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

export const LoginView = ({ onNavigate }) => {
  const { login, register, currentUser, logout, backendStatus } = useStore();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  // Sign in state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Registration Questions State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regPincode, setRegPincode] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e) => {
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
      setErrorMsg(res.message || "Invalid credentials.");
    } else {
      onNavigate("home");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate Question 1: Name
    if (!regName.trim()) {
      setErrorMsg("Question 1: Please enter your Full Name.");
      return;
    }

    // Validate Question 2: Email ID
    const emailVal = regEmail.trim();
    if (!emailVal || !emailVal.includes("@") || !emailVal.includes(".")) {
      setErrorMsg("Question 2: Please enter a valid Email ID (e.g. name@example.com).");
      return;
    }

    // Validate Question 3: Phone Number
    const rawDigits = regPhone.replace(/\D/g, "");
    if (!regPhone.trim() || rawDigits.length < 10) {
      setErrorMsg("Question 3: Please enter a valid 10-digit Mobile / WhatsApp Phone Number.");
      return;
    }

    // Validate Question 4: User ID
    if (!regUsername.trim()) {
      setErrorMsg("Question 4: Please choose a unique User ID to log in with.");
      return;
    }

    // Validate Question 5: Password
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
      password: regPassword.trim(),
      city: regCity.trim(),
      pincode: regPincode.trim()
    });
    setIsSubmitting(false);

    if (!res.success) {
      setErrorMsg(res.message || "Registration failed.");
    } else {
      onNavigate("home");
    }
  };

  // If already logged in, show current session status & clear logout option
  if (currentUser) {
    return (
      <div className="container" style={{ padding: "4rem 1rem", maxWidth: "560px" }}>
        <div style={{
          background: "#ffffff",
          borderRadius: "var(--radius-lg)",
          padding: "2.5rem 2rem",
          boxShadow: "var(--shadow-md)",
          border: "1px solid var(--color-border)",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
            {currentUser.avatar || "👤"}
          </div>
          <h2 className="font-serif" style={{ color: "var(--color-primary-dark)", margin: "0.25rem 0" }}>
            Currently Signed In
          </h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
            Welcome, <strong>{currentUser.name}</strong> (User ID: <code>{currentUser.username}</code>)
          </p>
          <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", marginBottom: "1.25rem" }}>
            Email: {currentUser.email || "Not specified"} • Phone: {currentUser.phone || "Not specified"}
          </div>
          
          <div style={{ marginBottom: "1.5rem" }}>
            {currentUser.isAdmin ? (
              <span style={{
                background: "var(--color-gold)",
                color: "#1a2a26",
                padding: "4px 12px",
                borderRadius: "12px",
                fontWeight: 700,
                fontSize: "0.8rem"
              }}>
                ⭐ Atelier Administrator
              </span>
            ) : (
              <span style={{
                background: "rgba(0,0,0,0.06)",
                color: "var(--color-text-muted)",
                padding: "4px 12px",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "0.8rem"
              }}>
                Customer Account
              </span>
            )}
          </div>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={() => onNavigate("account")}>
              Go to My Account
            </button>
            {currentUser.isAdmin && (
              <button className="btn btn-outline-gold" onClick={() => onNavigate("admin")}>
                Artisan Admin Console
              </button>
            )}
            <button
              className="btn btn-secondary"
              id="viewLogoutBtn"
              onClick={() => {
                logout();
                onNavigate("home");
              }}
              style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              <span>🚪</span>
              <span>Sign Out / Logout</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: "3.5rem 1rem", maxWidth: "560px" }}>
      {/* Return to Store */}
      <button
        type="button"
        onClick={() => onNavigate("home")}
        style={{
          background: "none",
          border: "none",
          color: "var(--color-text-muted)",
          cursor: "pointer",
          fontSize: "0.85rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          marginBottom: "1.25rem",
          padding: 0
        }}
      >
        <span>←</span>
        <span>Return to Home</span>
      </button>

      <div style={{
        background: "#ffffff",
        borderRadius: "var(--radius-lg)",
        padding: "2.5rem 2rem",
        boxShadow: "var(--shadow-md)",
        border: "1px solid var(--color-border)"
      }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div className="brand-logo-gem" style={{ width: "48px", height: "48px", margin: "0 auto 0.75rem" }}>
            <span className="gem-english" style={{ fontSize: "1.1rem" }}>A</span>
            <span className="gem-hindi" style={{ fontSize: "0.85rem" }}>आ</span>
          </div>
          <h1 className="font-serif" style={{ color: "var(--color-primary-dark)", fontSize: "1.75rem", margin: "0 0 0.35rem 0" }}>
            {isRegisterMode ? "New Customer Registration" : "Sign In to Art Alay"}
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", margin: 0 }}>
            {isRegisterMode
              ? "Answer basic questions to create your customer account"
              : "Enter your User ID and password to access your account"}
          </p>
        </div>

        {/* Mode switcher tabs */}
        <div className="login-modal-tabs" style={{ marginBottom: "1.5rem" }}>
          <button
            type="button"
            className={`login-tab-btn ${!isRegisterMode ? "active" : ""}`}
            onClick={() => { setIsRegisterMode(false); setErrorMsg(""); }}
          >
            Existing User Sign In
          </button>
          <button
            type="button"
            className={`login-tab-btn ${isRegisterMode ? "active" : ""}`}
            onClick={() => { setIsRegisterMode(true); setErrorMsg(""); }}
          >
            New User Registration
          </button>
        </div>

        {/* Error message banner */}
        {errorMsg && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fecaca",
            color: "#b91c1c",
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.85rem",
            marginBottom: "1.25rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.5rem"
          }}>
            <span style={{ fontSize: "1rem", lineHeight: 1 }}>⚠️</span>
            <div style={{ flex: 1 }}>{errorMsg}</div>
          </div>
        )}

        {/* 1. SIGN IN FORM */}
        {!isRegisterMode ? (
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: "1.2rem" }}>
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

            <div className="form-group" style={{ marginBottom: "1.5rem" }}>
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
              className="btn btn-primary btn-lg"
              style={{ width: "100%", padding: "0.85rem", fontSize: "0.95rem" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>

            <div style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
              Don't have an account yet?{" "}
              <button
                type="button"
                onClick={() => { setIsRegisterMode(true); setErrorMsg(""); }}
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
          /* 2. REGISTRATION FACILITY FOR NEW USERS */
          <form onSubmit={handleRegister}>
            {/* Question 1: Full Name */}
            <div className="form-group" style={{ marginBottom: "1.1rem" }}>
              <label className="form-label" style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ background: "var(--color-gold)", color: "#1a2a26", borderRadius: "50%", width: "20px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700 }}>1</span>
                <span>What is your Full Name? *</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Meenu Sharma or Rohan Verma"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                autoFocus
                required
              />
            </div>

            {/* Question 2: Email ID */}
            <div className="form-group" style={{ marginBottom: "1.1rem" }}>
              <label className="form-label" style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ background: "var(--color-gold)", color: "#1a2a26", borderRadius: "50%", width: "20px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700 }}>2</span>
                <span>What is your Email ID? *</span>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="e.g. name@example.com (for order invoices & resin progress)"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
              <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: "2px", display: "block" }}>
                We send order confirmations and resin curing milestone updates to this email.
              </span>
            </div>

            {/* Question 3: Phone Number */}
            <div className="form-group" style={{ marginBottom: "1.1rem" }}>
              <label className="form-label" style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ background: "var(--color-gold)", color: "#1a2a26", borderRadius: "50%", width: "20px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700 }}>3</span>
                <span>What is your Mobile / WhatsApp Phone Number? *</span>
              </label>
              <input
                type="tel"
                className="form-control"
                placeholder="e.g. +91 98765 43210 (for dispatch & courier coordination)"
                value={regPhone}
                onChange={(e) => setRegPhone(e.target.value)}
                required
              />
              <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: "2px", display: "block" }}>
                Used for dispatch notifications and courier doorstep delivery verification.
              </span>
            </div>

            {/* Question 4: User ID */}
            <div className="form-group" style={{ marginBottom: "1.1rem" }}>
              <label className="form-label" style={{ fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ background: "var(--color-gold)", color: "#1a2a26", borderRadius: "50%", width: "20px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700 }}>4</span>
                <span>Choose your User ID / Username *</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. priya_art (you will use this ID to sign in)"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
              />
            </div>

            {/* Question 5: Password */}
            <div className="form-group" style={{ marginBottom: "1.1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.25rem" }}>
                <label className="form-label" style={{ fontWeight: 600, margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ background: "var(--color-gold)", color: "#1a2a26", borderRadius: "50%", width: "20px", height: "20px", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700 }}>5</span>
                  <span>Create a Password *</span>
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
                placeholder="Choose a password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>

            {/* Optional Delivery City & Pincode */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: "0.8rem" }}>City (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Pune"
                  value={regCity}
                  onChange={(e) => setRegCity(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontSize: "0.8rem" }}>Pincode (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 411045"
                  value={regPincode}
                  onChange={(e) => setRegPincode(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: "100%", padding: "0.85rem", fontSize: "0.95rem" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Complete Registration & Sign In"}
            </button>

            <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
              Already registered?{" "}
              <button
                type="button"
                onClick={() => { setIsRegisterMode(false); setErrorMsg(""); }}
                style={{ background: "none", border: "none", color: "var(--color-primary)", fontWeight: 600, cursor: "pointer", textDecoration: "underline", padding: 0 }}
              >
                Sign In with existing User ID
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
