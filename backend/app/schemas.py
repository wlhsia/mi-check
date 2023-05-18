from app import ma
from .models import *

class ItemSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = MICheckItem



