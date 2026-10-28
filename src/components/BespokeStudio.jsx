import React, { useState } from "react";
import { useStore } from "../context/StoreContext";

export const BespokeStudio = ({ onNavigate }) => {
  const { addCustomRequest, showToast, currentUser } = useStore();

  const [step, setStep] = useState(1);
  const [productType, setProductType] = useState("Wedding Garland Varmala Preservation");
  const [dimensions, setDimensions] = useState("10-inch Hexagon Block with LED Light Base");
  const [colorPalette, setColorPalette] = useState("Emerald Green & 24K Gold Flakes");
  const [inclusions, setInclusions] = useState(["24K Gold Foil Flakes", "Fresh Dried Wedding Garland Flowers"]);
  const [customText, setCustomText] = useState("");
  const [customerName, setCustomerName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState("");

  // Base price estimation
  let estimatedPrice = 3999;
  if (productType.includes("Varmala")) estimatedPrice = 4999;
  if (productType.includes("River")) estimatedPrice = 28000;
  if (productType.includes("Clock")) estimatedPrice = 3499;
  if (productType.includes("Coasters")) estimatedPrice = 1299;

  const toggleInclusion = (item) => {
    setInclusions(prev => {
      if (prev.includes(item)) {
        return prev.filter(i => i !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleSubmitQuote = async () => {
    if (!customerName || !phone) {
      alert("Please provide your name and contact phone number for the quote blueprint.");
      return;
    }

    const newReq = await addCustomRequest({
      customerName,
      phone,
      email,
      productType,
      dimensions,
      colorPalette,
      inclusions,
      customText,
      estimatedBudget: `₹${estimatedPrice.toLocaleString("en-IN")}`,
      notes
    });

    setSubmittedId(newReq.id);
    setIsSubmitted(true);
    showToast(`🎨 Custom inquiry ${newReq.id} saved to database!`);
  };

  if (isSubmitted) {
    return (
      <div className="bespoke-wizard-container container">
        <div className="wizard-card" style={{ textAlign: "center", padding: "3rem 1.5rem" }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎉</div>
          <h2 className="font-serif" style={{ color: "var(--color-primary-dark)", fontSize: "1.75rem", marginBottom: "0.5rem" }}>
            Blueprint Submitted to Master Artisan!
          </h2>
          <div className="status-pill status-placed" style={{ display: "inline-block", margin: "0.5rem 0 1.5rem" }}>
            Inquiry ID: {submittedId}
          </div>
          <p style={{ color: "var(--color-text-muted)", maxWidth: "550px", margin: "0 auto 2rem", lineHeight: 1.6 }}>
            Thank you, <strong>{customerName}</strong>! Your custom design blueprint for <strong>"{productType}"</strong> has been recorded in our artisan database. Our master resin craftsman will review the requirements and reach out via WhatsApp at <strong>{phone}</strong> within 4 business hours.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <button
              className="btn btn-whatsapp btn-lg"
              onClick={() => {
                const msg = `Namaste Art Alay! I just submitted custom design inquiry *${submittedId}* for *${productType}* (Estimated Quote: ₹${estimatedPrice.toLocaleString("en-IN")}). Please review my details.`;
                window.open(`https://wa.me/919810012345?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              💬 Open Instant Artisan Chat on WhatsApp
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigate("account", "bespoke")}
            >
              View in My Inquiries →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bespoke-wizard-container container">
      {/* Wizard Header */}
      <div className="wizard-header">
        <div className="section-eyebrow">
          <span>✨</span>
          <span>CUSTOMIZE YOUR DESIGN • ARTISAN STUDIO</span>
        </div>
        <h1 className="font-serif" style={{ fontSize: "2rem", color: "var(--color-primary-dark)", margin: "0.5rem 0" }}>
          Design Your Signature Resin Creation
        </h1>
        <p style={{ color: "var(--color-text-muted)", maxWidth: "600px", margin: "0 auto" }}>
          From preserving sacred wedding varmala garlands eternally in crystal clarity to live-edge teak river nameplates, build your blueprint in 5 simple steps.
        </p>

        {/* Wizard Stepper Progress Bar */}
        <div className="wizard-stepper">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`wizard-step-node ${step === s ? "active" : step > s ? "completed" : ""}`}
              onClick={() => s <= step && setStep(s)}
            >
              <div className="node-circle">{step > s ? "✓" : s}</div>
              <span className="node-label">
                {s === 1 && "Product"}
                {s === 2 && "Dimensions"}
                {s === 3 && "Palette"}
                {s === 4 && "Inclusions"}
                {s === 5 && "Quote"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Card Content */}
      <div className="wizard-card">
        {/* STEP 1: Product Type */}
        {step === 1 && (
          <div>
            <h3 className="wizard-step-title font-serif">Step 1: Choose Your Creation Type</h3>
            <p className="wizard-step-desc">Select the category of resin handcraft you wish to commission:</p>
            <div className="wizard-options-grid">
              {[
                { title: "Wedding Garland Varmala Preservation", icon: "💐", desc: "Eternal 3D flower block with wedding cards and rose petals" },
                { title: "Live Edge River Resin Teak Wood Slab", icon: "🪵", desc: "Statement dining or entrance nameplate with turquoise wave river" },
                { title: "Royal Sapphire Geode Wall Clock", icon: "🕰️", desc: "Raw quartz crystals, silent sweep movement & Roman numerals" },
                { title: "Agate Geode Drink Coasters (Set of 6)", icon: "🍸", desc: "Liquid 24K gold gilded rims with matching presentation holder" },
                { title: "Baby Birth Stat Memory Block", icon: "👶", desc: "Preserved birth hospital tag, first curls, and engraved milestone data" }
              ].map(opt => (
                <div
                  key={opt.title}
                  className={`wizard-option-card ${productType === opt.title ? "active" : ""}`}
                  onClick={() => setProductType(opt.title)}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{opt.icon}</div>
                  <strong style={{ display: "block", color: "var(--color-primary-dark)", marginBottom: "0.25rem" }}>{opt.title}</strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>{opt.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Dimensions & Silhouette */}
        {step === 2 && (
          <div>
            <h3 className="wizard-step-title font-serif">Step 2: Choose Dimensions & Silhouette</h3>
            <p className="wizard-step-desc">Select the physical geometry and presentation base:</p>
            <div className="wizard-options-grid">
              {[
                { title: "10-inch Hexagon Block with LED Light Base", icon: "⬡", desc: "Glowing warm white LED wooden stand (Best for Varmalas)" },
                { title: "8-inch Deep 3D Square Cube", icon: "🧊", desc: "Ultra-heavy freestanding crystal cube with 360° visibility" },
                { title: "9-inch Sacred Heart Silhouette", icon: "🤍", desc: "Romantic heart geometry suited for couple vows & petals" },
                { title: "16\" x 8\" Reclaimed River Teak Wood Slab", icon: "🚪", desc: "Wall mounting hardware included with brass hanging loops" }
              ].map(opt => (
                <div
                  key={opt.title}
                  className={`wizard-option-card ${dimensions === opt.title ? "active" : ""}`}
                  onClick={() => setDimensions(opt.title)}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{opt.icon}</div>
                  <strong style={{ display: "block", color: "var(--color-primary-dark)", marginBottom: "0.25rem" }}>{opt.title}</strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>{opt.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Pigment & Mica Palette */}
        {step === 3 && (
          <div>
            <h3 className="wizard-step-title font-serif">Step 3: Select Pigments & Color Scheme</h3>
            <p className="wizard-step-desc">Pick hand-blended Japanese mica powder shades:</p>
            <div className="wizard-options-grid">
              {[
                { title: "Emerald Green & 24K Gold Flakes", hex: "#1b4332", desc: "Royal emerald tones with shimmering metallic gold swirls" },
                { title: "Pacific Ocean Surf & White Foam", hex: "#0077b6", desc: "Realistic crashing sea waves and translucent sea glass blue" },
                { title: "Pearl Rose & Liquid Champagne Gold", hex: "#e5989b", desc: "Subtle wedding shimmer with opalescent pink highlights" },
                { title: "Black Tourmaline & Gold Marble", hex: "#1f2421", desc: "Ultra-sleek modern luxury with white marble veining" }
              ].map(opt => (
                <div
                  key={opt.title}
                  className={`wizard-option-card ${colorPalette === opt.title ? "active" : ""}`}
                  onClick={() => setColorPalette(opt.title)}
                >
                  <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: opt.hex, margin: "0 auto 0.5rem", border: "2px solid #ffffff", boxShadow: "var(--shadow-sm)" }} />
                  <strong style={{ display: "block", color: "var(--color-primary-dark)", marginBottom: "0.25rem" }}>{opt.title}</strong>
                  <span style={{ fontSize: "0.78rem", color: "var(--color-text-muted)" }}>{opt.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Inclusions & Custom Inscription */}
        {step === 4 && (
          <div>
            <h3 className="wizard-step-title font-serif">Step 4: Special Inclusions & Inscription</h3>
            <p className="wizard-step-desc">Select all elements to embed into your cured resin layers:</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {[
                "24K Gold Foil Flakes",
                "Fresh Dried Wedding Garland Flowers",
                "Raw Natural Quartz Crystals",
                "Scannable Spotify Song Barcode",
                "Brass Tinkling Bells (Toran)",
                "Warm LED Glow Embedded Channel"
              ].map(item => (
                <div
                  key={item}
                  className={`pill-option-btn ${inclusions.includes(item) ? "active" : ""}`}
                  style={{ padding: "0.75rem", textAlign: "left", display: "flex", alignItems: "center", gap: "0.5rem" }}
                  onClick={() => toggleInclusion(item)}
                >
                  <span>{inclusions.includes(item) ? "✓" : "+"}</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="form-group">
              <label className="form-label">Custom Engraved Name / Family Inscription:</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 'Vikas & Meenu • 12.12.2026' or 'Balewadi Sanctuary'"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* STEP 5: Blueprint Review & Live Quote */}
        {step === 5 && (
          <div>
            <h3 className="wizard-step-title font-serif">Step 5: Review Blueprint & Commission Quote</h3>
            <p className="wizard-step-desc">Review your handcrafted design blueprint and verify contact details:</p>

            {/* Blueprint Summary Box */}
            <div style={{ background: "#fcfaf6", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)", padding: "1.5rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Creation Type:</span>
                  <div style={{ fontWeight: 700, color: "var(--color-primary-dark)" }}>{productType}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Geometry & Base:</span>
                  <div style={{ fontWeight: 700, color: "var(--color-primary-dark)" }}>{dimensions}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Color Palette:</span>
                  <div style={{ fontWeight: 700, color: "var(--color-primary-dark)" }}>{colorPalette}</div>
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Estimated Starting Quote:</span>
                  <div style={{ fontWeight: 800, color: "var(--color-primary)", fontSize: "1.2rem" }}>₹{estimatedPrice.toLocaleString("en-IN")}</div>
                </div>
              </div>

              {customText && (
                <div style={{ borderTop: "1px dashed var(--color-border)", paddingTop: "0.75rem", marginTop: "0.75rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>Engraved Inscription:</span>
                  <div className="font-serif" style={{ color: "var(--color-gold-dark)", fontSize: "1.1rem", fontStyle: "italic" }}>"{customText}"</div>
                </div>
              )}
            </div>

            {/* Customer Contact Details */}
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Vikas Kumar"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile WhatsApp Number *</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+91 98100 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Specific Artisan Notes (Special dates, venue pickup, flower details):</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Mention wedding dates, flower drying preferences, or express dispatch deadlines..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        <div className="wizard-footer-controls">
          {step > 1 ? (
            <button
              className="btn btn-secondary"
              onClick={() => setStep(step - 1)}
            >
              ← Previous Step
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setStep(step + 1)}
            >
              Next Step →
            </button>
          ) : (
            <button
              className="btn btn-gold btn-lg"
              onClick={handleSubmitQuote}
            >
              ✓ Submit Blueprint & Request Quote
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
