# Art आलय (Art Alay) — Handcrafted Customized Resin Art & E-Commerce Platform

A luxury e-commerce web application designed for selling handmade, customized resin art, botanical jewelry, festive home decor, and preserved wedding keepsakes.

Built with **HTML5, Vanilla CSS, and modern JavaScript**, featuring an artisan aesthetic (champagne gold, deep emerald, sapphire, and opalescent resin shine), responsive layouts, and rich interactive micro-animations.

---

## 🌟 Key Features & MVP Implementation Overview

### 1. Home Screen
- **Brand Identity & Banner:** Luxury logo badge with animated resin sheen (`Art आलय` / `Art Alay`), hero banner with high-impact visuals, value propositions (100% Non-Toxic UV Resin, 72-Hour Deep Curing, 24K Gold Inclusions, Pan-India Shipping).
- **Curated Collections:** Interactive tabs for **Featured Products**, **Bestsellers**, **New Arrivals**, and **Festival Specials 🪔**.
- **Social Proof & Stories:** Real customer reviews, verified buyer badges, and star ratings.
- **Top Announcement Ribbon:** Promotional coupon alert (`FESTIVE15`), quick navigation to order tracking, and bespoke customizer.

### 2. Product Catalog (All 9 Categories)
Browse and filter through 36+ handcrafted creations across all requested categories:
1. **Earrings:** Hypoallergenic ocean wave drops, pressed hydrangea studs, geode dangles.
2. **Wall Clock:** Statement 14" to 18" sapphire geode resin clocks with raw quartz crystals & silent sweep movements.
3. **Book Mark:** Ultra-slim crystal bookmarks with pressed wildflowers, gold flakes, and silk tassels.
4. **Key Chains:** Alphabet floral monograms (A–Z), scannable Spotify song codes, and pet photo keepsakes.
5. **Toran:** Auspicious marigold, lotus, and peacock resin door valances with brass tinkling bells.
6. **Shubh Labh:** Auspicious entrance hanging pairs with 3D gold calligraphy and Ganesha/Lakshmi motifs.
7. **Name Plates:** Live-edge seasoned teak wood river plates with 3D laser-cut acrylic letters & backlit LED options.
8. **Coasters:** Agate geode drink coasters with 24K hand-gilded liquid gold rims and ocean wave sets.
9. **Customized Gifts:** Wedding varmala garland flower preservation blocks, baby milestone birth stat pyramids, and glowing photo memory night lamps.
- **Filtering & Search:** Real-time instant search bar, category sidebar with live product counters, and sort dropdown (Price Low/High, Popular, Top Rated).

### 3. Product Details Page (PDP)
- **Multi-Photo Gallery:** High-resolution main image with zoom and clickable interactive thumbnail row.
- **Live Customization Controls:**
  - Color palette swatches with real-time price add-ons.
  - Inclusions picker (24K Gold Leaf, Silver Leaf, Rose Gold Shimmer).
  - Size and silhouette variations (e.g. 12", 14", 16", 18").
  - Complimentary name / message engraving with **instant live typography preview**.
  - Photo upload support for keepsakes and varmala garland preservation.
- **Artisan Specs & Curing Notice:** Displays exact curing duration (48h–72h), dimensions, materials, and care guidelines.
- **Actions:** Stepper quantity selector, `Add to Cart`, `⚡ Buy Now`, and direct `💬 Order on WhatsApp`.

### 4. Customization Form (Bespoke Resin Studio)
An interactive 5-step custom order wizard:
- **Step 1: Product Type:** Select between Wedding Varmala, Teak Nameplate, Geode Clock, Coaster Set, or River Slab.
- **Step 2: Dimensions & Shape:** Hexagon block, Heart block, Square cube, or Round disc.
- **Step 3: Pigment & Mica Palette:** Emerald & Gold, Ocean Surf & Wave, Pearl & Rose Gold, Sapphire, or Onyx.
- **Step 4: Special Inclusions:** 24K gold foil, natural dried flowers, personal wedding garland pickup, quartz points, or LED wooden base.
- **Step 5: Blueprint Review & Live Quote:** Instant price estimate calculation, customer contact capture, and one-click submission to the artisan portal and WhatsApp.

### 5. Shopping Cart
- **Slide-out Cart Drawer + Full Cart View:** Fast access from any screen.
- **Detailed Custom Options Summary:** Displays chosen color, foil, size, and custom engraved text for each item.
- **Free Shipping Progress Meter:** Dynamic progress bar showing how much more to add for free express delivery.
- **Coupon Code Engine:** Apply promo codes (e.g., `AURA10` for 10% off, `FESTIVE15` for 15% off, `FIRSTRESIN` for 20% off).
- **Cart Calculations:** Subtotal, coupon discount, GST breakdown, and final total.

### 6. Checkout
- Streamlined 2-column checkout.
- Customer contact info, full shipping street address, PIN code, and delivery instructions.
- Live order review summary displaying all custom product attributes.
- Advance deposit selection option (50% handcrafting advance for custom items).

