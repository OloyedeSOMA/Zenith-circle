from django.db import transaction
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken


@transaction.atomic
def logout_user(*, refresh_token: str):
    """
    logouts a user
    blacklists refresh token
    """
    try:
        token = RefreshToken(refresh_token)
        token.blacklist()
    except:
        raise ValidationError('Invalid refresh token')
