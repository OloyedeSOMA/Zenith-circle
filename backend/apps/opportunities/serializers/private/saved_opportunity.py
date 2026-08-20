from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field
from apps.opportunities.models import Opportunity, SavedOpportunity
from apps.opportunities.serializers.public.opportunity import PublicOpportunitySerializer


class PrivateSavedOpportunitySerializer(serializers.ModelSerializer):
    opportunity = serializers.SerializerMethodField()

    class Meta:
        model = SavedOpportunity
        fields = [
            'id',
            'opportunity',
            'created_at',
        ]

        read_only_fields = ('id', 'opportunity', 'created_at')

    
    @extend_schema_field(PublicOpportunitySerializer)
    def get_opportunity(self, obj):
        return PublicOpportunitySerializer(obj.opportunity).data
