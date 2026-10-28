import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

export const CheckoutView = ({ onNavigate, onTriggerPayment }) => {
  const { cart, getCartTotals, currentUser } = useStore();
  const totals = getCartTotals();

  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [city, setCity] = useState(currentUser?.city || "");
  const [state, setState] = useState(currentUser?.state || "");
  const [pincode, setPincode] = useState(currentUser?.pincode || "");
  const [payAdvanceOnly, setPayAdvanceOnly] = useState(false);
  const [instructions, setInstructions] = useState("");

  if (cart.length === 0) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "5rem 1rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛍️</div>
        <h2 className="font-serif" style={{ color: "var(--color-primary-dark)" }}>Your Bag is Empty</h2>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>Add handcrafted resin creations before proceeding to checkout.</p>
        <button className="btn btn-primary" onClick={() => onNavigate("catalog")}>
          Explore Collections
        </button>
      </div>
    );
  }

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!name || !phone || !address || !pincode) {
      alert("Please fill in all mandatory delivery address fields.");
      return;
    }

    const customerDetails = {
      name,
      phone,
      email,
      address,
      city,
      state,
      pincode,
      instructions,
      payAdvanceOnly
    };

    onTriggerPayment(customerDetails);
  };

  const payableTotal = payAdvanceOnly ? Math.round(totals.total * 0.5) : totals.total;

  return (
    <div className="checkout-layout container">
      <div className="checkout-page-header">
        <h1 className="font-serif" style={{ color: "var(--color-primary-dark)", fontSize: "1.85rem", marginBottom: "0.25rem" }}>
          Express Luxury Checkout
        </h1>
        <div style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
          🔒 256-bit SSL Encrypted • Direct Handcrafting by Art Alay Artisans
        </div>
      </div>

      <div className="checkout-grid">
        {/* Left Column: Shipping Address & Details */}
        <div className="checkout-form-column">
          <form onSubmit={handleProceedToPayment}>
            {/* Contact Information */}
            <div className="checkout-section-box">
              <h3 className="checkout-box-title font-serif">1. Customer Contact</h3>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Mobile Number (WhatsApp Enabled) *</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email Address (for Invoice & Delhivery Tracking)</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="checkout-section-box">
              <h3 className="checkout-box-title font-serif">2. Shipping Destination (Zero-Shatter Insured)</h3>
              <div className="form-group">
                <label className="form-label">Street Address / House No. / Landmark *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. 104, Royal Palms Residency, 100ft Road"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">State *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">PIN Code *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Artisan Delivery Notes / Special Timing:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Ring doorbell, fragile wedding keepsake inside"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>
            </div>

            {/* Payment Options Preference */}
            <div className="checkout-section-box">
              <h3 className="checkout-box-title font-serif">3. Payment Preference</h3>
              <div
                className={`checkout-payment-pref-card ${!payAdvanceOnly ? "active" : ""}`}
                onClick={() => setPayAdvanceOnly(false)}
              >
                <input
                  type="radio"
                  name="payPref"
                  checked={!payAdvanceOnly}
                  onChange={() => setPayAdvanceOnly(false)}
                />
                <div style={{ marginLeft: "0.75rem" }}>
                  <strong>Pay Full Amount (100% Guaranteed Dispatch)</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    Instant processing & priority VIP dispatch queue • ₹{totals.total.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              <div
                className={`checkout-payment-pref-card ${payAdvanceOnly ? "active" : ""}`}
                onClick={() => setPayAdvanceOnly(true)}
              >
                <input
                  type="radio"
                  name="payPref"
                  checked={payAdvanceOnly}
                  onChange={() => setPayAdvanceOnly(true)}
                />
                <div style={{ marginLeft: "0.75rem" }}>
                  <strong>50% Handcrafting Advance Deposit</strong>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    Pay ₹{Math.round(totals.total * 0.5).toLocaleString("en-IN")} now to start 72h curing; remaining 50% upon video approval before courier dispatch.
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-gold btn-lg" style={{ width: "100%", padding: "1rem" }}>
              Proceed to Secure Payment Simulator (₹{payableTotal.toLocaleString("en-IN")}) →
            </button>
          </form>
        </div>

        {/* Right Column: Order Review */}
        <div className="checkout-review-column">
          <div className="checkout-review-card">
            <h3 className="checkout-box-title font-serif" style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "0.75rem" }}>
              Order Review ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h3>

            {/* Items List */}
            <div className="checkout-review-items-list">
              {cart.map((item) => {
                const itemUnit = (item.price || 0) + (item.extraAddonsPrice || 0);
                const opts = item.customOptions || {};
                return (
                  <div key={item.cartItemId} className="checkout-review-item-row">
                    <img src={item.image} alt={item.name} className="review-thumb" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, color: "var(--color-primary-dark)", fontSize: "0.9rem" }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                        Qty: {item.quantity} {opts.color ? `• ${opts.color}` : ""} {opts.customText ? `• "${opts.customText}"` : ""}
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                      ₹{(itemUnit * item.quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculations Breakdown */}
            <div className="checkout-totals-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totals.subtotal.toLocaleString("en-IN")}</span>
              </div>
              {totals.discount > 0 && (
                <div className="summary-row" style={{ color: "var(--color-success)" }}>
                  <span>Discount ({totals.appliedCoupon?.code})</span>
                  <span>-₹{totals.discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Express Insured Shipping</span>
                <span>{totals.shipping === 0 ? "FREE" : `₹${totals.shipping}`}</span>
              </div>
              <div className="summary-row summary-grand-total font-serif">
                <span>Total Amount</span>
                <span>₹{totals.total.toLocaleString("en-IN")}</span>
              </div>

              {payAdvanceOnly && (
                <div className="summary-row" style={{ color: "var(--color-gold-dark)", fontWeight: 700, borderTop: "1px dashed var(--color-border)", paddingTop: "0.5rem" }}>
                  <span>Payable Now (50% Advance)</span>
                  <span>₹{payableTotal.toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>

            {/* Security Assurance */}
            <div className="checkout-assurance-box">
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem", color: "var(--color-primary-dark)", fontWeight: 700, fontSize: "0.85rem" }}>
                <span>🛡️</span>
                <span>Art Alay Artisan Guarantee</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", margin: 0, lineHeight: 1.5 }}>
                Orders are directly registered with our artisan studio. Each item is individually poured, cured for 72h, diamond polished, and packed with photo verification before courier pickup.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
