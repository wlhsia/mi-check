from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import  Api

from config import Config

db = SQLAlchemy()
ma = Marshmallow()
api = Api()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    ma.init_app(app)

    from .resources.item import Item, ItemList
    api.add_resource(Item, '/items/<item_id>')
    api.add_resource(ItemList, '/items')
    api.init_app(app)

    # with app.app_context():
    #     from . import models
    #     db.create_all()

    return app