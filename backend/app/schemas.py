from app import ma
from .models import *

class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Projects

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users
    Projects = ma.Nested(ProjectSchema, many=True)
    InspectedProjects = ma.Nested(ProjectSchema, many=True)


class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Items

# class ProjectItemSchema(ma.SQLAlchemyAutoSchema):
#     class Meta:
#         model = ProjectItem

