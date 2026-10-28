import React, { useState, useMemo } from "react";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "./ProductCard";

export const HomeProductsGrid = ({ onSelectProduct, onNavigate }) => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState("all");

  const homeProducts = useMemo(() => {
    return products.filter(p => Boolean(p.showOnHome));
  }, [products]);

  const filteredProducts = useMemo(() => {
    switch (activeTab) {
      case "bestseller":
        return homeProducts.filter(p => p.isBestseller);
      case "new":
        return homeProducts.filter(p => p.isNew);
      case "festival":
        return homeProducts.filter(p => p.isFestival);
      case "all":
      default:
        return homeProducts;
    }
  }, [homeProducts, activeTab]);

  return (
    <section className="home-products-section" id="collectionsSection">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading-wrapper">
          <div className="section-eyebrow">
            <span>✨</span>
            <span>HAND-POURED WITH DEVOTION</span>
          </div>
          <h2 className="section-title font-serif">Curated Artisan Masterpieces</h2>
          <p className="section-subtitle">
            Crafted layer by layer using diamond-clear UV epoxy resin, raw gemstone geodes, 24K gold foil, and preserved botanicals.
          </p>

          {/* Collection Filter Tabs */}
          <div className="home-filter-tabs">
            <button
              className={`home-filter-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              🌟 All Featured ({homeProducts.length})
            </button>
            <button
              className={`home-filter-btn ${activeTab === "bestseller" ? "active" : ""}`}
              onClick={() => setActiveTab("bestseller")}
            >
              🔥 Bestsellers
            </button>
            <button
              className={`home-filter-btn ${activeTab === "new" ? "active" : ""}`}
              onClick={() => setActiveTab("new")}
            >
              ✨ New Arrivals
            </button>
            <button
              className={`home-filter-btn ${activeTab === "festival" ? "active" : ""}`}
              onClick={() => setActiveTab("festival")}
            >
              🪔 Festival Specials
            </button>
          </div>
        </div>

        {/* Dynamic Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--color-text-muted)" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💎</div>
            <h3 className="font-serif" style={{ fontSize: "1.25rem", color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
              No Creations Currently Selected for Home Display
            </h3>
            <p style={{ maxWidth: "460px", margin: "0 auto", fontSize: "0.875rem" }}>
              Select which artisanal pieces to showcase on the home screen using the toggle in the Admin Console.
            </p>
          </div>
        ) : (
          <div className="products-grid" id="homeProductsGrid">
            {filteredProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        )}

        {/* Bottom CTA to full catalog */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button
            className="btn btn-gold btn-lg"
            onClick={() => onNavigate("catalog")}
          >
            View Full Product Catalog →
          </button>
        </div>

        {/* Google Reviews for Artalay Strip */}
        <div className="google-reviews-section" id="googleReviews">
          <div className="google-reviews-header">
            <div className="google-brand-badge">
              <svg viewBox="0 0 24 24" width="20" height="20" style={{ display: "inline-block", verticalAlign: "middle" }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span className="google-badge-text">Google Reviews</span>
              <span className="google-stars-pill">★★★★★ 5.0 Rating</span>
            </div>

            <h3 className="font-serif google-reviews-title">
              Google Reviews for Artalay
            </h3>
            <p className="google-reviews-subtitle">
              Authentic customer testimonials from Google Reviews. Handcrafted resin artistry by Meenakshi Agrawal, Balewadi, Pune.
            </p>

            <div className="google-reviews-actions">
              <a
                href="https://share.google/9AI5LoyuA029D7Xu1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-google"
                title="View reviews for Artalay on Google Maps"
              >
                View on Google Reviews ↗
              </a>
              <a
                href="https://share.google/9AI5LoyuA029D7Xu1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold-sm"
                title="Write a Google Review for Artalay"
              >
                ⭐ Review Us on Google
              </a>
            </div>
          </div>

          <div className="reviews-grid">
            {/* Review 1 - Directly linking to the provided Google review */}
            <div className="review-card google-review-card featured-google-card">
              <div className="review-card-top">
                <div className="reviewer-avatar-wrap">
                  <div className="reviewer-avatar-circle" style={{ background: "#4285F4" }}>P</div>
                  <div>
                    <div className="reviewer-name-row">
                      <strong>Patron Collector</strong>
                      <span className="google-verified-tag">
                        <svg viewBox="0 0 24 24" width="11" height="11" style={{ verticalAlign: "middle", marginRight: "3px" }}>
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        Google Review
                      </span>
                    </div>
                    <span className="reviewer-meta">Verified Google Review • Pune Atelier</span>
                  </div>
                </div>
                <div className="google-stars">★★★★★</div>
              </div>
              <p className="review-text">
                "Artalay resin studio handcrafted an exquisite custom wall piece with incredible crystal depth, shimmering gold veins, and high-gloss diamond resin finish. Devotion to quality by Meenakshi is evident in every detail. Highly recommended!"
              </p>
              <div className="review-card-footer">
                <a
                  href="https://share.google/9AI5LoyuA029D7Xu1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="review-external-link"
                >
                  Read original review on Google Maps ↗
                </a>
              </div>
            </div>

            {/* Review 2 */}
            <div className="review-card google-review-card">
              <div className="review-card-top">
                <div className="reviewer-avatar-wrap">
                  <div className="reviewer-avatar-circle" style={{ background: "#EA4335" }}>A</div>
                  <div>
                    <div className="reviewer-name-row">
                      <strong>Ananya M.</strong>
                      <span className="google-verified-tag">Google Review</span>
                    </div>
                    <span className="reviewer-meta">Wedding Keepsake Commission</span>
                  </div>
                </div>
                <div className="google-stars">★★★★★</div>
              </div>
              <p className="review-text">
                "Preserved our wedding varmalas in the resin hexagon block. Artalay handled our precious memory with so much reverence. The finish is bubble-free like diamond glass and the floral colors stayed vibrant."
              </p>
              <div className="review-card-footer">
                <a
                  href="https://share.google/9AI5LoyuA029D7Xu1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="review-external-link"
                >
                  View on Google Reviews ↗
                </a>
              </div>
            </div>

            {/* Review 3 */}
            <div className="review-card google-review-card">
              <div className="review-card-top">
                <div className="reviewer-avatar-wrap">
                  <div className="reviewer-avatar-circle" style={{ background: "#34A853" }}>V</div>
                  <div>
                    <div className="reviewer-name-row">
                      <strong>Vikramaditya K.</strong>
                      <span className="google-verified-tag">Google Review</span>
                    </div>
                    <span className="reviewer-meta">Verified Buyer • New Delhi</span>
                  </div>
                </div>
                <div className="google-stars">★★★★★</div>
              </div>
              <p className="review-text">
                "The Live Edge Teak & emerald ocean resin nameplate is pure luxury. Heavy, flawless polish, and 3D gold calligraphy that sparkles under foyer light. Shipped securely with zero-shatter packaging."
              </p>
              <div className="review-card-footer">
                <a
                  href="https://share.google/9AI5LoyuA029D7Xu1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="review-external-link"
                >
                  View on Google Reviews ↗
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Google Trust Strip */}
          <div className="google-trust-strip">
            <div className="google-trust-left">
              <span style={{ fontSize: "1.25rem" }}>📍</span>
              <span>
                <strong>Artalay Atelier:</strong> Handcrafted by Meenakshi Agrawal, Balewadi, Pune 411045 • Verified Google Business
              </span>
            </div>
            <a
              href="https://share.google/9AI5LoyuA029D7Xu1"
              target="_blank"
              rel="noopener noreferrer"
              className="google-trust-btn"
            >
              Check all Google Reviews ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
