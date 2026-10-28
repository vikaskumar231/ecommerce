"""
Art Alay - Database Abstraction & Persistence Tier
Interacts with SQLite database (configured by secrets.json) to store and manage:
- Product Catalog
- Customer Orders
- Custom Bespoke Inquiries
- Users & Promo Codes
"""

import sqlite3
import json
import threading
from contextlib import contextmanager
from datetime import datetime
from pathlib import Path
from typing import Generator, Any, Dict, List, Optional
from backend.config import config, BASE_DIR

# Thread-local storage for sqlite3 connections
_thread_local = threading.local()

class DatabaseManager:
    """Manages database lifecycle, migrations, and connections."""

    def __init__(self):
        self.db_path = config.sqlite_path
        self._lock = threading.Lock()
        self.init_database()

    def get_connection(self) -> sqlite3.Connection:
        """Returns a thread-safe connection with sqlite3.Row factory."""
        if not hasattr(_thread_local, "conn") or _thread_local.conn is None:
            conn = sqlite3.connect(
                str(self.db_path),
                timeout=30.0,
                check_same_thread=False
            )
            conn.row_factory = sqlite3.Row
            # Enable Foreign Keys & Write-Ahead Logging for high concurrency
            conn.execute("PRAGMA foreign_keys = ON;")
            conn.execute("PRAGMA journal_mode = WAL;")
            _thread_local.conn = conn
        return _thread_local.conn

    @contextmanager
    def transaction(self) -> Generator[sqlite3.Cursor, None, None]:
        """Context manager for atomic database transactions."""
        conn = self.get_connection()
        cursor = conn.cursor()
        try:
            yield cursor
            conn.commit()
        except Exception:
            conn.rollback()
            raise
        finally:
            cursor.close()

    def init_database(self):
        """Initializes tables and seeds initial catalog if empty."""
        with self._lock:
            with self.transaction() as cur:
                # 1. Product Catalog Table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS products (
                        id TEXT PRIMARY KEY,
                        name TEXT NOT NULL,
                        category TEXT NOT NULL,
                        category_name TEXT NOT NULL,
                        price REAL NOT NULL,
                        original_price REAL NOT NULL,
                        rating REAL DEFAULT 5.0,
                        review_count INTEGER DEFAULT 0,
                        badge TEXT,
                        show_on_home INTEGER DEFAULT 0,
                        is_featured INTEGER DEFAULT 0,
                        is_bestseller INTEGER DEFAULT 0,
                        is_new INTEGER DEFAULT 0,
                        is_festival INTEGER DEFAULT 0,
                        stock INTEGER DEFAULT 10,
                        curing_time_days TEXT,
                        dimensions TEXT,
                        weight TEXT,
                        images TEXT,
                        description TEXT,
                        features TEXT,
                        customization_options TEXT,
                        created_at TEXT,
                        updated_at TEXT
                    );
                """)
                cur.execute("CREATE INDEX IF NOT EXISTS idx_prod_category ON products(category);")
                cur.execute("CREATE INDEX IF NOT EXISTS idx_prod_featured ON products(is_featured);")

                # Migration: ensure show_on_home column exists
                cur.execute("PRAGMA table_info(products);")
                cols = [r["name"] for r in cur.fetchall()]
                if "show_on_home" not in cols:
                    cur.execute("ALTER TABLE products ADD COLUMN show_on_home INTEGER DEFAULT 0;")
                    cur.execute("UPDATE products SET show_on_home = 1 WHERE is_featured = 1;")

                # 2. Categories Table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS categories (
                        id TEXT PRIMARY KEY,
                        name TEXT NOT NULL,
                        icon TEXT,
                        count INTEGER DEFAULT 0,
                        image TEXT,
                        tagline TEXT,
                        description TEXT
                    );
                """)

                # 3. Customer Orders Table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS orders (
                        order_id TEXT PRIMARY KEY,
                        username TEXT NOT NULL,
                        customer TEXT NOT NULL,
                        items TEXT NOT NULL,
                        subtotal REAL NOT NULL,
                        discount REAL DEFAULT 0,
                        shipping REAL DEFAULT 0,
                        total REAL NOT NULL,
                        payment_method TEXT,
                        payment_status TEXT,
                        order_status TEXT,
                        tracking_steps TEXT,
                        tracking_number TEXT,
                        placed_at TEXT,
                        updated_at TEXT
                    );
                """)
                cur.execute("CREATE INDEX IF NOT EXISTS idx_orders_username ON orders(username);")

                # 4. Bespoke Custom Requests Table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS custom_requests (
                        id TEXT PRIMARY KEY,
                        username TEXT,
                        customer_name TEXT,
                        phone TEXT,
                        email TEXT,
                        product_type TEXT,
                        dimensions TEXT,
                        color_palette TEXT,
                        inclusions TEXT,
                        custom_text TEXT,
                        status TEXT,
                        estimated_budget TEXT,
                        notes TEXT,
                        created_at TEXT
                    );
                """)
                cur.execute("CREATE INDEX IF NOT EXISTS idx_req_username ON custom_requests(username);")

                # 5. Users Table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS users (
                        username TEXT PRIMARY KEY,
                        password TEXT NOT NULL,
                        name TEXT,
                        email TEXT,
                        phone TEXT,
                        address TEXT,
                        city TEXT,
                        state TEXT,
                        pincode TEXT,
                        wishlist TEXT,
                        avatar TEXT,
                        joined_date TEXT,
                        role TEXT DEFAULT 'user'
                    );
                """)

                # Migration: ensure role column exists in users
                cur.execute("PRAGMA table_info(users);")
                u_cols = [r["name"] for r in cur.fetchall()]
                if "role" not in u_cols:
                    cur.execute("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user';")
                cur.execute("UPDATE users SET role = 'admin' WHERE LOWER(username) = 'vikas';")
                cur.execute("UPDATE users SET role = 'user' WHERE LOWER(username) != 'vikas';")

                # 6. Promo Codes Table
                cur.execute("""
                    CREATE TABLE IF NOT EXISTS promo_codes (
                        code TEXT PRIMARY KEY,
                        discount_percent INTEGER NOT NULL,
                        min_order REAL DEFAULT 0,
                        description TEXT
                    );
                """)

            # Seed data if tables are empty
            self._seed_if_empty()

    def _seed_if_empty(self):
        """Loads seed data into database on initial startup."""
        seed_dir = BASE_DIR / "backend" / "seed_data"
        if not seed_dir.exists():
            return

        with self.transaction() as cur:
            # Seed Products
            cur.execute("SELECT COUNT(*) AS cnt FROM products;")
            if cur.fetchone()["cnt"] == 0:
                prod_file = seed_dir / "initial_products.json"
                if prod_file.exists():
                    with open(prod_file, "r", encoding="utf-8") as f:
                        products = json.load(f)
                    for p in products:
                        cur.execute("""
                            INSERT INTO products (
                                id, name, category, category_name, price, original_price,
                                rating, review_count, badge, is_featured, is_bestseller,
                                is_new, is_festival, stock, curing_time_days, dimensions,
                                weight, images, description, features, customization_options,
                                created_at, updated_at
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            p.get("id"),
                            p.get("name"),
                            p.get("category"),
                            p.get("categoryName", p.get("category", "")),
                            p.get("price", 0),
                            p.get("originalPrice", 0),
                            p.get("rating", 5.0),
                            p.get("reviewCount", 0),
                            p.get("badge", ""),
                            1 if p.get("isFeatured") else 0,
                            1 if p.get("isBestseller") else 0,
                            1 if p.get("isNew") else 0,
                            1 if p.get("isFestival") else 0,
                            p.get("stock", 10),
                            p.get("curingTimeDays", "3 business days"),
                            p.get("dimensions", ""),
                            p.get("weight", ""),
                            json.dumps(p.get("images", [])),
                            p.get("description", ""),
                            json.dumps(p.get("features", [])),
                            json.dumps(p.get("customizationOptions", {})),
                            datetime.utcnow().isoformat(),
                            datetime.utcnow().isoformat()
                        ))
                    print(f"[Database] Seeded {len(products)} products into product catalog table.")

            # Seed Categories
            cur.execute("SELECT COUNT(*) AS cnt FROM categories;")
            if cur.fetchone()["cnt"] == 0:
                cat_file = seed_dir / "initial_categories.json"
                if cat_file.exists():
                    with open(cat_file, "r", encoding="utf-8") as f:
                        cats = json.load(f)
                    for c in cats:
                        cur.execute("""
                            INSERT INTO categories (id, name, icon, count, image, tagline, description)
                            VALUES (?, ?, ?, ?, ?, ?, ?)
                        """, (
                            c.get("id"),
                            c.get("name"),
                            c.get("icon", ""),
                            c.get("count", 0),
                            c.get("image", ""),
                            c.get("tagline", ""),
                            c.get("description", "")
                        ))
                    print(f"[Database] Seeded {len(cats)} categories into categories table.")

            # Seed Users
            cur.execute("SELECT COUNT(*) AS cnt FROM users;")
            if cur.fetchone()["cnt"] == 0:
                user_file = seed_dir / "initial_users.json"
                if user_file.exists():
                    with open(user_file, "r", encoding="utf-8") as f:
                        users = json.load(f)
                    for u in users:
                        cur.execute("""
                            INSERT INTO users (username, password, name, email, phone, address, city, state, pincode, wishlist, avatar, joined_date, role)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            u.get("username"),
                            u.get("password"),
                            u.get("name"),
                            u.get("email"),
                            u.get("phone"),
                            u.get("address"),
                            u.get("city"),
                            u.get("state"),
                            u.get("pincode"),
                            json.dumps(u.get("wishlist", [])),
                            u.get("avatar", ""),
                            u.get("joinedDate", ""),
                            u.get("role", "admin" if u.get("username", "").lower() == "vikas" else "user")
                        ))
                    print(f"[Database] Seeded {len(users)} users into users table.")

            # Seed Orders
            cur.execute("SELECT COUNT(*) AS cnt FROM orders;")
            if cur.fetchone()["cnt"] == 0:
                orders_file = seed_dir / "initial_sample_orders.json"
                if orders_file.exists():
                    with open(orders_file, "r", encoding="utf-8") as f:
                        orders = json.load(f)
                    for o in orders:
                        cur.execute("""
                            INSERT INTO orders (
                                order_id, username, customer, items, subtotal, discount,
                                shipping, total, payment_method, payment_status, order_status,
                                tracking_steps, tracking_number, placed_at, updated_at
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            o.get("orderId"),
                            o.get("username", "Guest"),
                            json.dumps(o.get("customer", {})),
                            json.dumps(o.get("items", [])),
                            o.get("subtotal", 0),
                            o.get("discount", 0),
                            o.get("shipping", 0),
                            o.get("total", 0),
                            o.get("paymentMethod", ""),
                            o.get("paymentStatus", "Paid"),
                            o.get("orderStatus", "Placed"),
                            json.dumps(o.get("trackingSteps", [])),
                            o.get("trackingNumber", ""),
                            o.get("placedAt", datetime.utcnow().isoformat()),
                            datetime.utcnow().isoformat()
                        ))
                    print(f"[Database] Seeded {len(orders)} sample customer orders into orders table.")

            # Seed Custom Requests
            cur.execute("SELECT COUNT(*) AS cnt FROM custom_requests;")
            if cur.fetchone()["cnt"] == 0:
                req_file = seed_dir / "initial_custom_requests.json"
                if req_file.exists():
                    with open(req_file, "r", encoding="utf-8") as f:
                        requests = json.load(f)
                    for r in requests:
                        cur.execute("""
                            INSERT INTO custom_requests (
                                id, username, customer_name, phone, email, product_type,
                                dimensions, color_palette, inclusions, custom_text,
                                status, estimated_budget, notes, created_at
                            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                        """, (
                            r.get("id"),
                            r.get("username", "Guest"),
                            r.get("customerName", ""),
                            r.get("phone", ""),
                            r.get("email", ""),
                            r.get("productType", ""),
                            r.get("dimensions", ""),
                            r.get("colorPalette", ""),
                            json.dumps(r.get("inclusions", []) if isinstance(r.get("inclusions"), list) else [r.get("inclusions", "")]),
                            r.get("customText", ""),
                            r.get("status", "Pending Quote"),
                            r.get("estimatedBudget", ""),
                            r.get("notes", ""),
                            r.get("createdAt", datetime.utcnow().isoformat())
                        ))
                    print(f"[Database] Seeded {len(requests)} custom requests into custom_requests table.")

            # Seed Promo Codes
            cur.execute("SELECT COUNT(*) AS cnt FROM promo_codes;")
            if cur.fetchone()["cnt"] == 0:
                promo_file = seed_dir / "initial_promo_codes.json"
                if promo_file.exists():
                    with open(promo_file, "r", encoding="utf-8") as f:
                        promos = json.load(f)
                    for p in promos:
                        cur.execute("""
                            INSERT INTO promo_codes (code, discount_percent, min_order, description)
                            VALUES (?, ?, ?, ?)
                        """, (
                            p.get("code"),
                            p.get("discountPercent", 10),
                            p.get("minOrder", 0),
                            p.get("description", "")
                        ))

    def get_database_stats(self) -> dict:
        """Returns row counts and metadata from the database for health checks."""
        with self.transaction() as cur:
            cur.execute("SELECT COUNT(*) AS cnt FROM products;")
            products_count = cur.fetchone()["cnt"]

            cur.execute("SELECT COUNT(*) AS cnt FROM orders;")
            orders_count = cur.fetchone()["cnt"]

            cur.execute("SELECT COUNT(*) AS cnt FROM custom_requests;")
            custom_count = cur.fetchone()["cnt"]

            cur.execute("SELECT COUNT(*) AS cnt FROM users;")
            users_count = cur.fetchone()["cnt"]

            cur.execute("SELECT COUNT(*) AS cnt FROM categories;")
            categories_count = cur.fetchone()["cnt"]

        return {
            "database_file": str(self.db_path),
            "file_size_bytes": self.db_path.stat().st_size if self.db_path.exists() else 0,
            "status": "Healthy & Online",
            "counts": {
                "products": products_count,
                "orders": orders_count,
                "custom_requests": custom_count,
                "users": users_count,
                "categories": categories_count
            }
        }

# Global singleton database manager
db = DatabaseManager()
