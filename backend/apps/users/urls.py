from django.urls import path
from apps.users.views.auth.register_view import RegisterAPIView


urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='user-register'),
]