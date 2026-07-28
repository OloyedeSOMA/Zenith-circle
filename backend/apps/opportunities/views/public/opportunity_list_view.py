from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.opportunities.selectors.opportunity import get_public_opportunities
from apps.opportunities.serializers.public.opportunity import PublicOpportunitySerializer



@extend_schema(tags=["Opportunities"], responses=PublicOpportunitySerializer(many=True))
class PublicOpportunityListAPIView(APIView):
    """
    Returns all approved opportunities.

    Supports filtering by:
    - opportunity type
    - field
    - deadline
    """

    authentication_classes = []
    permission_classes = []

    def get(self, request):

        opportunity_type = request.query_params.get("type")
        field = request.query_params.get("field")
        deadline = request.query_params.get("deadline")

        opportunities = get_public_opportunities(opportunity_type=opportunity_type, field=field, deadline=deadline)
        serializer = PublicOpportunitySerializer(opportunities, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )