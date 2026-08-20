from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.opportunities.selectors.opportunity import get_user_opportunity_by_id, get_user_pending_opportunity_by_id
from apps.opportunities.serializers.private.opportunity import PrivateOpportunitySerializer,  UpdateOpportunitySerializer
from apps.opportunities.services.update_opportunity_service import  update_opportunity
from apps.opportunities.services.delete_opportunity_service import  delete_opportunity


class PrivateOpportunityDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=["Opportunities"], responses=PrivateOpportunitySerializer)
    def get(self, request, opportunity_id):
        """
        Returns a single opportunity created by
        the authenticated user.
        """

        opportunity = get_user_opportunity_by_id(user=request.user, opportunity_id=opportunity_id)
        serializer = PrivateOpportunitySerializer(opportunity)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )


    @extend_schema(tags=["Opportunities"], request=UpdateOpportunitySerializer, responses=PrivateOpportunitySerializer)
    def patch(self, request, opportunity_id):
        """
        Updates a pending opportunity created
        by the authenticated user.
        """

        opportunity = get_user_pending_opportunity_by_id(user=request.user, opportunity_id=opportunity_id)

        serializer = UpdateOpportunitySerializer(opportunity, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        opportunity = update_opportunity(opportunity=opportunity, **data)

        response_serializer = PrivateOpportunitySerializer(opportunity)

        return Response(
            response_serializer.data,
            status=status.HTTP_200_OK,
        )



    @extend_schema(tags=["Opportunities"], responses=None)
    def delete(self, request, opportunity_id):
        """
        Deletes a pending opportunity created
        by the authenticated user.
        """

        opportunity = get_user_pending_opportunity_by_id(user=request.user, opportunity_id=opportunity_id)
        delete_opportunity(opportunity=opportunity)

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )