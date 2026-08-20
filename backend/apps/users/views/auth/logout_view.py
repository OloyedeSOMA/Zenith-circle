from rest_framework.views import APIView 
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.users.serializers.auth.logout import LogoutSerializer
from apps.users.services.auth.logout_service import logout_user


@extend_schema(tags=['Authentication'], request=LogoutSerializer, responses=None)
class LogoutAPIView(APIView):
    """

    """
    permission_classes = [IsAuthenticated]

    def post(self, request):
        """

        """
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        refresh_token = serializer.validated_data['refresh_token']
        logout_user(refresh_token=refresh_token)

        return Response({
            'detail': 'User logged out successfully',
        }, status=status.HTTP_204_NO_CONTENT)
