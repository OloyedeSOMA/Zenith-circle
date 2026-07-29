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


class CreateRecruiterProfileSerializer(serializers.Serializer):
    """

    """
    organisation = serializers.CharField(max_length=255)
    description = serializers.CharField()
    website = serializers.URLField(required=False, allow_blank=True)
    location = serializers.CharField(max_length=255, required=False, allow_blank=True)
    logo = serializers.ImageField(required=False, allow_null=True)



class UpdateRecruiterProfileSerializer(serializers.Serializer):
    """

    """

    organisation = serializers.CharField(max_length=255, required=False)
    description = serializers.CharField(required=False)
    website = serializers.URLField(required=False, allow_blank=True)
    location = serializers.CharField(max_length=255, required=False, allow_blank=True)
    logo = serializers.ImageField(required=False, allow_null=True)