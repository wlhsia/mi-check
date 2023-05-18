from app import db

class Users(db.Model):
    __tablename__ = 'Users'
    UserID = db.Column(db.Integer, primary_key=True)
    NotesID = db.Column(db.String)
    Name = db.Column(db.Unicode)
    DivisionNo = db.Column(db.String)
    Division = db.Column(db.Unicode)
    DepartmentNo = db.Column(db.String)
    Department = db.Column(db.Unicode)
    SectionNo = db.Column(db.String)
    Section = db.Column(db.Unicode)

class Projects(db.Model):
    __tablename__ = 'Projects'
    ProjectID = db.Column(db.Integer, primary_key=True)
    ProjectNo = db.Column(db.String)
    InspectorID = db.Column(db.Integer, db.ForeignKey(Users.UserID))
    InspectedDivision = db.Column(db.Unicode)
    InspectedDepartment = db.Column(db.Unicode)
    
    
class Items(db.Model):
    __tablename__ = 'Items'
    ItemID = db.Column(db.Integer, primary_key=True)
    ItemTypeNo = db.Column(db.String)
    ItemType = db.Column(db.Unicode)
    ItemNo = db.Column(db.String)
    Item = db.Column(db.Unicode)
    ItemDetail = db.Column(db.Unicode)
    StandardNo = db.Column(db.String)
    Standard = db.Column(db.Unicode)

class ProjectItem(db.Model):
    __tablename__ = 'ProjectItem'
    ProjectID = db.Column(db.Integer, db.ForeignKey(Projects.ProjectID), primary_key=True)
    ItemID = db.Column(db.Integer, db.ForeignKey(Items.ItemID), primary_key=True)
    CheckDate = db.Column(db.DateTime)
    Score = db.Column(db.Float)
    CheckDescription = db.Column(db.Unicode)
    CheckPhoto = db.Column(db.Unicode)
    MissingAspect = db.Column(db.Unicode)
    MissingType = db.Column(db.String)
    ImproveDate = db.Column(db.DateTime)
    ImproveDescription = db.Column(db.Unicode)
    ImproveTeam = db.Column(db.Unicode)
    PersonInCharge = db.Column(db.Unicode)
    Supervisor = db.Column(db.Unicode)


