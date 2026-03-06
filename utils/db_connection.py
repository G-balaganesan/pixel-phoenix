"""Utility module to manage database connections (SQLite by default)."""

import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent.parent / "database" / "defense_data.db"


def get_connection(path: Path = DB_PATH):
    """Return a sqlite3 connection object."""
    return sqlite3.connect(str(path))


if __name__ == "__main__":
    # quick test
    conn = get_connection()
    print("Connected to", conn)
    conn.close()
