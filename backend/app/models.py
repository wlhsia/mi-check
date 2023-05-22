from app import db

class Users(db.Model):
    __tablename__ = 'Users'
    UserID = db.Column(db.Integer, primary_key=True)
    NotesID = db.Column(db.String)
    Name = db.Column(db.Unicode)
    DepartmentNo = db.Column(db.String)
    Division = db.Column(db.Unicode)
    Department = db.Column(db.Unicode)
    Section = db.Column(db.Unicode)
    IsAdmin = db.Column(db.Boolean)

class Projects(db.Model):
    __tablename__ = 'Projects'
    ProjectID = db.Column(db.Integer, primary_key=True)
    ProjectNo = db.Column(db.String)
    ProjectType = db.Column(db.String)
    InspectorID = db.Column(db.Integer, db.ForeignKey(Users.UserID))
    InspectedPersonID = db.Column(db.Integer, db.ForeignKey(Users.UserID))
    InspectedDate = db.Column(db.DateTime)
    
class Items(db.Model):
    __tablename__ = 'Items'
    ItemID = db.Column(db.Integer, primary_key=True)
    ItemTypeNo = db.Column(db.String)
    ItemType = db.Column(db.Unicode)
    ItemNo = db.Column(db.String)
    Item = db.Column(db.Unicode)
    StandardNo = db.Column(db.String)
    Standard = db.Column(db.Unicode)

class ProjectItem(db.Model):
    __tablename__ = 'ProjectItem'
    ProjectID = db.Column(db.Integer, db.ForeignKey(Projects.ProjectID), primary_key=True)
    ItemID = db.Column(db.Integer, db.ForeignKey(Items.ItemID), primary_key=True)
    ID = db.Column(db.Integer, primary_key=True)
    ReferenceScore = db.Column(db.Float)
    CheckDescription = db.Column(db.Unicode)
    CheckClass = db.Column(db.Unicode)
    DangerClass = db.Column(db.String)
    CheckPhoto = db.Column(db.String)
    Score = db.Column(db.Float)