from rest_framework import serializers
from apps.users.models.profile import RecruiterProfile


class PrivateRecruiterProfileSerializer(serializers.ModelSerializer):
    """

    """
    class Meta:
        model = RecruiterProfile
        fields = (
            'id',
            'organisation',
            'description',
            'website',
            'location',
            'logo',
            'created_at',
            'updated_at'
        )

        read_only_fields = ['id', 'created_at', 'updated_at']


class CreateRecruiterProfileSerializer(serializers.ModelSerializer):
    """

    """
    class Meta:
        model = RecruiterProfile
        fields = (
            'organisation',
            'description',
            'website',
            'location',
            'logo',
        )


class UpdateRecruiterProfileSerializer(serializers.ModelSerializer):
    """

    """

    class Meta:
        model = RecruiterProfile
        fields = (
            'organisation',
            'description',
            'website',
            'location',
            'logo',
        )