from django.core.cache import cache
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError, NotFound
from apps.users.selectors.user import get_user_by_id


User = get_user_model()


def activate_account(*, user_id: str, token: str) -> User:
    """

    """
    if not user_id or not token:
        raise ValidationError('Invalid activation request')

    token = token.rstrip('/')

    user = get_user_by_id(user_id=user_id)
    if not user:
        raise NotFound('User not found')

    if user.is_verified:
        raise ValidationError({
            'detail': 'User already verified'
        })

    key = f'opphub:registertoken:{user_id}'
    cached_token = cache.get(key)
    if not cached_token or cached_token != token:
        raise ValidationError({
            'detail': 'Invalid or expired activation token'
        })

    user.is_verified = True
    user.save(update_fields=['is_verified'])
    cache.delete(key)


    return user
