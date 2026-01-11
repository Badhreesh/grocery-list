import sqlite3
from pathlib import Path

from flask import current_app, g

schema_path = Path(__file__).parent / "schema.sql"
db_path = schema_path.parent / "groceries.db"


def get_db_connection() -> sqlite3.Connection:
    if "db_conn" not in g:
        g.db_conn = sqlite3.connect(db_path)
        g.db_conn.row_factory = sqlite3.Row
    return g.db_conn


def close_db_connection(e=None) -> None:
    db_conn = g.pop("db_conn", None)
    if db_conn is not None:
        db_conn.close()


def init_db() -> None:
    conn = get_db_connection()
    with current_app.open_resource(schema_path.as_posix()) as f:
        conn.executescript(f.read().decode())
