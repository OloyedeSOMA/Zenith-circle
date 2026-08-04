from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from apps.users.views.auth.register_view import RegisterAPIView
from apps.users.views.auth.login_view import LoginAPIView
from apps.users.views.auth.logout_view import LogoutAPIView
from apps.users.views.auth.account_activation_view import AccountActivationAPIView
from apps.users.views.auth.resend_account_activation_view import ResendAccountActivationAPIView
from apps.users.views.auth.forgot_password_view import ForgotPasswordAPIView
from apps.users.views.auth.reset_password_view import ResetPasswordAPIView
from apps.users.views.auth.token_refresh_view import AuthTokenRefreshAPIView
from apps.users.views.private.profile.student import PrivateStudentProfileAPIView
from apps.users.views.private.profile.recruiter import PrivateRecruiterProfileAPIView


urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='user-register'),
    path('login/', LoginAPIView.as_view(), name='user-login'),
    path('logout/', LogoutAPIView.as_view(), name='user-logout'),
    path('activate-account/', AccountActivationAPIView.as_view(), name='user-account-activation'),
    path('resend-activation/', ResendAccountActivationAPIView.as_view(), name='user-resend-account-activation'),
    path('forgot-password/', ForgotPasswordAPIView.as_view(), name='user-forgot-password'),
    path('reset-password/', ResetPasswordAPIView.as_view(), name='user-reset-password'),


    path('token/refresh/', AuthTokenRefreshAPIView.as_view(), name='token-refresh'),
]