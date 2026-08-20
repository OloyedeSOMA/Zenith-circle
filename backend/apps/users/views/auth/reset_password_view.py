from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.users.serializers.auth.reset_password import ResetPasswordSerializer
from apps.users.serializers.private.user import PrivateUserSerializer
from apps.users.services.auth.reset_password_service import reset_password



@extend_schema(tags=['Authentication'], request=ResetPasswordSerializer, responses=PrivateUserSerializer)
class ResetPasswordAPIView(APIView):
    """

    """
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        result = reset_password(
            user_id=data['id'],
            token=data['token'],
            password=data['password']
        )

        user = PrivateUserSerializer(result).data

        return Response({
            'detail': 'Password reset successfully',
            'user': user
        }, status=status.HTTP_200_OK)
