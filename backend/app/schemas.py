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
    Inspector = ma.Nested(lambda: UserSchema(exclude=('InspectorProjects', 'InspectedUserProjects', 'SupervisorProjects', 'ManagerProjects')))
    InspectedUser = ma.Nested(lambda: UserSchema(exclude=('InspectorProjects', 'InspectedUserProjects', 'SupervisorProjects', 'ManagerProjects')))
    Supervisor = ma.Nested(lambda: UserSchema(exclude=('InspectorProjects', 'InspectedUserProjects', 'SupervisorProjects', 'ManagerProjects')))
    Manager = ma.Nested(lambda: UserSchema(exclude=('InspectorProjects', 'InspectedUserProjects', 'SupervisorProjects', 'ManagerProjects')))
    ProjectItems = ma.Nested(ProjectItemSchema(exclude=('ProjectDetail',)), many=True)

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users
    InspectorProjects = ma.Nested(ProjectSchema(exclude=('Inspector', 'InspectedUser', 'Supervisor', 'Manager')), many=True)
    InspectedUserProjects = ma.Nested(ProjectSchema(exclude=('Inspector', 'InspectedUser', 'Supervisor', 'Manager')), many=True)
    SupervisorProjects = ma.Nested(ProjectSchema(exclude=('Inspector', 'InspectedUser', 'Supervisor', 'Manager')), many=True)
    ManagerProjects = ma.Nested(ProjectSchema(exclude=('Inspector', 'InspectedUser', 'Supervisor', 'Manager')), many=True)

class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Items
    Projects = ma.Nested(ProjectSchema, many=True)