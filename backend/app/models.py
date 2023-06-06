from app import db

class Users(db.Model):
    __tablename__ = 'Users'
    UserID = db.Column(db.Integer, primary_key=True)
    NotesID = db.Column(db.String)
    UserName = db.Column(db.Unicode)
    DepartmentNo = db.Column(db.String)
    Department = db.Column(db.String)
    SupervisorID = db.Column(db.Integer, db.ForeignKey(UserID))
    IsAdmin = db.Column(db.Boolean)

    Supervisor = db.relationship('Users', remote_side=[UserID])

class Projects(db.Model):
    __tablename__ = 'Projects'
    ProjectID = db.Column(db.Integer, primary_key=True)
    ProjectNo = db.Column(db.String)
    ProjectTypeNo = db.Column(db.String)
    ProjectType = db.Column(db.Unicode)
    InspectorID = db.Column(db.Integer, db.ForeignKey(Users.UserID))
    InspectedUserID = db.Column(db.Integer, db.ForeignKey(Users.UserID))
    InspectedDate = db.Column(db.DateTime)
    IsScheduled = db.Column(db.Boolean)

    Inspector = db.relationship("Users", foreign_keys=[InspectorID],  backref="Projects")
    InspectedUser = db.relationship("Users", foreign_keys=[InspectedUserID], backref="InspectedProjects")
    
class Items(db.Model):
    __tablename__ = 'Items'
    ItemID = db.Column(db.Integer, primary_key=True)
    ItemTypeNo = db.Column(db.String)
    ItemType = db.Column(db.Unicode)
    ItemNo = db.Column(db.String)
    Item = db.Column(db.Unicode)
    StandardNo = db.Column(db.String)
    Standard = db.Column(db.Unicode)

class ProjectItems(db.Model):
    __tablename__ = 'ProjectItems'
    ProjectItemID = db.Column(db.Integer, primary_key=True)
    ProjectID = db.Column(db.Integer, db.ForeignKey(Projects.ProjectID))
    ItemID = db.Column(db.Integer, db.ForeignKey(Items.ItemID))
    ReferenceScore = db.Column(db.Float)
    Order = db.Column(db.Integer)
    CheckDescription = db.Column(db.Unicode)
    CheckClass = db.Column(db.Unicode)
    DangerLevel = db.Column(db.String)
    CheckPhotoName = db.Column(db.Unicode)
    # CheckPhoto = db.Column(db.LargeBinary)
    Score = db.Column(db.Float)

    ProjectDetail = db.relationship("Projects", foreign_keys=[ProjectID],  backref="ProjectItems")
    ItemDetail = db.relationship("Items", foreign_keys=[ItemID],  backref="Projects")