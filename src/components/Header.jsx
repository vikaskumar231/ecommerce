import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

export const Header = ({
  currentView,
  onNavigate,
  onOpenCart,
  onOpenLogin,
  searchQuery,
  onSearchChange,
  onSelectCategory
}) => {
  const { cart, wishlist, currentUser, logout } = useStore();
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="site-header" id="siteHeader">
      <div className="container nav-container">
        {/* Brand Logo */}
        <a
          href="#home"
          className="brand-logo-wrap"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("home");
          }}
        >
          <div className="brand-logo-gem">
            <span className="gem-english">A</span>
            <span className="gem-hindi">आ</span>
          </div>
          <div className="brand-title-wrap">
            <span className="brand-title">
              Art <span className="brand-hindi">आलय</span>
            </span>
            <span className="brand-tagline">Artisan Resin Studio</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="nav-links">
          <a
            href="#home"
            className={`nav-link ${currentView === "home" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); onNavigate("home"); }}
          >
            Home
          </a>
          <a
            href="#catalog"
            className={`nav-link ${currentView === "catalog" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); onNavigate("catalog"); }}
          >
            Catalog
          </a>
          <a
            href="#bespoke"
            className={`nav-link ${currentView === "bespoke" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); onNavigate("bespoke"); }}
          >
            Customize your design
          </a>
          <a
            href="#tracking"
            className={`nav-link ${currentView === "tracking" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); onNavigate("tracking"); }}
          >
            Order Tracking
          </a>
          <a
            href="#account"
            className={`nav-link ${currentView === "account" ? "active" : ""}`}
            onClick={(e) => { e.preventDefault(); onNavigate("account"); }}
          >
            Account
          </a>
        </nav>

        {/* Header Actions: Search, Wishlist, Cart, User Chip, Admin Mode */}
        <div className="header-actions">
          {/* Search Bar */}
          <div className="header-search-wrap">
            <span className="header-search-icon">🔍</span>
            <input
              type="text"
              id="headerSearchInput"
              className="header-search-input"
              placeholder="Search clocks, earrings, coasters..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentView !== "catalog") {
                  onNavigate("catalog");
                }
              }}
            />
          </div>

          {/* Wishlist Button */}
          <button
            className="action-btn"
            title="Saved Wishlist"
            onClick={() => onNavigate("account", "wishlist")}
          >
            <span>♥</span>
            <span className="action-counter" id="headerWishlistCount">
              {wishlist.length}
            </span>
          </button>

          {/* Cart Toggle */}
          <button
            className="action-btn"
            id="cartToggleBtn"
            title="Shopping Cart"
            onClick={onOpenCart}
          >
            <span>🛍️</span>
            <span className="action-counter" id="headerCartCount">
              {totalCartCount}
            </span>
          </button>

          {/* User Account / Login & Logout Controls */}
          {currentUser ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <div
                className="header-user-chip"
                id="headerUserChip"
                onClick={() => onNavigate("account")}
                title={`Logged in as ${currentUser.name}${currentUser.isAdmin ? " (Admin)" : ""}`}
                style={{ cursor: "pointer" }}
              >
                <div className="header-user-avatar" id="headerUserAvatar">
                  {currentUser.avatar || "👤"}
                </div>
                <span className="header-user-label" id="headerUserLabel">
                  {currentUser.name.split(" ")[0]}
                </span>
                {currentUser.isAdmin && (
                  <span
                    style={{
                      fontSize: "0.65rem",
                      padding: "2px 6px",
                      background: "var(--color-gold)",
                      color: "var(--color-bg)",
                      borderRadius: "4px",
                      fontWeight: 700,
                      letterSpacing: "0.03em"
                    }}
                  >
                    ADMIN
                  </span>
                )}
              </div>

              {/* Explicit Header Logout Option */}
              <button
                className="btn btn-sm"
                id="headerLogoutBtn"
                onClick={() => {
                  logout();
                  onNavigate("home");
                }}
                title="Sign Out / Logout"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "5px 10px",
                  fontSize: "0.78rem",
                  borderRadius: "var(--radius-pill)",
                  cursor: "pointer",
                  background: "rgba(255, 255, 255, 0.12)",
                  border: "1px solid rgba(255, 255, 255, 0.28)",
                  color: "#ffffff",
                  fontWeight: 600
                }}
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              className="btn btn-outline-gold btn-sm"
              id="headerLoginBtn"
              onClick={onOpenLogin}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                fontSize: "0.85rem",
                borderRadius: "var(--radius-pill)",
                cursor: "pointer"
              }}
            >
              <span>👤</span>
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
