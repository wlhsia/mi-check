from flask import request, jsonify, send_file
from flask_restful import reqparse, Resource
from flask_jwt_extended import jwt_required
import os

from app import db
import app
from ..models import *
from ..schemas import *

class Photo(Resource):
    def get(self, project_item_id):
        project_item = ProjectItems.query.get(project_item_id)
        image = Image.open('path/to/photo.jpg')
        photo = project_item.CheckPhoto
        photo = BytesIO(photo)
        return send_file(photo, mimetype='image/jpeg')

    def put(self, project_item_id):
        photo = request.files['photo']
        with app.app_context():
            photo.save(os.path.join(app.config['UPLOAD_FOLDER'], photo.filename))

        # name = photo.filename
        # image_data = photo.read()
        # project_item = ProjectItems.query.filter(ProjectItems.ProjectItemID==project_item_id).first()
        # project_item.CheckPhotoName = name
        # project_item.CheckPhoto = image_data
        # db.session.commit()
        return 'success'