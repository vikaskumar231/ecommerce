import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

export const OrderTrackingView = ({ activeOrderId, onNavigate }) => {
  const { orders, currentUser } = useStore();
  const [searchInput, setSearchInput] = useState(activeOrderId || "");
  const [currentOrder, setCurrentOrder] = useState(() => {
    if (activeOrderId) {
      return orders.find(o => o.orderId.toUpperCase() === activeOrderId.toUpperCase());
    }
    // Default to first user order if logged in
    if (currentUser) {
      const userOrders = orders.filter(
        o => o.username && o.username.toLowerCase() === currentUser.username.toLowerCase()
      );
      return userOrders[0] || null;
    }
    return null;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = orders.find(o => o.orderId.toUpperCase() === searchInput.trim().toUpperCase());
    if (found) {
      setCurrentOrder(found);
    } else {
      alert(`Order ID "${searchInput}" not found. Please verify your reference number.`);
    }
  };

  const handleSelectQuickOrder = (order) => {
    setCurrentOrder(order);
    setSearchInput(order.orderId);
  };

  const userOrders = currentUser
    ? orders.filter(o => o.username && o.username.toLowerCase() === currentUser.username.toLowerCase())
    : [];

  return (
    <div className="tracking-page-layout container">
      {/* Header & Search */}
      <div className="tracking-header-wrap">
        <div className="section-eyebrow">
          <span>🔬</span>
          <span>ARTISAN RESIN STUDIO TIMELINE</span>
        </div>
        <h1 className="font-serif" style={{ color: "var(--color-primary-dark)", fontSize: "2rem", margin: "0.5rem 0" }}>
          Live Order Tracking & 72-Hour Curing Visualizer
        </h1>
        <p style={{ color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto 1.5rem" }}>
          Track every step of handcrafting: from liquid pigment pouring and UV vacuum curing to diamond beveling and express delivery.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="tracking-search-form">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Order ID (e.g. ORD-VIKAS-940)"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Track Order
          </button>
        </form>

        {/* Quick Order Selectors */}
        {userOrders.length > 0 && (
          <div className="tracking-quick-links-row">
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Your Recent Orders:</span>
            {userOrders.map(o => (
              <button
                key={o.orderId}
                type="button"
                className={`quick-order-chip ${currentOrder?.orderId === o.orderId ? "active" : ""}`}
                onClick={() => handleSelectQuickOrder(o)}
              >
                {o.orderId} ({o.orderStatus})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Order Tracking Content */}
      {currentOrder ? (
        <div className="tracking-details-card">
          {/* Top Status Summary Bar */}
          <div className="tracking-summary-bar">
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Order Reference</div>
              <div style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--color-primary-dark)" }}>
                {currentOrder.orderId}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Current Handcrafting Stage</div>
              <span className={`status-pill status-${currentOrder.orderStatus?.toLowerCase().replace(/[^a-z]/g, "") || "placed"}`} style={{ fontSize: "0.9rem" }}>
                {currentOrder.orderStatus}
              </span>
            </div>

            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Courier Waybill AWB</div>
              <div style={{ fontWeight: 700, color: "var(--color-primary)" }}>
                {currentOrder.trackingNumber || "DEL-9948201"}
              </div>
            </div>

            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>Total Value</div>
              <div style={{ fontWeight: 700, color: "var(--color-primary-dark)" }}>
                ₹{(currentOrder.total || 0).toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {/* 6-Stage Milestone Visualizer */}
          <div className="tracking-milestone-timeline">
            {(currentOrder.trackingSteps || [
              { status: "Order Placed", date: "Just now", completed: true, active: true, note: "Order placed & artisan assigned" },
              { status: "Resin Poured", date: "Scheduled in 24h", completed: false, note: "Color mixing & layer casting" },
              { status: "Deep Curing (72h)", date: "Scheduled in 48h", completed: false, note: "Diamond crystal glass cure" },
              { status: "Sanding & Polishing", date: "Pending", completed: false, note: "Edge beveling and hand buffing" },
              { status: "Dispatched", date: "Pending", completed: false, note: "Packaged in eco-padded gift box" },
              { status: "Delivered", date: "Estimated 4-6 business days", completed: false, note: "Safe doorstep delivery" }
            ]).map((step, idx) => (
              <div
                key={idx}
                className={`timeline-step-node ${step.completed ? "completed" : ""} ${step.active ? "active" : ""}`}
              >
                <div className="timeline-node-icon">
                  {step.completed ? "✓" : idx + 1}
                </div>
                <div className="timeline-node-content">
                  <div className="timeline-node-title font-serif">{step.status}</div>
                  <div className="timeline-node-date">{step.date}</div>
                  {step.note && <div className="timeline-node-note">{step.note}</div>}
                </div>
              </div>
            ))}
          </div>

          {/* Ordered Items Preview */}
          <div style={{ marginTop: "2rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
            <h4 className="font-serif" style={{ color: "var(--color-primary-dark)", marginBottom: "1rem" }}>
              Creations in this Shipment:
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
              {(currentOrder.items || []).map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem", background: "#fcfaf6", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-border)" }}>
                  <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--color-primary-dark)" }}>{item.name}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                      Qty: {item.quantity} • ₹{(item.price || 0) * (item.quantity || 1)}
                    </div>
                    {item.customOptions?.customText && (
                      <div style={{ fontSize: "0.72rem", color: "var(--color-gold-dark)", fontStyle: "italic" }}>
                        Engraved: "{item.customOptions.customText}"
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Actions */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2rem", borderTop: "1px solid var(--color-border)", paddingTop: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
              Need urgent delivery adjustments or flower dispatch query?
            </div>
            <button
              className="btn btn-whatsapp btn-sm"
              onClick={() => {
                const msg = `Namaste! I would like to inquire about Order ID *${currentOrder.orderId}* (${currentOrder.orderStatus}).`;
                window.open(`https://wa.me/919810012345?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              💬 WhatsApp Master Artisan
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "3rem 1rem", background: "#ffffff", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
          <p style={{ color: "var(--color-text-muted)" }}>No order selected. Enter an Order ID above to track.</p>
        </div>
      )}
    </div>
  );
};
