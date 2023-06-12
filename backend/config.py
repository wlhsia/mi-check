import urllib
# import pyodbc
from datetime import timedelta

# MSSQL
driver = 'ODBC Driver 17 for SQL Server'
server = '10.90.53.67'
database = 'MICheck'
uid = 'sa'
pwd = 'Could721'
params = urllib.parse.quote_plus(f"DRIVER={driver};SERVER={server};DATABASE={database};UID={uid};PWD={pwd}")
mssql = "mssql+pyodbc:///?odbc_connect=" + params

# Oracle
user = 'U40IT11'
pwd = 'ENJ63641'
host1 = '10.1.3.15'
port1 = '1521'
host2 = '10.1.4.15'
port2 = '1521'
sid = 'tprs05u'
oracle_tw = f"oracle://{user}:{pwd}@(DESCRIPTION =\
            (ADDRESS = (PROTOCOL = tcp)(HOST = {host1})(PORT = {port1}))\
            (ADDRESS = (PROTOCOL = tcp)(HOST = {host2})(PORT = {port2}))\
            (CONNECT_DATA = (SID = {sid})))"

class Config:
    JWT_COOKIE_SECURE = False
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    SQLALCHEMY_DATABASE_URI = mssql
    SQLALCHEMY_BINDS = {
        "mssql": mssql,
        "oracle_tw": oracle_tw
    }
    UPLOAD_FOLDER = r"D:\project\mi-check\backend\images"
    
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///mi.db' 