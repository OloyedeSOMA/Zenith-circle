from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.opportunities.selectors.opportunity import get_opportunity_by_id
from apps.opportunities.serializers.private.saved_opportunity import PrivateSavedOpportunitySerializer
from apps.opportunities.services.save_opportunity_service import save_opportunity
from apps.opportunities.services.unsave_opportunity_service import unsave_opportunity




class PrivateSavedOpportunityCreateDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=['Opportunities'], request=None, responses=PrivateSavedOpportunitySerializer)
    def post(self, request, opportunity_id):
        """
        saves an opportunity for the authenticated student
        """
        opportunity = get_opportunity_by_id(opportunity_id=opportunity_id)

        saved_opportunity = save_opportunity(
            student=request.user,
            opportunity=opportunity
        )

        serializer = PrivateSavedOpportunitySerializer(saved_opportunity)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    @extend_schema(tags=['Opportunities'], request=None, responses=None)
    def delete(self, request, opportunity_id):
        """
        unsaves a saved or bookmarked opportunity
        """
        opportunity = get_opportunity_by_id(
            opportunity_id=opportunity_id
        )

        unsave_opportunity(
            student=request.user,
            opportunity=opportunity,
        )

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )