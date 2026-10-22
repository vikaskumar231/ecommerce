/**
 * AuraResin Studio - Master Application Logic
 * Coordinates Views, Modals, Cart, Checkout, PDP, Customizer Wizard, Tracking, Account & Admin
 */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  currentView: "home",
  activeCategory: "all",
  searchQuery: "",
  activeFilterTab: "featured", // 'featured', 'bestseller', 'new', 'festival'
  sortBy: "popular",
  selectedProduct: null,
  activeAdminTab: "dashboard",
  
  // Customizer PDP State
  currentPdpOptions: {
    color: null,
    foil: null,
    size: null,
    customText: "",
    uploadedPhoto: null,
    extraPrice: 0,
    quantity: 1
  },

  // Bespoke Studio State
  bespokeState: {
    step: 1,
    productType: "Wedding Garland Varmala Preservation",
    dimensions: "8-inch Hexagon Block",
    colorPalette: "Emerald & 24K Gold Flakes",
    inclusions: ["24K Gold Foil Flakes", "Natural Dried Botanicals"],
    customText: "",
    uploadedPhoto: null,
    estimatedPrice: 3999,
    customerName: "",
    phone: "",
    email: "",
    notes: ""
  },

  init() {
    this.bindEvents();
    this.updateCounters();
    this.updateHeaderUserChip();
    this.routeFromUrl();
    this.renderView();
    
    // Listen to store updates
    window.addEventListener("aura_store_updated", (e) => {
      this.updateCounters();
      this.updateHeaderUserChip();
      if (this.currentView === "admin") {
        this.renderAdminView();
      }
      if (this.currentView === "catalog") {
        this.renderCatalogGrid();
      }
      if (this.currentView === "home") {
        this.renderHomeProductsGrid();
      }
      if (this.currentView === "pdp") {
        this.renderPdpView();
      }
      if (this.currentView === "account") {
        this.renderAccountView();
      }
      if (this.currentView === "cart") {
        this.renderCartView();
      }
      this.renderCartDrawer();
    });
  },

  bindEvents() {
    // Nav Click handlers (data-view attributes)
    document.querySelectorAll("[data-nav-view]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const view = btn.getAttribute("data-nav-view");
        const cat = btn.getAttribute("data-cat");
        if (cat) this.activeCategory = cat;
        this.navigateTo(view);
      });
    });

    // Header Search
    const searchInput = document.getElementById("headerSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.trim().toLowerCase();
        if (this.searchQuery && this.currentView !== "catalog") {
          this.navigateTo("catalog");
        } else if (this.currentView === "catalog") {
          this.renderCatalogGrid();
        }
      });
    }

    // Cart Drawer Toggle
    const cartToggleBtn = document.getElementById("cartToggleBtn");
    const closeCartDrawerBtn = document.getElementById("closeCartDrawerBtn");
    const cartOverlay = document.getElementById("cartDrawerOverlay");

    if (cartToggleBtn) {
      cartToggleBtn.addEventListener("click", () => this.openCartDrawer());
    }
    if (closeCartDrawerBtn) {
      closeCartDrawerBtn.addEventListener("click", () => this.closeCartDrawer());
    }
    if (cartOverlay) {
      cartOverlay.addEventListener("click", (e) => {
        if (e.target === cartOverlay) this.closeCartDrawer();
      });
    }

    // Floating WhatsApp Button Toggle
    const waFloating = document.getElementById("waFloatingBtn");
    const waPopup = document.getElementById("waQuickPopup");
    const closeWaPopup = document.getElementById("closeWaPopup");

    if (waFloating && waPopup) {
      waFloating.addEventListener("click", () => {
        waPopup.classList.toggle("open");
      });
    }
    if (closeWaPopup && waPopup) {
      closeWaPopup.addEventListener("click", () => {
        waPopup.classList.remove("open");
      });
    }

    // Quick Admin Toggle
    const adminModeBtn = document.getElementById("adminModeBtn");
    if (adminModeBtn) {
      adminModeBtn.addEventListener("click", () => {
        this.navigateTo("admin");
      });
    }
  },

  navigateTo(view, params = {}) {
    this.currentView = view;
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update active nav links
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("data-nav-view") === view) {
        link.classList.add("active");
      }
    });

    if (params.productId) {
      this.selectedProduct = store.getProductById(params.productId);
    }
    if (params.category) {
      this.activeCategory = params.category;
    }

    this.renderView();
  },

  routeFromUrl() {
    const hash = window.location.hash.replace("#", "");
    if (hash.startsWith("product/")) {
      const pid = hash.split("/")[1];
      this.selectedProduct = store.getProductById(pid);
      this.currentView = "pdp";
    } else if (hash.startsWith("catalog")) {
      this.currentView = "catalog";
    } else if (["bespoke", "cart", "checkout", "tracking", "account", "admin"].includes(hash)) {
      this.currentView = hash;
    } else {
      this.currentView = "home";
    }
  },

  renderView() {
    // Hide all view containers
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.style.display = "none";
    });

    const activeContainer = document.getElementById(`view-${this.currentView}`);
    if (activeContainer) {
      activeContainer.style.display = "block";
    }

    // View-specific renderer
    switch (this.currentView) {
      case "home":
        this.renderHomeView();
        break;
      case "catalog":
        this.renderCatalogView();
        break;
      case "pdp":
        this.renderPdpView();
        break;
      case "bespoke":
        this.renderBespokeView();
        break;
      case "cart":
        this.renderCartView();
        break;
      case "checkout":
        this.renderCheckoutView();
        break;
      case "tracking":
        this.renderTrackingView();
        break;
      case "account":
        this.renderAccountView();
        break;
      case "admin":
        this.renderAdminView();
        break;
    }
  },

  updateCounters() {
    const cartCount = store.getCartCount();
    const wishlistCount = store.getWishlist().length;

    const cartCounterEl = document.getElementById("headerCartCount");
    const wishlistCounterEl = document.getElementById("headerWishlistCount");

    if (cartCounterEl) cartCounterEl.textContent = cartCount;
    if (wishlistCounterEl) wishlistCounterEl.textContent = wishlistCount;
  },

  updateHeaderUserChip() {
    const user = store.getCurrentUser();
    const avatarEl = document.getElementById("headerUserAvatar");
    const labelEl = document.getElementById("headerUserLabel");
    if (user) {
      if (avatarEl) {
        avatarEl.textContent = user.avatar || (user.username ? user.username.charAt(0).toUpperCase() : "U");
        avatarEl.style.fontSize = "0.85rem";
      }
      if (labelEl) labelEl.textContent = user.name ? user.name.split(" ")[0] : user.username;
    } else {
      if (avatarEl) { avatarEl.textContent = "👤"; avatarEl.style.fontSize = "1rem"; }
      if (labelEl) labelEl.textContent = "Login";
    }
  },

  showToast(message, type = "success") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast-msg";
    const icon = type === "success" ? "✨" : type === "error" ? "⚠️" : "ℹ️";
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(12px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  // =========================================================================
  // VIEW: HOME
  // =========================================================================
  renderHomeView() {
    // 1. Categories Grid
    const catGrid = document.getElementById("homeCategoriesGrid");
    if (catGrid) {
      const displayCats = INITIAL_CATEGORIES.filter(c => c.id !== "all");
      catGrid.innerHTML = displayCats.map(cat => `
        <div class="category-card" onclick="App.selectCategoryAndGo('${cat.id}')">
          <img src="${cat.image}" alt="${cat.name}" class="category-card-img" loading="lazy" />
          <div class="category-card-overlay">
            <h3 class="category-card-title">${cat.name}</h3>
            <div class="category-card-count">Explore Collection →</div>
          </div>
        </div>
      `).join("");
    }

    // 2. Products Tabs (Featured, Bestsellers, New, Festival)
    this.renderHomeProductsGrid();

    // 3. Customer Reviews Carousel/Grid
    const reviewGrid = document.getElementById("homeReviewsGrid");
    if (reviewGrid) {
      reviewGrid.innerHTML = INITIAL_REVIEWS.map(r => `
        <div class="review-card" style="background:#ffffff; border:1px solid var(--color-border); border-radius:var(--radius-md); padding:1.75rem; box-shadow:var(--shadow-sm);">
          <div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:1rem;">
            <img src="${r.avatar}" alt="${r.author}" style="width:48px; height:48px; border-radius:var(--radius-full); object-fit:cover; border:2px solid var(--color-gold);" />
            <div>
              <div style="font-weight:700; color:var(--color-primary-dark); font-size:0.95rem;">${r.author}</div>
              <div style="font-size:0.775rem; color:var(--color-text-muted);">${r.city} • Verified Buyer</div>
            </div>
          </div>
          <div style="color:#f59e0b; margin-bottom:0.75rem; font-size:0.9rem;">★★★★★</div>
          <p style="font-size:0.875rem; color:var(--color-text-main); font-style:italic; line-height:1.6; margin-bottom:1rem;">"${r.comment}"</p>
          <div style="font-size:0.75rem; font-weight:600; color:var(--color-gold-dark);">Item: ${r.product}</div>
        </div>
      `).join("");
    }
  },

  renderHomeProductsGrid() {
    const grid = document.getElementById("homeProductsGrid");
    if (!grid) return;

    const allProducts = store.getProducts();
    let filtered = [];

    switch (this.activeFilterTab) {
      case "featured":
        filtered = allProducts.filter(p => p.isFeatured);
        break;
      case "bestseller":
        filtered = allProducts.filter(p => p.isBestseller);
        break;
      case "new":
        filtered = allProducts.filter(p => p.isNew);
        break;
      case "festival":
        filtered = allProducts.filter(p => p.isFestival);
        break;
      default:
        filtered = allProducts.slice(0, 8);
    }

    if (filtered.length === 0) {
      filtered = allProducts.slice(0, 8);
    }

    grid.innerHTML = filtered.slice(0, 8).map(p => this.createProductCardHtml(p)).join("");
  },

  setHomeFilterTab(tabName, event) {
    this.activeFilterTab = tabName;
    document.querySelectorAll(".home-filter-btn").forEach(btn => btn.classList.remove("active"));
    if (event && event.currentTarget) {
      event.currentTarget.classList.add("active");
    }
    this.renderHomeProductsGrid();
  },

  selectCategoryAndGo(catId) {
    this.activeCategory = catId;
    this.navigateTo("catalog");
  },

  // =========================================================================
  // VIEW: CATALOG / SHOP
  // =========================================================================
  renderCatalogView() {
    // 1. Render Category Sidebar Filters
    const sidebar = document.getElementById("catalogCategoryList");
    if (sidebar) {
      sidebar.innerHTML = INITIAL_CATEGORIES.map(cat => {
        const isActive = this.activeCategory === cat.id;
        const productsCount = cat.id === "all" 
          ? store.getProducts().length 
          : store.getProducts().filter(p => p.category === cat.id).length;
        return `
          <div class="cat-filter-item ${isActive ? 'active' : ''}" onclick="App.filterCatalogByCategory('${cat.id}')">
            <span>${cat.name}</span>
            <span class="cat-item-count">(${productsCount})</span>
          </div>
        `;
      }).join("");
    }

    // 2. Render Products
    this.renderCatalogGrid();
  },

  filterCatalogByCategory(catId) {
    this.activeCategory = catId;
    this.renderCatalogView();
  },

  renderCatalogGrid() {
    const grid = document.getElementById("catalogProductsGrid");
    const countEl = document.getElementById("catalogProductsCount");
    if (!grid) return;

    let products = store.getProducts();

    // Filter by Category
    if (this.activeCategory && this.activeCategory !== "all") {
      products = products.filter(p => p.category === this.activeCategory);
    }

    // Filter by Search Query
    if (this.searchQuery) {
      const q = this.searchQuery;
      products = products.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q)
      );
    }

    // Sort Products
    const sortSelect = document.getElementById("catalogSortSelect");
    const currentSort = sortSelect ? sortSelect.value : this.sortBy;

    if (currentSort === "price-low") {
      products.sort((a, b) => a.price - b.price);
    } else if (currentSort === "price-high") {
      products.sort((a, b) => b.price - a.price);
    } else if (currentSort === "rating") {
      products.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: Popular/Bestseller priority
      products.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    if (countEl) {
      countEl.textContent = `Showing ${products.length} handcrafted items`;
    }

    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 4rem 1rem;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🎨</div>
          <h3 style="font-size: 1.5rem; color:var(--color-primary-dark); margin-bottom: 0.5rem;">No resin items found</h3>
          <p style="color:var(--color-text-muted); margin-bottom: 1.5rem;">Try clearing your search query or selecting another category.</p>
          <button class="btn btn-primary" onclick="App.resetCatalogFilters()">View All Products</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = products.map(p => this.createProductCardHtml(p)).join("");
  },

  resetCatalogFilters() {
    this.activeCategory = "all";
    this.searchQuery = "";
    const searchInput = document.getElementById("headerSearchInput");
    if (searchInput) searchInput.value = "";
    this.renderCatalogView();
  },

  // =========================================================================
  // VIEW: PRODUCT DETAIL PAGE (PDP)
  // =========================================================================
  renderPdpView() {
    if (!this.selectedProduct) {
      this.selectedProduct = store.getProducts()[0];
    }
    const p = this.selectedProduct;
    const container = document.getElementById("view-pdp");
    if (!container) return;

    // Reset PDP customization options to product defaults
    const defaultColor = p.customizationOptions?.colorPalette ? p.customizationOptions.colorPalette[0].name : null;
    const defaultFoil = p.customizationOptions?.foilTypes ? p.customizationOptions.foilTypes[0] : null;
    const defaultSize = p.customizationOptions?.sizes ? p.customizationOptions.sizes[0] : null;

    this.currentPdpOptions = {
      color: defaultColor,
      foil: defaultFoil,
      size: defaultSize,
      customText: "",
      uploadedPhoto: null,
      extraPrice: 0,
      quantity: 1
    };

    container.innerHTML = `
      <div class="container pdp-container">
        <!-- Breadcrumb -->
        <div class="pdp-breadcrumb">
          <a href="#" onclick="App.navigateTo('home'); return false;">Home</a> / 
          <a href="#" onclick="App.selectCategoryAndGo('${p.category}'); return false;">${p.categoryName}</a> / 
          <span style="color:var(--color-primary-dark); font-weight:600;">${p.name}</span>
        </div>

        <div class="pdp-grid">
          <!-- Gallery Column -->
          <div class="pdp-gallery">
            <div class="pdp-main-image-wrap">
              <img id="pdpMainImg" src="${p.images[0]}" alt="${p.name}" class="pdp-main-image" />
              ${p.badge ? `<span class="product-badge badge-bestseller">${p.badge}</span>` : ''}
            </div>
            <div class="pdp-thumbnails-row">
              ${p.images.map((img, idx) => `
                <div class="pdp-thumb-btn ${idx === 0 ? 'active' : ''}" onclick="App.changePdpImage('${img}', this)">
                  <img src="${img}" alt="${p.name} thumbnail" class="pdp-thumb-img" />
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Product Info & Customization Controls -->
          <div class="pdp-info-col">
            <span class="product-cat-name">${p.categoryName}</span>
            <h1 class="pdp-title">${p.name}</h1>
            
            <div class="pdp-rating-strip">
              <div class="star-icons-wrap">★★★★★</div>
              <span style="font-weight:700; color:var(--color-primary-dark);">${p.rating}</span>
              <span style="color:var(--color-text-muted);">(${p.reviewCount} customer reviews)</span>
              <span style="color:var(--color-success); font-weight:600; margin-left:auto;">● In Stock (${p.stock} units)</span>
            </div>

            <!-- Price Box -->
            <div class="pdp-price-box">
              <span class="pdp-live-price" id="pdpCalculatedPrice">₹${p.price.toLocaleString("en-IN")}</span>
              ${p.originalPrice ? `<span class="original-price">₹${p.originalPrice.toLocaleString("en-IN")}</span>` : ''}
              <span class="discount-tag">Save ₹${(p.originalPrice - p.price).toLocaleString("en-IN")}</span>
              <span class="pdp-tax-notice">(Includes all GST & Handcrafting)</span>
            </div>

            <p style="color:var(--color-text-main); line-height:1.7; margin-bottom:1.5rem;">${p.description}</p>

            <!-- Interactive Customization Controls -->
            <div class="customization-box">
              <div class="customization-title">
                <span>✨ Personalize Your Handmade Piece</span>
              </div>

              <!-- Color Palette -->
              ${p.customizationOptions?.colorPalette ? `
                <div class="option-group">
                  <div class="option-label">
                    <span>1. Select Color Theme:</span>
                    <span class="option-selected-val" id="pdpSelectedColorName">${defaultColor}</span>
                  </div>
                  <div class="swatch-picker">
                    ${p.customizationOptions.colorPalette.map((c, i) => `
                      <button 
                        class="swatch-btn ${i === 0 ? 'active' : ''}" 
                        style="background-color: ${c.hex};" 
                        title="${c.name} (+₹${c.extraPrice})"
                        onclick="App.updatePdpColor('${c.name}', ${c.extraPrice}, this)">
                      </button>
                    `).join("")}
                  </div>
                </div>
              ` : ''}

              <!-- Foil Flakes / Inclusions -->
              ${p.customizationOptions?.foilTypes ? `
                <div class="option-group">
                  <div class="option-label">
                    <span>2. Inclusion / Foil Accent:</span>
                    <span class="option-selected-val" id="pdpSelectedFoilName">${defaultFoil}</span>
                  </div>
                  <div class="pill-picker">
                    ${p.customizationOptions.foilTypes.map((f, i) => `
                      <button 
                        class="pill-option-btn ${i === 0 ? 'active' : ''}" 
                        onclick="App.updatePdpFoil('${f}', this)">
                        ${f}
                      </button>
                    `).join("")}
                  </div>
                </div>
              ` : ''}

              <!-- Size Variation -->
              ${p.customizationOptions?.sizes ? `
                <div class="option-group">
                  <div class="option-label">
                    <span>3. Size / Dimensions:</span>
                    <span class="option-selected-val" id="pdpSelectedSizeName">${defaultSize}</span>
                  </div>
                  <div class="pill-picker">
                    ${p.customizationOptions.sizes.map((s, i) => `
                      <button 
                        class="pill-option-btn ${i === 0 ? 'active' : ''}" 
                        onclick="App.updatePdpSize('${s}', this)">
                        ${s}
                      </button>
                    `).join("")}
                  </div>
                </div>
              ` : ''}

              <!-- Custom Text Engraving -->
              ${p.customizationOptions?.allowCustomText ? `
                <div class="option-group">
                  <div class="option-label">
                    <span>4. Engrave Custom Name / Message:</span>
                    <span style="font-size:0.75rem; color:var(--color-text-muted);">Complimentary</span>
                  </div>
                  <input 
                    type="text" 
                    class="custom-text-input" 
                    id="pdpCustomTextInput" 
                    placeholder="${p.customizationOptions.textPlaceholder || 'Enter your custom text'}"
                    oninput="App.updatePdpCustomText(this.value)"
                  />
                  <div class="live-custom-preview-card" id="pdpTextLivePreview">
                    Preview: <strong style="color:var(--color-primary); font-family:var(--font-serif);">${p.name}</strong> with customized text: <em>None yet</em>
                  </div>
                </div>
              ` : ''}

              <!-- Photo Upload (if supported) -->
              ${p.customizationOptions?.allowPhotoUpload ? `
                <div class="option-group">
                  <div class="option-label">
                    <span>5. Upload Keepsake Photo:</span>
                    <span style="font-size:0.75rem; color:var(--color-gold-dark);">High-Res JPG/PNG</span>
                  </div>
                  <input type="file" accept="image/*" onchange="App.handlePdpPhotoUpload(event)" style="font-size:0.85rem;" />
                  <div id="pdpPhotoPreviewBox" style="margin-top:0.5rem; display:none;">
                    <img id="pdpUploadedImgThumb" src="" style="width:70px; height:70px; object-fit:cover; border-radius:var(--radius-sm); border:1px solid var(--color-border);" />
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- Add to Cart & Buy Now Action Row -->
            <div class="pdp-actions-row">
              <div class="quantity-stepper">
                <button class="qty-btn" onclick="App.adjustPdpQty(-1)">-</button>
                <span class="qty-val" id="pdpQtyVal">1</span>
                <button class="qty-btn" onclick="App.adjustPdpQty(1)">+</button>
              </div>
              <button class="btn btn-primary btn-lg" style="flex-grow:1;" onclick="App.addCurrentPdpToCart()">
                🛒 Add to Cart
              </button>
              <button class="btn btn-gold btn-lg" onclick="App.buyNowCurrentPdp()">
                ⚡ Buy Now
              </button>
            </div>

            <!-- Direct WhatsApp Order Button -->
            <button class="btn btn-whatsapp btn-lg" style="width:100%; margin-bottom:1.5rem;" onclick="App.orderCurrentProductOnWhatsApp()">
              💬 Order / Customize directly on WhatsApp
            </button>

            <!-- Handcrafting Specs & Curing Notice -->
            <div class="pdp-specs-grid">
              <div>
                <div class="spec-item-label">Curing & Production</div>
                <div class="spec-item-val">${p.curingTimeDays || '3-4 business days'}</div>
              </div>
              <div>
                <div class="spec-item-label">Dimensions</div>
                <div class="spec-item-val">${p.dimensions || 'Standard Artisan Handcrafted'}</div>
              </div>
              <div>
                <div class="spec-item-label">Material</div>
                <div class="spec-item-val">Crystal Epoxy Resin + UV Blocker</div>
              </div>
              <div>
                <div class="spec-item-label">Shipping</div>
                <div class="spec-item-val">Free All-India Delivery above ₹999</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `;
  },

  changePdpImage(src, btn) {
    const mainImg = document.getElementById("pdpMainImg");
    if (mainImg) mainImg.src = src;
    document.querySelectorAll(".pdp-thumb-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
  },

  updatePdpColor(name, extraPrice, btn) {
    this.currentPdpOptions.color = name;
    this.currentPdpOptions.extraPrice = extraPrice;
    const nameEl = document.getElementById("pdpSelectedColorName");
    if (nameEl) nameEl.textContent = name + (extraPrice > 0 ? ` (+₹${extraPrice})` : '');
    document.querySelectorAll(".swatch-btn").forEach(b => b.classList.remove("active"));
    if (btn) btn.classList.add("active");
    this.recalculatePdpPrice();
  },

  updatePdpFoil(foil, btn) {
    this.currentPdpOptions.foil = foil;
    const nameEl = document.getElementById("pdpSelectedFoilName");
    if (nameEl) nameEl.textContent = foil;
    document.querySelectorAll(".pill-picker .pill-option-btn").forEach(b => {
      if (b.parentNode === btn.parentNode) b.classList.remove("active");
    });
    if (btn) btn.classList.add("active");
  },

  updatePdpSize(size, btn) {
    this.currentPdpOptions.size = size;
    const nameEl = document.getElementById("pdpSelectedSizeName");
    if (nameEl) nameEl.textContent = size;
    btn.parentNode.querySelectorAll(".pill-option-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  },

  updatePdpCustomText(text) {
    this.currentPdpOptions.customText = text;
    const previewEl = document.getElementById("pdpTextLivePreview");
    if (previewEl) {
      previewEl.innerHTML = text.trim() 
        ? `Preview: Personalized with <strong style="color:var(--color-primary); font-family:var(--font-serif); font-size:1rem;">"${text}"</strong>`
        : `Preview: Personalized with <em>None yet</em>`;
    }
  },

  handlePdpPhotoUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      this.currentPdpOptions.uploadedPhoto = event.target.result;
      const previewBox = document.getElementById("pdpPhotoPreviewBox");
      const thumb = document.getElementById("pdpUploadedImgThumb");
      if (previewBox && thumb) {
        thumb.src = event.target.result;
        previewBox.style.display = "block";
      }
    };
    reader.readAsDataURL(file);
  },

  adjustPdpQty(delta) {
    let q = (this.currentPdpOptions.quantity || 1) + delta;
    if (q < 1) q = 1;
    this.currentPdpOptions.quantity = q;
    const qtyVal = document.getElementById("pdpQtyVal");
    if (qtyVal) qtyVal.textContent = q;
    this.recalculatePdpPrice();
  },

  recalculatePdpPrice() {
    if (!this.selectedProduct) return;
    const basePrice = this.selectedProduct.price;
    const extra = this.currentPdpOptions.extraPrice || 0;
    const unitPrice = basePrice + extra;
    const total = unitPrice * (this.currentPdpOptions.quantity || 1);
    
    const priceEl = document.getElementById("pdpCalculatedPrice");
    if (priceEl) {
      priceEl.textContent = `₹${total.toLocaleString("en-IN")}`;
    }
  },

  addCurrentPdpToCart() {
    if (!this.selectedProduct) return;
    store.addToCart({
      id: this.selectedProduct.id,
      name: this.selectedProduct.name,
      price: this.selectedProduct.price,
      originalPrice: this.selectedProduct.originalPrice,
      image: this.selectedProduct.images[0],
      categoryName: this.selectedProduct.categoryName,
      quantity: this.currentPdpOptions.quantity || 1,
      extraAddonsPrice: this.currentPdpOptions.extraPrice || 0,
      customOptions: {
        color: this.currentPdpOptions.color,
        foil: this.currentPdpOptions.foil,
        size: this.currentPdpOptions.size,
        customText: this.currentPdpOptions.customText,
        hasPhoto: !!this.currentPdpOptions.uploadedPhoto
      }
    });

    this.showToast(`Added "${this.selectedProduct.name}" to cart!`);
    this.openCartDrawer();
  },

  buyNowCurrentPdp() {
    this.addCurrentPdpToCart();
    this.closeCartDrawer();
    this.navigateTo("checkout");
  },

  orderCurrentProductOnWhatsApp() {
    if (!this.selectedProduct) return;
    const p = this.selectedProduct;
    const opts = this.currentPdpOptions;
    
    let msg = `*Hi Art आलय (Art Alay) Studio!* 🎨\nI want to order this customized resin creation:\n\n`;
    msg += `*Product:* ${p.name}\n`;
    msg += `*Price:* ₹${p.price + (opts.extraPrice || 0)}\n`;
    if (opts.color) msg += `*Color Theme:* ${opts.color}\n`;
    if (opts.foil) msg += `*Inclusions / Foil:* ${opts.foil}\n`;
    if (opts.size) msg += `*Size:* ${opts.size}\n`;
    if (opts.customText) msg += `*Custom Text:* "${opts.customText}"\n`;
    msg += `*Quantity:* ${opts.quantity || 1}\n\n`;
    msg += `Please confirm availability and share payment details. Thank you!`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919876543210?text=${encoded}`, "_blank");
  },

  // =========================================================================
  // VIEW: BESPOKE RESIN STUDIO (CUSTOMIZATION WIZARD)
  // =========================================================================
  renderBespokeView() {
    this.renderBespokeStep(this.bespokeState.step);
  },

  renderBespokeStep(step) {
    this.bespokeState.step = step;
    
    // Update step indicator
    for (let i = 1; i <= 5; i++) {
      const node = document.getElementById(`wizardStepNode-${i}`);
      if (node) {
        node.classList.remove("active", "completed");
        if (i === step) node.classList.add("active");
        if (i < step) node.classList.add("completed");
      }
    }

    // Panels
    for (let i = 1; i <= 5; i++) {
      const panel = document.getElementById(`wizardStepPanel-${i}`);
      if (panel) {
        panel.classList.remove("active");
        if (i === step) panel.classList.add("active");
      }
    }

    // If on Step 5 (Summary), populate final values
    if (step === 5) {
      const summaryBox = document.getElementById("bespokeSummaryBox");
      if (summaryBox) {
        summaryBox.innerHTML = `
          <div style="background:#fdfaf6; border:1px solid var(--color-border-gold); border-radius:var(--radius-md); padding:1.5rem; margin-bottom:1.5rem;">
            <h4 style="font-size:1.15rem; color:var(--color-primary-dark); margin-bottom:1rem;">Your Custom Creation Blueprint</h4>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; font-size:0.9rem;">
              <div><strong>Creation Type:</strong> ${this.bespokeState.productType}</div>
              <div><strong>Dimensions:</strong> ${this.bespokeState.dimensions}</div>
              <div><strong>Pigment Palette:</strong> ${this.bespokeState.colorPalette}</div>
              <div><strong>Inclusions:</strong> ${this.bespokeState.inclusions.join(", ")}</div>
              <div><strong>Personalized Text:</strong> ${this.bespokeState.customText || "None"}</div>
              <div><strong>Photo Uploaded:</strong> ${this.bespokeState.uploadedPhoto ? "Yes (Included)" : "No"}</div>
            </div>
            <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px dashed var(--color-border-gold); display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:1rem; font-weight:700;">Estimated Artisan Quote:</span>
              <span style="font-size:1.5rem; font-weight:800; color:var(--color-primary);">₹${this.bespokeState.estimatedPrice.toLocaleString("en-IN")}</span>
            </div>
          </div>
        `;
      }
    }
  },

  setBespokeType(type, price, el) {
    this.bespokeState.productType = type;
    this.bespokeState.estimatedPrice = price;
    document.querySelectorAll("#wizardStepPanel-1 .selection-tile").forEach(t => t.classList.remove("selected"));
    if (el) el.classList.add("selected");
  },

  setBespokeDimensions(dim, extraPrice, el) {
    this.bespokeState.dimensions = dim;
    document.querySelectorAll("#wizardStepPanel-2 .selection-tile").forEach(t => t.classList.remove("selected"));
    if (el) el.classList.add("selected");
  },

  setBespokePalette(palette, el) {
    this.bespokeState.colorPalette = palette;
    document.querySelectorAll("#wizardStepPanel-3 .selection-tile").forEach(t => t.classList.remove("selected"));
    if (el) el.classList.add("selected");
  },

  toggleBespokeInclusion(inclusion, el) {
    const list = this.bespokeState.inclusions;
    const idx = list.indexOf(inclusion);
    if (idx > -1) {
      list.splice(idx, 1);
      el.classList.remove("selected");
    } else {
      list.push(inclusion);
      el.classList.add("selected");
    }
  },

  handleBespokePhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      this.bespokeState.uploadedPhoto = event.target.result;
      const preview = document.getElementById("bespokePhotoPreview");
      if (preview) {
        preview.src = event.target.result;
        preview.style.display = "block";
      }
    };
    reader.readAsDataURL(file);
  },

  submitBespokeRequest(actionType) {
    const name = document.getElementById("bespokeCustomerName")?.value.trim();
    const phone = document.getElementById("bespokeCustomerPhone")?.value.trim();
    const email = document.getElementById("bespokeCustomerEmail")?.value.trim();
    const notes = document.getElementById("bespokeCustomerNotes")?.value.trim();

    if (!name || !phone) {
      alert("Please provide your name and WhatsApp phone number so our artisan can send your quote!");
      return;
    }

    const customReq = store.addCustomRequest({
      customerName: name,
      phone: phone,
      email: email,
      productType: this.bespokeState.productType,
      dimensions: this.bespokeState.dimensions,
      colorPalette: this.bespokeState.colorPalette,
      inclusions: this.bespokeState.inclusions.join(", "),
      customText: this.bespokeState.customText,
      estimatedBudget: `₹${this.bespokeState.estimatedPrice}`,
      notes: notes
    });

    if (actionType === "whatsapp") {
      let waMsg = `*New Bespoke Custom Order Request (${customReq.id})*\n\n`;
      waMsg += `*Name:* ${name}\n`;
      waMsg += `*Phone:* ${phone}\n`;
      waMsg += `*Product:* ${this.bespokeState.productType}\n`;
      waMsg += `*Dimensions:* ${this.bespokeState.dimensions}\n`;
      waMsg += `*Palette:* ${this.bespokeState.colorPalette}\n`;
      waMsg += `*Inclusions:* ${this.bespokeState.inclusions.join(", ")}\n`;
      if (this.bespokeState.customText) waMsg += `*Custom Text:* "${this.bespokeState.customText}"\n`;
      if (notes) waMsg += `*Notes:* ${notes}\n`;
      waMsg += `*Est. Budget:* ₹${this.bespokeState.estimatedPrice}\n`;

      const encoded = encodeURIComponent(waMsg);
      window.open(`https://wa.me/919876543210?text=${encoded}`, "_blank");
    }

    this.showToast(`Custom order request ${customReq.id} submitted! Our artisan will contact you on WhatsApp.`);
    this.navigateTo("account");
  },

  // =========================================================================
  // VIEW: CART (DRAWER & FULL PAGE)
  // =========================================================================
  openCartDrawer() {
    const overlay = document.getElementById("cartDrawerOverlay");
    if (overlay) {
      overlay.classList.add("open");
      this.renderCartDrawer();
    }
  },

  closeCartDrawer() {
    const overlay = document.getElementById("cartDrawerOverlay");
    if (overlay) overlay.classList.remove("open");
  },

  renderCartDrawer() {
    const listEl = document.getElementById("cartDrawerItemsList");
    const totals = store.getCartTotals();
    const cart = store.getCart();

    // Free shipping progress meter
    const shippingMeter = document.getElementById("freeShippingMeter");
    const shippingText = document.getElementById("freeShippingText");
    if (shippingMeter && shippingText) {
      if (totals.shipping === 0) {
        shippingMeter.style.width = "100%";
        shippingText.innerHTML = `🎉 <strong>Congratulations! You unlocked FREE Express Delivery!</strong>`;
      } else {
        const percent = Math.min(100, Math.round(((totals.subtotal - totals.discount) / totals.freeShippingThreshold) * 100));
        shippingMeter.style.width = `${percent}%`;
        shippingText.innerHTML = `🚚 Add <strong>₹${totals.freeShippingRemaining}</strong> more for <strong>FREE Delivery</strong>`;
      }
    }

    // Breakdown
    const subtotalEl = document.getElementById("cartDrawerSubtotal");
    const discountEl = document.getElementById("cartDrawerDiscount");
    const shippingEl = document.getElementById("cartDrawerShipping");
    const totalEl = document.getElementById("cartDrawerTotal");

    if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal.toLocaleString("en-IN")}`;
    if (discountEl) discountEl.textContent = `-₹${totals.discount.toLocaleString("en-IN")}`;
    if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? "FREE" : `₹${totals.shipping}`;
    if (totalEl) totalEl.textContent = `₹${totals.total.toLocaleString("en-IN")}`;

    if (!listEl) return;

    if (cart.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding:3rem 1rem;">
          <div style="font-size:3rem; margin-bottom:1rem;">🧺</div>
          <h4 style="font-size:1.15rem; color:var(--color-primary-dark); margin-bottom:0.5rem;">Your Cart is Empty</h4>
          <p style="font-size:0.85rem; color:var(--color-text-muted); margin-bottom:1.5rem;">Explore our resin collections and add handcrafted pieces.</p>
          <button class="btn btn-primary" onclick="App.closeCartDrawer(); App.navigateTo('catalog');">Start Shopping</button>
        </div>
      `;
      return;
    }

    listEl.innerHTML = cart.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-custom-tags">
            ${item.customOptions.color ? `<span class="cart-item-custom-pill">🎨 Color: ${item.customOptions.color}</span>` : ''}
            ${item.customOptions.foil ? `<span class="cart-item-custom-pill">✨ Foil: ${item.customOptions.foil}</span>` : ''}
            ${item.customOptions.size ? `<span class="cart-item-custom-pill">📐 Size: ${item.customOptions.size}</span>` : ''}
            ${item.customOptions.customText ? `<span class="cart-item-custom-pill">✍️ "${item.customOptions.customText}"</span>` : ''}
          </div>
          <div class="cart-item-price-row">
            <span style="font-weight:700; color:var(--color-primary-dark);">₹${(item.price + (item.extraAddonsPrice || 0)) * item.quantity}</span>
            <div class="quantity-stepper" style="height:32px;">
              <button class="qty-btn" style="height:30px; width:28px;" onclick="store.updateCartQuantity('${item.cartItemId}', ${item.quantity - 1})">-</button>
              <span class="qty-val" style="font-size:0.85rem;">${item.quantity}</span>
              <button class="qty-btn" style="height:30px; width:28px;" onclick="store.updateCartQuantity('${item.cartItemId}', ${item.quantity + 1})">+</button>
            </div>
            <button onclick="store.removeFromCart('${item.cartItemId}')" style="color:var(--color-text-light); font-size:1.1rem; padding:0 0.4rem;">×</button>
          </div>
        </div>
      </div>
    `).join("");
  },

  applyCouponCode() {
    const input = document.getElementById("cartCouponInput");
    if (!input) return;
    const res = store.applyCoupon(input.value);
    this.showToast(res.message, res.success ? "success" : "error");
    if (res.success) {
      input.value = "";
    }
  },

  renderCartView() {
    this.renderCartDrawer();
  },

  // =========================================================================
  // VIEW: CHECKOUT
  // =========================================================================
  renderCheckoutView() {
    const cart = store.getCart();
    const totals = store.getCartTotals();
    const user = store.getUser();

    if (cart.length === 0) {
      this.navigateTo("cart");
      return;
    }

    // Pre-fill user data
    if (user) {
      const nameEl = document.getElementById("checkoutName");
      const phoneEl = document.getElementById("checkoutPhone");
      const emailEl = document.getElementById("checkoutEmail");
      const addrEl = document.getElementById("checkoutAddress");
      const cityEl = document.getElementById("checkoutCity");
      const stateEl = document.getElementById("checkoutState");
      const pinEl = document.getElementById("checkoutPin");

      if (nameEl) nameEl.value = user.name || "";
      if (phoneEl) phoneEl.value = user.phone || "";
      if (emailEl) emailEl.value = user.email || "";
      if (addrEl) addrEl.value = user.address || "";
      if (cityEl) cityEl.value = user.city || "";
      if (stateEl) stateEl.value = user.state || "";
      if (pinEl) pinEl.value = user.pincode || "";
    }

    // Render Order Review items
    const reviewList = document.getElementById("checkoutReviewItems");
    if (reviewList) {
      reviewList.innerHTML = cart.map(item => `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem; font-size:0.875rem;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <img src="${item.image}" style="width:40px; height:40px; border-radius:4px; object-fit:cover;" />
            <div>
              <div style="font-weight:600; color:var(--color-primary-dark);">${item.name}</div>
              <div style="font-size:0.75rem; color:var(--color-text-muted);">Qty: ${item.quantity} ${item.customOptions.customText ? `• "${item.customOptions.customText}"` : ''}</div>
            </div>
          </div>
          <span style="font-weight:700;">₹${(item.price + (item.extraAddonsPrice || 0)) * item.quantity}</span>
        </div>
      `).join("");
    }

    // Update Totals
    const subtotalEl = document.getElementById("checkoutSubtotal");
    const discountEl = document.getElementById("checkoutDiscount");
    const shippingEl = document.getElementById("checkoutShipping");
    const totalEl = document.getElementById("checkoutTotal");

    if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal.toLocaleString("en-IN")}`;
    if (discountEl) discountEl.textContent = `-₹${totals.discount.toLocaleString("en-IN")}`;
    if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? "FREE" : `₹${totals.shipping}`;
    if (totalEl) totalEl.textContent = `₹${totals.total.toLocaleString("en-IN")}`;
  },

  processCheckout() {
    const name = document.getElementById("checkoutName")?.value.trim();
    const phone = document.getElementById("checkoutPhone")?.value.trim();
    const email = document.getElementById("checkoutEmail")?.value.trim();
    const address = document.getElementById("checkoutAddress")?.value.trim();
    const city = document.getElementById("checkoutCity")?.value.trim();
    const state = document.getElementById("checkoutState")?.value.trim();
    const pincode = document.getElementById("checkoutPin")?.value.trim();

    if (!name || !phone || !address || !pincode) {
      alert("Please complete all shipping address fields.");
      return;
    }

    // Save user info
    store.updateUser({ name, phone, email, address, city, state, pincode });

    // Open realistic Payment Simulator Modal
    this.openPaymentGatewayModal({
      name, phone, email, address, city, state, pincode
    });
  },

  // =========================================================================
  // VIEW: PAYMENT GATEWAY SIMULATION MODAL
  // =========================================================================
  openPaymentGatewayModal(customerInfo) {
    const modal = document.getElementById("paymentModalOverlay");
    const totals = store.getCartTotals();
    const amountEl = document.getElementById("modalPaymentAmount");
    
    if (amountEl) amountEl.textContent = `₹${totals.total.toLocaleString("en-IN")}`;
    if (modal) {
      modal.classList.add("active");
      this.pendingOrderCustomer = customerInfo;
    }
  },

  closePaymentGatewayModal() {
    const modal = document.getElementById("paymentModalOverlay");
    if (modal) modal.classList.remove("active");
  },

  simulatePaymentSuccess(paymentMethod) {
    const modalBody = document.querySelector(".payment-modal-body");
    if (modalBody) {
      modalBody.innerHTML = `
        <div style="text-align:center; padding: 2rem 1rem;">
          <div style="font-size:3.5rem; animation: pulsePing 1.5s infinite;">⏳</div>
          <h3 style="font-size:1.35rem; color:var(--color-primary-dark); margin:1rem 0 0.5rem;">Verifying Payment with Bank</h3>
          <p style="color:var(--color-text-muted); font-size:0.875rem;">Securing transaction via 256-bit encryption...</p>
        </div>
      `;
    }

    setTimeout(() => {
      const cart = store.getCart();
      const totals = store.getCartTotals();

      const newOrder = store.createOrder({
        customer: this.pendingOrderCustomer,
        items: cart,
        subtotal: totals.subtotal,
        discount: totals.discount,
        shipping: totals.shipping,
        total: totals.total,
        paymentMethod: paymentMethod || "UPI Payment"
      });

      this.closePaymentGatewayModal();
      this.showToast(`🎉 Order ${newOrder.orderId} Placed Successfully!`);
      
      // Auto navigate to Order Tracking
      this.activeTrackingOrderId = newOrder.orderId;
      this.navigateTo("tracking");
    }, 2200);
  },

  // =========================================================================
  // VIEW: ORDER TRACKING
  // =========================================================================
  renderTrackingView() {
    const user = store.getCurrentUser();
    const searchInput = document.getElementById("trackingSearchInput");
    const quickLinksWrap = document.getElementById("trackingQuickLinksWrap");

    // Populate quick links with user's own orders
    if (quickLinksWrap) {
      if (user) {
        const myOrders = store.getOrdersForCurrentUser();
        if (myOrders.length > 0) {
          quickLinksWrap.innerHTML = `
            <span style="font-weight:600; color:var(--color-primary-dark);">My Orders:</span>
            ${myOrders.map(o => `
              <button class="btn btn-secondary btn-sm" onclick="App.displayOrderTrackingDetails('${o.orderId}')">
                ${o.orderId} (${o.orderStatus})
              </button>
            `).join("")}
          `;
        } else {
          quickLinksWrap.innerHTML = `<span>No orders yet — browse our catalog to place your first order!</span>`;
        }
      } else {
        quickLinksWrap.innerHTML = `<span><button class="btn btn-secondary btn-sm" onclick="App.openLoginModal()">Sign in to see your orders</button></span>`;
      }
    }

    if (this.activeTrackingOrderId && searchInput) {
      searchInput.value = this.activeTrackingOrderId;
    }

    const orderIdToSearch = this.activeTrackingOrderId || (searchInput ? searchInput.value.trim() : "");
    if (orderIdToSearch) {
      this.displayOrderTrackingDetails(orderIdToSearch);
    } else if (user) {
      const myOrders = store.getOrdersForCurrentUser();
      if (myOrders.length > 0) {
        this.displayOrderTrackingDetails(myOrders[0].orderId);
      }
    }
  },

  searchOrderTracking() {
    const searchInput = document.getElementById("trackingSearchInput");
    if (!searchInput || !searchInput.value.trim()) {
      alert("Please enter a valid Order ID (e.g. ORD-RESIN-98421)");
      return;
    }
    this.displayOrderTrackingDetails(searchInput.value.trim());
  },

  displayOrderTrackingDetails(orderId) {
    const detailsContainer = document.getElementById("trackingResultContainer");
    if (!detailsContainer) return;

    const order = store.getOrderById(orderId);
    if (!order) {
      detailsContainer.innerHTML = `
        <div style="text-align:center; padding:3rem; background:#ffffff; border-radius:var(--radius-md); border:1px solid var(--color-border);">
          <div style="font-size:3rem; margin-bottom:1rem;">🔍</div>
          <h3 style="font-size:1.35rem; color:var(--color-primary-dark); margin-bottom:0.5rem;">Order Not Found</h3>
          <p style="color:var(--color-text-muted);">Could not find order matching <strong>"${orderId}"</strong>. Try <code>ORD-RESIN-98421</code> or check your Account.</p>
        </div>
      `;
      return;
    }

    const steps = order.trackingSteps || [];

    detailsContainer.innerHTML = `
      <div class="tracking-timeline-box">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid var(--color-border); padding-bottom:1.5rem; margin-bottom:1.5rem; flex-wrap:wrap; gap:1rem;">
          <div>
            <span class="status-pill status-${order.orderStatus.toLowerCase()}" style="margin-bottom:0.5rem;">${order.orderStatus}</span>
            <h3 style="font-size:1.5rem; color:var(--color-primary-dark);">${order.orderId}</h3>
            <div style="font-size:0.85rem; color:var(--color-text-muted);">Placed on: ${new Date(order.placedAt).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.8rem; color:var(--color-text-muted);">Courier Tracking (Delhivery / BlueDart)</div>
            <div style="font-weight:700; color:var(--color-primary); font-size:1.05rem;">${order.trackingNumber || 'EXP-889210'}</div>
            <div style="font-size:0.8rem; color:var(--color-success); font-weight:600;">● Insured Fragile Delivery</div>
          </div>
        </div>

        <!-- Visual Milestone Stages -->
        <h4 style="font-size:1.1rem; color:var(--color-primary-dark); margin-bottom:1.25rem;">Artisan Crafting & Curing Progress</h4>
        <div class="tracking-steps-list">
          ${steps.map(step => `
            <div class="tracking-step-item ${step.completed ? 'completed' : ''} ${step.active ? 'active' : ''}">
              <div class="step-marker-dot">${step.completed ? '✓' : ''}</div>
              <div class="step-details-wrap">
                <div class="step-title">${step.status}</div>
                <div class="step-date">${step.date}</div>
                <div class="step-note">${step.note}</div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Order Items Summary in Tracker -->
        <div style="margin-top:2.5rem; padding-top:1.5rem; border-top:1px solid var(--color-border);">
          <h4 style="font-size:1.05rem; color:var(--color-primary-dark); margin-bottom:1rem;">Handmade Items in this Order</h4>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${(order.items || []).map(item => `
              <div style="display:flex; align-items:center; justify-content:space-between; background:#faf8f5; padding:0.85rem 1.25rem; border-radius:var(--radius-sm);">
                <div style="display:flex; align-items:center; gap:0.85rem;">
                  <img src="${item.image}" style="width:48px; height:48px; border-radius:4px; object-fit:cover;" />
                  <div>
                    <div style="font-weight:700; font-size:0.9rem; color:var(--color-primary-dark);">${item.name}</div>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">
                      Qty: ${item.quantity} ${item.customOptions?.color ? `• Color: ${item.customOptions.color}` : ''} ${item.customOptions?.customText ? `• Text: "${item.customOptions.customText}"` : ''}
                    </div>
                  </div>
                </div>
                <div style="font-weight:700; color:var(--color-primary);">₹${item.price * item.quantity}</div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Help Banner -->
        <div style="margin-top:2rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:var(--radius-md); padding:1rem 1.25rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
          <div style="font-size:0.85rem; color:#166534;">
            <strong>Need to modify your customization details?</strong> Chat with our resin artisan right now.
          </div>
          <button class="btn btn-whatsapp btn-sm" onclick="window.open('https://wa.me/919876543210?text=Hi%20Artisan,%20inquiring%20about%20Order%20${order.orderId}', '_blank')">
            WhatsApp Artisan
          </button>
        </div>
      </div>
    `;
  },

  // =========================================================================
  // VIEW: USER ACCOUNT
  // =========================================================================
  renderAccountView() {
    const user = store.getCurrentUser();
    if (!user) {
      // Not logged in: show login prompt inside account view
      const nameEl = document.getElementById("accountUserName");
      const emailEl = document.getElementById("accountUserEmail");
      const avatarEl = document.getElementById("accountAvatarLetter");
      const joinedEl = document.getElementById("accountJoinedDate");
      if (nameEl) nameEl.textContent = "Guest User";
      if (emailEl) emailEl.textContent = "Please sign in";
      if (avatarEl) avatarEl.textContent = "👤";
      if (joinedEl) joinedEl.textContent = "";

      const contentBox = document.getElementById("accountContentArea");
      if (contentBox) {
        contentBox.innerHTML = `
          <div style="text-align:center; padding:4rem 1rem;">
            <div style="font-size:4rem; margin-bottom:1rem;">🔐</div>
            <h3 style="font-size:1.5rem; color:var(--color-primary-dark); margin-bottom:0.5rem;">Please Sign In</h3>
            <p style="color:var(--color-text-muted); margin-bottom:1.5rem;">You need to be logged in to view your orders and wishlist.</p>
            <button class="btn btn-primary btn-lg" onclick="App.openLoginModal()">
              Sign In to My Account
            </button>
          </div>
        `;
      }
      return;
    }

    const nameEl = document.getElementById("accountUserName");
    const emailEl = document.getElementById("accountUserEmail");
    const avatarEl = document.getElementById("accountAvatarLetter");
    const joinedEl = document.getElementById("accountJoinedDate");
    if (nameEl) nameEl.textContent = user.name || user.username;
    if (emailEl) emailEl.textContent = user.email || "";
    if (avatarEl) avatarEl.textContent = user.avatar || user.username.charAt(0).toUpperCase();
    if (joinedEl) joinedEl.textContent = user.joinedDate ? `Member since ${user.joinedDate}` : "";

    this.renderAccountTab("orders");
  },

  renderAccountTab(tabName) {
    document.querySelectorAll(".account-nav-btn").forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-account-tab="${tabName}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    const contentBox = document.getElementById("accountContentArea");
    if (!contentBox) return;

    const user = store.getCurrentUser();
    if (!user) {
      contentBox.innerHTML = `<div style="text-align:center; padding:3rem 1rem;"><p>Please <button class="btn btn-primary btn-sm" onclick="App.openLoginModal()">Sign In</button> to see your data.</p></div>`;
      return;
    }

    if (tabName === "orders") {
      const orders = store.getOrdersForCurrentUser();
      contentBox.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; flex-wrap:wrap; gap:0.5rem;">
          <h3 style="font-size:1.35rem; color:var(--color-primary-dark);">My Handcrafted Orders (${orders.length})</h3>
        </div>
        <div style="display:flex; flex-direction:column; gap:1.25rem;">
          ${orders.length === 0 ? `
            <div style="text-align:center; padding:3rem 1rem; background:#ffffff; border-radius:var(--radius-md); border:1px solid var(--color-border);">
              <div style="font-size:3rem; margin-bottom:1rem;">📦</div>
              <p style="color:var(--color-text-muted);">No orders yet! Browse our collection to place your first custom resin order.</p>
              <button class="btn btn-primary" style="margin-top:1rem;" onclick="App.navigateTo('catalog')">Shop Now</button>
            </div>
          ` : orders.map(order => `
            <div style="border:1px solid var(--color-border); border-radius:var(--radius-md); padding:1.5rem; background:#ffffff;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1rem; border-bottom:1px solid var(--color-border-subtle); padding-bottom:1rem; flex-wrap:wrap; gap:0.5rem;">
                <div>
                  <div style="font-weight:700; color:var(--color-primary-dark); font-size:1.1rem;">${order.orderId}</div>
                  <div style="font-size:0.8rem; color:var(--color-text-muted);">Placed on ${new Date(order.placedAt).toLocaleDateString("en-IN", { day:'numeric', month:'short', year:'numeric' })}</div>
                </div>
                <div style="text-align:right;">
                  <span class="status-pill status-${order.orderStatus.toLowerCase().replace(/ /g,'-')}">${order.orderStatus}</span>
                  <div style="font-weight:800; color:var(--color-primary); font-size:1.15rem; margin-top:0.25rem;">₹${order.total.toLocaleString("en-IN")}</div>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:0.6rem; margin-bottom:1.25rem;">
                ${(order.items || []).map(i => `
                  <div style="display:flex; align-items:center; gap:0.75rem; font-size:0.875rem;">
                    <img src="${i.image}" style="width:36px; height:36px; border-radius:4px; object-fit:cover;" />
                    <span style="font-weight:600;">${i.name} (x${i.quantity})</span>
                    ${i.customOptions?.customText ? `<span style="color:var(--color-gold-dark); font-size:0.75rem;">[Custom: ${i.customOptions.customText}]</span>` : (i.selectedOptions?.customText ? `<span style="color:var(--color-gold-dark); font-size:0.75rem;">[Custom: ${i.selectedOptions.customText}]</span>` : '')}
                  </div>
                `).join("")}
              </div>
              <div style="display:flex; gap:0.75rem; justify-content:flex-end;">
                <button class="btn btn-secondary btn-sm" onclick="App.activeTrackingOrderId='${order.orderId}'; App.navigateTo('tracking');">
                  Track Curing & Delivery →
                </button>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    } else if (tabName === "wishlist") {
      const wishlistIds = store.getWishlist();
      const allProducts = store.getProducts();
      const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id));

      contentBox.innerHTML = `
        <h3 style="font-size:1.35rem; color:var(--color-primary-dark); margin-bottom:1.5rem;">Saved to Wishlist (${wishlistProducts.length})</h3>
        ${wishlistProducts.length === 0 ? `
          <div style="text-align:center; padding:3rem 1rem;">
            <div style="font-size:3rem; margin-bottom:1rem;">💖</div>
            <p style="color:var(--color-text-muted);">You haven't saved any handcrafted resin items yet.</p>
            <button class="btn btn-primary" style="margin-top:1rem;" onclick="App.navigateTo('catalog')">Browse Creations</button>
          </div>
        ` : `
          <div class="products-grid">
            ${wishlistProducts.map(p => this.createProductCardHtml(p)).join("")}
          </div>
        `}
      `;
    } else if (tabName === "bespoke") {
      const requests = store.getCustomRequestsForCurrentUser();
      contentBox.innerHTML = `
        <h3 style="font-size:1.35rem; color:var(--color-primary-dark); margin-bottom:1.5rem;">My Bespoke Custom Inquiries (${requests.length})</h3>
        ${requests.length === 0 ? `
          <div style="text-align:center; padding:3rem 1rem;">
            <div style="font-size:3rem; margin-bottom:1rem;">🎨</div>
            <p style="color:var(--color-text-muted);">No bespoke requests yet. Use the Custom Studio to create a unique piece!</p>
            <button class="btn btn-primary" style="margin-top:1rem;" onclick="App.navigateTo('bespoke')">Open Custom Studio</button>
          </div>
        ` : `
          <div style="display:flex; flex-direction:column; gap:1.25rem;">
            ${requests.map(req => `
              <div style="border:1px solid var(--color-border); border-radius:var(--radius-md); padding:1.5rem; background:#ffffff;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
                  <div style="font-weight:700; color:var(--color-primary-dark); font-size:1.05rem;">${req.productType}</div>
                  <span class="status-pill status-curing">${req.status}</span>
                </div>
                <div style="font-size:0.85rem; color:var(--color-text-muted); line-height:1.6; margin-bottom:1rem;">
                  ${req.dimensions ? `<div><strong>Dimensions:</strong> ${req.dimensions}</div>` : ''}
                  ${req.colorPalette ? `<div><strong>Pigment Palette:</strong> ${req.colorPalette}</div>` : ''}
                  ${req.inclusions ? `<div><strong>Inclusions:</strong> ${req.inclusions}</div>` : ''}
                  ${req.customText ? `<div><strong>Text:</strong> "${req.customText}"</div>` : ''}
                  ${req.notes ? `<div><strong>Notes:</strong> ${req.notes}</div>` : ''}
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span style="font-weight:700; color:var(--color-primary);">Budget: ${req.estimatedBudget || 'TBD'}</span>
                  <button class="btn btn-whatsapp btn-sm" onclick="window.open('https://wa.me/919876543210?text=Hi%20Artisan,%20following%20up%20on%20my%20inquiry%20${req.id}', '_blank')">
                    Follow Up on WhatsApp
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      `;
    } else if (tabName === "profile") {
      contentBox.innerHTML = `
        <h3 style="font-size:1.35rem; color:var(--color-primary-dark); margin-bottom:1.5rem;">My Profile & Delivery Address</h3>
        <div style="background:#ffffff; border:1px solid var(--color-border); border-radius:var(--radius-md); padding:1.75rem;">
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">Full Name</label>
              <input type="text" id="profileName" class="form-control" value="${user.name || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Username</label>
              <input type="text" class="form-control" value="${user.username}" disabled style="opacity:0.6;" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" id="profileEmail" class="form-control" value="${user.email || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label">Mobile Number</label>
            <input type="tel" id="profilePhone" class="form-control" value="${user.phone || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label">Delivery Address</label>
            <input type="text" id="profileAddress" class="form-control" value="${user.address || ''}" />
          </div>
          <div class="form-grid-2">
            <div class="form-group">
              <label class="form-label">City</label>
              <input type="text" id="profileCity" class="form-control" value="${user.city || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">State</label>
              <input type="text" id="profileState" class="form-control" value="${user.state || ''}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">PIN Code</label>
            <input type="text" id="profilePincode" class="form-control" value="${user.pincode || ''}" style="max-width:180px;" />
          </div>
          <div style="margin-top:1.5rem;">
            <button class="btn btn-primary" onclick="App.saveProfileDetails()">💾 Save Profile</button>
          </div>
        </div>
      `;
    }
  },

  saveProfileDetails() {
    const name = document.getElementById("profileName")?.value.trim();
    const email = document.getElementById("profileEmail")?.value.trim();
    const phone = document.getElementById("profilePhone")?.value.trim();
    const address = document.getElementById("profileAddress")?.value.trim();
    const city = document.getElementById("profileCity")?.value.trim();
    const state = document.getElementById("profileState")?.value.trim();
    const pincode = document.getElementById("profilePincode")?.value.trim();

    store.updateUser({ name, email, phone, address, city, state, pincode });
    this.showToast("✅ Profile updated successfully!");
    this.renderAccountView();
  },

  // =========================================================================
  // VIEW: ADMIN PORTAL (PRODUCT & ORDER MANAGEMENT)
  // =========================================================================
  renderAdminView() {
    this.renderAdminTab(this.activeAdminTab);
  },

  renderAdminTab(tabName) {
    this.activeAdminTab = tabName;
    document.querySelectorAll(".admin-nav-btn").forEach(b => b.classList.remove("btn-primary"));
    const activeBtn = document.querySelector(`[data-admin-tab="${tabName}"]`);
    if (activeBtn) activeBtn.classList.add("btn-primary");

    const contentBox = document.getElementById("adminContentArea");
    if (!contentBox) return;

    const products = store.getProducts();
    const orders = store.getOrders();
    const requests = store.getCustomRequests();

    // Summary Metric Cards
    const totalRev = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const inCuring = orders.filter(o => o.orderStatus === "Curing" || o.orderStatus === "Resin Poured").length;

    const statsHeader = `
      <div class="admin-stats-grid">
        <div class="admin-stat-card">
          <div style="font-size:0.8rem; color:var(--color-text-muted); text-transform:uppercase; font-weight:700;">Total Revenue</div>
          <div class="admin-stat-val">₹${totalRev.toLocaleString("en-IN")}</div>
        </div>
        <div class="admin-stat-card">
          <div style="font-size:0.8rem; color:var(--color-text-muted); text-transform:uppercase; font-weight:700;">Orders Placed</div>
          <div class="admin-stat-val">${orders.length}</div>
        </div>
        <div class="admin-stat-card">
          <div style="font-size:0.8rem; color:var(--color-text-muted); text-transform:uppercase; font-weight:700;">Active in Curing (72h)</div>
          <div class="admin-stat-val" style="color:var(--color-gold-dark);">${inCuring}</div>
        </div>
        <div class="admin-stat-card">
          <div style="font-size:0.8rem; color:var(--color-text-muted); text-transform:uppercase; font-weight:700;">Bespoke Inquiries</div>
          <div class="admin-stat-val" style="color:var(--color-primary);">${requests.length}</div>
        </div>
      </div>
    `;

    if (tabName === "dashboard" || tabName === "products") {
      contentBox.innerHTML = `
        ${statsHeader}
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem; flex-wrap:wrap; gap:1rem;">
          <div>
            <h3 style="font-size:1.35rem; color:var(--color-primary-dark);">Resin Product Catalog Management (${products.length})</h3>
            <div style="font-size:0.8rem; color:var(--color-text-muted);">Update photos locally, adjust prices, or upload custom resin artwork.</div>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="btn btn-outline-gold btn-sm" onclick="App.resetToLocalImages()" title="Revert all catalog items to local studio SVGs">
              🔄 Reset to Local SVGs
            </button>
            <button class="btn btn-primary btn-sm" onclick="App.openAddProductModal()">
              + Add New Resin Product
            </button>
          </div>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Product & Local Photo</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Curing Cycle</th>
                <th>Badges</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(p => `
                <tr>
                  <td>
                    <div style="display:flex; align-items:center; gap:0.75rem;">
                      <div class="product-img-thumb-btn" onclick="App.openEditProductModal('${p.id}')" title="Click to update image">
                        <img src="${p.images[0]}" alt="${p.name}" />
                        <span class="product-img-badge-overlay">📸</span>
                      </div>
                      <div>
                        <div style="font-weight:600; max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.name}</div>
                        <button style="font-size:0.725rem; color:var(--color-primary); font-weight:600; text-decoration:underline;" onclick="App.openEditProductModal('${p.id}')">
                          Change Photo
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>${p.categoryName}</td>
                  <td><strong>₹${p.price}</strong></td>
                  <td>${p.stock} units</td>
                  <td>${p.curingTimeDays || '3 days'}</td>
                  <td>
                    ${p.isBestseller ? '<span class="status-pill status-polishing">Bestseller</span> ' : ''}
                    ${p.isFestival ? '<span class="status-pill status-curing">Festival</span>' : ''}
                  </td>
                  <td>
                    <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
                      <button class="btn btn-primary btn-sm" onclick="App.openEditProductModal('${p.id}')" title="Upload local image or edit details">
                        📸 Edit Photo & Info
                      </button>
                      <button class="btn btn-secondary btn-sm" onclick="App.quickEditProductPrice('${p.id}', ${p.price})">Price</button>
                      <button class="btn btn-sm" style="color:#ef4444;" onclick="if(confirm('Delete product?')) store.deleteProduct('${p.id}');">Delete</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    } else if (tabName === "orders") {
      contentBox.innerHTML = `
        ${statsHeader}
        <h3 style="font-size:1.35rem; color:var(--color-primary-dark); margin-bottom:1.25rem;">Live Customer Orders & Curing Status</h3>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items & Customizations</th>
                <th>Total</th>
                <th>Current Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr>
                  <td>
                    <strong>${o.orderId}</strong>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">${new Date(o.placedAt).toLocaleDateString("en-IN")}</div>
                  </td>
                  <td>
                    <div style="font-weight:600;">${o.customer?.name}</div>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">${o.customer?.phone}</div>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">${o.customer?.city}</div>
                  </td>
                  <td>
                    ${(o.items || []).map(i => `
                      <div style="font-size:0.8rem; margin-bottom:0.25rem;">
                        <strong>${i.name} (x${i.quantity})</strong>
                        ${i.customOptions?.customText ? `<span style="color:var(--color-gold-dark); display:block;">✍️ Custom: "${i.customOptions.customText}"</span>` : ''}
                      </div>
                    `).join("")}
                  </td>
                  <td><strong>₹${o.total}</strong></td>
                  <td><span class="status-pill status-${o.orderStatus.toLowerCase()}">${o.orderStatus}</span></td>
                  <td>
                    <select onchange="store.updateOrderStatus('${o.orderId}', this.value); App.showToast('Order status updated!');" style="padding:0.35rem 0.6rem; border-radius:4px; font-size:0.8rem; border:1px solid var(--color-border);">
                      <option value="Placed" ${o.orderStatus === 'Placed' ? 'selected' : ''}>Placed</option>
                      <option value="Resin Poured" ${o.orderStatus === 'Resin Poured' ? 'selected' : ''}>Resin Poured</option>
                      <option value="Curing" ${o.orderStatus === 'Curing' ? 'selected' : ''}>Curing (72h)</option>
                      <option value="Polishing" ${o.orderStatus === 'Polishing' ? 'selected' : ''}>Polishing & Beveling</option>
                      <option value="Shipped" ${o.orderStatus === 'Shipped' ? 'selected' : ''}>Shipped</option>
                      <option value="Delivered" ${o.orderStatus === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    } else if (tabName === "requests") {
      contentBox.innerHTML = `
        ${statsHeader}
        <h3 style="font-size:1.35rem; color:var(--color-primary-dark); margin-bottom:1.25rem;">Customer Bespoke Requests & Wedding Garland Inquiries</h3>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Customer</th>
                <th>Product Type & Dimensions</th>
                <th>Specifications</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Direct Reply</th>
              </tr>
            </thead>
            <tbody>
              ${requests.map(r => `
                <tr>
                  <td><strong>${r.id}</strong></td>
                  <td>
                    <div style="font-weight:600;">${r.customerName}</div>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">${r.phone}</div>
                  </td>
                  <td>
                    <strong>${r.productType}</strong>
                    <div style="font-size:0.75rem; color:var(--color-text-muted);">${r.dimensions}</div>
                  </td>
                  <td style="font-size:0.8rem;">
                    <div>Palette: ${r.colorPalette}</div>
                    <div>Inclusions: ${r.inclusions}</div>
                    ${r.customText ? `<div>Text: "${r.customText}"</div>` : ''}
                  </td>
                  <td><strong>${r.estimatedBudget}</strong></td>
                  <td><span class="status-pill status-curing">${r.status}</span></td>
                  <td>
                    <button class="btn btn-whatsapp btn-sm" onclick="window.open('https://wa.me/${r.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(r.customerName)},%20this%20is%20Art%20आलय%20Studio%20regarding%20your%20bespoke%20request%20${r.id}', '_blank')">
                      Reply WhatsApp
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }
  },

  openEditProductModal(productId) {
    const prod = store.getProductById(productId);
    if (!prod) return;

    this.currentEditingProductId = productId;
    this.currentEditingImgData = prod.images && prod.images.length > 0 ? prod.images[0] : "";

    const idInput = document.getElementById("editProductId");
    const nameInput = document.getElementById("editProductName");
    const priceInput = document.getElementById("editProductPrice");
    const stockInput = document.getElementById("editProductStock");
    const badgeSelect = document.getElementById("editProductBadge");
    const pathInput = document.getElementById("editProductPathInput");
    const preview = document.getElementById("editProductImgPreview");
    const info = document.getElementById("editProductImgInfo");
    const fileInput = document.getElementById("editProductFileInput");

    if (idInput) idInput.value = prod.id;
    if (nameInput) nameInput.value = prod.name;
    if (priceInput) priceInput.value = prod.price;
    if (stockInput) stockInput.value = prod.stock || 10;
    if (badgeSelect) badgeSelect.value = prod.badge || "";
    if (pathInput) pathInput.value = this.currentEditingImgData;
    if (preview) preview.src = this.currentEditingImgData;
    if (info) info.textContent = `Current image: ${this.currentEditingImgData.substring(0, 45)}...`;
    if (fileInput) fileInput.value = "";

    const modal = document.getElementById("editProductModalOverlay");
    if (modal) modal.classList.add("active");
  },

  closeEditProductModal() {
    const modal = document.getElementById("editProductModalOverlay");
    if (modal) modal.classList.remove("active");
  },

  handleAdminImageFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const preview = document.getElementById("editProductImgPreview");
      const pathInput = document.getElementById("editProductPathInput");
      const info = document.getElementById("editProductImgInfo");

      if (preview) preview.src = dataUrl;
      if (pathInput) pathInput.value = dataUrl;
      if (info) info.innerHTML = `<span style="color:var(--color-success); font-weight:700;">✓ Ready to save:</span> ${file.name} (${Math.round(file.size / 1024)} KB)`;
      
      this.currentEditingImgData = dataUrl;
    };
    reader.readAsDataURL(file);
  },

  handleAdminImagePathInput(val) {
    const preview = document.getElementById("editProductImgPreview");
    const info = document.getElementById("editProductImgInfo");
    if (val.trim()) {
      if (preview) preview.src = val.trim();
      if (info) info.textContent = `Previewing: ${val.trim()}`;
      this.currentEditingImgData = val.trim();
    }
  },

  setEditProductPresetImage(path) {
    const preview = document.getElementById("editProductImgPreview");
    const pathInput = document.getElementById("editProductPathInput");
    const info = document.getElementById("editProductImgInfo");

    if (preview) preview.src = path;
    if (pathInput) pathInput.value = path;
    if (info) info.innerHTML = `<span style="color:var(--color-gold-dark); font-weight:700;">Studio Artwork:</span> ${path}`;

    this.currentEditingImgData = path;
  },

  saveProductEdit() {
    const id = document.getElementById("editProductId")?.value;
    const name = document.getElementById("editProductName")?.value.trim();
    const price = parseInt(document.getElementById("editProductPrice")?.value, 10);
    const stock = parseInt(document.getElementById("editProductStock")?.value, 10);
    const badge = document.getElementById("editProductBadge")?.value;
    const newImg = this.currentEditingImgData || document.getElementById("editProductPathInput")?.value.trim();

    if (!id) return;
    const prod = store.getProductById(id);
    if (!prod) return;

    const updatedImages = prod.images ? [...prod.images] : [];
    if (newImg) {
      updatedImages[0] = newImg;
    }

    store.updateProduct(id, {
      name: name || prod.name,
      price: !isNaN(price) ? price : prod.price,
      stock: !isNaN(stock) ? stock : prod.stock,
      badge: badge,
      isBestseller: badge === "Bestseller",
      isNew: badge === "New Arrival",
      isFestival: badge === "Festival Spl",
      images: updatedImages
    });

    this.closeEditProductModal();
    this.showToast(`✨ Updated "${name || prod.name}"! Image is now live in catalog.`);
    this.renderAdminView();
  },

  resetToLocalImages() {
    if (confirm("Reset all catalog products to use local SVG images?")) {
      store.resetToLocalDefaultImages();
      this.showToast("All products reset to local SVG images!");
      this.renderAdminView();
    }
  },

  openAddProductModal() {
    const title = prompt("Enter Product Name:");
    if (!title) return;
    const cat = prompt("Enter Category (earrings, wall-clock, book-mark, key-chains, toran, shubh-labh, name-plates, coasters, customized-gifts):", "wall-clock");
    const price = parseInt(prompt("Enter Price in ₹:", "1999"), 10) || 1999;
    const img = prompt("Enter Local Image Path (e.g. images/wall-clock.svg):", `images/${cat || 'wall-clock'}.svg`) || `images/${cat || 'wall-clock'}.svg`;

    const catObj = INITIAL_CATEGORIES.find(c => c.id === cat) || { name: "Handcrafted Resin" };

    store.addProduct({
      name: title,
      category: cat,
      categoryName: catObj.name,
      price: price,
      originalPrice: Math.round(price * 1.35),
      images: [img],
      description: "Hand-poured artisan resin product crafted with optical-grade crystal epoxy, vibrant pigments, and UV-resistant gloss.",
      stock: 10,
      curingTimeDays: "3-4 days",
      customizationOptions: {
        colorPalette: [
          { name: "Ocean Teal & Gold", hex: "#0a9396", extraPrice: 0 },
          { name: "Emerald & 24K Gold", hex: "#1b4332", extraPrice: 0 }
        ],
        foilTypes: ["24K Gold Flakes", "Silver Leaf"],
        allowCustomText: true
      }
    });

    this.showToast(`Product "${title}" added to catalog!`);
    this.renderAdminView();
  },

  quickEditProductPrice(id, currentPrice) {
    const newPrice = prompt(`Enter new price for product (Current: ₹${currentPrice}):`, currentPrice);
    if (newPrice && !isNaN(newPrice)) {
      store.updateProduct(id, { price: parseInt(newPrice, 10) });
      this.showToast("Price updated successfully!");
      this.renderAdminView();
    }
  },

  // =========================================================================
  // HELPER: HTML GENERATOR FOR PRODUCT CARD
  // =========================================================================
  createProductCardHtml(p) {
    const isWishlisted = store.isInWishlist(p.id);
    const badgeClass = p.isBestseller ? 'badge-bestseller' : p.isNew ? 'badge-new' : p.isFestival ? 'badge-festival' : 'badge-trending';

    return `
      <div class="product-card" data-product-id="${p.id}">
        <div class="product-img-wrapper" onclick="App.navigateTo('pdp', { productId: '${p.id}' })">
          <img src="${p.images[0]}" alt="${p.name}" class="product-img" loading="lazy" />
          ${p.badge ? `<span class="product-badge ${badgeClass}">${p.badge}</span>` : ''}
          <div class="product-quick-actions" onclick="event.stopPropagation();">
            <button class="card-action-btn ${isWishlisted ? 'active-wishlist' : ''}" title="Save to Wishlist" onclick="App.toggleProductWishlist('${p.id}', this)">
              ♥
            </button>
          </div>
        </div>
        <div class="product-card-body">
          <span class="product-cat-name">${p.categoryName}</span>
          <h4 class="product-card-title" onclick="App.navigateTo('pdp', { productId: '${p.id}' })">${p.name}</h4>
          <div class="product-rating-row">
            <span class="star-icons-wrap">★★★★★</span>
            <span style="font-weight:700;">${p.rating}</span>
            <span>(${p.reviewCount})</span>
          </div>
          <div class="product-price-row">
            <span class="current-price">₹${p.price.toLocaleString("en-IN")}</span>
            ${p.originalPrice ? `<span class="original-price">₹${p.originalPrice.toLocaleString("en-IN")}</span>` : ''}
            <span class="discount-tag">${Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% off</span>
          </div>
          <div class="product-card-footer">
            <button class="btn btn-card-add" onclick="App.quickAddToCart('${p.id}')">
              <span>+ Add to Cart</span>
            </button>
            <button class="btn btn-card-whatsapp" title="Order on WhatsApp" onclick="App.quickWhatsAppOrder('${p.id}')">
              💬
            </button>
          </div>
        </div>
      </div>
    `;
  },

  toggleProductWishlist(productId, btn) {
    const added = store.toggleWishlist(productId);
    if (btn) {
      btn.classList.toggle("active-wishlist", added);
    }
    this.showToast(added ? "Saved to Wishlist ❤️" : "Removed from Wishlist");
  },

  quickAddToCart(productId) {
    const product = store.getProductById(productId);
    if (!product) return;
    store.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      categoryName: product.categoryName,
      quantity: 1,
      customOptions: {
        color: product.customizationOptions?.colorPalette ? product.customizationOptions.colorPalette[0].name : "Standard",
        foil: product.customizationOptions?.foilTypes ? product.customizationOptions.foilTypes[0] : "Standard"
      }
    });
    this.showToast(`Added "${product.name}" to cart!`);
    this.openCartDrawer();
  },

  quickWhatsAppOrder(productId) {
    const product = store.getProductById(productId);
    if (!product) return;
    const msg = `*Hi Art आलय (Art Alay) Studio!* 🎨\nI want to order: *${product.name}* (Price: ₹${product.price}).\nPlease guide me on customizations & shipping.`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, "_blank");
  },

  // =========================================================================
  // LOGIN MODAL METHODS
  // =========================================================================
  openLoginModal() {
    const overlay = document.getElementById("loginModalOverlay");
    if (overlay) {
      overlay.classList.add("active");
      // Reset fields
      const unEl = document.getElementById("loginUsername");
      const pwEl = document.getElementById("loginPassword");
      if (unEl) unEl.value = "";
      if (pwEl) pwEl.value = "";
      this.hideLoginError();
      this.switchLoginTab("login");
      setTimeout(() => { if (unEl) unEl.focus(); }, 100);
    }
  },

  closeLoginModal() {
    const overlay = document.getElementById("loginModalOverlay");
    if (overlay) overlay.classList.remove("active");
  },

  handleLoginOverlayClick(event) {
    if (event.target === event.currentTarget) {
      this.closeLoginModal();
    }
  },

  switchLoginTab(tab) {
    const loginPanel = document.getElementById("loginTabPanel");
    const registerPanel = document.getElementById("registerTabPanel");
    const loginBtn = document.getElementById("loginTabBtn");
    const registerBtn = document.getElementById("registerTabBtn");

    if (tab === "login") {
      if (loginPanel) loginPanel.style.display = "";
      if (registerPanel) registerPanel.style.display = "none";
      if (loginBtn) loginBtn.classList.add("active");
      if (registerBtn) registerBtn.classList.remove("active");
    } else {
      if (loginPanel) loginPanel.style.display = "none";
      if (registerPanel) registerPanel.style.display = "";
      if (loginBtn) loginBtn.classList.remove("active");
      if (registerBtn) registerBtn.classList.add("active");
    }
  },

  togglePasswordVisibility(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
      field.type = field.type === "password" ? "text" : "password";
    }
  },

  hideLoginError() {
    const errEl = document.getElementById("loginErrorMsg");
    if (errEl) { errEl.style.display = "none"; errEl.textContent = ""; }
  },

  showLoginError(msg) {
    const errEl = document.getElementById("loginErrorMsg");
    if (errEl) { errEl.style.display = "block"; errEl.textContent = msg; }
  },

  handleLoginSubmit() {
    const username = document.getElementById("loginUsername")?.value.trim();
    const password = document.getElementById("loginPassword")?.value.trim();

    if (!username || !password) {
      this.showLoginError("Please enter your username and password.");
      return;
    }

    const result = store.authenticateUser(username, password);
    if (result.success) {
      this.closeLoginModal();
      this.showToast(`🎉 Welcome back, ${result.user.name || result.user.username}!`);
      this.updateHeaderUserChip();
      if (this.currentView === "account") this.renderAccountView();
      if (this.currentView === "tracking") this.renderTrackingView();
    } else {
      this.showLoginError(result.message);
    }
  },

  handleRegisterSubmit() {
    const name = document.getElementById("regName")?.value.trim();
    const username = document.getElementById("regUsername")?.value.trim();
    const email = document.getElementById("regEmail")?.value.trim();
    const password = document.getElementById("regPassword")?.value.trim();
    const phone = document.getElementById("regPhone")?.value.trim();

    const errEl = document.getElementById("registerErrorMsg");
    const successEl = document.getElementById("registerSuccessMsg");

    if (errEl) { errEl.style.display = "none"; errEl.textContent = ""; }
    if (successEl) { successEl.style.display = "none"; }

    if (!username || !password) {
      if (errEl) { errEl.textContent = "Username and password are required."; errEl.style.display = "block"; }
      return;
    }
    if (password.length < 4) {
      if (errEl) { errEl.textContent = "Password must be at least 4 characters."; errEl.style.display = "block"; }
      return;
    }

    const result = store.registerUser({ name, username, email, password, phone });
    if (result.success) {
      if (successEl) { successEl.textContent = `Account created! Welcome, ${result.user.name}. Signing you in...`; successEl.style.display = "block"; }
      setTimeout(() => {
        this.closeLoginModal();
        this.showToast(`✨ Welcome to Art आलय, ${result.user.name}!`);
        this.updateHeaderUserChip();
        if (this.currentView === "account") this.renderAccountView();
      }, 1400);
    } else {
      if (errEl) { errEl.textContent = result.message; errEl.style.display = "block"; }
    }
  },

  quickLoginAs(username) {
    const result = store.authenticateUser(username, username); // same as password
    if (result.success) {
      this.closeLoginModal();
      this.showToast(`✨ Signed in as ${result.user.name || result.user.username}`);
      this.updateHeaderUserChip();
      this.updateCounters();
      if (this.currentView === "account") this.renderAccountView();
      if (this.currentView === "tracking") this.renderTrackingView();
    } else {
      this.showLoginError(result.message);
    }
  },

  handleLogout() {
    const user = store.getCurrentUser();
    const name = user ? (user.name || user.username) : "";
    store.logoutUser();
    this.showToast(`👋 Signed out. See you again${name ? `, ${name}` : ""}!`);
    this.updateHeaderUserChip();
    this.updateCounters();
    this.navigateTo("home");
  },

  handleHeaderUserClick() {
    const user = store.getCurrentUser();
    if (user) {
      this.navigateTo("account");
    } else {
      this.openLoginModal();
    }
  }
};

window.App = App;
