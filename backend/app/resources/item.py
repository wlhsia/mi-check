from flask import request, jsonify
from flask_restful import reqparse, Resource
from flask_jwt_extended import jwt_required

from app import db
from ..models import *
from ..schemas import *


item_schema = ItemSchema()
items_schema = ItemSchema(many=True)

class Item(Resource):
    @jwt_required()
    def get(self, item_id):
        item = Items.query.filter(Items.ItemID==item_id).first()
        return item_schema.dump(item)
    @jwt_required()
    def delete(self, item_id):
        item = Items.query.filter(Items.ItemID==item_id).first()
        db.session.delete(item)
        db.session.commit()
        return 'success'

class ItemList(Resource):
    @jwt_required()
    def get(self):
        # item_type = request.args['ItemType']
        # if item_type is None:
        #     items = Items.query.all()
        # else:
        #     items = Items.query.filter(Items.ItemType==item_type).all()
        items = Items.query.all()
        return items_schema.dump(items)
    @jwt_required()
    def post(self):
        item = Items(**request.json)
        db.session.merge(item)
        db.session.commit()
        return 'success'


