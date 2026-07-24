from rest_framework import serializers
from apps.opportunities.models import OpportunityField


class PublicOpportunityFieldSerializer(serializers.ModelSerializer):

    class Meta:
        model = OpportunityField
        fields = [
            "id",
            "name",
            "slug",
        ]