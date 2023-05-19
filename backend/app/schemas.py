from app import ma
from .models import *

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Users

class ProjectSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Projects
        include_fk = True

class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Items

class ProjectItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = ProjectItem
        include_fk = True



