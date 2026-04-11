import sqlalchemy as sa
from flask import Blueprint, Response, jsonify, request
from sqlalchemy.exc import IntegrityError

from backend import db
from backend.models import Item, User

bp = Blueprint("main", __name__)


@bp.route("/")
def welcome() -> tuple[Response, int]:
    return jsonify({"message": "Hello from the grocery list API"}), 200


@bp.route("/items")
def get_items() -> tuple[Response, int]:
    q = sa.select(Item)
    items = db.session.scalars(q).all()
    items = [{"id": item.id, "name": item.name, "done": item.done} for item in items]
    return jsonify(items), 200


@bp.route("/items", methods=["POST"])
def add_item() -> tuple[Response, int]:
    data = request.get_json()
    item_name = data.get("name")
    if item_name is None:
        return jsonify({"error": "Please provide a name for your item!"}), 400
    else:
        item_name = item_name.capitalize()
    # todo: The user should be passed in from the frontend
    u = db.session.get(User, 1)  # Get my name as the default user for now
    i = Item(name=item_name, added_by=u)
    try:
        db.session.add(i)
        db.session.commit()
        q = sa.select(Item).order_by(Item.id.desc())
        added_item = db.session.execute(q).scalar()
        assert isinstance(added_item, Item), (
            "The newly added item must be available in DB."
        )
        return jsonify(
            {
                "id": added_item.id,
                "name": added_item.name,
                "done": added_item.done,
                "message": f"Added {item_name} to list",
            }
        ), 201
    except IntegrityError:
        return jsonify(
            {
                "error": "Item name unique constraint not met",
                "details": f"{item_name} already exists in DB",
            }
        ), 409  # conflict status code


@bp.route("/items/<item_id>", methods=["DELETE"])
def delete_item(item_id: str) -> tuple[Response, int]:
    i = db.session.get(Item, int(item_id))
    if i is None:
        return jsonify({"message": f"Item with id={item_id} doesn't exist in DB"}), 404
    name = i.name
    db.session.delete(i)
    db.session.commit()
    return jsonify({"message": f"Item {name!r} deleted successfully"}), 200


@bp.route("/items/<item_id>", methods=["PUT"])
def update_item(item_id: str) -> tuple[Response, int]:
    i = db.session.get(Item, int(item_id))
    if i is None:
        return jsonify({"message": f"Item with id={item_id} doesn't exist in DB"}), 404
    name = i.name
    i.done = not i.done
    db.session.add(i)
    db.session.commit()
    return jsonify(
        {
            "id": i.id,
            "name": i.name,
            "done": i.done,
            "message": f"Set done={i.done} for {name}",
        }
    ), 200
