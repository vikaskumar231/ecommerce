import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { DEFAULT_CATEGORY_IMAGES } from "../data/initialData";

export const AdminView = () => {
  const {
    products,
    orders,
    customRequests,
    backendStatus,
    syncWithDatabase,
    addProduct,
    updateProduct,
    updateProductImage,
    deleteProduct,
    resetToLocalImages,
    updateOrderStatus,
    toggleShowOnHome,
    showToast,
    currentUser
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState("dashboard"); // 'dashboard', 'orders', 'custom'

  // Modals state
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (!currentUser?.isAdmin) {
    return (
      <div className="admin-page-layout container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto", padding: "2.5rem 2rem", background: "var(--color-surface)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
          <span style={{ fontSize: "3rem" }}>🔒</span>
          <h2 className="font-serif" style={{ marginTop: "1rem", color: "var(--color-primary-dark)" }}>Access Denied</h2>
          <p style={{ color: "var(--color-text-muted)", margin: "1rem 0" }}>
            This console is reserved strictly for Admin users (Vikas).
          </p>
        </div>
      </div>
    );
  }

  // Add Product Form State
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("wall-clock");
  const [newProdPrice, setNewProdPrice] = useState(2499);
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState(3499);
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdDesc, setNewProdDesc] = useState("");
  const [newProdImg, setNewProdImg] = useState("images/wall-clock.svg");
  const [newProdShowOnHome, setNewProdShowOnHome] = useState(true);

  // Summary Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const activeInCuring = orders.filter(o => o.orderStatus === "Curing" || o.orderStatus === "Resin Poured").length;

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProdName.trim()) return;

    await addProduct({
      name: newProdName.trim(),
      category: newProdCategory,
      categoryName: newProdCategory.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()),
      price: Number(newProdPrice),
      originalPrice: Number(newProdOriginalPrice),
      stock: Number(newProdStock),
      description: newProdDesc.trim(),
      images: [newProdImg],
      badge: "New Arrival",
      showOnHome: newProdShowOnHome,
      isFeatured: newProdShowOnHome,
      isNew: true
    });

    setIsAddModalOpen(false);
    setNewProdName("");
    setNewProdDesc("");
    setNewProdShowOnHome(true);
    showToast("✨ New resin product added to catalog!");
  };

  const handleSaveEditProduct = async () => {
    if (!editingProduct) return;
    await updateProduct(editingProduct.id, {
      name: editingProduct.name,
      price: Number(editingProduct.price),
      originalPrice: Number(editingProduct.originalPrice),
      stock: Number(editingProduct.stock),
      curingTimeDays: editingProduct.curingTimeDays,
      badge: editingProduct.badge,
      showOnHome: Boolean(editingProduct.showOnHome)
    });
    setEditingProduct(null);
    showToast("Product updated successfully!");
  };

  return (
    <div className="admin-page-layout container">
      {/* 1. ARTISAN STUDIO ADMIN BANNER */}
      <div className="admin-architecture-banner">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
            <span className="backend-status-dot pulse-online" style={{ background: "var(--color-gold)" }}></span>
            <strong style={{ color: "#ffffff", fontSize: "1.1rem", letterSpacing: "0.02em" }}>
              Artisan Studio Admin Console
            </strong>
          </div>
          <div style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.85)" }}>
            Atelier Product Catalog ({products.length} items) • Active Orders ({orders.length}) • Custom Requests ({customRequests.length})
          </div>
        </div>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            className="btn btn-outline-gold btn-sm"
            style={{ color: "#ffffff", borderColor: "var(--color-gold-light)" }}
            onClick={async () => {
              showToast("⚡ Refreshing catalog & orders...");
              await syncWithDatabase();
              showToast("✅ Studio Catalog Refreshed!");
            }}
          >
            🔄 Refresh Data
          </button>
        </div>
      </div>

      {/* 2. EXECUTIVE ANALYTICS METRIC CARDS */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-label">Total Revenue</div>
          <div className="admin-stat-val">₹{totalRevenue.toLocaleString("en-IN")}</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-label">Orders Placed</div>
          <div className="admin-stat-val">{orders.length}</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-label">Active in Curing (72h)</div>
          <div className="admin-stat-val" style={{ color: "var(--color-gold-dark)" }}>{activeInCuring}</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-label">Custom Inquiries</div>
          <div className="admin-stat-val" style={{ color: "var(--color-primary)" }}>{customRequests.length}</div>
        </div>
      </div>

      {/* 3. ADMIN NAVIGATION TABS */}
      <div className="admin-tab-nav" style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.75rem" }}>
        <button
          className={`btn ${activeAdminTab === "dashboard" ? "btn-primary" : "btn-secondary"} btn-sm`}
          onClick={() => setActiveAdminTab("dashboard")}
        >
          Product Catalog ({products.length})
        </button>
        <button
          className={`btn ${activeAdminTab === "orders" ? "btn-primary" : "btn-secondary"} btn-sm`}
          onClick={() => setActiveAdminTab("orders")}
        >
          Customer Orders Management ({orders.length})
        </button>
        <button
          className={`btn ${activeAdminTab === "custom" ? "btn-primary" : "btn-secondary"} btn-sm`}
          onClick={() => setActiveAdminTab("custom")}
        >
          Custom Design Requests ({customRequests.length})
        </button>
      </div>

      {/* TAB 1: PRODUCT CATALOG MANAGEMENT */}
      {activeAdminTab === "dashboard" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h3 className="font-serif" style={{ fontSize: "1.35rem", color: "var(--color-primary-dark)", margin: 0 }}>
                Resin Product Catalog Management ({products.length})
              </h3>
              <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
                Update artwork photos locally, adjust prices, or upload custom resin pieces directly to database.
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button
                className="btn btn-outline-gold btn-sm"
                onClick={resetToLocalImages}
                title="Revert all catalog items to local studio SVGs"
              >
                🔄 Reset to Local SVGs
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setIsAddModalOpen(true)}
              >
                + Add New Resin Product
              </button>
            </div>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product & Photo</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Show on Home</th>
                  <th>Badges</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => {
                  const pImg = (p.images && p.images[0]) ? p.images[0] : (DEFAULT_CATEGORY_IMAGES[p.category] || "images/wall-clock.svg");
                  const isHome = Boolean(p.showOnHome);
                  return (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <img
                            src={pImg}
                            alt={p.name}
                            className="admin-product-thumb"
                            style={{ width: "44px", height: "44px", minWidth: "44px", minHeight: "44px", objectFit: "cover", borderRadius: "6px" }}
                            title="Click to edit product"
                            onClick={() => setEditingProduct(p)}
                            onError={(e) => { e.target.src = DEFAULT_CATEGORY_IMAGES[p.category] || "images/wall-clock.svg"; }}
                          />
                          <div>
                            <div style={{ fontWeight: 600, color: "var(--color-primary-dark)", fontSize: "0.875rem" }}>{p.name}</div>
                            <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>ID: {p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="product-category-pill">{p.categoryName || p.category}</span>
                      </td>
                      <td style={{ fontWeight: 700 }}>₹{(p.price || 0).toLocaleString("en-IN")}</td>
                      <td>
                        <button
                          type="button"
                          className={`home-toggle-btn ${isHome ? "active" : "inactive"}`}
                          onClick={() => toggleShowOnHome(p.id)}
                          title={isHome ? "Currently visible on Home Screen. Click to hide." : "Currently hidden from Home Screen. Click to display."}
                        >
                          <span>{isHome ? "✓ Visible on Home" : "✕ Hidden"}</span>
                        </button>
                      </td>
                      <td>
                        {p.badge && <span className="product-badge badge-bestseller" style={{ position: "static", display: "inline-block" }}>{p.badge}</span>}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "0.35rem" }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem" }}
                            onClick={() => setEditingProduct(p)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ padding: "0.25rem 0.5rem", fontSize: "0.75rem", color: "var(--color-error)" }}
                            onClick={() => {
                              if (confirm(`Delete product "${p.name}" from database?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOMER ORDERS MANAGEMENT */}
      {activeAdminTab === "orders" && (
        <div>
          <h3 className="font-serif" style={{ fontSize: "1.35rem", color: "var(--color-primary-dark)", marginBottom: "1rem" }}>
            Customer Orders & Curing Status Updater ({orders.length})
          </h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Lifecycle Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.orderId}>
                    <td>
                      <strong style={{ color: "var(--color-primary-dark)" }}>{order.orderId}</strong>
                      <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                        {new Date(order.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{order.customer?.name || order.username}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>{order.customer?.phone || ""}</div>
                    </td>
                    <td style={{ fontSize: "0.8rem" }}>
                      {(order.items || []).map((it, idx) => (
                        <div key={idx}>• {it.name} (x{it.quantity})</div>
                      ))}
                    </td>
                    <td style={{ fontWeight: 700 }}>₹{(order.total || 0).toLocaleString("en-IN")}</td>
                    <td>
                      <span className="status-pill status-placed" style={{ fontSize: "0.75rem" }}>
                        {order.paymentStatus || "Paid"}
                      </span>
                    </td>
                    <td>
                      <select
                        className="form-control"
                        style={{ width: "auto", padding: "0.3rem 0.6rem", fontSize: "0.8rem", fontWeight: 700 }}
                        value={order.orderStatus}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          updateOrderStatus(order.orderId, newStatus, `Artisan status updated to ${newStatus}`);
                          showToast(`Order ${order.orderId} updated to ${newStatus}!`);
                        }}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Resin Poured">Resin Poured</option>
                        <option value="Curing">Deep Curing (72h)</option>
                        <option value="Polishing">Sanding & Polishing</option>
                        <option value="Shipped">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOM DESIGN REQUESTS */}
      {activeAdminTab === "custom" && (
        <div>
          <h3 className="font-serif" style={{ fontSize: "1.35rem", color: "var(--color-primary-dark)", marginBottom: "1rem" }}>
            Custom Design Requests ({customRequests.length})
          </h3>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Inquiry ID</th>
                  <th>Customer</th>
                  <th>Product Type</th>
                  <th>Dimensions & Palette</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customRequests.map(req => (
                  <tr key={req.id}>
                    <td><strong>{req.id}</strong></td>
                    <td>
                      <div>{req.customerName}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{req.phone}</div>
                    </td>
                    <td>{req.productType}</td>
                    <td style={{ fontSize: "0.8rem" }}>
                      <div>{req.dimensions}</div>
                      <div style={{ color: "var(--color-gold-dark)" }}>{req.colorPalette}</div>
                    </td>
                    <td>
                      <span className="status-pill status-curing">{req.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: EDIT PRODUCT & PHOTO
         ======================================================== */}
      {editingProduct && (
        <div className="modal-overlay active">
          <div className="modal-card" style={{ maxWidth: "560px" }}>
            <div className="modal-header">
              <h3 className="modal-title font-serif">📸 Edit Product Info & Local Photo</h3>
              <button className="modal-close-btn" onClick={() => setEditingProduct(null)}>&times;</button>
            </div>
            <div className="modal-body" style={{ padding: "1.5rem" }}>
              <div className="form-group">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Stock Units</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#fcfaf6", padding: "0.6rem 0.8rem", borderRadius: "6px", border: "1px solid var(--color-border)", marginBottom: "1rem" }}>
                <input
                  type="checkbox"
                  id="editShowOnHome"
                  checked={Boolean(editingProduct.showOnHome)}
                  onChange={(e) => setEditingProduct({ ...editingProduct, showOnHome: e.target.checked })}
                  style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: "var(--color-gold)" }}
                />
                <label htmlFor="editShowOnHome" style={{ margin: 0, cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", color: "var(--color-primary-dark)" }}>
                  Show this creation on Home Screen showcase
                </label>
              </div>

              {/* Local Studio SVG Presets */}
              <div className="form-group">
                <label className="form-label">Local Studio SVG Presets:</label>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                  {[
                    "images/earrings.svg",
                    "images/wall-clock.svg",
                    "images/book-mark.svg",
                    "images/key-chains.svg",
                    "images/toran.svg",
                    "images/shubh-labh.svg",
                    "images/name-plates.svg",
                    "images/coasters.svg",
                    "images/customized-gifts.svg"
                  ].map(preset => (
                    <button
                      key={preset}
                      type="button"
                      className="pill-option-btn"
                      style={{ fontSize: "0.72rem", padding: "0.25rem 0.5rem" }}
                      onClick={() => updateProductImage(editingProduct.id, preset)}
                    >
                      {preset.replace("images/", "").replace(".svg", "")}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
                <button className="btn btn-secondary" onClick={() => setEditingProduct(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSaveEditProduct}>Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD NEW RESIN PRODUCT
         ======================================================== */}
      {isAddModalOpen && (
        <div className="modal-overlay active">
          <div className="modal-card" style={{ maxWidth: "600px" }}>
            <div className="modal-header">
              <h3 className="modal-title font-serif">+ Add New Handcrafted Resin Product</h3>
              <button className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>&times;</button>
            </div>
            <form onSubmit={handleCreateProduct} style={{ padding: "1.5rem" }}>
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Sapphire Dream Geode Clock"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-control"
                    value={newProdCategory}
                    onChange={(e) => {
                      setNewProdCategory(e.target.value);
                      setNewProdImg(`images/${e.target.value}.svg`);
                    }}
                  >
                    <option value="wall-clock">Wall Clock</option>
                    <option value="earrings">Earrings</option>
                    <option value="book-mark">Book Mark</option>
                    <option value="key-chains">Key Chains</option>
                    <option value="toran">Toran</option>
                    <option value="shubh-labh">Shubh Labh</option>
                    <option value="name-plates">Name Plates</option>
                    <option value="coasters">Coasters</option>
                    <option value="customized-gifts">Customized Gifts</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Price (₹) *</label>
                  <input
                    type="number"
                    className="form-control"
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Artisan handcrafting story and materials..."
                  value={newProdDesc}
                  onChange={(e) => setNewProdDesc(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "#fcfaf6", padding: "0.6rem 0.8rem", borderRadius: "6px", border: "1px solid var(--color-border)", marginBottom: "1rem" }}>
                <input
                  type="checkbox"
                  id="addShowOnHome"
                  checked={newProdShowOnHome}
                  onChange={(e) => setNewProdShowOnHome(e.target.checked)}
                  style={{ width: "18px", height: "18px", cursor: "pointer", accentColor: "var(--color-gold)" }}
                />
                <label htmlFor="addShowOnHome" style={{ margin: 0, cursor: "pointer", fontWeight: 600, fontSize: "0.85rem", color: "var(--color-primary-dark)" }}>
                  Show this creation on Home Screen showcase
                </label>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginTop: "1rem" }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create Product in Database</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
