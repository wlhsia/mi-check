from app import ma
from .models import *

class ProjectItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ProjectItems
        include_fk = True
    ProjectDetail = ma.Nested(lambda: ProjectSchema(exclude=('ProjectItems',)))
    ItemDetail = ma.Nested(lambda: ItemSchema(exclude=('Projects',)))

class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Projects
        include_fk = True
    Inspector = ma.Nested(lambda: UserSchema(exclude=('Projects',)))
    InspectedUser = ma.Nested(lambda: UserSchema(exclude=('InspectedProjects',)))
    ProjectItems = ma.Nested(ProjectItemSchema, many=True)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users
    Projects = ma.Nested(ProjectSchema, many=True)
    InspectedProjects = ma.Nested(ProjectSchema, many=True)

class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Items
    Projects = ma.Nested(ProjectSchema, many=True)