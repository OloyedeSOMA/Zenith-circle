from rest_framework import serializers
from apps.opportunities.models import Opportunity


class PrivateOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = [
            "id",
            "title",
            "slug",
            "description",
            "opportunity_type",
            "organisation",
            "application_url",
            "location",
            "field",
            "deadline",
            "is_remote",
            "status",
            "approved_by",
            "approved_at",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "slug",
            "status",
            "approved_by",
            "approved_at",
            "created_at",
            "updated_at",
        ]


class CreateOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = [
            "title",
            "description",
            "opportunity_type",
            "organisation",
            "application_url",
            "location",
            "field",
            "deadline",
            "is_remote",
        ]


class UpdateOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = [
            "title",
            "description",
            "opportunity_type",
            "organisation",
            "application_url",
            "location",
            "field",
            "deadline",
            "is_remote",
        ]