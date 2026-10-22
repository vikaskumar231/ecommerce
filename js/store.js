/**
 * AuraResin Studio - LocalStorage State Store
 * Manages reactive data, cart, orders, wishlist, bespoke inquiries, and admin mutations
 */

const STORAGE_KEYS = {
  PRODUCTS: "art_alay_products_v2",
  CART: "art_alay_cart_v2",
  WISHLIST: "art_alay_wishlist_v2",
  ORDERS: "art_alay_orders_v3",
  CUSTOM_REQUESTS: "art_alay_custom_requests_v3",
  USERS: "art_alay_users_v3",
  CURRENT_USER: "art_alay_current_user_v3",
  APPLIED_COUPON: "art_alay_coupon_v2"
};

const DEFAULT_CATEGORY_IMAGES = {
  "earrings": "images/earrings.svg",
  "wall-clock": "images/wall-clock.svg",
  "book-mark": "images/book-mark.svg",
  "key-chains": "images/key-chains.svg",
  "toran": "images/toran.svg",
  "shubh-labh": "images/shubh-labh.svg",
  "name-plates": "images/name-plates.svg",
  "coasters": "images/coasters.svg",
  "customized-gifts": "images/customized-gifts.svg"
};

class Store {
  constructor() {
    this.init();
  }

