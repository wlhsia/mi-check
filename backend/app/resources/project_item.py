from flask import request, jsonify
from flask_restful import reqparse, Resource
from flask_jwt_extended import jwt_required

from app import db
from ..models import *
from ..schemas import *


project_item_schema = ProjectItemSchema(unknown='exclude')
project_items_schema = ProjectItemSchema(many=True)


class ProjectItemList(Resource):
    # @jwt_required()
    def get(self):
        prject_id = request.args['prjectID']
        if prject_id is None:
            project_items = ProjectItems.query.all()
        else:
            project_items = ProjectItems.query.filter(ProjectItems.ProjectID==prject_id).all()
        return project_items_schema.dump(project_items)
    # @jwt_required()
    def post(self):
        for row in request.json:
            loaded_project_item = project_item_schema.load(row)
            project_item = ProjectItems(**loaded_project_item)
            db.session.merge(project_item)
        db.session.commit()
        return 'success'