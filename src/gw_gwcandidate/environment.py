import os
import mongoengine

MONGODB_USER = os.getenv('MONGODB_USER')
MONGODB_PASSWD = os.getenv('MONGODB_PASSWD')
MONGODB_NAME = os.getenv('MONGODB_NAME')
MONGODB_HOST = os.getenv('MONGODB_HOST')
MONGODB_PORT = os.getenv('MONGODB_PORT')

SECRET_KEY = os.getenv('SECRET_KEY')
AUTH_SERVICE_JWT_SECRET = os.getenv('AUTH_SERVICE_JWT_SECRET')

mongoengine.connect(
    db=MONGODB_NAME,
    username=MONGODB_USER,
    password=MONGODB_PASSWD,
    host=MONGODB_HOST,
    port=MONGODB_PORT
)
