# Art आलय (Art Alay) — Handcrafted Customized Resin Art & E-Commerce Platform

Built with **React 18, Vite 6, and Vanilla CSS** with a robust **Python 3.11 Business Tier** backed by an SQLite relational database (`backend/data/artalay.db`) and external secrets configuration (`secrets.json`). Featuring an artisan luxury aesthetic (champagne gold, deep emerald, sapphire, and opalescent resin shine), responsive layouts, and rich interactive micro-animations.

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

## 🐍 Python Business Tier & Database Architecture

The application includes a modular **Python 3.11 Business Tier** backed by a relational database and secrets configuration:

### 1. Database & Secrets File (`secrets.json`)
- All database parameters and third-party credentials are securely loaded from [secrets.json](file:///c:/Vikas/GitHub/ecommerce/secrets.json) (a template is available in [secrets.example.json](file:///c:/Vikas/GitHub/ecommerce/secrets.example.json)).
- Dummy enterprise database connection parameters:
  - **Configured Engine:** `postgresql`
  - **Configured Host:** `db-cluster.artalay-resin-enterprise.internal:5432`
  - **Configured Database:** `artalay_ecommerce_db`
  - **Configured User:** `art_alay_db_admin`
  - **Configured Password:** `ArtAlay_SuperSecret_Resin_Password_2026!#` (Masked as `ArtA****6!#` on all status endpoints)
  - **Active Persistent Database Engine:** SQLite relational database at `backend/data/artalay.db` with thread-safe connection pooling, automated schema migrations, and seeder.

### 2. Database Schema
- **`products`**: Product catalog with categories, prices, options, curation flags, and images.
- **`categories`**: Categories with live count of products in each category.
- **`orders`**: Customer orders with full address, ordered items, payment status, and tracking steps.
- **`custom_requests`**: Bespoke customized inquiries and quotes.
- **`users`**: Customer account credentials, addresses, and wishlist.
- **`promo_codes`**: Promotional discount rules.

### 3. REST API Endpoints
- `GET /api/health` — System status and database row counts.
- `GET /api/system/secrets-info` — Masked database secrets and configuration details.
- `GET /api/products` — Retrieve product catalog from database (with filters).
- `GET /api/products/<id>` — Retrieve single product details.
- `POST /api/products` — Create new product in database (Admin).
- `PUT /api/products/<id>` — Update product or photo in database (Admin).
- `DELETE /api/products/<id>` — Delete product from database (Admin).
- `GET /api/categories` — Live category list with computed product counts.
- `GET /api/orders` — Retrieve customer orders from database.
- `POST /api/orders` — Persist customer order in database upon checkout.
- `PUT /api/orders/<id>` — Update order lifecycle and tracking steps in database.
- `GET /api/custom-requests` / `POST /api/custom-requests` — Bespoke inquiries.
- `POST /api/auth/login` / `POST /api/auth/register` — User authentication.

---

## 🚀 How to Run Locally

### Option A: Direct Full-Stack Serving (Production Mode)
1. Run the Python Business Tier (serves both React SPA from `dist/` and REST API from `http://127.0.0.1:8000`):
   ```bash
   python run_server.py
   ```
2. Open your browser and navigate to:
   ```
   http://127.0.0.1:8000/
   ```
3. Check the top announcement bar for the **`Python Business Tier: Online`** status pill. Click it to view the live database diagnostics and masked `secrets.json` parameters.

### Option B: React Vite Development Mode (Hot-Reloading)
1. In one terminal, start the Python Business Tier API:
   ```bash
   python run_server.py
   ```
2. In a second terminal, start the Vite React development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173/`. Vite automatically proxies all `/api/*` network requests to the Python server on `http://127.0.0.1:8000`.

### Building for Production
To recompile the React production assets into `dist/`:
```bash
npm run build
```

---

## 📁 Project Structure

```
c:\Vikas\GitHub\ecommerce\
├── secrets.json              # Database credentials & API keys (dummy secrets)
├── secrets.example.json      # Secrets template for deployment
├── package.json              # React 18 & Vite dependencies
├── vite.config.js            # Vite configuration & /api proxy to Python backend
├── index.html                # Vite React HTML entrypoint
├── index.legacy.html         # Original legacy vanilla HTML backup
├── run_server.py             # Root server launcher
├── test_react_integration.py # Automated integration test suite
├── dist\                     # Compiled production React SPA bundle
│   ├── index.html
│   └── assets\
├── src\                      # React 18 Application Source
│   ├── main.jsx              # React DOM root render
│   ├── App.jsx               # Master view router & layout orchestrator
│   ├── index.css             # Luxury design system styles & animations
│   ├── context\
│   │   └── StoreContext.jsx  # Global React Context & REST API synchronizer
│   ├── data\
│   │   └── initialData.js    # Fallback categories, promo codes & profiles
│   └── components\           # Modular React Components
│       ├── AnnouncementBar.jsx       # Top ribbon with live Python status
│       ├── Header.jsx                # Search, nav links, badges & user chip
│       ├── HeroBanner.jsx            # Value props & luxury resin banner
│       ├── ProductCard.jsx           # Interactive cards with quick actions
│       ├── HomeProductsGrid.jsx      # Curated collection tabs & reviews
│       ├── CatalogView.jsx           # All 9 categories, sidebar & search
│       ├── ProductDetailsView.jsx    # PDP with live engraving preview & swatches
│       ├── BespokeStudio.jsx         # 5-step interactive resin customizer
│       ├── CartDrawer.jsx            # Slide-out cart with shipping bar & promo codes
│       ├── CheckoutView.jsx          # 2-column checkout with 50% advance option
│       ├── PaymentGatewayModal.jsx   # 256-bit SSL simulated gateway (UPI/Cards)
│       ├── OrderTrackingView.jsx     # 6-stage resin curing milestone tracker
│       ├── AccountView.jsx           # User orders, wishlist & quotes
│       ├── AdminView.jsx             # Python architecture card & photo/order manager
│       ├── BackendDiagnosticsModal.jsx # Live secrets & DB diagnostics modal
│       ├── LoginModal.jsx            # 1-click demo profiles & authentication
│       └── Toast.jsx                 # Notification alerts
├── backend\
│   ├── config.py             # Secrets loader & credential masking
│   ├── database.py           # Database connection, schemas, and seeder
│   ├── data\
│   │   └── artalay.db        # Persistent SQLite database
│   ├── seed_data\            # Initial catalog & orders JSON data
│   ├── services\             # Business Tier Services
│   │   ├── catalog_service.py # Catalog CRUD, filtering, search
│   │   ├── order_service.py   # Order placement & milestone tracking
│   │   ├── custom_request_service.py # Bespoke inquiries
│   │   └── user_service.py    # Authentication & user accounts
│   ├── api\
│   │   └── router.py         # REST API request dispatcher
│   └── server.py             # Multithreaded HTTP server & static/SPA file host
├── public\
│   └── images\               # Static assets & SVGs for Vite
├── images\                   # Local artwork & product SVGs
├── LICENSE                   # Project license
└── README.md                 # Comprehensive project documentation
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
