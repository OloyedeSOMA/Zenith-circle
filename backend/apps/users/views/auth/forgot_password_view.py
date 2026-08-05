from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.users.serializers.auth.forgot_password import ForgotPasswordSerializer
from apps.common.email.email_service import send_reset_password_email


@extend_schema(tags=['Authentication'], request=ForgotPasswordSerializer, responses=None)
class ForgotPasswordAPIView(APIView):
    """

    """
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']

        send_reset_password_email(email=email)

        return Response ({
            'detail': 'Reset instructions has been sent to your email'
        },status=status.HTTP_200_OK)
