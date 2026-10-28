"""
Art Alay - User & Authentication Business Service
Handles customer profile management, authentication, and wishlist persistence in database.
"""

import json
from datetime import datetime
from typing import List, Dict, Any, Optional
from backend.database import db

def _format_user(row, include_password: bool = False) -> Dict[str, Any]:
    if not row:
        return None

    def safe_json(val, default):
        if not val:
            return default
        try:
            return json.loads(val)
        except Exception:
            return default

    user_data = {
        "username": row["username"],
        "name": row["name"] or row["username"],
        "email": row["email"] or "",
        "phone": row["phone"] or "",
        "address": row["address"] or "",
        "city": row["city"] or "",
        "state": row["state"] or "",
        "pincode": row["pincode"] or "",
        "wishlist": safe_json(row["wishlist"], []),
        "avatar": row["avatar"] or row["username"][:1].upper(),
        "joinedDate": row["joined_date"] or "",
        "role": row["role"] if ("role" in row.keys() and row["role"]) else ("admin" if row["username"].lower() == "vikas" else "user"),
        "isAdmin": ((row["role"] == "admin") if ("role" in row.keys() and row["role"]) else (row["username"].lower() == "vikas"))
    }

    if include_password:
        user_data["password"] = row["password"]

    return user_data

class UserService:
    """Business service governing customer accounts."""

    def authenticate(self, username: str, password: str) -> Dict[str, Any]:
        """Authenticate user against database credentials."""
        if not username or not password:
            return {"success": False, "message": "Username and password required."}

        with db.transaction() as cur:
            cur.execute("SELECT * FROM users WHERE LOWER(username) = ?;", (username.strip().lower(),))
            row = cur.fetchone()

        if not row:
            return {"success": False, "message": "Invalid credentials. User does not exist."}

        if row["password"] != password.strip():
            return {"success": False, "message": "Invalid password."}

        return {"success": True, "user": _format_user(row)}

    def register(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Register new user into database."""
        username = data.get("username", "").strip()
        password = data.get("password", "").strip()

        if not username or not password:
            return {"success": False, "message": "Username and password are required."}

        with db.transaction() as cur:
            cur.execute("SELECT COUNT(*) AS cnt FROM users WHERE LOWER(username) = ?;", (username.lower(),))
            if cur.fetchone()["cnt"] > 0:
                return {"success": False, "message": f'Username "{username}" is already taken.'}

            name = data.get("name", username).strip()
            joined = datetime.now().strftime("%B %Y")
            user_role = "admin" if username.lower() == "vikas" else "user"
            cur.execute("""
                INSERT INTO users (username, password, name, email, phone, address, city, state, pincode, wishlist, avatar, joined_date, role)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            """, (
                username,
                password,
                name,
                data.get("email", "").strip() or f"{username.lower()}@example.com",
                data.get("phone", "").strip() or "+91 98000 00000",
                data.get("address", "").strip(),
                data.get("city", "").strip(),
                data.get("state", "").strip(),
                data.get("pincode", "").strip(),
                json.dumps([]),
                name[:1].upper() if name else username[:1].upper(),
                joined,
                user_role
            ))

        return {"success": True, "user": self.get_user(username)}

    def get_user(self, username: str) -> Optional[Dict[str, Any]]:
        with db.transaction() as cur:
            cur.execute("SELECT * FROM users WHERE LOWER(username) = ?;", (username.strip().lower(),))
            row = cur.fetchone()
        return _format_user(row)

    def list_users(self) -> List[Dict[str, Any]]:
        with db.transaction() as cur:
            cur.execute("SELECT * FROM users ORDER BY username ASC;")
            rows = cur.fetchall()
        return [_format_user(r) for r in rows]

    def update_user(self, username: str, updates: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        existing = self.get_user(username)
        if not existing:
            return None

        fields = []
        params = []
        if "name" in updates:
            fields.append("name = ?")
            params.append(updates["name"])
        if "email" in updates:
            fields.append("email = ?")
            params.append(updates["email"])
        if "phone" in updates:
            fields.append("phone = ?")
            params.append(updates["phone"])
        if "address" in updates:
            fields.append("address = ?")
            params.append(updates["address"])
        if "city" in updates:
            fields.append("city = ?")
            params.append(updates["city"])
        if "state" in updates:
            fields.append("state = ?")
            params.append(updates["state"])
        if "pincode" in updates:
            fields.append("pincode = ?")
            params.append(updates["pincode"])
        if "wishlist" in updates:
            fields.append("wishlist = ?")
            params.append(json.dumps(updates["wishlist"]))

        if fields:
            params.append(username.strip().lower())
            sql = f"UPDATE users SET {', '.join(fields)} WHERE LOWER(username) = ?;"
            with db.transaction() as cur:
                cur.execute(sql, params)

        return self.get_user(username)

user_service = UserService()
