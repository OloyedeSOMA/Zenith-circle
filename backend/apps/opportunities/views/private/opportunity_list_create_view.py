from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.opportunities.selectors.opportunity import get_user_opportunities
from apps.opportunities.serializers.private.opportunity import CreateOpportunitySerializer, PrivateOpportunitySerializer
from apps.opportunities.services.create_opportunity_service import create_opportunity



class PrivateOpportunityListCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Opportunities"], responses=PrivateOpportunitySerializer(many=True))
    def get(self, request):
        """
        Returns opportunities created by the authenticated user.
        """

        opportunities = get_user_opportunities(user=request.user)
        serializer = PrivateOpportunitySerializer(opportunities, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    @extend_schema(tags=["Opportunities"], request=CreateOpportunitySerializer, responses=PrivateOpportunitySerializer)
    def post(self, request):
        """
        Creates a new opportunity.
        """

        serializer = CreateOpportunitySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        opportunity = create_opportunity(user=request.user, **data)

        response_serializer = PrivateOpportunitySerializer(opportunity)

        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED,
        )