  init() {
    // Seed initial products if not present or migrate with local images
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      const seeded = INITIAL_PRODUCTS.map(p => {
        const localImg = DEFAULT_CATEGORY_IMAGES[p.category] || "images/wall-clock.svg";
        const images = Array.isArray(p.images) ? [...p.images] : [];
        if (!images[0] || images[0].startsWith("http")) {
          images.unshift(localImg);
        }
        return { ...p, images };
      });
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(seeded));
    }

    // Seed Users Database (Vikas, Meenu, Ananta)
    let users = [];
    try {
      const rawUsers = localStorage.getItem(STORAGE_KEYS.USERS);
      if (rawUsers) users = JSON.parse(rawUsers);
    } catch (e) { users = []; }

    if (!users || !Array.isArray(users) || users.length === 0) {
      users = [...INITIAL_USERS];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    } else {
      // Ensure the three default users (Vikas, Meenu, Ananta) exist
      INITIAL_USERS.forEach(defUser => {
        const exists = users.some(u => u.username.toLowerCase() === defUser.username.toLowerCase());
        if (!exists) {
          users.push(defUser);
        }
      });
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    // Seed default current user (Vikas) if not logged in
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      const defaultUser = users.find(u => u.username.toLowerCase() === "vikas") || users[0];
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(defaultUser));
    }

    // Seed initial sample orders tagged by user
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_SAMPLE_ORDERS));
    }
    // Seed initial custom requests tagged by user
    if (!localStorage.getItem(STORAGE_KEYS.CUSTOM_REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(INITIAL_CUSTOM_REQUESTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CART)) {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.WISHLIST)) {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify([]));
    }
  }

  // --- PRODUCTS ---
  getProducts() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (data) {
        const prods = JSON.parse(data);
        // Ensure every product has a valid image fallback
        return prods.map(p => {
          if (!p.images || p.images.length === 0) {
            p.images = [DEFAULT_CATEGORY_IMAGES[p.category] || "images/wall-clock.svg"];
          }
          return p;
        });
      }
      return INITIAL_PRODUCTS;
    } catch (e) {
      console.error("Error reading products:", e);
      return INITIAL_PRODUCTS;
    }
  }


  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === id) || null;
  }

  addProduct(newProduct) {
    const products = this.getProducts();
    const productWithId = {
      ...newProduct,
      id: "prod-" + Date.now(),
      rating: 5.0,
      reviewCount: 1,
      isFeatured: newProduct.isFeatured || false,
      isBestseller: newProduct.isBestseller || false,
      isNew: true
    };
    products.unshift(productWithId);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.emitChange("products");
    return productWithId;
  }

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      this.emitChange("products");
      return products[index];
    }
    return null;
  }

  updateProductImage(productId, newImageUrl) {
    const products = this.getProducts();
    const prod = products.find(p => p.id === productId);
    if (prod) {
      if (!Array.isArray(prod.images)) prod.images = [];
      prod.images[0] = newImageUrl;
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      this.emitChange("products");
      return prod;
    }
    return null;
  }

  resetToLocalDefaultImages() {
    const products = this.getProducts();
    const reset = products.map(p => {
      const localImg = DEFAULT_CATEGORY_IMAGES[p.category] || "images/wall-clock.svg";
      const images = Array.isArray(p.images) ? [...p.images] : [];
      images[0] = localImg;
      return { ...p, images };
    });
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(reset));
    this.emitChange("products");
    return reset;
  }

  deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    this.emitChange("products");
  }

  resetProductsToDefault() {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    this.emitChange("products");
  }

  // --- CART ---
  getCart() {
    try {
      const cart = localStorage.getItem(STORAGE_KEYS.CART);
      return cart ? JSON.parse(cart) : [];
    } catch (e) {
      return [];
    }
  }

  addToCart(item) {
    const cart = this.getCart();
    // Unique key considering custom configuration
    const configHash = JSON.stringify(item.customOptions || {});
    const existingIndex = cart.findIndex(c => c.id === item.id && JSON.stringify(c.customOptions || {}) === configHash);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += item.quantity || 1;
    } else {
      cart.push({
        cartItemId: "cart-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        categoryName: item.categoryName,
        quantity: item.quantity || 1,
        customOptions: item.customOptions || {},
        extraAddonsPrice: item.extraAddonsPrice || 0
      });
    }

    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.emitChange("cart");
  }

  updateCartQuantity(cartItemId, newQty) {
    let cart = this.getCart();
    if (newQty <= 0) {
      cart = cart.filter(item => item.cartItemId !== cartItemId);
    } else {
      const item = cart.find(item => item.cartItemId === cartItemId);
      if (item) {
        item.quantity = newQty;
      }
    }
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.emitChange("cart");
  }

  removeFromCart(cartItemId) {
    let cart = this.getCart();
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    this.emitChange("cart");
  }

  clearCart() {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify([]));
    this.removeCoupon();
    this.emitChange("cart");
  }

  getCartCount() {
    const cart = this.getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getCartTotals() {
    const cart = this.getCart();
    const subtotal = cart.reduce((sum, item) => {
      const unitPrice = (item.price || 0) + (item.extraAddonsPrice || 0);
      return sum + (unitPrice * item.quantity);
    }, 0);

    const coupon = this.getAppliedCoupon();
    let discount = 0;
    if (coupon && subtotal >= (coupon.minOrder || 0)) {
      discount = Math.round((subtotal * coupon.discountPercent) / 100);
    }

    // Free delivery above ₹999, else ₹99
    const shipping = subtotal > 0 && (subtotal - discount) >= 999 ? 0 : (subtotal > 0 ? 99 : 0);
    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      discount,
      shipping,
      total,
      coupon,
      freeShippingThreshold: 999,
      freeShippingRemaining: Math.max(0, 999 - (subtotal - discount))
    };
  }

  // --- COUPONS ---
  applyCoupon(code) {
    const found = INITIAL_PROMO_CODES.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: "Invalid coupon code. Try ARTALAY10 or FESTIVE15." };
    }
    const cart = this.getCartTotals();
    if (cart.subtotal < found.minOrder) {
      return { success: false, message: `Minimum order value of ₹${found.minOrder} required for ${found.code}.` };
    }
    localStorage.setItem(STORAGE_KEYS.APPLIED_COUPON, JSON.stringify(found));
    this.emitChange("cart");
    return { success: true, message: `Coupon ${found.code} applied! Saved ${found.discountPercent}%`, coupon: found };
  }

  getAppliedCoupon() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.APPLIED_COUPON);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  removeCoupon() {
    localStorage.removeItem(STORAGE_KEYS.APPLIED_COUPON);
    this.emitChange("cart");
  }

  // --- WISHLIST (PER LOGGED-IN USER) ---
  getWishlist() {
    const user = this.getCurrentUser();
    if (user && Array.isArray(user.wishlist)) {
      return user.wishlist;
    }
    try {
      const list = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return list ? JSON.parse(list) : [];
    } catch (e) {
      return [];
    }
  }

  toggleWishlist(productId) {
    const user = this.getCurrentUser();
    let list = [...this.getWishlist()];
    const index = list.indexOf(productId);
    let added = false;
    if (index > -1) {
      list.splice(index, 1);
      added = false;
    } else {
      list.push(productId);
      added = true;
    }

    if (user) {
      this.updateUser({ wishlist: list });
    } else {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(list));
    }
    this.emitChange("wishlist");
    return added;
  }

  isInWishlist(productId) {
    const list = this.getWishlist();
    return list.includes(productId);
  }

  // --- ORDERS (ISOLATED PER USER) ---
  getOrders() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return data ? JSON.parse(data) : INITIAL_SAMPLE_ORDERS;
    } catch (e) {
      return INITIAL_SAMPLE_ORDERS;
    }
  }

  getOrdersForCurrentUser() {
    const user = this.getCurrentUser();
    if (!user) return [];
    const allOrders = this.getOrders();
    return allOrders.filter(o => o.username && o.username.toLowerCase() === user.username.toLowerCase());
  }

  getOrderById(orderId) {
    if (!orderId) return null;
    const orders = this.getOrders();
    return orders.find(o => o.orderId.toUpperCase() === orderId.trim().toUpperCase()) || null;
  }

  createOrder(orderData) {
    const orders = this.getOrders();
    const user = this.getCurrentUser();
    const username = user ? user.username : (orderData.username || "Guest");
    const prefix = username.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5) || "RESIN";
    const newOrderId = `ORD-${prefix}-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder = {
      orderId: newOrderId,
      username: username,
      placedAt: new Date().toISOString(),
      orderStatus: "Placed",
      paymentStatus: "Paid",
      trackingNumber: "EXP-" + Math.floor(1000000 + Math.random() * 9000000),
      trackingSteps: [
        { status: "Order Placed", date: "Just now", completed: true, active: true, note: "Order placed & artisan assigned" },
        { status: "Resin Poured", date: "Scheduled in 24h", completed: false, note: "Color mixing & layer casting" },
        { status: "Deep Curing (72h)", date: "Scheduled in 48h", completed: false, note: "Diamond crystal glass cure" },
        { status: "Sanding & Polishing", date: "Pending", completed: false, note: "Edge beveling and hand buffing" },
        { status: "Dispatched", date: "Pending", completed: false, note: "Packaged in eco-padded gift box" },
        { status: "Delivered", date: "Estimated 4-6 business days", completed: false, note: "Safe doorstep delivery" }
      ],
      ...orderData
    };

    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.clearCart();
    this.emitChange("orders");
    return newOrder;
  }

  updateOrderStatus(orderId, newStatus, artisanNote = "") {
    const orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (!order) return null;

    order.orderStatus = newStatus;
    const stages = ["Order Placed", "Resin Poured", "Curing", "Polishing", "Shipped", "Delivered"];
    const targetIdx = stages.findIndex(s => s.toLowerCase() === newStatus.toLowerCase());

    if (targetIdx !== -1 && order.trackingSteps) {
      order.trackingSteps.forEach((step, idx) => {
        if (idx < targetIdx) {
          step.completed = true;
          step.active = false;
        } else if (idx === targetIdx) {
          step.completed = true;
          step.active = true;
          step.date = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
          if (artisanNote) step.note = artisanNote;
        } else {
          step.completed = false;
          step.active = false;
        }
      });
    }

    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    this.emitChange("orders");
    return order;
  }

  // --- BESPOKE CUSTOM REQUESTS (ISOLATED PER USER) ---
  getCustomRequests() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_REQUESTS);
      return data ? JSON.parse(data) : INITIAL_CUSTOM_REQUESTS;
    } catch (e) {
      return INITIAL_CUSTOM_REQUESTS;
    }
  }

  getCustomRequestsForCurrentUser() {
    const user = this.getCurrentUser();
    if (!user) return [];
    const all = this.getCustomRequests();
    return all.filter(r => r.username && r.username.toLowerCase() === user.username.toLowerCase());
  }

  addCustomRequest(req) {
    const requests = this.getCustomRequests();
    const user = this.getCurrentUser();
    const newReq = {
      id: "REQ-" + Math.floor(1000 + Math.random() * 9000),
      username: user ? user.username : (req.username || "Guest"),
      createdAt: new Date().toISOString(),
      status: "Pending Quote",
      ...req
    };
    requests.unshift(newReq);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(requests));
    this.emitChange("custom_requests");
    return newReq;
  }

  updateCustomRequestStatus(id, newStatus) {
    const requests = this.getCustomRequests();
    const req = requests.find(r => r.id === id);
    if (req) {
      req.status = newStatus;
      localStorage.setItem(STORAGE_KEYS.CUSTOM_REQUESTS, JSON.stringify(requests));
      this.emitChange("custom_requests");
      return req;
    }
    return null;
  }

  // --- USER AUTHENTICATION & DATABASE MANAGEMENT ---
  getUsers() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USERS);
      return raw ? JSON.parse(raw) : INITIAL_USERS;
    } catch (e) {
      return INITIAL_USERS;
    }
  }

  saveUsers(users) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  getCurrentUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  // Backwards compatible alias
  getUser() {
    return this.getCurrentUser();
  }

  isLoggedIn() {
    return !!this.getCurrentUser();
  }

  authenticateUser(username, password) {
    if (!username || !password) {
      return { success: false, message: "Please enter both username and password." };
    }
    const cleanUser = username.trim();
    const cleanPass = password.trim();
    const users = this.getUsers();

    const matched = users.find(u => 
      u.username.toLowerCase() === cleanUser.toLowerCase() &&
      u.password === cleanPass
    );

    if (!matched) {
      return { 
        success: false, 
        message: "Invalid credentials. Try demo accounts: Vikas/Vikas, Meenu/Meenu, or Ananta/Ananta." 
      };
    }

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(matched));
    this.emitChange("user");
    return { success: true, user: matched };
  }

  loginAsUser(username) {
    const users = this.getUsers();
    const user = users.find(u => u.username.toLowerCase() === username.trim().toLowerCase());
    if (user) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      this.emitChange("user");
      return user;
    }
    return null;
  }

  logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    this.emitChange("user");
  }

  registerUser(userData) {
    if (!userData.username || !userData.password) {
      return { success: false, message: "Username and password are required." };
    }
    const cleanUser = userData.username.trim();
    const users = this.getUsers();
    const exists = users.some(u => u.username.toLowerCase() === cleanUser.toLowerCase());
    if (exists) {
      return { success: false, message: `Username "${cleanUser}" is already taken. Please choose another.` };
    }

    const newUser = {
      username: cleanUser,
      password: userData.password.trim(),
      name: userData.name ? userData.name.trim() : cleanUser,
      email: userData.email ? userData.email.trim() : `${cleanUser.toLowerCase()}@example.com`,
      phone: userData.phone ? userData.phone.trim() : "+91 98000 00000",
      address: userData.address ? userData.address.trim() : "",
      city: userData.city ? userData.city.trim() : "",
      state: userData.state ? userData.state.trim() : "",
      pincode: userData.pincode ? userData.pincode.trim() : "",
      wishlist: [],
      avatar: (userData.name || cleanUser).charAt(0).toUpperCase(),
      joinedDate: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    };

    users.push(newUser);
    this.saveUsers(users);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    this.emitChange("user");
    return { success: true, user: newUser };
  }

  updateUser(userData) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return null;
    const updated = { ...currentUser, ...userData };
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));

    // Also update in users database
    const users = this.getUsers();
    const idx = users.findIndex(u => u.username.toLowerCase() === updated.username.toLowerCase());
    if (idx !== -1) {
      users[idx] = updated;
      this.saveUsers(users);
    }

    this.emitChange("user");
    return updated;
  }

  // --- EVENT DISPATCHER ---
  emitChange(channel) {
    window.dispatchEvent(new CustomEvent("aura_store_updated", { detail: { channel } }));
  }
}

// Global Store Instance
const store = new Store();
window.auraStore = store;
