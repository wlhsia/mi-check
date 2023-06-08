from app import db

class Users(db.Model):
    __bind_key__ = 'mssql'
    __tablename__ = 'Users'
    UserID = db.Column(db.Integer, primary_key=True)
    NotesID = db.Column(db.String)
    Name = db.Column(db.Unicode)
    Company = db.Column(db.String)
    Department = db.Column(db.String)
    Section = db.Column(db.String)
    IsAdmin = db.Column(db.Boolean)

class Projects(db.Model):
    __bind_key__ = 'mssql'
    __tablename__ = 'Projects'
    ProjectID = db.Column(db.Integer, primary_key=True)
    ProjectNo = db.Column(db.String)
    ProjectType = db.Column(db.String)
    InspectedDepartment = db.Column(db.String)
    InspectedDate = db.Column(db.DateTime)
    InspectorID = db.Column(db.Integer, db.ForeignKey(Users.UserID))
    InspectedUserID = db.Column(db.Integer, db.ForeignKey(Users.UserID))
    SupervisorID = db.Column(db.Integer, db.ForeignKey(Users.UserID))
    ManagerID = db.Column(db.Integer, db.ForeignKey(Users.UserID))
    IsScheduled = db.Column(db.Boolean)

    Inspector = db.relationship("Users", foreign_keys=[InspectorID],  backref="InspectorProjects")
    InspectedUser = db.relationship("Users", foreign_keys=[InspectedUserID], backref="InspectedUserProjects")
    Supervisor = db.relationship("Users", foreign_keys=[SupervisorID], backref="SupervisorProjects")
    Manager = db.relationship("Users", foreign_keys=[ManagerID], backref="ManagerProjects")
    
class Items(db.Model):
    __bind_key__ = 'mssql'
    __tablename__ = 'Items'
    ItemID = db.Column(db.Integer, primary_key=True)
    ItemType = db.Column(db.Unicode)
    ItemNo = db.Column(db.String)
    Item = db.Column(db.Unicode)
    StandardNo = db.Column(db.String)
    Standard = db.Column(db.Unicode)

class ProjectItems(db.Model):
    __bind_key__ = 'mssql'
    __tablename__ = 'ProjectItems'
    ProjectItemID = db.Column(db.Integer, primary_key=True)
    ProjectID = db.Column(db.Integer, db.ForeignKey(Projects.ProjectID))
    ItemID = db.Column(db.Integer, db.ForeignKey(Items.ItemID))
    ReferenceScore = db.Column(db.Float)
    Order = db.Column(db.Integer)
    CheckDescription = db.Column(db.Unicode)
    CheckClass = db.Column(db.Unicode)
    DangerLevel = db.Column(db.String)
    CheckPhoto = db.Column(db.Unicode)
    Score = db.Column(db.Float)

    ProjectDetail = db.relationship("Projects", foreign_keys=[ProjectID],  backref="ProjectItems")
    ItemDetail = db.relationship("Items", foreign_keys=[ItemID],  backref="Projects")

class ERPUsers(db.Model):
    __bind_key__ = 'oracle_tw'
    __tablename__ = 'V0NBFC00'
    EMPID = db.Column(db.String, primary_key=True)
    NM = db.Column(db.Unicode)
    CO = db.Column(db.String)
    DP = db.Column(db.String)
