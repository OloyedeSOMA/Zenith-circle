from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from drf_spectacular.utils import extend_schema
from apps.users.serializers.private.recruiter_profile import PrivateRecruiterProfileSerializer, CreateRecruiterProfileSerializer, UpdateRecruiterProfileSerializer
from apps.users.selectors.recruiter_profile import get_recruiter_profile
from apps.users.services.profile.recruiter import create_recruiter_profile, update_recruiter_profile, delete_recruiter_profile



class PrivateRecruiterProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @extend_schema(tags=['Profiles'], request=None, responses=PrivateRecruiterProfileSerializer)
    def get(self, request):
        """
        returns the authenticated recruiter's profile
        """
        recruiter_profile = get_recruiter_profile(user=request.user)

        if not recruiter_profile:
            return Response({
                'detail': 'Recruiter profile not found'
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = PrivateRecruiterProfileSerializer(recruiter_profile)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


    @extend_schema(tags=['Profiles'], request=CreateRecruiterProfileSerializer, responses=PrivateRecruiterProfileSerializer)
    def post(self, request):
        """
        creates a recruiter profile for an authenticated recruiter
        """
        serializer = CreateRecruiterProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        recruiter_profile = create_recruiter_profile(user=request.user, **data)
        response_serializer = PrivateRecruiterProfileSerializer(recruiter_profile)

        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED
        )


    @extend_schema(tags=['Profiles'], request=UpdateRecruiterProfileSerializer, responses=PrivateRecruiterProfileSerializer)
    def patch(self, request):
        """
        updates the recruiter profile of an authenticated recruiter user
        """
        recruiter_profile = get_recruiter_profile(user=request.user)
        if not recruiter_profile:
            return Response({
                'detail': 'Recruiter profile does not exist'
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = UpdateRecruiterProfileSerializer(recruiter_profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        recruiter_profile = update_recruiter_profile(recruiter_profile=recruiter_profile, **data)

        response_serializer = PrivateRecruiterProfileSerializer(recruiter_profile)

        return Response(
            response_serializer.data,
            status=status.HTTP_200_OK
        )

    
    @extend_schema(tags=['Profiles'], request=None, responses=None)
    def delete(self, request):
        """
        deletes a recruiter profile
        """
        recruiter_profile = get_recruiter_profile(user=request.user)
        if not recruiter_profile:
            return Response({
                'detail': 'Recruiter profile does not exist'
            }, status=status.HTTP_404_NOT_FOUND)
        
        delete_recruiter_profile(recruiter_profile=recruiter_profile)

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
