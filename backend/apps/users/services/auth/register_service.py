from django.db import transaction
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from apps.users.selectors.user import user_email_exists
from apps.common.email.email_service import send_account_activation_email

User = get_user_model()


@transaction.atomic
def register_user(*, first_name: str, last_name: str, email: str, password: str, role: str) -> User:
    """
    creates a user
    """
    if user_email_exists(email=email):
        raise ValidationError('Email already exists')

    user = User.objects.create_user(
        first_name=first_name,
        last_name=last_name,
        email=email,
        password=password,
        role=role,
    )

    send_account_activation_email(user)

    return user