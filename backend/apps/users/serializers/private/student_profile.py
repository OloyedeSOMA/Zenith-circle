from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field
from drf_spectacular.types import OpenApiTypes
from apps.users.models.profile import StudentProfile


class PrivateStudentProfileSerializer(serializers.ModelSerializer):
    """

    """
    display_name = serializers.SerializerMethodField()
    email = serializers.EmailField(source="user.email", read_only=True,)

    class Meta:
        model = StudentProfile
        fields = (
            'id',
            'display_name',
            'email',
            'institution',
            'course_of_study',
            'current_level',
            'expected_graduation',
            'skills',
            'interests',
            'profile_photo',
            'created_at',
            'updated_at'
        )

        read_only_fields = ['id', 'display_name', 'email', 'created_at', 'updated_at']

    @extend_schema_field(OpenApiTypes.URI)
    def get_display_name(self,obj):
        return f'{obj.user.first_name} {obj.user.last_name}'.strip()



class CreateStudentProfileSerializer(serializers.Serializer):
    """

    """
    profile_photo = serializers.ImageField(required=False, allow_null=True)
    institution = serializers.CharField(max_length=255)
    course_of_study = serializers.CharField(max_length=255)
    current_level = serializers.CharField(max_length=50)
    expected_graduation = serializers.DateField()
    skills = serializers.ListField(child=serializers.CharField(), min_length=1)
    interests = serializers.ListField(child=serializers.CharField(), min_length=1)


    def validate_skills(self, value):
        cleaned_skill = [skill.strip() for skill in value if skill.strip()]
        if not cleaned_skill:
            raise serializers.ValidationError(
                "At least one valid skill is required."
            )
        return cleaned_skill


    def validate_interests(self, value):
        cleaned_interest = [interest.strip() for interest in value if interest.strip()]
        if not cleaned_interest:
            raise serializers.ValidationError(
                "At least one valid interest is required."
            )
        return cleaned_interest



class UpdateStudentProfileSerializer(serializers.Serializer):
    """

    """
    profile_photo = serializers.ImageField(required=False, allow_null=True)
    institution = serializers.CharField(max_length=255, required=False)
    course_of_study = serializers.CharField(max_length=255, required=False)
    current_level = serializers.CharField(max_length=50, required=False)
    expected_graduation = serializers.DateField(required=False)
    skills = serializers.ListField(child=serializers.CharField(), min_length=1, required=False)
    interests = serializers.ListField(child=serializers.CharField(), min_length=1, required=False)


    def validate_skills(self, value):
        cleaned_skill = [skill.strip() for skill in value if skill.strip()]
        if not cleaned_skill:
            raise serializers.ValidationError(
                "At least one valid skill is required."
            )
        return cleaned_skill


    def validate_interests(self, value):
        cleaned_interest = [interest.strip() for interest in value if interest.strip()]
        if not cleaned_interest:
            raise serializers.ValidationError(
                "At least one valid interest is required."
            )
        return cleaned_interest