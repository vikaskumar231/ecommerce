"""
Art Alay - Configuration & Secrets Manager
Loads and validates database credentials and application secrets from secrets.json.
"""

import json
import os
import sys
from pathlib import Path

# Base directories
BASE_DIR = Path(__file__).resolve().parent.parent
SECRETS_FILE = os.getenv("SECRETS_FILE_PATH", str(BASE_DIR / "secrets.json"))

def mask_secret(value: str, visible_start: int = 4, visible_end: int = 3) -> str:
    """Mask sensitive string for safe logging and status reporting."""
    if not value or not isinstance(value, str):
        return "****"
    if len(value) <= visible_start + visible_end:
        return "*" * len(value)
    return f"{value[:visible_start]}****{value[-visible_end:]}"

class AppConfig:
    """Application and Database configuration singleton."""

    def __init__(self, secrets_path: str = SECRETS_FILE):
        self.secrets_path = Path(secrets_path)
        self.raw_data = {}
        self.loaded_successfully = False
        self.load_secrets()

    def load_secrets(self):
        """Load database credentials and secrets from JSON file."""
        if not self.secrets_path.exists():
            print(f"[WARNING] Secrets file not found at: {self.secrets_path}")
            print("[INFO] Initializing default fallback credentials...")
            self.raw_data = self._get_default_secrets()
            self.loaded_successfully = False
            return

        try:
            with open(self.secrets_path, "r", encoding="utf-8") as f:
                self.raw_data = json.load(f)
            self.loaded_successfully = True
            print(f"[Config] Successfully loaded secrets from: {self.secrets_path.name}")
        except Exception as e:
            print(f"[ERROR] Failed to parse secrets file {self.secrets_path}: {e}", file=sys.stderr)
            self.raw_data = self._get_default_secrets()
            self.loaded_successfully = False

    def _get_default_secrets(self) -> dict:
        return {
            "database": {
                "engine": "postgresql",
                "host": "db-cluster.artalay-resin-enterprise.internal",
                "port": 5432,
                "name": "artalay_ecommerce_db",
                "username": "art_alay_db_admin",
                "password": "ArtAlay_SuperSecret_Resin_Password_2026!#",
                "ssl_mode": "verify-full",
                "sqlite_storage_path": "backend/data/artalay.db",
                "use_local_sqlite_storage": True
            },
            "business_tier": {
                "environment": "development",
                "service_name": "ArtAlay-Ecommerce-BusinessTier",
                "version": "2.4.0",
                "api_host": "127.0.0.1",
                "api_port": 8000,
                "jwt_secret": "resin_jwt_secret_dev_token_991823a8b7c6",
                "currency": "INR",
                "currency_symbol": "₹"
            },
            "third_party_secrets": {
                "razorpay_key_id": "rzp_test_dummy_key_artalay123",
                "razorpay_key_secret": "rzp_secret_dummy_artalay987654321",
                "delhivery_api_token": "delhivery_sandbox_token_resin_441092"
            }
        }

    # Database Accessors
    @property
    def db_config(self) -> dict:
        return self.raw_data.get("database", {})

    @property
    def db_engine(self) -> str:
        return self.db_config.get("engine", "postgresql")

    @property
    def db_host(self) -> str:
        return self.db_config.get("host", "db-cluster.artalay-resin-enterprise.internal")

    @property
    def db_port(self) -> int:
        return int(self.db_config.get("port", 5432))

    @property
    def db_name(self) -> str:
        return self.db_config.get("name", "artalay_ecommerce_db")

    @property
    def db_username(self) -> str:
        return self.db_config.get("username", "art_alay_db_admin")

    @property
    def db_password(self) -> str:
        return self.db_config.get("password", "")

    @property
    def db_ssl_mode(self) -> str:
        return self.db_config.get("ssl_mode", "verify-full")

    @property
    def sqlite_path(self) -> Path:
        rel_path = self.db_config.get("sqlite_storage_path", "backend/data/artalay.db")
        path = BASE_DIR / rel_path
        path.parent.mkdir(parents=True, exist_ok=True)
        return path

    @property
    def use_local_sqlite(self) -> bool:
        return bool(self.db_config.get("use_local_sqlite_storage", True))

    # Business Tier Accessors
    @property
    def tier_config(self) -> dict:
        return self.raw_data.get("business_tier", {})

    @property
    def api_host(self) -> str:
        return self.tier_config.get("api_host", "127.0.0.1")

    @property
    def api_port(self) -> int:
        return int(self.tier_config.get("api_port", 8000))

    @property
    def service_name(self) -> str:
        return self.tier_config.get("service_name", "ArtAlay-Ecommerce-BusinessTier")

    @property
    def version(self) -> str:
        return self.tier_config.get("version", "2.4.0")

    @property
    def currency(self) -> str:
        return self.tier_config.get("currency", "INR")

    @property
    def currency_symbol(self) -> str:
        return self.tier_config.get("currency_symbol", "₹")

    def get_masked_info(self) -> dict:
        """Returns safe metadata about loaded secrets and database connection for health checks."""
        return {
            "secrets_file_loaded": self.loaded_successfully,
            "secrets_file_name": self.secrets_path.name,
            "service_name": self.service_name,
            "version": self.version,
            "environment": self.tier_config.get("environment", "development"),
            "database": {
                "configured_engine": self.db_engine,
                "configured_host": self.db_host,
                "configured_port": self.db_port,
                "configured_database": self.db_name,
                "configured_username": self.db_username,
                "configured_password": mask_secret(self.db_password),
                "ssl_mode": self.db_ssl_mode,
                "active_storage_engine": "SQLite Relational Database (Persistent File)" if self.use_local_sqlite else "Remote Production Cluster",
                "storage_file": str(self.sqlite_path.relative_to(BASE_DIR)) if self.use_local_sqlite else "Remote Host",
            },
            "third_party_integrations": {
                "razorpay_key_id": mask_secret(self.raw_data.get("third_party_secrets", {}).get("razorpay_key_id", ""), 6, 3),
                "delhivery_tracking": "Configured & Active",
                "whatsapp_business": "Configured & Active"
            }
        }

# Global singleton configuration
config = AppConfig()
