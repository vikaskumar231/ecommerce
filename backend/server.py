"""
Art Alay - Multithreaded HTTP Server & Business Tier Application
Serves static frontend assets and RESTful API endpoints connected to the database.
"""

import os
import sys
import json
import mimetypes
from pathlib import Path
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

from backend.config import config, BASE_DIR
from backend.api.router import router

# Ensure MIME types are registered correctly
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("application/json", ".json")

class ArtAlayRequestHandler(BaseHTTPRequestHandler):
    """Handles HTTP requests for Art Alay Ecommerce Platform."""

    server_version = f"ArtAlayBusinessTier/{config.version}"

    def _set_cors_headers(self):
        """Sets CORS headers allowing smooth frontend communication."""
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, X-Session-Id")
        self.send_header("Access-Control-Max-Age", "86400")

    def do_OPTIONS(self):
        """Handle CORS pre-flight requests."""
        self.send_response(204)
        self._set_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path.startswith("/api"):
            self._handle_api("GET")
        else:
            self._handle_static()

    def do_POST(self):
        if self.path.startswith("/api"):
            self._handle_api("POST")
        else:
            self._send_json(405, {"success": False, "error": "POST only allowed on /api endpoints"})

    def do_PUT(self):
        if self.path.startswith("/api"):
            self._handle_api("PUT")
        else:
            self._send_json(405, {"success": False, "error": "PUT only allowed on /api endpoints"})

    def do_DELETE(self):
        if self.path.startswith("/api"):
            self._handle_api("DELETE")
        else:
            self._send_json(405, {"success": False, "error": "DELETE only allowed on /api endpoints"})

    def _handle_api(self, method: str):
        content_length = int(self.headers.get("Content-Length", 0))
        body_bytes = self.rfile.read(content_length) if content_length > 0 else b""

        status_code, response_dict = router.handle(method, self.path, body_bytes)
        self._send_json(status_code, response_dict)

    def _send_json(self, status_code: int, payload: dict):
        body = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self._set_cors_headers()
        self.end_headers()
        self.wfile.write(body)

    def _handle_static(self):
        raw_path = self.path.split("?")[0].split("#")[0]
        if raw_path in ["", "/"]:
            raw_path = "/index.html"

        rel_path = raw_path.lstrip("/")

        # Check if React production build exists in dist/
        dist_dir = (BASE_DIR / "dist").resolve()
        use_dist = dist_dir.exists() and (dist_dir / "index.html").exists()

        file_path = None
        if use_dist:
            if raw_path == "/index.html":
                file_path = dist_dir / "index.html"
            elif (dist_dir / rel_path).is_file():
                file_path = (dist_dir / rel_path).resolve()
            elif (BASE_DIR / rel_path).is_file():
                file_path = (BASE_DIR / rel_path).resolve()
            elif not raw_path.startswith("/api"):
                # SPA client-side fallback
                file_path = dist_dir / "index.html"
        else:
            file_path = (BASE_DIR / rel_path).resolve()

        if not file_path:
            file_path = (BASE_DIR / rel_path).resolve()

        # Prevent directory traversal attacks
        try:
            file_path.relative_to(BASE_DIR)
        except ValueError:
            self.send_error(403, "Access Denied")
            return

        if not file_path.exists() or not file_path.is_file():
            self.send_error(404, f"File not found: {raw_path}")
            return

        mime_type, _ = mimetypes.guess_type(str(file_path))
        file_ext = file_path.suffix.lower()
        if file_ext in [".js", ".mjs"]:
            mime_type = "application/javascript; charset=utf-8"
        elif file_ext == ".css":
            mime_type = "text/css; charset=utf-8"
        elif file_ext == ".html":
            mime_type = "text/html; charset=utf-8"
        elif file_ext == ".svg":
            mime_type = "image/svg+xml"
        elif file_ext == ".json":
            mime_type = "application/json; charset=utf-8"
        elif not mime_type:
            mime_type = "application/octet-stream"

        try:
            with open(file_path, "rb") as f:
                content = f.read()

            self.send_response(200)
            self.send_header("Content-Type", mime_type)
            self.send_header("Content-Length", str(len(content)))
            self._set_cors_headers()
            if mime_type.startswith("image/"):
                self.send_header("Cache-Control", "public, max-age=3600")
            else:
                self.send_header("Cache-Control", "no-cache")
            self.end_headers()
            self.wfile.write(content)
        except Exception as e:
            self.send_error(500, f"Error reading file: {str(e)}")

    def log_message(self, format, *args):
        # Clean logging output
        sys.stdout.write(f"[{self.log_date_time_string()}] {format % args}\n")
        sys.stdout.flush()

def start_server(host: str = None, port: int = None):
    """Starts the multithreaded server."""
    host = host or config.api_host
    port = port or config.api_port

    ThreadingHTTPServer.allow_reuse_address = True
    server = ThreadingHTTPServer((host, port), ArtAlayRequestHandler)
    print("=" * 70)
    print(f"[*] {config.service_name} v{config.version}")
    print(f"[>] Business Tier API & Web Server running on: http://{host}:{port}")
    print(f"[#] Secrets File: {config.secrets_path.name} (Database parameters loaded)")
    print(f"[$] Database Engine: {config.db_engine} -> {config.sqlite_path.name}")
    print(f"[@] Frontend URL: http://{host}:{port}/")
    print(f"[+] Health Check: http://{host}:{port}/api/health")
    print(f"[i] Secrets & DB Info: http://{host}:{port}/api/system/secrets-info")
    print("=" * 70)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[Server] Shutting down gracefully...")
        server.server_close()
        print("[Server] Stopped.")

if __name__ == "__main__":
    start_server()
