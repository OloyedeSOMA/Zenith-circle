from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.opportunities.selectors.field import get_opportunity_fields
from apps.opportunities.serializers.public.field import PublicOpportunityFieldSerializer


@extend_schema(tags=["Opportunities"], responses=PublicOpportunityFieldSerializer(many=True))
class PublicOpportunityFieldListAPIView(APIView):
    """
    Returns all opportunity fields.
    """

    authentication_classes = []
    permission_classes = []

    def get(self, request):

        fields = get_opportunity_fields()
        serializer = PublicOpportunityFieldSerializer(fields, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )