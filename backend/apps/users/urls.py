from django.urls import path
from apps.users.views.auth.register_view import RegisterAPIView
from apps.users.views.auth.login_view import LoginAPIView
from apps.users.views.auth.logout_view import LogoutAPIView



urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='user-register'),
    path('login/', LoginAPIView.as_view(), name='user-login'),
    path('logout/', LogoutAPIView.as_view(), name='user-logout'),
]