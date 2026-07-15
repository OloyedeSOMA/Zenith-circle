from django.core.mail import send_mail
from django.core.cache import cache
from django.contrib.auth import get_user_model
from django.conf import settings
import secrets


User = get_user_model()

TOKEN_TTL = 60 * 60 * 24 * 3
NUM_OF_DAYS = TOKEN_TTL//(60*60*24)


def send_account_activation_email(user: User):
    """

    """
    user_id = user.id 
    token = secrets.token_urlsafe(32)
    key = f'opphub:registertoken:{user_id}'
    cache.set(key, token, timeout=TOKEN_TTL)
    
    activation_link = f'{settings.BACKEND_BASE_URL}/api/v1/auth/activate-account/?id={user_id}&token={token}'

    subject = f'Verify your email address - Storefront'

    msg = f"""

    Welcome to Opportunity Hub NG!

    Dear {user.first_name}
    
    Thank you for registering with Opportunity Hub. Please activate your account 
    by clicking the link below:
    
    {activation_link}
    
    This link will expire in {NUM_OF_DAYS} days.
    
    If you did not request this registration, please ignore this email
    """

    send_mail(
        subject=subject,
        message=msg,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=False
    )


