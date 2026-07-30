from rest_framework import serializers
from apps.opportunities.models import Opportunity


class PublicOpportunitySerializer(serializers.ModelSerializer):
    field = serializers.CharField(
        source="field.name",
        read_only=True,
    )

    organisation_logo = serializers.SerializerMethodField()

    class Meta:
        model = Opportunity
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "opportunity_type",
            "organisation",
            "organisation_logo",
            "application_url",
            "location",
            "field",
            "deadline",
            "is_remote",
            "created_at",
        ]

    def get_organisation_logo(self, obj):
        recruiter_profile = getattr(obj.posted_by, 'recruiter_profile', None)
        if recruiter_profile:
            return recruiter_profile.logo
        return None