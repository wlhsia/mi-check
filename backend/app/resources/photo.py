from flask import request, jsonify, send_file
from flask_restful import reqparse, Resource
from flask_jwt_extended import jwt_required
import os

from app import db
from ..models import *
from ..schemas import *

path = r"D:\project\mi-check\backend\images"
# path = r"/Users/wlhsia/project/mi-check/backend/images"

class Photo(Resource):
    def get(self, project_item_id):
        photo_type = request.args['photoType']
        project_item = ProjectItems.query.filter(ProjectItems.ProjectItemID==project_item_id).first()
        if photo_type == 'improve':
            image_path = (os.path.join(path, str(project_item.ProjectID), project_item.ImprovePhoto))
        else:
            image_path = (os.path.join(path, str(project_item.ProjectID), project_item.CheckPhoto))
        return send_file(image_path, mimetype='image/jpeg')

    def put(self, project_item_id):
        photo_type = request.args['photoType']
        photo = request.files['photo']
        project_item = ProjectItems.query.filter(ProjectItems.ProjectItemID==project_item_id).first()
        if photo_type == 'improve':
            project_item.ImprovePhoto = photo.filename
        else:
            project_item.CheckPhoto = photo.filename
        db.session.commit()
        # app.config['UPLOAD_FOLDER']
        project_path = os.path.join(path, str(project_item.ProjectID))
        if not os.path.exists(project_path):
            os.makedirs(project_path)
            photo.save((os.path.join(project_path, photo.filename)))
        else:
            photo.save((os.path.join(project_path, photo.filename)))
        return 'success'