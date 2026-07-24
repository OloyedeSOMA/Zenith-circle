from rest_framework import serializers
from apps.opportunities.models import Opportunity


class PublicOpportunitySerializer(serializers.ModelSerializer):
    field = serializers.CharField(
        source="field.name",
        read_only=True,
    )

    class Meta:
        model = Opportunity
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "opportunity_type",
            "organization",
            "application_url",
            "location",
            "field",
            "deadline",
            "is_remote",
            "created_at",
        ]