### 7. Online Payment Gateway Simulation
- Realistic modal dialog with 256-bit SSL branding.
- Payment options: **UPI** (Google Pay, PhonePe, Paytm, BHIM, QR code generator), **Credit/Debit Cards**, and **50% Advance**.
- Animated payment verification sequence.
- Generates unique Order ID (e.g., `ORD-RESIN-98421`) and seamlessly redirects to the visual order tracking timeline.

### 8. Order Tracking & Curing Progress Visualizer
- Search by Order ID (includes quick-fill buttons for demo orders).
- Step-by-step resin crafting milestone tracker:
  1. **Order Placed & Artisan Assigned**
  2. **Resin Poured (Color mixing & layer casting)**
  3. **Deep Curing in Progress (48-72h UV chamber)**
  4. **Sanding, Edge Beveling & Diamond Polishing**
  5. **Dispatched via Insured Express Courier**
  6. **Delivered to Doorstep**
- Courier tracking number (e.g. Delhivery, BlueDart) and direct WhatsApp artisan support button.

### 9. User Account
- Customer profile information and saved addresses.
- **My Orders:** View past orders, status badges, customized item details, and tracking links.
- **Saved Wishlist:** Heart-saved items with one-click move to cart.
- **Bespoke Inquiries:** Track custom quotes submitted through the studio wizard.

### 10. WhatsApp Integration
- Floating WhatsApp chat bubble with pulsing ping animation.
- Quick inquiry popup with pre-formatted questions (Wedding Varmala Preservation, Custom Nameplate, Urgent Festive Gifts).
- **Product Page WhatsApp Share:** Dynamically formats product title, selected color, foil, engraved text, and price into a ready-to-send WhatsApp message.
- Direct artisan chat link on checkout and order tracking views.

### 11. Admin Management Portal & Local Image Management
Easily accessible via the **⚙️ Admin** button in the header:
- **Local Image Storage:** All product lines and categories default to local artwork stored in the `images/` directory (`images/earrings.svg`, `images/wall-clock.svg`, `images/book-mark.svg`, `images/key-chains.svg`, `images/toran.svg`, `images/shubh-labh.svg`, `images/name-plates.svg`, `images/coasters.svg`, `images/customized-gifts.svg`).
- **Interactive Image & Product Updater:** Click any product's photo thumbnail or the **📸 Edit Photo & Info** button in the admin table:
  - **Upload Local Image:** Choose any local image file from your computer (JPG, PNG, SVG, WebP). It is immediately loaded via FileReader into local storage.
  - **Local Path / URL:** Or input any local file path (e.g. `images/my-clock.jpg`).
  - **Instant Live Synchronization:** Updating an image in the admin console immediately reflects in the **Catalog Screen**, **Home Screen**, and **Product Details Page (PDP)** in real-time.
  - **Quick Studio Presets:** 1-click preset buttons to switch between local studio artworks.
  - **Reset to Local SVGs:** 1-click button to reset all products back to local SVGs.
- **Executive Analytics:** Total Revenue, Total Orders, Active Orders in 72h Curing, and Bespoke Inquiries.
- **Order Management:** Real-time status update dropdown (`Placed`, `Resin Poured`, `Curing`, `Polishing`, `Shipped`, `Delivered`). Updating status immediately updates the customer's live tracking timeline!
- **Customer Custom Requests:** Review custom quote requests, inspect custom notes, and reply directly to the customer on WhatsApp.

---

## 🚀 How to Run Locally

### Option A: Using the Built-in Python Server (Running on Port 8080)
1. Open terminal in the project directory:
   ```bash
   cd c:\Vikas\GitHub\ecommerce
   python -m http.server 8080
   ```
2. Open your browser and navigate to:
   ```
   http://localhost:8080/index.html
   ```

### Option B: Direct Browser Launch
Because the application is built with standard web technologies (HTML5, Vanilla CSS, Vanilla JS) with zero build dependencies, you can also double-click `index.html` to open it in any modern browser (Chrome, Edge, Firefox, Safari).

---

## 📁 Project Structure

```
c:\Vikas\GitHub\ecommerce\
├── index.html          # Semantic master HTML file with all SPA views & modals
├── css\
│   └── style.css       # Master stylesheet (luxury resin theme, typography, animations, responsive design)
├── js\
│   ├── data.js         # 36+ products across 9 categories, reviews, promo codes, sample orders
│   ├── store.js        # Reactive LocalStorage manager (products, cart, wishlist, orders, admin mutations)
│   └── app.js          # Master controller (view routing, PDP customizer, wizard, payments, tracking, admin)
├── LICENSE             # Project license
└── README.md           # Comprehensive project documentation
```

---

## 💎 Design System & Palette

- **Primary Deep Teal:** `#0f4c5c`
- **Artisan Champagne Gold:** `#c59b63` / `#d4af37`
- **Emerald Green Accent:** `#1b4332`
- **Sapphire Ocean Blue:** `#0077b6`
- **Festive Crimson:** `#b7094c`
- **Ivory Cream Background:** `#fbf9f5`
- **Typography:** *Playfair Display* & *Cinzel* for headings; *Plus Jakarta Sans* for clean, modern UI text.
