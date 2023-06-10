from flask import request, jsonify
from flask_restful import reqparse, Resource
from flask_jwt_extended import jwt_required

from app import db
from ..models import *
from ..schemas import *

# project_item_schema = ProjectItemSchema(unknown='exclude')
project_items_schema = ProjectItemSchema(many=True)

class ProjectItem(Resource):
    def get(self, project_item_id):
        project_item_schema = ProjectItemSchema(unknown='exclude')
        project_item = ProjectItems.query.filter(ProjectItems.ProjectItemID==project_item_id).first()
        return project_item_schema.dump(project_item)
    def put(self, project_item_id):
        project_item_schema = ProjectItemSchema(unknown='exclude', exclude=['ProjectDetail', 'ItemDetail'])
        loaded_project_item = project_item_schema.load(request.json)
        project_item = ProjectItems(**loaded_project_item)
        db.session.merge(project_item)
        db.session.commit()
        return 's'
    def delete(self, project_item_id):
        project_item = ProjectItems.query.filter(ProjectItems.ProjectItemID==project_item_id).first()
        db.session.delete(project_item)
        db.session.commit()
        return 'success'

class ProjectItemList(Resource):
    # @jwt_required()
    def get(self):
        project_id = request.args['projectID']
        if project_id is None:
            project_items = ProjectItems.query.all()
        else:
            project_items = ProjectItems.query.filter(ProjectItems.ProjectID==project_id).all()
        return project_items_schema.dump(project_items)
    # @jwt_required()
    def post(self):
        project_item_schema = ProjectItemSchema(unknown='exclude', exclude=['ProjectDetail', 'ItemDetail'])
        created_project_items = []
        for row in request.json:
            loaded_project_item = project_item_schema.load(row)
            project_item = ProjectItems(**loaded_project_item)
            db.session.merge(project_item)
            created_project_items.append(project_item)
        db.session.commit()
        return project_items_schema.dump(created_project_items)