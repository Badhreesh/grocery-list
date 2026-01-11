from flask import Blueprint, jsonify, request

from backend.database.utils import get_db_connection

bp = Blueprint("main", __name__)


@bp.route("/items")
def get_items():
    conn = get_db_connection()
    items = conn.execute("SELECT * FROM items").fetchall()
    items = [dict(item) for item in items]
    return jsonify(items)


@bp.route("/items", methods=["POST"])
def add_item():
    data = request.get_json()
    item_name = data.get("name")
    if item_name is None:
        return jsonify({"error": "Please provide a name for your item!"}), 400
    else:
        item_name = item_name.capitalize()
    conn = get_db_connection()
    conn.execute("INSERT into items (name) VALUES (?)", ([item_name]))
    conn.commit()
    return jsonify(f"{item_name} has been added to the list"), 201


@bp.route("/items/<item_id>", methods=["DELETE"])
def delete_item(item_id: str):
    conn = get_db_connection()
    item = conn.execute("SELECT name from items where id = ?", (item_id)).fetchone()
    conn.execute("DELETE from items where id = ?", (item_id))
    conn.commit()
    return jsonify(f"{item['name']} has been removed from the list"), 200
