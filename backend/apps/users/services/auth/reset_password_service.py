from django.core.cache import cache
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError
from apps.users.selectors.user import get_user_by_id



User = get_user_model()


def reset_password(*, user_id: str, token: str, password: str) -> User:
    """
    resets password
    """
    user = get_user_by_id(user_id=user_id)
    if not user:
        raise ValidationError('Invalid reset password request')

    key = f'opphub:passwordreset:{user.id}'
    cached_token = cache.get(key)

    if not cached_token or cached_token != token:
        raise ValidationError('Invalid or expired token')

    user.set_password(password)
    user.save(update_fields=['password'])

    cache.delete(key)

    return user


