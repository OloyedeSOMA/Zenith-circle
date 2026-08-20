from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.opportunities.serializers.private.saved_opportunity import PrivateSavedOpportunitySerializer
from apps.opportunities.selectors.saved_opportunity import get_student_saved_opportunities



@extend_schema(tags=['Opportunities'], request=None, responses=PrivateSavedOpportunitySerializer)
class PrivateSavedOpportunityListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        lists all saved opportunites by student
        """
        saved_opportunities = get_student_saved_opportunities(
            student=request.user
        )

        serializer = PrivateSavedOpportunitySerializer(saved_opportunities, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )