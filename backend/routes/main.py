import sqlalchemy as sa
from flask import Blueprint, jsonify, request
from sqlalchemy.exc import IntegrityError

from backend import db
from backend.models import Item, User

bp = Blueprint("main", __name__)


@bp.route("/")
def welcome():
    return jsonify({"message": "Hello from the grocery list API"})


@bp.route("/items")
def get_items():
    q = sa.select(Item)
    items = db.session.scalars(q).all()
    items = [{"id": item.id, "name": item.name, "done": item.done} for item in items]
    return jsonify(items)


@bp.route("/items", methods=["POST"])
def add_item():
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
        return jsonify({"message": f"Added {item_name} to list"}), 201
    except IntegrityError:
        return jsonify(
            {"message": f"{item_name} already exists in list."}
        ), 409  # conflict status code


@bp.route("/items/<item_id>", methods=["DELETE"])
def delete_item(item_id: str):
    i = db.session.get(Item, int(item_id))
    name = i.name
    db.session.delete(i)
    db.session.commit()
    return jsonify({"message": f"{name} has been removed from list"}), 200


@bp.route("/items/<item_id>", methods=["PUT"])
def update_item(item_id: str):
    i = db.session.get(Item, int(item_id))
    name = i.name
    i.done = not i.done
    db.session.add(i)
    db.session.commit()
    return jsonify({"message": f"set done={i.done} for {name}"}), 200
