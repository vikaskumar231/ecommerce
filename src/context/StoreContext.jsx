import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  DEFAULT_CATEGORY_IMAGES,
  INITIAL_CATEGORIES,
  INITIAL_PROMO_CODES,
  INITIAL_USERS
} from "../data/initialData";

const STORAGE_KEYS = {
  CART: "art_alay_react_cart",
  WISHLIST: "art_alay_react_wishlist",
  CURRENT_USER: "art_alay_react_user_v3",
  COUPON: "art_alay_react_coupon",
  OFFLINE_PRODUCTS: "art_alay_products_v2",
  OFFLINE_ORDERS: "art_alay_orders_v3"
};

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.OFFLINE_PRODUCTS);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [orders, setOrders] = useState(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEYS.OFFLINE_ORDERS);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [customRequests, setCustomRequests] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPON);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      // Clear legacy default session so guest user starts logged out
      localStorage.removeItem("art_alay_react_current_user");
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) {
        const u = JSON.parse(saved);
        if (u && u.username) {
          u.isAdmin = (u.role === "admin" || u.username.toLowerCase() === "vikas");
          u.role = u.isAdmin ? "admin" : "user";
          return u;
        }
      }
      return null;
    } catch {
      return null;
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [backendStatus, setBackendStatus] = useState({
    connected: false,
    loading: true,
    info: null
  });

  const [toastMessage, setToastMessage] = useState(null);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
  }, []);

  // Sync state with Python Business Tier & Database
  const syncWithDatabase = useCallback(async () => {
    setBackendStatus(prev => ({ ...prev, loading: true }));
    try {
      // 1. Fetch Secrets & DB info
      const secretsRes = await fetch("/api/system/secrets-info");
      let info = null;
      if (secretsRes.ok) {
        const secretsData = await secretsRes.json();
        info = secretsData.data;
      }

      // 2. Fetch Product Catalog from Database
      const prodRes = await fetch("/api/products");
      let fetchedProds = [];
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        if (prodData.success && Array.isArray(prodData.products)) {
          fetchedProds = prodData.products.map(p => {
            if (!p.images || p.images.length === 0) {
              p.images = [DEFAULT_CATEGORY_IMAGES[p.category] || "images/wall-clock.svg"];
            }
            return p;
          });
          setProducts(fetchedProds);
          localStorage.setItem(STORAGE_KEYS.OFFLINE_PRODUCTS, JSON.stringify(fetchedProds));
        }
      }

      // 3. Fetch Categories
      const catRes = await fetch("/api/categories");
      if (catRes.ok) {
        const catData = await catRes.json();
        if (catData.success && Array.isArray(catData.categories)) {
          setCategories(catData.categories);
        }
      }

      // 4. Fetch Orders
      const orderRes = await fetch("/api/orders");
      if (orderRes.ok) {
        const orderData = await orderRes.json();
        if (orderData.success && Array.isArray(orderData.orders)) {
          setOrders(orderData.orders);
          localStorage.setItem(STORAGE_KEYS.OFFLINE_ORDERS, JSON.stringify(orderData.orders));
        }
      }

      // 5. Fetch Custom Requests
      const reqRes = await fetch("/api/custom-requests");
      if (reqRes.ok) {
        const reqData = await reqRes.json();
        if (reqData.success && Array.isArray(reqData.requests)) {
          setCustomRequests(reqData.requests);
        }
      }

      setBackendStatus({
        connected: true,
        loading: false,
        info
      });
      return { success: true, count: fetchedProds.length };
    } catch (err) {
      console.warn("[React Store] Backend offline or unreachable:", err);
      setBackendStatus({
        connected: false,
        loading: false,
        info: null
      });
      return { success: false, error: err.message };
    }
  }, []);

  useEffect(() => {
    syncWithDatabase();
  }, [syncWithDatabase]);

  // Sync Cart to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Sync Wishlist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync User to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  // Sync Coupon to localStorage
  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem(STORAGE_KEYS.COUPON);
    }
  }, [appliedCoupon]);

  // Cart Management
  const addToCart = useCallback((item) => {
    setCart(prev => {
      const configHash = JSON.stringify(item.customOptions || {});
      const existingIdx = prev.findIndex(c => c.id === item.id && JSON.stringify(c.customOptions || {}) === configHash);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += item.quantity || 1;
        return updated;
      }
      return [
        ...prev,
        {
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
        }
      ];
    });
    showToast(`🛍️ Added "${item.name}" to cart!`);
  }, [showToast]);

  const updateCartQuantity = useCallback((cartItemId, newQty) => {
    setCart(prev => {
      if (newQty <= 0) {
        return prev.filter(i => i.cartItemId !== cartItemId);
      }
      return prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i);
    });
  }, []);

  const removeFromCart = useCallback((cartItemId) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
    showToast("Removed item from cart.");
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    setAppliedCoupon(null);
  }, []);

  const getCartTotals = useCallback(() => {
    const subtotal = cart.reduce((sum, item) => {
      const unitPrice = (item.price || 0) + (item.extraAddonsPrice || 0);
      return sum + (unitPrice * item.quantity);
    }, 0);

    let discount = 0;
    if (appliedCoupon && subtotal >= (appliedCoupon.minOrder || 0)) {
      discount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    }

    const shipping = subtotal > 0 && (subtotal - discount) >= 999 ? 0 : (subtotal > 0 ? 99 : 0);
    const total = Math.max(0, subtotal - discount + shipping);

    return {
      subtotal,
      discount,
      shipping,
      total,
      appliedCoupon,
      freeShippingThreshold: 999,
      freeShippingRemaining: Math.max(0, 999 - (subtotal - discount))
    };
  }, [cart, appliedCoupon]);

  const applyCoupon = useCallback((code) => {
    const found = INITIAL_PROMO_CODES.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: "Invalid promo code. Try FESTIVE15 or ARTALAY10." };
    }
    const totals = getCartTotals();
    if (totals.subtotal < found.minOrder) {
      return { success: false, message: `Minimum order value of ₹${found.minOrder} required for ${found.code}.` };
    }
    setAppliedCoupon(found);
    showToast(`🎉 Coupon ${found.code} applied! Saved ${found.discountPercent}%`);
    return { success: true, message: `Coupon ${found.code} applied! Saved ${found.discountPercent}%`, coupon: found };
  }, [getCartTotals, showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    showToast("Coupon removed.");
  }, [showToast]);

  // Wishlist
  const toggleWishlist = useCallback((productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from wishlist.");
        return prev.filter(id => id !== productId);
      } else {
        showToast("💖 Added to wishlist!");
        return [...prev, productId];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  // Customer Orders (Database Persisted)
  const createOrder = useCallback(async (orderData) => {
    const username = currentUser ? currentUser.username : (orderData.username || "Guest");
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

    setOrders(prev => [newOrder, ...prev]);
    clearCart();

    // Persist to Python backend database
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder)
      });
      if (res.ok) {
        const data = await res.json();
        console.log(`[React Store] Order ${data.order?.orderId} saved to database.`);
      }
    } catch (e) {
      console.warn("[React Store] Offline order saved locally:", e);
    }

    return newOrder;
  }, [currentUser, clearCart]);

  const updateOrderStatus = useCallback(async (orderId, newStatus, artisanNote = "") => {
    setOrders(prev => {
      return prev.map(o => {
        if (o.orderId.toUpperCase() === orderId.toUpperCase()) {
          const stages = ["Order Placed", "Resin Poured", "Curing", "Polishing", "Shipped", "Delivered"];
          const targetIdx = stages.findIndex(s => s.toLowerCase() === newStatus.toLowerCase());
          const updatedSteps = (o.trackingSteps || []).map((step, idx) => {
            if (targetIdx !== -1) {
              if (idx < targetIdx) return { ...step, completed: true, active: false };
              if (idx === targetIdx) return {
                ...step,
                completed: true,
                active: true,
                date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }),
                note: artisanNote || step.note
              };
              return { ...step, completed: false, active: false };
            }
            return step;
          });
          return { ...o, orderStatus: newStatus, trackingSteps: updatedSteps };
        }
        return o;
      });
    });

    try {
      await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, note: artisanNote })
      });
    } catch (e) {
      console.error("Error updating order in database:", e);
    }
  }, []);

  // Custom Bespoke Requests
  const addCustomRequest = useCallback(async (req) => {
    const newReq = {
      id: "REQ-" + Math.floor(1000 + Math.random() * 9000),
      username: currentUser ? currentUser.username : "Guest",
      createdAt: new Date().toISOString(),
      status: "Pending Quote",
      ...req
    };
    setCustomRequests(prev => [newReq, ...prev]);

    try {
      await fetch("/api/custom-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReq)
      });
    } catch (e) {
      console.error("Error saving request to database:", e);
    }
    return newReq;
  }, [currentUser]);

  // Product CRUD (Admin)
  const addProduct = useCallback(async (newProduct) => {
    const prodWithId = {
      ...newProduct,
      id: newProduct.id || ("prod-" + Date.now()),
      rating: 5.0,
      reviewCount: 1,
      showOnHome: newProduct.showOnHome !== undefined ? Boolean(newProduct.showOnHome) : true,
      isFeatured: newProduct.isFeatured || false,
      isBestseller: newProduct.isBestseller || false,
      isNew: true
    };
    setProducts(prev => [prodWithId, ...prev]);

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prodWithId)
      });
    } catch (e) {
      console.error("Error saving product to database:", e);
    }
    return prodWithId;
  }, []);

  const updateProduct = useCallback(async (id, updates) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    try {
      await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
    } catch (e) {
      console.error("Error updating product in database:", e);
    }
  }, []);

  const updateProductImage = useCallback(async (productId, newImageUrl) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const images = Array.isArray(p.images) ? [...p.images] : [];
        images[0] = newImageUrl;
        return { ...p, images };
      }
      return p;
    }));
    try {
      await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: [newImageUrl] })
      });
    } catch (e) {
      console.error("Error updating image in database:", e);
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("Error deleting product from database:", e);
    }
  }, []);

  const resetToLocalImages = useCallback(() => {
    setProducts(prev => prev.map(p => {
      const localImg = DEFAULT_CATEGORY_IMAGES[p.category] || "images/wall-clock.svg";
      const images = Array.isArray(p.images) ? [...p.images] : [];
      images[0] = localImg;
      return { ...p, images };
    }));
    showToast("Reset all catalog artworks to local SVGs.");
  }, [showToast]);

  const toggleShowOnHome = useCallback(async (productId) => {
    let nextVal = false;
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        nextVal = !p.showOnHome;
        return { ...p, showOnHome: nextVal };
      }
      return p;
    }));
    try {
      await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showOnHome: nextVal })
      });
      showToast(nextVal ? "✨ Marked to show on Home Screen!" : "Hidden from Home Screen.");
    } catch (e) {
      console.error("Error toggling showOnHome:", e);
    }
  }, [showToast]);

  // User Authentication
  const quickLoginAs = useCallback((username) => {
    const isAdmin = username.toLowerCase() === "vikas";
    const found = INITIAL_USERS.find(u => u.username.toLowerCase() === username.toLowerCase());
    const user = found ? { ...found } : {
      username,
      name: username,
      avatar: username.charAt(0).toUpperCase(),
      role: isAdmin ? "admin" : "user",
      isAdmin
    };
    user.role = isAdmin ? "admin" : "user";
    user.isAdmin = isAdmin;
    setCurrentUser(user);
    showToast(`✨ Signed in as ${user.name} ${user.isAdmin ? "(Admin)" : ""}`);
  }, [showToast]);

  const login = useCallback(async (username, password) => {
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      return { success: false, message: "Please enter both User ID and Password." };
    }

    // 1. Validate credentials directly against Python Business Tier / SQLite Database
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: cleanUser, password: cleanPass })
      });
      const data = await res.json();

      if (res.ok && data.success && data.user) {
        const u = data.user;
        u.isAdmin = (u.role === "admin" || u.username.toLowerCase() === "vikas");
        u.role = u.isAdmin ? "admin" : "user";
        setCurrentUser(u);
        showToast(`✨ Welcome back, ${u.name}! ${u.isAdmin ? "(Admin Access)" : ""}`);
        return { success: true, user: u };
      } else if (data && !data.success) {
        return {
          success: false,
          message: data.message || "Invalid User ID or password. Verified with database."
        };
      }
    } catch (err) {
      console.warn("Backend database auth unavailable, using offline fallback:", err);
    }

    // 2. Offline fallback if database server is temporarily offline
    const found = INITIAL_USERS.find(
      u => u.username.toLowerCase() === cleanUser.toLowerCase()
    );
    if (found) {
      if (found.password !== cleanPass) {
        return { success: false, message: "Invalid password." };
      }
      const u = {
        ...found,
        role: found.username.toLowerCase() === "vikas" ? "admin" : "user",
        isAdmin: found.username.toLowerCase() === "vikas"
      };
      setCurrentUser(u);
      showToast(`✨ Welcome back, ${u.name}! ${u.isAdmin ? "(Admin Access)" : ""}`);
      return { success: true, user: u };
    }
    return { success: false, message: "Invalid credentials. User ID not found in database." };
  }, [showToast]);

  const register = useCallback(async (userData) => {
    const cleanUser = (userData.username || "").trim();
    const cleanPass = (userData.password || "").trim();
    const cleanName = (userData.name || cleanUser).trim();

    if (!cleanUser || !cleanPass) {
      return { success: false, message: "Username and password are required." };
    }

    const isAdmin = cleanUser.toLowerCase() === "vikas";
    const payload = {
      ...userData,
      username: cleanUser,
      password: cleanPass,
      name: cleanName,
      role: isAdmin ? "admin" : "user"
    };

    // 1. Try backend registration
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        const u = data.user;
        u.isAdmin = (u.role === "admin" || u.username.toLowerCase() === "vikas");
        u.role = u.isAdmin ? "admin" : "user";
        setCurrentUser(u);
        showToast(`🎉 Account created! Welcome, ${u.name}!`);
        return { success: true, user: u };
      } else if (!data.success) {
        return { success: false, message: data.message || "Registration failed." };
      }
    } catch (err) {
      console.warn("Backend register unavailable, creating local user:", err);
    }

    // 2. Local fallback registration
    const newUser = {
      username: cleanUser,
      name: cleanName,
      email: userData.email || `${cleanUser.toLowerCase()}@example.com`,
      phone: userData.phone || "+91 98000 00000",
      avatar: cleanName.charAt(0).toUpperCase(),
      joinedDate: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
      role: isAdmin ? "admin" : "user",
      isAdmin
    };
    setCurrentUser(newUser);
    showToast(`🎉 Welcome to Art Alay, ${newUser.name}!`);
    return { success: true, user: newUser };
  }, [showToast]);

  const logout = useCallback(() => {
    const name = currentUser ? currentUser.name : "";
    setCurrentUser(null);
    showToast(`Signed out. See you again${name ? `, ${name}` : ""}!`);
  }, [currentUser, showToast]);

  const value = {
    products,
    categories,
    orders,
    customRequests,
    cart,
    wishlist,
    currentUser,
    appliedCoupon,
    backendStatus,
    toastMessage,
    setToastMessage,
    showToast,
    syncWithDatabase,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartTotals,
    applyCoupon,
    removeCoupon,
    toggleWishlist,
    isInWishlist,
    createOrder,
    updateOrderStatus,
    addCustomRequest,
    addProduct,
    updateProduct,
    updateProductImage,
    deleteProduct,
    resetToLocalImages,
    toggleShowOnHome,
    quickLoginAs,
    login,
    register,
    logout
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
