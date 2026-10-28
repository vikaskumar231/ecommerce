import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

export const PaymentGatewayModal = ({
  isOpen,
  onClose,
  customerDetails,
  onOrderSuccess
}) => {
  const { cart, getCartTotals, createOrder, currentUser } = useStore();
  const totals = getCartTotals();

  const [paymentMethod, setPaymentMethod] = useState("UPI (Google Pay)");
  const [upiId, setUpiId] = useState(() => {
    return currentUser ? `${currentUser.username.toLowerCase()}@upi` : "customer@okaxis";
  });
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4092");
  const [expiry, setExpiry] = useState("12/28");
  const [cvv, setCvv] = useState("•••");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const payableAmount = customerDetails?.payAdvanceOnly
    ? Math.round(totals.total * 0.5)
    : totals.total;

  const handleConfirmPayment = async () => {
    setIsProcessing(true);

    setTimeout(async () => {
      // Create Order payload
      const orderPayload = {
        username: currentUser?.username || customerDetails?.name || "Guest",
        customer: {
          name: customerDetails?.name || "",
          phone: customerDetails?.phone || "",
          email: customerDetails?.email || "",
          address: customerDetails?.address || "",
          city: customerDetails?.city || "",
          state: customerDetails?.state || "",
          pincode: customerDetails?.pincode || "",
          instructions: customerDetails?.instructions || ""
        },
        items: cart,
        subtotal: totals.subtotal,
        discount: totals.discount,
        shipping: totals.shipping,
        total: totals.total,
        paymentMethod: paymentMethod + (customerDetails?.payAdvanceOnly ? " [50% Advance]" : " [Full Payment]"),
        paymentStatus: "Paid"
      };

      const newOrder = await createOrder(orderPayload);
      setIsProcessing(false);
      onClose();
      onOrderSuccess(newOrder.orderId);
    }, 1800);
  };

  return (
    <div className="modal-overlay active">
      <div className="modal-card payment-modal-card" style={{ maxWidth: "520px" }}>
        {/* Gateway Header */}
        <div className="payment-modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.4rem" }}>🔐</span>
            <div>
              <h3 className="modal-title font-serif" style={{ margin: 0, fontSize: "1.15rem" }}>
                Art Alay Secure Payment Gateway
              </h3>
              <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.75)" }}>
                256-bit SSL Banking Simulation • Zero Chargeback Protection
              </div>
            </div>
          </div>
          <button className="modal-close-btn" style={{ color: "#ffffff" }} onClick={onClose} disabled={isProcessing}>
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="payment-modal-body" style={{ padding: "1.5rem" }}>
          {isProcessing ? (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
              <div style={{ fontSize: "3.5rem", animation: "pulseDot 1.5s infinite" }}>⏳</div>
              <h3 className="font-serif" style={{ color: "var(--color-primary-dark)", margin: "1rem 0 0.5rem" }}>
                Connecting to Bank & Securing Token
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                Verifying transaction of ₹{payableAmount.toLocaleString("en-IN")} via {paymentMethod}...
              </p>
              <div className="spinner" style={{ margin: "1.5rem auto 0" }} />
            </div>
          ) : (
            <div>
              {/* Amount Display */}
              <div className="payment-amount-banner">
                <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Total Payable Amount:</span>
                <span className="payment-grand-val">₹{payableAmount.toLocaleString("en-IN")}</span>
                {customerDetails?.payAdvanceOnly && (
                  <span className="advance-tag">50% Advance Handcrafting Deposit</span>
                )}
              </div>

              {/* Payment Methods Tabs */}
              <div className="payment-method-tabs">
                {[
                  { id: "UPI (Google Pay)", label: "UPI Apps", icon: "📱" },
                  { id: "Credit/Debit Card", label: "Cards", icon: "💳" },
                  { id: "Net Banking (HDFC)", label: "NetBanking", icon: "🏦" }
                ].map(m => (
                  <button
                    key={m.id}
                    type="button"
                    className={`payment-tab-btn ${paymentMethod.startsWith(m.id.split(" ")[0]) ? "active" : ""}`}
                    onClick={() => setPaymentMethod(m.id)}
                  >
                    <span>{m.icon}</span>
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {/* UPI Tab */}
              {paymentMethod.includes("UPI") && (
                <div>
                  <div className="form-group" style={{ marginBottom: "1rem" }}>
                    <label className="form-label">Virtual Payment Address (VPA / UPI ID):</label>
                    <input
                      type="text"
                      className="form-control"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                    />
                  </div>

                  <div className="upi-apps-grid">
                    {["Google Pay", "PhonePe", "Paytm", "BHIM UPI"].map(app => (
                      <div
                        key={app}
                        className={`upi-app-chip ${paymentMethod === `UPI (${app})` ? "active" : ""}`}
                        onClick={() => setPaymentMethod(`UPI (${app})`)}
                      >
                        <span>✓</span>
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cards Tab */}
              {paymentMethod.includes("Card") && (
                <div>
                  <div className="form-group" style={{ marginBottom: "0.75rem" }}>
                    <label className="form-label">Card Number:</label>
                    <input
                      type="text"
                      className="form-control"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Expiry (MM/YY):</label>
                      <input
                        type="text"
                        className="form-control"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">CVV:</label>
                      <input
                        type="password"
                        className="form-control"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NetBanking Tab */}
              {paymentMethod.includes("Net") && (
                <div style={{ padding: "0.5rem 0" }}>
                  <label className="form-label">Select Your Bank:</label>
                  <select
                    className="form-control"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="Net Banking (HDFC Bank)">HDFC Bank</option>
                    <option value="Net Banking (ICICI Bank)">ICICI Bank</option>
                    <option value="Net Banking (State Bank of India)">State Bank of India</option>
                    <option value="Net Banking (Axis Bank)">Axis Bank</option>
                  </select>
                </div>
              )}

              {/* Submit Payment Button */}
              <button
                type="button"
                className="btn btn-gold btn-lg"
                style={{ width: "100%", marginTop: "1.25rem", padding: "0.85rem" }}
                onClick={handleConfirmPayment}
              >
                Simulate Payment of ₹{payableAmount.toLocaleString("en-IN")} →
              </button>

              <div style={{ textAlign: "center", marginTop: "0.75rem", fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                ⚡ Simulation: Completing this order records your order in the studio database.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
