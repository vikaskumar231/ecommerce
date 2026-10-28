"""
Art Alay - Product Catalog Business Service
Handles all product catalog operations: querying, filtering, sorting,
stock checking, additions, updates, and category synchronization with the database.
"""

import json
from datetime import datetime
from typing import List, Dict, Any, Optional
from backend.database import db

def _format_product(row) -> Dict[str, Any]:
    """Converts a SQLite products row into a frontend-friendly product dictionary."""
    if not row:
        return None

    def safe_json(val, default):
        if not val:
            return default
        try:
            return json.loads(val)
        except Exception:
            return default

    return {
        "id": row["id"],
        "name": row["name"],
        "category": row["category"],
        "categoryName": row["category_name"],
        "price": row["price"],
        "originalPrice": row["original_price"],
        "rating": row["rating"],
        "reviewCount": row["review_count"],
        "badge": row["badge"] or "",
        "showOnHome": bool(row["show_on_home"]) if "show_on_home" in row.keys() else bool(row["is_featured"]),
        "isFeatured": bool(row["is_featured"]),
        "isBestseller": bool(row["is_bestseller"]),
        "isNew": bool(row["is_new"]),
        "isFestival": bool(row["is_festival"]),
        "stock": row["stock"],
        "curingTimeDays": row["curing_time_days"] or "3 business days",
        "dimensions": row["dimensions"] or "",
        "weight": row["weight"] or "",
        "images": safe_json(row["images"], []),
        "description": row["description"] or "",
        "features": safe_json(row["features"], []),
        "customizationOptions": safe_json(row["customization_options"], {}),
        "createdAt": row["created_at"],
        "updatedAt": row["updated_at"]
    }

