from flask import Flask

from backend.config import Config
from backend.database.utils import init_db


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    init_db()
    return app
