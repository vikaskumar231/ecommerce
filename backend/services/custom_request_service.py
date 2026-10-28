"""
Art Alay - Bespoke Custom Requests Business Service
Manages personalized resin requests, quote discussions, and status updates in database.
"""

import json
import random
from datetime import datetime
from typing import List, Dict, Any, Optional
from backend.database import db

def _format_request(row) -> Dict[str, Any]:
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
        "username": row["username"],
        "customerName": row["customer_name"],
        "phone": row["phone"],
        "email": row["email"],
        "productType": row["product_type"],
        "dimensions": row["dimensions"],
        "colorPalette": row["color_palette"],
        "inclusions": safe_json(row["inclusions"], []),
        "customText": row["custom_text"],
        "status": row["status"] or "Pending Quote",
        "estimatedBudget": row["estimated_budget"],
        "notes": row["notes"],
        "createdAt": row["created_at"]
    }

class CustomRequestService:
    """Business service governing bespoke customized orders."""

    def create_request(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Insert bespoke resin quote request into database."""
        req_id = data.get("id") or f"REQ-{random.randint(1000, 9999)}"
        inclusions = data.get("inclusions", [])
        if isinstance(inclusions, str):
            inclusions = [inclusions]

        now = datetime.utcnow().isoformat()
        with db.transaction() as cur:
            cur.execute("""
                INSERT INTO custom_requests (
                    id, username, customer_name, phone, email, product_type,
                    dimensions, color_palette, inclusions, custom_text,
                    status, estimated_budget, notes, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, (
                req_id,
                data.get("username", "Guest"),
                data.get("customerName", ""),
                data.get("phone", ""),
                data.get("email", ""),
                data.get("productType", ""),
                data.get("dimensions", ""),
                data.get("colorPalette", ""),
                json.dumps(inclusions),
                data.get("customText", ""),
                data.get("status", "Pending Quote"),
                data.get("estimatedBudget", "₹3,999"),
                data.get("notes", ""),
                data.get("createdAt", now)
            ))

        return self.get_request(req_id)

    def list_requests(self, username: Optional[str] = None) -> List[Dict[str, Any]]:
        """Retrieve custom requests from database."""
        query = "SELECT * FROM custom_requests"
        params = []
        if username and username.strip():
            query += " WHERE LOWER(username) = ?"
            params.append(username.strip().lower())
        query += " ORDER BY created_at DESC;"

        with db.transaction() as cur:
            cur.execute(query, params)
            rows = cur.fetchall()

        return [_format_request(r) for r in rows]

    def get_request(self, req_id: str) -> Optional[Dict[str, Any]]:
        with db.transaction() as cur:
            cur.execute("SELECT * FROM custom_requests WHERE id = ?;", (req_id,))
            row = cur.fetchone()
        return _format_request(row)

    def update_request_status(self, req_id: str, new_status: str) -> Optional[Dict[str, Any]]:
        with db.transaction() as cur:
            cur.execute("UPDATE custom_requests SET status = ? WHERE id = ?;", (new_status, req_id))
        return self.get_request(req_id)

custom_request_service = CustomRequestService()
