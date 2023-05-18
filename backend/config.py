import urllib
import pyodbc
from datetime import timedelta

driver = 'ODBC Driver 17 for SQL Server'
server = '10.90.53.67'
database = 'MICheck'
uid = 'sa'
pwd = 'Could721'
params = urllib.parse.quote_plus(f"DRIVER={driver};SERVER={server};DATABASE={database};UID={uid};PWD={pwd}")

class Config:
    SQLALCHEMY_DATABASE_URI = "mssql+pyodbc:///?odbc_connect=" + params