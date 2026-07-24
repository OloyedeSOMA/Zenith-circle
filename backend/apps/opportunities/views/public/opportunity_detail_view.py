from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.opportunities.selectors.opportunity import get_public_opportunity_by_slug
from apps.opportunities.serializers.public.opportunity import PublicOpportunitySerializer


@extend_schema(tags=["Public Opportunities"], responses=PublicOpportunitySerializer)
class PublicOpportunityDetailAPIView(APIView):
    """
    Returns a single approved opportunity.
    """

    authentication_classes = []
    permission_classes = []

    def get(self, request, slug):

        opportunity = get_public_opportunity_by_slug(slug=slug)
        serializer = PublicOpportunitySerializer(opportunity)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )