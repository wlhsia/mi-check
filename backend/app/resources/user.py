from flask import request, jsonify
from flask_restful import Resource

from app import db
from ..models import *
from ..schemas import *

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class User(Resource):
    def get(self, user_id):
        user = Users.query.filter(Users.UserID==user_id).first()
        return user_schema.dump(user)
    def delete(self, user_id):
        user = Users.query.filter(Users.UserID==user_id).first()
        db.session.delete(user)
        db.session.commit()
        return 'success'

class UserList(Resource):
    def get(self):
        users = Users.query.all()
        return users_schema.dump(users)
    def post(self):
        user = Users(**request.json)
        db.session.merge(user)
        db.session.commit()
        return 'success'