import sqlalchemy as sa
import sqlalchemy.orm as so

from backend import db


class User(db.Model):
    __tablename__ = "user"
    # Attributes
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(index=True, unique=True)

    # Relationships
    # Using the WriteOnlyMapped generic type allows to query for items with a select statement like so:
    # u = db.session.get(User, 1)
    # q = u.items.select()
    # items = db.session.scalars(q).all()
    items: so.WriteOnlyMapped["Item"] = so.relationship(
        "Item", back_populates="added_by"
    )

    def __repr__(self) -> str:
        return f"<User {self.username}>"


class Item(db.Model):
    __tablename__ = "item"
    # Attributes
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    name: so.Mapped[str] = so.mapped_column(index=True, unique=True)
    done: so.Mapped[bool] = so.mapped_column(sa.Boolean, nullable=False, default=False)

    # Foreign keys
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey(User.id), index=True)

    # Relationships
    added_by: so.Mapped["User"] = so.relationship("User", back_populates="items")

    def __repr__(self) -> str:
        return f"<Item {self.name}>"
