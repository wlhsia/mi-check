from flask import request, jsonify
from flask_restful import Resource, abort 
from flask_jwt_extended import create_access_token
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies
# import win32security

from ..models import *

class Login(Resource):
    def post(self):
    
        notes_id = request.json.get("NotesID", None)
        password = request.json.get("Password", None)
        user = Users.query.filter(Users.NotesID==notes_id).first()
        # if user is None:
        #     abort(401, msg="使用者不存在")
        # try:
        #     win32security.LogonUser(notes_id, 'TWFPG', password, win32security.LOGON32_LOGON_NETWORK, win32security.LOGON32_PROVIDER_DEFAULT)
        #     response = jsonify({"msg": "登入成功"})
        #     access_token = create_access_token(identity=notes_id)
        #     set_access_cookies(response, access_token)
        #     return response
        # except Exception as e:
        #     print(e)
        #     abort(401, msg="密碼錯誤")
        response = jsonify({"msg": "登入成功"})
        access_token = create_access_token(identity=notes_id)
        set_access_cookies(response, access_token)
        return response

class Logout(Resource):
    def get(self):
        response = jsonify({"msg": "登出成功"})
        unset_jwt_cookies(response)
        return response
