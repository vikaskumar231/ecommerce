import React, { useState, useEffect } from "react";
import { useStore } from "../context/StoreContext";
import { DEFAULT_CATEGORY_IMAGES } from "../data/initialData";

export const ProductDetailsView = ({
  product,
  onNavigate,
  onSelectCategory,
  onOpenCart,
  onCheckout
}) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  // Gallery state
  const images = (product.images && product.images.length > 0)
    ? product.images
    : [DEFAULT_CATEGORY_IMAGES[product.category] || "images/wall-clock.svg"];
  const [selectedImg, setSelectedImg] = useState(images[0]);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedImg(images[0]);
    }
  }, [product]);

  // Customization state
  const customOpts = product.customizationOptions || {};
  const colorPalettes = customOpts.colorPalette || [];
  const foilTypes = customOpts.foilTypes || ["24K Gold Flakes", "Sterling Silver", "Rose Gold Shimmer", "None"];
  const sizes = customOpts.sizes || [];
  const hookTypes = customOpts.hookTypes || [];
  const dialTypes = customOpts.dialTypes || [];

  const [selectedColor, setSelectedColor] = useState(colorPalettes[0]?.name || null);
  const [selectedFoil, setSelectedFoil] = useState(foilTypes[0] || null);
  const [selectedSize, setSelectedSize] = useState(sizes[0] || null);
  const [selectedHook, setSelectedHook] = useState(hookTypes[0] || null);
  const [selectedDial, setSelectedDial] = useState(dialTypes[0] || null);
  const [customText, setCustomText] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);

  // Calculate Extra Addons Price
  const chosenColorObj = colorPalettes.find(c => c.name === selectedColor);
  const extraAddonsPrice = chosenColorObj?.extraPrice || 0;
  const unitPrice = (product.price || 0) + extraAddonsPrice;
  const totalPrice = unitPrice * quantity;

  // Handle Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPhoto(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentCustomOptions = {
    color: selectedColor,
    foil: selectedFoil,
    size: selectedSize,
    hook: selectedHook,
    dial: selectedDial,
    customText: customText.trim(),
    uploadedPhoto: uploadedPhoto ? "Custom Photo Attached" : null
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: selectedImg,
      categoryName: product.categoryName,
      quantity,
      customOptions: currentCustomOptions,
      extraAddonsPrice
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    onCheckout();
  };

  const handleWhatsAppInquiry = () => {
    const text = `Namaste Art Alay! I am interested in customizing this piece:
*Product:* ${product.name}
*Price:* ₹${unitPrice.toLocaleString("en-IN")}
*Color:* ${selectedColor || "Standard"}
*Foil:* ${selectedFoil || "Standard"}
${selectedSize ? `*Size:* ${selectedSize}\n` : ""}${customText ? `*Engraved Text:* "${customText}"\n` : ""}
Could you please share details on current curing schedules and dispatch timelines?`;
    window.open(`https://wa.me/919810012345?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="pdp-container container">
      {/* Breadcrumbs */}
      <nav className="pdp-breadcrumbs">
        <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate("home"); }}>Home</a>
        <span>/</span>
        <a href="#catalog" onClick={(e) => { e.preventDefault(); onNavigate("catalog"); }}>Catalog</a>
        <span>/</span>
        <a
          href="#cat"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory(product.category);
            onNavigate("catalog");
          }}
        >
          {product.categoryName || product.category}
        </a>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      {/* Main PDP 2-Column Grid */}
      <div className="pdp-grid">
        {/* Left: Multi-Photo Gallery */}
        <div className="pdp-gallery-wrap">
          <div className="pdp-main-image-wrap">
            <img
              src={selectedImg}
              alt={product.name}
              className="pdp-main-image"
              onError={(e) => {
                e.target.src = DEFAULT_CATEGORY_IMAGES[product.category] || "images/wall-clock.svg";
              }}
            />
            {product.badge && (
              <span className="product-badge badge-bestseller" style={{ top: "1rem", left: "1rem" }}>
                {product.badge}
              </span>
            )}
            <button
              className={`product-wishlist-btn ${inWishlist ? "active" : ""}`}
              style={{ top: "1rem", right: "1rem", width: "42px", height: "42px", fontSize: "1.4rem" }}
              title={inWishlist ? "Remove from wishlist" : "Save to wishlist"}
              onClick={() => toggleWishlist(product.id)}
            >
              {inWishlist ? "♥" : "♡"}
            </button>
          </div>

          {/* Interactive Thumbnails */}
          {images.length > 1 && (
            <div className="pdp-thumbnails-row">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`pdp-thumb-item ${selectedImg === img ? "active" : ""}`}
                  onClick={() => setSelectedImg(img)}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} />
                </div>
              ))}
            </div>
          )}

          {/* Curing & Packaging specs */}
          <div className="pdp-specs-card">
            <h4 className="font-serif" style={{ fontSize: "1.05rem", color: "var(--color-primary-dark)", marginBottom: "0.75rem" }}>
              💎 Handcrafting & Curing Protocol
            </h4>
            <div className="specs-list">
              <div className="spec-row">
                <span className="spec-label">Resin Curing:</span>
                <span className="spec-val">72h multi-layer UV chamber curing</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Dimensions:</span>
                <span className="spec-val">{product.dimensions || "Custom artisan sizing"}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Weight:</span>
                <span className="spec-val">{product.weight || "Lightweight high-density resin"}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Finish:</span>
                <span className="spec-val">Diamond crystal gloss with liquid 24K gold rim</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Safe Packaging:</span>
                <span className="spec-val">Zero-shatter foam lined velvet gift box</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Customization Controls & Actions */}
        <div className="pdp-details-wrap">
          <div className="pdp-category-eyebrow">{product.categoryName || product.category}</div>
          <h1 className="pdp-title font-serif">{product.name}</h1>

          {/* Rating & Social Proof */}
          <div className="pdp-rating-row">
            <div className="stars">★★★★★</div>
            <span style={{ fontWeight: 700, color: "var(--color-primary-dark)" }}>{product.rating || 4.9}</span>
            <span style={{ color: "var(--color-text-muted)" }}>• {product.reviewCount || 42} verified buyer reviews</span>
            <span className="status-pill status-placed" style={{ marginLeft: "auto" }}>In Stock ({product.stock || 12} units)</span>
          </div>

          {/* Pricing */}
          <div className="pdp-price-box">
            <div className="pdp-price-main">
              ₹{unitPrice.toLocaleString("en-IN")}
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="pdp-price-original">₹{product.originalPrice.toLocaleString("en-IN")}</span>
              )}
            </div>
            {extraAddonsPrice > 0 && (
              <div style={{ fontSize: "0.825rem", color: "var(--color-gold-dark)", marginTop: "0.25rem" }}>
                Includes +₹{extraAddonsPrice} for premium palette upgrade
              </div>
            )}
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
              Inclusive of all taxes • Free express shipping across India on orders above ₹999
            </div>
          </div>

          {/* Description */}
          <p className="pdp-description">{product.description}</p>

          {/* ========================================================
              LIVE CUSTOMIZATION CONTROLS
             ======================================================== */}
          <div className="pdp-customization-card">
            <h3 className="custom-section-title font-serif">
              🎨 Personalize Your Artisan Piece
            </h3>

            {/* 1. Color Palette Swatches */}
            {colorPalettes.length > 0 && (
              <div className="custom-group">
                <label className="custom-label">
                  Resin Color Palette: <strong>{selectedColor}</strong>
                  {chosenColorObj?.extraPrice > 0 && (
                    <span style={{ color: "var(--color-gold-dark)", marginLeft: "0.5rem" }}>(+₹{chosenColorObj.extraPrice})</span>
                  )}
                </label>
                <div className="swatches-row">
                  {colorPalettes.map(c => (
                    <button
                      key={c.name}
                      type="button"
                      className={`color-swatch-btn ${selectedColor === c.name ? "active" : ""}`}
                      style={{ background: c.hex || "#c59b63" }}
                      title={`${c.name} ${c.extraPrice ? `(+₹${c.extraPrice})` : ""}`}
                      onClick={() => setSelectedColor(c.name)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* 2. Foil Inclusions */}
            {foilTypes.length > 0 && (
              <div className="custom-group">
                <label className="custom-label">Metallic Foil Inclusions: <strong>{selectedFoil}</strong></label>
                <div className="pills-row">
                  {foilTypes.map(f => (
                    <button
                      key={f}
                      type="button"
                      className={`pill-option-btn ${selectedFoil === f ? "active" : ""}`}
                      onClick={() => setSelectedFoil(f)}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Sizes & Variations */}
            {sizes.length > 0 && (
              <div className="custom-group">
                <label className="custom-label">Size / Diameter: <strong>{selectedSize}</strong></label>
                <div className="pills-row">
                  {sizes.map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`pill-option-btn ${selectedSize === s ? "active" : ""}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Dial Variations (for Clocks) */}
            {dialTypes.length > 0 && (
              <div className="custom-group">
                <label className="custom-label">Dial Typography: <strong>{selectedDial}</strong></label>
                <div className="pills-row">
                  {dialTypes.map(d => (
                    <button
                      key={d}
                      type="button"
                      className={`pill-option-btn ${selectedDial === d ? "active" : ""}`}
                      onClick={() => setSelectedDial(d)}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Live Message / Name Engraving */}
            <div className="custom-group">
              <label className="custom-label">
                Complimentary Inscription / Name Engraving:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 'Vikas & Meenu • 2026' or 'Balewadi Haven'"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={45}
              />
              {/* Instant Live Preview */}
              {customText && (
                <div className="engraving-live-preview">
                  <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textTransform: "uppercase", display: "block", marginBottom: "0.25rem" }}>
                    Live Engraving Preview (Hand-Inscribed in Gold Calligraphy):
                  </span>
                  <div className="engraving-rendered-text font-serif">
                    "{customText}"
                  </div>
                </div>
              )}
            </div>

            {/* 6. Photo Upload for Wedding Varmala / Memorial Keepsakes */}
            {(product.category === "customized-gifts" || product.name.toLowerCase().includes("varmala")) && (
              <div className="custom-group">
                <label className="custom-label">
                  Attach Photo / Wedding Invitation Reference:
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handlePhotoUpload}
                />
                {uploadedPhoto && (
                  <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <img src={uploadedPhoto} alt="Uploaded keepsake preview" style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }} />
                    <span style={{ fontSize: "0.8rem", color: "var(--color-success)", fontWeight: 600 }}>✓ Photo Attached</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Stepper & Action Buttons */}
          <div className="pdp-actions-row">
            {/* Quantity Stepper */}
            <div className="quantity-stepper">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="qty-val">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            {/* Add To Cart */}
            <button
              className="btn btn-primary btn-lg"
              style={{ flex: 1 }}
              onClick={handleAddToCart}
            >
              Add to Bag (₹{totalPrice.toLocaleString("en-IN")})
            </button>

            {/* Buy Now */}
            <button
              className="btn btn-gold btn-lg"
              onClick={handleBuyNow}
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Direct Artisan WhatsApp Inquiry Button */}
          <button
            className="btn btn-whatsapp"
            style={{ width: "100%", marginTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}
            onClick={handleWhatsAppInquiry}
          >
            <span>💬</span>
            <span>Discuss Customization on WhatsApp with Master Artisan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
