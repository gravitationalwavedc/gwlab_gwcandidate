import mongoengine
from .base import *

INSTALLED_APPS += ('corsheaders', )
CORS_ORIGIN_ALLOW_ALL = True

MIDDLEWARE.append('corsheaders.middleware.CorsMiddleware')

SITE_URL = "http://localhost:3000"

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

mongoengine.connect(
    db=MONGODB_NAME,
    username=MONGODB_USER,
    password=MONGODB_PASSWD,
    host=MONGODB_HOST,
    port=MONGODB_PORT
)

try:
    from .local import *
except:
    pass
