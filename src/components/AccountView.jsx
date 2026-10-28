import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "./ProductCard";

export const AccountView = ({
  initialTab = "orders",
  onNavigate,
  onSelectProduct,
  onOpenLogin
}) => {
  const {
    currentUser,
    orders,
    wishlist,
    products,
    customRequests,
    logout
  } = useStore();

  const [activeTab, setActiveTab] = useState(initialTab);

  if (!currentUser) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "5rem 1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👤</div>
        <h2 className="font-serif" style={{ color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
          Sign In to Your Art Alay Account
        </h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
          Access your handcrafted orders, track live curing progress, and view saved items.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary btn-lg" onClick={onOpenLogin}>
            Sign In / Register
          </button>
        </div>
      </div>
    );
  }

  // Filter orders for current user
  const userOrders = orders.filter(
    o => o.username && o.username.toLowerCase() === currentUser.username.toLowerCase()
  );

  // Filter bespoke requests for current user
  const userRequests = customRequests.filter(
    r => r.username && r.username.toLowerCase() === currentUser.username.toLowerCase()
  );

  // Filter wishlist products
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="account-page-layout container">
      {/* Account Sidebar */}
      <aside className="account-sidebar">
        {/* User Card */}
        <div className="account-user-card">
          <div className="account-avatar-large">
            {currentUser.avatar || currentUser.name.charAt(0)}
          </div>
          <h3 className="account-user-name font-serif">{currentUser.name}</h3>
          <div className="account-user-email">{currentUser.email}</div>
          <div className="account-user-phone">{currentUser.phone}</div>
          <div style={{ marginTop: "0.5rem" }}>
            {currentUser.isAdmin ? (
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "3px 10px",
                  background: "var(--color-gold)",
                  color: "#1a2a26",
                  borderRadius: "12px",
                  fontWeight: 700,
                  display: "inline-block"
                }}
              >
                ⭐ Atelier Administrator
              </span>
            ) : (
              <span
                style={{
                  fontSize: "0.75rem",
                  padding: "3px 10px",
                  background: "rgba(0,0,0,0.06)",
                  color: "var(--color-text-muted)",
                  borderRadius: "12px",
                  fontWeight: 600,
                  display: "inline-block"
                }}
              >
                Customer Account
              </span>
            )}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--color-gold-dark)", marginTop: "0.4rem" }}>
            Member since {currentUser.joinedDate || "October 2026"}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="account-nav-list">
          <button
            type="button"
            className={`account-nav-item ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <span>📦 My Orders ({userOrders.length})</span>
          </button>
          <button
            type="button"
            className={`account-nav-item ${activeTab === "wishlist" ? "active" : ""}`}
            onClick={() => setActiveTab("wishlist")}
          >
            <span>♥ Saved Wishlist ({wishlistProducts.length})</span>
          </button>
          <button
            type="button"
            className={`account-nav-item ${activeTab === "bespoke" ? "active" : ""}`}
            onClick={() => setActiveTab("bespoke")}
          >
            <span>🎨 Custom Quotes ({userRequests.length})</span>
          </button>
          {currentUser.isAdmin && (
            <button
              type="button"
              className="account-nav-item"
              style={{
                color: "var(--color-primary-dark)",
                background: "rgba(212, 175, 55, 0.12)",
                border: "1px solid var(--color-gold)",
                fontWeight: 700,
                marginTop: "0.5rem"
              }}
              onClick={() => onNavigate("admin")}
            >
              <span>⚙️ Artisan Admin Console →</span>
            </button>
          )}
        </div>



        <button
          className="btn btn-secondary btn-sm"
          style={{ width: "100%", marginTop: "1rem" }}
          onClick={logout}
        >
          Sign Out
        </button>
      </aside>

      {/* Main Account Tab Area */}
      <main className="account-main-content">
        {/* TAB 1: MY ORDERS */}
        {activeTab === "orders" && (
          <div>
            <h2 className="font-serif" style={{ color: "var(--color-primary-dark)", marginBottom: "1.25rem", fontSize: "1.5rem" }}>
              My Orders & Curing Timelines ({userOrders.length})
            </h2>

            {userOrders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem", background: "#ffffff", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
                <p style={{ color: "var(--color-text-muted)" }}>No past orders found for this account.</p>
                <button className="btn btn-primary" style={{ marginTop: "0.75rem" }} onClick={() => onNavigate("catalog")}>
                  Explore Collections
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {userOrders.map(order => (
                  <div key={order.orderId} className="account-order-card">
                    <div className="account-order-card-header">
                      <div>
                        <div style={{ fontWeight: 800, color: "var(--color-primary-dark)", fontSize: "1.05rem" }}>
                          {order.orderId}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                          Placed on: {new Date(order.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <span className={`status-pill status-${order.orderStatus?.toLowerCase().replace(/[^a-z]/g, "") || "placed"}`}>
                          {order.orderStatus}
                        </span>
                        <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-primary)" }}>
                          ₹{(order.total || 0).toLocaleString("en-IN")}
                        </div>
                      </div>
                    </div>

                    {/* Ordered Items Preview */}
                    <div style={{ padding: "1rem 1.25rem" }}>
                      {(order.items || []).map((item, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                          <img src={item.image} alt={item.name} style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                          <div style={{ flex: 1, fontSize: "0.85rem" }}>
                            <strong>{item.name}</strong>
                            <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                              Qty: {item.quantity} {item.customOptions?.customText ? `• "${item.customOptions.customText}"` : ""}
                            </div>
                          </div>
                          <span style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                            ₹{(item.price || 0) * (item.quantity || 1)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer Actions */}
                    <div style={{ borderTop: "1px solid var(--color-border)", padding: "0.75rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fcfaf6" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                        AWB: {order.trackingNumber || "Assigned upon dispatch"}
                      </span>
                      <button
                        className="btn btn-outline-gold btn-sm"
                        onClick={() => onNavigate("tracking", null, order.orderId)}
                      >
                        🔬 View Live 72h Milestone Tracker →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WISHLIST */}
        {activeTab === "wishlist" && (
          <div>
            <h2 className="font-serif" style={{ color: "var(--color-primary-dark)", marginBottom: "1.25rem", fontSize: "1.5rem" }}>
              My Saved Wishlist ({wishlistProducts.length})
            </h2>

            {wishlistProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem", background: "#ffffff", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💖</div>
                <p style={{ color: "var(--color-text-muted)" }}>You haven't saved any handcrafted resin items to your wishlist yet.</p>
                <button className="btn btn-primary" style={{ marginTop: "0.75rem" }} onClick={() => onNavigate("catalog")}>
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {wishlistProducts.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CUSTOM INQUIRIES */}
        {activeTab === "bespoke" && (
          <div>
            <h2 className="font-serif" style={{ color: "var(--color-primary-dark)", marginBottom: "1.25rem", fontSize: "1.5rem" }}>
              My Custom Design Inquiries ({userRequests.length})
            </h2>

            {userRequests.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem 1rem", background: "#ffffff", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🎨</div>
                <p style={{ color: "var(--color-text-muted)" }}>You haven't commissioned any custom resin pieces yet.</p>
                <button className="btn btn-primary" style={{ marginTop: "0.75rem" }} onClick={() => onNavigate("bespoke")}>
                  Customize your design →
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {userRequests.map(req => (
                  <div key={req.id} style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1.25rem", background: "#ffffff" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <strong style={{ fontSize: "1.05rem", color: "var(--color-primary-dark)" }}>{req.productType}</strong>
                      <span className="status-pill status-curing">{req.status}</span>
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "0.75rem" }}>
                      Inquiry ID: {req.id} • Submitted on {new Date(req.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.85rem", background: "#fcfaf6", padding: "0.75rem", borderRadius: "4px" }}>
                      <div>Dimensions: <strong>{req.dimensions}</strong></div>
                      <div>Palette: <strong>{req.colorPalette}</strong></div>
                      <div>Budget: <strong>{req.estimatedBudget}</strong></div>
                      {req.customText && <div>Inscription: <em>"{req.customText}"</em></div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
