# from backend import create_app

# app = create_app()

# if __name__ == "__main__":
#     app.run(debug=True)

import sqlalchemy as sa
import sqlalchemy.orm as so

from backend import app, db
from backend.models import Item, User


@app.shell_context_processor
def make_shell_context():
    return {"sa": sa, "so": so, "db": db, "Item": Item, "User": User}
