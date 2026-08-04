from django.contrib.auth import get_user_model


User = get_user_model()


def user_email_exists(*, email: str):
    """
    checks if the user email already exists
    """
    return User.objects.filter(email=email).exists()


def get_user_by_email(*, email: str):
    """
    returns a user object by email
    """
    return User.objects.filter(email=email).first()
        


def get_user_by_id(*, user_id: str):
    """
    returns a user object by the user id
    """
    return User.objects.filter(id=user_id).first()