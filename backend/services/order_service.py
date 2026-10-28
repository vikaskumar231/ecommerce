"""
Art Alay - Customer Orders Business Service
Handles customer order placement, order validation, stock deductions,
order status transitions, tracking milestones, and database persistence.
"""

import json
import random
from datetime import datetime
from typing import List, Dict, Any, Optional
from backend.database import db

def _format_order(row) -> Dict[str, Any]:
    """Converts a SQLite orders row into a frontend-friendly order dictionary."""
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
        "orderId": row["order_id"],
        "username": row["username"],
        "customer": safe_json(row["customer"], {}),
        "items": safe_json(row["items"], []),
        "subtotal": row["subtotal"],
        "discount": row["discount"],
        "shipping": row["shipping"],
        "total": row["total"],
        "paymentMethod": row["payment_method"] or "UPI",
        "paymentStatus": row["payment_status"] or "Paid",
        "orderStatus": row["order_status"] or "Placed",
        "trackingSteps": safe_json(row["tracking_steps"], []),
        "trackingNumber": row["tracking_number"] or "",
        "placedAt": row["placed_at"],
        "updatedAt": row["updated_at"]
    }

class OrderService:
    """Business service governing customer orders and resin crafting timelines."""

    def create_order(self, order_data: Dict[str, Any]) -> Dict[str, Any]:
        """Validates, constructs, and persists a customer order into the database."""
        items = order_data.get("items", [])
        if not items:
            raise ValueError("An order must contain at least one item.")

        username = order_data.get("username") or "Guest"
        customer = order_data.get("customer", {})
        if not customer and "name" in order_data:
            customer = {
                "name": order_data.get("name", username),
                "phone": order_data.get("phone", ""),
                "email": order_data.get("email", ""),
                "address": order_data.get("address", ""),
                "city": order_data.get("city", ""),
                "state": order_data.get("state", ""),
                "pincode": order_data.get("pincode", "")
            }

        prefix = "".join(c for c in username.upper() if c.isalnum())[:5] or "RESIN"
        order_id = order_data.get("orderId") or f"ORD-{prefix}-{random.randint(100, 999)}"

        now = datetime.utcnow().isoformat()
        tracking_number = order_data.get("trackingNumber") or f"EXP-{random.randint(1000000, 9999999)}"

        default_steps = [
            {"status": "Order Placed", "date": "Just now", "completed": True, "active": True, "note": "Order placed & artisan assigned"},
            {"status": "Resin Poured", "date": "Scheduled in 24h", "completed": False, "note": "Color mixing & layer casting"},
            {"status": "Deep Curing (72h)", "date": "Scheduled in 48h", "completed": False, "note": "Diamond crystal glass cure"},
            {"status": "Sanding & Polishing", "date": "Pending", "completed": False, "note": "Edge beveling and hand buffing"},
            {"status": "Dispatched", "date": "Pending", "completed": False, "note": "Packaged in eco-padded gift box"},
            {"status": "Delivered", "date": "Estimated 4-6 business days", "completed": False, "note": "Safe doorstep delivery"}
        ]
        tracking_steps = order_data.get("trackingSteps") or default_steps

        subtotal = float(order_data.get("subtotal", 0))
        discount = float(order_data.get("discount", 0))
        shipping = float(order_data.get("shipping", 0))
        total = float(order_data.get("total", subtotal - discount + shipping))

        with db.transaction() as cur:
            cur.execute("""
                INSERT INTO orders (
                    order_id, username, customer, items, subtotal, discount,
                    shipping, total, payment_method, payment_status, order_status,
                    tracking_steps, tracking_number, placed_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, (
                order_id,
                username,
                json.dumps(customer),
                json.dumps(items),
                subtotal,
                discount,
                shipping,
                total,
                order_data.get("paymentMethod", "UPI (Google Pay)"),
                order_data.get("paymentStatus", "Paid"),
                order_data.get("orderStatus", "Placed"),
                json.dumps(tracking_steps),
                tracking_number,
                order_data.get("placedAt", now),
                now
            ))

            # Deduct stock for products ordered
            for item in items:
                prod_id = item.get("id")
                qty = item.get("quantity", 1)
                if prod_id:
                    cur.execute("UPDATE products SET stock = MAX(0, stock - ?) WHERE id = ?;", (qty, prod_id))

        print(f"[OrderService] Successfully saved customer order {order_id} to database.")
        return self.get_order(order_id)

    def list_orders(self, username: Optional[str] = None) -> List[Dict[str, Any]]:
        """Retrieve orders from database, optionally filtered by customer username."""
        query = "SELECT * FROM orders"
        params = []

        if username and username.strip():
            query += " WHERE LOWER(username) = ?"
            params.append(username.strip().lower())

        query += " ORDER BY placed_at DESC;"

        with db.transaction() as cur:
            cur.execute(query, params)
            rows = cur.fetchall()

        return [_format_order(r) for r in rows]

    def get_order(self, order_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve a specific order by ID from database."""
        with db.transaction() as cur:
            cur.execute("SELECT * FROM orders WHERE UPPER(order_id) = ?;", (order_id.strip().upper(),))
            row = cur.fetchone()
        return _format_order(row)

    def update_order_status(self, order_id: str, new_status: str, artisan_note: str = "") -> Optional[Dict[str, Any]]:
        """Updates order lifecycle status and tracking steps in database."""
        order = self.get_order(order_id)
        if not order:
            return None

        stages = ["Order Placed", "Resin Poured", "Curing", "Polishing", "Shipped", "Delivered"]
        target_idx = -1
        for idx, stage in enumerate(stages):
            if stage.lower() == new_status.lower() or stage.split()[0].lower() in new_status.lower():
                target_idx = idx
                break

        steps = order.get("trackingSteps", [])
        now_str = datetime.now().strftime("%d %b %Y, %I:%M %p")

        if target_idx != -1 and steps:
            for idx, step in enumerate(steps):
                if idx < target_idx:
                    step["completed"] = True
                    step["active"] = False
                elif idx == target_idx:
                    step["completed"] = True
                    step["active"] = True
                    step["date"] = now_str
                    if artisan_note:
                        step["note"] = artisan_note
                else:
                    step["completed"] = False
                    step["active"] = False

        now = datetime.utcnow().isoformat()
        with db.transaction() as cur:
            cur.execute("""
                UPDATE orders
                SET order_status = ?, tracking_steps = ?, updated_at = ?
                WHERE UPPER(order_id) = ?;
            """, (
                new_status,
                json.dumps(steps),
                now,
                order_id.strip().upper()
            ))

        return self.get_order(order_id)

order_service = OrderService()
