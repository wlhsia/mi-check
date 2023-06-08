from flask import request, jsonify
from flask_restful import Resource,reqparse
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

from app import db
from ..models import *
from ..schemas import *

user_schema = UserSchema(unknown='exclude')
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
    # @jwt_required()
    def get(self, user_id):
        user = Users.query.filter(Users.UserID==user_id).first()
        return user_schema.dump(user)
    # @jwt_required()
    def delete(self, user_id):
        user = Users.query.filter(Users.UserID==user_id).first()
        db.session.delete(user)
        db.session.commit()
        return 'success'

class UserList(Resource):
    # @jwt_required()
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('NoteID', type=str, default=None, location='args')
        parser.add_argument('Department', type=str, default=None, location='args')
        args = parser.parse_args()
        if args['NoteID']:
            users = Users.query.filter(Users.NoteID==args['NoteID']).all()
        elif args['Department']:
            users = Users.query.filter(Users.Department.ilike(f"%{args['Department']}%")).all()
        else:
            users = Users.query.all()
        return users_schema.dump(users)
        
    # @jwt_required()
    def post(self):
        notes_id = request.json['NotesID']
        is_admin = request.json['IsAdmin']
        user = Users.query.filter(Users.NotesID==notes_id).first()
        if user is not None:
            user_id = user.UserID
        else:
            erp_user = ERPUsers.query.filter(ERPUsers.EMPID==notes_id).first()
            if erp_user is not None:
                name = erp_user.NM
                company = erp_user.CO
                department = erp_user.DP[:2]
                section = erp_user.DP[2:]
                user = Users(NotesID=notes_id, Name=name, Company=company, Department=department, Section=section, IsAdmin=is_admin)
                db.session.add(user)
                db.session.commit()
                user_id = user.UserID
            else:
                return {
                    'success': False,
                    'message': "ERP使用者不存在"
                }
        return {
            'success': True,
            'UserID': user_id
        }