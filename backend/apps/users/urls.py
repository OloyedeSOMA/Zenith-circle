from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from apps.users.views.auth.register_view import RegisterAPIView
from apps.users.views.auth.login_view import LoginAPIView
from apps.users.views.auth.logout_view import LogoutAPIView
from apps.users.views.auth.account_activation_view import AccountActivationAPIView
from apps.users.views.auth.resend_account_activation_view import ResendAccountActivationAPIView


urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='user-register'),
    path('login/', LoginAPIView.as_view(), name='user-login'),
    path('logout/', LogoutAPIView.as_view(), name='user-logout'),
    path('activate-account/', AccountActivationAPIView.as_view(), name='user-account-activation'),
    path('resend-activation/', ResendAccountActivationAPIView.as_view(), name='user-resend-account-activation'),



    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
]