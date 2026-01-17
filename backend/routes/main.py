from flask import Blueprint, jsonify, request

from backend.database.utils import get_db_connection

bp = Blueprint("main", __name__)


@bp.route("/")
def welcome():
    return jsonify({"message": "Hello from the grocery list API"})


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
    cursor = conn.cursor()
    cursor.execute("INSERT into items (name) VALUES (?)", [item_name])
    conn.commit()

    item_id = cursor.lastrowid
    item = cursor.execute("SELECT * FROM items where id = ?", [item_id]).fetchone()
    return jsonify(dict(item)), 201


@bp.route("/items/<item_id>", methods=["DELETE"])
def delete_item(item_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    item = cursor.execute("SELECT name from items where id = ?", [item_id]).fetchone()
    cursor.execute("DELETE from items where id = ?", [item_id])
    conn.commit()
    return jsonify(f"{item['name']} has been removed from the list"), 200


@bp.route("/items/<item_id>", methods=["PUT"])
def update_item(item_id: str):
    conn = get_db_connection()
    cursor = conn.cursor()
    item = cursor.execute("SELECT done from items where id = ?", [item_id]).fetchone()
    if item["done"] == 0:
        cursor.execute("UPDATE items SET done = ? WHERE id = ?", [1, item_id])
    else:
        cursor.execute("UPDATE items SET done = ? WHERE id = ?", [0, item_id])
    conn.commit()
    updated_item = cursor.execute(
        "SELECT * FROM items where id = ?", [item_id]
    ).fetchone()
    updated_item = dict(updated_item)
    updated_item = updated_item | {"done": bool(updated_item["done"])}
    return jsonify(updated_item), 200
