from flask import request, jsonify
from flask_restful import Resource
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

from app import db
from ..models import *
from ..schemas import *

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class CurrentUser(Resource):
    @jwt_required()
    def get(self):
        try:
            notes_id = get_jwt_identity()
            user = Users.query.filter(Users.NotesID==notes_id).first()
            user = user_schema.dump(user)
        except Exception as e:
            print(e)
        return user

class User(Resource):
    @jwt_required()
    def get(self, user_id):
        user = Users.query.filter(Users.UserID==user_id).first()
        return user_schema.dump(user)

    @jwt_required()
    def delete(self, user_id):
        user = Users.query.filter(Users.UserID==user_id).first()
        db.session.delete(user)
        db.session.commit()
        return 'success'

class UserList(Resource):
    @jwt_required()
    def get(self):
        users = Users.query.all()
        return users_schema.dump(users)
    @jwt_required() 
    def post(self):
        user = Users(**request.json)
        db.session.merge(user)
        db.session.commit()
        return 'success'