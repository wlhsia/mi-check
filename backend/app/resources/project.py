from flask import request, jsonify
from flask_restful import Resource

from app import db
from ..models import *
from ..schemas import *

project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)

class Project(Resource):
    def get(self, project_id):
        project = Projects.query.filter(Projects.ProjectID==project_id).first()
        return project_schema.dump(project)
    def delete(self, project_id):
        project = Projects.query.filter(Projects.ProjectID==project_id).first()
        db.session.delete(project)
        db.session.commit()
        return 'success'

class ProjectList(Resource):
    def get(self):
        projects = Projects.query.all()
        return projects_schema.dump(projects)
    def post(self):
        project = Projects(**request.json)
        db.session.merge(project)
        db.session.commit()
        return 'success'