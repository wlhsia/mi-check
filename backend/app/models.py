from app import db

class Users(db.Model):
    __tablename__ = 'Users'
    UserID = db.Column(db.Integer, primary_key=True)
    NotesID = db.Column(db.String)
    UserName = db.Column(db.Unicode)
    DepartmentNo = db.Column(db.String)
    IsAdmin = db.Column(db.Boolean)
    CreatedAt = db.Column(db.DateTime, server_default=db.func.now())

class Projects(db.Model):
    __tablename__ = 'Projects'
    ProjectID = db.Column(db.Integer, primary_key=True)
    ProjectNo = db.Column(db.String)
    ProjectType = db.Column(db.String)
    InspectorID = db.Column(db.Integer, db.ForeignKey(Users.UserID))
    InspectedUserID = db.Column(db.Integer, db.ForeignKey(Users.UserID))
    InspectedDate = db.Column(db.DateTime)
    CreatedAt = db.Column(db.DateTime, server_default=db.func.now())
    Inspector = db.relationship("Users", foreign_keys=[InspectorID],  backref="Projects")
    InspectedUser = db.relationship("Users", foreign_keys=[InspectedUserID], backref="InspectedProjects")
    
class Items(db.Model):
    __tablename__ = 'Items'
    ItemID = db.Column(db.Integer, primary_key=True)
    ItemType = db.Column(db.Unicode)
    ItemNo = db.Column(db.String)
    Item = db.Column(db.Unicode)
    StandardNo = db.Column(db.String)
    Standard = db.Column(db.Unicode)
    CreatedAt = db.Column(db.DateTime, server_default=db.func.now())

# class ProjectItem(db.Model):
#     __tablename__ = 'ProjectItem'
#     ProjectID = db.Column(db.Integer, db.ForeignKey(Projects.ProjectID), primary_key=True)
#     ItemID = db.Column(db.Integer, db.ForeignKey(Items.ItemID), primary_key=True)
#     ID = db.Column(db.Integer, primary_key=True)
#     ReferenceScore = db.Column(db.Float)
#     CheckDescription = db.Column(db.Unicode)
#     CheckClass = db.Column(db.Unicode)
#     DangerClass = db.Column(db.String)
#     CheckPhoto = db.Column(db.String)
#     Score = db.Column(db.Float)
#     CreatedAt = db.Column(db.DateTime, server_default=db.func.now())