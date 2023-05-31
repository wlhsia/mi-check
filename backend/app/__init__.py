from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import  Api
from flask_jwt_extended import JWTManager
from flask_jwt_extended import get_jwt
from flask_jwt_extended import get_jwt_identity
from datetime import datetime, timedelta, timezone
 
from config import Config

db = SQLAlchemy()
ma = Marshmallow()
api = Api()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    ma.init_app(app)
    jwt.init_app(app)

    @app.after_request
    def refresh_expiring_jwts(response):
        try:
            exp_timestamp = get_jwt()["exp"]
            now = datetime.now(timezone.utc)
            target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
            if target_timestamp > exp_timestamp:
                access_token = create_access_token(identity=get_jwt_identity())
                set_access_cookies(response, access_token)
            return response
        except (RuntimeError, KeyError):
            return response

    from .resources.auth import Login, Logout
    from .resources.user import CurrentUser, User, UserList
    from .resources.project import Project, ProjectList
    from .resources.item import Item, ItemList
    from .resources.project_item import ProjectItemList
    api.add_resource(Login, '/api/login')
    api.add_resource(Logout, '/api/logout')
    api.add_resource(CurrentUser, '/api/user')
    api.add_resource(User, '/api/users/<user_id>')
    api.add_resource(UserList, '/api/users')
    api.add_resource(Project, '/api/projects/<project_id>')
    api.add_resource(ProjectList, '/api/projects')
    api.add_resource(Item, '/api/items/<item_id>')
    api.add_resource(ItemList, '/api/items')
    api.add_resource(ProjectItemList, '/api/project_items')
    api.init_app(app)
    
    # with app.app_context():
    #     from . import models
    #     db.create_all()

    return app