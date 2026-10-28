import React, { useState } from "react";
import { StoreProvider, useStore } from "./context/StoreContext";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Header } from "./components/Header";
import { HeroBanner } from "./components/HeroBanner";
import { HomeProductsGrid } from "./components/HomeProductsGrid";
import { CatalogView } from "./components/CatalogView";
import { ProductDetailsView } from "./components/ProductDetailsView";
import { BespokeStudio } from "./components/BespokeStudio";
import { CartDrawer } from "./components/CartDrawer";
import { CheckoutView } from "./components/CheckoutView";
import { PaymentGatewayModal } from "./components/PaymentGatewayModal";
import { OrderTrackingView } from "./components/OrderTrackingView";
import { AccountView } from "./components/AccountView";
import { AdminView } from "./components/AdminView";
import { LoginModal } from "./components/LoginModal";
import { LoginView } from "./components/LoginView";
import { Toast } from "./components/Toast";

const AppContent = () => {
  const { products, currentUser } = useStore();

  const [currentView, setCurrentView] = useState("home"); // home, catalog, pdp, bespoke, tracking, checkout, account, admin
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [accountTab, setAccountTab] = useState("orders");
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [pendingCustomerDetails, setPendingCustomerDetails] = useState(null);

  const navigateTo = (view, subTab = null, orderId = null) => {
    setCurrentView(view);
    if (subTab) setAccountTab(subTab);
    if (orderId) setTrackingOrderId(orderId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentView("pdp");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
  };

  const handleTriggerPayment = (customerDetails) => {
    setPendingCustomerDetails(customerDetails);
    setIsPaymentOpen(true);
  };

  const handleOrderSuccess = (newOrderId) => {
    setTrackingOrderId(newOrderId);
    setCurrentView("tracking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="art-alay-app">
      {/* 1. Announcement Bar with Live Python Business Tier Status */}
      <AnnouncementBar
        onNavigate={navigateTo}
        onOpenDiagnostics={() => setIsDiagnosticsOpen(true)}
      />

      {/* 2. Site Header */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenLogin={() => navigateTo("login")}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Main Views Router */}
      <main className="main-content-wrapper">
        {currentView === "home" && (
          <>
            <HeroBanner onNavigate={navigateTo} />
            <HomeProductsGrid
              onSelectProduct={handleSelectProduct}
              onNavigate={navigateTo}
            />
          </>
        )}

        {currentView === "catalog" && (
          <CatalogView
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
            searchQuery={searchQuery}
            onClearSearch={() => setSearchQuery("")}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentView === "pdp" && (
          <ProductDetailsView
            product={selectedProduct || products[0] || {}}
            onNavigate={navigateTo}
            onSelectCategory={handleSelectCategory}
            onOpenCart={() => setIsCartOpen(true)}
            onCheckout={() => navigateTo("checkout")}
          />
        )}

        {currentView === "bespoke" && (
          <BespokeStudio onNavigate={navigateTo} />
        )}

        {currentView === "tracking" && (
          <OrderTrackingView
            activeOrderId={trackingOrderId}
            onNavigate={navigateTo}
          />
        )}

        {currentView === "checkout" && (
          <CheckoutView
            onNavigate={navigateTo}
            onTriggerPayment={handleTriggerPayment}
          />
        )}

        {currentView === "account" && (
          <AccountView
            initialTab={accountTab}
            onNavigate={navigateTo}
            onSelectProduct={handleSelectProduct}
            onOpenLogin={() => navigateTo("login")}
          />
        )}

        {currentView === "login" && (
          <LoginView onNavigate={navigateTo} />
        )}

        {currentView === "admin" && (
          currentUser?.isAdmin ? (
            <AdminView />
          ) : (
            <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
              <div style={{ maxWidth: "480px", margin: "0 auto", padding: "2.5rem 2rem", background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)", boxShadow: "var(--shadow-md)" }}>
                <span style={{ fontSize: "3rem" }}>🔒</span>
                <h2 className="font-serif" style={{ marginTop: "1rem", color: "var(--color-primary-dark)" }}>Artisan Admin Access Only</h2>
                <p style={{ color: "var(--color-text-muted)", margin: "1rem 0", lineHeight: 1.6 }}>
                  This console is restricted to the administrator (Vikas). Normal users and guests do not have permission to view or manage studio inventory.
                </p>
                <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                  <button className="btn btn-primary" onClick={() => navigateTo("home")}>
                    Return to Home
                  </button>
                  {!currentUser && (
                    <button className="btn btn-secondary" onClick={() => setIsLoginOpen(true)}>
                      Sign In as Admin
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </main>

      {/* 4. Luxury Brand Footer */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-col brand-col">
            <div className="brand-logo-wrap" style={{ marginBottom: "1rem" }}>
              <div className="brand-logo-gem">
                <span className="gem-english">A</span>
                <span className="gem-hindi">आ</span>
              </div>
              <div className="brand-title-wrap">
                <span className="brand-title" style={{ color: "#ffffff" }}>
                  Art <span className="brand-hindi">आलय</span>
                </span>
                <span className="brand-tagline">Artisan Resin Studio</span>
              </div>
            </div>
            <p className="footer-bio">
              Handcrafted resin atelier by <strong>Meenakshi Agrawal</strong>, Balewadi, Pune.
            </p>
            <div className="footer-social-row">
              <a
                href="https://instagram.com/meenakshiagrawal2025"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Instagram: @meenakshiagrawal2025
              </a>
              <a
                href="https://wa.me/919810012345"
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                WhatsApp: +91 98100 12345
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading font-serif">Studio Services</h4>
            <ul className="footer-links-list">
              <li>
                <a
                  href="#bespoke"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("bespoke");
                  }}
                >
                  Customize your design
                </a>
              </li>
              <li>
                <a
                  href="#catalog"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo("catalog");
                  }}
                >
                  Buy from artists creativity
                </a>
              </li>
              {currentUser?.isAdmin && (
                <li>
                  <a
                    href="#admin"
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo("admin");
                    }}
                  >
                    ⚙️ Artisan Admin Console
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading font-serif">Artisan Atelier</h4>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
              <strong>Artisan Seller:</strong> Meenakshi Agrawal<br />
              <strong>Studio Address:</strong> Balewadi, Pune, Maharashtra 411045<br />
              Atelier Support: care@artalay.in<br />
              Helpline: +91 98100 12345 (10 AM - 7 PM IST)
            </div>
          </div>
        </div>

        <div className="footer-bottom-strip">
          <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              © 2026 Art आलय (Art Alay) • Handcrafted by Meenakshi Agrawal, Balewadi, Pune 411045.
            </div>
            <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.8rem" }}>
              <span>100% Non-Toxic UV Epoxy</span>
              <span>•</span>
              <span>72-Hour Diamond Glass Cure</span>
              <span>•</span>
              <span>Pan-India Zero-Shatter Guarantee</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. Floating WhatsApp Support Button */}
      <button
        className="floating-whatsapp-widget"
        title="Chat with Master Artisan on WhatsApp"
        onClick={() => {
          const msg = "Namaste Art Alay! I would like to inquire about handcrafted resin art and custom commissions.";
          window.open(`https://wa.me/919810012345?text=${encodeURIComponent(msg)}`, "_blank");
        }}
      >
        <span style={{ fontSize: "1.6rem" }}>💬</span>
        <span className="wa-tooltip">Chat on WhatsApp</span>
      </button>

      {/* 6. Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          navigateTo("checkout");
        }}
        onNavigate={navigateTo}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onNavigate={navigateTo}
      />

      <PaymentGatewayModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        customerDetails={pendingCustomerDetails}
        onOrderSuccess={handleOrderSuccess}
      />

      <Toast />
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[Art Alay ErrorBoundary]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c1821",
          color: "#ffffff",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: "2rem",
          textAlign: "center"
        }}>
          <div style={{
            maxWidth: "500px",
            background: "rgba(255,255,255,0.05)",
            padding: "2.5rem",
            borderRadius: "16px",
            border: "1px solid rgba(212,175,55,0.3)"
          }}>
            <h2 style={{ color: "#d4af37", marginBottom: "1rem", fontFamily: "'Cinzel', serif" }}>
              Art आलय Atelier
            </h2>
            <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "1.5rem" }}>
              Something interrupted the artisan resin studio. Please refresh the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: "linear-gradient(135deg, #d4af37, #aa7c11)",
                color: "#0c1821",
                border: "none",
                padding: "0.75rem 1.75rem",
                borderRadius: "30px",
                fontWeight: "700",
                cursor: "pointer"
              }}
            >
              🔄 Refresh Studio
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </ErrorBoundary>
  );
}
