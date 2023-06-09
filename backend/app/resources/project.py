from flask import request, jsonify
from flask_restful import Resource

from app import db
from ..models import *
from ..schemas import *

project_schema = ProjectSchema(unknown='exclude')
projects_schema = ProjectSchema(many=True)

class Project(Resource):
    def get(self, project_id):
        project = Projects.query.get(project_id)
        return project_schema.dump(project)
    def put(self, project_id):
        project = Projects.query.get(project_id)
        for key, value in request.get_json().items():
            setattr(project, key, value)
        db.session.commit()
        return project_schema.dump(project)
    def delete(self, project_id):
        project = Projects.query.filter(Projects.ProjectID==project_id).first()
        db.session.delete(project)
        db.session.commit()
        return 'success'

class ProjectList(Resource):
    def get(self):
        project_no = request.args['ProjectNo']
        if project_no is None:
            projects = Projects.query.all()
        else:
            projects = Projects.query.filter(Projects.ProjectNo.ilike(f'{project_no}%')).order_by(Projects.ProjectNo.desc()).all()
        return projects_schema.dump(projects)
    def post(self):
        loaded_project = project_schema.load(request.json)
        project = Projects(**loaded_project)
        db.session.merge(project)
        db.session.commit()
        return 'success'