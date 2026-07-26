from django.core.mail import send_mail
from django.core.cache import cache
from django.contrib.auth import get_user_model
from django.conf import settings
from apps.users.selectors.user import get_user_by_email
import secrets
import resend
import os



resend.api_key = settings.RESEND_API_KEY
User = get_user_model()

TOKEN_TTL = 60 * 60 * 24 * 3
RESET_TOKEN_TTL = 60 * 60
NUM_OF_DAYS = TOKEN_TTL//(60*60*24)


def send_account_activation_email(user: User):
    """

    """
    user_id = user.id 
    token = secrets.token_urlsafe(32)
    key = f'opphub:registertoken:{user_id}'
    cache.set(key, token, timeout=TOKEN_TTL)
    
    activation_link = f'{settings.FRONTEND_BASE_URL}/activate-account/?id={user_id}&token={token}'

    subject = f'Activate your account - OpportunityHub NG'

    msg = f"""

    Welcome to Opportunity Hub NG!

    Dear {user.first_name}
    
    Thank you for registering with Opportunity Hub. Please activate your account 
    by clicking the link below:
    
    {activation_link}
    
    This link will expire in {NUM_OF_DAYS} days.
    
    If you did not request this registration, please ignore this email
    """


    params: resend.Emails.SendParams = {
        'from': settings.DEFAULT_FROM_EMAIL,
        'to': [user.email],
        'subject': subject,
        'text': msg,
        }

    resend.Emails.send(params)

    # send_mail(
    #     subject=subject,
    #     message=msg,
    #     from_email=settings.DEFAULT_FROM_EMAIL,
    #     recipient_list=[user.email],
    #     fail_silently=False
    # )



def send_reset_password_email(*, email: str):
    """
    send reset password email
    """
    user = get_user_by_email(email=email)
    if not user:
        return

    token = secrets.token_urlsafe(32)
    key = f'opphub:passwordreset:{user.id}'

    cache.set(key, token, timeout=RESET_TOKEN_TTL)
    reset_link = f'{settings.FRONTEND_BASE_URL}/reset-password/?id={user.id}&token={token}'
    subject = f'Password Reset - OpportunityHub NG'
    
    msg = f"""
    Hello {user.first_name}
    
    Please reset your password by clicking the link below:
    
    {reset_link}
    
    This link will expire in 1 hour.
    
    If you did not request this reset link, please ignore this email 
    """

    params: resend.Emails.SendParams = {
        'from': settings.DEFAULT_FROM_EMAIL,
        'to': [user.email],
        'subject': subject,
        'text': msg,
        }

    resend.Emails.send(params)

    # send_mail(
    #     subject=subject,
    #     message=msg,
    #     from_email=settings.DEFAULT_FROM_EMAIL,
    #     recipient_list=[user.email],
    #     fail_silently=False
    # )