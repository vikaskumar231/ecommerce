import React from "react";
import { useStore } from "../context/StoreContext";
import { DEFAULT_CATEGORY_IMAGES } from "../data/initialData";

export const ProductCard = ({ product, onSelectProduct }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  const imgSrc = (product.images && product.images[0])
    ? product.images[0]
    : (DEFAULT_CATEGORY_IMAGES[product.category] || "images/wall-clock.svg");

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      {/* Product Image Container */}
      <div className="product-img-wrap" onClick={() => onSelectProduct(product)}>
        <img
          src={imgSrc}
          alt={product.name}
          className="product-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = DEFAULT_CATEGORY_IMAGES[product.category] || "images/wall-clock.svg";
          }}
        />

        {/* Curation Badge */}
        {product.badge && (
          <span className={`product-badge ${product.badge.toLowerCase().includes("best") ? "badge-bestseller" : "badge-new"}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Toggle */}
        <button
          className={`product-wishlist-btn ${inWishlist ? "active" : ""}`}
          title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
        >
          {inWishlist ? "♥" : "♡"}
        </button>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <div className="product-category-row">
          <span className="product-category-pill">{product.categoryName || product.category}</span>
          <div className="product-rating">
            <span className="star-icon">★</span>
            <span>{product.rating || 4.9}</span>
            <span className="review-cnt">({product.reviewCount || 12})</span>
          </div>
        </div>

        <h3
          className="product-title font-serif"
          onClick={() => onSelectProduct(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Pricing Row */}
        <div className="product-price-row">
          <div className="price-wrap">
            <span className="price-current">₹{(product.price || 0).toLocaleString("en-IN")}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="price-original">₹{product.originalPrice.toLocaleString("en-IN")}</span>
                <span className="price-discount">{discountPercent}% OFF</span>
              </>
            )}
          </div>
        </div>

        {/* Actions Row */}
        <div className="product-card-actions">
          <button
            className="btn btn-secondary btn-sm"
            style={{ flex: 1 }}
            onClick={() => onSelectProduct(product)}
          >
            Customise & Info
          </button>
          <button
            className="btn btn-primary btn-sm"
            title="Add to shopping bag"
            onClick={() => addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: imgSrc,
              categoryName: product.categoryName,
              quantity: 1,
              customOptions: {}
            })}
          >
            + Cart
          </button>
        </div>
      </div>
    </div>
  );
};
