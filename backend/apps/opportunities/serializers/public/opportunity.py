from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field
from drf_spectacular.types import OpenApiTypes
from apps.opportunities.models import Opportunity, SavedOpportunity


class PublicOpportunitySerializer(serializers.ModelSerializer):
    field = serializers.CharField(
        source="field.name",
        read_only=True,
    )

    organisation_logo = serializers.SerializerMethodField()
    is_saved = serializers.SerializerMethodField()

    class Meta:
        model = Opportunity
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "responsibilities",
            "requirements",
            "skills_required",
            "benefits",
            "opportunity_type",
            "organisation",
            "organisation_logo",
            "application_url",
            "location",
            "field",
            "deadline",
            "is_remote",
            'is_saved',
            "created_at",
        ]

    @extend_schema_field(OpenApiTypes.URI)
    def get_organisation_logo(self, obj):
        recruiter_profile = getattr(obj.posted_by, 'recruiter_profile', None)
        if recruiter_profile:
            return recruiter_profile.logo
        return None

    @extend_schema_field(OpenApiTypes.URI)
    def get_is_saved(self, obj):
        request = self.context.get('request')
        if not request or not request.user.is_authenticated:
            return False

        if request.user.role != 'student':
            return False

        return SavedOpportunity.objects.filter(
            student=request.user,
            opportunity=obj,
        ).exists()