class CatalogService:
    """Business service governing the handcrafted product catalog."""

    def list_products(
        self,
        category: Optional[str] = None,
        search: Optional[str] = None,
        tab: Optional[str] = None,
        sort: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Query product catalog from database with search, category filtering, tabs, and sorting."""
        query = "SELECT * FROM products WHERE 1=1"
        params = []

        if category and category.lower() != "all":
            query += " AND category = ?"
            params.append(category.lower())

        if search and search.strip():
            term = f"%{search.strip().lower()}%"
            query += " AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?)"
            params.extend([term, term, term])

        if tab:
            tab_lower = tab.lower()
            if tab_lower == "featured":
                query += " AND is_featured = 1"
            elif tab_lower == "bestseller":
                query += " AND is_bestseller = 1"
            elif tab_lower == "new":
                query += " AND is_new = 1"
            elif tab_lower == "festival":
                query += " AND is_festival = 1"

        # Sorting logic
        if sort == "price-asc":
            query += " ORDER BY price ASC"
        elif sort == "price-desc":
            query += " ORDER BY price DESC"
        elif sort == "rating":
            query += " ORDER BY rating DESC, review_count DESC"
        else: # popular / default
            query += " ORDER BY is_featured DESC, rating DESC, review_count DESC"

        with db.transaction() as cur:
            cur.execute(query, params)
            rows = cur.fetchall()

        return [_format_product(r) for r in rows]

    def get_product(self, product_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve a single product by ID from database."""
        with db.transaction() as cur:
            cur.execute("SELECT * FROM products WHERE id = ?;", (product_id,))
            row = cur.fetchone()
        return _format_product(row)

    def create_product(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Validate and insert a new product into the database."""
        if not data.get("name"):
            raise ValueError("Product name is required.")
        if "price" not in data:
            raise ValueError("Product price is required.")

        prod_id = data.get("id") or f"prod-{int(datetime.utcnow().timestamp() * 1000)}"
        now = datetime.utcnow().isoformat()

        images = data.get("images", [])
        if not images:
            images = ["images/wall-clock.svg"]

        with db.transaction() as cur:
            cur.execute("""
                INSERT INTO products (
                    id, name, category, category_name, price, original_price,
                    rating, review_count, badge, is_featured, is_bestseller,
                    is_new, is_festival, stock, curing_time_days, dimensions,
                    weight, images, description, features, customization_options,
                    created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, (
                prod_id,
                data.get("name"),
                data.get("category", "wall-clock"),
                data.get("categoryName", data.get("category", "Wall Clock").replace("-", " ").title()),
                float(data.get("price", 0)),
                float(data.get("originalPrice", data.get("price", 0))),
                float(data.get("rating", 5.0)),
                int(data.get("reviewCount", 1)),
                data.get("badge", "New"),
                1 if data.get("isFeatured") else 0,
                1 if data.get("isBestseller") else 0,
                1 if data.get("isNew", True) else 0,
                1 if data.get("isFestival") else 0,
                int(data.get("stock", 10)),
                data.get("curingTimeDays", "3 business days"),
                data.get("dimensions", ""),
                data.get("weight", ""),
                json.dumps(images),
                data.get("description", ""),
                json.dumps(data.get("features", [])),
                json.dumps(data.get("customizationOptions", {})),
                now,
                now
            ))

        return self.get_product(prod_id)

    def update_product(self, product_id: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """Update product details in database."""
        existing = self.get_product(product_id)
        if not existing:
            return None

        fields_to_update = []
        params = []

        field_map = {
            "name": ("name", lambda x: str(x)),
            "category": ("category", lambda x: str(x)),
            "categoryName": ("category_name", lambda x: str(x)),
            "price": ("price", lambda x: float(x)),
            "originalPrice": ("original_price", lambda x: float(x)),
            "rating": ("rating", lambda x: float(x)),
            "reviewCount": ("review_count", lambda x: int(x)),
            "badge": ("badge", lambda x: str(x)),
            "showOnHome": ("show_on_home", lambda x: 1 if x else 0),
            "isFeatured": ("is_featured", lambda x: 1 if x else 0),
            "isBestseller": ("is_bestseller", lambda x: 1 if x else 0),
            "isNew": ("is_new", lambda x: 1 if x else 0),
            "isFestival": ("is_festival", lambda x: 1 if x else 0),
            "stock": ("stock", lambda x: int(x)),
            "curingTimeDays": ("curing_time_days", lambda x: str(x)),
            "dimensions": ("dimensions", lambda x: str(x)),
            "weight": ("weight", lambda x: str(x)),
            "images": ("images", lambda x: json.dumps(x if isinstance(x, list) else [x])),
            "description": ("description", lambda x: str(x)),
            "features": ("features", lambda x: json.dumps(x if isinstance(x, list) else [x])),
            "customizationOptions": ("customization_options", lambda x: json.dumps(x if isinstance(x, dict) else {}))
        }

        for key, (col_name, transform) in field_map.items():
            if key in updates:
                fields_to_update.append(f"{col_name} = ?")
                params.append(transform(updates[key]))

        if not fields_to_update:
            return existing

        fields_to_update.append("updated_at = ?")
        params.append(datetime.utcnow().isoformat())
        params.append(product_id)

        sql = f"UPDATE products SET {', '.join(fields_to_update)} WHERE id = ?;"

        with db.transaction() as cur:
            cur.execute(sql, params)

        return self.get_product(product_id)

    def update_product_image(self, product_id: str, new_image_url: str) -> Optional[Dict[str, Any]]:
        """Updates the primary image for a product in the database."""
        existing = self.get_product(product_id)
        if not existing:
            return None

        images = existing.get("images", [])
        if not images:
            images = [new_image_url]
        else:
            images[0] = new_image_url

        return self.update_product(product_id, {"images": images})

    def delete_product(self, product_id: str) -> bool:
        """Removes a product from the database."""
        with db.transaction() as cur:
            cur.execute("DELETE FROM products WHERE id = ?;", (product_id,))
            deleted = cur.rowcount > 0
        return deleted

    def list_categories(self) -> List[Dict[str, Any]]:
        """Fetches all categories with dynamically computed live product counts from database."""
        with db.transaction() as cur:
            cur.execute("SELECT * FROM categories;")
            cat_rows = cur.fetchall()

            # Get counts per category
            cur.execute("SELECT category, COUNT(*) as cnt FROM products GROUP BY category;")
            count_rows = cur.fetchall()
            counts = {r["category"]: r["cnt"] for r in count_rows}
            total_count = sum(counts.values())

        categories = []
        for r in cat_rows:
            cat_id = r["id"]
            cnt = total_count if cat_id == "all" else counts.get(cat_id, 0)
            categories.append({
                "id": cat_id,
                "name": r["name"],
                "icon": r["icon"] or "",
                "count": cnt,
                "image": r["image"] or "",
                "tagline": r["tagline"] or "",
                "description": r["description"] or ""
            })

        return categories

catalog_service = CatalogService()
