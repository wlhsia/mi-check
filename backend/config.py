import urllib
# import pyodbc
from datetime import timedelta

driver = 'ODBC Driver 17 for SQL Server'
server = '10.90.53.67'
database = 'MICheck'
uid = 'sa'
pwd = 'Could721'
params = urllib.parse.quote_plus(f"DRIVER={driver};SERVER={server};DATABASE={database};UID={uid};PWD={pwd}")

class Config:
    JWT_COOKIE_SECURE = False
    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

    SQLALCHEMY_DATABASE_URI = "mssql+pyodbc:///?odbc_connect=" + params
    # SQLALCHEMY_DATABASE_URI = "sqlite:///mi.db"

    UPLOAD_FOLDER = r"D:\project\mi-check\backend\images"