"""add users table

Revision ID: e860f5c9deb5
Revises: dda3bc31f2c4
Create Date: 2026-04-05 09:55:17.751515

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "e860f5c9deb5"
down_revision = "dda3bc31f2c4"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "user",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("username", sa.String(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    with op.batch_alter_table("user", schema=None) as batch_op:
        batch_op.create_index(batch_op.f("ix_user_username"), ["username"], unique=True)

    with op.batch_alter_table("item", schema=None) as batch_op:
        batch_op.add_column(sa.Column("user_id", sa.Integer(), nullable=False))
        batch_op.create_index(batch_op.f("ix_item_user_id"), ["user_id"], unique=False)
        batch_op.create_foreign_key("FK_User_Item", "user", ["user_id"], ["id"])


def downgrade():
    with op.batch_alter_table("item", schema=None) as batch_op:
        batch_op.drop_constraint("FK_User_Item", type_="foreignkey")
        batch_op.drop_index(batch_op.f("ix_item_user_id"))
        batch_op.drop_column("user_id")

    with op.batch_alter_table("user", schema=None) as batch_op:
        batch_op.drop_index(batch_op.f("ix_user_username"))

    op.drop_table("user")
