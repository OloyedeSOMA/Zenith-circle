from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from apps.users.selectors.user import user_email_exists



class RegisterSerializer(serializers.Serializer):
    """

    """
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    password = serializers.CharField(write_only=True, min_length=8)

    
    def validate_email(self, value):
        if user_email_exists(email=value):
            raise ValidationError({
                'detail': 'Email already exists'
            })
        return value.lower()