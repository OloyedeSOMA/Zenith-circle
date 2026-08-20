from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from apps.users.selectors.user import user_email_exists
from apps.users.models import UserRole


class RegisterSerializer(serializers.Serializer):
    """

    """
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    password = serializers.CharField(write_only=True, min_length=8)
    role = serializers.ChoiceField(choices=UserRole.choices, default=UserRole.STUDENT)
    
    def validate_email(self, value):
        return value.lower()