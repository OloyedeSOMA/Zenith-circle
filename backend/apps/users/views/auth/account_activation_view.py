from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.users.serializers.private.user import PrivateUserSerializer
from apps.users.services.auth.account_activation_service import activate_account


@extend_schema(request=None, responses=PrivateUserSerializer)
class AccountActivationAPIView(APIView):
    """

    """
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        user_id = request.query_params.get('id')
        token = request.query_params.get('token')

        user = activate_account(
            user_id=user_id,
            token=token
        )

        serializer = PrivateUserSerializer(user)

        return Response ({
            'detail': 'Account activated',
            'user': serializer.data,
        }, status=status.HTTP_200_OK)
