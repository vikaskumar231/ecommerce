"""
Art Alay - Main Server Entry Point
Launches the Python Business Tier and Database Engine.

Usage:
    python run_server.py
    python run_server.py --port 8000 --host 127.0.0.1
"""

import sys
import argparse
from pathlib import Path

# Add project root to Python path
ROOT_DIR = Path(__file__).resolve().parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

from backend.server import start_server
from backend.config import config

def main():
    parser = argparse.ArgumentParser(description="Start the Art Alay Python Business Tier & Web Server")
    parser.add_argument("--host", type=str, default=None, help=f"Host address to bind (default: {config.api_host})")
    parser.add_argument("--port", type=int, default=None, help=f"Port number to listen on (default: {config.api_port})")
    parser.add_argument("--secrets", type=str, default=None, help="Path to custom secrets.json file")
    args = parser.parse_args()

    if args.secrets:
        import os
        os.environ["SECRETS_FILE_PATH"] = str(Path(args.secrets).resolve())
        config.load_secrets()

    start_server(host=args.host, port=args.port)

if __name__ == "__main__":
    main()
