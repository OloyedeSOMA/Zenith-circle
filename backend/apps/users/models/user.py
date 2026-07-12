from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.common.models.base import BaseModel
from apps.users.manager import UserManager


class UserRole(models.TextChoices):
    """

    """
    STUDENT = 'student', 'Student'
    EDITOR = 'editor', 'Editor'
    ADMIN = 'admin', 'Admin'



class User(AbstractUser, BaseModel):
    """

    """
    username = None
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100, blank=False, null=False)
    last_name = models.CharField(max_length=100, blank=False, null=False)
    role = models.CharField(max_length=20, choices=UserRole.choices, default=UserRole.STUDENT)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []


    objects = UserManager()


    def __str__(self):
        return self.email
