import re
from mongoengine.errors import ValidationError

def validate_name(name):
    if len(name) < 5:
        raise ValidationError('Candidate name must be at least 5 characters long.')

    if len(name) > 30:
        raise ValidationError('Candidate name must be less than 30 characters long.')

    pattern = re.compile(r"^[0-9a-z_-]+\Z", flags=re.IGNORECASE | re.ASCII)
    if not pattern.match(name):
        raise ValidationError('Candidate name must not contain any spaces or special characters.')
