from rest_framework import serializers
from apps.users.models.profile import StudentProfile


class PrivateStudentProfileSerializer(serializers.ModelSerializer):
    """

    """
    class Meta:
        model = StudentProfile
        fields = (
            'id',
            'institution',
            'course_of_study',
            'skills',
            'interests',
            'profile_photo',
            'created_at',
            'updated_at'
        )

        read_only_fields = ['id', 'created_at', 'updated_at']



class CreateStudentProfileSerializer(serializers.Serializer):
    """

    """
    profile_photo = serializers.ImageField(required=False, allow_null=True)
    institution = serializers.CharField(max_length=255)
    course_of_study = serializers.CharField(max_length=255)
    skills = serializers.JSONField()
    interests = serializers.JSONField()


class UpdateStudentProfileSerializer(serializers.Serializer):
    """

    """
    profile_photo = serializers.ImageField(required=False, allow_null=True)
    institution = serializers.CharField(max_length=255, required=False)
    course_of_study = serializers.CharField(max_length=255, required=False)
    skills = serializers.JSONField(required=False)
    interests = serializers.JSONField(required=False)