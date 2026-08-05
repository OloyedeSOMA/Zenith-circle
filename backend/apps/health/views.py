from django.db import connection
from django.utils import timezone
from drf_spectacular.utils import extend_schema
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


@extend_schema(tags=['Health'], request=None, responses=None)
class HealthCheckAPIView(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request):
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT 1")

            return Response(
                {
                    "status": "healthy",
                    "database": "ok",
                    "timestamp": timezone.now(),
                },
                status=status.HTTP_200_OK,
            )
        except Exception:
            return Response(
                {
                    "status": "unhealthy",
                    "database": "unreachable",
                    "timestamp": timezone.now(),
                },
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )