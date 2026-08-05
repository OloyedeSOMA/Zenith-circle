from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.users.serializers.auth.resend_activation import ResendAccountActivationSerializer
from apps.users.selectors.user import get_user_by_email
from apps.common.email.email_service import send_account_activation_email



@extend_schema(tags=['Authentication'], request=ResendAccountActivationSerializer, responses=None)
class ResendAccountActivationAPIView(APIView):
    """

    """
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = ResendAccountActivationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data['email']
        user = get_user_by_email(email=email)

        if user and not user.is_verified:
            send_account_activation_email(user=user)

        return Response({
            'detail': 'Please check your email to activate your account',
        }, status=status.HTTP_200_OK)

        