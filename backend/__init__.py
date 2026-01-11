from flask import Flask

from backend.database.utils import close_db_connection, init_db
from backend.routes.main import bp


def create_app():
    app = Flask(__name__)
    with app.app_context():
        init_db()
    app.register_blueprint(bp)
    app.teardown_appcontext(close_db_connection)

    return app
