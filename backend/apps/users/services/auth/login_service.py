from django.db import transaction
from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken


@transaction.atomic
def login_user(*, email:str, password: str) -> dict:
    """
    logins and authenticate a user
    """
    user = authenticate(
        email=email,
        password=password
    )

    if not user:
        raise AuthenticationFailed('Invalid email or password')

    refresh = RefreshToken.for_user(user)
    update_last_login(None, user)

    return {
        'user': user,
        'access_token': str(refresh.access_token),
        'refresh_token': str(refresh)
    }