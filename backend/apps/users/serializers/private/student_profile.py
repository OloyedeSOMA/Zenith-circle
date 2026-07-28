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



class CreateStudentProfileSerializer(serializers.ModelSerializer):
    """

    """
    class Meta:
        model = StudentProfile
        fields = (
            'institution',
            'course_of_study',
            'skills',
            'interests',
            'profile_photo',
        )


class UpdateStudentProfileSerializer(serializers.ModelSerializer):
    """

    """
    class Meta:
        model = StudentProfile
        fields = (
            'institution',
            'course_of_study',
            'skills',
            'interests',
            'profile_photo',
        )