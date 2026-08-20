from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.users.serializers.auth.register import RegisterSerializer
from apps.users.services.auth.register_service import register_user


@extend_schema(tags=['Authentication'], request=RegisterSerializer, responses=None)
class RegisterAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        register_user(**data)

        return Response({
            'detail': 'Registration successful, Please check your email to verify your account',
            'email': data['email']
        }, status=status.HTTP_201_CREATED)