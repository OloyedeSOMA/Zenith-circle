from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.users.serializers.auth.account_activation import AccountActivationSerializer
from apps.users.serializers.private.user import PrivateUserSerializer
from apps.users.services.auth.account_activation_service import activate_account


@extend_schema(tags=['Authentication'], request=AccountActivationSerializer, responses=PrivateUserSerializer)
class AccountActivationAPIView(APIView):
    """

    """
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = AccountActivationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        user = activate_account(
            user_id=data['id'],
            token=data['token']
        )

        serializer = PrivateUserSerializer(user)

        return Response ({
            'detail': 'Account activated',
            'user': serializer.data,
        }, status=status.HTTP_200_OK)
