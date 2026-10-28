"""
Art Alay - API Request Router
Routes incoming HTTP requests to corresponding business tier services and formats JSON responses.
"""

import json
from urllib.parse import urlparse, parse_qs
from typing import Tuple, Dict, Any, Optional

from backend.config import config
from backend.database import db
from backend.services.catalog_service import catalog_service
from backend.services.order_service import order_service
from backend.services.custom_request_service import custom_request_service
from backend.services.user_service import user_service

class ApiRouter:
    """REST API Request Router."""

    def handle(self, method: str, full_path: str, body_bytes: bytes) -> Tuple[int, Dict[str, Any]]:
        """
        Dispatches request and returns (status_code, response_dict).
        """
        parsed = urlparse(full_path)
        path = parsed.path.rstrip("/")
        if not path:
            path = "/"
        params = {k: v[0] for k, v in parse_qs(parsed.query).items()}

        # Parse JSON body if present
        body = {}
        if body_bytes and len(body_bytes) > 0:
            try:
                body = json.loads(body_bytes.decode("utf-8"))
            except Exception as e:
                return 400, {"success": False, "error": f"Invalid JSON payload: {str(e)}"}

        try:
            # --- SYSTEM & SECRETS DIAGNOSTICS ---
            if path == "/api/health" and method == "GET":
                stats = db.get_database_stats()
                return 200, {
                    "success": True,
                    "tier": "Art Alay Python Business Tier",
                    "status": "healthy",
                    "database": stats,
                    "secrets_loaded": config.loaded_successfully,
                    "timestamp": stats.get("timestamp")
                }

            if path == "/api/system/secrets-info" and method == "GET":
                info = config.get_masked_info()
                info["db_stats"] = db.get_database_stats()
                return 200, {
                    "success": True,
                    "message": "Secrets details loaded successfully with credentials masked",
                    "data": info
                }

            # --- PRODUCT CATALOG ENDPOINTS ---
            if path == "/api/products" and method == "GET":
                products = catalog_service.list_products(
                    category=params.get("category"),
                    search=params.get("search") or params.get("q"),
                    tab=params.get("tab"),
                    sort=params.get("sort")
                )
                return 200, {"success": True, "count": len(products), "products": products}

            if path.startswith("/api/products/") and method == "GET":
                prod_id = path[len("/api/products/"):]
                prod = catalog_service.get_product(prod_id)
                if not prod:
                    return 404, {"success": False, "error": f"Product '{prod_id}' not found."}
                return 200, {"success": True, "product": prod}

            if path == "/api/products" and method == "POST":
                new_prod = catalog_service.create_product(body)
                return 201, {"success": True, "message": "Product created successfully in database", "product": new_prod}

            if path.startswith("/api/products/") and method == "PUT":
                prod_id = path[len("/api/products/"):]
                updated = catalog_service.update_product(prod_id, body)
                if not updated:
                    return 404, {"success": False, "error": f"Product '{prod_id}' not found."}
                return 200, {"success": True, "message": "Product updated in database", "product": updated}

            if path.startswith("/api/products/") and method == "DELETE":
                prod_id = path[len("/api/products/"):]
                deleted = catalog_service.delete_product(prod_id)
                if not deleted:
                    return 404, {"success": False, "error": f"Product '{prod_id}' not found."}
                return 200, {"success": True, "message": f"Product '{prod_id}' removed from database."}

            if path == "/api/categories" and method == "GET":
                categories = catalog_service.list_categories()
                return 200, {"success": True, "categories": categories}

            # --- CUSTOMER ORDERS ENDPOINTS ---
            if path == "/api/orders" and method == "GET":
                orders = order_service.list_orders(username=params.get("username"))
                return 200, {"success": True, "count": len(orders), "orders": orders}

            if path.startswith("/api/orders/") and method == "GET":
                order_id = path[len("/api/orders/"):]
                order = order_service.get_order(order_id)
                if not order:
                    return 404, {"success": False, "error": f"Order '{order_id}' not found."}
                return 200, {"success": True, "order": order}

            if path == "/api/orders" and method == "POST":
                order = order_service.create_order(body)
                return 201, {"success": True, "message": "Customer order saved to database successfully.", "order": order}

            if path.startswith("/api/orders/") and method == "PUT":
                order_id = path[len("/api/orders/"):]
                status = body.get("status") or body.get("orderStatus")
                note = body.get("note") or body.get("artisanNote", "")
                if not status:
                    return 400, {"success": False, "error": "New status is required."}
                updated = order_service.update_order_status(order_id, status, note)
                if not updated:
                    return 404, {"success": False, "error": f"Order '{order_id}' not found."}
                return 200, {"success": True, "message": "Order status updated in database.", "order": updated}

            # --- BESPOKE CUSTOM REQUESTS ENDPOINTS ---
            if path == "/api/custom-requests" and method == "GET":
                requests = custom_request_service.list_requests(username=params.get("username"))
                return 200, {"success": True, "count": len(requests), "requests": requests}

            if path.startswith("/api/custom-requests/") and method == "GET":
                req_id = path[len("/api/custom-requests/"):]
                req = custom_request_service.get_request(req_id)
                if not req:
                    return 404, {"success": False, "error": f"Request '{req_id}' not found."}
                return 200, {"success": True, "request": req}

            if path == "/api/custom-requests" and method == "POST":
                new_req = custom_request_service.create_request(body)
                return 201, {"success": True, "message": "Custom request submitted to database.", "request": new_req}

            if path.startswith("/api/custom-requests/") and method == "PUT":
                req_id = path[len("/api/custom-requests/"):]
                status = body.get("status")
                updated = custom_request_service.update_request_status(req_id, status)
                if not updated:
                    return 404, {"success": False, "error": f"Request '{req_id}' not found."}
                return 200, {"success": True, "request": updated}

            # --- USER AUTHENTICATION & PROFILES ---
            if path == "/api/auth/login" and method == "POST":
                res = user_service.authenticate(body.get("username", ""), body.get("password", ""))
                return (200 if res["success"] else 401), res

            if path == "/api/auth/register" and method == "POST":
                res = user_service.register(body)
                return (201 if res["success"] else 400), res

            if path == "/api/users" and method == "GET":
                users = user_service.list_users()
                return 200, {"success": True, "users": users}

            if path.startswith("/api/users/") and method == "GET":
                username = path[len("/api/users/"):]
                user = user_service.get_user(username)
                if not user:
                    return 404, {"success": False, "error": f"User '{username}' not found."}
                return 200, {"success": True, "user": user}

            if path.startswith("/api/users/") and method == "PUT":
                username = path[len("/api/users/"):]
                updated = user_service.update_user(username, body)
                if not updated:
                    return 404, {"success": False, "error": f"User '{username}' not found."}
                return 200, {"success": True, "user": updated}

            # If path starts with /api but wasn't handled:
            if path.startswith("/api"):
                return 404, {"success": False, "error": f"API endpoint '{method} {path}' not found."}

            return 404, {"success": False, "error": "Not Found"}

        except Exception as e:
            import traceback
            traceback.print_exc()
            return 500, {"success": False, "error": f"Internal server error: {str(e)}"}

router = ApiRouter()
