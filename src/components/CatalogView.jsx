import React, { useState, useMemo } from "react";
import { useStore } from "../context/StoreContext";
import { ProductCard } from "./ProductCard";

export const CatalogView = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onClearSearch,
  onSelectProduct
}) => {
  const { products, categories } = useStore();
  const [sortBy, setSortBy] = useState("popular");

  // Filter and sort products
  const displayProducts = useMemo(() => {
    let list = [...products];

    // Filter by Category
    if (activeCategory && activeCategory !== "all") {
      list = list.filter(p => p.category === activeCategory);
    }

    // Filter by Search Query
    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.categoryName && p.categoryName.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default: // popular
        list.sort((a, b) => ((b.isFeatured ? 1 : 0) + (b.isBestseller ? 1 : 0)) - ((a.isFeatured ? 1 : 0) + (a.isBestseller ? 1 : 0)));
        break;
    }

    return list;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <div className="catalog-page-layout container">
      {/* Sidebar Filters */}
      <aside className="catalog-sidebar">
        <h3 className="sidebar-heading font-serif">Categories</h3>
        <div className="cat-filter-list" id="catalogCategoryList">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === "all"
              ? products.length
              : products.filter(p => p.category === cat.id).length;

            return (
              <div
                key={cat.id}
                className={`cat-filter-item ${isActive ? "active" : ""}`}
                onClick={() => onSelectCategory(cat.id)}
              >
                <span>{cat.name}</span>
                <span className="cat-item-count">({count})</span>
              </div>
            );
          })}
        </div>

        {/* Curing & Quality Assurance Box */}
        <div style={{ marginTop: "2rem", padding: "1.25rem", background: "rgba(15, 76, 92, 0.05)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
          <h4 style={{ fontSize: "0.95rem", color: "var(--color-primary)", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span>🌿</span> 100% Artisan Guarantee
          </h4>
          <p style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", lineHeight: 1.5, margin: 0 }}>
            Every resin piece is custom cured for 72 hours, hand-beveled, and bubble-free guaranteed. Direct artisan support on WhatsApp.
          </p>
        </div>
      </aside>

      {/* Main Catalog Content */}
      <main className="catalog-content">
        {/* Controls Bar: Search feedback & Sort */}
        <div className="catalog-controls-bar">
          <div>
            <span style={{ fontWeight: 600, color: "var(--color-primary-dark)" }}>
              Showing {displayProducts.length} Creations
            </span>
            {searchQuery && (
              <span style={{ marginLeft: "0.5rem", color: "var(--color-text-muted)", fontSize: "0.85rem" }}>
                for "<em>{searchQuery}</em>"
                <button
                  style={{ marginLeft: "0.5rem", color: "var(--color-accent-festive)", textDecoration: "underline", fontSize: "0.8rem", cursor: "pointer" }}
                  onClick={onClearSearch}
                >
                  Clear
                </button>
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <label style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>Sort by:</label>
            <select
              className="form-control"
              style={{ width: "auto", padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popular">Recommended & Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {displayProducts.length > 0 ? (
          <div className="products-grid" id="catalogProductsGrid">
            {displayProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "4rem 1rem", background: "#ffffff", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
            <h3 className="font-serif" style={{ color: "var(--color-primary-dark)", marginBottom: "0.5rem" }}>
              No Handcrafted Creations Found
            </h3>
            <p style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
              We couldn't find any items matching your filter. Try clearing your search query or selecting a different category.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                onClearSearch();
                onSelectCategory("all");
              }}
            >
              Reset Filters & Show All
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
