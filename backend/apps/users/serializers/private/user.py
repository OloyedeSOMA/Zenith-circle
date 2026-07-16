from django.contrib.auth import get_user_model
from rest_framework import serializers


User = get_user_model()


class PrivateUserSerializer(serializers.ModelSerializer):
    """

    """
    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'role',
            'is_active',
            'is_verified',
            'last_login',
            'created_at',
        )

        read_only_fields  = ['id', 'last_login', 'is_active', 'is_verified', 'created_at']