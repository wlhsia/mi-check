from flask import request, jsonify
from flask_restful import reqparse, Resource
from flask_jwt_extended import jwt_required

from app import db
from ..models import *
from ..schemas import *


item_schema = ItemSchema(unknown='exclude')
items_schema = ItemSchema(many=True)

class Item(Resource):
    # @jwt_required()
    def get(self, item_id):
        item = Items.query.filter(Items.ItemID==item_id).first()
        return item_schema.dump(item)
    # @jwt_required()
    def delete(self, item_id):
        item = Items.query.filter(Items.ItemID==item_id).first()
        db.session.delete(item)
        db.session.commit()
        return 'success'

class ItemList(Resource):
    # @jwt_required()
    def get(self):
        item_type_no = request.args['itemTypeNo']
        if item_type_no is None:
            items = Items.query.all()
        else:
            items = Items.query.filter(Items.ItemTypeNo==item_type_no).all()
        return items_schema.dump(items)
    # @jwt_required()
    def post(self):
        print(request.json)
        loaded_item = item_schema.load(request.json)
        item = Items(**loaded_item)
        db.session.merge(item)
        db.session.commit()
        return 'success'


