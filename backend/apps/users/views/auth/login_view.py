from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.users.serializers.auth.login import LoginSerializer
from apps.users.serializers.private.user import PrivateUserSerializer
from apps.users.services.auth.login_service import login_user



@extend_schema(request=LoginSerializer, responses=PrivateUserSerializer)
class LoginAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        result = login_user(**data)

        user = PrivateUserSerializer(result['user']).data

        return Response({
            'user': user,
            'tokens':{
                'access_token': result['access_token'],
                'refresh_token': result['refresh_token']
            },
        }, status=status.HTTP_200_OK)



