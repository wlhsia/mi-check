from flask import request, jsonify
from flask_restful import Resource

from app import db
from ..models import *
from ..schemas import *

item_schema = ItemSchema()
items_schema = ItemSchema(many=True)

class Item(Resource):
    def get(self, item_id):
        item = MICheckItem.query.filter(MICheckItem.ItemID==item_id).first()
        return item_schema.dump(item)
    def delete(self, item_id):
        item = MICheckItem.query.filter(MICheckItem.ItemID==item_id).first()
        db.session.delete(item)
        db.session.commit()
        return 'success'

class ItemList(Resource):
    def get(self):
        t = request.args['type']
        items = MICheckItem.query.filter(MICheckItem).all()
        return items_schema.dump(items)
    def post(self):
        item = MICheckItem(**request.json)
        db.session.merge(item)
        db.session.commit()
        return 'success'


