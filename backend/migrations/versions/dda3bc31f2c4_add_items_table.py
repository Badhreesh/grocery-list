"""add items table

Revision ID: dda3bc31f2c4
Revises:
Create Date: 2026-04-05 09:09:33.649096

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "dda3bc31f2c4"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "item",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("done", sa.Boolean(), nullable=False),
        sa.PrimaryKeyConstraint("id"),
    )
    with op.batch_alter_table("item", schema=None) as batch_op:
        batch_op.create_index(batch_op.f("ix_item_name"), ["name"], unique=True)


def downgrade():
    with op.batch_alter_table("item", schema=None) as batch_op:
        batch_op.drop_index(batch_op.f("ix_item_name"))

    op.drop_table("item")
