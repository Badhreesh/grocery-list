import sqlite3
from pathlib import Path

schema_path = Path(__file__).parent / "schema.sql"
db_path = schema_path.parent / "groceries.db"


def get_db_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    conn = get_db_connection()
    with open(schema_path, "r") as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()
