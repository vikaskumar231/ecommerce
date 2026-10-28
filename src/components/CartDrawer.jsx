import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

export const CartDrawer = ({ isOpen, onClose, onCheckout, onNavigate }) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const totals = getCartTotals();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError("");
      setCouponInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay active" onClick={onClose}>
      <div className="cart-drawer-card" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.4rem" }}>🛍️</span>
            <h3 className="font-serif" style={{ fontSize: "1.25rem", color: "var(--color-primary-dark)", margin: 0 }}>
              Your Artisan Bag ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button className="cart-close-btn" onClick={onClose} title="Close Bag">
            &times;
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="cart-shipping-meter-wrap">
          {totals.freeShippingRemaining > 0 ? (
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-main)", marginBottom: "0.35rem" }}>
                Add <strong>₹{totals.freeShippingRemaining}</strong> more to unlock <strong>FREE Express Delivery</strong> across India!
              </div>
              <div className="shipping-progress-bar">
                <div
                  className="shipping-progress-fill"
                  style={{ width: `${Math.min(100, Math.round(((999 - totals.freeShippingRemaining) / 999) * 100))}%` }}
                />
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--color-success)", fontWeight: 700, fontSize: "0.85rem" }}>
              <span>🎉</span>
              <span>Congratulations! You've unlocked FREE Express Shipping!</span>
            </div>
          )}
        </div>

        {/* Cart Items List */}
        <div className="cart-items-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛍️</div>
              <h4 className="font-serif" style={{ color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
                Your Artisan Bag is Empty
              </h4>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                Explore our hand-poured geode clocks, preserved flowers, and luxury river nameplates.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  onNavigate("catalog");
                }}
              >
                Browse Collections
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => {
                const itemUnitPrice = (item.price || 0) + (item.extraAddonsPrice || 0);
                const itemTotal = itemUnitPrice * item.quantity;
                const opts = item.customOptions || {};

                return (
                  <div key={item.cartItemId} className="cart-item-row">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-details">
                      <div className="cart-item-title font-serif">{item.name}</div>
                      <div className="cart-item-unit-price">
                        ₹{itemUnitPrice.toLocaleString("en-IN")} each
                      </div>

                      {/* Custom Attributes Summary */}
                      {(opts.color || opts.foil || opts.size || opts.customText) && (
                        <div className="cart-item-custom-summary">
                          {opts.color && <span>Palette: {opts.color}</span>}
                          {opts.foil && <span>• Foil: {opts.foil}</span>}
                          {opts.size && <span>• Size: {opts.size}</span>}
                          {opts.customText && (
                            <span style={{ color: "var(--color-gold-dark)", fontWeight: 600 }}>
                              • Engraving: "{opts.customText}"
                            </span>
                          )}
                        </div>
                      )}

                      {/* Stepper Quantity & Remove */}
                      <div className="cart-item-actions-row">
                        <div className="quantity-stepper stepper-sm">
                          <button onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}>
                            -
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}>
                            +
                          </button>
                        </div>

                        <span className="cart-item-total">
                          ₹{itemTotal.toLocaleString("en-IN")}
                        </span>

                        <button
                          className="cart-item-remove-btn"
                          onClick={() => removeFromCart(item.cartItemId)}
                          title="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer with Coupon & Checkout */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="coupon-apply-form">
              <input
                type="text"
                placeholder="Promo Code (e.g. FESTIVE15)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="form-control"
                style={{ textTransform: "uppercase" }}
              />
              <button type="submit" className="btn btn-secondary btn-sm">
                Apply
              </button>
            </form>

            {couponError && (
              <div style={{ color: "var(--color-error)", fontSize: "0.75rem", marginTop: "0.35rem" }}>
                {couponError}
              </div>
            )}

            {totals.appliedCoupon && (
              <div className="applied-coupon-pill">
                <span>✓ Applied: {totals.appliedCoupon.code} (-{totals.appliedCoupon.discountPercent}%)</span>
                <button type="button" onClick={removeCoupon}>&times;</button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="cart-totals-breakdown">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>₹{totals.subtotal.toLocaleString("en-IN")}</span>
              </div>
              {totals.discount > 0 && (
                <div className="total-line" style={{ color: "var(--color-success)" }}>
                  <span>Coupon Discount:</span>
                  <span>-₹{totals.discount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="total-line">
                <span>Estimated Shipping:</span>
                <span>{totals.shipping === 0 ? "FREE" : `₹${totals.shipping}`}</span>
              </div>
              <div className="total-line grand-total font-serif">
                <span>Final Total:</span>
                <span>₹{totals.total.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Checkout & Clear Cart */}
            <button
              className="btn btn-gold btn-lg"
              style={{ width: "100%", marginTop: "0.75rem" }}
              onClick={() => {
                onClose();
                onCheckout();
              }}
            >
              Proceed to Secure Checkout →
            </button>

            <button
              style={{ width: "100%", marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--color-text-muted)", cursor: "pointer", background: "none", border: "none" }}
              onClick={clearCart}
            >
              Empty Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
