import os

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = (
    os.getenv("DATABASE_URL")
    or "postgresql://badhreesh:cuddles@localhost:5432/groceries"
)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
# db.init_app(app)
# migrate.init_app(app, db)
# CORS(app)
# with app.app_context():
#     init_db()
from backend.routes.main import bp

app.register_blueprint(bp)

# from backend import models
